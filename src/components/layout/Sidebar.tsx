import React, { useState } from 'react';
import { Chapter, KnowledgePage, HealthPillar } from '../../types';
import { useLanguage } from '../../i18n';
import { useNavigation } from '../../context/NavigationContext';
import { useModal } from '../../context/ModalContext';
import { FontSizeToggle } from '../common/FontSizeToggle';
import {
  Utensils,
  Activity,
  Moon,
  Pill,
  Droplets,
  Flame,
  Wine,
  ChevronDown,
  ChevronRight,
  ShieldCheck,
  HeartPulse,
  ClipboardCheck,
  AlertOctagon,
  BookOpen,
  PanelLeftClose,
  PanelLeft,
  Sparkles,
} from 'lucide-react';

interface Props {
  activePillar?: HealthPillar;
  onSelectPillar?: (pillar: HealthPillar) => void;
  currentChapterId?: string;
  activePageId?: string;
  onSelectChapter?: (chapterId: string) => void;
  onSelectPage?: (pageId: string) => void;
  chapterWPages?: KnowledgePage[];
  chapterOPages?: KnowledgePage[];
  chapterAPages?: KnowledgePage[];
  onOpenAuditC?: () => void;
  onOpenCardioHub?: () => void;
  onOpenSupplements?: () => void;
  onOpenCouncil?: () => void;
  onOpenCouncilEvidence?: (expertId?: string) => void;
  onOpenEmergencyModal?: () => void;
}

