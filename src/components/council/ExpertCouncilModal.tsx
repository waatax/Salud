import React, { useState } from 'react';
import { EXPERT_COUNCIL } from '../../data/expertCouncil';
import { Modal } from '../common/Modal';
import { ShieldCheck, UserCheck, Sparkles, CheckCircle2 } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const ExpertCouncilModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [filter, setFilter] = useState<'all' | 'new_v2'>('all');

  const filteredMembers = EXPERT_COUNCIL.filter(m => filter === 'all' || m.is_new_v2);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Expert Council v2｜22 席專家治理架構"
      subtitle="醫療安全、營養科學、食品化學、圖解視覺與法規合規之產品治理角色模型"
      maxWidth="4xl"
    >
      <div className="space-y-6">
        {/* Governance banner */}
        <div className="p-4 rounded-xl border border-salud-amber-500/30 bg-salud-amber-500/10 flex items-start gap-3.5">
          <ShieldCheck className="w-5 h-5 text-salud-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-salud-dark-text dark:text-salud-dark-text light:text-salud-light-text space-y-1">
            <p className="font-semibold text-salud-amber-300">產品治理原則：無醫療簽核不得上線</p>
            <p className="opacity-90 leading-relaxed">
              Salud 絕非黑盒 AI 或任意編輯自寫的農場文。依據規格 SOP，每個知識頁與人體模擬器在正式發布前，必須歷經
              <strong>「EC-19 知識點盤點 → EC-20 科普主筆 → EC-10 證據綁定 → EC-01/領域專家醫學安全審查 → EC-17 出圖與無障礙驗收」</strong>
              的嚴謹簽核工作流。
            </p>
          </div>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center justify-between border-b border-salud-dark-border pb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filter === 'all'
                  ? 'bg-salud-amber text-black font-semibold shadow-warm-glow'
                  : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700'
              }`}
            >
              全體 22 席專家
            </button>
            <button
              onClick={() => setFilter('new_v2')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                filter === 'new_v2'
                  ? 'bg-salud-cyan text-black font-semibold shadow-cyan-glow'
                  : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              v0.2 擴編新增 10 席
            </button>
          </div>
          <span className="text-xs font-mono text-slate-400">
            顯示 {filteredMembers.length} 位席位
          </span>
        </div>

        {/* Council Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className={`p-4 rounded-xl border transition-all ${
                member.is_new_v2
                  ? 'border-salud-cyan/40 bg-gradient-to-br from-salud-cyan-700/10 to-salud-dark-card/60'
                  : 'border-salud-dark-border bg-salud-dark-card/60 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-salud-amber-400 border border-slate-700">
                    {member.id}
                  </span>
                  <h4 className="font-bold text-sm text-salud-dark-text dark:text-salud-dark-text light:text-salud-light-text">
                    {member.title_zh}
                  </h4>
                </div>
                {member.is_new_v2 && (
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-salud-cyan/20 text-salud-cyan-300 border border-salud-cyan/40">
                    NEW v0.2
                  </span>
                )}
              </div>

              <div className="text-xs text-slate-400 font-mono mb-2">
                {member.title_en}
              </div>

              <p className="text-xs text-slate-300/90 leading-relaxed mb-2">
                <strong className="text-slate-200">角色必要性：</strong>
                {member.why_needed}
              </p>

              <div className="pt-2 border-t border-slate-800/80 flex items-start gap-1.5 text-xs text-salud-amber-300/90">
                <UserCheck className="w-3.5 h-3.5 shrink-0 mt-0.5 text-salud-amber-400" />
                <span><strong className="text-salud-amber-200">核心職責：</strong>{member.core_duty}</span>
              </div>
            </div>
          ))}
        </div>

        {/* RACI Workflow summary */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs space-y-2">
          <div className="font-bold text-sm text-slate-200 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            知識頁與圖解審查 RACI 閉環
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center pt-2 font-mono">
            <div className="p-2 rounded bg-slate-800/80 border border-slate-700">
              <span className="text-salud-amber-400 font-bold block">1. KP 盤點</span>
              <span className="text-[11px] text-slate-300">EC-19 / EC-05</span>
            </div>
            <div className="p-2 rounded bg-slate-800/80 border border-slate-700">
              <span className="text-cyan-400 font-bold block">2. 證據綁定</span>
              <span className="text-[11px] text-slate-300">EC-10 / EC-20</span>
            </div>
            <div className="p-2 rounded bg-slate-800/80 border border-slate-700">
              <span className="text-red-400 font-bold block">3. 醫療安全</span>
              <span className="text-[11px] text-slate-300">EC-01 簽核</span>
            </div>
            <div className="p-2 rounded bg-slate-800/80 border border-slate-700">
              <span className="text-emerald-400 font-bold block">4. 圖解無障礙</span>
              <span className="text-[11px] text-slate-300">EC-17 / EC-11</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
