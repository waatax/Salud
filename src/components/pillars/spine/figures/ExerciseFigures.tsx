import React from 'react';
import { Figure, Ground, Box, Arrow, Pose } from './StickFigure';

/**
 * Exercise drawings: the starting position is drawn faint ("ghost"), the end position
 * solid, with an arrow for the direction of movement. Same proportions as the posture
 * panels so a reader can compare them.
 */

const Mat: React.FC<{ y?: number }> = ({ y = 131 }) => (
  <rect x={10} y={y} width={180} height={6} rx={3} fill="var(--anat-disc)" opacity={0.35} />
);

const Svg: React.FC<{ label: string; children: React.ReactNode; viewBox?: string }> = ({ label, children, viewBox = '0 0 200 150' }) => (
  <svg viewBox={viewBox} role="img" aria-label={label} className="w-full h-auto">
    {children}
  </svg>
);

// ── Neck ─────────────────────────────────────────────────────────────────

const ChinTuck: React.FC = () => {
  const base = { hip: [80, 104] as [number, number], torso: 0, arm: [178, 150] as [number, number], leg: [90, 180, 90] as [number, number, number] };
  return (
    <Svg label="收下巴運動：頭從往前伸的位置水平往後收">
      <Box x={58} y={107} w={44} h={6} />
      <line x1={80} y1={113} x2={80} y2={140} stroke="var(--viz-baseline)" strokeWidth={3} />
      <Ground y={140} />
      <Figure pose={{ ...base, neck: 28 }} ghost />
      <Figure pose={{ ...base, neck: -2 }} tone="good" />
      <Arrow from={[102, 32]} to={[86, 32]} />
    </Svg>
  );
};

const ScapSqueeze: React.FC = () => (
  <Svg label="肩胛後收運動：從背後看兩側肩胛骨往中間、往下夾">
    {/* back view */}
    <circle cx={100} cy={26} r={13} fill="var(--anat-skin)" stroke="var(--anat-figure)" strokeWidth={1.5} />
    <path d="M60 46 Q100 36 140 46 L132 126 Q100 132 68 126 Z" fill="var(--anat-skin)" stroke="var(--anat-figure)" strokeWidth={1.5} />
    <line x1={100} y1={42} x2={100} y2={126} stroke="var(--viz-good)" strokeWidth={3} strokeLinecap="round" />
    {/* scapulae, end position */}
    <path d="M78 54 L94 56 L88 92 Z" fill="var(--anat-bone)" stroke="var(--anat-bone-edge)" strokeWidth={1.3} />
    <path d="M122 54 L106 56 L112 92 Z" fill="var(--anat-bone)" stroke="var(--anat-bone-edge)" strokeWidth={1.3} />
    {/* start position ghost */}
    <path d="M66 52 L84 54 L78 90 Z" fill="none" stroke="var(--viz-muted)" strokeWidth={1.2} strokeDasharray="3 2" />
    <path d="M134 52 L116 54 L122 90 Z" fill="none" stroke="var(--viz-muted)" strokeWidth={1.2} strokeDasharray="3 2" />
    <Arrow from={[58, 72]} to={[76, 78]} />
    <Arrow from={[142, 72]} to={[124, 78]} />
  </Svg>
);

const MedianSlider: React.FC = () => {
  // Front view: arm out to the side, wrist extended, head tilts toward then away.
  const Person: React.FC<{ x: number; tilt: number; wristUp: boolean; ghost?: boolean }> = ({ x, tilt, wristUp, ghost }) => (
    <g opacity={ghost ? 0.3 : 1} strokeLinecap="round" fill="none">
      <line x1={x} y1={58} x2={x} y2={118} stroke="var(--viz-good)" strokeWidth={6} />
      <line x1={x - 18} y1={60} x2={x + 18} y2={60} stroke="var(--anat-figure)" strokeWidth={5} />
      <line x1={x} y1={58} x2={x + Math.sin((tilt * Math.PI) / 180) * 12} y2={58 - Math.cos((tilt * Math.PI) / 180) * 12} stroke="var(--viz-good)" strokeWidth={4} />
      <circle cx={x + Math.sin((tilt * Math.PI) / 180) * 20} cy={58 - Math.cos((tilt * Math.PI) / 180) * 20} r={9} fill="var(--viz-surface)" stroke="var(--anat-figure)" strokeWidth={2.5} />
      {/* right arm out to the side */}
      <line x1={x + 18} y1={60} x2={x + 58} y2={60} stroke="var(--anat-figure)" strokeWidth={4.5} />
      <line x1={x + 58} y1={60} x2={x + 66} y2={wristUp ? 72 : 60} stroke="var(--viz-series-2)" strokeWidth={4} />
      {/* left arm relaxed */}
      <line x1={x - 18} y1={60} x2={x - 22} y2={100} stroke="var(--anat-figure)" strokeWidth={4.5} />
    </g>
  );
  return (
    <Svg label="正中神經滑動：手臂側舉、手腕上翹時頭往同側歪；手腕放鬆時頭往對側歪" viewBox="0 0 220 150">
      <Person x={44} tilt={18} wristUp />
      <Person x={150} tilt={-18} wristUp={false} />
      <text x={70} y={140} fontSize={11} textAnchor="middle" fill="var(--viz-ink-2)">
        手腕翹＋頭靠近
      </text>
      <text x={176} y={140} fontSize={11} textAnchor="middle" fill="var(--viz-ink-2)">
        手腕放＋頭遠離
      </text>
    </Svg>
  );
};

