import React from 'react';
import { SimSupplementChecker } from '../simulators/SimSupplementChecker';
import { useLanguage } from '../../i18n';
import { PillarHubTemplate } from '../common/PillarHubTemplate';
import { HUB_PRIMERS } from '../../data/hubPrimers';
import { ShieldCheck } from 'lucide-react';

export const SupplementsHub: React.FC = () => {
  const { language } = useLanguage();

  return (
    <PillarHubTemplate
      primer={HUB_PRIMERS.supplements}
      overviewSection={
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-sm font-bold text-nature-green-700 dark:text-nature-green-400 font-display">
            <ShieldCheck className="w-5 h-5 text-nature-green-600 dark:text-nature-green-400" />
            <span>台灣衛生福利部食品藥物管理署 (TFDA) 四層法規防火牆指南</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-center text-xs">
            <div className="p-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-0.5 shadow-sm">
              <span className="text-slate-400 text-[0.75rem] block">Level 1</span>
              <strong className="text-slate-800 dark:text-slate-300">一般食品</strong>
              <span className="text-[0.75rem] text-slate-500 block">嚴禁任何療效或生理調節宣稱</span>
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-0.5 shadow-sm">
              <span className="text-slate-400 text-[0.75rem] block">Level 2</span>
              <strong className="text-nature-sky-700 dark:text-nature-sky-400 font-bold">膳食營養補充劑</strong>
              <span className="text-[0.75rem] text-slate-500 block">補充日常飲食微量營養素不足</span>
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-0.5 shadow-sm">
              <span className="text-slate-400 text-[0.75rem] block">Level 3</span>
              <strong className="text-nature-green-700 dark:text-nature-green-400 font-bold">健康食品 (小綠人標章)</strong>
              <span className="text-[0.75rem] text-slate-500 block">具許可證特定保健功效審核</span>
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-0.5 shadow-sm">
              <span className="text-slate-400 text-[0.75rem] block">Level 4</span>
              <strong className="text-purple-700 dark:text-purple-400 font-bold">指示/處方藥品</strong>
              <span className="text-[0.75rem] text-slate-500 block">具明確治療疾病之大規模臨床驗證</span>
            </div>
          </div>

          <p className="text-[0.75rem] text-slate-600 dark:text-slate-400 leading-relaxed font-mono pt-1">
            ※ 法律紅線提醒：任何宣稱可「治療、治癒、速效解毒、替代降血壓/降血脂處方藥物」之市售保健食品，皆屬重大違規違法廣告。所有此類宣稱一律列為 E 級無效且高風險。
          </p>
        </div>
      }
      simulatorSection={<SimSupplementChecker />}
    />
  );
};
