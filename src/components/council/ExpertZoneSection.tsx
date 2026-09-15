import React, { useState, useMemo } from 'react';
import { EXPERT_COUNCIL } from '../../data/expertCouncil';
import { EXPERT_BEST_PRACTICES } from '../../data/expertBestPractices';
import { ExpertCouncilMember } from '../../types';
import { useLanguage } from '../../i18n';
import { useNavigation } from '../../context/NavigationContext';
import { GrandCouncilManifestoModal } from './GrandCouncilManifestoModal';
import {
  ShieldCheck,
  Search,
  Grid,
  List,
  Award,
  ChevronRight,
  Filter,
  CheckCircle2,
  BookOpen,
  X,
  Stethoscope,
  Utensils,
  Scale,
  Hourglass,
  Activity,
  Brain,
  Pill,
} from 'lucide-react';

// 8 大權威醫學與科學分類別定義
export const EXPERT_CATEGORIES = [
  {
    id: 'all',
    name_zh: '全部 40 席專家',
    name_en: 'All 40 Experts',
    icon: Award,
    expertIds: EXPERT_COUNCIL.map((e) => e.id),
  },
  {
    id: 'clinical',
    name_zh: '臨床醫學與重症防治',
    name_en: 'Clinical Medicine & Prevention',
    icon: Stethoscope,
    expertIds: ['EC-01', 'EC-02', 'EC-03', 'EC-04', 'EC-13', 'EC-23', 'EC-26'],
  },
  {
    id: 'nutrition',
    name_zh: '營養科學與食品科技',
    name_en: 'Nutrition & Lipid Science',
    icon: Utensils,
    expertIds: ['EC-05', 'EC-14', 'EC-15'],
  },
  {
    id: 'obesity',
    name_zh: '肥胖醫學與代謝專科',
    name_en: 'Obesity & Metabolic Medicine',
    icon: Scale,
    expertIds: ['EC-28', 'EC-29', 'EC-30', 'EC-31', 'EC-32', 'EC-33'],
  },
  {
    id: 'longevity',
    name_zh: '長壽醫學與衰老生物學',
    name_en: 'Longevity & Geroscience',
    icon: Hourglass,
    expertIds: ['EC-34', 'EC-35', 'EC-36', 'EC-37', 'EC-38', 'EC-39', 'EC-40'],
  },
  {
    id: 'exercise',
    name_zh: '運動生理與熱調節',
    name_en: 'Exercise & Thermal Physiology',
    icon: Activity,
    expertIds: ['EC-06', 'EC-16', 'EC-27'],
  },
  {
    id: 'mind_body',
    name_zh: '身心神經與行為科學',
    name_en: 'Mind-Body & Behavioral Science',
    icon: Brain,
    expertIds: ['EC-07', 'EC-08', 'EC-21', 'EC-25'],
  },
  {
    id: 'pharmacology',
    name_zh: '藥理學、毒理與基因體',
    name_en: 'Pharmacology & Genomics',
    icon: Pill,
    expertIds: ['EC-09', 'EC-24'],
  },
  {
    id: 'governance',
    name_zh: '實證醫學、科技與法規',
    name_en: 'Evidence, Tech & Governance',
    icon: ShieldCheck,
    expertIds: ['EC-10', 'EC-11', 'EC-12', 'EC-17', 'EC-18', 'EC-19', 'EC-20', 'EC-22'],
  },
];

interface Props {
  onOpenBestPractice?: (expertId: string) => void;
}