// ── Back ─────────────────────────────────────────────────────────────────

const QUAD: Pose = { hip: [55, 101], torso: 74, neck: 100, arm: [180, 180], leg: [180, 270, 270] };

const CatCamel: React.FC = () => (
  <Svg label="貓牛式：四足跪姿，背部往上拱與往下放鬆交替">
    <Mat />
    <Figure pose={{ ...QUAD, spine: 'ext', neck: 64 }} ghost />
    <Figure pose={{ ...QUAD, spine: 'flex', neck: 136 }} tone="good" />
    <Arrow from={[74, 98]} to={[74, 78]} />
  </Svg>
);

const BirdDog: React.FC = () => (
  <Svg label="鳥狗式：四足跪姿，伸出一手與對側腳成一直線">
    <Mat />
    <Figure pose={QUAD} ghost />
    <Figure pose={{ ...QUAD, arm: [180, 180], arm2: [86, 88], leg: [264, 270, 270], leg2: [180, 270, 270] }} tone="good" />
    <Arrow from={[138, 70]} to={[156, 70]} />
    <Arrow from={[22, 74]} to={[6, 76]} />
  </Svg>
);

const SUPINE_BASE = { hip: [120, 126] as [number, number], torso: 270, neck: 270 };

const DeadBug: React.FC = () => (
  <Svg label="死蟲式：仰躺雙手朝上、雙膝 90 度，對側手腳慢慢伸直">
    <Mat />
    <Figure pose={{ ...SUPINE_BASE, arm: [0, 0], leg: [0, 90, 0] }} ghost />
    <Figure pose={{ ...SUPINE_BASE, arm: [282, 276], arm2: [0, 0], leg: [0, 90, 0], leg2: [82, 88, 10] }} tone="good" />
    <Arrow from={[74, 74]} to={[54, 100]} curve={10} />
    <Arrow from={[150, 94]} to={[174, 108]} curve={-6} />
  </Svg>
);

const Bridge: React.FC = () => (
  <Svg label="臀橋：仰躺屈膝，臀部往上推到膝、髖、肩成一直線">
    <Mat />
    <Figure pose={{ hip: [110, 128], torso: 270, neck: 270, arm: [92, 90], leg: [50, 160, 90] }} ghost />
    <Figure pose={{ hip: [110.6, 108], torso: 240, neck: 270, arm: [100, 92], leg: [88, 175, 90] }} tone="good" />
    <Arrow from={[110, 124]} to={[110, 112]} />
  </Svg>
);

const PressUp: React.FC = () => (
  <Svg label="俯臥撐起：趴著骨盆貼地，用手把上半身撐起">
    <Mat />
    <Figure pose={{ hip: [80, 128], torso: 90, neck: 92, arm: [208, 80], leg: [270, 270, 270] }} ghost />
    <Figure pose={{ hip: [80, 128], torso: 30, neck: 40, arm: [155, 160], leg: [270, 270, 270], spine: 'ext' }} tone="good" />
    <Arrow from={[132, 116]} to={[124, 92]} curve={-6} />
  </Svg>
);

const KneeChest: React.FC = () => (
  <Svg label="膝抱胸：仰躺，雙手抱膝拉向胸口">
    <Mat />
    <Figure pose={{ ...SUPINE_BASE, arm: [92, 90], leg: [50, 160, 90] }} ghost />
    <Figure pose={{ ...SUPINE_BASE, arm: [32, 62], leg: [318, 70, 0], spine: 'flex' }} tone="good" />
    <Arrow from={[150, 104]} to={[124, 92]} curve={-8} />
  </Svg>
);

// ── Nerve & general ──────────────────────────────────────────────────────

const SciaticSlider: React.FC = () => {
  const base = { hip: [70, 108] as [number, number], torso: 0, arm: [186, 178] as [number, number] };
  return (
    <Svg label="坐骨神經滑動：坐姿，膝蓋伸直時抬頭、膝蓋彎曲時低頭交替">
      <Box x={48} y={111} w={44} h={6} />
      <line x1={70} y1={117} x2={70} y2={140} stroke="var(--viz-baseline)" strokeWidth={3} />
      <Ground y={140} />
      <Figure pose={{ ...base, neck: 24, leg: [90, 180, 90] }} ghost />
      <Figure pose={{ ...base, neck: -18, leg: [90, 96, 12] }} tone="good" />
      <Arrow from={[104, 132]} to={[124, 106]} curve={-8} />
      <Arrow from={[82, 40]} to={[72, 30]} curve={-4} />
    </Svg>
  );
};

const Walk: React.FC = () => (
  <Svg label="漸進式走路：身體直立、雙手自然擺動">
    <Ground y={140} />
    <Figure pose={{ hip: [92, 82], torso: 4, neck: 6, arm: [204, 186], arm2: [156, 130], leg: [160, 182, 90], leg2: [204, 196, 120] }} tone="good" />
    <Arrow from={[130, 70]} to={[170, 70]} />
  </Svg>
);

export const EXERCISE_FIGURES: Record<string, React.FC> = {
  'ex-chin-tuck': ChinTuck,
  'ex-scap': ScapSqueeze,
  'ex-cat-camel': CatCamel,
  'ex-bird-dog': BirdDog,
  'ex-dead-bug': DeadBug,
  'ex-bridge': Bridge,
  'ex-press-up': PressUp,
  'ex-knee-chest': KneeChest,
  'ex-sciatic': SciaticSlider,
  'ex-median': MedianSlider,
  'ex-walk': Walk,
};
