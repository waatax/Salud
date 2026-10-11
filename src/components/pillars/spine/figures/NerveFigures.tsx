import React from 'react';

/**
 * Sensory maps for "where is it numb?".
 *  - Hand: right hand, palm toward the viewer (thumb on the viewer's left, as in the
 *    anatomical position). Root map uses the ISNCSCI key points (C6 thumb, C7 middle
 *    finger, C8 little finger); the peripheral map uses the palmar median / ulnar split
 *    through the ring finger.
 *  - Leg & foot: right leg from the front (medial = viewer's right, big toe on the
 *    right). L4 medial shin/malleolus, L5 lateral shin → dorsum → big toe, S1 lateral
 *    foot & little toe. Dermatome borders overlap between people; these are typical.
 * Colours: validated categorical slots 1–3 (blue, orange, aqua) with text legends.
 */

const S1 = 'var(--viz-series-1)';
const S2 = 'var(--viz-series-2)';
const S3 = 'var(--viz-series-3)';

interface Finger {
  x: number;
  top: number;
  w: number;
}

const FINGERS: Record<'index' | 'middle' | 'ring' | 'little', Finger> = {
  index: { x: 64, top: 40, w: 17 },
  middle: { x: 84, top: 32, w: 18 },
  ring: { x: 105, top: 38, w: 17 },
  little: { x: 125, top: 54, w: 15 },
};
const PALM = { x: 62, y: 92, w: 80, h: 78 };

const HandOutline: React.FC<{ fills: { thumb: string; index: string; middle: string; ringL: string; ringR: string; little: string; palmL: string; palmM: string; palmR: string; splitAt: number } }> = ({ fills }) => {
  const f = FINGERS;
  const fingerPath = (k: keyof typeof FINGERS) => {
    const g = f[k];
    return `M${g.x} ${PALM.y + 4} L${g.x} ${g.top + g.w / 2} A${g.w / 2} ${g.w / 2} 0 0 1 ${g.x + g.w} ${g.top + g.w / 2} L${g.x + g.w} ${PALM.y + 4} Z`;
  };
  const ring = f.ring;
  const mid = ring.x + ring.w / 2;
  const uid = React.useId().replace(/[^a-zA-Z0-9_-]/g, '');
  return (
    <g stroke="var(--anat-figure)" strokeWidth={1.4} strokeLinejoin="round">
      <defs>
        <clipPath id={`ring-l-${uid}`}>
          <rect x={ring.x - 1} y={0} width={mid - ring.x + 1} height={200} />
        </clipPath>
        <clipPath id={`ring-r-${uid}`}>
          <rect x={mid} y={0} width={ring.w} height={200} />
        </clipPath>
      </defs>
      {/* thumb: from the radial base of the palm, angled up and out (drawn first so the palm covers its base) */}
      <path d="M78 136 L45.5 97.5 A9.5 9.5 0 0 0 30.5 110.5 L62 150 Z" fill={fills.thumb} />
      {/* palm split into three bands */}
      <path d={`M${PALM.x} ${PALM.y} L${PALM.x + 26} ${PALM.y} L${PALM.x + 26} ${PALM.y + PALM.h} L${PALM.x + 12} ${PALM.y + PALM.h} Q${PALM.x} ${PALM.y + PALM.h - 6} ${PALM.x} ${PALM.y + PALM.h - 20} Z`} fill={fills.palmL} stroke="none" />
      <rect x={PALM.x + 26} y={PALM.y} width={fills.splitAt - PALM.x - 26} height={PALM.h} fill={fills.palmM} stroke="none" />
      <path d={`M${fills.splitAt} ${PALM.y} L${PALM.x + PALM.w} ${PALM.y} L${PALM.x + PALM.w} ${PALM.y + PALM.h - 20} Q${PALM.x + PALM.w} ${PALM.y + PALM.h - 6} ${PALM.x + PALM.w - 12} ${PALM.y + PALM.h} L${fills.splitAt} ${PALM.y + PALM.h} Z`} fill={fills.palmR} stroke="none" />
      <rect x={PALM.x} y={PALM.y} width={PALM.w} height={PALM.h} rx={14} fill="none" />
      {/* wrist */}
      <path d={`M${PALM.x + 12} ${PALM.y + PALM.h} L${PALM.x + 16} ${PALM.y + PALM.h + 22} M${PALM.x + PALM.w - 12} ${PALM.y + PALM.h} L${PALM.x + PALM.w - 16} ${PALM.y + PALM.h + 22}`} fill="none" />
      <path d={fingerPath('index')} fill={fills.index} />
      <path d={fingerPath('middle')} fill={fills.middle} />
      <path d={fingerPath('ring')} fill={fills.ringL} clipPath={`url(#ring-l-${uid})`} />
      <path d={fingerPath('ring')} fill={fills.ringR} clipPath={`url(#ring-r-${uid})`} />
      <path d={fingerPath('ring')} fill="none" />
      <path d={fingerPath('little')} fill={fills.little} />
    </g>
  );
};

