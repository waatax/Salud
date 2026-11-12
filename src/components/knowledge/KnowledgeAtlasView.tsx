import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Circle,
  GraduationCap,
  HelpCircle,
  Lightbulb,
  Link2,
  Map as MapIcon,
  Search,
  ShieldAlert,
  Target,
  X,
} from 'lucide-react';
import { EvidenceBadge } from '../common/EvidenceBadge';
import {
  ATLAS_LEVELS,
  type AtlasFaq,
  type AtlasKnowledgePoint,
  type AtlasLevel,
  type KnowledgeAtlas as KnowledgeAtlasData,
} from '../../types/knowledgeAtlas';
import { atlasCoverage } from '../../data/atlas/coverage';

/**
 * KnowledgeAtlasView — 知識點全圖 (v6.10)
 *
 * One reusable view for every topic atlas:
 *  1. 能力階梯：L1 小白 → L5 大師，各級能做到什麼＋個人掌握進度
 *  2. 知識點地圖（SVG）：領域 × 等級矩陣，點選後顯示前置知識（箭頭）與後續延伸
 *  3. 知識點卡片：白話、深入、關鍵數字、行動、迷思、證據等級、站內連結
 *  4. 常見問題覆蓋檢核：每個常見問題都對應到能回答它的知識點
 */

