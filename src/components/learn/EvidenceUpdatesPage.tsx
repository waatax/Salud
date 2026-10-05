import React, { useEffect, useMemo, useState } from 'react';
import {
  ExternalLink,
  ArrowRight,
  AlertTriangle,
  Heart,
  Flame,
  Utensils,
  Activity,
  CalendarCheck,
  Moon,
  Brain,
  Sparkles,
  AlertOctagon,
  Droplets,
  Wind,
  GraduationCap,
  Layers,
  Table as TableIcon,
  Milestone,
} from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { EVIDENCE_UPDATES, UPDATE_CATEGORY_META } from '../../data/learning/evidenceUpdates';
import { UpdateCategory } from '../../types/learning';
import { hashSegment } from '../../config/routes';
import { PageHeader, formatYM } from './learnUi';
import { QuickTips } from './QuickTips';

const CATEGORY_ICONS: Record<UpdateCategory, React.ComponentType<{ className?: string }>> = {
  heart: Heart,
  metabolic: Flame,
  diet: Utensils,
  exercise: Activity,
  screening: CalendarCheck,
  sleep: Moon,
  mind: Brain,
  women: Sparkles,
  emergency: AlertOctagon,
  kidney: Droplets,
  lung: Wind,
  brain: GraduationCap,
};

