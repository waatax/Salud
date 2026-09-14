import React, { useState, useMemo, useEffect } from 'react';
import { KnowledgePage } from '../../types';
import { useLanguage } from '../../i18n';
import { EXPERT_COUNCIL } from '../../data/expertCouncil';
import { GamifiedLearningHub } from './GamifiedLearningHub';
import {
  Droplets,
  Activity,
  AlertTriangle,
  ShieldCheck,
  Search,
  Tag,
  BookOpen,
  Award,
  Sparkles,
  ArrowRight,
  Filter,
  CheckCircle2,
  X,
  Compass,
  AlertOctagon,
  Clock,
  Layers,
  FileText,
  UserCheck,
  Check,
  Bookmark,
  BookmarkCheck,
  Grid,
  List,
  ChevronRight,
  TrendingUp,
  BrainCircuit,
  SlidersHorizontal,
  RotateCcw
} from 'lucide-react';

interface Props {
  pages: KnowledgePage[];
  chapterId: string;
  onSelectPage: (pageId: string) => void;
  onOpenCouncil?: () => void;
}

// 4 大臨床專科分類定義
const CATEGORIES = [
  {
    id: 'all',
    name_zh: '全部醫學文庫',
    name_en: 'All Knowledge Pages',
    desc: '體液恆定、水合監測、急性脫水與臨床安全完整課綱',
    icon: Layers,
    color: 'sky',
    badgeClass: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700',
    borderActive: 'border-nature-sky-500 text-nature-sky-700 dark:text-nature-sky-300 bg-nature-sky-50/70 dark:bg-nature-sky-950/40'
  },
  {
    id: 'fluid-homeostasis',
    name_zh: '體液生理與水份分佈',
    name_en: 'Fluid Homeostasis & Compartments',
    desc: '總體水 TBW、細胞內外液滲透平衡、ADH 與 24h 收支',
    icon: Droplets,
    color: 'cyan',
    badgeClass: 'bg-sky-50 dark:bg-sky-950/50 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800',
    borderActive: 'border-sky-500 text-sky-700 dark:text-sky-300 bg-sky-50/80 dark:bg-sky-950/50'
  },
  {
    id: 'hydration-guidelines',
    name_zh: '水合準則與臨床監測',
    name_en: 'Hydration Guidelines & Biomarkers',
    desc: '8杯水迷思、尿液顏色卡 WUT 自評、咖啡茶酒淨水合',
    icon: Activity,
    color: 'emerald',
    badgeClass: 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    borderActive: 'border-emerald-500 text-emerald-700 dark:text-emerald-300 bg-emerald-50/80 dark:bg-emerald-950/50'
  },
  {
    id: 'dehydration-pathology',
    name_zh: '脫水病理與急性風險',
    name_en: 'Dehydration Pathology & Acute Risks',
    desc: '脫水階梯至熱中暑急症、運動低血鈉 EAH 水中毒、電解質',
    icon: AlertTriangle,
    color: 'amber',
    badgeClass: 'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    borderActive: 'border-amber-500 text-amber-700 dark:text-amber-300 bg-amber-50/80 dark:bg-amber-950/50'
  },
  {
    id: 'special-populations',
    name_zh: '特殊族群安全與在地實踐',
    name_en: 'Safety Gates & Real-World Practice',
    desc: '心衰竭與洗腎限水安全閘、台灣高溫濕熱冷氣房對策',
    icon: ShieldCheck,
    color: 'rose',
    badgeClass: 'bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800',
    borderActive: 'border-rose-500 text-rose-700 dark:text-rose-300 bg-rose-50/80 dark:bg-rose-950/50'
  }
];

// 5 大關鍵臨床生理常數速查
const CLINICAL_CONSTANTS = [
  {
    id: 'tbw',
    label: '總體水 (TBW)',
    value: '50–60%',
    unit: '體重比',
    sub: '肌肉 73% vs 脂肪 10%',
    targetPage: 'PAGE-W-01',
    color: 'text-sky-600 dark:text-salud-cyan'
  },
  {
    id: 'plasma',
    label: '血漿容量',
    value: '~8%',
    unit: '總體水',
    sub: '約 3L 血管動態循環庫',
    targetPage: 'PAGE-W-01',
    color: 'text-emerald-600 dark:text-nature-green-400'
  },
  {
    id: 'osmolality',
    label: '滲透壓閾值',
    value: '280–295',
    unit: 'mOsm/kg',
    sub: '上升 1% 即觸發 ADH 分泌',
    targetPage: 'PAGE-W-03',
    color: 'text-purple-600 dark:text-purple-400'
  },
  {
    id: 'hyponatremia',
    label: '低血鈉警戒',
    value: '< 135',
    unit: 'mmol/L',
    sub: '< 125 致命腦水腫紅旗',
    targetPage: 'PAGE-W-08',
    color: 'text-rose-600 dark:text-rose-400'
  },
  {
    id: 'insensible',
    label: '不感蒸發流失',
    value: '700–1000',
    unit: 'mL / 日',
    sub: '靜坐仍持續呼吸皮膚蒸散',
    targetPage: 'PAGE-W-04',
    color: 'text-amber-600 dark:text-salud-amber'
  }
];

