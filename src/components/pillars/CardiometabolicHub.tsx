import React, { useState } from 'react';
import {
  BP_722_PROTOCOL,
  TSOC_BP_CATEGORIES,
  METSYN_CRITERIA,
  ATHEROSCLEROSIS_STAGES,
  MODERN_LIPID_PROFILES,
  CAC_STRATIFICATIONS,
  CKM_STAGES_DATA,
  CARDIOMETABOLIC_MYTHS,
} from '../../data/cardiometabolicData';
import { CardiometabolicSubTab } from '../../types';
import { useLanguage } from '../../i18n';
import { EvidenceBadge } from '../common/EvidenceBadge';
import {
  HeartPulse,
  Activity,
  ShieldCheck,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Layers,
  Clock,
  CheckCircle2,
  AlertOctagon,
  HelpCircle,
  TrendingDown,
  Info,
  Stethoscope,
  Pill,
  Calculator,
  Flame,
  ArrowRight,
  ShieldAlert,
  Scale,
} from 'lucide-react';

export const CardiometabolicHub: React.FC = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<CardiometabolicSubTab>('OVERVIEW');
  const [expandedAtheroStage, setExpandedAtheroStage] = useState<number | null>(2);
  const [selectedCacScore, setSelectedCacScore] = useState<string>(CAC_STRATIFICATIONS[1].agatston_score_range);
  const [expandedMyth, setExpandedMyth] = useState<string | null>('C-MYTH-01');

  // ── Lipid Discordance Calculator State ──
  const [calcTc, setCalcTc] = useState<number>(210);
  const [calcHdl, setCalcHdl] = useState<number>(42);
  const [calcTg, setCalcTg] = useState<number>(220);
  const [calcLdl, setCalcLdl] = useState<number>(124);
  const [calcApob, setCalcApob] = useState<number>(115);
  const [hasDiabetes, setHasDiabetes] = useState<boolean>(false);

  // Derived lipid metrics
  const nonHdl = calcTc - calcHdl;
  const remnantChol = Math.max(0, calcTc - calcHdl - calcLdl);
  const tgHdlRatio = calcHdl > 0 ? Number((calcTg / calcHdl).toFixed(2)) : 0;
  const isApoBDiscordant = calcLdl < 130 && calcApob >= 100;
  const isHighRemnant = remnantChol > 25;

  // ── 722 Blood Pressure Analyzer State ──
  const [sbpMorning, setSbpMorning] = useState<number>(134);
  const [dbpMorning, setDbpMorning] = useState<number>(84);
  const [sbpEvening, setSbpEvening] = useState<number>(128);
  const [dbpEvening, setDbpEvening] = useState<number>(80);

  const meanSbp = Math.round((sbpMorning + sbpEvening) / 2);
  const meanDbp = Math.round((dbpMorning + dbpEvening) / 2);
  const meanArterialPressure = Math.round(meanDbp + (meanSbp - meanDbp) / 3);
  const pulsePressure = meanSbp - meanDbp;

  // Classify BP based on TSOC 2022
  const bpCategory =
    meanSbp >= 140 || meanDbp >= 90
      ? TSOC_BP_CATEGORIES[3] // Stage 2
      : meanSbp >= 130 || meanDbp >= 80
      ? TSOC_BP_CATEGORIES[2] // Stage 1
      : meanSbp >= 120
      ? TSOC_BP_CATEGORIES[1] // Elevated
      : TSOC_BP_CATEGORIES[0]; // Optimal

  return (
    <div className="space-y-8 max-w-5xl mx-auto font-sans pb-20 animate-fade-in">
      {/* ── Grand Hero Header ── */}
      <div className="relative overflow-hidden rounded-3xl border border-emerald-300/80 dark:border-emerald-800/60 bg-gradient-to-br from-emerald-50 via-teal-50/70 to-emerald-100/50 dark:from-emerald-950/80 dark:via-slate-900/95 dark:to-teal-950/40 p-6 sm:p-10 shadow-sm dark:shadow-2xl backdrop-blur-md">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/90 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700/60 text-xs font-mono font-bold">
              <HeartPulse className="w-4 h-4 text-emerald-600 dark:text-emerald-400 animate-pulse" />
              <span>Salud 旗艦支柱 · 心血代謝專科總樞紐</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-display font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
              <span>心血管與代謝醫學、動脈硬化機轉、現代脂質學與 722 血壓</span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              動脈粥狀硬化與心血管疾病（CVD）是全球頭號死因，其病變在青少年期即已悄然展開。超越單純「總膽固醇」迷思，全面導入{' '}
              <span className="text-emerald-800 dark:text-emerald-400 font-bold">ApoB 致病顆粒真實計數</span>、
              <span className="text-teal-800 dark:text-cyan-400 font-bold">Lp(a) 遺傳性風險標記</span>、
              <span className="text-rose-800 dark:text-rose-400 font-bold">動脈硬化 5 階段細胞級聯</span>、
              <span className="text-indigo-800 dark:text-indigo-400 font-bold">CAC 冠狀動脈鈣化決策樹</span> 與{' '}
              <span className="text-emerald-800 dark:text-emerald-400 font-bold">2022 TSOC 居家 722 血壓金標準</span>！
            </p>
          </div>

          {/* Quick Metrics Badges */}
          <div className="grid grid-cols-2 gap-3 shrink-0">
            <div className="p-3.5 rounded-2xl bg-white/95 dark:bg-slate-900/80 border border-emerald-200 dark:border-white/10 shadow-xs text-center">
              <div className="text-xl font-mono font-extrabold text-emerald-700 dark:text-emerald-400">CEBM 1a</div>
              <div className="text-[10px] text-slate-600 dark:text-slate-400 font-medium">實證醫學等級</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/95 dark:bg-slate-900/80 border border-emerald-200 dark:border-white/10 shadow-xs text-center">
              <div className="text-xl font-mono font-extrabold text-teal-700 dark:text-teal-400">ApoB</div>
              <div className="text-[10px] text-slate-600 dark:text-slate-400 font-medium">致病顆粒金標準</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/95 dark:bg-slate-900/80 border border-emerald-200 dark:border-white/10 shadow-xs text-center">
              <div className="text-xl font-mono font-extrabold text-cyan-700 dark:text-cyan-400">722 原則</div>
              <div className="text-[10px] text-slate-600 dark:text-slate-400 font-medium">TSOC 居家自量</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/95 dark:bg-slate-900/80 border border-emerald-200 dark:border-white/10 shadow-xs text-center">
              <div className="text-xl font-mono font-extrabold text-indigo-700 dark:text-purple-400">CAC 評分</div>
              <div className="text-[10px] text-slate-600 dark:text-slate-400 font-medium">血管斑塊硬化度</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-emerald-200/80 dark:border-slate-800 pb-2 text-xs font-mono">
        <button
          onClick={() => setActiveTab('OVERVIEW')}
          className={`btn-tactile flex items-center gap-1.5 px-3.5 py-2 rounded-2xl border transition-all ${
            activeTab === 'OVERVIEW'
              ? 'bg-emerald-600 text-white font-extrabold border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
              : 'bg-white/90 dark:bg-slate-900 border-emerald-200/70 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:border-emerald-400 hover:bg-emerald-50/40'
          }`}
        >
          <HeartPulse className="w-4 h-4" />
          <span>專區綜覽與治理架構</span>
        </button>

        <button
          onClick={() => setActiveTab('LIPIDS_APOB')}
          className={`btn-tactile flex items-center gap-1.5 px-3.5 py-2 rounded-2xl border transition-all ${
            activeTab === 'LIPIDS_APOB'
              ? 'bg-teal-600 text-white font-bold border-teal-500 shadow-md ring-2 ring-teal-500/20'
              : 'bg-white/90 dark:bg-slate-900 border-emerald-200/70 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:border-teal-400 hover:bg-teal-50/40'
          }`}
        >
          <Pill className="w-4 h-4" />
          <span>現代脂質學與 ApoB 革命</span>
        </button>

        <button
          onClick={() => setActiveTab('BP_722')}
          className={`btn-tactile flex items-center gap-1.5 px-3.5 py-2 rounded-2xl border transition-all ${
            activeTab === 'BP_722'
              ? 'bg-emerald-600 text-white font-bold border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
              : 'bg-white/90 dark:bg-slate-900 border-emerald-200/70 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:border-emerald-400 hover:bg-emerald-50/40'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>TSOC 722 居家血壓原則</span>
        </button>

        <button
          onClick={() => setActiveTab('ATHERO_CAC')}
          className={`btn-tactile flex items-center gap-1.5 px-3.5 py-2 rounded-2xl border transition-all ${
            activeTab === 'ATHERO_CAC'
              ? 'bg-rose-600 text-white font-bold border-rose-500 shadow-md ring-2 ring-rose-500/20'
              : 'bg-white/90 dark:bg-slate-900 border-emerald-200/70 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:border-rose-400 hover:bg-rose-50/40'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>動脈硬化5階段與 CAC 評估</span>
        </button>

        <button
          onClick={() => setActiveTab('METSYN_CKM')}
          className={`btn-tactile flex items-center gap-1.5 px-3.5 py-2 rounded-2xl border transition-all ${
            activeTab === 'METSYN_CKM'
              ? 'bg-indigo-600 text-white font-bold border-indigo-500 shadow-md ring-2 ring-indigo-500/20'
              : 'bg-white/90 dark:bg-slate-900 border-emerald-200/70 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:border-indigo-400 hover:bg-indigo-50/40'
          }`}
        >
          <Scale className="w-4 h-4" />
          <span>代謝症候群與 AHA CKM 症候群</span>
        </button>

        <button
          onClick={() => setActiveTab('CALCULATORS')}
          className={`btn-tactile flex items-center gap-1.5 px-3.5 py-2 rounded-2xl border transition-all ${
            activeTab === 'CALCULATORS'
              ? 'bg-emerald-700 text-white font-bold border-emerald-600 shadow-md ring-2 ring-emerald-500/20'
              : 'bg-white/90 dark:bg-slate-900 border-emerald-200/70 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:border-emerald-500 hover:bg-emerald-50/40'
          }`}
        >
          <Calculator className="w-4 h-4 text-amber-300 animate-pulse" />
          <span>互動試算機 (ApoB不一致性 / 722日誌)</span>
        </button>
      </div>

      {/* ── Sub-Tab 1: OVERVIEW ── */}
      {activeTab === 'OVERVIEW' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white font-display">
              <Stethoscope className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>心血管與代謝醫學專科治理宣言 (Clinical Governance Manifesto)</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              心血管疾病（心肌梗塞、主動脈剝離、腦中風）並非突如其來的意外，而是歷經數十年無聲醞釀的「慢性能量與脂質中毒反應」。本專區由台灣心臟專科醫師（EC-02）、內分泌新陳代謝科醫師（EC-28）與臨床藥學專家（EC-12）三方聯合審定，遵循
              Oxford CEBM Level 1a 頂級實證，協助每位追求極致健康者在症狀爆發前 10–20 年精確阻斷病理鏈。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 space-y-1.5">
                <span className="font-mono text-xs font-bold text-emerald-800 dark:text-emerald-300 block">① 顆粒致病論 (Particle Count)</span>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  穿透內皮造成動脈硬化的是「顆粒個數（ApoB）」，而非膽固醇總重。重視小緻密低密度脂蛋白（sdLDL）的隱匿殺傷力。
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-teal-50/60 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800/60 space-y-1.5">
                <span className="font-mono text-xs font-bold text-teal-800 dark:text-teal-300 block">② 居家血壓真標準 (722 Protocol)</span>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  摒除醫院診間緊張單次量測的白袍干擾，唯有晨起與就寢前連續一週的平均值，才能誠實反映大動脈真實硬化阻力。
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/60 space-y-1.5">
                <span className="font-mono text-xs font-bold text-indigo-800 dark:text-indigo-300 block">③ 心腎代謝共病體 (AHA CKM)</span>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  心臟、血管、腎臟與胰島素代謝為不可分割的一體。從早期腹部肥胖（Stage 1）即應啟動靶向防護，阻斷終末器官衰竭。
                </p>
              </div>
            </div>
          </div>

          {/* 迷思粉碎區 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white font-display border-b border-slate-200 dark:border-slate-800 pb-2">
              <HelpCircle className="w-5 h-5 text-amber-500" />
              <span>心血管與膽固醇常見醫學迷思粉碎機 (Myth Busters)</span>
            </div>

            <div className="space-y-3">
              {CARDIOMETABOLIC_MYTHS.map((myth) => {
                const isExpanded = expandedMyth === myth.id;
                return (
                  <div
                    key={myth.id}
                    className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 shadow-sm space-y-3 transition-all hover:border-emerald-300"
                  >
                    <div
                      className="flex items-start justify-between gap-3 cursor-pointer"
                      onClick={() => setExpandedMyth(isExpanded ? null : myth.id)}
                    >
                      <div className="space-y-1">
                        <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400">{myth.id}</span>
                        <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">{myth.myth_claim}</h4>
                        <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">✓ 實證真相：{myth.reality_truth}</p>
                      </div>
                      <button className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>

                    {isExpanded && (
                      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-2 text-xs font-sans animate-fade-in">
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-1">
                          <span className="font-bold text-slate-800 dark:text-slate-200">🔬 生理與生化機轉深解：</span>
                          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{myth.biochemical_mechanism}</p>
                        </div>
                        <div className="p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 space-y-1">
                          <span className="font-bold text-emerald-800 dark:text-emerald-300">💡 臨床實戰處方指南：</span>
                          <p className="text-emerald-900 dark:text-emerald-200 leading-relaxed">{myth.action_pearl}</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── Sub-Tab 2: LIPIDS_APOB ── */}
      {activeTab === 'LIPIDS_APOB' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-teal-50/80 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800/60 space-y-2">
            <h3 className="text-lg font-bold text-teal-900 dark:text-teal-200 font-display flex items-center gap-2">
              <Pill className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              <span>現代脂質學：載脂蛋白 ApoB 與傳統 LDL-C 濃度不一致性（Discordance）</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              在傳統健檢中，大多數人只看「低密度脂蛋白膽固醇（LDL-C）」。然而，LDL-C 測量的是脂蛋白所包裹的膽固醇「重量（mg/dL）」。當代謝紊亂（高三酸甘油酯、腹部肥胖、胰島素阻抗）時，LDL
              顆粒會發生微粒化，轉變成「小而緻密低密度脂蛋白（sdLDL）」。此時每個顆粒內的膽固醇減少，但顆粒總數量卻大幅飆升！動脈內皮只認顆粒物理碰撞穿透率，因此{' '}
              <strong className="text-teal-800 dark:text-teal-300">ApoB 才是直接決定動脈硬化命運的根本變因</strong>。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MODERN_LIPID_PROFILES.map((lipid) => (
              <div
                key={lipid.id}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-teal-700 dark:text-teal-400">{lipid.id}</span>
                    <EvidenceBadge grade={lipid.evidence_grade} />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">{lipid.unit}</span>
                </div>

                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">{lipid.name_zh}</h4>
                  <div className="text-xs font-mono text-slate-500 dark:text-slate-400">{lipid.name_en}</div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono p-3 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200/80 dark:border-slate-800">
                  <div>
                    <span className="text-slate-400 text-[10px] block">臨床最佳達標</span>
                    <strong className="text-emerald-700 dark:text-emerald-400 text-xs">{lipid.optimal_target_zh}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">高風險臨界點</span>
                    <strong className="text-rose-700 dark:text-rose-400 text-xs">{lipid.high_risk_threshold_zh}</strong>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                  <p><strong className="text-slate-800 dark:text-slate-200">致病病理角色：</strong>{lipid.atherogenic_role_zh}</p>
                  <p className="pt-1 text-teal-800 dark:text-teal-300 font-medium">
                    <strong>臨床優勢評析：</strong>{lipid.clinical_superiority_zh}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Sub-Tab 3: BP_722 ── */}
      {activeTab === 'BP_722' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 space-y-3">
            <h3 className="text-lg font-bold text-emerald-900 dark:text-emerald-200 font-display flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>2022 台灣心臟學會 (TSOC) 居家血壓量測金標準：722 原則</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              單次在診間量測血壓往往受到「白袍高血壓（診間緊張飆高）」或「隱匿性高血壓（診間正常但生活中飆高）」的嚴重干擾。2022 年 TSOC
              指引正式全面下修高血壓標準至 <strong className="text-emerald-800 dark:text-emerald-300">130/80 mmHg</strong>，並以「居家血壓 722
              法則」作為最優先診斷與處方依據。
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-emerald-200 dark:border-slate-800 text-center space-y-2 shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-display font-extrabold text-2xl flex items-center justify-center mx-auto">
                7
              </div>
              <strong className="text-sm font-bold text-slate-900 dark:text-white block">連續 7 天量測</strong>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                連續一週取得 14 次平均數據，消除單日情緒、天氣溫差或偶發飲食之急性干擾。
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-teal-200 dark:border-slate-800 text-center space-y-2 shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-teal-100 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 font-display font-extrabold text-2xl flex items-center justify-center mx-auto">
                2
              </div>
              <strong className="text-sm font-bold text-slate-900 dark:text-white block">每天 2 個時段</strong>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                晨起後 1 小時內（如廁後、服藥進食前）與晚間就寢前 1 小時內各量測一次。
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-indigo-200 dark:border-slate-800 text-center space-y-2 shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 font-display font-extrabold text-2xl flex items-center justify-center mx-auto">
                2
              </div>
              <strong className="text-sm font-bold text-slate-900 dark:text-white block">每次量 2 遍</strong>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                靜坐休息 5 分鐘後量第一遍，間隔 1 分鐘量第二遍，取兩次平均值作為該時段紀錄。
              </p>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-3">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white font-display">
              TSOC 2022 居家血壓臨床分期標準尺規
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-xs">
              {TSOC_BP_CATEGORIES.map((cat) => (
                <div key={cat.category} className={`p-4 rounded-2xl border ${cat.color_class} space-y-1.5`}>
                  <strong className="text-sm block">{cat.name_zh}</strong>
                  <div className="text-xs font-extrabold">{cat.systolic_range}</div>
                  <div className="text-[11px] opacity-80">{cat.diastolic_range}</div>
                  <p className="text-[11px] font-sans pt-1 leading-relaxed opacity-90">{cat.clinical_directive_zh}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Sub-Tab 4: ATHERO_CAC ── */}
      {activeTab === 'ATHERO_CAC' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-rose-50/80 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/60 space-y-2">
            <h3 className="text-lg font-bold text-rose-900 dark:text-rose-200 font-display flex items-center gap-2">
              <Layers className="w-5 h-5 text-rose-600 dark:text-rose-400" />
              <span>動脈粥狀硬化 5 階段分子病理級聯（Atherosclerosis Cascade）</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              動脈硬化不是管壁單純的「水管結垢」，而是一場由 ApoB 滯留引發的「血管壁慢性壞死性自體發炎風暴」。點擊下方各階段，深入了解從分子微損傷到急性血栓爆發的完整生理機轉與對應 Oxford CEBM Level 1a 治療指引。
            </p>
          </div>

          {/* 5 階段手風琴 */}
          <div className="space-y-3">
            {ATHEROSCLEROSIS_STAGES.map((stage) => {
              const isExpanded = expandedAtheroStage === stage.stage_number;
              return (
                <div
                  key={stage.stage_number}
                  className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-sm space-y-3 transition-all hover:border-rose-300"
                >
                  <div
                    className="flex items-center justify-between gap-3 cursor-pointer"
                    onClick={() => setExpandedAtheroStage(isExpanded ? null : stage.stage_number)}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-xl bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 font-mono font-bold text-sm flex items-center justify-center shrink-0">
                        {stage.stage_number}
                      </span>
                      <div>
                        <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">{stage.name_zh}</h4>
                        <span className="text-xs font-mono text-slate-400">{stage.name_en}</span>
                      </div>
                    </div>
                    <button className="p-1 text-slate-400 hover:text-slate-600">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3 text-xs font-sans animate-fade-in">
                      <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-1">
                        <strong className="text-slate-800 dark:text-slate-200 block">🔬 病理生理機轉（Pathophysiology）：</strong>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{stage.pathophysiological_mechanism_zh}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 space-y-1">
                          <strong className="text-slate-800 dark:text-slate-200 block">🩺 臨床自覺表現：</strong>
                          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{stage.clinical_manifestation_zh}</p>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 space-y-1">
                          <strong className="text-slate-800 dark:text-slate-200 block">📷 醫學影像特徵：</strong>
                          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{stage.imaging_features}</p>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-rose-50/80 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/60 space-y-1.5">
                        <strong className="text-rose-900 dark:text-rose-200 block font-mono">🛡️ Oxford Level 1a 實證治療處方路徑：</strong>
                        <ul className="space-y-1 text-slate-700 dark:text-slate-300 list-disc pl-4">
                          {stage.oxford_level_1a_interventions_zh.map((itv, idx) => (
                            <li key={idx}>{itv}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* CAC 冠狀動脈鈣化決策樹 */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white font-display">
              <ShieldAlert className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>冠狀動脈鈣化積分 (CAC Agatston Score) 臨床路徑決策樹</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              CAC 掃描為非侵入性低輻射胸部電腦斷層，能直接「看見」心臟冠狀動脈管壁中是否有已經沉積鈣化的實體斑塊。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {CAC_STRATIFICATIONS.map((cac) => (
                <div
                  key={cac.agatston_score_range}
                  className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/50 space-y-2 text-xs font-sans"
                >
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800/80 pb-1.5">
                    <strong className="text-sm font-bold text-indigo-800 dark:text-indigo-300 font-mono">
                      {cac.agatston_score_range}
                    </strong>
                    <span className="px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 text-[10px] font-bold">
                      {cac.risk_category_zh}
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300"><strong>10 年風險：</strong>{cac.ten_year_ascvd_risk_zh}</p>
                  <p className="text-slate-700 dark:text-slate-200"><strong>💊 藥物介入：</strong>{cac.statin_recommendation_zh}</p>
                  <p className="text-indigo-900 dark:text-indigo-300 font-medium text-[11px] pt-1 border-t border-slate-200/60 dark:border-slate-800/60">
                    💡 臨床珍珠：{cac.clinical_pearl_zh}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Sub-Tab 5: METSYN_CKM ── */}
      {activeTab === 'METSYN_CKM' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-indigo-50/80 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/60 space-y-2">
            <h3 className="text-lg font-bold text-indigo-900 dark:text-indigo-200 font-display flex items-center gap-2">
              <Scale className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>代謝症候群 5 大標準與 2023 AHA 心血管-腎臟-代謝 (CKM) 症候群</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              傳統醫學常將肥胖、高血壓、糖尿病與慢性腎病割裂看待。2023 年美國心臟協會 (AHA) 發布重大總統諮詢指引，將其統一為「CKM 症候群 (Cardiovascular-Kidney-Metabolic Syndrome)」，強調從過量脂肪蓄積（Stage 1）到器官功能性受損（Stage 2-3）與最終衰竭（Stage 4）的連續演進。
            </p>
          </div>

          {/* 5 大代謝指標 */}
          <div className="space-y-3">
            <h4 className="text-base font-bold text-slate-900 dark:text-white font-display">
              台灣衛生福利部 · 代謝症候群 5 大臨床診斷指標（符合 3 項即確診）
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {METSYN_CRITERIA.map((met) => (
                <div
                  key={met.id}
                  className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-sm space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-indigo-700 dark:text-indigo-400">{met.id}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{met.unit}</span>
                  </div>
                  <strong className="text-sm font-bold text-slate-900 dark:text-white block">{met.name_zh}</strong>
                  <div className="p-2 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 font-mono font-bold text-indigo-900 dark:text-indigo-300 text-xs">
                    {met.threshold_zh}
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed pt-1">
                    {met.biological_link_zh}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CKM 4 大階段 */}
          <div className="space-y-3 pt-4">
            <h4 className="text-base font-bold text-slate-900 dark:text-white font-display">
              2023 AHA CKM 症候群 0 至 4 期臨床防治階梯
            </h4>
            <div className="space-y-3">
              {CKM_STAGES_DATA.map((ckm) => (
                <div
                  key={ckm.stage}
                  className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-sm space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                    <strong className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                      {ckm.title_zh}
                    </strong>
                    <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 font-mono text-xs font-bold">
                      Stage {ckm.stage}
                    </span>
                  </div>

                  <p className="text-xs text-indigo-700 dark:text-indigo-400 font-medium">📌 {ckm.subtitle_zh}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 space-y-1">
                      <strong className="text-slate-800 dark:text-slate-200 block">診斷判斷標準：</strong>
                      <ul className="list-disc pl-4 space-y-0.5 text-slate-600 dark:text-slate-400">
                        {ckm.criteria_zh.map((c, i) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 space-y-1">
                      <strong className="text-emerald-800 dark:text-emerald-300 block">一線處方與主要目標：</strong>
                      <ul className="list-disc pl-4 space-y-0.5 text-slate-700 dark:text-slate-300">
                        {ckm.primary_goals_zh.map((g, i) => (
                          <li key={i}>{g}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Sub-Tab 6: CALCULATORS ── */}
      {activeTab === 'CALCULATORS' && (
        <div className="space-y-8">
          {/* Calculator 1: ApoB & Comprehensive Lipid Panel Discordance Calculator */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/90 border border-teal-300/80 dark:border-teal-700/60 shadow-lg space-y-6">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
                <Calculator className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                <span>ApoB 載脂蛋白與全血脂不一致性試算機 (ApoB Discordance Engine)</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-1">
                根據 2023 ACC/AHA 脂質共識，即時評估小而緻密 LDL (sdLDL)、殘餘膽固醇與顆粒計數超標風險
              </p>
            </div>

            {/* Input fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-mono">
              <div className="space-y-1.5">
                <label className="text-slate-700 dark:text-slate-300 font-bold">總膽固醇 (Total Cholesterol, mg/dL)</label>
                <input
                  type="number"
                  value={calcTc}
                  onChange={(e) => setCalcTc(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white font-bold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-700 dark:text-slate-300 font-bold">高密度脂蛋白 (HDL-C, mg/dL)</label>
                <input
                  type="number"
                  value={calcHdl}
                  onChange={(e) => setCalcHdl(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white font-bold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-700 dark:text-slate-300 font-bold">三酸甘油酯 (Triglycerides, mg/dL)</label>
                <input
                  type="number"
                  value={calcTg}
                  onChange={(e) => setCalcTg(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white font-bold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-700 dark:text-slate-300 font-bold">低密度脂蛋白 (LDL-C, mg/dL)</label>
                <input
                  type="number"
                  value={calcLdl}
                  onChange={(e) => setCalcLdl(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white font-bold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-700 dark:text-slate-300 font-bold">載脂蛋白 B (ApoB, mg/dL - 選填)</label>
                <input
                  type="number"
                  value={calcApob}
                  onChange={(e) => setCalcApob(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white font-bold"
                />
              </div>

              <div className="space-y-1.5 flex flex-col justify-end">
                <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasDiabetes}
                    onChange={(e) => setHasDiabetes(e.target.checked)}
                    className="w-4 h-4 rounded text-teal-600"
                  />
                  <span className="text-slate-700 dark:text-slate-300 font-bold">已確診糖尿病或胰島素阻抗</span>
                </label>
              </div>
            </div>

            {/* Calculated Output Matrix */}
            <div className="p-5 rounded-2xl bg-teal-50/70 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/80 space-y-4 font-sans text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-center">
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-teal-200 dark:border-slate-800">
                  <span className="text-slate-400 text-[10px] block">非-HDL 膽固醇</span>
                  <strong className="text-base text-slate-900 dark:text-white font-extrabold">{nonHdl}</strong>
                  <span className="text-[10px] text-slate-500 block">目標 &lt; 100 mg/dL</span>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-teal-200 dark:border-slate-800">
                  <span className="text-slate-400 text-[10px] block">殘餘膽固醇 (Remnant)</span>
                  <strong className={`text-base font-extrabold ${isHighRemnant ? 'text-rose-600' : 'text-emerald-600'}`}>
                    {remnantChol}
                  </strong>
                  <span className="text-[10px] text-slate-500 block">理想 &lt; 20-25 mg/dL</span>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-teal-200 dark:border-slate-800">
                  <span className="text-slate-400 text-[10px] block">TG / HDL 比值</span>
                  <strong className={`text-base font-extrabold ${tgHdlRatio > 3.0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                    {tgHdlRatio}
                  </strong>
                  <span className="text-[10px] text-slate-500 block">理想 &lt; 2.0 (＞3提示阻抗)</span>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-teal-200 dark:border-slate-800">
                  <span className="text-slate-400 text-[10px] block">ApoB 顆粒警報</span>
                  <strong className={`text-base font-extrabold ${calcApob > 100 ? 'text-rose-600' : 'text-emerald-600'}`}>
                    {calcApob > 100 ? '高致病顆粒' : '達標控制'}
                  </strong>
                  <span className="text-[10px] text-slate-500 block">高危險 &gt; 100 mg/dL</span>
                </div>
              </div>

              {/* Clinical Verdict Narrative */}
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-teal-300 dark:border-teal-700/60 space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm text-teal-900 dark:text-teal-200">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  <span>臨床實證診斷與個人化處方指引 (Oxford CEBM 1a)</span>
                </div>

                {isApoBDiscordant && (
                  <div className="p-2.5 rounded-lg bg-amber-100/80 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-700/60 text-amber-900 dark:text-amber-200 text-xs font-mono font-bold">
                    ⚠️ 偵測到「ApoB 與 LDL-C 不一致性（Discordance）」！雖然 LDL-C 數值看起來並不算極端，但由於三酸甘油酯偏高（{calcTg} mg/dL），體內正大量產生小而緻密 LDL (sdLDL) 顆粒，ApoB 高達 {calcApob} mg/dL，動脈硬化穿透力極強，切勿落入「數字假象正常」之陷阱！
                  </div>
                )}

                <ul className="space-y-1 text-slate-700 dark:text-slate-300 list-disc pl-4 text-xs leading-relaxed">
                  <li><strong>生活型態處方：</strong>每日攝取水溶性膳食纖維（燕麥麩皮、洋車前子 10–15g）、特級初榨橄欖油替換動物油脂（Chapter O 等熱量置換），每週進行 150–300 分鐘 Zone 2 有氧運動以活化骨骼肌 LPL 酵素。</li>
                  <li><strong>飲食地雷防範：</strong>嚴格戒除高果糖玉米糖漿（手搖飲）、反式脂肪酸與含糖甜點，以切斷肝臟過量合成 VLDL 的原料供給。</li>
                  <li><strong>藥物考量：</strong>若生活型態介入 3 個月後 ApoB 仍 &gt; 80 mg/dL（或合並糖尿病），建議專科醫師處方中-高強度 Statin ＋ Ezetimibe 雙聯治療。</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Calculator 2: TSOC 722 Blood Pressure 7-Day Analyzer */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/90 border border-emerald-300/80 dark:border-emerald-700/60 shadow-lg space-y-6">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span>TSOC 722 居家血壓連續記錄與評估器 (Blood Pressure Analyzer)</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-1">
                輸入早晚 722 量測之平均血壓，自動試算平均動脈壓 (MAP)、脈搏壓 (PP) 與 2022 TSOC 臨床處方建議
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
                <span className="font-bold text-emerald-800 dark:text-emerald-300 block">晨起時段平均 (Morning BP)</span>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-500 block text-[10px]">收縮壓 (SBP, mmHg)</label>
                    <input
                      type="number"
                      value={sbpMorning}
                      onChange={(e) => setSbpMorning(Number(e.target.value))}
                      className="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold text-base text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-500 block text-[10px]">舒張壓 (DBP, mmHg)</label>
                    <input
                      type="number"
                      value={dbpMorning}
                      onChange={(e) => setDbpMorning(Number(e.target.value))}
                      className="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold text-base text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
                <span className="font-bold text-teal-800 dark:text-teal-300 block">就寢前時段平均 (Evening BP)</span>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-500 block text-[10px]">收縮壓 (SBP, mmHg)</label>
                    <input
                      type="number"
                      value={sbpEvening}
                      onChange={(e) => setSbpEvening(Number(e.target.value))}
                      className="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold text-base text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-500 block text-[10px]">舒張壓 (DBP, mmHg)</label>
                    <input
                      type="number"
                      value={dbpEvening}
                      onChange={(e) => setDbpEvening(Number(e.target.value))}
                      className="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold text-base text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* BP Diagnostics Summary */}
            <div className="p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 space-y-3 font-sans text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-center">
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400 text-[10px] block">綜合 722 平均</span>
                  <strong className="text-base font-extrabold text-slate-900 dark:text-white">
                    {meanSbp} / {meanDbp}
                  </strong>
                  <span className="text-[10px] text-slate-500 block">mmHg</span>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400 text-[10px] block">平均動脈壓 (MAP)</span>
                  <strong className="text-base font-extrabold text-emerald-700 dark:text-emerald-400">
                    {meanArterialPressure}
                  </strong>
                  <span className="text-[10px] text-slate-500 block">正常 70–100 mmHg</span>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400 text-[10px] block">脈搏壓 (Pulse Pressure)</span>
                  <strong className={`text-base font-extrabold ${pulsePressure > 60 ? 'text-rose-600' : 'text-slate-900 dark:text-white'}`}>
                    {pulsePressure}
                  </strong>
                  <span className="text-[10px] text-slate-500 block">＞60 mmHg提示血管硬化</span>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400 text-[10px] block">TSOC 分期診斷</span>
                  <strong className="text-xs font-extrabold text-slate-900 dark:text-white block truncate">
                    {bpCategory.name_zh.split(' ')[0]}
                  </strong>
                  <span className="text-[10px] text-slate-500 block">2022 最新指引</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-700/60 space-y-1">
                <strong className="text-emerald-900 dark:text-emerald-200 block font-mono">
                  📋 TSOC 2022 處方決策指示：
                </strong>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {bpCategory.clinical_directive_zh}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
