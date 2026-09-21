import React, { useState, lazy, Suspense } from 'react';
import { useLanguage } from '../../i18n';
import { useNavigation } from '../../context/NavigationContext';
import { ExpertZoneSection } from '../council/ExpertZoneSection';
import { GrandCouncilManifestoModal } from '../council/GrandCouncilManifestoModal';
import {
  ShieldCheck,
  Award,
  GitBranch,
  BookOpen,
  ChevronDown,
  ChevronRight,
  AlertTriangle,
  ArrowLeft,
} from 'lucide-react';

const ExpertIterationLog = lazy(() =>
  import('../ultrahealth/ExpertIterationLog').then((m) => ({ default: m.ExpertIterationLog }))
);
const ObesityIterationLog = lazy(() =>
  import('../pillars/obesity/ObesityIterationLog').then((m) => ({ default: m.ObesityIterationLog }))
);
const LongevityIterationLog = lazy(() =>
  import('../pillars/longevity/LongevityIterationLog').then((m) => ({
    default: m.LongevityIterationLog,
  }))
);

type IterationTrack = 'ultrahealth' | 'obesity' | 'longevity';

const TRACKS: { id: IterationTrack; label_zh: string; label_en: string }[] = [
  { id: 'ultrahealth', label_zh: '健康生活', label_en: 'Healthy Living' },
  { id: 'obesity', label_zh: '增肌減脂', label_en: 'Muscle & Fat Loss' },
  { id: 'longevity', label_zh: '抗老延壽', label_en: 'Longevity' },
];

/**
 * AboutGovernancePage — the single home for everything that describes how Salud is built
 * rather than what the reader should do about their health.
 *
 * Up to v1.3 the 40-seat expert roster was appended to the bottom of every content page and
 * the RPDCA iteration logs were mixed into the health hubs. Both are editorial provenance,
 * not health guidance, so v2.0 collects them here behind a single footer link.
 */
