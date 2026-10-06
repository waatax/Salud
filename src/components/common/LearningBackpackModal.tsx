import React, { useState } from 'react';
import {
  X,
  Bookmark,
  BookmarkCheck,
  ListChecks,
  Flame,
  Award,
  BookOpen,
  ArrowRight,
  Clock,
  Trash2,
  Sparkles,
  CheckCircle2,
  Circle,
} from 'lucide-react';
import { useBookmarks } from '../../hooks/useBookmarks';
import { useActionPlan } from '../../hooks/useActionPlan';
import { useHealthStreak } from '../../hooks/useHealthStreak';
import { useNavigation } from '../../context/NavigationContext';
import { resolveTip } from '../../data/learning/tipIndex';
import { TipKindBadge } from '../learn/QuickTips';

type BackpackTab = 'bookmarks' | 'plan' | 'streak';

export const LearningBackpackModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<BackpackTab>('bookmarks');
  const { bookmarkedPages, toggleBookmark } = useBookmarks();
  const { plan, toggleToday, doneToday, remove, last7 } = useActionPlan();
  const { streak, totalCheckIns, checkedInToday, checkIn } = useHealthStreak();
  const { selectPage, go } = useNavigation();

  if (!isOpen) return null;

  const planItems = plan.items.map(resolveTip).filter((x): x is NonNullable<typeof x> => Boolean(x));
  const planDoneCount = planItems.filter((i) => doneToday(i.id)).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4" role="dialog" aria-modal="true" aria-labelledby="backpack-title">
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm animate-fade-in" onClick={onClose} />

      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-3xl bg-white dark:bg-salud-dark-surface border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4 bg-slate-50/70 dark:bg-slate-900/40">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md">
              <Bookmark className="w-5 h-5" />
            </span>
            <div>
              <h2 id="backpack-title" className="text-xl sm:text-2xl font-display font-extrabold text-slate-900 dark:text-white">
                個人健康背包與收藏
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                你的專屬健康收藏夾、今日行動計畫與習慣養成軌跡
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            aria-label="關閉"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-100 dark:border-slate-800 px-4 sm:px-6 bg-white dark:bg-salud-dark-surface">
          <button
            onClick={() => setActiveTab('bookmarks')}
            className={`btn-tactile py-3 px-4 font-semibold text-xs sm:text-sm border-b-2 flex items-center gap-2 transition-all ${
              activeTab === 'bookmarks'
                ? 'border-emerald-600 text-emerald-800 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <BookmarkCheck className="w-4 h-4" />
            <span>知識書籤 ({bookmarkedPages.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('plan')}
            className={`btn-tactile py-3 px-4 font-semibold text-xs sm:text-sm border-b-2 flex items-center gap-2 transition-all ${
              activeTab === 'plan'
                ? 'border-emerald-600 text-emerald-800 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <ListChecks className="w-4 h-4" />
            <span>今日行動 ({planDoneCount}/{planItems.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('streak')}
            className={`btn-tactile py-3 px-4 font-semibold text-xs sm:text-sm border-b-2 flex items-center gap-2 transition-all ${
              activeTab === 'streak'
                ? 'border-emerald-600 text-emerald-800 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Flame className="w-4 h-4 text-orange-500" />
            <span>打卡成就 ({streak}天)</span>
          </button>
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {/* TAB 1: BOOKMARKS */}
          {activeTab === 'bookmarks' && (
            <div>
              {bookmarkedPages.length === 0 ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-500 flex items-center justify-center mx-auto">
                    <Bookmark className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm">尚無收藏的醫學專章</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                    在閱讀任何專章知識頁面時，點擊右上角「收藏」按鈕，即可將該頁加入你的專屬學習書籤，隨時複習。
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {bookmarkedPages.map((page) => (
                    <div
                      key={page.id}
                      className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 flex items-center justify-between gap-4 hover:border-emerald-400 transition-colors"
                    >
                      <div className="space-y-1 flex-1 min-w-0">
                        <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
                          <span className="px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold">
                            Chapter {page.chapter_id}
                          </span>
                          <span>{page.id}</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {page.estimated_minutes} 分鐘
                          </span>
                        </div>
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm truncate">
                          {page.title_zh}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                          {page.hook}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => {
                            onClose();
                            selectPage(page.id);
                          }}
                          className="btn-tactile px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold hover:bg-emerald-100 flex items-center gap-1"
                        >
                          <span>前往閱讀</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => toggleBookmark(page.id)}
                          className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                          title="取消收藏"
                          aria-label="取消收藏"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: ACTION PLAN */}
          {activeTab === 'plan' && (
            <div className="space-y-3">
              {planItems.length === 0 ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center mx-auto">
                    <ListChecks className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm">尚無今日行動項目</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                    在課程或知識專頁中的「今天就能做」或「行動處方」點擊「加入計畫」，為自己制定每日健康實踐清單。
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between pb-1">
                    <span>今日已完成 {planDoneCount} / {planItems.length} 項</span>
                    <span>近 7 天堅持紀錄</span>
                  </div>
                  {planItems.map((item) => {
                    const done = doneToday(item.id);
                    const week = last7(item.id);
                    return (
                      <div
                        key={item.id}
                        className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 flex items-start gap-3"
                      >
                        <button
                          onClick={() => toggleToday(item.id)}
                          className="mt-0.5 shrink-0 rounded-full focus-visible:outline-none"
                        >
                          {done ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                          ) : (
                            <Circle className="w-5 h-5 text-slate-300 dark:text-slate-600 hover:text-emerald-500" />
                          )}
                        </button>
                        <div className="flex-1 min-w-0 space-y-1">
                          <p className={`text-xs sm:text-sm font-semibold leading-relaxed ${done ? 'text-slate-400 line-through decoration-emerald-500/60' : 'text-slate-900 dark:text-white'}`}>
                            {item.title_zh}
                          </p>
                          <div className="flex flex-wrap items-center gap-2 text-[10px] text-slate-500">
                            <TipKindBadge kind={item.kind} />
                            <span className="inline-flex items-center gap-1 font-mono">
                              <Flame className={`w-3 h-3 ${week >= 5 ? 'text-orange-500' : ''}`} />
                              近 7 天 {week} 天
                            </span>
                            <button
                              onClick={() => {
                                onClose();
                                go(item.hash);
                              }}
                              className="hover:underline text-emerald-700 dark:text-emerald-400 truncate max-w-[14rem]"
                            >
                              來自：{item.source_zh}
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={() => remove(item.id)}
                          className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30"
                          title="從計畫移除"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: STREAK & ACHIEVEMENTS */}
          {activeTab === 'streak' && (
            <div className="space-y-5">
              <div className="p-5 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50/50 dark:from-slate-900 dark:to-orange-950/20 border border-orange-200 dark:border-orange-900/60 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-orange-800 dark:text-orange-300">
                    <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
                    <span>連續健康生活打卡</span>
                  </div>
                  <div className="text-3xl font-display font-extrabold text-slate-900 dark:text-white">
                    {streak} <span className="text-base font-normal text-slate-500">天</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    累計已打卡 {totalCheckIns} 次 · 養成原子微習慣
                  </p>
                </div>

                {!checkedInToday ? (
                  <button
                    onClick={() => checkIn()}
                    className="btn-tactile px-5 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-xs shadow-md hover:shadow-lg flex items-center gap-1.5"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>立即打卡 (+1天)</span>
                  </button>
                ) : (
                  <div className="px-4 py-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold border border-emerald-300 dark:border-emerald-800 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>今日已打卡 ✓</span>
                  </div>
                )}
              </div>

              {/* Badges showcase */}
              <div className="space-y-3">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-500" />
                  健康成就徽章牆
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  {[
                    { days: 3, name: '自律起步', desc: '連續打卡 3 天', unlocked: streak >= 3 },
                    { days: 7, name: '週間大師', desc: '連續打卡 7 天', unlocked: streak >= 7 },
                    { days: 14, name: '原子習慣', desc: '連續打卡 14 天', unlocked: streak >= 14 },
                    { days: 30, name: '卓越健康', desc: '連續打卡 30 天', unlocked: streak >= 30 },
                  ].map((b) => (
                    <div
                      key={b.name}
                      className={`p-3.5 rounded-2xl border transition-all ${
                        b.unlocked
                          ? 'border-amber-300 dark:border-amber-800/80 bg-amber-50/70 dark:bg-amber-950/30'
                          : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 opacity-60'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center mb-2 ${b.unlocked ? 'bg-amber-500 text-white shadow-xs' : 'bg-slate-200 dark:bg-slate-800 text-slate-400'}`}>
                        <Award className="w-4 h-4" />
                      </div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">{b.name}</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{b.desc}</div>
                      <span className={`inline-block mt-2 text-[9px] font-mono px-2 py-0.5 rounded-full ${b.unlocked ? 'bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-100 font-bold' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}`}>
                        {b.unlocked ? '已解鎖' : '未解鎖'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