export const ExpertZoneSection: React.FC<Props> = ({ onOpenBestPractice }) => {
  const { language } = useLanguage();
  const { openCouncilEvidence } = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedMember, setSelectedMember] = useState<ExpertCouncilMember | null>(null);
  const [isManifestoOpen, setIsManifestoOpen] = useState<boolean>(false);

  // 取得所選分類專家
  const currentCategoryDef = useMemo(() => {
    return EXPERT_CATEGORIES.find((c) => c.id === selectedCategory) || EXPERT_CATEGORIES[0];
  }, [selectedCategory]);

  // 過濾邏輯
  const filteredExperts = useMemo(() => {
    return EXPERT_COUNCIL.filter((member) => {
      // 類別過濾
      if (selectedCategory !== 'all') {
        if (!currentCategoryDef.expertIds.includes(member.id)) return false;
      }

      // 搜尋關鍵字過濾 (ID, 中文職稱, 英文職稱, 必要性原因, 核心職責)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const inId = member.id.toLowerCase().includes(query);
        const inZh = member.title_zh.toLowerCase().includes(query);
        const inEn = member.title_en.toLowerCase().includes(query);
        const inName = member.name_en?.toLowerCase().includes(query) || false;
        const inWhy = member.why_needed.toLowerCase().includes(query);
        const inDuty = member.core_duty.toLowerCase().includes(query);

        if (!inId && !inZh && !inEn && !inName && !inWhy && !inDuty) {
          return false;
        }
      }

      return true;
    });
  }, [selectedCategory, currentCategoryDef, searchQuery]);

  // 根據專家 ID 取得所屬分類名稱
  const getExpertCategoryName = (expertId: string): string => {
    const found = EXPERT_CATEGORIES.find((c) => c.id !== 'all' && c.expertIds.includes(expertId));
    return found ? found.name_zh : '全人治理專席';
  };

  // 檢查專家是否有對應實證專論 (Best Practice Monograph)
  const hasBestPractice = (expertId: string): boolean => {
    return EXPERT_BEST_PRACTICES.some((bp) => bp.expertId === expertId);
  };

  const handleOpenExpertPractice = (expertId: string) => {
    if (onOpenBestPractice) {
      onOpenBestPractice(expertId);
    } else {
      openCouncilEvidence(expertId);
    }
  };

  return (
    <section id="expert-zone" className="mt-16 pt-12 border-t-2 border-emerald-100 dark:border-emerald-950/60 font-sans space-y-8">
      {/* ── 頂部專區旗艦標題 ── */}
      <div className="p-6 sm:p-8 rounded-3xl border border-emerald-200/90 dark:border-emerald-900/60 bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/40 dark:from-[#0F1A15] dark:via-[#141F1A] dark:to-slate-950 shadow-sm relative overflow-hidden backdrop-blur-sm">
        <div className="absolute -top-16 -right-16 w-80 h-80 bg-emerald-400/10 dark:bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-emerald-100 dark:border-emerald-950/80 pb-4">
            <div className="flex items-center gap-3.5">
              <div className="p-3 rounded-2xl bg-emerald-600 dark:bg-emerald-500 text-white shadow-emerald-glow">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                    Salud 臨床治理架構
                  </span>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 hidden sm:inline">
                    Spec v1.2.0 具名負責
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
                  全人健康醫學專家專區 (Expert Council Directory)
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsManifestoOpen(true)}
                className="btn-tactile px-4 py-2 rounded-2xl bg-white dark:bg-[#182620] border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 transition-all font-mono text-xs font-bold flex items-center gap-1.5 shadow-xs"
              >
                <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>40 席專家簽署大憲章</span>
              </button>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans max-w-4xl">
            Salud 堅守醫療科學真實性，拒絕孤立黑盒與未經審核的內容。全平台涵蓋的飲食、水合、睡眠、運動、肥胖與抗衰老知識，由下列{' '}
            <strong className="text-emerald-800 dark:text-emerald-300 font-bold">40 席專科臨床醫師、生化學者、營養學家與跨領域科學家</strong>{' '}
            組成專家理事會，依循 <strong>Oxford CEBM Level 1a</strong> 與 <strong>GRADE 實證標準</strong> 進行分科簽核與同儕覆核。
          </p>
        </div>
      </div>

      {/* ── 控制列：分類別 Tabs + 關鍵字檢索 + 視圖切換 ── */}
      <div className="space-y-4">
        {/* 8 大專科分類別篩選 Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {EXPERT_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            const count = cat.expertIds.length;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`btn-tactile px-3.5 py-2 rounded-2xl text-xs font-mono shrink-0 flex items-center gap-2 border transition-all ${
                  isSelected
                    ? 'bg-emerald-600 text-white font-bold border-emerald-700 shadow-emerald-glow'
                    : 'bg-white dark:bg-[#141F1A] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-[#1C2E25] hover:border-emerald-300 dark:hover:border-emerald-800'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-emerald-600 dark:text-emerald-400'}`} />
                <span>{language === 'zh-TW' ? cat.name_zh : cat.name_en}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-white/30 text-white' : 'bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* 搜尋欄與視圖模式切換 */}
        <div className="p-4 rounded-3xl bg-white dark:bg-[#141F1A] border border-slate-200 dark:border-[#1C2E25] flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
          <div className="relative w-full sm:flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜尋專家席位（例如：EC-03、心臟、營養師、粒線體、肥胖、睡眠、自噬）..."
              className="w-full pl-10 pr-8 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#0F1714] border border-slate-200 dark:border-[#1C2E25] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between w-full sm:w-auto gap-3 shrink-0">
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              符合 <strong>{filteredExperts.length}</strong> 位專家席位
            </span>

            {/* 視圖切換 */}
            <div className="flex items-center p-1 rounded-2xl bg-slate-100 dark:bg-[#0F1714] border border-slate-200 dark:border-[#1C2E25]">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-xl transition-all flex items-center gap-1 text-xs font-mono ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-[#182620] text-emerald-700 dark:text-emerald-300 font-bold shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
                title="專科卡片視圖"
              >
                <Grid className="w-3.5 h-3.5" />
                <span className="hidden md:inline">卡片視圖</span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-xl transition-all flex items-center gap-1 text-xs font-mono ${
                  viewMode === 'list'
                    ? 'bg-white dark:bg-[#182620] text-emerald-700 dark:text-emerald-300 font-bold shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
                title="精準條列清單"
              >
                <List className="w-3.5 h-3.5" />
                <span className="hidden md:inline">條列清單</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── 專家資料展現：卡片網格視圖 (Grid) vs 條列清單視圖 (List) ── */}
      {filteredExperts.length > 0 ? (
        viewMode === 'grid' ? (
          /* 1. 卡片網格視圖 (Card Grid View) */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredExperts.map((member) => {
              const categoryName = getExpertCategoryName(member.id);
              const hasMonograph = hasBestPractice(member.id);

              return (
                <div
                  key={member.id}
                  onClick={() => setSelectedMember(member)}
                  className="btn-tactile p-5 rounded-3xl border border-slate-200 dark:border-[#1C2E25] bg-white dark:bg-[#141F1A] hover:border-emerald-400 dark:hover:border-emerald-600 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group space-y-3 relative overflow-hidden"
                >
                  <div className="space-y-2.5">
                    {/* 卡片標頭：ID + 專科類別 */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs font-extrabold px-2.5 py-0.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                        {member.id}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-[#182620] text-slate-600 dark:text-slate-300">
                        {categoryName}
                      </span>
                    </div>

                    {/* 專家職稱與領域 */}
                    <div>
                      <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors leading-snug">
                        {language === 'zh-TW' ? member.title_zh : member.title_en}
                      </h4>
                      <div className="font-mono text-[11px] text-slate-400 dark:text-slate-500 mt-0.5 truncate">
                        {member.name_en}
                      </div>
                    </div>

                    {/* 臨床專責必要性 (Why Needed) */}
                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed font-sans">
                      {member.why_needed}
                    </p>

                    {/* 核心審定職責 (Core Duty) */}
                    <div className="p-2.5 rounded-2xl bg-emerald-50/70 dark:bg-[#0F1714] border border-emerald-200/60 dark:border-emerald-900/40 text-[11px] text-emerald-950 dark:text-emerald-200 line-clamp-2 font-sans">
                      <strong className="text-emerald-800 dark:text-emerald-400 font-bold block mb-0.5 font-mono text-[10px]">核心職責：</strong>
                      <span>{member.core_duty}</span>
                    </div>
                  </div>

                  {/* 卡片底欄操作 */}
                  <div className="pt-2 border-t border-slate-100 dark:border-[#1C2E25] flex items-center justify-between text-xs font-mono text-slate-400">
                    <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold">
                      ✓ CEBM 1a 審簽
                    </span>

                    <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 group-hover:translate-x-0.5 transition-transform font-bold text-[11px]">
                      <span>檢視檔案</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* 2. 精準條列清單視圖 (Registry Table/List View) */
          <div className="rounded-3xl border border-slate-200 dark:border-[#1C2E25] bg-white dark:bg-[#141F1A] overflow-hidden shadow-xs">
            <div className="divide-y divide-slate-200 dark:divide-[#1C2E25]">
              {filteredExperts.map((member) => {
                const categoryName = getExpertCategoryName(member.id);
                const hasMonograph = hasBestPractice(member.id);

                return (
                  <div
                    key={member.id}
                    onClick={() => setSelectedMember(member)}
                    className="p-4 hover:bg-emerald-50/30 dark:hover:bg-[#182620] cursor-pointer transition-colors flex flex-col md:flex-row md:items-center justify-between gap-3 group"
                  >
                    <div className="space-y-1.5 min-w-0 md:flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                          {member.id}
                        </span>
                        <span className="text-xs font-mono text-slate-400">·</span>
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-[#0F1714] text-slate-600 dark:text-slate-300">
                          {categoryName}
                        </span>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                          {language === 'zh-TW' ? member.title_zh : member.title_en}
                        </h4>
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-1 font-sans">
                        <strong className="text-emerald-700 dark:text-emerald-400">職責：</strong>
                        {member.core_duty}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end md:self-center font-mono text-xs">
                      {hasMonograph && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenExpertPractice(member.id);
                          }}
                          className="btn-tactile px-2.5 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-[11px] font-bold hover:bg-emerald-100 flex items-center gap-1"
                        >
                          <BookOpen className="w-3 h-3" />
                          <span>實證專論</span>
                        </button>
                      )}

                      <span className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-[#182620] group-hover:bg-emerald-600 group-hover:text-white text-slate-700 dark:text-slate-300 font-bold transition-all flex items-center gap-1 text-xs">
                        <span>詳情</span>
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
        /* 無符合搜尋結果提示 */
        <div className="p-12 text-center rounded-3xl border border-dashed border-slate-300 dark:border-[#1C2E25] bg-white/60 dark:bg-[#141F1A]/40 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
            <Filter className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-slate-800 dark:text-slate-200">
            未找到相符的專家席位
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto font-sans">
            當前條件下無符合席位。請嘗試更換搜尋關鍵字，或點擊下方重置篩選。
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="btn-tactile px-4 py-2 rounded-xl bg-emerald-600 text-white font-mono text-xs font-bold shadow-emerald-glow"
          >
            重置所有篩選
          </button>
        </div>
      )}

      {/* ── 專家詳情彈窗 (Selected Expert Modal Dossier) ── */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-2xl bg-white dark:bg-[#141F1A] border border-emerald-300 dark:border-emerald-800 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-5 overflow-y-auto max-h-[90vh]">
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 dark:border-[#1C2E25] pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-mono text-xs font-bold">
                    {selectedMember.id}
                  </span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-[#0F1714] text-slate-600 dark:text-slate-300">
                    {getExpertCategoryName(selectedMember.id)}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-extrabold text-slate-900 dark:text-white">
                  {selectedMember.title_zh}
                </h3>
                <p className="text-xs font-mono text-slate-400">
                  {selectedMember.title_en} · {selectedMember.name_en}
                </p>
              </div>

              <button
                onClick={() => setSelectedMember(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 專責詳細內容 */}
            <div className="space-y-4 text-xs font-sans">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0F1714] border border-slate-200 dark:border-[#1C2E25] space-y-1">
                <span className="font-bold text-slate-500 font-mono text-[11px] block">臨床專科背景與必要性 (Why Needed)：</span>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{selectedMember.why_needed}</p>
                {selectedMember.why_needed_en && (
                  <p className="text-slate-400 text-[11px] italic mt-1">{selectedMember.why_needed_en}</p>
                )}
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-900/60 space-y-1">
                <span className="font-bold text-emerald-800 dark:text-emerald-400 font-mono text-[11px] block">臨床治理與核心終局審定 (Core Duty)：</span>
                <p className="text-emerald-950 dark:text-emerald-100 leading-relaxed font-medium">{selectedMember.core_duty}</p>
                {selectedMember.core_duty_en && (
                  <p className="text-emerald-700/80 dark:text-emerald-300/70 text-[11px] italic mt-1">{selectedMember.core_duty_en}</p>
                )}
              </div>

              {/* 實證基準標章 */}
              <div className="grid grid-cols-2 gap-3 font-mono text-[11px]">
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-[#182620] border border-slate-200 dark:border-slate-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Oxford CEBM Level 1a 審定</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-[#182620] border border-slate-200 dark:border-slate-800 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>GRADE A 實證強度背書</span>
                </div>
              </div>
            </div>

            {/* 操作列 */}
            <div className="pt-3 border-t border-slate-100 dark:border-[#1C2E25] flex flex-wrap items-center justify-between gap-2">
              <button
                onClick={() => setSelectedMember(null)}
                className="btn-tactile px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-mono"
              >
                關閉
              </button>

              {hasBestPractice(selectedMember.id) ? (
                <button
                  onClick={() => {
                    const id = selectedMember.id;
                    setSelectedMember(null);
                    handleOpenExpertPractice(id);
                  }}
                  className="btn-tactile px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-mono font-bold flex items-center gap-1.5 shadow-emerald-glow"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>研讀 {selectedMember.id} 實證最佳實踐專論 →</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setSelectedMember(null);
                    setIsManifestoOpen(true);
                  }}
                  className="btn-tactile px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-mono font-bold flex items-center gap-1.5 shadow-emerald-glow"
                >
                  <Award className="w-4 h-4" />
                  <span>查看全人健康治理大憲章</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 大憲章彈窗 */}
      <GrandCouncilManifestoModal
        isOpen={isManifestoOpen}
        onClose={() => setIsManifestoOpen(false)}
      />
    </section>
  );
};
