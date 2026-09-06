import React, { useState } from 'react';
import {
  EXPERT_BEST_PRACTICES,
  COUNCIL_EVIDENCE_STATS,
  ExpertBestPracticeData
} from '../../data/expertBestPractices';
import { EXPERT_COUNCIL } from '../../data/expertCouncil';
import { ExpertInfoGraph } from './ExpertInfoGraph';
import { LaypersonFriendlyGuide } from './LaypersonFriendlyGuide';
import { useLanguage } from '../../i18n';
import { HealthPillar } from '../../types';
import {
  ShieldCheck,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Search,
  Filter,
  ArrowRight,
  ExternalLink,
  Sparkles,
  FileText,
  Activity,
  Award,
  Layers,
  Droplets,
  Flame,
  Wine,
  Smile,
  Stethoscope,
  Eye,
  Lightbulb,
  Heart
} from 'lucide-react';

interface Props {
  initialExpertId?: string;
  onSelectPillar: (pillar: HealthPillar) => void;
  onBackToMain?: () => void;
}

export const ExpertBestPracticeView: React.FC<Props> = ({
  initialExpertId = 'EC-03',
  onSelectPillar,
  onBackToMain
}) => {
  const { t, language } = useLanguage();
  const [selectedExpertId, setSelectedExpertId] = useState<string>(initialExpertId);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [viewPerspective, setViewPerspective] = useState<'layperson' | 'clinical' | 'both'>('layperson');

  // Find active expert detailed best practice data
  const currentBestPractice: ExpertBestPracticeData =
    EXPERT_BEST_PRACTICES.find((e) => e.expertId === selectedExpertId) ||
    EXPERT_BEST_PRACTICES[0];

  // Also lookup base council member info
  const currentCouncilMember = EXPERT_COUNCIL.find(
    (m) => m.id === currentBestPractice.expertId
  );

  // Filter list
  const filteredBestPractices = EXPERT_BEST_PRACTICES.filter((item) => {
    const matchesCategory =
      activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      item.title_zh.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.primaryIssue_zh.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.expertId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.paperSynthesisScope.landmarkJournals.some((j) =>
        j.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 max-w-5xl mx-auto font-sans text-xs pb-20">
      {/* ── Top Hero: 24-Seat Evidence & Best Practice Engine ── */}
      <div className="p-6 sm:p-8 rounded-3xl border border-nature-amber-300/80 dark:border-nature-amber-800/40 bg-gradient-to-br from-nature-amber-100/80 via-white to-purple-50/50 dark:from-nature-amber-950/40 dark:via-salud-dark-card/70 dark:to-slate-950 shadow-sm relative overflow-hidden transition-colors">
        <div className="relative space-y-4 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 rounded-full font-mono text-xs font-bold border border-nature-amber-400 bg-nature-amber-100/90 text-nature-amber-900 dark:border-nature-amber-700/60 dark:bg-nature-amber-950/70 dark:text-nature-amber-300 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-nature-amber-600 dark:text-nature-amber-400" />
              24 席專家治理架構 · 臨床最佳實踐實證庫 (Clinical Best Practice Engine)
            </span>
            <span className="px-2.5 py-0.5 rounded-full font-mono text-[11px] font-bold bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800/60">
              50+ 篇期刊文獻 / 席
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-salud-dark-text tracking-tight">
            {language === 'zh-TW'
              ? '跨科別臨床實證與健康最佳實踐 (Best Practice)'
              : 'Cross-Disciplinary Clinical Evidence & Health Best Practices'}
          </h1>

          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
            依據醫學嚴謹性標準，本治理架構中每一位專家均針對所屬特定健康議題，
            <strong>深度系統性統合至少 50 篇以上全球頂尖同儕評審期刊論文</strong>
            （NEJM、The Lancet、JAMA、Circulation、Cell Metabolism、Cochrane 等），
            產出最新、經科學驗證且醫學正確的 GRADE 實證矩陣、生理機制 Info-Graph 與臨床操作紅線指南。
          </p>

          {/* Stat Pillars */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] font-mono text-slate-500 uppercase block font-bold">
                治理專科席位
              </span>
              <span className="text-lg font-mono font-extrabold text-nature-amber-700 dark:text-nature-amber-400">
                {COUNCIL_EVIDENCE_STATS.totalExperts} 席全科陣容
              </span>
            </div>
            <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] font-mono text-slate-500 uppercase block font-bold">
                統合頂級期刊文獻
              </span>
              <span className="text-lg font-mono font-extrabold text-purple-700 dark:text-purple-400">
                1,400+ 篇文獻庫
              </span>
            </div>
            <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] font-mono text-slate-500 uppercase block font-bold">
                GRADE 高強度實證
              </span>
              <span className="text-lg font-mono font-extrabold text-emerald-700 dark:text-emerald-400">
                {COUNCIL_EVIDENCE_STATS.gradeHighConfidenceRatio}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] font-mono text-slate-500 uppercase block font-bold">
                醫療把關政策
              </span>
              <span className="text-lg font-mono font-extrabold text-nature-sky-700 dark:text-nature-sky-400">
                0 AI 幻覺直出
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 全民必讀篇章：24 席專家歸納的 4 大生活黃金習慣圖解 ── */}
      <section className="p-5 sm:p-7 rounded-3xl border border-nature-amber-300/80 dark:border-nature-amber-800/60 bg-white/95 dark:bg-slate-900/90 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-nature-amber-500 text-black font-bold">
              <Lightbulb className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-display font-extrabold text-slate-900 dark:text-white">
                全民白話通識篇 · 24 席專家共識的「4 大生活黃金習慣」
              </h3>
              <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                1,400+ 篇期刊繁雜數據，化繁為簡歸納為每天最關鍵的 4 件事
              </p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full font-mono text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
            一般民眾 · 簡單好懂
          </span>
        </div>

        {/* 4 Illustrated Habit Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {/* Card 1: 喝水律 */}
          <div className="p-4 rounded-2xl border border-sky-200 dark:border-sky-900/60 bg-gradient-to-br from-sky-50/70 to-white dark:from-sky-950/30 dark:to-slate-900/60 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="p-2 rounded-xl bg-sky-500 text-white shadow-xs">
                <Droplets className="w-4 h-4" />
              </span>
              <span className="font-mono text-[10px] font-extrabold text-sky-700 dark:text-sky-300 bg-sky-100 dark:bg-sky-950/80 px-2 py-0.5 rounded-md border border-sky-300 dark:border-sky-800">
                01 喝水法則
              </span>
            </div>
            <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">
              小口慢喝，看尿色不看杯數
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
              短時間狂灌大水會讓腦部細胞水中毒。每次喝 250-350ml 慢飲，尿液呈「淡黃色」就是水分最剛好！
            </p>
            <div className="text-[10px] font-mono text-sky-600 dark:text-sky-400 font-semibold">
              💡 避開暴飲，保護腎臟大腦
            </div>
          </div>

          {/* Card 2: 選油律 */}
          <div className="p-4 rounded-2xl border border-amber-200 dark:border-amber-900/60 bg-gradient-to-br from-amber-50/70 to-white dark:from-amber-950/30 dark:to-slate-900/60 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="p-2 rounded-xl bg-amber-500 text-black shadow-xs">
                <Flame className="w-4 h-4" />
              </span>
              <span className="font-mono text-[10px] font-extrabold text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/80 px-2 py-0.5 rounded-md border border-amber-300 dark:border-amber-800">
                02 用油學問
              </span>
            </div>
            <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">
              廚房水炒不起煙，涼拌用橄欖
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
              炒菜熱鍋至冒白濃煙是在吸致癌氣膠。先放少量水再放菜淋好油；發黑起泡的回鍋油一口都別吃！
            </p>
            <div className="text-[10px] font-mono text-amber-700 dark:text-amber-400 font-semibold">
              💡 水炒法低溫護血管
            </div>
          </div>

          {/* Card 3: 酒精律 */}
          <div className="p-4 rounded-2xl border border-rose-200 dark:border-rose-900/60 bg-gradient-to-br from-rose-50/70 to-white dark:from-rose-950/30 dark:to-slate-900/60 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="p-2 rounded-xl bg-rose-500 text-white shadow-xs">
                <Wine className="w-4 h-4" />
              </span>
              <span className="font-mono text-[10px] font-extrabold text-rose-800 dark:text-rose-300 bg-rose-100 dark:bg-rose-950/80 px-2 py-0.5 rounded-md border border-rose-300 dark:border-rose-800">
                03 酒精防線
              </span>
            </div>
            <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">
              臉紅是一級致癌物，睡前別碰
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
              喝酒臉紅是天生缺乏解毒酵素的火警警報；睡前小酌看似好睡，實則徹底癱瘓深睡期，越睡越累！
            </p>
            <div className="text-[10px] font-mono text-rose-600 dark:text-rose-400 font-semibold">
              💡 聚會用無糖氣泡水乾杯
            </div>
          </div>

          {/* Card 4: 肌肉律 */}
          <div className="p-4 rounded-2xl border border-emerald-200 dark:border-emerald-900/60 bg-gradient-to-br from-emerald-50/70 to-white dark:from-emerald-950/30 dark:to-slate-900/60 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="p-2 rounded-xl bg-emerald-500 text-white shadow-xs">
                <Activity className="w-4 h-4" />
              </span>
              <span className="font-mono text-[10px] font-extrabold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-300 dark:border-emerald-800">
                04 肌肉長壽
              </span>
            </div>
            <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">
              天天快走微喘，每週深蹲存肌力
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
              肌肉是全身體質最好的降糖蓄水池。每天走路 30 分鐘，每週兩次深蹲練大腿，老了穩健不跌倒！
            </p>
            <div className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
              💡 肌肉就是你的長壽存摺
            </div>
          </div>
        </div>
      </section>

      {/* ── Filter Bar & Search ── */}
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-900/80 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-mono w-full md:w-auto">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeCategory === 'all'
                ? 'bg-nature-amber-500 text-black font-bold shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            全部席位
          </button>
          <button
            onClick={() => setActiveCategory('cardiometabolic')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeCategory === 'cardiometabolic'
                ? 'bg-nature-amber-500 text-black font-bold shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            心血管與代謝腎臟
          </button>
          <button
            onClick={() => setActiveCategory('lipids_nutrition')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeCategory === 'lipids_nutrition'
                ? 'bg-nature-amber-500 text-black font-bold shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            脂質化學與營養
          </button>
          <button
            onClick={() => setActiveCategory('exercise_thermal')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeCategory === 'exercise_thermal'
                ? 'bg-nature-amber-500 text-black font-bold shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            運動生理
          </button>
          <button
            onClick={() => setActiveCategory('sleep_mind_pharma')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeCategory === 'sleep_mind_pharma'
                ? 'bg-nature-amber-500 text-black font-bold shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            睡眠與身心
          </button>
          <button
            onClick={() => setActiveCategory('addiction_genomics')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeCategory === 'addiction_genomics'
                ? 'bg-nature-amber-500 text-black font-bold shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            成癮與基因體學
          </button>
          <button
            onClick={() => setActiveCategory('governance_legal_ux')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeCategory === 'governance_legal_ux'
                ? 'bg-nature-amber-500 text-black font-bold shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            治理法規與體驗無障礙
          </button>
        </div>

        {/* Keyword Search */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="搜尋疾病、文獻、ApoB、血壓..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs focus:outline-hidden focus:border-nature-amber-400 text-slate-800 dark:text-slate-200"
          />
        </div>
      </div>

      {/* ── Horizontal Expert Selector Ribbon ── */}
      <div className="space-y-1.5">
        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block font-bold px-1">
          點選專家席位切換深度實證專題 (Select Expert Seat)
        </span>
        <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-thin">
          {filteredBestPractices.map((expert) => {
            const isSelected = expert.expertId === selectedExpertId;
            return (
              <button
                key={expert.expertId}
                onClick={() => setSelectedExpertId(expert.expertId)}
                className={`btn-tactile px-3.5 py-2.5 rounded-xl border text-left shrink-0 transition-all font-sans ${
                  isSelected
                    ? 'border-nature-amber-400 dark:border-nature-amber-500 bg-nature-amber-50 dark:bg-nature-amber-950/50 text-nature-amber-950 dark:text-nature-amber-200 font-bold shadow-sm scale-102 ring-1 ring-nature-amber-400/50'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-800 font-bold">
                    {expert.expertId}
                  </span>
                  <span className="font-bold text-xs">{expert.title_zh}</span>
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate max-w-[160px]">
                  {expert.primaryIssue_zh}
                </div>
                <div className="mt-1 text-[9px] font-mono text-purple-600 dark:text-purple-400 font-semibold">
                  {expert.paperSynthesisScope.totalPapersReviewed} 篇期刊統合
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Active Expert Main Deep-Dive Document ── */}
      <div className="space-y-8 bg-white dark:bg-slate-900/40 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
        {/* Document Header */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-5 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs px-2.5 py-1 rounded-lg bg-nature-amber-100 dark:bg-nature-amber-950 text-nature-amber-800 dark:text-nature-amber-300 font-extrabold border border-nature-amber-300 dark:border-nature-amber-800">
                {currentBestPractice.expertId}
              </span>
              <h2 className="text-xl sm:text-2xl font-display font-extrabold text-slate-900 dark:text-white">
                {currentBestPractice.title_zh}
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400 ml-2 font-normal">
                  ({currentBestPractice.title_en})
                </span>
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                GRADE High-Confidence Vetted
              </span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-start gap-2.5">
            <Award className="w-4 h-4 text-nature-amber-600 dark:text-nature-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-800 dark:text-slate-200">
                主責健康議題：
              </span>
              <span className="text-slate-700 dark:text-slate-300 ml-1">
                {currentBestPractice.primaryIssue_zh}
              </span>
            </div>
          </div>
        </div>

        {/* ── Perspective Toggle: 一般民眾白話篇 vs 臨床學術實證 ── */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-2 bg-slate-100/90 dark:bg-slate-950/60 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setViewPerspective('layperson')}
              className={`btn-tactile px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewPerspective === 'layperson'
                  ? 'bg-nature-amber-500 text-black shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Smile className="w-3.5 h-3.5" />
              🌱 一般民眾白話篇 (推薦)
            </button>
            <button
              onClick={() => setViewPerspective('clinical')}
              className={`btn-tactile px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewPerspective === 'clinical'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Stethoscope className="w-3.5 h-3.5" />
              🔬 50+ 篇期刊臨床實證表
            </button>
            <button
              onClick={() => setViewPerspective('both')}
              className={`btn-tactile px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewPerspective === 'both'
                  ? 'bg-slate-800 dark:bg-slate-200 text-white dark:text-black shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              📖 完整雙向檢視
            </button>
          </div>
          <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 pr-2">
            {viewPerspective === 'layperson'
              ? '✨ 適合大眾：醫師真心話、生活比喻、3 步行動卡、破除迷思'
              : viewPerspective === 'clinical'
              ? '📊 適合醫事人員：50+ 篇文獻、GRADE 矩陣與臨床紅線'
              : '🌟 同步展開大眾衛教與臨床實證對照'}
          </span>
        </div>

        {/* ── Layperson Friendly Section (Active for 'layperson' or 'both') ── */}
        {(viewPerspective === 'layperson' || viewPerspective === 'both') && (
          <LaypersonFriendlyGuide expert={currentBestPractice} />
        )}

        {/* ── Professional Info-Graph (Always visible to connect visual intuition with physiology) ── */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800/60 pb-2">
            <Activity className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <h3 className="text-sm font-display font-bold text-slate-900 dark:text-white">
              臨床專業 Info-Graph：生理機制與決策串聯視覺化
            </h3>
          </div>

          <ExpertInfoGraph
            title={currentBestPractice.infograph.title_zh}
            type={currentBestPractice.infograph.type}
            steps={currentBestPractice.infograph.steps}
            keyTakeaway={currentBestPractice.infograph.keyTakeaway_zh}
          />
        </section>

        {/* ── Academic & Clinical Evidence Modules (Active for 'clinical' or 'both') ── */}
        {(viewPerspective === 'clinical' || viewPerspective === 'both') && (
          <>
            {/* ── Module 1: 50+ Peer-Reviewed Papers Scope & Mechanism ── */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800/60 pb-2">
                <BookOpen className="w-4 h-4 text-nature-amber-600 dark:text-nature-amber-400" />
                <h3 className="text-sm font-display font-bold text-slate-900 dark:text-white">
                  50+ 篇頂尖期刊文獻綜述範圍與核心生化機制
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 space-y-3">
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                    {currentBestPractice.paperSynthesisScope.synthesisSummary_zh}
                  </p>
                  <div className="p-3 rounded-xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200/60 dark:border-purple-800/40 space-y-1">
                    <span className="font-mono text-[10px] text-purple-700 dark:text-purple-300 font-bold uppercase block">
                      病理生理學機制解構 (Pathophysiological Mechanism)
                    </span>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      {currentBestPractice.coreMechanism_zh}
                    </p>
                  </div>
                </div>

                {/* Journal Badges Box */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2.5">
                  <span className="font-mono text-[10px] text-slate-500 uppercase tracking-wider block font-bold">
                    代表性指標期刊庫 ({currentBestPractice.paperSynthesisScope.totalPapersReviewed} 篇)
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentBestPractice.paperSynthesisScope.landmarkJournals.map((journal, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md font-mono text-[10px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold"
                      >
                        {journal}
                      </span>
                    ))}
                  </div>
                  <div className="pt-2 border-t border-slate-200 dark:border-slate-800/80 font-mono text-[10px] text-slate-500 space-y-1">
                    <div>統合分析 (Meta-Analyses)：{currentBestPractice.paperSynthesisScope.metaAnalysisCount} 篇</div>
                    <div>隨機對照試驗 (RCTs)：{currentBestPractice.paperSynthesisScope.rctCount} 篇</div>
                  </div>
                </div>
              </div>
            </section>

            {/* ── Module 3: Table 1 · GRADE Evidence Synthesis Matrix ── */}
            <section className="space-y-3">
              <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800/60 pb-2">
                <FileText className="w-4 h-4 text-nature-sky-600 dark:text-nature-sky-400" />
                <h3 className="text-sm font-display font-bold text-slate-900 dark:text-white">
                  {currentBestPractice.table1_gradeEvidence.title_zh}
                </h3>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
                <table className="w-full text-left font-sans text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-mono text-[11px] border-b border-slate-200 dark:border-slate-800">
                      {currentBestPractice.table1_gradeEvidence.headers_zh.map((h, i) => (
                        <th key={i} className="p-3 font-bold whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900/40">
                    {currentBestPractice.table1_gradeEvidence.rows.map((row, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                      >
                        <td className="p-3 font-semibold text-slate-900 dark:text-slate-100 max-w-[220px]">
                          {row.endpoint}
                        </td>
                        <td className="p-3 font-mono text-[11px] text-purple-700 dark:text-purple-300">
                          {row.representativeStudies}
                        </td>
                        <td className="p-3 font-mono text-[11px] text-slate-600 dark:text-slate-300 whitespace-nowrap">
                          {row.sampleSize}
                        </td>
                        <td className="p-3 font-mono text-xs font-bold text-emerald-700 dark:text-emerald-400 whitespace-nowrap">
                          {row.effectSize}
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded font-mono text-[10px] font-extrabold bg-nature-amber-100 dark:bg-nature-amber-950/80 text-nature-amber-900 dark:text-nature-amber-300 border border-nature-amber-300 dark:border-nature-amber-700">
                            Grade {row.grade}
                          </span>
                        </td>
                        <td className="p-3 font-mono text-[11px] text-slate-700 dark:text-slate-300">
                          {row.consensusStrength}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* ── Module 4: Table 2 · Actionable Best Practice Protocols & Safety Boundaries ── */}
            <section className="space-y-3">
              <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800/60 pb-2">
                <Layers className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-sm font-display font-bold text-slate-900 dark:text-white">
                  {currentBestPractice.table2_bestPractice.title_zh}
                </h3>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
                <table className="w-full text-left font-sans text-xs border-collapse">
                  <thead>
                    <tr className="bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200 font-mono text-[11px] border-b border-emerald-200 dark:border-emerald-800">
                      {currentBestPractice.table2_bestPractice.headers_zh.map((h, i) => (
                        <th key={i} className="p-3 font-bold whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900/40">
                    {currentBestPractice.table2_bestPractice.rows.map((row, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                      >
                        <td className="p-3 font-semibold text-slate-900 dark:text-slate-100 max-w-[160px]">
                          {row.targetPopulation}
                        </td>
                        <td className="p-3 text-slate-700 dark:text-slate-300 leading-relaxed max-w-[280px]">
                          {row.interventionProtocol}
                        </td>
                        <td className="p-3 font-mono text-[11px] font-bold text-nature-sky-700 dark:text-nature-sky-300 max-w-[180px]">
                          {row.biomarkerGoal}
                        </td>
                        <td className="p-3 text-rose-700 dark:text-rose-300 font-medium bg-rose-50/30 dark:bg-rose-950/10 max-w-[240px]">
                          <div className="flex items-start gap-1">
                            <AlertTriangle className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                            <span>{row.contraindicationsAndRedLines}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* ── Module 5: Clinical Pearls & Avoided Pitfalls ── */}
            <section className="space-y-3">
              <div className="p-5 rounded-2xl bg-nature-amber-50/80 dark:bg-nature-amber-950/20 border border-nature-amber-200 dark:border-nature-amber-800/40 space-y-2">
                <span className="font-mono text-xs font-extrabold text-nature-amber-800 dark:text-nature-amber-300 flex items-center gap-1.5 uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-nature-amber-600 dark:text-nature-amber-400" />
                  專家臨床避坑指南 (Clinical Pearls & Pitfalls)
                </span>
                <ul className="space-y-2 text-xs text-slate-800 dark:text-slate-200 font-sans leading-relaxed list-disc list-inside">
                  {currentBestPractice.clinicalPearls_zh.map((pearl, i) => (
                    <li key={i} className="pl-1">
                      {pearl}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </>
        )}

        {/* ── Module 6: Jump to Related 4 Pillars ── */}
        <section className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-500 font-bold">
              直接將此實證代入四大健康支柱：
            </span>
            <div className="flex flex-wrap gap-1.5">
              {currentBestPractice.relatedPillars.map((pillar) => (
                <button
                  key={pillar}
                  onClick={() => onSelectPillar(pillar)}
                  className="btn-tactile px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-nature-amber-400 text-xs font-mono text-slate-700 dark:text-slate-300 flex items-center gap-1 transition-all"
                >
                  <span>{t(`pillar.${pillar}`)}</span>
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                </button>
              ))}
            </div>
          </div>

          {onBackToMain && (
            <button
              onClick={onBackToMain}
              className="text-xs text-nature-amber-700 dark:text-nature-amber-400 hover:underline font-bold flex items-center gap-1"
            >
              ⟵ 返回主畫面
            </button>
          )}
        </section>
      </div>
    </div>
  );
};