export const HandMapsFigure: React.FC = () => {
  const ringSplit = FINGERS.ring.x + FINGERS.ring.w / 2;
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/30 p-2.5">
        <p className="text-[13px] font-semibold text-slate-900 dark:text-white">A. 頸椎神經根（皮節）</p>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-1">右手・掌心朝前（拇指在左）</p>
        <svg viewBox="20 20 160 180" role="img" aria-label="右手掌心面的頸椎神經根分布：C6 拇指與食指、C7 中指、C8 無名指與小指" className="w-full h-auto">
          <HandOutline
            fills={{ thumb: S1, index: S1, middle: S2, ringL: S3, ringR: S3, little: S3, palmL: S1, palmM: S2, palmR: S3, splitAt: 106 }}
          />
        </svg>
        <ul className="mt-1 space-y-0.5 text-[12px] text-slate-700 dark:text-slate-300">
          <li className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm" style={{ background: S1 }} aria-hidden="true" />C6：拇指、食指、前臂外側</li>
          <li className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm" style={{ background: S2 }} aria-hidden="true" />C7：中指（頸椎最常見）</li>
          <li className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm" style={{ background: S3 }} aria-hidden="true" />C8：無名指、小指、前臂內側</li>
        </ul>
      </div>
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/30 p-2.5">
        <p className="text-[13px] font-semibold text-slate-900 dark:text-white">B. 手腕的周邊神經（掌側）</p>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-1">右手・掌心朝前（拇指在左）</p>
        <svg viewBox="20 20 160 180" role="img" aria-label="右手掌心面的周邊神經分布：正中神經負責拇指到無名指半邊，尺神經負責無名指半邊與小指" className="w-full h-auto">
          <HandOutline
            fills={{ thumb: S1, index: S1, middle: S1, ringL: S1, ringR: S2, little: S2, palmL: S1, palmM: S1, palmR: S2, splitAt: ringSplit }}
          />
        </svg>
        <ul className="mt-1 space-y-0.5 text-[12px] text-slate-700 dark:text-slate-300">
          <li className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm" style={{ background: S1 }} aria-hidden="true" />正中神經：拇指到無名指半邊（腕隧道）</li>
          <li className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm" style={{ background: S2 }} aria-hidden="true" />尺神經：無名指半邊、小指（肘隧道）</li>
        </ul>
      </div>
    </div>
  );
};