export const EvidenceUpdatesPage: React.FC = () => {
  const { go } = useNavigation();
  const [cat, setCat] = useState<UpdateCategory | 'all'>('all');
  const [focusId, setFocusId] = useState<string | undefined>(() => hashSegment('updates'));

  useEffect(() => {
    const onHash = () => setFocusId(hashSegment('updates'));
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // Deep link: scroll the requested update into view once it has rendered.
  useEffect(() => {
    if (!focusId) return;
    setCat('all');
    const t = window.setTimeout(() => {
      document.getElementById(focusId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
    return () => window.clearTimeout(t);
  }, [focusId]);

  const sorted = useMemo(() => [...EVIDENCE_UPDATES].sort((a, b) => b.date.localeCompare(a.date)), []);
  const cats = useMemo(
    () => Array.from(new Set(sorted.map((u) => u.category))) as UpdateCategory[],
    [sorted]
  );
  const list = cat === 'all' ? sorted : sorted.filter((u) => u.category === cat);

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        eyebrow="最新實證"
        title="2024–2026 年，健康建議改變了什麼？"
        lead="我們追蹤國際醫學會指引、世界衛生組織、衛福部與頂尖期刊的大型試驗，把每一項改變翻譯成「對你的意義」，並註明它的限制。"
      />

      <QuickTips sectionKey="updates" />

      {/* 2024-2026 國際指引重大典範轉移總表 */}
      <EvidenceEvolutionTable />

      {/* 實證演進關鍵時間軸 */}
      <UpdatesTimelineMilestones />

      <div className="flex flex-wrap gap-2" role="toolbar" aria-label="依主題篩選">
        {(['all', ...cats] as const).map((c) => {
          const active = cat === c;
          const count = c === 'all' ? sorted.length : sorted.filter((u) => u.category === c).length;
          const Icon = c === 'all' ? Layers : CATEGORY_ICONS[c] ?? Layers;
          return (
            <button
              key={c}
              onClick={() => setCat(c)}
              aria-pressed={active}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors ${
                active
                  ? 'bg-emerald-700 border-emerald-700 text-white dark:bg-emerald-500 dark:border-emerald-500 dark:text-emerald-950 font-semibold'
                  : 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-emerald-500'
              }`}
            >
              <Icon className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{c === 'all' ? '全部' : UPDATE_CATEGORY_META[c].label_zh}</span>
              <span className="opacity-70 tabular-nums text-xs">({count})</span>
            </button>
          );
        })}
      </div>

      <ol className="space-y-4">
        {list.map((u) => (
          <li
            key={u.id}
            id={u.id}
            className={`scroll-mt-24 rounded-2xl border bg-white dark:bg-slate-900/60 p-5 sm:p-6 space-y-4 shadow-xs ${
              focusId === u.id ? 'border-emerald-500 ring-2 ring-emerald-500/30' : 'border-slate-200 dark:border-slate-800'
            }`}
          >
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 py-1 font-semibold text-slate-700 dark:text-slate-300">
                {UPDATE_CATEGORY_META[u.category].label_zh}
              </span>
              <span className="text-slate-500 dark:text-slate-400">{formatYM(u.date)}</span>
              <span className="text-slate-500 dark:text-slate-400" aria-hidden="true">·</span>
              <span className="text-slate-600 dark:text-slate-400 font-medium">{u.org}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold leading-8 text-slate-900 dark:text-white">{u.title_zh}</h2>

            {u.numbers && u.numbers.length > 0 && (
              <dl className="flex flex-wrap gap-2">
                {u.numbers.map((n) => (
                  <div key={n.label_zh} className="rounded-xl border border-slate-200 dark:border-slate-800 px-3 py-1.5 bg-slate-50/50 dark:bg-slate-800/40">
                    <dt className="text-[11px] text-slate-500 dark:text-slate-400">{n.label_zh}</dt>
                    <dd className="text-base font-bold text-slate-900 dark:text-white tabular-nums">{n.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">改變了什麼</h3>
                <p className="text-[15px] leading-7 text-slate-700 dark:text-slate-300">{u.what_changed_zh}</p>
              </div>
              <div className="rounded-xl bg-emerald-50/70 dark:bg-emerald-950/25 p-3.5 border border-emerald-100 dark:border-emerald-900/40">
                <h3 className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 mb-1">對你的意義</h3>
                <p className="text-[15px] leading-7 text-emerald-950 dark:text-emerald-100">{u.what_it_means_zh}</p>
              </div>
            </div>

            {u.caveat_zh && (
              <p className="flex gap-2 text-xs leading-5 text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-3">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" aria-hidden="true" />
                <span><strong>限制與適用邊界：</strong>{u.caveat_zh}</span>
              </p>
            )}

            <footer className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-500 dark:text-slate-400">
              <a
                href={u.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400"
              >
                查看原始指引 / 試驗 ({u.org})
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
              {u.related_hash && (
                <button
                  onClick={() => go(u.related_hash!)}
                  className="ml-auto inline-flex items-center gap-1 font-semibold text-emerald-700 dark:text-emerald-400 hover:underline"
                >
                  相關主題
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              )}
            </footer>
          </li>
        ))}
      </ol>
    </div>
  );
};

/** 2024–2026 國際指引重大典範轉移對照表 */
const EvidenceEvolutionTable: React.FC = () => {
  const shifts = [
    {
      domain: '心血管血脂管理',
      oldDogma: '只看 LDL-C 膽固醇濃度，忽視顆粒密度',
      newEvidence: '2026 ACC/AHA 強推 ApoB 顆粒計數致病論；Lp(a) 一生必檢一次',
      impact: '三酸甘油酯高或糖尿病者，看 ApoB 比單看 LDL 更能精準預防心梗',
    },
    {
      domain: '酒精與健康風險',
      oldDogma: '適量紅酒護心，每日 1–2 杯有益長壽',
      newEvidence: '2025 WHO 與美衛生總署確認「無安全飲酒量」，任何量皆增加癌症風險',
      impact: '戒除每天小酌習慣；將酒精視為偶爾社交嗜好而非「保健品」',
    },
    {
      domain: '每日步數效益',
      oldDogma: '嚴格執著「日行一萬步」才算及格',
      newEvidence: '2025 Lancet 統合分析：6,000–8,000 步即達死亡率下降高原甜蜜點',
      impact: '長輩與上班族不需過度追求極端步數，每天 7,000 步效益最大且防膝痛',
    },
    {
      domain: '超加工食品 (UPF)',
      oldDogma: '只計算總熱量、脂肪與碳水化合物克數',
      newEvidence: '2025 Lancet UPF 專題：工業乳化劑破壞腸黏膜，促發微血管發炎',
      impact: '少看熱量、多看成分表；廚房找不到的化學成分 >3 種即盡量避免',
    },
    {
      domain: '高血壓量測診斷',
      oldDogma: '以醫院門診單次單臂量測為主要依據',
      newEvidence: '2025 AHA/ACC 指引要求「722 居家連續記錄」排除 20% 白袍高血壓',
      impact: '新確診或調藥時連續記錄早晚 7 天，不再被門診緊張數字嚇到',
    },
  ];

  return (
    <section aria-labelledby="shift-table-h" className="space-y-3">
      <div className="flex items-center gap-2">
        <TableIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
        <h2 id="shift-table-h" className="text-base font-bold text-slate-900 dark:text-white">
          2024–2026 醫學實證思維典範轉移對照表
        </h2>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs bg-white dark:bg-slate-900/60">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300">
              <th scope="col" className="py-3 px-3.5 font-bold w-1/5 min-w-[130px]">醫學主題</th>
              <th scope="col" className="py-3 px-3.5 font-bold w-1/4 min-w-[170px]">過去傳統觀念</th>
              <th scope="col" className="py-3 px-3.5 font-bold w-1/3 min-w-[200px]">2024–2026 最新臨床實證突破</th>
              <th scope="col" className="py-3 px-3.5 font-bold min-w-[180px]">對日常生活的實質轉化</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
            {shifts.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                <td className="py-3 px-3.5 font-bold text-slate-900 dark:text-white align-top">{row.domain}</td>
                <td className="py-3 px-3.5 text-rose-800 dark:text-rose-300 align-top leading-relaxed">{row.oldDogma}</td>
                <td className="py-3 px-3.5 text-emerald-800 dark:text-emerald-300 align-top leading-relaxed font-medium">{row.newEvidence}</td>
                <td className="py-3 px-3.5 text-slate-700 dark:text-slate-300 align-top leading-relaxed">{row.impact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

/** 實證重大突破時間軸里程碑 */
const UpdatesTimelineMilestones: React.FC = () => {
  const milestones = [
    { year: '2024', title: 'KDIGO 腎病指引 & Lancet 失智委員會', desc: '確立 eGFR/UACR 雙坐標分類；失智症 14 大可改變因子佔比擴充至 45%。' },
    { year: '2025', title: 'AHA/ACC 高血壓指引 & Lancet UPF 系列', desc: '全面確立 722 居家量測；揭露超加工食品乳化劑損害腸道屏障與全因死亡率關聯。' },
    { year: '2026', title: 'ACC/AHA 血脂異常指引 & 台灣擴大篩檢', desc: 'ApoB 與 Lp(a) 正式納入第一線風險評估；台灣公費健檢下修至 30 歲並新增胃癌幽門桿菌篩檢。' },
  ];

  return (
    <figure className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 space-y-4 shadow-xs" aria-label="實證指引里程碑時間軸">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Milestone className="w-5 h-5 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
          <figcaption className="font-bold text-slate-900 dark:text-white text-base">
            時間軸導覽：2024–2026 國際醫學臨床實證重大突破
          </figcaption>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 font-medium">
          持續滾動追蹤
        </span>
      </div>

      <div className="grid sm:grid-cols-3 gap-3 text-xs">
        {milestones.map((m) => (
          <div key={m.year} className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 space-y-1.5">
            <span className="inline-block px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-300 font-bold text-xs">
              {m.year} 年
            </span>
            <div className="font-bold text-slate-900 dark:text-white text-sm">{m.title}</div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{m.desc}</p>
          </div>
        ))}
      </div>
    </figure>
  );
};
