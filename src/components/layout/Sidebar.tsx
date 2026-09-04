import React, { useState } from 'react';
import { CHAPTERS } from '../../data/chapters';
import { Chapter, KnowledgePage, HealthPillar } from '../../types';
import { useLanguage } from '../../i18n';
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
  BookOpen,
  Sparkles,
  ShieldCheck,
  HeartPulse,
  ClipboardCheck,
  Compass
} from 'lucide-react';

interface Props {
  activePillar: HealthPillar;
  onSelectPillar: (pillar: HealthPillar) => void;
  currentChapterId: string;
  activePageId: string;
  onSelectChapter: (chapterId: string) => void;
  onSelectPage: (pageId: string) => void;
  chapterWPages: KnowledgePage[];
  chapterOPages: KnowledgePage[];
  chapterAPages: KnowledgePage[];
  onOpenAuditC?: () => void;
  onOpenCardioHub?: () => void;
  onOpenSupplements?: () => void;
  onOpenCouncil?: () => void;
}

export const Sidebar: React.FC<Props> = ({
  activePillar,
  onSelectPillar,
  currentChapterId,
  activePageId,
  onSelectChapter,
  onSelectPage,
  chapterWPages,
  chapterOPages,
  chapterAPages,
  onOpenAuditC,
  onOpenCardioHub,
  onOpenCouncil,
}) => {
  const { t, language } = useLanguage();
  const [expandedDietSub, setExpandedDietSub] = useState(true);

  const pagesForCurrent =
    currentChapterId === 'W'
      ? chapterWPages
      : currentChapterId === 'O'
      ? chapterOPages
      : currentChapterId === 'A'
      ? chapterAPages
      : [];

  return (
    <aside className="w-64 shrink-0 border-r border-salud-light-border/80 dark:border-salud-dark-border/80 bg-salud-light-surface/70 dark:bg-salud-dark-surface/50 p-4 space-y-5 overflow-y-auto text-xs font-sans transition-colors">
      {/* Platform Vision One-liner */}
      <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1">
        <span className="font-mono text-[10px] text-salud-amber-600 dark:text-salud-amber-400 font-bold block uppercase tracking-wider">
          {t('app.vision_title')}
        </span>
        <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
          {t('app.vision_desc')}
        </p>
      </div>

      {/* ── 4 Pillars Tree Selection ── */}
      <div className="space-y-1.5">
        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider px-1 block font-bold">
          四大健康支柱 (4 Pillars)
        </span>

        {/* 1. Diet & Nutrition Pillar */}
        <div className="space-y-1">
          <button
            onClick={() => onSelectPillar('diet')}
            className={`w-full p-2.5 rounded-xl border text-left transition-all flex items-center justify-between ${
              activePillar === 'diet'
                ? 'border-salud-amber/70 bg-salud-amber-500/15 text-slate-900 dark:text-white font-bold shadow-warm-glow'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800/60'
            }`}
          >
            <div className="flex items-center gap-2">
              <Utensils className={`w-4 h-4 ${activePillar === 'diet' ? 'text-salud-amber' : 'text-slate-400'}`} />
              <span className="text-xs">{t('pillar.diet')}</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setExpandedDietSub(!expandedDietSub);
              }}
              className="p-0.5 hover:text-white"
            >
              {expandedDietSub ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </button>
          </button>

          {/* Sub-tree of Diet: Chapters O, W, A */}
          {expandedDietSub && (
            <div className="pl-4 space-y-1 border-l-2 border-slate-700/50 ml-3.5 py-1">
              {[
                { id: 'W', name: language === 'zh-TW' ? 'Chapter W · 水與體液' : 'Chapter W · Hydration', icon: Droplets, color: 'text-cyan-400' },
                { id: 'O', name: language === 'zh-TW' ? 'Chapter O · 脂肪與油' : 'Chapter O · Fats & Oils', icon: Flame, color: 'text-amber-400' },
                { id: 'A', name: language === 'zh-TW' ? 'Chapter A · 酒精專章' : 'Chapter A · Alcohol', icon: Wine, color: 'text-purple-400' },
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
                    className={`w-full p-2 rounded-lg text-left font-mono text-[11px] transition-all flex items-center gap-2 ${
                      isSelected
                        ? 'bg-slate-200 dark:bg-slate-800 text-salud-amber-600 dark:text-salud-amber font-bold shadow-sm'
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
            className={`w-full p-2.5 rounded-xl border text-left transition-all flex items-center justify-between ${
              activePillar === 'exercise'
                ? 'border-salud-cyan/70 bg-cyan-950/40 text-cyan-200 font-bold shadow-cyan-glow'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800/60'
            }`}
          >
            <div className="flex items-center gap-2">
              <Activity className={`w-4 h-4 ${activePillar === 'exercise' ? 'text-salud-cyan' : 'text-slate-400'}`} />
              <span className="text-xs">{t('pillar.exercise')}</span>
            </div>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-900/60 text-cyan-300">
              運動科學
            </span>
          </button>

          {/* Sub-tree of Exercise & Sports Science */}
          <div className="pl-4 space-y-1 border-l-2 border-slate-700/50 ml-3.5 py-1">
            {[
              { id: 'exercise', name: language === 'zh-TW' ? '運動生理與心率' : 'Exercise Physiology', hash: 'exercise', color: 'text-cyan-400' },
              { id: 'exercise/running', name: language === 'zh-TW' ? '跑步運動科學' : 'Running Science', hash: 'exercise/running', color: 'text-amber-400' },
              { id: 'exercise/cycling', name: language === 'zh-TW' ? '自行車功率科學' : 'Cycling Science', hash: 'exercise/cycling', color: 'text-blue-400' },
              { id: 'exercise/mountaineering', name: language === 'zh-TW' ? '登山高海拔科學' : 'Mountaineering Science', hash: 'exercise/mountaineering', color: 'text-purple-400' },
              { id: 'exercise/strength', name: language === 'zh-TW' ? '肌肉重力訓練' : 'Strength Training', hash: 'exercise/strength', color: 'text-emerald-400' },
              { id: 'exercise/mobility', name: language === 'zh-TW' ? '伸展柔軟度筋骨' : 'Mobility & Fascia', hash: 'exercise/mobility', color: 'text-teal-400' },
            ].map((sub) => {
              return (
                <button
                  key={sub.id}
                  onClick={() => {
                    onSelectPillar('exercise');
                    window.location.hash = sub.hash;
                  }}
                  className="w-full p-1.5 rounded-lg text-left font-mono text-[11px] transition-all flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                >
                  <span className={`text-[10px] font-bold ${sub.color}`}>•</span>
                  <span className="truncate">{sub.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Sleep & Recovery Pillar */}
        <button
          onClick={() => onSelectPillar('sleep')}
          className={`w-full p-2.5 rounded-xl border text-left transition-all flex items-center justify-between ${
            activePillar === 'sleep'
              ? 'border-purple-500/70 bg-purple-950/40 text-purple-200 font-bold shadow-md'
              : 'border-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800/60'
          }`}
        >
          <div className="flex items-center gap-2">
            <Moon className={`w-4 h-4 ${activePillar === 'sleep' ? 'text-purple-400' : 'text-slate-400'}`} />
            <span className="text-xs">{t('pillar.sleep')}</span>
          </div>
          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-purple-900/60 text-purple-300">
            Glymphatic
          </span>
        </button>

        {/* 4. Deep Supplements Pillar */}
        <button
          onClick={() => onSelectPillar('supplements')}
          className={`w-full p-2.5 rounded-xl border text-left transition-all flex items-center justify-between ${
            activePillar === 'supplements'
              ? 'border-emerald-500/70 bg-emerald-950/40 text-emerald-200 font-bold shadow-md'
              : 'border-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800/60'
          }`}
        >
          <div className="flex items-center gap-2">
            <Pill className={`w-4 h-4 ${activePillar === 'supplements' ? 'text-emerald-400' : 'text-slate-400'}`} />
            <span className="text-xs">{t('pillar.supplements')}</span>
          </div>
          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-900/60 text-emerald-300">
            GRADE A-E
          </span>
        </button>
      </div>

      {/* Pages within current chapter (if reading specific chapter in Diet) */}
      {activePillar === 'diet' && pagesForCurrent.length > 0 && (
        <div className="space-y-2 pt-2 border-t border-salud-light-border/60 dark:border-salud-dark-border/60">
          <div className="flex items-center justify-between px-1 text-xs font-mono font-bold text-slate-600 dark:text-slate-400">
            <span>Chapter {currentChapterId} 知識頁清單</span>
            <span className="text-[10px] text-salud-cyan">{pagesForCurrent.length} 篇</span>
          </div>

          <div className="space-y-1 max-h-[30vh] overflow-y-auto pr-1">
            {pagesForCurrent.map((p) => {
              const isPageActive = p.id === activePageId;
              return (
                <button
                  key={p.id}
                  onClick={() => onSelectPage(p.id)}
                  className={`w-full p-2 rounded-xl text-left font-mono text-[11px] transition-all flex items-center justify-between ${
                    isPageActive
                      ? 'bg-slate-200 dark:bg-slate-800/90 text-salud-amber-600 dark:text-salud-amber-400 font-bold border border-salud-amber/40 shadow-sm'
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
      <div className="space-y-1.5 pt-3 border-t border-salud-light-border/60 dark:border-salud-dark-border/60">
        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block px-1">
          臨床治理與篩檢工具
        </span>

        {onOpenAuditC && (
          <button
            onClick={onOpenAuditC}
            className="w-full p-2 rounded-xl border border-purple-500/30 bg-purple-950/20 hover:bg-purple-900/30 text-purple-300 font-mono text-xs flex items-center gap-2 transition-all"
          >
            <ClipboardCheck className="w-3.5 h-3.5 text-purple-400" />
            <span>{t('nav.audit_c')}</span>
          </button>
        )}

        {onOpenCardioHub && (
          <button
            onClick={onOpenCardioHub}
            className="w-full p-2 rounded-xl border border-cyan-500/30 bg-cyan-950/20 hover:bg-cyan-900/30 text-cyan-300 font-mono text-xs flex items-center gap-2 transition-all"
          >
            <HeartPulse className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t('nav.cardio_hub')}</span>
          </button>
        )}

        {onOpenCouncil && (
          <button
            onClick={onOpenCouncil}
            className="w-full p-2 rounded-xl border border-slate-700/60 bg-slate-800/40 hover:bg-slate-800 text-slate-300 font-mono text-xs flex items-center gap-2 transition-all"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-salud-amber-400" />
            <span>{t('nav.council')}</span>
          </button>
        )}
      </div>
    </aside>
  );
};
