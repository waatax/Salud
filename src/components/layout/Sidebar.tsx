import React, { useState } from 'react';
import { Chapter, KnowledgePage, HealthPillar } from '../../types';
import { useLanguage } from '../../i18n';
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
  Sparkles
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
    <aside className="w-64 shrink-0 border-r border-salud-light-border/80 dark:border-salud-dark-border/80 bg-white/70 dark:bg-salud-dark-surface/50 p-4 space-y-5 overflow-y-auto text-xs font-sans transition-colors">
      {/* Platform Vision One-liner */}
      <div className="p-3.5 rounded-2xl bg-nature-amber-50/60 dark:bg-nature-amber-950/20 border border-nature-amber-200/80 dark:border-nature-amber-800/40 space-y-1">
        <span className="font-mono text-[10px] text-nature-amber-700 dark:text-nature-amber-400 font-bold block uppercase tracking-wider">
          {t('app.vision_title')}
        </span>
        <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
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
            className={`btn-tactile w-full p-2.5 rounded-xl border text-left transition-all flex items-center justify-between ${
              activePillar === 'diet'
                ? 'border-nature-amber-300 dark:border-nature-amber-700 bg-nature-amber-50 dark:bg-nature-amber-950/40 text-nature-amber-900 dark:text-nature-amber-200 font-bold shadow-sm'
                : 'border-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
            }`}
          >
            <div className="flex items-center gap-2">
              <Utensils className={`w-4 h-4 ${activePillar === 'diet' ? 'text-nature-amber-600 dark:text-nature-amber-400' : 'text-slate-400'}`} />
              <span className="text-xs">{t('pillar.diet')}</span>
            </div>
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
          </button>

          {/* Sub-tree of Diet: Chapters O, W, A */}
          {expandedDietSub && (
            <div className="pl-4 space-y-1 border-l-2 border-slate-200 dark:border-slate-800 ml-3.5 py-1">
              {[
                { id: 'W', name: language === 'zh-TW' ? 'Chapter W · 水與體液' : 'Chapter W · Hydration', icon: Droplets, color: 'text-nature-sky-600 dark:text-nature-sky-400' },
                { id: 'O', name: language === 'zh-TW' ? 'Chapter O · 脂肪與油' : 'Chapter O · Fats & Oils', icon: Flame, color: 'text-nature-amber-600 dark:text-nature-amber-400' },
                { id: 'A', name: language === 'zh-TW' ? 'Chapter A · 酒精專章' : 'Chapter A · Alcohol', icon: Wine, color: 'text-purple-600 dark:text-purple-400' },
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
                    className={`btn-tactile w-full p-2 rounded-lg text-left font-mono text-[11px] transition-all flex items-center gap-2 ${
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
            }`}
          >
            <div className="flex items-center gap-2">
              <Activity className={`w-4 h-4 ${activePillar === 'exercise' ? 'text-nature-sky-600 dark:text-nature-sky-400' : 'text-slate-400'}`} />
              <span className="text-xs">{t('pillar.exercise')}</span>
            </div>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-nature-sky-100 dark:bg-nature-sky-900/60 text-nature-sky-800 dark:text-nature-sky-300 border border-nature-sky-200 dark:border-nature-sky-800/50">
              運動科學
            </span>
          </button>

          {/* Sub-tree of Exercise & Sports Science */}
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
        </div>

        {/* 3. Sleep & Recovery Pillar */}
        <button
          onClick={() => onSelectPillar('sleep')}
          className={`btn-tactile w-full p-2.5 rounded-xl border text-left transition-all flex items-center justify-between ${
            activePillar === 'sleep'
              ? 'border-purple-300 dark:border-purple-700 bg-purple-50 dark:bg-purple-950/40 text-purple-900 dark:text-purple-200 font-bold shadow-sm'
              : 'border-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
          }`}
        >
          <div className="flex items-center gap-2">
            <Moon className={`w-4 h-4 ${activePillar === 'sleep' ? 'text-purple-600 dark:text-purple-400' : 'text-slate-400'}`} />
            <span className="text-xs">{t('pillar.sleep')}</span>
          </div>
          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-purple-100 dark:bg-purple-900/60 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800/50">
            Glymphatic
          </span>
        </button>

        {/* 4. Deep Supplements Pillar */}
        <button
          onClick={() => onSelectPillar('supplements')}
          className={`btn-tactile w-full p-2.5 rounded-xl border text-left transition-all flex items-center justify-between ${
            activePillar === 'supplements'
              ? 'border-nature-green-300 dark:border-nature-green-700 bg-nature-green-50 dark:bg-nature-green-950/40 text-nature-green-900 dark:text-nature-green-200 font-bold shadow-sm'
              : 'border-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
          }`}
        >
          <div className="flex items-center gap-2">
            <Pill className={`w-4 h-4 ${activePillar === 'supplements' ? 'text-nature-green-600 dark:text-nature-green-400' : 'text-slate-400'}`} />
            <span className="text-xs">{t('pillar.supplements')}</span>
          </div>
          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-nature-green-100 dark:bg-nature-green-900/60 text-nature-green-800 dark:text-nature-green-300 border border-nature-green-200 dark:border-nature-green-800/50">
            GRADE A-E
          </span>
        </button>
      </div>

      {/* Pages within current chapter */}
      {activePillar === 'diet' && pagesForCurrent.length > 0 && (
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
        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block px-1 font-bold">
          臨床治理與篩檢工具
        </span>

        {onOpenAuditC && (
          <button
            onClick={onOpenAuditC}
            className="btn-tactile w-full p-2 rounded-xl border border-purple-200 dark:border-purple-800/60 bg-purple-50/80 dark:bg-purple-950/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 text-purple-800 dark:text-purple-300 font-mono text-xs flex items-center gap-2 transition-all"
          >
            <ClipboardCheck className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span>{t('nav.audit_c')}</span>
          </button>
        )}

        {onOpenCardioHub && (
          <button
            onClick={onOpenCardioHub}
            className="btn-tactile w-full p-2 rounded-xl border border-nature-sky-200 dark:border-nature-sky-800/60 bg-nature-sky-50/80 dark:bg-nature-sky-950/20 hover:bg-nature-sky-100 dark:hover:bg-nature-sky-900/30 text-nature-sky-800 dark:text-nature-sky-300 font-mono text-xs flex items-center gap-2 transition-all"
          >
            <HeartPulse className="w-3.5 h-3.5 text-nature-sky-600 dark:text-nature-sky-400" />
            <span>{t('nav.cardio_hub')}</span>
          </button>
        )}

        {onOpenCouncil && (
          <button
            onClick={onOpenCouncil}
            className="btn-tactile w-full p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-xs flex items-center gap-2 transition-all"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-nature-amber-600 dark:text-nature-amber-400" />
            <span>{t('nav.council')}</span>
          </button>
        )}
      </div>

      {/* Sidebar Font Scaling widget */}
      <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-1.5">
        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block px-1 font-bold">
          閱讀字級大小 (Font Size)
        </span>
        <FontSizeToggle variant="full" />
      </div>
    </aside>
  );
};
