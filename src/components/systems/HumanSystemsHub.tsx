import React, { useState, useEffect } from 'react';
import { HUMAN_SYSTEMS } from '../../data/humanSystemsData';
import { HumanSystemId } from '../../types';
import { SystemDeepDive } from '../../types/systemDeepDive';
import { useNavigation } from '../../context/NavigationContext';
import { LatestEvidenceStrip } from '../meta/LatestEvidenceStrip';
import { SystemDeepDiveView } from './SystemDeepDiveView';
import { QuickTips } from '../learn/QuickTips';
import { loadDeepDive } from '../../data/systems/load';
import { HubHero } from '../common/HubHero';
import { HUB_PRIMERS } from '../../data/hubPrimers';
import {
  Utensils,
  Wind,
  Brain,
  HeartPulse,
  Activity,
  ShieldCheck,
  Dumbbell,
  Droplets,
  Sparkles,
} from 'lucide-react';

interface Props {
  initialSystemId?: HumanSystemId;
}

/** Read the system id out of a `#systems/<id>[/<section>]` hash so deep links land on the right system. */
const systemIdFromHash = (fallback: HumanSystemId): HumanSystemId => {
  const [head, sub = ''] = window.location.hash.replace('#', '').split('/');
  if (head !== 'systems') return fallback;
  return HUMAN_SYSTEMS.some((s) => s.id === sub) ? (sub as HumanSystemId) : fallback;
};

const SYSTEM_ICON: Record<HumanSystemId, typeof Utensils> = {
  digestive: Utensils,
  respiratory: Wind,
  nervous: Brain,
  cardiovascular: HeartPulse,
  endocrine: Activity,
  immune: ShieldCheck,
  musculoskeletal: Dumbbell,
  renal: Droplets,
};

export const HumanSystemsHub: React.FC<Props> = ({ initialSystemId = 'digestive' }) => {
  const nav = useNavigation();
  const [selectedSystemId, setSelectedSystemId] = useState<HumanSystemId>(() =>
    systemIdFromHash(initialSystemId)
  );
  const [loaded, setLoaded] = useState<SystemDeepDive>();
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const onHash = () => setSelectedSystemId((prev) => systemIdFromHash(prev));
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // v6.13: each system's deep dive is fetched on demand instead of bundling all eight.
  useEffect(() => {
    let live = true;
    setFailed(false);
    loadDeepDive(selectedSystemId).then(
      (data) => live && setLoaded(data),
      () => live && setFailed(true)
    );
    return () => {
      live = false;
    };
  }, [selectedSystemId, attempt]);

  const currentSystem = HUMAN_SYSTEMS.find((s) => s.id === selectedSystemId) || HUMAN_SYSTEMS[0];
  const deepDive = loaded?.system_id === selectedSystemId ? loaded : undefined;

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <HubHero primer={HUB_PRIMERS.systems} />

      {/* ── Newest primary sources, ahead of the system picker ── */}
      <LatestEvidenceStrip />

      {/* ── 8 Systems Quick Switcher Grid ── */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-700 dark:text-slate-300 font-display">
            選擇你想認識的人體系統
          </h2>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            目前顯示：{currentSystem.name_zh}
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5" role="group" aria-label="八大人體系統切換">
          {HUMAN_SYSTEMS.map((sys) => {
            const Icon = SYSTEM_ICON[sys.id];
            const isSelected = sys.id === selectedSystemId;
            return (
              <button
                key={sys.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => {
                  setSelectedSystemId(sys.id);
                  window.location.hash = `systems/${sys.id}`;
                }}
                className={`btn-tactile p-3 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-2 ${
                  isSelected
                    ? 'border-emerald-600 dark:border-emerald-400 bg-emerald-50/90 dark:bg-emerald-950/40 text-slate-900 dark:text-white shadow-sm ring-1 ring-emerald-600/40'
                    : 'border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center transition-transform"
                    style={{
                      backgroundColor: isSelected ? sys.theme_color : undefined,
                      color: isSelected ? '#FFFFFF' : sys.theme_color,
                      border: `1px solid ${sys.theme_color}40`
                    }}
                  >
                    <Icon className="w-4 h-4" aria-hidden="true" />
                  </div>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400" aria-hidden="true" />
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-xs leading-snug line-clamp-1">
                    {sys.name_zh.replace('系統', '')}
                  </h4>
                  <span className="text-[0.6875rem] font-mono text-slate-500 dark:text-slate-400 block truncate">
                    {sys.name_en.split(' ')[0]}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── System Detail Stage ── */}
      {deepDive ? (
        <>
          <QuickTips key={selectedSystemId} sectionKey={`systems:${selectedSystemId}`} />
          <SystemDeepDiveView data={deepDive} systemMeta={currentSystem} />
        </>
      ) : failed ? (
        <div role="alert" className="rounded-2xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/60 dark:bg-amber-950/20 p-5 text-sm text-amber-950 dark:text-amber-100 space-y-3">
          <p>{currentSystem.name_zh}的內容沒有載入成功，可能是網路暫時中斷。</p>
          <button
            type="button"
            onClick={() => setAttempt((n) => n + 1)}
            className="min-h-11 rounded-xl bg-amber-700 px-4 font-semibold text-white hover:bg-amber-800"
          >
            重新載入
          </button>
        </div>
      ) : (
        <div className="py-16 text-center text-sm text-slate-500" role="status">
          <div className="w-8 h-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin mx-auto mb-2" aria-hidden="true" />
          載入{currentSystem.name_zh}內容…
        </div>
      )}

      {/* ── Action Footprint: Link into Diet, Exercise & Synergy ── */}
      <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-gradient-to-r from-slate-100 via-white to-salud-cyan/10 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1 max-w-xl">
          <span className="font-mono text-[0.75rem] uppercase tracking-wider text-salud-cyan font-bold block">
            Integrated Lifestyle Medicine
          </span>
          <h4 className="font-display font-bold text-sm sm:text-base text-slate-900 dark:text-white">
            透過四大健康支柱為這套系統提供生活型態處方？
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-sans">
            前往【飲食營養】深入探討各營養素與營養保健，或啟動【全人跨領域處方協同引擎】查看多靶點聯動。
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => nav.selectPillar('diet')}
            className="btn-tactile px-4 py-2.5 rounded-2xl bg-nature-amber-500 hover:bg-nature-amber-600 text-black font-bold font-mono text-xs shadow-sm flex items-center gap-1.5"
          >
            <Utensils className="w-3.5 h-3.5" aria-hidden="true" />
            <span>探索飲食營養</span>
          </button>
          <button
            onClick={() => nav.openSynergy()}
            className="btn-tactile px-4 py-2.5 rounded-2xl bg-salud-cyan hover:bg-salud-cyan/90 text-black font-bold font-mono text-xs shadow-sm flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            <span>跨領域處方協同</span>
          </button>
        </div>
      </div>
    </div>
  );
};