// 4 階循序學習階梯
const LEARNING_PATHWAY = [
  {
    step: 1,
    title: '基礎生理入門',
    targetPages: ['PAGE-W-01', 'PAGE-W-02', 'PAGE-W-05'],
    objective: '建立人體水分分佈、細胞內外液空間及一日八杯水迷思之科學實證。',
    badgeClass: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
  },
  {
    step: 2,
    title: '生化機轉深究',
    targetPages: ['PAGE-W-03', 'PAGE-W-04', 'PAGE-W-09'],
    objective: '剖析下視丘滲透壓受器、ADH 抗利尿激素迴路與鈉鉀幫浦電解質吸收。',
    badgeClass: 'bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300'
  },
  {
    step: 3,
    title: '臨床判別監測',
    targetPages: ['PAGE-W-06', 'PAGE-W-07', 'PAGE-W-10', 'PAGE-W-12'],
    objective: '掌握 WUT 脫水三指標、尿色卡校正、中暑脫水階梯與台灣濕熱微氣候對策。',
    badgeClass: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
  },
  {
    step: 4,
    title: '致命急症與安全閘',
    targetPages: ['PAGE-W-08', 'PAGE-W-11'],
    objective: '嚴格把關運動低血鈉 (EAH) 水中毒預防，以及心衰竭與末期腎病洗腎患者限水閘。',
    badgeClass: 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 font-bold'
  }
];

// 針對 Chapter W 之審定專家委員會核心 6 席
const CHAPTER_W_COUNCIL_IDS = ['EC-13', 'EC-01', 'EC-05', 'EC-06', 'EC-03', 'EC-02'];