export const AboutGovernancePage: React.FC = () => {
  const { language } = useLanguage();
  const { openCouncilEvidence, selectPillar } = useNavigation();
  const zh = language === 'zh-TW';

  const [isManifestoOpen, setIsManifestoOpen] = useState(false);
  const [isIterationOpen, setIsIterationOpen] = useState(false);
  const [track, setTrack] = useState<IterationTrack>('ultrahealth');

  return (
    <div className="space-y-10 animate-fade-in pb-16 font-sans">
      <button
        onClick={() => selectPillar('systems')}
        className="btn-tactile inline-flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-300"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>{zh ? '回到健康內容' : 'Back to health content'}</span>
      </button>

      {/* ── Editorial policy ── */}
      <header className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/50 space-y-4">
        <span className="inline-flex items-center gap-2 text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
          <ShieldCheck className="w-3.5 h-3.5" />
          {zh ? '關於 Salud · 編輯與審核政策' : 'About Salud · Editorial policy'}
        </span>
        <h1 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight text-slate-900 dark:text-white">
          {zh ? '這些內容是怎麼來的' : 'How this content is made'}
        </h1>
        <div className="space-y-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300 max-w-3xl">
          <p>
            {zh
              ? 'Salud 的每一條健康建議都對應到可查證的原始文獻，並標註證據等級。我們採用 Oxford CEBM 證據層級與 GRADE 建議強度：A 級代表系統性回顧或大型隨機對照試驗，D/E 級代表機轉推論或專家意見，後者在頁面上會明確標示為「尚待驗證」。'
              : 'Every recommendation on Salud maps to a citable primary source and carries an explicit evidence grade. We use the Oxford CEBM levels alongside GRADE strength-of-recommendation: grade A means systematic reviews or large RCTs, while D/E means mechanistic reasoning or expert opinion — and those are labelled as unproven on the page itself.'}
          </p>
          <p>
            {zh
              ? '內容由 40 席跨專科審核團隊分科簽核。審核名錄與歷次修訂紀錄保存在本頁下方，作為可追溯的編輯履歷，而不會出現在一般閱讀動線中。'
              : 'Content is signed off by a 40-seat multi-specialty review panel. The roster and the full revision history are kept below as an auditable editorial trail, deliberately out of the normal reading path.'}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          <button
            onClick={() => setIsManifestoOpen(true)}
            className="btn-tactile px-4 py-2 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/60 text-slate-700 dark:text-slate-200 font-mono text-xs font-bold flex items-center gap-1.5"
          >
            <Award className="w-4 h-4" />
            {zh ? '審核團隊憲章' : 'Review panel charter'}
          </button>
          <button
            onClick={() => openCouncilEvidence()}
            className="btn-tactile px-4 py-2 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/60 text-slate-700 dark:text-slate-200 font-mono text-xs font-bold flex items-center gap-1.5"
          >
            <BookOpen className="w-4 h-4" />
            {zh ? '分科 Best Practice 實證庫' : 'Best-practice evidence library'}
          </button>
        </div>
      </header>

      {/* ── Medical disclaimer ── */}
      <div className="p-5 rounded-2xl border border-amber-300/70 dark:border-amber-900/60 bg-amber-50/70 dark:bg-amber-950/20 flex gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <p className="text-xs sm:text-sm leading-relaxed text-amber-900 dark:text-amber-200">
          {zh
            ? 'Salud 提供的是健康衛教資訊，不是醫療診斷或個人化處方。任何用藥、停藥、檢驗與治療決定，請與你的主治醫師討論。若出現本站標示的紅旗警訊，請立即就醫。'
            : 'Salud provides health education, not diagnosis or personalised prescription. Discuss any decision about medication, testing or treatment with your own clinician, and seek care immediately for any of the red-flag symptoms flagged on this site.'}
        </p>
      </div>

      {/* ── Expert roster (moved off every content page into here) ── */}
      <ExpertZoneSection onOpenBestPractice={openCouncilEvidence} embedded />

      {/* ── Revision history, collapsed by default ── */}
      <section className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/40 overflow-hidden">
        <button
          onClick={() => setIsIterationOpen((v) => !v)}
          className="w-full p-5 flex items-center justify-between gap-3 text-left"
        >
          <span className="flex items-center gap-2.5">
            <GitBranch className="w-4 h-4 text-slate-500" />
            <span className="font-display font-bold text-slate-800 dark:text-slate-100">
              {zh ? '內容修訂紀錄 (RPDCA 7×7 審議)' : 'Revision history (RPDCA 7×7 review)'}
            </span>
          </span>
          <span className="flex items-center gap-2 text-[11px] font-mono text-slate-500">
            {zh ? '選讀' : 'Optional'}
            {isIterationOpen ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </span>
        </button>

        {isIterationOpen && (
          <div className="px-5 pb-6 space-y-5 border-t border-slate-200 dark:border-slate-800 pt-5">
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
              {zh
                ? '每個主題在上線前經過 7 輪審議：提出 (Review) → 計畫 (Plan) → 執行 (Do) → 查核 (Check) → 修正 (Act)。以下保留各輪的爭議點與最終決議，供想追溯來由的讀者查閱。'
                : 'Each topic goes through seven review rounds before publication. The disagreements and final resolutions of every round are preserved below for readers who want to trace how a recommendation was reached.'}
            </p>
            <div className="flex flex-wrap gap-2">
              {TRACKS.map((tr) => (
                <button
                  key={tr.id}
                  onClick={() => setTrack(tr.id)}
                  className={`btn-tactile px-3.5 py-1.5 rounded-xl text-xs font-mono border transition-all ${
                    track === tr.id
                      ? 'bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 border-transparent font-bold'
                      : 'bg-white dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {zh ? tr.label_zh : tr.label_en}
                </button>
              ))}
            </div>
            <Suspense
              fallback={
                <div className="py-10 text-center font-mono text-xs text-slate-500">
                  {zh ? '載入修訂紀錄…' : 'Loading revision history…'}
                </div>
              }
            >
              {track === 'ultrahealth' && <ExpertIterationLog />}
              {track === 'obesity' && <ObesityIterationLog />}
              {track === 'longevity' && <LongevityIterationLog />}
            </Suspense>
          </div>
        )}
      </section>

      <GrandCouncilManifestoModal
        isOpen={isManifestoOpen}
        onClose={() => setIsManifestoOpen(false)}
      />
    </div>
  );
};
