import React from 'react';
import { KnowledgePage } from '../../types';
import {
  Lightbulb,
  Sparkles,
  CheckCircle,
  HelpCircle,
  ShieldAlert,
  ArrowRight,
  Droplets,
  Flame,
  Zap,
  Coffee,
  HeartCrack,
  Sun
} from 'lucide-react';

interface Props {
  page: KnowledgePage;
}

export const VisualPlainEnglishDecoder: React.FC<Props> = ({ page }) => {
  if (!page.plain_analogy && !page.life_hack) return null;

  // 根據 Page ID 提供客製化生活趣味向量 SVG 示意圖
  const renderVisualIllustration = () => {
    switch (page.id) {
      case 'PAGE-W-01':
        return (
          <svg viewBox="0 0 400 120" className="w-full h-auto max-h-28 text-xs font-mono">
            {/* 細胞內液房間 (67%) */}
            <rect x="10" y="20" width="220" height="80" rx="16" className="fill-sky-100/80 dark:fill-sky-950/60 stroke-sky-400 stroke-2" />
            <text x="120" y="55" textAnchor="middle" className="font-bold fill-sky-900 dark:fill-sky-200 text-[11px] font-sans">
              私人套房：細胞內液 (ICW ~67%)
            </text>
            <text x="120" y="75" textAnchor="middle" className="fill-sky-700 dark:fill-sky-400 text-[9px]">
              深層水分庫 · 酵素與代謝環境
            </text>

            {/* 組織間隙海綿 (25%) */}
            <rect x="240" y="20" width="90" height="80" rx="12" className="fill-emerald-100/80 dark:fill-emerald-950/60 stroke-emerald-400 stroke-2 stroke-dasharray-2" />
            <text x="285" y="55" textAnchor="middle" className="font-bold fill-emerald-900 dark:fill-emerald-200 text-[10px] font-sans">
              大樓海綿
            </text>
            <text x="285" y="75" textAnchor="middle" className="fill-emerald-700 dark:fill-emerald-400 text-[9px]">
              組織間液 (~25%)
            </text>

            {/* 血管走廊血漿 (8%) */}
            <rect x="340" y="20" width="50" height="80" rx="10" className="fill-rose-100/80 dark:fill-rose-950/60 stroke-rose-400 stroke-2" />
            <text x="365" y="55" textAnchor="middle" className="font-bold fill-rose-900 dark:fill-rose-200 text-[10px] font-sans">
              血管
            </text>
            <text x="365" y="75" textAnchor="middle" className="fill-rose-700 dark:fill-rose-400 text-[9px]">
              僅 8%!
            </text>
          </svg>
        );

      case 'PAGE-W-03':
        return (
          <svg viewBox="0 0 400 120" className="w-full h-auto max-h-28 text-xs font-mono">
            {/* 血液濃度監測 (1%) */}
            <circle cx="70" cy="60" r="40" className="fill-purple-100/80 dark:fill-purple-950/60 stroke-purple-400 stroke-2" />
            <text x="70" y="55" textAnchor="middle" className="font-bold fill-purple-900 dark:fill-purple-200 text-[10px] font-sans">
              大腦鹽度計
            </text>
            <text x="70" y="72" textAnchor="middle" className="fill-purple-700 dark:fill-purple-400 text-[9px]">
              濃度 +1% 警戒
            </text>

            {/* 箭頭 */}
            <path d="M 120 60 L 160 60" className="stroke-purple-400 stroke-2" markerEnd="url(#arrow)" />

            {/* ADH 關閉水閘 */}
            <rect x="170" y="25" width="110" height="70" rx="12" className="fill-sky-100/80 dark:fill-sky-950/60 stroke-sky-400 stroke-2" />
            <text x="225" y="55" textAnchor="middle" className="font-bold fill-sky-900 dark:fill-sky-200 text-[10px] font-sans">
              ADH 關緊水閘
            </text>
            <text x="225" y="72" textAnchor="middle" className="fill-sky-700 dark:fill-sky-400 text-[9px]">
              腎臟保留水分
            </text>

            {/* 口渴警鐘 (2-3%) */}
            <rect x="290" y="25" width="100" height="70" rx="12" className="fill-amber-100/80 dark:fill-amber-950/60 stroke-amber-400 stroke-2" />
            <text x="340" y="55" textAnchor="middle" className="font-bold fill-amber-900 dark:fill-amber-200 text-[10px] font-sans">
              口渴大警鐘
            </text>
            <text x="340" y="72" textAnchor="middle" className="fill-amber-700 dark:fill-amber-400 text-[9px]">
              已延遲失水 2%
            </text>
          </svg>
        );

      case 'PAGE-W-06':
        return (
          <div className="flex items-center justify-around gap-2 p-2 bg-slate-50 dark:bg-slate-800/60 rounded-2xl">
            <div className="text-center space-y-1">
              <div className="w-8 h-8 rounded-full bg-emerald-200 border-2 border-emerald-400 mx-auto" />
              <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 block">淡檸檬黃</span>
              <span className="text-[9px] text-slate-400">水分充足理想</span>
            </div>
            <div className="text-slate-300">→</div>
            <div className="text-center space-y-1">
              <div className="w-8 h-8 rounded-full bg-amber-300 border-2 border-amber-500 mx-auto" />
              <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300 block">金黃琥珀色</span>
              <span className="text-[9px] text-slate-400">輕度缺水注意</span>
            </div>
            <div className="text-slate-300">→</div>
            <div className="text-center space-y-1">
              <div className="w-8 h-8 rounded-full bg-amber-700 border-2 border-amber-900 mx-auto" />
              <span className="text-[10px] font-bold text-rose-700 dark:text-rose-300 block">深烏龍茶色</span>
              <span className="text-[9px] text-rose-500 font-bold">嚴重缺水警報</span>
            </div>
          </div>
        );

      case 'PAGE-W-08':
        return (
          <div className="p-3 bg-rose-50/80 dark:bg-rose-950/40 rounded-2xl border border-rose-200 dark:border-rose-900/60 flex items-center justify-around gap-4 text-xs font-mono">
            <div className="text-center space-y-1">
              <div className="text-lg">🧂 正常血鈉</div>
              <div className="font-bold text-slate-800 dark:text-slate-200">135–145 mmol/L</div>
              <span className="text-[10px] text-emerald-600">細胞內外滲透平衡</span>
            </div>
            <div className="text-rose-500 font-bold text-base">➔ 狂灌純水 ➔</div>
            <div className="text-center space-y-1">
              <div className="text-lg">🧠 腦細胞水腫</div>
              <div className="font-bold text-rose-700 dark:text-rose-400">&lt; 130 mmol/L</div>
              <span className="text-[10px] text-rose-600 font-bold">水分逆流湧入大腦膨脹</span>
            </div>
          </div>
        );

      case 'PAGE-W-09':
        return (
          <div className="p-3 bg-sky-50/80 dark:bg-sky-950/40 rounded-2xl border border-sky-200 dark:border-sky-900/60 flex items-center justify-between gap-2 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-xl bg-sky-500 text-white font-bold">SGLT1 高鐵</span>
              <span className="text-[11px] font-sans text-slate-700 dark:text-slate-300">
                1 鈉離子 + 1 葡萄糖 ＝ 瞬間狂飆帶動 260 水分子吸收！
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold shrink-0 text-[10px]">
              WHO ORS 祕方
            </span>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-5 sm:p-6 rounded-3xl border border-amber-200/90 dark:border-amber-900/60 bg-gradient-to-br from-amber-50/70 via-white to-sky-50/50 dark:from-slate-900 dark:via-salud-dark-card dark:to-slate-950 shadow-sm space-y-4 font-sans text-xs">
      {/* 標題欄 */}
      <div className="flex items-center justify-between border-b border-amber-200/60 dark:border-slate-800 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-xl bg-amber-500 text-white shadow-warm-glow">
            <Lightbulb className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-display font-extrabold text-sm sm:text-base text-amber-950 dark:text-amber-200 flex items-center gap-1.5">
              <span>深入淺出 · 生活視覺化解密</span>
              <span className="text-[10px] font-mono px-2 py-0.2 rounded-full bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                秒懂生理學
              </span>
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              用最接地氣的生活神譬喻，30 秒打通醫學核心觀念
            </p>
          </div>
        </div>

        <span className="text-[10px] font-mono font-bold text-amber-700 dark:text-amber-400 hidden sm:inline">
          {page.analogy_title || '生活譬喻'}
        </span>
      </div>

      {/* 神級生活譬喻 */}
      {page.plain_analogy && (
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold text-xs text-amber-900 dark:text-amber-300 font-mono">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>【生活神級譬喻：{page.analogy_title}】</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-sans bg-white/80 dark:bg-slate-800/80 p-3.5 rounded-2xl border border-amber-100 dark:border-slate-700/80 shadow-xs">
            {page.plain_analogy}
          </p>
        </div>
      )}

      {/* 專屬向量圖解展示 */}
      {renderVisualIllustration()}

      {/* 30 秒生活實踐行動指引 (Actionable Life Hack) */}
      {page.life_hack && (
        <div className="p-3.5 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold text-xs text-emerald-900 dark:text-emerald-300 font-mono">
            <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>30 秒帶走生活行動指引 (Actionable Life Hack)</span>
          </div>
          <p className="text-xs text-emerald-950 dark:text-emerald-100 leading-relaxed font-sans font-medium pl-5">
            👉 {page.life_hack}
          </p>
        </div>
      )}
    </div>
  );
};
