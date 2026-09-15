import React, { useState } from 'react';
import { EXPERT_COUNCIL } from '../../data/expertCouncil';
import { EXPERT_BEST_PRACTICES } from '../../data/expertBestPractices';
import { EXPERT_CATEGORIES } from './ExpertZoneSection';
import { Modal } from '../common/Modal';
import { useLanguage } from '../../i18n';
import { Award, ArrowRight, BookOpen, Search, ShieldCheck } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onOpenBestPractice?: (expertId: string) => void;
}

export const ExpertCouncilModal: React.FC<Props> = ({ isOpen, onClose, onOpenBestPractice }) => {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const currentCategoryDef = EXPERT_CATEGORIES.find((c) => c.id === selectedCategory) || EXPERT_CATEGORIES[0];

  const filteredMembers = EXPERT_COUNCIL.filter((m) => {
    if (selectedCategory !== 'all') {
      if (!currentCategoryDef.expertIds.includes(m.id)) return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const match =
        m.id.toLowerCase().includes(q) ||
        m.title_zh.toLowerCase().includes(q) ||
        m.title_en.toLowerCase().includes(q) ||
        m.core_duty.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Salud 40 席專家理事會全景名錄"
      subtitle="Oxford CEBM Level 1a · 涵蓋 8 大臨床專科與全人健康治理"
      maxWidth="4xl"
    >
      <div className="space-y-5 font-sans">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {EXPERT_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`btn-tactile px-3 py-1.5 rounded-xl text-xs font-mono shrink-0 flex items-center gap-1.5 transition-all ${
                  isSelected
                    ? 'bg-emerald-600 text-white font-bold shadow-emerald-glow'
                    : 'bg-slate-100 dark:bg-[#141F1A] text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/40'
                }`}
              >
                <span>{language === 'zh-TW' ? cat.name_zh : cat.name_en}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-white/30 text-white' : 'bg-slate-200 dark:bg-slate-800'}`}>
                  {cat.expertIds.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search & Counter */}
        <div className="flex items-center justify-between gap-3 text-xs font-mono">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜尋專家席位或關鍵字..."
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-[#0F1714] border border-slate-200 dark:border-[#1C2E25] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
            />
          </div>
          <span className="text-slate-400">
            顯示 <strong>{filteredMembers.length}</strong> / 40 席位
          </span>
        </div>

        {/* Council Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 max-h-[60vh] overflow-y-auto pr-1">
          {filteredMembers.map((member) => {
            const hasPractice = EXPERT_BEST_PRACTICES.some((bp) => bp.expertId === member.id);

            return (
              <div
                key={member.id}
                className="p-4 rounded-2xl border border-slate-200 dark:border-[#1C2E25] bg-white dark:bg-[#141F1A] hover:border-emerald-300 dark:hover:border-emerald-700 transition-all shadow-xs space-y-2 flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                        {member.id}
                      </span>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                        {language === 'zh-TW' ? member.title_zh : member.title_en}
                      </h4>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-400 font-mono">
                    {member.name_en} · {member.title_en}
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                    {member.why_needed}
                  </p>

                  <div className="p-2.5 rounded-xl bg-emerald-50/70 dark:bg-[#0F1714] border border-emerald-200/60 dark:border-emerald-900/40 text-[11px]">
                    <span className="font-bold text-emerald-800 dark:text-emerald-400 block mb-0.5 font-mono text-[10px]">
                      核心終局職責：
                    </span>
                    <span className="text-emerald-950 dark:text-emerald-200 leading-normal font-sans">
                      {member.core_duty}
                    </span>
                  </div>
                </div>

                {onOpenBestPractice && hasPractice && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenBestPractice(member.id);
                    }}
                    className="btn-tactile mt-2 w-full py-1.5 px-3 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 text-emerald-800 dark:text-emerald-300 font-mono text-xs font-bold flex items-center justify-between transition-all"
                  >
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      研讀實證 Best Practice 專論
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};
