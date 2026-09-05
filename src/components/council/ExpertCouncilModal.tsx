import React, { useState } from 'react';
import { EXPERT_COUNCIL } from '../../data/expertCouncil';
import { Modal } from '../common/Modal';
import { useLanguage } from '../../i18n';
import { ShieldCheck, UserCheck, Sparkles, CheckCircle2, Award } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const ExpertCouncilModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { t, language } = useLanguage();
  const [filter, setFilter] = useState<'all' | 'new_v3' | 'new_v2'>('all');

  const filteredMembers = EXPERT_COUNCIL.filter(m => {
    if (filter === 'all') return true;
    if (filter === 'new_v3') return m.is_new_v3;
    if (filter === 'new_v2') return m.is_new_v2;
    return true;
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('council.title')}
      subtitle={t('council.subtitle')}
      maxWidth="4xl"
    >
      <div className="space-y-6">
        {/* Governance banner */}
        <div className="p-4 rounded-xl border border-salud-amber-500/30 bg-salud-amber-500/10 flex items-start gap-3.5">
          <ShieldCheck className="w-5 h-5 text-salud-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-salud-dark-text dark:text-salud-dark-text space-y-1">
            <p className="font-semibold text-salud-amber-300">
              {language === 'zh-TW'
                ? '產品治理原則：無醫療簽核不得上線 (Medically-Reviewed SOP)'
                : 'Governance Policy: Medically-Reviewed Before Release'}
            </p>
            <p className="opacity-90 leading-relaxed text-xs">
              {language === 'zh-TW'
                ? 'Salud 絕非黑盒 AI 或任意編輯自寫的農場文。依據規格 SOP，每個知識頁與人體模擬器在正式發布前，必須歷經「EC-19 知識點盤點 → EC-20 科普主筆 → EC-10 證據綁定 → EC-01/領域專家醫學安全審查 → EC-17 出圖與無障礙驗收」的嚴謹簽核工作流。'
                : 'Salud is strictly governed by clinical oversight. Before publication, every knowledge page and simulation engine undergoes rigorous sign-off: EC-19 atomic inventory → EC-20 science writing → EC-10 GRADE evidence binding → EC-01 medical safety review → EC-17 illustration verification.'}
            </p>
          </div>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap items-center justify-between border-b border-salud-light-border/80 dark:border-salud-dark-border pb-3 gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filter === 'all'
                  ? 'bg-salud-amber text-black font-semibold shadow-warm-glow'
                  : 'bg-slate-200 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              {language === 'zh-TW' ? '全體 24 席專家' : 'All 24 Experts'}
            </button>
            <button
              onClick={() => setFilter('new_v3')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                filter === 'new_v3'
                  ? 'bg-purple-500 text-white font-semibold shadow-md'
                  : 'bg-slate-200 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              {language === 'zh-TW' ? 'v0.3 擴編 2 席 (成癮/基因)' : 'v0.3 Additions (EC-23, 24)'}
            </button>
            <button
              onClick={() => setFilter('new_v2')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                filter === 'new_v2'
                  ? 'bg-salud-cyan text-black font-semibold shadow-cyan-glow'
                  : 'bg-slate-200 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              {language === 'zh-TW' ? 'v0.2 擴編 10 席' : 'v0.2 Additions'}
            </button>
          </div>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            {language === 'zh-TW' ? `顯示 ${filteredMembers.length} 位席位` : `Showing ${filteredMembers.length} seats`}
          </span>
        </div>

        {/* Council Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 max-h-[60vh] overflow-y-auto pr-1">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className={`p-4 rounded-xl border transition-all ${
                member.is_new_v3
                  ? 'border-purple-200 dark:border-purple-500/60 bg-gradient-to-br from-purple-50 via-white to-purple-100/60 dark:from-purple-950/40 dark:via-salud-dark-card/80 dark:to-slate-950 shadow-sm'
                  : member.is_new_v2
                  ? 'border-nature-sky-200 dark:border-salud-cyan/40 bg-gradient-to-br from-nature-sky-100/60 via-white to-slate-50 dark:from-salud-cyan-700/10 dark:to-salud-dark-card/60 shadow-sm'
                  : 'border-slate-200 dark:border-salud-dark-border bg-white dark:bg-salud-dark-card/60 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${
                    member.is_new_v3
                      ? 'bg-purple-900/60 text-purple-300 border-purple-600'
                      : 'bg-slate-200 dark:bg-slate-800 text-salud-amber-700 dark:text-salud-amber-400 border-slate-300 dark:border-slate-700'
                  }`}>
                    {member.id}
                  </span>
                  <h4 className="font-bold text-sm text-salud-light-text dark:text-salud-dark-text">
                    {language === 'zh-TW' ? member.title_zh : member.title_en}
                  </h4>
                </div>
                {member.is_new_v3 ? (
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold">
                    NEW v0.3
                  </span>
                ) : member.is_new_v2 ? (
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-salud-cyan/20 text-salud-cyan-700 dark:text-salud-cyan-300 border border-salud-cyan/40">
                    NEW v0.2
                  </span>
                ) : null}
              </div>

              <div className="text-xs text-slate-500 dark:text-slate-400 font-mono mb-2">
                {member.title_en}
              </div>

              <p className="text-xs text-slate-700 dark:text-slate-300/90 leading-relaxed mb-2">
                <strong className="text-slate-900 dark:text-slate-200">
                  {language === 'zh-TW' ? '角色必要性：' : 'Why Needed: '}
                </strong>
                {language === 'zh-TW' ? member.why_needed : (member.why_needed_en || member.why_needed)}
              </p>

              <div className="p-2.5 rounded-lg bg-salud-light-bg/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800/80 text-xs">
                <span className="font-semibold text-salud-amber-600 dark:text-salud-amber-400 block mb-0.5">
                  {language === 'zh-TW' ? '核心職責：' : 'Core Duty: '}
                </span>
                <span className="text-slate-600 dark:text-slate-300 leading-normal">
                  {language === 'zh-TW' ? member.core_duty : (member.core_duty_en || member.core_duty)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};