export const MedicalKnowledgeBase: React.FC<Props> = ({
  pages,
  chapterId,
  onSelectPage,
  onOpenCouncil
}) => {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedPathwayStep, setSelectedPathwayStep] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'digest'>('grid');
  const [sortBy, setSortBy] = useState<'order' | 'minutes' | 'difficulty'>('order');
  const [activeExpertDetail, setActiveExpertDetail] = useState<string | null>(null);

  // 本地學習進度狀態管理 (Completed & Bookmarked)
  const [completedPages, setCompletedPages] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('salud_completed_pages');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [bookmarkedPages, setBookmarkedPages] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('salud_bookmarked_pages');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const toggleComplete = (pageId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCompletedPages((prev) => {
      const updated = prev.includes(pageId) ? prev.filter((id) => id !== pageId) : [...prev, pageId];
      try {
        localStorage.setItem('salud_completed_pages', JSON.stringify(updated));
      } catch (err) {
        console.error('Failed to save completed pages to localStorage', err);
      }
      return updated;
    });
  };

  const toggleBookmark = (pageId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedPages((prev) => {
      const updated = prev.includes(pageId) ? prev.filter((id) => id !== pageId) : [...prev, pageId];
      try {
        localStorage.setItem('salud_bookmarked_pages', JSON.stringify(updated));
      } catch (err) {
        console.error('Failed to save bookmarked pages to localStorage', err);
      }
      return updated;
    });
  };

  // 取得審定專家資料
  const reviewingExperts = useMemo(() => {
    return CHAPTER_W_COUNCIL_IDS.map((id) => {
      const found = EXPERT_COUNCIL.find((e) => e.id === id);
      return found || {
        id,
        name_en: 'Clinical Specialist',
        title_zh: '專科臨床專家',
        title_en: 'Clinical Specialist',
        why_needed: '臨床驗證',
        core_duty: '審核臨床實證等級'
      };
    });
  }, []);

  // 萃取全量專屬 TAG 清單與計數
  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    pages.forEach((p) => {
      if (p.tags && Array.isArray(p.tags)) {
        p.tags.forEach((tag) => {
          counts[tag] = (counts[tag] || 0) + 1;
        });
      }
    });
    return counts;
  }, [pages]);

  const allTags = useMemo(() => Object.keys(tagCounts), [tagCounts]);

  // 過濾邏輯（多維度聯動：分類 + TAG + 學習階梯 + 關鍵字）
  const filteredPages = useMemo(() => {
    let result = pages.filter((p) => {
      // 學習階梯過濾
      if (selectedPathwayStep !== null) {
        const stepDef = LEARNING_PATHWAY.find((s) => s.step === selectedPathwayStep);
        if (stepDef && !stepDef.targetPages.includes(p.id)) return false;
      }

      // 分類過濾
      if (selectedCategory !== 'all') {
        if (p.category !== selectedCategory) return false;
      }

      // 標籤過濾
      if (selectedTag) {
        if (!p.tags || !p.tags.includes(selectedTag)) return false;
      }

      // 關鍵字搜尋（標題、英文標、直擊引言、臨床珍珠、KP內容、TAG）
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const inId = p.id.toLowerCase().includes(query);
        const inTitleZh = p.title_zh.toLowerCase().includes(query);
        const inTitleEn = p.title_en.toLowerCase().includes(query);
        const inHook = p.hook?.toLowerCase().includes(query);
        const inPearl = p.clinical_pearl?.toLowerCase().includes(query);
        const inTags = p.tags?.some((t) => t.toLowerCase().includes(query));
        const inCategory = p.category_zh?.toLowerCase().includes(query);

        if (!inId && !inTitleZh && !inTitleEn && !inHook && !inPearl && !inTags && !inCategory) {
          return false;
        }
      }

      return true;
    });

    // 排序
    if (sortBy === 'minutes') {
      result.sort((a, b) => a.estimated_minutes - b.estimated_minutes);
    } else if (sortBy === 'difficulty') {
      const diffOrder: Record<string, number> = { 入門基礎: 1, 核心機轉: 2, 臨床鑑別: 3, 高階安全閘: 4 };
      result.sort((a, b) => (diffOrder[a.difficulty || ''] || 0) - (diffOrder[b.difficulty || ''] || 0));
    } else {
      result.sort((a, b) => a.order_index - b.order_index);
    }

    return result;
  }, [pages, selectedCategory, selectedTag, selectedPathwayStep, searchQuery, sortBy]);

  // 分類篇數統計
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: pages.length };
    pages.forEach((p) => {
      if (p.category) {
        counts[p.category] = (counts[p.category] || 0) + 1;
      }
    });
    return counts;
  }, [pages]);

  // 總閱讀時間與進度統計
  const totalMinutes = useMemo(() => {
    return pages.reduce((acc, p) => acc + (p.estimated_minutes || 4), 0);
  }, [pages]);

  const completedCount = useMemo(() => {
    return pages.filter((p) => completedPages.includes(p.id)).length;
  }, [pages, completedPages]);

  const progressPct = Math.round((completedCount / (pages.length || 1)) * 100);

  // 難度色彩映射
  const getDifficultyBadge = (diff?: string) => {
    switch (diff) {
      case '入門基礎':
        return 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
      case '核心機轉':
        return 'bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 border-sky-200 dark:border-sky-800';
      case '臨床鑑別':
        return 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800';
      case '高階安全閘':
        return 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-800 font-bold';
      default:
        return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700';
    }
  };

  // 標籤色彩映射
  const getTagColor = (tag: string) => {
    if (tag.includes('低血鈉') || tag.includes('中暑') || tag.includes('限水') || tag.includes('SAFETY')) {
      return 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 hover:bg-rose-100 border-rose-200 dark:border-rose-800/60';
    }
    if (tag.includes('滲透') || tag.includes('ADH') || tag.includes('分佈') || tag.includes('收支')) {
      return 'bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 hover:bg-sky-100 border-sky-200 dark:border-sky-800/60';
    }
    if (tag.includes('迷思') || tag.includes('尿液') || tag.includes('咖啡') || tag.includes('茶')) {
      return 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 hover:bg-amber-100 border-amber-200 dark:border-amber-800/60';
    }
    return 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 border-emerald-200 dark:border-emerald-800/60';
  };

  return (
    <div className="space-y-8 font-sans">
      {/* ── 1. 專家審定委員會背書橫幅 (Expert Council Governance Board) ── */}
      <div className="p-6 sm:p-7 rounded-3xl border border-sky-200/90 dark:border-sky-900/60 bg-gradient-to-br from-sky-50/70 via-white to-emerald-50/50 dark:from-slate-900 dark:via-salud-dark-card dark:to-slate-950 shadow-sm relative overflow-hidden backdrop-blur-sm">
        {/* 背景環境微光 */}
        <div className="absolute -top-16 -right-16 w-80 h-80 bg-nature-sky-400/15 dark:bg-nature-sky-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-sky-100 dark:border-slate-800/80 pb-3.5">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-2xl bg-nature-sky-500 text-white shadow-cyan-glow">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-display font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>Chapter {chapterId} 水與體液醫學專家審定委員會</span>
                  <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-sky-100 dark:bg-sky-900/60 text-sky-800 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
                    6 席跨科終審
                  </span>
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                  恪守 Oxford CEBM Level 1a 與 GRADE 嚴謹標準，跨科同儕審定（Peer-Reviewed）之體液生化文庫
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 font-bold shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                CEBM 1a 審查簽核
              </span>
              {onOpenCouncil && (
                <button
                  onClick={onOpenCouncil}
                  className="btn-tactile text-xs font-mono px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-nature-sky-600 dark:hover:text-nature-sky-400 hover:border-nature-sky-300 transition-all flex items-center gap-1 shadow-xs font-bold"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>24 席治理全景 →</span>
                </button>
              )}
            </div>
          </div>

          {/* 6 席專家互動卡片 */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-1">
            {reviewingExperts.map((exp) => {
              const isActive = activeExpertDetail === exp.id;
              return (
                <div
                  key={exp.id}
                  onClick={() => setActiveExpertDetail(isActive ? null : exp.id)}
                  className={`btn-tactile p-3 rounded-2xl border transition-all text-left space-y-1.5 cursor-pointer shadow-xs ${
                    isActive
                      ? 'border-nature-sky-500 bg-sky-50 dark:bg-sky-950/60 ring-2 ring-nature-sky-400/30'
                      : 'border-slate-200/90 dark:border-slate-800 bg-white/90 dark:bg-slate-800/70 hover:border-nature-sky-300 dark:hover:border-nature-sky-700'
                  }`}
                  title="點擊檢視專席職責"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-nature-sky-700 dark:text-salud-cyan px-1.5 py-0.5 rounded bg-sky-100/70 dark:bg-sky-900/60">
                      {exp.id}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="在席審定" />
                  </div>
                  <div className="font-bold text-xs text-slate-900 dark:text-slate-100 truncate">
                    {language === 'zh-TW' ? exp.title_zh.split('專家')[0] : exp.title_en}
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-tight">
                    {exp.why_needed.split('、')[0]}
                  </p>
                </div>
              );
            })}
          </div>

          {/* 點擊專家後的展開詳情卡 */}
          {activeExpertDetail && (
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-nature-sky-300 dark:border-nature-sky-700 text-xs space-y-2 animate-fadeIn shadow-sm">
              {(() => {
                const exp = reviewingExperts.find((e) => e.id === activeExpertDetail);
                if (!exp) return null;
                return (
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-nature-sky-600 dark:text-salud-cyan">{exp.id}</span>
                        <strong className="text-slate-900 dark:text-white">{exp.title_zh}</strong>
                        <span className="text-slate-400 font-mono text-[11px]">({exp.title_en})</span>
                      </div>
                      <button
                        onClick={() => setActiveExpertDetail(null)}
                        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-700 dark:text-slate-300">
                      <div>
                        <span className="font-bold text-slate-500 text-[11px] block">臨床專責背景：</span>
                        <p>{exp.why_needed}</p>
                      </div>
                      <div>
                        <span className="font-bold text-slate-500 text-[11px] block">專章核准職責 (Core Duty)：</span>
                        <p className="text-nature-sky-800 dark:text-nature-sky-200">{exp.core_duty}</p>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      </div>

      {/* ── 2. 臨床黃金常數速查帶 (Physiological Constants Quick Reference) ── */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1 text-xs font-mono font-bold text-slate-600 dark:text-slate-400">
          <span className="flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-nature-sky-600 dark:text-salud-cyan" />
            <span>水與體液平衡 · 臨床黃金常數速查 (Clinical Constants At A Glance)</span>
          </span>
          <span className="text-[11px] font-sans text-slate-400">點選指標直達專章</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {CLINICAL_CONSTANTS.map((c) => (
            <div
              key={c.id}
              onClick={() => onSelectPage(c.targetPage)}
              className="btn-tactile p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/70 hover:border-nature-sky-400 dark:hover:border-nature-sky-600 cursor-pointer transition-all shadow-xs space-y-1 group"
            >
              <div className="flex items-center justify-between font-mono text-[10px] text-slate-400">
                <span>{c.label}</span>
                <ChevronRight className="w-3 h-3 text-slate-300 group-hover:text-nature-sky-500 group-hover:translate-x-0.5 transition-all" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className={`text-xl font-display font-extrabold ${c.color}`}>{c.value}</span>
                <span className="text-[10px] font-mono text-slate-500">{c.unit}</span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-sans truncate">{c.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── 2.5 遊戲化健康學習中樞 (Gamified Learning Hub: XP, Streak, Daily Quiz, Hydration Calculator, Medals) ── */}
      <GamifiedLearningHub completedPages={completedPages} onSelectPage={onSelectPage} />

      {/* ── 3. 醫學知識庫控制中樞 (分類 Tabs + TAG 雲 + 搜尋 + 視圖切換) ── */}
      <div className="space-y-4">
        {/* 標題、個人研讀進度條與視圖模式 */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-white flex items-center gap-3">
              <BookOpen className="w-7 h-7 text-nature-sky-600 dark:text-salud-cyan" />
              <span>醫學知識庫 (Medical Knowledge Base)</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Chapter {chapterId} · 水與體液恆定實證文庫 · 12 篇專科知識頁與生化機轉
            </p>
          </div>

          {/* 研讀進度條與視圖切換按鈕 */}
          <div className="flex flex-wrap items-center gap-3">
            {/* 個人研讀進度 */}
            <div className="p-2.5 px-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-3 font-mono text-xs">
              <div className="space-y-1">
                <div className="flex items-center justify-between gap-2 text-[10px] text-slate-500 dark:text-slate-400">
                  <span>研讀進度</span>
                  <strong className="text-nature-sky-600 dark:text-salud-cyan">{completedCount} / {pages.length} 篇 ({progressPct}%)</strong>
                </div>
                <div className="w-28 h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-nature-sky-500 to-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </div>
            </div>

            {/* 視圖切換 (卡片 Grid vs 速查條列 Digest) */}
            <div className="flex items-center p-1 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <button
                onClick={() => setViewMode('grid')}
                className={`btn-tactile p-2 rounded-xl transition-all flex items-center gap-1 text-xs ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-slate-800 text-nature-sky-700 dark:text-salud-cyan font-bold shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
                title="圖文卡片視圖"
              >
                <Grid className="w-4 h-4" />
                <span className="hidden sm:inline">卡片視圖</span>
              </button>
              <button
                onClick={() => setViewMode('digest')}
                className={`btn-tactile p-2 rounded-xl transition-all flex items-center gap-1 text-xs ${
                  viewMode === 'digest'
                    ? 'bg-white dark:bg-slate-800 text-nature-sky-700 dark:text-salud-cyan font-bold shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
                title="臨床速查條列視圖"
              >
                <List className="w-4 h-4" />
                <span className="hidden sm:inline">速查條列</span>
              </button>
            </div>
          </div>
        </div>

        {/* 4 大臨床專科分類 Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            const count = categoryCounts[cat.id] || 0;

            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setSelectedTag(null);
                  setSelectedPathwayStep(null);
                }}
                className={`btn-tactile p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between gap-2 shadow-xs ${
                  isSelected
                    ? `${cat.borderActive} font-bold ring-2 ring-nature-sky-400/30 shadow-md`
                    : 'border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/70 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className={`p-1.5 rounded-xl ${isSelected ? 'bg-nature-sky-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${cat.badgeClass}`}>
                    {count} 篇
                  </span>
                </div>
                <div>
                  <div className="text-xs font-bold truncate">
                    {language === 'zh-TW' ? cat.name_zh : cat.name_en}
                  </div>
                  <div className="text-[10px] text-slate-400 line-clamp-1 mt-0.5 font-normal">
                    {cat.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* 搜尋欄 + 標籤過濾雲 + 排序列 */}
        <div className="p-4 sm:p-5 rounded-3xl bg-white/95 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm backdrop-blur-sm">
          {/* 搜尋輸入與排序切換 */}
          <div className="flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜尋醫學知識頁、專業 TAG、生化機轉、臨床珍珠（如：滲透壓、ADH、低血鈉、心衰竭、冷氣房）..."
                className="w-full pl-10 pr-9 py-2.5 rounded-2xl text-xs bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-nature-sky-500 focus:ring-2 focus:ring-nature-sky-500/20 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* 排序方式選單 */}
            <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono shrink-0">
              <span className="text-slate-400 px-2 text-[11px] flex items-center gap-1">
                <SlidersHorizontal className="w-3 h-3" />
                排序:
              </span>
              <button
                onClick={() => setSortBy('order')}
                className={`btn-tactile px-2.5 py-1 rounded-xl transition-all ${
                  sortBy === 'order' ? 'bg-white dark:bg-slate-900 text-nature-sky-700 dark:text-salud-cyan font-bold shadow-xs' : 'text-slate-500'
                }`}
              >
                課綱序
              </button>
              <button
                onClick={() => setSortBy('difficulty')}
                className={`btn-tactile px-2.5 py-1 rounded-xl transition-all ${
                  sortBy === 'difficulty' ? 'bg-white dark:bg-slate-900 text-nature-sky-700 dark:text-salud-cyan font-bold shadow-xs' : 'text-slate-500'
                }`}
              >
                難易度
              </button>
              <button
                onClick={() => setSortBy('minutes')}
                className={`btn-tactile px-2.5 py-1 rounded-xl transition-all ${
                  sortBy === 'minutes' ? 'bg-white dark:bg-slate-900 text-nature-sky-700 dark:text-salud-cyan font-bold shadow-xs' : 'text-slate-500'
                }`}
              >
                閱讀時長
              </button>
            </div>
          </div>

          {/* 臨床醫學 TAG 篩選雲 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5 font-bold">
                <Tag className="w-3.5 h-3.5 text-nature-sky-600 dark:text-salud-cyan" />
                <span>專業主題標籤 (Medical Tags Matrix · 共 {allTags.length} 個)：</span>
              </span>
              {(selectedTag || searchQuery || selectedCategory !== 'all' || selectedPathwayStep !== null) && (
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedTag(null);
                    setSelectedPathwayStep(null);
                    setSearchQuery('');
                  }}
                  className="text-nature-sky-600 dark:text-salud-cyan hover:underline flex items-center gap-1 font-bold text-xs"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>重置所有篩選條件</span>
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto pr-1">
              {allTags.map((tag) => {
                const isTagSelected = selectedTag === tag;
                const count = tagCounts[tag] || 0;
                return (
                  <button
                    key={tag}
                    onClick={() => {
                      setSelectedTag(isTagSelected ? null : tag);
                      setSelectedPathwayStep(null);
                    }}
                    className={`btn-tactile text-xs font-mono px-2.5 py-1 rounded-xl border transition-all flex items-center gap-1.5 ${
                      isTagSelected
                        ? 'bg-nature-sky-500 text-white font-bold border-nature-sky-600 shadow-cyan-glow'
                        : `${getTagColor(tag)} border`
                    }`}
                  >
                    <span>#{tag}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isTagSelected ? 'bg-white/30 text-white' : 'bg-slate-200/70 dark:bg-slate-700/70 text-slate-600 dark:text-slate-300'}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── 4. 四階循序學習階梯 (Interactive Learning Pathway Progression) ── */}
        <div className="p-4 sm:p-5 rounded-3xl bg-slate-50/90 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800/80 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-slate-600 dark:text-slate-400">
            <span className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
              <Compass className="w-4 h-4 text-nature-sky-600 dark:text-salud-cyan" />
              <span>四階循序學習階梯 (Pedagogical Learning Pathway)</span>
            </span>
            <span className="text-[11px] text-slate-400">點擊階梯切換對應學習主題</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {LEARNING_PATHWAY.map((step) => {
              const isStepSelected = selectedPathwayStep === step.step;
              return (
                <div
                  key={step.step}
                  onClick={() => {
                    setSelectedPathwayStep(isStepSelected ? null : step.step);
                    setSelectedTag(null);
                  }}
                  className={`btn-tactile p-3 rounded-2xl border transition-all cursor-pointer text-left space-y-1.5 ${
                    isStepSelected
                      ? 'border-nature-sky-500 bg-sky-50/90 dark:bg-sky-950/60 ring-2 ring-nature-sky-400/30 font-bold shadow-xs'
                      : 'border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-800/60 hover:border-nature-sky-300 dark:hover:border-nature-sky-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md font-bold ${step.badgeClass}`}>
                      階梯 {step.step}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {step.targetPages.length} 篇
                    </span>
                  </div>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white">
                    {step.title}
                  </h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-tight font-sans">
                    {step.objective}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── 5. 知識庫主視圖（卡片網格 vs 速查條列） ── */}
      {filteredPages.length > 0 ? (
        viewMode === 'grid' ? (
          /* 5A. 卡片網格視圖 (Grid View) */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4.5">
            {filteredPages.map((page) => {
              const hasGated = page.safety_gated;
              const isCompleted = completedPages.includes(page.id);
              const isBookmarked = bookmarkedPages.includes(page.id);
              const leadExpert = EXPERT_COUNCIL.find((e) => e.id === page.lead_expert_id);

              return (
                <div
                  key={page.id}
                  onClick={() => onSelectPage(page.id)}
                  className={`btn-tactile p-5 sm:p-6 rounded-3xl border transition-all cursor-pointer shadow-sm hover:shadow-lg flex flex-col justify-between group relative overflow-hidden backdrop-blur-xs ${
                    hasGated
                      ? 'border-rose-200/90 dark:border-rose-900/60 bg-gradient-to-b from-rose-50/35 via-white to-white dark:from-rose-950/25 dark:via-salud-dark-card dark:to-slate-950 hover:border-rose-400'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-salud-dark-card hover:border-nature-sky-400 dark:hover:border-nature-sky-600'
                  }`}
                >
                  {/* 卡片頂部：分類徽章 + 難易度 + 閱讀時間 + 安全閘 + 已讀書籤操作 */}
                  <div className="space-y-3.5">
                    <div className="flex flex-wrap items-center justify-between gap-1.5 font-mono text-[10px]">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold border border-slate-200 dark:border-slate-700">
                          {page.id}
                        </span>
                        <span className={`px-2 py-0.5 rounded-lg border font-medium ${getDifficultyBadge(page.difficulty)}`}>
                          {page.difficulty || '臨床基礎'}
                        </span>
                        {hasGated && (
                          <span className="px-2 py-0.5 rounded-lg bg-red-100 dark:bg-red-950/70 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-800 font-bold flex items-center gap-1 animate-pulse">
                            <AlertOctagon className="w-3 h-3 text-red-600 dark:text-red-400" />
                            SAFETY GATED
                          </span>
                        )}
                      </div>

                      {/* 閱讀時間與快捷收藏操作 */}
                      <div className="flex items-center gap-2 font-sans">
                        <span className="text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          約 {page.estimated_minutes} 分鐘
                        </span>

                        {/* 書籤收藏按鈕 */}
                        <button
                          onClick={(e) => toggleBookmark(page.id, e)}
                          className={`p-1 rounded-lg transition-colors ${
                            isBookmarked
                              ? 'text-nature-amber-500 bg-amber-50 dark:bg-amber-950/60'
                              : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                          }`}
                          title={isBookmarked ? '取消書籤' : '加入學習書籤'}
                        >
                          {isBookmarked ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                        </button>

                        {/* 已精讀切換按鈕 */}
                        <button
                          onClick={(e) => toggleComplete(page.id, e)}
                          className={`px-2 py-0.5 rounded-lg transition-all flex items-center gap-1 text-[10px] font-mono ${
                            isCompleted
                              ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 font-bold'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-600'
                          }`}
                          title={isCompleted ? '標記為未讀' : '標記為已精讀'}
                        >
                          <Check className={`w-3 h-3 ${isCompleted ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`} />
                          <span>{isCompleted ? '已讀' : '標記'}</span>
                        </button>
                      </div>
                    </div>

                    {/* 標題與英文副標題 */}
                    <div>
                      <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white group-hover:text-nature-sky-600 dark:group-hover:text-salud-cyan transition-colors leading-snug">
                        {language === 'zh-TW' ? page.title_zh : page.title_en}
                      </h3>
                      <p className="font-mono text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                        {language === 'zh-TW' ? page.title_en : page.title_zh}
                      </p>
                    </div>

                    {/* 直擊直覺衝突 (Hook) */}
                    <div className="border-l-2 border-slate-200 dark:border-slate-700 pl-3 py-0.5">
                      <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed font-sans">
                        {page.hook}
                      </p>
                    </div>

                    {/* 生活神譬喻標籤 (Plain English Analogy) */}
                    {page.analogy_title && (
                      <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-sky-50/70 dark:bg-sky-950/40 border border-sky-200/60 dark:border-sky-900/50 text-sky-900 dark:text-sky-300 text-xs">
                        <span className="text-sm shrink-0">💡</span>
                        <div className="min-w-0">
                          <span className="font-bold text-[10px] text-sky-600 dark:text-salud-cyan block font-mono">生活神譬喻 · 秒懂機轉</span>
                          <span className="font-medium text-xs truncate block text-slate-700 dark:text-slate-200">{page.analogy_title}</span>
                        </div>
                      </div>
                    )}

                    {/* 專家臨床教學珍珠 (Clinical Pearl) */}
                    {page.clinical_pearl && (
                      <div className="p-3.5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/60 space-y-1.5 shadow-xs">
                        <div className="flex items-center justify-between font-mono text-[10px]">
                          <span className="font-bold text-amber-800 dark:text-salud-amber flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-salud-amber" />
                            <span>臨床教學珍珠 (Clinical Pearl)</span>
                          </span>
                          {leadExpert && (
                            <span className="text-amber-700/80 dark:text-amber-400 font-sans">
                              {leadExpert.title_zh.split('專家')[0]}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-amber-950 dark:text-amber-200 leading-relaxed italic font-sans">
                          {page.clinical_pearl}
                        </p>
                      </div>
                    )}

                    {/* 專業醫學 TAGs 標籤列 */}
                    {page.tags && page.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {page.tags.map((tag) => (
                          <span
                            key={tag}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedTag(tag);
                              setSelectedPathwayStep(null);
                            }}
                            className={`text-[10px] font-mono px-2.5 py-0.5 rounded-xl border transition-all ${getTagColor(
                              tag
                            )}`}
                            title={`點擊篩選 #${tag}`}
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* 卡片底欄：原子化KP數、圖解數、主審專家、直達箭頭 */}
                  <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-2.5">
                      <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
                        <FileText className="w-3.5 h-3.5 text-nature-sky-600 dark:text-salud-cyan" />
                        <strong>{page.kps?.length || 0}</strong> KP
                      </span>
                      <span className="text-slate-300 dark:text-slate-700">·</span>
                      <span>
                        <strong>{page.figure_ids?.length || 0}</strong> 圖解
                      </span>
                      {leadExpert && (
                        <>
                          <span className="text-slate-300 dark:text-slate-700">·</span>
                          <span className="text-slate-600 dark:text-slate-300 font-sans hidden sm:inline" title={leadExpert.why_needed}>
                            審定：{leadExpert.id}
                          </span>
                        </>
                      )}
                    </div>

                    <span className="text-nature-sky-600 dark:text-salud-cyan font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>研讀文庫</span>
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* 5B. 臨床速查條列視圖 (Digest View) */
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 overflow-hidden shadow-sm">
            <div className="divide-y divide-slate-200 dark:divide-slate-800">
              {filteredPages.map((page) => {
                const hasGated = page.safety_gated;
                const isCompleted = completedPages.includes(page.id);
                const leadExpert = EXPERT_COUNCIL.find((e) => e.id === page.lead_expert_id);

                return (
                  <div
                    key={page.id}
                    onClick={() => onSelectPage(page.id)}
                    className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <button
                        onClick={(e) => toggleComplete(page.id, e)}
                        className={`mt-0.5 p-1 rounded-lg transition-colors shrink-0 ${
                          isCompleted ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600' : 'text-slate-300 hover:text-slate-500'
                        }`}
                        title={isCompleted ? '已研讀' : '點擊標記已讀'}
                      >
                        <Check className="w-4 h-4" />
                      </button>

                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap text-[10px] font-mono">
                          <span className="font-bold text-nature-sky-700 dark:text-salud-cyan">{page.id}</span>
                          <span className="text-slate-300 dark:text-slate-700">·</span>
                          <span className={`px-2 py-0.2 rounded-md border ${getDifficultyBadge(page.difficulty)}`}>
                            {page.difficulty}
                          </span>
                          {hasGated && (
                            <span className="px-1.5 py-0.2 rounded bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 font-bold">
                              SAFETY GATED
                            </span>
                          )}
                          <span className="text-slate-400">約 {page.estimated_minutes} 分鐘</span>
                        </div>

                        <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-nature-sky-600 dark:group-hover:text-salud-cyan transition-colors">
                          {language === 'zh-TW' ? page.title_zh : page.title_en}
                        </h4>

                        {page.analogy_title && (
                          <div className="text-[11px] font-medium text-sky-700 dark:text-salud-cyan flex items-center gap-1 font-mono">
                            <span className="shrink-0">💡</span>
                            <span className="truncate">秒懂：{page.analogy_title}</span>
                          </div>
                        )}

                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 font-sans">
                          {page.clinical_pearl || page.hook}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 sm:self-center font-mono text-xs">
                      {leadExpert && (
                        <span className="text-[11px] text-slate-400 hidden lg:inline font-sans">
                          審定：{leadExpert.title_zh.split('專家')[0]}
                        </span>
                      )}
                      <span className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 group-hover:bg-nature-sky-500 group-hover:text-white text-slate-700 dark:text-slate-300 font-bold transition-all flex items-center gap-1">
                        <span>開啟</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )
      ) : (
        /* 搜尋無結果時的提示 */
        <div className="p-12 text-center rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 bg-white/60 dark:bg-slate-900/40 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
            <Filter className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-slate-800 dark:text-slate-200">
            未找到相符的醫學文庫
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto font-sans">
            在當前條件下無符合頁面。建議更換搜尋關鍵字，或點擊下方按鈕重置所有篩選。
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedTag(null);
              setSelectedPathwayStep(null);
              setSearchQuery('');
            }}
            className="btn-tactile px-4 py-2 rounded-xl bg-nature-sky-500 text-white font-mono text-xs font-bold shadow-cyan-glow"
          >
            重置所有篩選條件
          </button>
        </div>
      )}
    </div>
  );
};