/** Right leg, front view, with the dorsum of the foot. */
export const LegFootMapFigure: React.FC = () => (
  <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-3 items-center">
    <svg viewBox="0 0 160 260" role="img" aria-label="右小腿與腳背的腰薦神經根分布：L4 小腿內側與內踝、L5 小腿外側到腳背與大腳趾、S1 腳外側與小趾" className="w-full h-auto max-w-[220px] mx-auto">
      <text x={80} y={14} fontSize={10} textAnchor="middle" fill="var(--viz-ink-2)">
        右腿・正面
      </text>
      <text x={18} y={30} fontSize={10} fill="var(--viz-ink-2)">
        外側
      </text>
      <text x={142} y={30} fontSize={10} fill="var(--viz-ink-2)" textAnchor="end">
        內側
      </text>
      {/* shin: lateral half L5, medial strip L4 */}
      <path d="M48 36 L112 36 L104 186 L60 186 Z" fill="var(--anat-skin)" stroke="var(--anat-figure)" strokeWidth={1.4} />
      <path d="M48 36 L78 36 L80 186 L60 186 Z" fill={S2} opacity={0.9} />
      <path d="M92 36 L112 36 L104 186 L88 186 Z" fill={S1} opacity={0.9} />
      {/* knee cap */}
      <ellipse cx={80} cy={34} rx={16} ry={10} fill="var(--anat-skin)" stroke="var(--anat-figure)" strokeWidth={1.4} />
      {/* medial malleolus L4 */}
      <circle cx={106} cy={192} r={6} fill={S1} stroke="var(--anat-figure)" strokeWidth={1.2} />
      {/* foot dorsum seen from above-front */}
      <path d="M58 188 L104 188 L122 238 Q100 252 70 248 L40 238 Z" fill="var(--anat-skin)" stroke="var(--anat-figure)" strokeWidth={1.4} />
      {/* L5 diagonal band across the dorsum to the big toe */}
      <path d="M60 188 L84 188 L120 236 L98 248 Z" fill={S2} opacity={0.9} />
      {/* S1 lateral border & little toe */}
      <path d="M58 196 L66 200 L52 242 L40 238 Z" fill={S3} opacity={0.95} />
      {/* toes */}
      {[
        [112, 246, 9, S2],
        [96, 250, 6, 'var(--anat-skin)'],
        [83, 250, 5.5, 'var(--anat-skin)'],
        [70, 248, 5, 'var(--anat-skin)'],
        [56, 244, 4.5, S3],
      ].map(([x, y, r, c]) => (
        <circle key={`${x}`} cx={x as number} cy={y as number} r={r as number} fill={c as string} stroke="var(--anat-figure)" strokeWidth={1.2} />
      ))}
    </svg>
    <ul className="space-y-2 text-[13px] text-slate-700 dark:text-slate-300">
      <li className="flex gap-2">
        <span className="mt-1 w-3 h-3 shrink-0 rounded-sm" style={{ background: S1 }} aria-hidden="true" />
        <span>
          <strong className="text-slate-900 dark:text-white">L4</strong>：小腿內側、內踝；膝反射可能減弱
        </span>
      </li>
      <li className="flex gap-2">
        <span className="mt-1 w-3 h-3 shrink-0 rounded-sm" style={{ background: S2 }} aria-hidden="true" />
        <span>
          <strong className="text-slate-900 dark:text-white">L5</strong>：小腿外側 → 腳背 → 大腳趾；用腳跟走路困難（最常見之一）
        </span>
      </li>
      <li className="flex gap-2">
        <span className="mt-1 w-3 h-3 shrink-0 rounded-sm" style={{ background: S3 }} aria-hidden="true" />
        <span>
          <strong className="text-slate-900 dark:text-white">S1</strong>：腳外側、小趾，也包含腳跟與腳底外側；踮腳尖無力、跟腱反射減弱
        </span>
      </li>
      <li className="text-[12px] text-slate-500 dark:text-slate-400 leading-relaxed">
        腳背麻＋垂足也可能是膝外側「腓神經」被壓（常蹺腳、久蹲），通常沒有腰痛，需靠神經傳導檢查區分。
      </li>
    </ul>
  </div>
);

// ── Pattern mini-figures ─────────────────────────────────────────────────

type Zone =
  | 'head'
  | 'neck'
  | 'armL'
  | 'armR'
  | 'handL'
  | 'handR'
  | 'cts'
  | 'legL'
  | 'legR'
  | 'footL'
  | 'footR'
  | 'saddle'
  | 'halfR'
  | 'stripeArmR'
  | 'stripeLegR';

