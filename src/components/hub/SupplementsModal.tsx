import React from 'react';
import { Modal } from '../common/Modal';
import { SUPPLEMENTS_EVALUATIONS } from '../../data/supplementsData';
import { useLanguage } from '../../i18n';
import { EvidenceBadge } from '../common/EvidenceBadge';
import { ShieldAlert, AlertTriangle, CheckCircle2, ShieldCheck, HelpCircle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const SupplementsModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { t, language } = useLanguage();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('supplements.title')}
      subtitle={t('supplements.subtitle')}
      maxWidth="4xl"
    >
      <div className="space-y-6 font-sans text-xs text-slate-700 dark:text-slate-200">
        {/* TFDA 4-Tier Regulatory Firewall (§11.1) */}
        <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center gap-2 font-display font-bold text-sm text-salud-amber-600 dark:text-salud-amber-400">
            <ShieldCheck className="w-5 h-5" />
            <span>台灣衛生福利部食品藥物管理署 (TFDA) 四層法規防火牆</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-center text-xs">
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <span className="text-slate-400 text-[10px] block">Level 1</span>
              <strong className="text-slate-700 dark:text-slate-300">一般食品</strong>
              <span className="text-[10px] text-slate-500 block">無任何療效宣稱</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <span className="text-slate-400 text-[10px] block">Level 2</span>
              <strong className="text-salud-cyan">膳食營養補充品</strong>
              <span className="text-[10px] text-slate-500 block">補足微量營養素</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <span className="text-slate-400 text-[10px] block">Level 3</span>
              <strong className="text-salud-amber">健康食品 (小綠人)</strong>
              <span className="text-[10px] text-slate-500 block">具許可證特定功效</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <span className="text-slate-400 text-[10px] block">Level 4</span>
              <strong className="text-purple-400">藥品 (OTC / 處方)</strong>
              <span className="text-[10px] text-slate-500 block">具治療疾病實證</span>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 leading-relaxed font-mono">
            ※ 依據法規：任何宣稱可「解酒、解毒、迅速醒酒、預防酒駕」之市售產品皆屬違法廣告。所有解酒宣稱一律列為 E 級無效或違規。
          </div>
        </div>

        {/* Supplements Evaluation Table (§11.2) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
              市售常見「解酒／護肝」保健成分科學實證評級
            </h3>
            <span className="font-mono text-[11px] text-slate-400">
              審核專家：EC-09 (藥師) ＋ EC-23 (成癮毒理)
            </span>
          </div>

          <div className="space-y-3">
            {SUPPLEMENTS_EVALUATIONS.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <strong className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      {item.name_zh}
                    </strong>
                    <span className="font-mono text-xs text-slate-400">({item.name_en})</span>
                  </div>
                  <EvidenceBadge grade={item.evidence_grade} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 font-mono block text-[11px]">商業宣稱機制：</span>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {item.claimed_mechanism_zh}
                    </p>
                  </div>
                  <div>
                    <span className="text-salud-cyan font-mono block text-[11px]">臨床實證真相：</span>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                      {item.evidence_reality_zh}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-800/60 flex items-start gap-2 text-[11px] text-amber-600 dark:text-amber-400">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{item.caution_zh}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};