const LEVEL_TONE: Record<AtlasLevel, { hex: string; chip: string; ring: string; soft: string }> = {
  1: { hex: '#0ea5e9', chip: 'bg-sky-100 text-sky-800 border-sky-300 dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-800', ring: 'ring-sky-400', soft: 'bg-sky-50/70 dark:bg-sky-950/20' },
  2: { hex: '#10b981', chip: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800', ring: 'ring-emerald-400', soft: 'bg-emerald-50/70 dark:bg-emerald-950/20' },
  3: { hex: '#f59e0b', chip: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800', ring: 'ring-amber-400', soft: 'bg-amber-50/70 dark:bg-amber-950/20' },
  4: { hex: '#8b5cf6', chip: 'bg-violet-100 text-violet-800 border-violet-300 dark:bg-violet-950/60 dark:text-violet-300 dark:border-violet-800', ring: 'ring-violet-400', soft: 'bg-violet-50/70 dark:bg-violet-950/20' },
  5: { hex: '#e11d48', chip: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800', ring: 'ring-rose-400', soft: 'bg-rose-50/70 dark:bg-rose-950/20' },
};

const levelName = (l: AtlasLevel) => ATLAS_LEVELS[l - 1].name;

// ── Mastery progress (localStorage) ─────────────────────────────────────────
function useMastered(key: string) {
  const storageKey = `salud.atlas.${key}.mastered`;
  const [mastered, setMastered] = useState<Set<string>>(() => {
    if (typeof window === 'undefined') return new Set();
    try {
      return new Set(JSON.parse(window.localStorage.getItem(storageKey) || '[]') as string[]);
    } catch {
      return new Set();
    }
  });
  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify([...mastered]));
    } catch {
      /* storage unavailable — progress just isn't persisted */
    }
  }, [mastered, storageKey]);
  const toggle = (id: string) =>
    setMastered((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  return { mastered, toggle, reset: () => setMastered(new Set()) };
}

// ── SVG map layout ──────────────────────────────────────────────────────────
const MAP = { labelW: 168, colW: 146, headH: 44, dotR: 11, perRow: 4, dotGap: 30, padY: 14 };

interface MapLayout {
  width: number;
  height: number;
  rows: { domainId: string; y: number; h: number }[];
  pos: Record<string, { x: number; y: number }>;
}

function layoutMap(atlas: KnowledgeAtlasData): MapLayout {
  const rows: MapLayout['rows'] = [];
  const pos: MapLayout['pos'] = {};
  let y = MAP.headH;
  for (const d of atlas.domains) {
    const cells = ATLAS_LEVELS.map((lv) => atlas.points.filter((p) => p.domain === d.id && p.level === lv.level));
    const maxLines = Math.max(1, ...cells.map((c) => Math.ceil(c.length / MAP.perRow)));
    const h = Math.max(58, maxLines * MAP.dotGap + MAP.padY * 2 - 6);
    cells.forEach((cell, ci) => {
      const lines = Math.max(1, Math.ceil(cell.length / MAP.perRow));
      const blockH = (lines - 1) * MAP.dotGap;
      cell.forEach((p, i) => {
        const line = Math.floor(i / MAP.perRow);
        const inLine = Math.min(MAP.perRow, cell.length - line * MAP.perRow);
        const col = i % MAP.perRow;
        const cx = MAP.labelW + ci * MAP.colW + MAP.colW / 2 + (col - (inLine - 1) / 2) * MAP.dotGap;
        const cy = y + h / 2 - blockH / 2 + line * MAP.dotGap;
        pos[p.id] = { x: cx, y: cy };
      });
    });
    rows.push({ domainId: d.id, y, h });
    y += h;
  }
  return { width: MAP.labelW + MAP.colW * 5 + 8, height: y + 8, rows, pos };
}

interface MapProps {
  atlas: KnowledgeAtlasData;
  selected: string | null;
  highlight: Set<string>;
  mastered: Set<string>;
  levelFilter: AtlasLevel | null;
  domainFilter: string | null;
  onSelect: (id: string) => void;
}

const AtlasMap: React.FC<MapProps> = ({ atlas, selected, highlight, mastered, levelFilter, domainFilter, onSelect }) => {
  const L = useMemo(() => layoutMap(atlas), [atlas]);
  const byId = useMemo(() => Object.fromEntries(atlas.points.map((p) => [p.id, p])), [atlas]);
  const sel = selected ? byId[selected] : null;
  const prereqs = sel?.prereq ?? [];
  const dependents = sel ? atlas.points.filter((p) => p.prereq?.includes(sel.id)).map((p) => p.id) : [];
  const indexInDomain = useMemo(() => {
    const m: Record<string, number> = {};
    for (const d of atlas.domains) atlas.points.filter((p) => p.domain === d.id).forEach((p, i) => (m[p.id] = i + 1));
    return m;
  }, [atlas]);

  const curve = (a: { x: number; y: number }, b: { x: number; y: number }) => {
    const mx = (a.x + b.x) / 2;
    return `M${a.x},${a.y} C${mx},${a.y} ${mx},${b.y} ${b.x},${b.y}`;
  };
  const anyHighlight = highlight.size > 0;

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/60">
      <svg
        viewBox={`0 0 ${L.width} ${L.height}`}
        className="min-w-[760px] w-full h-auto select-none"
        role="group"
        aria-label={`${atlas.title}：${atlas.domains.length} 個領域 × 5 個等級的知識點地圖`}
      >
        <defs>
          <marker id={`atlas-arrow-${atlas.key}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#64748b" />
          </marker>
          <marker id={`atlas-arrow-dep-${atlas.key}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#10b981" />
          </marker>
        </defs>

        {/* Level column headers + background bands */}
        {ATLAS_LEVELS.map((lv, i) => {
          const x = MAP.labelW + i * MAP.colW;
          const dim = levelFilter !== null && levelFilter !== lv.level;
          return (
            <g key={lv.level} opacity={dim ? 0.35 : 1}>
              <rect x={x + 2} y={MAP.headH - 2} width={MAP.colW - 4} height={L.height - MAP.headH - 6} rx={10} fill={LEVEL_TONE[lv.level].hex} opacity={0.06} />
              <rect x={x + 10} y={8} width={MAP.colW - 20} height={26} rx={13} fill={LEVEL_TONE[lv.level].hex} opacity={0.9} />
              <text x={x + MAP.colW / 2} y={25} textAnchor="middle" fontSize="12.5" fontWeight={700} fill="#fff">
                L{lv.level} {lv.name}
              </text>
            </g>
          );
        })}

        {/* Domain rows */}
        {L.rows.map((r, ri) => {
          const d = atlas.domains.find((x) => x.id === r.domainId)!;
          const dim = domainFilter !== null && domainFilter !== d.id;
          return (
            <g key={r.domainId} opacity={dim ? 0.35 : 1}>
              {ri > 0 && <line x1={8} x2={L.width - 8} y1={r.y} y2={r.y} className="stroke-slate-200 dark:stroke-slate-800" strokeDasharray="3 4" />}
              <text x={10} y={r.y + r.h / 2 - 4} fontSize="16">
                {d.emoji}
              </text>
              <text x={34} y={r.y + r.h / 2 - 3} fontSize="13" fontWeight={700} className="fill-slate-800 dark:fill-slate-100">
                {d.short}
              </text>
              <text x={34} y={r.y + r.h / 2 + 13} fontSize="10.5" className="fill-slate-500 dark:fill-slate-400">
                {atlas.points.filter((p) => p.domain === d.id).length} 個知識點
              </text>
            </g>
          );
        })}

        {/* Prerequisite / dependent edges for the selected point */}
        {sel &&
          prereqs.map((pid) =>
            L.pos[pid] ? (
              <path key={`pre-${pid}`} d={curve(L.pos[pid], L.pos[sel.id])} fill="none" stroke="#64748b" strokeWidth={1.8} strokeDasharray="5 4" markerEnd={`url(#atlas-arrow-${atlas.key})`} />
            ) : null,
          )}
        {sel &&
          dependents.map((did) =>
            L.pos[did] ? (
              <path key={`dep-${did}`} d={curve(L.pos[sel.id], L.pos[did])} fill="none" stroke="#10b981" strokeWidth={1.8} markerEnd={`url(#atlas-arrow-dep-${atlas.key})`} />
            ) : null,
          )}

        {/* Knowledge-point dots */}
        {atlas.points.map((p) => {
          const c = L.pos[p.id];
          if (!c) return null;
          const tone = LEVEL_TONE[p.level];
          const isSel = p.id === selected;
          const isRel = prereqs.includes(p.id) || dependents.includes(p.id);
          const isHi = highlight.has(p.id);
          const filteredOut = (levelFilter !== null && p.level !== levelFilter) || (domainFilter !== null && p.domain !== domainFilter);
          const faded = filteredOut || (anyHighlight && !isHi && !isSel) || (sel && !isSel && !isRel && !anyHighlight);
          const done = mastered.has(p.id);
          return (
            <g
              key={p.id}
              role="button"
              tabIndex={0}
              aria-label={`L${p.level} ${levelName(p.level)}：${p.title}${done ? '（已掌握）' : ''}`}
              aria-pressed={isSel}
              onClick={() => onSelect(p.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelect(p.id);
                }
              }}
              className="cursor-pointer focus:outline-none [&:focus-visible>circle:first-child]:stroke-[3]"
              opacity={faded ? 0.25 : 1}
            >
              <title>{`${p.id}｜L${p.level} ${levelName(p.level)}｜${p.title}`}</title>
              {(isSel || isHi) && <circle cx={c.x} cy={c.y} r={MAP.dotR + 5} fill="none" stroke={isSel ? '#0f172a' : tone.hex} strokeWidth={2} className={isSel ? 'dark:stroke-white' : ''} />}
              <circle cx={c.x} cy={c.y} r={MAP.dotR} fill={done ? tone.hex : '#fff'} stroke={tone.hex} strokeWidth={2.2} className={done ? '' : 'dark:fill-slate-900'} />
              <text x={c.x} y={c.y + 4} textAnchor="middle" fontSize="10.5" fontWeight={700} fill={done ? '#fff' : tone.hex} pointerEvents="none">
                {done ? '✓' : indexInDomain[p.id]}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

// ── Knowledge-point card ───────────────────────────────────────────────────
interface CardProps {
  kp: AtlasKnowledgePoint;
  atlas: KnowledgeAtlasData;
  open: boolean;
  mastered: boolean;
  onToggleOpen: () => void;
  onToggleMastered: () => void;
  onJump: (id: string) => void;
}

const KpCard: React.FC<CardProps> = ({ kp, atlas, open, mastered, onToggleOpen, onToggleMastered, onJump }) => {
  const domain = atlas.domains.find((d) => d.id === kp.domain);
  const tone = LEVEL_TONE[kp.level];
  const byId = (id: string) => atlas.points.find((p) => p.id === id);
  const dependents = atlas.points.filter((p) => p.prereq?.includes(kp.id));
  const faqs = atlas.faqs.filter((f) => f.kps.includes(kp.id));
  return (
    <article id={`atlas-kp-${kp.id}`} className={`scroll-mt-28 rounded-2xl border bg-white dark:bg-slate-900/80 shadow-xs transition-shadow ${open ? `ring-2 ${tone.ring} border-transparent` : 'border-slate-200 dark:border-slate-800'}`}>
      <button type="button" onClick={onToggleOpen} aria-expanded={open} className="w-full text-left p-4 flex items-start gap-3">
        <span className={`shrink-0 mt-0.5 inline-flex items-center rounded-lg border px-2 py-0.5 text-[0.7rem] font-bold ${tone.chip}`}>L{kp.level} {levelName(kp.level)}</span>
        <span className="flex-1 min-w-0">
          <span className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
            <strong className="text-sm text-slate-900 dark:text-white">{kp.title}</strong>
            {mastered && <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" aria-label="已掌握" />}
          </span>
          <span className="block text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">{kp.plain}</span>
          <span className="block text-[0.7rem] text-slate-400 dark:text-slate-500 mt-1 font-mono">
            {kp.id} · {domain?.emoji} {domain?.label}
          </span>
        </span>
        {open ? <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
      </button>

      {open && (
        <div className="px-4 pb-4 space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed animate-fade-in">
          <p>{kp.detail}</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {kp.keyFact && (
              <div className={`rounded-xl p-3 border border-slate-200/80 dark:border-slate-800 ${tone.soft}`}>
                <div className="flex items-center gap-1.5 text-[0.7rem] font-bold text-slate-700 dark:text-slate-200 mb-1">
                  <Target className="w-3.5 h-3.5" /> 關鍵數字／準則
                </div>
                <p className="text-xs">{kp.keyFact}</p>
              </div>
            )}
            {kp.action && (
              <div className="rounded-xl p-3 border border-emerald-200/80 dark:border-emerald-900/60 bg-emerald-50/60 dark:bg-emerald-950/20">
                <div className="flex items-center gap-1.5 text-[0.7rem] font-bold text-emerald-800 dark:text-emerald-300 mb-1">
                  <Lightbulb className="w-3.5 h-3.5" /> 今天就能做
                </div>
                <p className="text-xs">{kp.action}</p>
              </div>
            )}
          </div>
          {kp.myth && (
            <div className="rounded-xl p-3 border border-amber-200/80 dark:border-amber-900/60 bg-amber-50/60 dark:bg-amber-950/20 text-xs">
              <span className="font-bold text-amber-900 dark:text-amber-300 inline-flex items-center gap-1 mr-1">
                <ShieldAlert className="w-3.5 h-3.5" /> 破解迷思
              </span>
              {kp.myth}
            </div>
          )}
          <div className="flex flex-wrap items-center gap-2">
            <EvidenceBadge grade={kp.evidence} showText />
            {kp.link && (
              <a href={`#${kp.link.hash}`} className="inline-flex items-center gap-1 rounded-lg border border-slate-300 dark:border-slate-700 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-emerald-500 hover:text-emerald-800 dark:hover:text-emerald-300">
                <Link2 className="w-3.5 h-3.5" /> {kp.link.label}
                <ArrowRight className="w-3 h-3" />
              </a>
            )}
            <button
              type="button"
              onClick={onToggleMastered}
              aria-pressed={mastered}
              className={`ml-auto inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold border ${mastered ? 'bg-emerald-600 border-emerald-600 text-white hover:bg-emerald-700' : 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-emerald-500'}`}
            >
              {mastered ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Circle className="w-3.5 h-3.5" />}
              {mastered ? '已掌握' : '標記為已懂'}
            </button>
          </div>
          {(kp.prereq?.length || dependents.length || faqs.length) ? (
            <div className="space-y-1.5 pt-1 border-t border-slate-100 dark:border-slate-800">
              {kp.prereq && kp.prereq.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 pt-2">
                  <span className="text-[0.7rem] font-bold text-slate-500">先懂這些：</span>
                  {kp.prereq.map((id) => (
                    <button key={id} type="button" onClick={() => onJump(id)} className="rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[0.7rem] text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700">
                      {byId(id)?.title ?? id}
                    </button>
                  ))}
                </div>
              )}
              {dependents.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[0.7rem] font-bold text-emerald-700 dark:text-emerald-400">接著學：</span>
                  {dependents.map((p) => (
                    <button key={p.id} type="button" onClick={() => onJump(p.id)} className="rounded-md bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 text-[0.7rem] text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100">
                      {p.title}
                    </button>
                  ))}
                </div>
              )}
              {faqs.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[0.7rem] font-bold text-sky-700 dark:text-sky-400">回答的常見問題：</span>
                  {faqs.map((f) => (
                    <span key={f.id} className="rounded-md bg-sky-50 dark:bg-sky-950/40 px-2 py-0.5 text-[0.7rem] text-sky-800 dark:text-sky-300">
                      {f.q}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ) : null}
        </div>
      )}
    </article>
  );
};

// ── Main view ──────────────────────────────────────────────────────────────
export const KnowledgeAtlasView: React.FC<{ atlas: KnowledgeAtlasData }> = ({ atlas }) => {
  const { mastered, toggle, reset } = useMastered(atlas.key);
  const [selected, setSelected] = useState<string | null>(null);
  const [open, setOpen] = useState<Set<string>>(new Set());
  const [levelFilter, setLevelFilter] = useState<AtlasLevel | null>(null);
  const [domainFilter, setDomainFilter] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [faqActive, setFaqActive] = useState<string | null>(null);
  const [faqCat, setFaqCat] = useState<string | null>(null);
  const [showAllFaq, setShowAllFaq] = useState(false);

  const cov = useMemo(() => atlasCoverage(atlas), [atlas]);
  const activeFaq: AtlasFaq | undefined = atlas.faqs.find((f) => f.id === faqActive);
  const highlight = useMemo(() => new Set(activeFaq?.kps ?? []), [activeFaq]);

  const q = query.trim().toLowerCase();
  const visible = atlas.points.filter(
    (p) =>
      (levelFilter === null || p.level === levelFilter) &&
      (domainFilter === null || p.domain === domainFilter) &&
      (!q || [p.title, p.plain, p.detail, p.keyFact, p.myth, p.action, ...(p.tags ?? [])].some((s) => s?.toLowerCase().includes(q))),
  );

  const jumpTo = (id: string) => {
    const kp = atlas.points.find((p) => p.id === id);
    if (!kp) return;
    setSelected(id);
    setOpen((prev) => new Set(prev).add(id));
    if (levelFilter !== null && kp.level !== levelFilter) setLevelFilter(null);
    if (domainFilter !== null && kp.domain !== domainFilter) setDomainFilter(null);
    if (q) setQuery('');
    window.setTimeout(() => document.getElementById(`atlas-kp-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 60);
  };

  const faqCats = [...new Set(atlas.faqs.map((f) => f.category))];
  const faqList = atlas.faqs.filter((f) => faqCat === null || f.category === faqCat);
  const faqShown = showAllFaq ? faqList : faqList.slice(0, 12);

  const masteredCount = atlas.points.filter((p) => mastered.has(p.id)).length;
  const nextLevel = ATLAS_LEVELS.find((lv) => atlas.points.some((p) => p.level === lv.level && !mastered.has(p.id)));

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <section className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-white via-slate-50 to-emerald-50/60 dark:from-slate-900 dark:via-slate-900 dark:to-emerald-950/20 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-800 dark:text-emerald-400 uppercase">
          <MapIcon className="w-4 h-4" /> Knowledge Atlas · 知識點全圖
        </div>
        <h2 className="text-xl sm:text-2xl font-display font-bold text-slate-900 dark:text-white">{atlas.title}</h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{atlas.subtitle}</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { v: atlas.points.length, l: '個知識點' },
            { v: `${atlas.domains.length} × 5`, l: '領域 × 等級全覆蓋' },
            { v: atlas.faqs.length, l: '個常見問題已對應' },
            { v: `${masteredCount}/${atlas.points.length}`, l: '你已掌握' },
          ].map((s) => (
            <div key={s.l} className="rounded-2xl bg-white/80 dark:bg-slate-950/50 border border-slate-200/80 dark:border-slate-800 p-3">
              <div className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-mono">{s.v}</div>
              <div className="text-[0.7rem] text-slate-600 dark:text-slate-400">{s.l}</div>
            </div>
          ))}
        </div>
        <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden" role="progressbar" aria-valuemin={0} aria-valuemax={atlas.points.length} aria-valuenow={masteredCount} aria-label="知識點掌握進度">
          <div className="h-full bg-emerald-500 transition-all" style={{ width: `${(masteredCount / Math.max(1, atlas.points.length)) * 100}%` }} />
        </div>
        {nextLevel && (
          <p className="text-xs text-slate-600 dark:text-slate-400">
            建議下一步：從 <strong className="text-slate-800 dark:text-slate-200">L{nextLevel.level} {nextLevel.name}</strong> 尚未掌握的知識點開始——
            <button type="button" className="underline font-semibold text-emerald-700 dark:text-emerald-400" onClick={() => { setLevelFilter(nextLevel.level); setDomainFilter(null); }}>
              只看 L{nextLevel.level}
            </button>
          </p>
        )}
      </section>

      {/* Level ladder */}
      <section aria-labelledby={`atlas-ladder-${atlas.key}`} className="space-y-3">
        <h3 id={`atlas-ladder-${atlas.key}`} className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
          <GraduationCap className="w-5 h-5 text-emerald-600" /> 能力階梯：從小白到大師，每一級學完能做到什麼
        </h3>
        <div className="grid gap-2 sm:grid-cols-5">
          {ATLAS_LEVELS.map((lv) => {
            const pts = atlas.points.filter((p) => p.level === lv.level);
            const done = pts.filter((p) => mastered.has(p.id)).length;
            const active = levelFilter === lv.level;
            return (
              <button
                key={lv.level}
                type="button"
                aria-pressed={active}
                onClick={() => setLevelFilter(active ? null : lv.level)}
                className={`text-left rounded-2xl border p-3 space-y-1.5 transition-colors ${active ? `ring-2 ${LEVEL_TONE[lv.level].ring} border-transparent` : 'border-slate-200 dark:border-slate-800 hover:border-slate-400'} ${LEVEL_TONE[lv.level].soft}`}
              >
                <div className="flex items-center justify-between">
                  <span className={`inline-flex rounded-md border px-1.5 py-0.5 text-[0.7rem] font-bold ${LEVEL_TONE[lv.level].chip}`}>L{lv.level} {lv.name}</span>
                  <span className="text-[0.7rem] font-mono text-slate-500">{done}/{pts.length}</span>
                </div>
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-100 leading-snug">{atlas.levelGoals[lv.level]}</p>
                <p className="text-[0.7rem] text-slate-500 dark:text-slate-400 leading-snug">{lv.desc}</p>
              </button>
            );
          })}
        </div>
      </section>

      {/* Map */}
      <section aria-labelledby={`atlas-map-${atlas.key}`} className="space-y-3">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <h3 id={`atlas-map-${atlas.key}`} className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
            <MapIcon className="w-5 h-5 text-emerald-600" /> 知識點地圖（{atlas.domains.length} 大領域 × 5 個等級）
          </h3>
          <p className="text-[0.7rem] text-slate-500 dark:text-slate-400">
            點圓點看內容；虛線箭頭＝先懂的前置知識，綠色箭頭＝接著學；實心＝已掌握。手機可左右滑動。
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="依領域篩選">
          <button type="button" aria-pressed={domainFilter === null} onClick={() => setDomainFilter(null)} className={`rounded-xl border px-2.5 py-1 text-xs font-semibold ${domainFilter === null ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900' : 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200'}`}>
            全部領域
          </button>
          {atlas.domains.map((d) => (
            <button
              key={d.id}
              type="button"
              aria-pressed={domainFilter === d.id}
              title={d.summary}
              onClick={() => setDomainFilter(domainFilter === d.id ? null : d.id)}
              className={`rounded-xl border px-2.5 py-1 text-xs font-semibold ${domainFilter === d.id ? 'bg-emerald-700 text-white border-emerald-700' : 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-emerald-500'}`}
            >
              {d.emoji} {d.label}
            </button>
          ))}
        </div>
        <AtlasMap atlas={atlas} selected={selected} highlight={highlight} mastered={mastered} levelFilter={levelFilter} domainFilter={domainFilter} onSelect={jumpTo} />
        {activeFaq && (
          <div className="flex items-start gap-2 rounded-xl border border-sky-200 dark:border-sky-900 bg-sky-50/70 dark:bg-sky-950/30 p-3 text-xs text-sky-900 dark:text-sky-200">
            <HelpCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span className="flex-1">
              地圖已標出回答「<strong>{activeFaq.q}</strong>」所需的 {activeFaq.kps.length} 個知識點。
            </span>
            <button type="button" onClick={() => setFaqActive(null)} aria-label="清除問題標示" className="p-0.5 rounded hover:bg-sky-100 dark:hover:bg-sky-900">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
        {/* Domain summaries */}
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {atlas.domains.map((d) => (
            <div key={d.id} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-3">
              <div className="text-xs font-bold text-slate-900 dark:text-white">
                {d.emoji} {d.label}
              </div>
              <p className="text-[0.7rem] text-slate-600 dark:text-slate-400 mt-1 leading-snug">{d.summary}</p>
              <div className="flex gap-0.5 mt-2" aria-label={`${d.label} 各等級知識點數`}>
                {ATLAS_LEVELS.map((lv) => {
                  const n = cov.grid[d.id]?.[lv.level] ?? 0;
                  return (
                    <span key={lv.level} title={`L${lv.level} ${lv.name}：${n} 個`} className="flex-1 h-1.5 rounded-full" style={{ background: LEVEL_TONE[lv.level].hex, opacity: n ? 0.35 + Math.min(n, 3) * 0.2 : 0.1 }} />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cards */}
      <section aria-labelledby={`atlas-cards-${atlas.key}`} className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 id={`atlas-cards-${atlas.key}`} className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
            <BookOpen className="w-5 h-5 text-emerald-600" /> 知識點卡片（{visible.length}／{atlas.points.length}）
          </h3>
          <div className="flex items-center gap-2">
            <label className="relative">
              <span className="sr-only">搜尋知識點</span>
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="搜尋關鍵字…"
                className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs w-44 sm:w-56 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </label>
            {(levelFilter !== null || domainFilter !== null || q) && (
              <button type="button" onClick={() => { setLevelFilter(null); setDomainFilter(null); setQuery(''); }} className="text-xs font-semibold text-slate-600 dark:text-slate-300 underline">
                清除篩選
              </button>
            )}
          </div>
        </div>
        {ATLAS_LEVELS.filter((lv) => visible.some((p) => p.level === lv.level)).map((lv) => (
          <div key={lv.level} className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: LEVEL_TONE[lv.level].hex }} />
              L{lv.level} {lv.name} · {atlas.levelGoals[lv.level]}
            </div>
            <div className="grid gap-2 lg:grid-cols-2 items-start">
              {visible
                .filter((p) => p.level === lv.level)
                .map((p) => (
                  <KpCard
                    key={p.id}
                    kp={p}
                    atlas={atlas}
                    open={open.has(p.id)}
                    mastered={mastered.has(p.id)}
                    onToggleOpen={() => {
                      setSelected(p.id);
                      setOpen((prev) => {
                        const next = new Set(prev);
                        if (next.has(p.id)) next.delete(p.id);
                        else next.add(p.id);
                        return next;
                      });
                    }}
                    onToggleMastered={() => toggle(p.id)}
                    onJump={jumpTo}
                  />
                ))}
            </div>
          </div>
        ))}
        {visible.length === 0 && <p className="text-sm text-slate-500 py-6 text-center">沒有符合條件的知識點，試試其他關鍵字或清除篩選。</p>}
        {masteredCount > 0 && (
          <div className="text-right">
            <button type="button" onClick={() => { if (window.confirm('確定清除這個主題的所有掌握紀錄？')) reset(); }} className="text-[0.7rem] text-slate-500 underline">
              重設掌握進度
            </button>
          </div>
        )}
      </section>

      {/* FAQ coverage */}
      <section aria-labelledby={`atlas-faq-${atlas.key}`} className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 sm:p-6 space-y-4 shadow-sm">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <h3 id={`atlas-faq-${atlas.key}`} className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
            <HelpCircle className="w-5 h-5 text-sky-600" /> 常見問題覆蓋檢核（{cov.faqCovered}/{atlas.faqs.length} 已有對應知識點）
          </h3>
          <span className="text-[0.7rem] text-slate-500 dark:text-slate-400">點問題看簡答，並在上方地圖標出需要的知識點</span>
        </div>
        <div className="grid gap-2 sm:grid-cols-3 text-xs">
          <div className="rounded-xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200/70 dark:border-emerald-900/60 p-3">
            <div className="font-bold text-emerald-900 dark:text-emerald-300">領域 × 等級覆蓋</div>
            <div className="font-mono text-lg text-slate-900 dark:text-white">{cov.cellsFilled}/{cov.cellsTotal}</div>
            <div className="text-[0.7rem] text-slate-600 dark:text-slate-400">每個領域在 L1–L5 都有知識點</div>
          </div>
          <div className="rounded-xl bg-sky-50/70 dark:bg-sky-950/20 border border-sky-200/70 dark:border-sky-900/60 p-3">
            <div className="font-bold text-sky-900 dark:text-sky-300">常見問題覆蓋</div>
            <div className="font-mono text-lg text-slate-900 dark:text-white">{Math.round((cov.faqCovered / Math.max(1, atlas.faqs.length)) * 100)}%</div>
            <div className="text-[0.7rem] text-slate-600 dark:text-slate-400">{faqCats.length} 類問題、橫跨 {cov.faqDomains} 個領域</div>
          </div>
          <div className="rounded-xl bg-violet-50/70 dark:bg-violet-950/20 border border-violet-200/70 dark:border-violet-900/60 p-3">
            <div className="font-bold text-violet-900 dark:text-violet-300">學習鏈</div>
            <div className="font-mono text-lg text-slate-900 dark:text-white">{cov.prereqEdges}</div>
            <div className="text-[0.7rem] text-slate-600 dark:text-slate-400">條「先懂 A 再學 B」的前置關係</div>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="問題分類">
          <button type="button" aria-pressed={faqCat === null} onClick={() => setFaqCat(null)} className={`rounded-xl border px-2.5 py-1 text-xs font-semibold ${faqCat === null ? 'bg-sky-700 text-white border-sky-700' : 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200'}`}>
            全部（{atlas.faqs.length}）
          </button>
          {faqCats.map((c) => (
            <button key={c} type="button" aria-pressed={faqCat === c} onClick={() => setFaqCat(faqCat === c ? null : c)} className={`rounded-xl border px-2.5 py-1 text-xs font-semibold ${faqCat === c ? 'bg-sky-700 text-white border-sky-700' : 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-sky-500'}`}>
              {c}（{atlas.faqs.filter((f) => f.category === c).length}）
            </button>
          ))}
        </div>
        <ul className="grid gap-2 md:grid-cols-2">
          {faqShown.map((f) => {
            const active = faqActive === f.id;
            return (
              <li key={f.id} className={`rounded-xl border p-3 ${active ? 'border-sky-400 bg-sky-50/60 dark:bg-sky-950/30' : 'border-slate-200 dark:border-slate-800'}`}>
                <button type="button" aria-expanded={active} onClick={() => setFaqActive(active ? null : f.id)} className="w-full text-left flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" aria-label="已覆蓋" />
                  <span className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white flex-1">{f.q}</span>
                  {active ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {active && (
                  <div className="mt-2 pl-6 space-y-2 animate-fade-in">
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{f.a}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {f.kps.map((id) => {
                        const kp = atlas.points.find((p) => p.id === id);
                        if (!kp) return null;
                        return (
                          <button key={id} type="button" onClick={() => jumpTo(id)} className={`rounded-md border px-2 py-0.5 text-[0.7rem] font-semibold ${LEVEL_TONE[kp.level].chip}`}>
                            L{kp.level} · {kp.title}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
        {faqList.length > 12 && (
          <button type="button" onClick={() => setShowAllFaq((s) => !s)} className="text-xs font-semibold text-sky-700 dark:text-sky-400 underline">
            {showAllFaq ? '收合' : `顯示全部 ${faqList.length} 題`}
          </button>
        )}
      </section>

      {/* Sources */}
      <details className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-4">
        <summary className="cursor-pointer text-sm font-bold text-slate-800 dark:text-slate-100">參考依據（{atlas.sources.length}）· 最後審閱 {atlas.reviewed}</summary>
        <ol className="mt-3 list-decimal pl-5 space-y-1 text-xs text-slate-600 dark:text-slate-400">
          {atlas.sources.map((s) => (
            <li key={s.label}>
              {s.url ? (
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-emerald-700 dark:hover:text-emerald-400">
                  {s.label}
                </a>
              ) : (
                s.label
              )}
            </li>
          ))}
        </ol>
        <p className="mt-3 text-[0.7rem] text-slate-500">本知識圖為衛教用途，不能取代醫師診斷與個別化建議；有疾病、用藥或症狀時請先諮詢專業人員。</p>
      </details>
    </div>
  );
};