const Body: React.FC<{ zones: Zone[]; light?: Zone[] }> = ({ zones, light = [] }) => {
  const on = (z: Zone) => zones.includes(z);
  const lt = (z: Zone) => light.includes(z);
  const hit = 'var(--anat-hit)';
  const fill = (z: Zone) => (on(z) ? hit : 'var(--anat-skin)');
  const op = (z: Zone) => (lt(z) ? 0.45 : 1);
  return (
    <g stroke="var(--anat-figure)" strokeWidth={1.2}>
      {/* person faces the viewer: their right side is on the viewer's LEFT */}
      <circle cx={50} cy={16} r={10} fill={on('halfR') ? 'var(--anat-skin)' : fill('head')} />
      {on('halfR') && <path d="M50 6 A10 10 0 0 0 50 26 Z" fill={hit} stroke="none" />}
      <rect x={45} y={26} width={10} height={6} fill={fill('neck')} />
      <rect x={36} y={32} width={28} height={50} rx={6} fill="var(--anat-skin)" />
      {on('halfR') && <rect x={36} y={32} width={14} height={50} rx={6} fill={hit} stroke="none" opacity={0.85} />}
      {/* arms */}
      <rect x={26} y={34} width={9} height={52} rx={4} fill={on('armR') || on('halfR') ? hit : 'var(--anat-skin)'} opacity={on('armR') ? op('armR') : 1} />
      <rect x={65} y={34} width={9} height={52} rx={4} fill={fill('armL')} opacity={op('armL')} />
      {on('stripeArmR') && <rect x={26} y={34} width={4} height={52} rx={2} fill={hit} stroke="none" />}
      {/* hands */}
      <circle cx={30} cy={93} r={6} fill={on('handR') || on('halfR') || on('stripeArmR') || on('cts') ? hit : 'var(--anat-skin)'} opacity={on('handR') ? op('handR') : 1} />
      <circle cx={70} cy={93} r={6} fill={fill('handL')} opacity={op('handL')} />
      {/* legs */}
      <rect x={38} y={83} width={11} height={64} rx={4} fill={on('legR') || on('halfR') ? hit : 'var(--anat-skin)'} opacity={on('legR') ? op('legR') : 1} />
      <rect x={51} y={83} width={11} height={64} rx={4} fill={fill('legL')} opacity={op('legL')} />
      {on('stripeLegR') && <rect x={38} y={88} width={4} height={59} rx={2} fill={hit} stroke="none" />}
      {on('saddle') && <path d="M42 80 Q50 92 58 80 L58 90 Q50 100 42 90 Z" fill={hit} stroke="none" />}
      {/* feet */}
      <ellipse cx={42} cy={152} rx={8} ry={4.5} fill={on('footR') || on('halfR') || on('stripeLegR') ? hit : 'var(--anat-skin)'} opacity={on('footR') ? op('footR') : 1} />
      <ellipse cx={58} cy={152} rx={8} ry={4.5} fill={fill('footL')} opacity={op('footL')} />
    </g>
  );
};

const PATTERNS: { title: string; sub: string; zones: Zone[]; light?: Zone[]; urgent?: boolean }[] = [
  { title: '頸神經根', sub: '單側沿手臂一條', zones: ['stripeArmR', 'neck'] },
  { title: '腕隧道', sub: '手掌側 3 指半', zones: ['cts'] },
  { title: '腰神經根', sub: '單側沿腿一條', zones: ['stripeLegR'] },
  { title: '周邊神經病變', sub: '雙腳襪套→雙手手套', zones: ['footR', 'footL', 'handR', 'handL'], light: ['handR', 'handL'] },
  { title: '頸椎脊髓病變', sub: '雙手笨拙＋走路不穩', zones: ['handR', 'handL', 'legR', 'legL'], light: ['legR', 'legL'], urgent: true },
  { title: '中風', sub: '突然單側臉手腳', zones: ['halfR'], urgent: true },
  { title: '馬尾症候群', sub: '鞍區＋雙腿＋大小便', zones: ['saddle', 'legR', 'legL'], light: ['legR', 'legL'], urgent: true },
];

export const NumbPatternFigure: React.FC = () => (
  <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5">
    {PATTERNS.map((p) => (
      <div
        key={p.title}
        className={`rounded-xl border p-1.5 text-center ${
          p.urgent ? 'border-rose-300 dark:border-rose-800 bg-rose-50/60 dark:bg-rose-950/20' : 'border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/30'
        }`}
      >
        <svg viewBox="16 0 68 162" role="img" aria-label={`${p.title}：${p.sub}`} className="w-full h-auto max-h-36 mx-auto">
          <Body zones={p.zones} light={p.light} />
        </svg>
        <p className="text-[12px] font-semibold text-slate-900 dark:text-white leading-tight mt-1">{p.title}</p>
        <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-tight">{p.sub}</p>
        {p.urgent && <p className="text-[10px] font-bold text-rose-700 dark:text-rose-300 mt-0.5">需盡快就醫</p>}
      </div>
    ))}
  </div>
);