export const Sidebar: React.FC<Props> = (props) => {
  const { t, language } = useLanguage();
  const nav = useNavigation();
  const modal = useModal();

  // Desktop collapsed mode (w-64 vs w-16)
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedDietSub, setExpandedDietSub] = useState(true);

  // Fallback to NavigationContext / ModalContext when props are omitted
  const activePillar = props.activePillar ?? nav.activePillar;
  const onSelectPillar = props.onSelectPillar ?? nav.selectPillar;
  const currentChapterId = props.currentChapterId ?? nav.currentChapterId;
  const activePageId = props.activePageId ?? nav.activePageId;
  const onSelectChapter = props.onSelectChapter ?? nav.selectChapter;
  const onSelectPage = props.onSelectPage ?? nav.selectPage;
  const onOpenAuditC = props.onOpenAuditC ?? (() => modal.openModal('auditC'));
  const onOpenCardioHub = props.onOpenCardioHub ?? (() => modal.openModal('cardioHub'));
  const onOpenCouncil = props.onOpenCouncil ?? (() => modal.openModal('council'));
  const onOpenCouncilEvidence = props.onOpenCouncilEvidence ?? nav.openCouncilEvidence;
  const onOpenEmergencyModal = props.onOpenEmergencyModal ?? (() => modal.openModal('emergency'));

  const pagesForCurrent =
    props.chapterWPages && props.chapterOPages && props.chapterAPages
      ? currentChapterId === 'W'
        ? props.chapterWPages
        : currentChapterId === 'O'
        ? props.chapterOPages
        : currentChapterId === 'A'
        ? props.chapterAPages
        : []
      : nav.pagesForCurrent;

  return (
    <aside
      className={`shrink-0 border-r border-salud-light-border/80 dark:border-salud-dark-border/80 bg-white/70 dark:bg-salud-dark-surface/50 p-4 space-y-5 overflow-y-auto text-xs font-sans transition-all duration-300 ${
        isCollapsed ? 'w-16 items-center px-2' : 'w-64'
      }`}
    >
      {/* ── Top Collapse Toggle (Desktop only) ── */}
      <div className="hidden lg:flex items-center justify-between pb-1 border-b border-slate-200/60 dark:border-slate-800/60">
        {!isCollapsed && (
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-bold">
            導航目錄 (Nav)
          </span>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${
            isCollapsed ? 'mx-auto' : ''
          }`}
          title={isCollapsed ? '展開側邊欄' : '收合側邊欄'}
          aria-label={isCollapsed ? '展開側邊欄' : '收合側邊欄'}
        >
          {isCollapsed ? <PanelLeft className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
        </button>
      </div>

      {/* ── Health Pillars Selection ── */}
      <div className="space-y-1.5">
        {!isCollapsed && (
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider px-1 block font-bold">
            健康核心架構 (Health Pillars)
          </span>
        )}

        {/* 0. Human Organ Systems (Primary Home) */}
        <div className="space-y-1">
          <button
            onClick={() => onSelectPillar('systems')}
            className={`btn-tactile w-full p-2.5 rounded-xl border text-left transition-all flex items-center justify-between ${
              activePillar === 'systems'
                ? 'border-salud-cyan dark:border-salud-cyan bg-salud-cyan/15 dark:bg-salud-cyan/20 text-slate-900 dark:text-salud-cyan font-bold shadow-sm'
                : 'border-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
            } ${isCollapsed ? 'justify-center px-2' : ''}`}
            title={isCollapsed ? '人體系統' : undefined}
          >
            <div className="flex items-center gap-2">
              <HeartPulse
                className={`w-4 h-4 ${
                  activePillar === 'systems' ? 'text-salud-cyan' : 'text-slate-400'
                }`}
              />
              {!isCollapsed && <span className="text-xs">人體系統 (首頁)</span>}
            </div>
            {!isCollapsed && (
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-salud-cyan/20 text-salud-cyan-800 dark:text-salud-cyan-300 border border-salud-cyan/40 font-bold">
                8大系統
              </span>
            )}
          </button>
        </div>

        {/* 1. Diet & Nutrition Pillar (Contains Nutrients, Supplements, W, O, A) */}
        <div className="space-y-1">
          <button
            onClick={() => onSelectPillar('diet')}
            className={`btn-tactile w-full p-2.5 rounded-xl border text-left transition-all flex items-center justify-between ${
              activePillar === 'diet' || activePillar === 'supplements'
                ? 'border-nature-amber-300 dark:border-nature-amber-700 bg-nature-amber-50 dark:bg-nature-amber-950/40 text-nature-amber-900 dark:text-nature-amber-200 font-bold shadow-sm'
                : 'border-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
            } ${isCollapsed ? 'justify-center px-2' : ''}`}
            title={isCollapsed ? t('pillar.diet') : undefined}
          >
            <div className="flex items-center gap-2">
              <Utensils
                className={`w-4 h-4 ${
                  activePillar === 'diet' || activePillar === 'supplements' ? 'text-nature-amber-600 dark:text-nature-amber-400' : 'text-slate-400'
                }`}
              />
              {!isCollapsed && <span className="text-xs">飲食與營養保健</span>}
            </div>
            {!isCollapsed && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setExpandedDietSub(!expandedDietSub);
                }}
                className="p-1 hover:text-nature-amber-600 dark:hover:text-white rounded"
                aria-label="展開飲食專章"
              >
                {expandedDietSub ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </button>
            )}
          </button>

          {/* Sub-tree of Diet & Nutrition */}
          {!isCollapsed && expandedDietSub && (
            <div className="pl-4 space-y-1 border-l-2 border-slate-200 dark:border-slate-800 ml-3.5 py-1">
              <button
                onClick={() => {
                  onSelectPillar('diet');
                  window.location.hash = 'diet/patterns';
                }}
                className="btn-tactile w-full p-1.5 rounded-lg text-left font-mono text-[11px] transition-all flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              >
                <span className="text-nature-amber-600 font-bold">•</span>
                <span className="truncate">各式飲食重點 (碳水/纖維/蛋白)</span>
              </button>

              <button
                onClick={() => {
                  onSelectPillar('supplements');
                }}
                className="btn-tactile w-full p-1.5 rounded-lg text-left font-mono text-[11px] transition-all flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              >
                <Pill className="w-3.5 h-3.5 text-nature-green-600 dark:text-emerald-400" />
                <span className="truncate">營養保健 (GRADE 實證)</span>
              </button>

              {[
                {
                  id: 'W',
                  name: language === 'zh-TW' ? 'Chapter W · 水與體液' : 'Chapter W · Hydration',
                  icon: Droplets,
                  color: 'text-nature-sky-600 dark:text-nature-sky-400',
                },
                {
                  id: 'O',
                  name: language === 'zh-TW' ? 'Chapter O · 脂肪與油' : 'Chapter O · Fats & Oils',
                  icon: Flame,
                  color: 'text-nature-amber-600 dark:text-nature-amber-400',
                },
                {
                  id: 'A',
                  name: language === 'zh-TW' ? 'Chapter A · 酒精專章' : 'Chapter A · Alcohol',
                  icon: Wine,
                  color: 'text-purple-600 dark:text-purple-400',
                },
              ].map((ch) => {
                const isSelected = activePillar === 'diet' && currentChapterId === ch.id;
                const Icon = ch.icon;
                return (
                  <button
                    key={ch.id}
                    onClick={() => {
                      onSelectPillar('diet');
                      onSelectChapter(ch.id);
                    }}
                    className={`btn-tactile w-full p-1.5 rounded-lg text-left font-mono text-[11px] transition-all flex items-center gap-2 ${
                      isSelected
                        ? 'bg-slate-100 dark:bg-slate-800 text-nature-amber-700 dark:text-nature-amber-300 font-bold shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${ch.color}`} />
                    <span className="truncate">{ch.name}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* 2. Exercise & Movement Pillar */}
        <div className="space-y-1">
          <button
            onClick={() => onSelectPillar('exercise')}
            className={`btn-tactile w-full p-2.5 rounded-xl border text-left transition-all flex items-center justify-between ${
              activePillar === 'exercise'
                ? 'border-nature-sky-300 dark:border-nature-sky-700 bg-nature-sky-50 dark:bg-nature-sky-950/40 text-nature-sky-900 dark:text-nature-sky-200 font-bold shadow-sm'
                : 'border-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
            } ${isCollapsed ? 'justify-center px-2' : ''}`}
            title={isCollapsed ? t('pillar.exercise') : undefined}
          >
            <div className="flex items-center gap-2">
              <Activity
                className={`w-4 h-4 ${
                  activePillar === 'exercise' ? 'text-nature-sky-600 dark:text-nature-sky-400' : 'text-slate-400'
                }`}
              />
              {!isCollapsed && <span className="text-xs">{t('pillar.exercise')}</span>}
            </div>
            {!isCollapsed && (
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-nature-sky-100 dark:bg-nature-sky-900/60 text-nature-sky-800 dark:text-nature-sky-300 border border-nature-sky-200 dark:border-nature-sky-800/50">
                運動科學
              </span>
            )}
          </button>

          {/* Sub-tree of Exercise & Sports Science */}
          {!isCollapsed && (
            <div className="pl-4 space-y-1 border-l-2 border-slate-200 dark:border-slate-800 ml-3.5 py-1">
              {[
                { id: 'exercise', name: language === 'zh-TW' ? '運動生理與心率' : 'Exercise Physiology', hash: 'exercise', color: 'text-nature-sky-600 dark:text-nature-sky-400' },
                { id: 'exercise/running', name: language === 'zh-TW' ? '跑步運動科學' : 'Running Science', hash: 'exercise/running', color: 'text-nature-amber-600 dark:text-nature-amber-400' },
                { id: 'exercise/cycling', name: language === 'zh-TW' ? '自行車功率科學' : 'Cycling Science', hash: 'exercise/cycling', color: 'text-blue-600 dark:text-blue-400' },
                { id: 'exercise/mountaineering', name: language === 'zh-TW' ? '登山高海拔科學' : 'Mountaineering Science', hash: 'exercise/mountaineering', color: 'text-purple-600 dark:text-purple-400' },
                { id: 'exercise/strength', name: language === 'zh-TW' ? '肌肉重力訓練' : 'Strength Training', hash: 'exercise/strength', color: 'text-nature-green-600 dark:text-nature-green-400' },
                { id: 'exercise/mobility', name: language === 'zh-TW' ? '伸展柔軟度筋骨' : 'Mobility & Fascia', hash: 'exercise/mobility', color: 'text-teal-600 dark:text-teal-400' },
                { id: 'exercise/badminton', name: language === 'zh-TW' ? '羽毛球專項科學' : 'Badminton Science', hash: 'exercise/badminton', color: 'text-nature-amber-600 dark:text-nature-amber-400' },
                { id: 'exercise/table-tennis', name: language === 'zh-TW' ? '乒乓球專項科學' : 'Table Tennis Science', hash: 'exercise/table-tennis', color: 'text-rose-600 dark:text-rose-400' },
                { id: 'exercise/pickleball', name: language === 'zh-TW' ? '匹克球專項科學' : 'Pickleball Science', hash: 'exercise/pickleball', color: 'text-teal-600 dark:text-teal-400' },
              ].map((sub) => {
                return (
                  <button
                    key={sub.id}
                    onClick={() => {
                      onSelectPillar('exercise');
                      window.location.hash = sub.hash;
                    }}
                    className="btn-tactile w-full p-1.5 rounded-lg text-left font-mono text-[11px] transition-all flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                  >
                    <span className={`text-[10px] font-bold ${sub.color}`}>•</span>
                    <span className="truncate">{sub.name}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* 3. Sleep & Recovery Pillar */}
        <button
          onClick={() => onSelectPillar('sleep')}
          className={`btn-tactile w-full p-2.5 rounded-xl border text-left transition-all flex items-center justify-between ${
            activePillar === 'sleep'
              ? 'border-purple-300 dark:border-purple-700 bg-purple-50 dark:bg-purple-950/40 text-purple-900 dark:text-purple-200 font-bold shadow-sm'
              : 'border-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
          } ${isCollapsed ? 'justify-center px-2' : ''}`}
          title={isCollapsed ? t('pillar.sleep') : undefined}
        >
          <div className="flex items-center gap-2">
            <Moon
              className={`w-4 h-4 ${
                activePillar === 'sleep' ? 'text-purple-600 dark:text-purple-400' : 'text-slate-400'
              }`}
            />
            {!isCollapsed && <span className="text-xs">{t('pillar.sleep')}</span>}
          </div>
          {!isCollapsed && (
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-purple-100 dark:bg-purple-900/60 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800/50">
              Glymphatic
            </span>
          )}
        </button>
      </div>

      {/* Pages within current chapter (Only shown when browsing inside a specific chapter) */}
      {!isCollapsed && activePillar === 'diet' && nav.dietView === 'chapter' && pagesForCurrent.length > 0 && (
        <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between px-1 text-xs font-mono font-bold text-slate-700 dark:text-slate-400">
            <span>Chapter {currentChapterId} 知識頁清單</span>
            <span className="text-[10px] text-nature-sky-600 dark:text-nature-sky-400">{pagesForCurrent.length} 篇</span>
          </div>

          <div className="space-y-1 max-h-[28vh] overflow-y-auto pr-1">
            {pagesForCurrent.map((p) => {
              const isPageActive = p.id === activePageId;
              return (
                <button
                  key={p.id}
                  onClick={() => onSelectPage(p.id)}
                  className={`btn-tactile w-full p-2 rounded-xl text-left font-mono text-[11px] transition-all flex items-center justify-between ${
                    isPageActive
                      ? 'bg-nature-sky-50 dark:bg-slate-800/90 text-nature-sky-800 dark:text-nature-sky-300 font-bold border border-nature-sky-200 dark:border-nature-sky-800/60 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/40'
                  }`}
                >
                  <span className="truncate">{p.id}</span>
                  <span className="text-[10px] text-slate-400 shrink-0 font-sans">
                    {p.estimated_minutes}m
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Hub Tools & Quick Access */}
      <div className="space-y-1.5 pt-3 border-t border-slate-200 dark:border-slate-800">
        {!isCollapsed && (
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block px-1 font-bold">
            臨床治理與篩檢工具
          </span>
        )}

        <button
          onClick={onOpenEmergencyModal}
          className={`btn-tactile w-full p-2 rounded-xl border border-red-200 dark:border-red-900/60 bg-red-50/80 dark:bg-red-950/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-800 dark:text-red-300 font-mono text-xs flex items-center gap-2 transition-all ${
            isCollapsed ? 'justify-center px-2' : ''
          }`}
          title={t('nav.red_flags_title')}
        >
          <AlertOctagon className="w-3.5 h-3.5 text-red-600 dark:text-red-400 animate-pulse shrink-0" />
          {!isCollapsed && <span>{t('nav.red_flags')}</span>}
        </button>

        <button
          onClick={onOpenAuditC}
          className={`btn-tactile w-full p-2 rounded-xl border border-purple-200 dark:border-purple-800/60 bg-purple-50/80 dark:bg-purple-950/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 text-purple-800 dark:text-purple-300 font-mono text-xs flex items-center gap-2 transition-all ${
            isCollapsed ? 'justify-center px-2' : ''
          }`}
          title={isCollapsed ? t('nav.audit_c') : undefined}
        >
          <ClipboardCheck className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 shrink-0" />
          {!isCollapsed && <span>{t('nav.audit_c')}</span>}
        </button>

        <button
          onClick={onOpenCardioHub}
          className={`btn-tactile w-full p-2 rounded-xl border border-nature-sky-200 dark:border-nature-sky-800/60 bg-nature-sky-50/80 dark:bg-nature-sky-950/20 hover:bg-nature-sky-100 dark:hover:bg-nature-sky-900/30 text-nature-sky-800 dark:text-nature-sky-300 font-mono text-xs flex items-center gap-2 transition-all ${
            isCollapsed ? 'justify-center px-2' : ''
          }`}
          title={isCollapsed ? t('nav.cardio_hub') : undefined}
        >
          <HeartPulse className="w-3.5 h-3.5 text-nature-sky-600 dark:text-nature-sky-400 shrink-0" />
          {!isCollapsed && <span>{t('nav.cardio_hub')}</span>}
        </button>

        <button
          onClick={onOpenCouncil}
          className={`btn-tactile w-full p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-xs flex items-center gap-2 transition-all ${
            isCollapsed ? 'justify-center px-2' : ''
          }`}
          title={isCollapsed ? t('nav.council') : undefined}
        >
          <ShieldCheck className="w-3.5 h-3.5 text-nature-amber-600 dark:text-nature-amber-400 shrink-0" />
          {!isCollapsed && <span>{t('nav.council')}</span>}
        </button>

        <button
          onClick={() => onOpenCouncilEvidence && onOpenCouncilEvidence()}
          className={`btn-tactile w-full p-2 rounded-xl border border-nature-amber-300/80 dark:border-nature-amber-800/60 bg-nature-amber-50/70 dark:bg-nature-amber-950/20 hover:bg-nature-amber-100 dark:hover:bg-nature-amber-900/40 text-nature-amber-900 dark:text-nature-amber-300 font-mono text-xs flex items-center gap-2 transition-all font-bold ${
            isCollapsed ? 'justify-center px-2' : ''
          }`}
          title={isCollapsed ? '24 席 Best Practice 實證庫' : undefined}
        >
          <BookOpen className="w-3.5 h-3.5 text-nature-amber-600 dark:text-nature-amber-400 shrink-0" />
          {!isCollapsed && <span>24 席 Best Practice 實證庫</span>}
        </button>

        <button
          onClick={() => nav.openSynergy()}
          className={`btn-tactile w-full p-2 rounded-xl border border-salud-cyan/60 bg-salud-cyan/10 hover:bg-salud-cyan/20 text-salud-cyan-800 dark:text-salud-cyan-300 font-mono text-xs flex items-center gap-2 transition-all font-bold ${
            isCollapsed ? 'justify-center px-2' : ''
          }`}
          title={isCollapsed ? '全人跨領域處方協同' : undefined}
        >
          <Sparkles className="w-3.5 h-3.5 text-salud-cyan shrink-0 animate-pulse" />
          {!isCollapsed && <span>全人跨領域處方協同</span>}
        </button>
      </div>

      {/* Sidebar Font Scaling widget */}
      {!isCollapsed && (
        <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-1.5">
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block px-1 font-bold">
            閱讀字級大小 (Font Size)
          </span>
          <FontSizeToggle variant="full" />
        </div>
      )}
    </aside>
  );
};
