import React, { useState } from 'react';
import { HORMESIS_PROTOCOLS } from '../../../data/longevityData';
import { HormesisProtocol } from '../../../types';
import {
  Flame,
  ThermometerSnowflake,
  Clock,
  Activity,
  Heart,
  Shield,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Sun,
  Moon,
} from 'lucide-react';

export const InfographHormesisProtocol: React.FC = () => {
  const [selectedModalityId, setSelectedModalityId] = useState<string>('HORM-01');
  const selectedProtocol = HORMESIS_PROTOCOLS.find((p) => p.id === selectedModalityId) || HORMESIS_PROTOCOLS[0];

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="p-5 rounded-2xl border border-emerald-300/80 dark:border-teal-500/30 bg-gradient-to-r from-emerald-50 via-teal-50/70 to-emerald-100/40 dark:from-slate-900 dark:via-teal-950/40 dark:to-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-800 dark:text-teal-400 uppercase tracking-wider">
            <Flame className="w-4 h-4 text-emerald-600 dark:text-teal-400" />
            <span>INFOGRAPH 5 · 激效反應 (HORMESIS) 與環境適應醫學</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-display font-extrabold text-slate-900 dark:text-white mt-1">
            喚醒百萬年抗逆基因：冷、熱、斷食與 Zone 2 劑量
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-2xl font-medium">
            「舒適是長壽的毒藥」。短暫微小且可控的物理壓力（熱休克、冷刺激、缺氧、能量耗竭）能激發超代償內源性修復。
          </p>
        </div>

        <div className="px-3.5 py-1.5 rounded-xl bg-white/90 dark:bg-teal-500/10 border border-emerald-200 dark:border-teal-500/30 text-emerald-800 dark:text-teal-300 text-xs font-mono font-bold shrink-0 shadow-xs">
          U 型劑量效應 (Biphasic Dose)
        </div>
      </div>

      {/* The Hormesis U-Curve Visual Explainer */}
      <div className="rounded-3xl border border-emerald-300/80 dark:border-teal-500/30 bg-white/95 dark:bg-slate-900/80 p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-600 dark:text-teal-400" />
            <span>激效適應生理 U 型劑量曲線 (Hormetic Dose-Response)</span>
          </div>
          <span className="text-[10px] font-mono text-emerald-700 dark:text-slate-400 font-bold">GRADE 實證標準</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <div className="font-bold text-slate-700 dark:text-slate-400">1. 欠缺微壓力 (過度舒適)</div>
            <div className="text-[11px] text-slate-500 font-mono">恆溫空調 · 隨手高糖 · 缺乏運動</div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed pt-1 border-t border-slate-200 dark:border-slate-850">
              熱休克蛋白與抗氧化酵素沉睡，自噬清運機制停滯，細胞抗逆修復能力逐漸萎縮退化。
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/80 dark:bg-teal-950/30 border border-emerald-300 dark:border-teal-500/40 space-y-1.5 ring-2 ring-emerald-500/20">
            <div className="font-bold text-emerald-800 dark:text-teal-300">2. 黃金激效區 (Hormetic Zone)</div>
            <div className="text-[11px] text-emerald-700 dark:text-teal-400 font-mono">芬蘭桑拿 · 冷水浴 · 16/8 斷食 · Zone 2</div>
            <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed pt-1 border-t border-emerald-200 dark:border-teal-500/30">
              活化 Hsp70、RBM3、PGC-1α、SIRT1 與 AMPK，誘導損傷自噬與粒線體新生，死亡風險顯著降低！
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50/70 dark:bg-slate-950/70 border border-rose-200 dark:border-slate-800 space-y-1.5">
            <div className="font-bold text-rose-700 dark:text-rose-400">3. 毒性過負荷 (Exhaustion)</div>
            <div className="text-[11px] text-rose-600/80 dark:text-rose-400/80 font-mono">超長時間蒸桑拿 · 深度低體溫 · 過度訓練</div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed pt-1 border-t border-rose-200 dark:border-slate-850">
              超過細胞自癒上限，引發蛋白質變性、心律不整、皮質醇長期高亢與神經損傷。
            </p>
          </div>
        </div>
      </div>

      {/* Protocol Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {HORMESIS_PROTOCOLS.map((p) => {
          const isActive = selectedModalityId === p.id;
          return (
            <button
              key={p.id}
              onClick={() => setSelectedModalityId(p.id)}
              className={`p-3.5 rounded-2xl border text-left transition-all ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-md ring-2 ring-emerald-500/20 border-emerald-500'
                  : 'bg-white/90 dark:bg-slate-900/60 border-emerald-200/70 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:border-emerald-400 hover:bg-emerald-50/50'
              }`}
            >
              <div className={`text-[10px] font-mono font-bold truncate ${isActive ? 'text-emerald-100' : 'text-emerald-700 dark:text-teal-400'}`}>
                {p.frequency_per_week.split(' ')[0]}
              </div>
              <div className={`font-bold text-xs mt-0.5 truncate ${isActive ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                {p.modality_zh.split(' ')[0]}
              </div>
              <div className={`text-[10px] font-mono mt-1 truncate ${isActive ? 'text-emerald-100/90' : 'text-slate-500'}`}>
                {p.effective_dose.split('，')[0]}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Protocol Deep Dive Card */}
      <div className="rounded-3xl border border-emerald-300/80 dark:border-teal-500/30 bg-white/95 dark:bg-slate-900/90 p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-teal-500/20 dark:text-teal-300 dark:border-teal-500/40 font-bold">
                激效介入處方
              </span>
              <span className="text-emerald-700 dark:text-teal-400 font-bold">實證醫學 Grade A</span>
            </div>
            <h4 className="text-2xl font-display font-extrabold text-slate-900 dark:text-white">
              {selectedProtocol.modality_zh}
            </h4>
            <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
              {selectedProtocol.modality_en}
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <div className="px-3 py-2 rounded-xl bg-emerald-50/60 dark:bg-slate-950 border border-emerald-200 dark:border-slate-800 text-center shadow-xs">
              <div className="text-[9px] text-slate-500">每週建議頻率</div>
              <div className="font-bold text-emerald-800 dark:text-teal-400 mt-0.5">{selectedProtocol.frequency_per_week}</div>
            </div>
            <div className="px-3 py-2 rounded-xl bg-amber-50/60 dark:bg-slate-950 border border-amber-200 dark:border-slate-800 text-center shadow-xs">
              <div className="text-[9px] text-slate-500">黃金有效劑量</div>
              <div className="font-bold text-amber-700 dark:text-amber-400 mt-0.5">{selectedProtocol.effective_dose}</div>
            </div>
          </div>
        </div>

        {/* Biological Target & Clinical Evidence */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-emerald-50/40 dark:bg-slate-950 border border-emerald-200/80 dark:border-slate-800 space-y-1.5">
            <div className="font-bold text-emerald-800 dark:text-teal-400 font-mono flex items-center gap-1.5">
              <Shield className="w-4 h-4" />
              <span>生物學靶點與細胞機轉</span>
            </div>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-[11px]">
              {selectedProtocol.cellular_mechanism_zh}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-teal-50/40 dark:bg-slate-950 border border-teal-200/80 dark:border-slate-800 space-y-1.5">
            <div className="font-bold text-teal-800 dark:text-amber-400 font-mono flex items-center gap-1.5">
              <Activity className="w-4 h-4" />
              <span>人體臨床世代研究實證</span>
            </div>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-[11px]">
              {selectedProtocol.clinical_evidence_summary}
            </p>
          </div>
        </div>

        {/* Contraindications & Endpoints */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-500/30 space-y-2">
            <div className="font-bold text-emerald-800 dark:text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>監測生物標記終點 (Biomarkers)</span>
            </div>
            <ul className="space-y-1 text-[11px] text-slate-700 dark:text-slate-300 list-disc list-inside">
              {selectedProtocol.biomarker_endpoints.map((ep, idx) => (
                <li key={`ep-${idx}`}>{ep}</li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-500/30 space-y-2">
            <div className="font-bold text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" />
              <span>安全禁忌族群 (Contraindications)</span>
            </div>
            <ul className="space-y-1 text-[11px] text-slate-700 dark:text-slate-300 list-disc list-inside">
              {selectedProtocol.contraindications.map((ci, idx) => (
                <li key={`ci-${idx}`}>{ci}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 24-Hour Longevity Protocol Routine Timeline */}
      <div className="rounded-3xl border border-emerald-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/60 p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-800 dark:text-salud-cyan">
          <Sun className="w-4 h-4 text-emerald-600 dark:text-salud-cyan" />
          <span>每日抗老化激效作息時鐘 (24-Hour Longevity Daily Protocol)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-slate-950 border border-emerald-200/70 dark:border-slate-800 space-y-1 text-xs">
            <div className="font-mono text-[10px] text-teal-700 dark:text-teal-400 font-bold">07:00 ~ 08:30 早晨</div>
            <div className="font-bold text-slate-900 dark:text-white">晨間光照 + 2分鐘冷水</div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
              喚醒下視丘視交叉上核 (SCN) 晝夜節律；誘發正腎上腺素激增提升大腦清醒度。
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-slate-950 border border-emerald-200/70 dark:border-slate-800 space-y-1 text-xs">
            <div className="font-mono text-[10px] text-blue-700 dark:text-blue-400 font-bold">12:00 ~ 18:00 午後</div>
            <div className="font-bold text-slate-900 dark:text-white">8小時進食窗 + Zone 2</div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
              限制進食窗啟動代謝靈活性；Zone 2 有氧 45 分鐘最大化粒線體脂肪酸 β 氧化。
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-slate-950 border border-emerald-200/70 dark:border-slate-800 space-y-1 text-xs">
            <div className="font-mono text-[10px] text-amber-700 dark:text-amber-400 font-bold">18:30 ~ 20:00 傍晚</div>
            <div className="font-bold text-slate-900 dark:text-white">高溫桑拿 20 分鐘</div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
              激發 Hsp70 蛋白質折疊修復；核心體溫隨後下降，自然誘發褪黑激素分泌。
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-slate-950 border border-emerald-200/70 dark:border-slate-800 space-y-1 text-xs">
            <div className="font-mono text-[10px] text-purple-700 dark:text-purple-400 font-bold">22:00 ~ 06:30 深夜</div>
            <div className="font-bold text-slate-900 dark:text-white">膠淋巴系統全開 (SWS)</div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
              深度慢波睡眠沖洗大腦 Aβ 澱粉樣蛋白；禁食滿 12 小時啟動全身巨自噬流。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
