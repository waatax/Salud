import React, { useState } from 'react';
import {
  Skull,
  ShieldAlert,
  Sparkles,
  Zap,
  Activity,
  ArrowRight,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Flame,
} from 'lucide-react';

export const InfographSenescenceSASP: React.FC = () => {
  const [activeStage, setActiveStage] = useState<'DAMAGE' | 'ARREST' | 'SASP' | 'CLEARANCE'>('SASP');

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50/70 to-emerald-100/40 dark:from-slate-900 dark:via-rose-950/40 dark:to-slate-900 border border-emerald-300/80 dark:border-rose-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-800 dark:text-rose-400 uppercase tracking-wider">
            <Skull className="w-4 h-4 text-emerald-600 dark:text-rose-400" />
            <span>INFOGRAPH 4 · 殭屍細胞與 SASP 旁分泌毒性清除</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-display font-extrabold text-slate-900 dark:text-white mt-1">
            細胞衰老、發炎風暴與 Senolytics 標靶清除路徑
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-2xl font-medium">
            「殭屍細胞」停止有絲分裂卻維持高代謝活躍，透過釋放 SASP 毒素像感染般催老周邊組織。梅奧醫學中心證實間歇清除可逆轉衰老。
          </p>
        </div>

        <div className="px-3.5 py-2 rounded-xl bg-white/90 dark:bg-rose-500/10 border border-emerald-200 dark:border-rose-500/30 text-center shrink-0 shadow-xs">
          <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400">人體最大儲存庫</div>
          <div className="text-xs font-mono font-bold text-emerald-800 dark:text-rose-300">肥胖內臟脂肪細胞</div>
        </div>
      </div>

      {/* Interactive 4-Stage Pathway Timeline */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {[
          { id: 'DAMAGE', step: '階段 1', title: 'DNA 損傷與端粒耗損', badge: '起因' },
          { id: 'ARREST', step: '階段 2', title: 'p16/p21 週期永久鎖死', badge: '殭屍化' },
          { id: 'SASP', step: '階段 3', title: 'SASP 毒性旁分泌擴散', badge: '傳染風暴' },
          { id: 'CLEARANCE', step: '階段 4', title: 'Senolytics 靶向凋亡', badge: '清道夫' },
        ].map((s) => {
          const isActive = activeStage === s.id;
          return (
            <button
              key={s.id}
              onClick={() => setActiveStage(s.id as any)}
              className={`p-3 rounded-2xl border text-left transition-all ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-md ring-2 ring-emerald-500/20 border-emerald-500'
                  : 'bg-white/90 dark:bg-slate-900/60 border-emerald-200/70 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:border-emerald-400 hover:bg-emerald-50/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-mono font-bold ${isActive ? 'text-emerald-100' : 'text-slate-500'}`}>{s.step}</span>
                <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                  isActive ? 'bg-white/20 text-white border border-white/30' : 'bg-emerald-50 dark:bg-white/5 text-emerald-800 dark:text-slate-300 border border-emerald-200 dark:border-white/10'
                }`}>
                  {s.badge}
                </span>
              </div>
              <div className={`font-bold text-xs mt-1 truncate ${isActive ? 'text-white' : 'text-slate-900 dark:text-white'}`}>{s.title}</div>
            </button>
          );
        })}
      </div>

      {/* Dynamic Stage Detail Card */}
      <div className="rounded-3xl border border-emerald-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/80 p-6 sm:p-8 space-y-6 shadow-sm">
        {activeStage === 'DAMAGE' && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center gap-2 text-teal-700 dark:text-salud-cyan font-bold text-base">
              <Zap className="w-5 h-5 text-teal-600 dark:text-salud-cyan" />
              <span>起因層：不可修復的雙鏈斷裂與複製極限 (Hayflick Limit)</span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              正常細胞在經歷 50~70 次有絲分裂後，染色體末端端粒長度耗竭，或遭遇高劑量活性氧 (ROS)、致癌基因活化突變。細胞啟動持續性 DNA 損傷反應 (DDR)，ATM 與 ATR 激酶常態活化。
            </p>
            <div className="p-4 rounded-2xl bg-emerald-50/40 dark:bg-slate-950 border border-emerald-200/70 dark:border-slate-850 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="font-bold text-slate-900 dark:text-slate-200">典型標記：</span>
                <span className="text-slate-700 dark:text-slate-400 ml-1">γ-H2AX 焦點增加、短端粒比例升高</span>
              </div>
              <div>
                <span className="font-bold text-slate-900 dark:text-slate-200">細胞命運：</span>
                <span className="text-slate-700 dark:text-slate-400 ml-1">無法完成 G1/S 期或 G2/M 期檢查點轉換</span>
              </div>
            </div>
          </div>
        )}

        {activeStage === 'ARREST' && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-base">
              <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <span>鎖死層：p16(INK4a) 與 p21(CIP1) 永久踩下煞車</span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              為防範突變細胞癌變，細胞強制表達細胞週期蛋白依賴性激酶抑制劑 p16(INK4a) 和 p21(CIP1)。Rb 蛋白處於低磷酸化狀態，牢牢鎖死 E2F 轉錄因子。細胞形態顯著扁平肥大，酸性 β-半乳糖苷酶 (SA-β-gal) 染色呈深藍色陽性。
            </p>
            <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-slate-950 border border-amber-200 dark:border-slate-850 text-xs text-amber-900 dark:text-amber-300/90 leading-relaxed font-mono">
              致命關鍵：細胞雖然停止分裂，但拒絕死亡！它點火了 BCL-2、BCL-xL 等促存活抗凋亡通路 (SCAP)，抵抗人體免疫系統的正常清除。
            </div>
          </div>
        )}

        {activeStage === 'SASP' && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-bold text-base">
              <Flame className="w-5 h-5 text-rose-600 dark:text-rose-400" />
              <span>毒性層：SASP (衰老相關分泌表型) 旁分泌風暴</span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              殭屍細胞透過 NF-κB 與 cGAS-STING 通路，源源不絕向細胞外基質分泌促炎細胞因子、趨化因子與基質降解酵素。這些毒性分子會破壞細胞外膠原蛋白，並像「生化傳染」般誘發周遭本來健康的細胞也跟著衰老！
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-rose-50/70 dark:bg-slate-950 border border-rose-200 dark:border-slate-850 text-xs space-y-1">
                <div className="font-bold text-rose-700 dark:text-rose-400">發炎細胞因子</div>
                <div className="text-slate-800 dark:text-slate-300 font-mono text-[11px]">IL-6, IL-1β, TNF-α</div>
                <div className="text-[10px] text-slate-600 dark:text-slate-500">驅動全身慢性低度發炎 (Inflammaging)</div>
              </div>
              <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-slate-950 border border-amber-200 dark:border-slate-850 text-xs space-y-1">
                <div className="font-bold text-amber-700 dark:text-amber-400">基質金屬蛋白酶</div>
                <div className="text-slate-800 dark:text-slate-300 font-mono text-[11px]">MMP-1, MMP-3, MMP-12</div>
                <div className="text-[10px] text-slate-600 dark:text-slate-500">溶解結締組織、誘發動脈硬化與關節退化</div>
              </div>
              <div className="p-3.5 rounded-xl bg-purple-50/70 dark:bg-slate-950 border border-purple-200 dark:border-slate-850 text-xs space-y-1">
                <div className="font-bold text-purple-700 dark:text-purple-400">血管與纖溶調節</div>
                <div className="text-slate-800 dark:text-slate-300 font-mono text-[11px]">PAI-1, VEGF, GDF-15</div>
                <div className="text-[10px] text-slate-600 dark:text-slate-500">促進微血管滲漏與血栓形成傾向</div>
              </div>
            </div>
          </div>
        )}

        {activeStage === 'CLEARANCE' && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-base">
              <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>清除層：Senolytics「打帶跑 (Hit-and-Run)」標靶誘導凋亡</span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Senolytics（如達沙替尼、槲皮素、非瑟酮）能選擇性暫時關閉殭屍細胞的 BCL-2 / BCL-xL 防護罩，促使內源性凋亡反應啟動，將殭屍細胞逐出體內。健康正常細胞因依賴其他生理機制而不受影響。
            </p>
            <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-500/30 text-xs text-slate-800 dark:text-slate-200 space-y-2">
              <div className="font-bold text-emerald-800 dark:text-emerald-400 font-mono">Mayo Clinic 臨床推薦「打帶跑」方案：</div>
              <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
                衰老細胞生成緩慢，清除一次後需數月才會再積聚。因此非每日長期服藥，而是「每個月或每季連續使用 2~3 天」，隨後徹底停藥。此方案兼具極高安全性與深層微環境淨化效果！
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Obesity & Senescence Cross-Pillar Link Box */}
      <div className="p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 text-xs text-slate-800 dark:text-slate-200 flex items-start gap-3 shadow-xs">
        <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold text-amber-800 dark:text-amber-300">跨專區連動警示：肥胖內臟脂肪是全身最大的 SASP 毒素製造工廠！</span>
          <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
            大量臨床切片研究證實：肥胖者腹腔內網膜脂肪組織中的前驅脂肪細胞與巨噬細胞，大量處於 p16 陽性衰老狀態。這意味著肥胖直接等於「全身加速衰老」。積極控制體重與消除內臟脂肪，就是最有效的第一線抗衰老療法。
          </p>
        </div>
      </div>
    </div>
  );
};
