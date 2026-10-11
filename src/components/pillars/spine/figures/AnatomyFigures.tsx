import React from 'react';

/**
 * Anatomy schematics for the spine zone. Drawn from standard anatomy references:
 *  - SpineColumn: lateral view, 7 C / 12 T / 5 L + sacrum + coccyx, cervical & lumbar
 *    lordosis, thoracic & sacral kyphosis, cord ending at L1–L2 (conus) → cauda equina.
 *  - MotionSegment: lateral view of two vertebrae — normal, disc degeneration,
 *    osteophyte + foraminal stenosis.
 *  - AxialSegment: axial (top-down) lumbar level — normal, posterolateral herniation,
 *    degenerative stenosis (facet hypertrophy + thick ligamentum flavum + osteophyte).
 * Anterior is to the RIGHT in lateral views and at the TOP in axial views.
 */

type Region = 'C' | 'T' | 'L';

interface Vert {
  id: string;
  region: Region;
  y: number;
  h: number;
  w: number;
  x: number;
  angle: number;
}

/** Centre-line offset (anterior = +x) as a function of distance down the column. */
function curveX(y: number): number {
  if (y < 84) return 9 * Math.sin((Math.PI * y) / 84); // cervical lordosis
  if (y < 252) return -16 * Math.sin((Math.PI * (y - 84)) / 168); // thoracic kyphosis
  if (y < 347) return 13 * Math.sin((Math.PI * (y - 252)) / 95); // lumbar lordosis
  return -Math.pow((y - 347) / 60, 1.25) * 30; // sacrum sweeps backwards
}

function buildColumn(): { verts: Vert[]; topY: number } {
  const verts: Vert[] = [];
  const topY = 34;
  let y = 0;
  const push = (region: Region, n: number, h: number, w0: number, w1: number, gap: number) => {
    for (let i = 0; i < n; i++) {
      const w = w0 + ((w1 - w0) * i) / Math.max(1, n - 1);
      const yc = y + h / 2;
      const dx = curveX(yc + 1) - curveX(yc - 1);
      const angle = (Math.atan2(dx, 2) * 180) / Math.PI;
      verts.push({ id: `${region}${i + 1}`, region, y: topY + y, h, w, x: curveX(yc), angle: -angle });
      y += h + gap;
    }
  };
  push('C', 7, 9, 18, 22, 3);
  push('T', 12, 11, 24, 30, 3);
  push('L', 5, 15, 34, 38, 4);
  return { verts, topY };
}

const COLUMN = buildColumn();
const CX = 150;

export const SpineColumnFigure: React.FC = () => {
  const { verts, topY } = COLUMN;
  const l2 = verts.find((v) => v.id === 'L2')!;
  const lastL = verts[verts.length - 1];
  const sacTop = lastL.y + lastL.h + 5;
  const sacX = (yy: number) => CX + curveX(yy - topY);
  // spinal cord: behind the bodies down to the L1–L2 disc
  const cordPts = verts.filter((v) => v.y <= l2.y).map((v) => [CX + v.x - v.w / 2 - 7, v.y + v.h / 2] as const);
  const cordPath = cordPts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ');
  const caudaStart = cordPts[cordPts.length - 1];
  const regionSpan = (r: Region) => {
    const vs = verts.filter((v) => v.region === r);
    return { y1: vs[0].y, y2: vs[vs.length - 1].y + vs[vs.length - 1].h };
  };
  const bracket = (r: Region, label: string, sub: string, color: string) => {
    const { y1, y2 } = regionSpan(r);
    return (
      <g key={r}>
        <line x1={222} y1={y1} x2={222} y2={y2} stroke={color} strokeWidth={4} strokeLinecap="round" />
        <text x={232} y={(y1 + y2) / 2 - 3} fontSize={13} fontWeight={700} fill="var(--viz-ink)">
          {label}
        </text>
        <text x={232} y={(y1 + y2) / 2 + 13} fontSize={11} fill="var(--viz-ink-2)">
          {sub}
        </text>
      </g>
    );
  };
  return (
    <svg viewBox="0 0 330 500" role="img" aria-label="脊椎側面圖：頸椎 7 節、胸椎 12 節、腰椎 5 節、薦骨與尾骨，脊髓在第 1 到 2 腰椎結束，以下為馬尾神經" className="w-full max-w-md mx-auto h-auto">
      <text x={20} y={20} fontSize={11} fill="var(--viz-ink-2)">
        ← 後（背側）
      </text>
      <text x={312} y={20} fontSize={11} fill="var(--viz-ink-2)" textAnchor="end">
        前（腹側）→
      </text>
      {/* discs */}
      {verts.slice(0, -1).map((v, i) => {
        const n = verts[i + 1];
        const gy = (v.y + v.h + n.y) / 2;
        const gx = CX + (v.x + n.x) / 2;
        return (
          <rect
            key={`d-${v.id}`}
            x={gx - (v.w + n.w) / 4}
            y={gy - 1.6}
            width={(v.w + n.w) / 2}
            height={3.2}
            rx={1.6}
            fill="var(--anat-disc)"
            transform={`rotate(${v.angle} ${gx} ${gy})`}
          />
        );
      })}
      {/* vertebral bodies + spinous processes */}
      {verts.map((v) => {
        const cx = CX + v.x;
        const cy = v.y + v.h / 2;
        return (
          <g key={v.id} transform={`rotate(${v.angle} ${cx} ${cy})`}>
            <line x1={cx - v.w / 2} y1={cy} x2={cx - v.w / 2 - (v.region === 'L' ? 22 : v.region === 'T' ? 20 : 14)} y2={cy + (v.region === 'T' ? 6 : 2)} stroke="var(--anat-bone-edge)" strokeWidth={v.region === 'L' ? 6 : 4} strokeLinecap="round" />
            <rect x={cx - v.w / 2} y={v.y} width={v.w} height={v.h} rx={3} fill="var(--anat-bone)" stroke="var(--anat-bone-edge)" strokeWidth={1.1} />
          </g>
        );
      })}
      {/* sacrum & coccyx */}
      <path
        d={`M${sacX(sacTop) - 20} ${sacTop} L${sacX(sacTop) + 20} ${sacTop} L${sacX(sacTop + 58) + 6} ${sacTop + 58} L${sacX(sacTop + 58) - 8} ${sacTop + 62} Z`}
        fill="var(--anat-bone)"
        stroke="var(--anat-bone-edge)"
        strokeWidth={1.1}
      />
      <path d={`M${sacX(sacTop + 58) - 4} ${sacTop + 62} q 2 12 10 16`} stroke="var(--anat-bone-edge)" strokeWidth={5} fill="none" strokeLinecap="round" />
      {/* cord + cauda equina */}
      <path d={cordPath} stroke="var(--anat-cord)" strokeWidth={5} fill="none" strokeLinecap="round" />
      {[-3, 0, 3, 6].map((o) => (
        <path
          key={o}
          d={`M${caudaStart[0]} ${caudaStart[1]} Q ${caudaStart[0] + 6 + o} ${caudaStart[1] + 60} ${sacX(sacTop + 30) - 26 + o} ${sacTop + 34}`}
          stroke="var(--anat-nerve)"
          strokeWidth={1.4}
          fill="none"
        />
      ))}
      <circle cx={caudaStart[0]} cy={caudaStart[1]} r={4} fill="var(--anat-cord)" stroke="var(--anat-bone-edge)" strokeWidth={0.8} />
      <line x1={caudaStart[0] - 6} y1={caudaStart[1]} x2={34} y2={caudaStart[1]} stroke="var(--viz-ink-2)" strokeWidth={0.8} />
      <text x={30} y={caudaStart[1] - 4} fontSize={11} fontWeight={700} fill="var(--viz-ink)" textAnchor="start">
        脊髓末端
      </text>
      <text x={30} y={caudaStart[1] + 10} fontSize={10} fill="var(--viz-ink-2)">
        約 L1–L2
      </text>
      <text x={30} y={sacTop + 6} fontSize={11} fontWeight={700} fill="var(--viz-ink)">
        馬尾神經
      </text>
      {/* curve labels on the posterior side */}
      <text x={30} y={78} fontSize={11} fill="var(--viz-ink-2)">
        頸椎前凸
      </text>
      <text x={30} y={186} fontSize={11} fill="var(--viz-ink-2)">
        胸椎後凸
      </text>
      <text x={30} y={364} fontSize={11} fill="var(--viz-ink-2)">
        腰椎前凸
      </text>
      {/* region brackets */}
      {bracket('C', '頸椎 C1–C7', '7 節', 'var(--viz-series-1)')}
      {bracket('T', '胸椎 T1–T12', '12 節', 'var(--viz-series-3)')}
      {bracket('L', '腰椎 L1–L5', '5 節', 'var(--viz-series-2)')}
      <line x1={222} y1={sacTop} x2={222} y2={sacTop + 76} stroke="var(--anat-bone-edge)" strokeWidth={4} strokeLinecap="round" />
      <text x={232} y={sacTop + 30} fontSize={13} fontWeight={700} fill="var(--viz-ink)">
        薦骨＋尾骨
      </text>
      <text x={232} y={sacTop + 46} fontSize={11} fill="var(--viz-ink-2)">
        各自癒合
      </text>
      {/* legend */}
      <g transform="translate(20 478)">
        <rect width={14} height={9} rx={2} fill="var(--anat-bone)" stroke="var(--anat-bone-edge)" />
        <text x={18} y={8} fontSize={10.5} fill="var(--viz-ink-2)">
          椎體
        </text>
        <rect x={56} width={14} height={4} y={3} rx={2} fill="var(--anat-disc)" />
        <text x={74} y={8} fontSize={10.5} fill="var(--viz-ink-2)">
          椎間盤
        </text>
        <rect x={120} width={14} height={4} y={3} rx={2} fill="var(--anat-cord)" />
        <text x={138} y={8} fontSize={10.5} fill="var(--viz-ink-2)">
          脊髓
        </text>
        <rect x={172} width={14} height={2} y={4} rx={1} fill="var(--anat-nerve)" />
        <text x={190} y={8} fontSize={10.5} fill="var(--viz-ink-2)">
          神經根
        </text>
      </g>
    </svg>
  );
};

// ── Motion segment (lateral) ─────────────────────────────────────────────

const Segment: React.FC<{ stage: 0 | 1 | 2 }> = ({ stage }) => {
  const discH = stage === 0 ? 20 : 11;
  const upperBottom = 78;
  const lowerTop = upperBottom + discH;
  const bulge = stage === 0 ? 0 : stage === 1 ? 5 : 7;
  // foramen narrows as the disc settles, the disc bulges and spurs grow
  const foramenRy = stage === 0 ? 20 : stage === 1 ? 14 : 9;
  const foramenCy = upperBottom + discH / 2 - 2;
  const nerveR = stage === 2 ? [7, 4.5] : [6.5, 6.5];
  const squeezed = stage === 2;
  return (
    <g>
      {/* upper vertebra */}
      <rect x={66} y={28} width={74} height={50} rx={6} fill="var(--anat-bone)" stroke="var(--anat-bone-edge)" strokeWidth={1.3} />
      <path d={`M66 40 L40 38 L30 52 L40 ${upperBottom - 8} L66 ${upperBottom - 12}`} fill="var(--anat-bone)" stroke="var(--anat-bone-edge)" strokeWidth={1.3} />
      {/* lower vertebra */}
      <rect x={66} y={lowerTop} width={74} height={50} rx={6} fill="var(--anat-bone)" stroke="var(--anat-bone-edge)" strokeWidth={1.3} />
      <path d={`M66 ${lowerTop + 12} L40 ${lowerTop + 8} L28 ${lowerTop + 24} L40 ${lowerTop + 40} L66 ${lowerTop + 38}`} fill="var(--anat-bone)" stroke="var(--anat-bone-edge)" strokeWidth={1.3} />
      {/* facet joint */}
      <ellipse cx={34} cy={(upperBottom + lowerTop) / 2 - 2} rx={stage === 2 ? 9 : 6} ry={stage === 2 ? 10 : 7} fill="var(--anat-bone)" stroke={stage === 2 ? 'var(--anat-hit)' : 'var(--anat-bone-edge)'} strokeWidth={1.3} />
      {/* disc */}
      <path
        d={`M66 ${upperBottom + 1} L140 ${upperBottom + 1} Q ${140 + bulge * 0.4} ${upperBottom + discH / 2} 140 ${lowerTop - 1} L66 ${lowerTop - 1} Q ${66 - bulge} ${upperBottom + discH / 2} 66 ${upperBottom + 1} Z`}
        fill="var(--anat-disc)"
        stroke="var(--anat-disc-core)"
        strokeWidth={1}
      />
      {stage === 0 && <ellipse cx={103} cy={upperBottom + discH / 2} rx={18} ry={5} fill="var(--anat-disc-core)" />}
      {/* osteophytes at the posterior and anterior margins */}
      {stage === 2 && (
        <g fill="var(--anat-bone)" stroke="var(--anat-hit)" strokeWidth={1.3}>
          <path d={`M66 ${upperBottom - 4} L57 ${upperBottom + 2} L66 ${upperBottom}`} />
          <path d={`M66 ${lowerTop + 4} L57 ${lowerTop - 2} L66 ${lowerTop}`} />
          <path d={`M140 ${upperBottom - 4} L149 ${upperBottom + 3} L140 ${upperBottom}`} />
          <path d={`M140 ${lowerTop + 4} L149 ${lowerTop - 3} L140 ${lowerTop}`} />
        </g>
      )}
      {/* foramen + nerve root */}
      <ellipse cx={52} cy={foramenCy} rx={9} ry={foramenRy} fill="var(--viz-surface)" stroke="var(--viz-baseline)" strokeWidth={1} strokeDasharray="2 2" />
      <ellipse cx={52} cy={foramenCy} rx={nerveR[0]} ry={nerveR[1]} fill="var(--anat-nerve)" stroke={squeezed ? 'var(--anat-hit)' : 'var(--anat-bone-edge)'} strokeWidth={squeezed ? 2 : 1} />
      {squeezed && (
        <g stroke="var(--anat-hit)" strokeWidth={1.6} strokeLinecap="round">
          <line x1={42} y1={foramenCy - 14} x2={48} y2={foramenCy - 8} />
          <line x1={42} y1={foramenCy + 14} x2={48} y2={foramenCy + 8} />
        </g>
      )}
      {/* spinous processes */}
      <path d="M32 50 L10 64" stroke="var(--anat-bone-edge)" strokeWidth={5} strokeLinecap="round" />
      <path d={`M30 ${lowerTop + 26} L8 ${lowerTop + 40}`} stroke="var(--anat-bone-edge)" strokeWidth={5} strokeLinecap="round" />
      {/* labels */}
      <g fontSize={10} fontWeight={600}>
        <text x={103} y={58} textAnchor="middle" fill="#3b3222">椎體</text>
        {stage === 0 && (
          <>
            <text x={122} y={162} textAnchor="middle" fill="var(--viz-ink-2)">椎間盤</text>
            <line x1={122} y1={153} x2={122} y2={upperBottom + discH - 1} stroke="var(--viz-ink-2)" strokeWidth={0.8} />
            <text x={40} y={162} textAnchor="middle" fill="var(--viz-ink-2)">神經根</text>
            <line x1={44} y1={153} x2={51} y2={foramenCy + nerveR[1] + 1} stroke="var(--viz-ink-2)" strokeWidth={0.8} />
          </>
        )}
        {stage === 2 && (
          <>
            <text x={150} y={162} textAnchor="middle" fill="var(--anat-hit)">骨刺</text>
            <line x1={150} y1={153} x2={147} y2={lowerTop - 1} stroke="var(--anat-hit)" strokeWidth={0.8} />
            <text x={40} y={162} textAnchor="middle" fill="var(--anat-hit)">神經受壓</text>
            <line x1={44} y1={153} x2={51} y2={foramenCy + nerveR[1] + 1} stroke="var(--anat-hit)" strokeWidth={0.8} />
          </>
        )}
      </g>
    </g>
  );
};

export const MotionSegmentFigure: React.FC = () => {
  const stages: { title: string; sub: string }[] = [
    { title: '① 正常', sub: '椎間盤飽滿、神經孔寬敞' },
    { title: '② 椎間盤退化', sub: '變薄膨出，神經孔變小' },
    { title: '③ 骨刺＋關節肥厚', sub: '神經孔狹窄，神經根受壓' },
  ];
  return (
    <div className="grid grid-cols-3 gap-2">
      {stages.map((s, i) => (
        <div key={s.title} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/30 p-2">
          <svg viewBox="0 0 170 168" role="img" aria-label={`${s.title}：${s.sub}`} className="w-full h-auto">
            <Segment stage={i as 0 | 1 | 2} />
          </svg>
          <p className="text-[13px] font-semibold text-slate-900 dark:text-white leading-snug">{s.title}</p>
          <p className="text-[12px] text-slate-600 dark:text-slate-400 leading-snug">{s.sub}</p>
        </div>
      ))}
    </div>
  );
};

// ── Axial lumbar level ───────────────────────────────────────────────────

const Axial: React.FC<{ kind: 'normal' | 'hernia' | 'stenosis' }> = ({ kind }) => {
  const sten = kind === 'stenosis';
  const hern = kind === 'hernia';
  return (
    <g>
      {/* disc: annulus + nucleus (anterior = top) */}
      <ellipse cx={100} cy={58} rx={56} ry={36} fill="var(--anat-disc)" stroke="var(--anat-disc-core)" strokeWidth={1.3} />
      <ellipse cx={100} cy={60} rx={24} ry={15} fill="var(--anat-disc-core)" />
      {hern && (
        <path d="M76 86 Q70 104 82 110 Q92 104 90 90 Z" fill="var(--anat-disc-core)" stroke="var(--anat-hit)" strokeWidth={2} />
      )}
      {sten && (
        <g fill="var(--anat-bone)" stroke="var(--anat-hit)" strokeWidth={1.5}>
          <path d="M70 88 L64 100 L80 92 Z" />
          <path d="M130 88 L136 100 L120 92 Z" />
        </g>
      )}
      {/* posterior arch: pedicles, laminae, spinous process */}
      <path
        d="M60 84 L54 104 Q56 132 86 146 L96 168 L104 168 L114 146 Q144 132 146 104 L140 84 L128 92 Q132 118 112 128 L88 128 Q68 118 72 92 Z"
        fill="var(--anat-bone)"
        stroke="var(--anat-bone-edge)"
        strokeWidth={1.3}
      />
      {/* facet joints */}
      <ellipse cx={58} cy={120} rx={sten ? 12 : 8} ry={sten ? 13 : 9} fill="var(--anat-bone)" stroke={sten ? 'var(--anat-hit)' : 'var(--anat-bone-edge)'} strokeWidth={1.4} />
      <ellipse cx={142} cy={120} rx={sten ? 12 : 8} ry={sten ? 13 : 9} fill="var(--anat-bone)" stroke={sten ? 'var(--anat-hit)' : 'var(--anat-bone-edge)'} strokeWidth={1.4} />
      {/* ligamentum flavum */}
      <path d={sten ? 'M78 108 Q100 116 122 108 L118 124 Q100 128 82 124 Z' : 'M80 118 Q100 124 120 118 L118 124 Q100 128 82 124 Z'} fill="var(--anat-soft)" stroke={sten ? 'var(--anat-hit)' : 'none'} strokeWidth={1.3} />
      {/* dural sac with cauda equina */}
      {sten ? (
        <path d="M92 100 Q100 94 108 100 Q104 106 108 110 Q100 108 92 110 Q96 106 92 100 Z" fill="var(--anat-cord)" stroke="var(--anat-hit)" strokeWidth={1.4} />
      ) : (
        <ellipse cx={100} cy={106} rx={17} ry={11} fill="var(--anat-cord)" stroke="var(--anat-bone-edge)" strokeWidth={0.8} />
      )}
      {!sten &&
        [
          [94, 103],
          [100, 101],
          [106, 103],
          [96, 109],
          [104, 109],
        ].map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r={1.8} fill="var(--anat-nerve)" stroke="var(--anat-bone-edge)" strokeWidth={0.5} />)}
      {/* exiting / traversing nerve roots in the lateral recesses */}
      <ellipse cx={hern ? 74 : 76} cy={hern ? 104 : 100} rx={sten ? 3.5 : 5} ry={sten ? 2.5 : 5} fill="var(--anat-nerve)" stroke={hern || sten ? 'var(--anat-hit)' : 'var(--anat-bone-edge)'} strokeWidth={hern || sten ? 1.8 : 0.8} />
      <ellipse cx={124} cy={100} rx={sten ? 3.5 : 5} ry={sten ? 2.5 : 5} fill="var(--anat-nerve)" stroke={sten ? 'var(--anat-hit)' : 'var(--anat-bone-edge)'} strokeWidth={sten ? 1.8 : 0.8} />
      <text x={100} y={16} fontSize={10} textAnchor="middle" fill="var(--viz-ink-2)">
        前（肚子側）
      </text>
    </g>
  );
};

export const AxialSegmentFigure: React.FC = () => {
  const panels: { kind: 'normal' | 'hernia' | 'stenosis'; title: string; sub: string }[] = [
    { kind: 'normal', title: '正常', sub: '硬脊膜囊與兩側神經根空間充足' },
    { kind: 'hernia', title: '椎間盤突出（後外側）', sub: '髓核穿出纖維環，壓到單側神經根 → 單腳麻痛' },
    { kind: 'stenosis', title: '退化性椎管狹窄', sub: '骨刺＋小面關節肥厚＋黃韌帶增厚，從四周擠壓 → 走路雙腿痠麻' },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      {panels.map((p) => (
        <div key={p.kind} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/30 p-2 grid grid-cols-[42%_1fr] sm:block gap-2 items-center">
          <svg viewBox="0 0 200 176" role="img" aria-label={`腰椎橫切面：${p.title}。${p.sub}`} className="w-full h-auto">
            <Axial kind={p.kind} />
          </svg>
          <div>
            <p className="text-[13px] font-semibold text-slate-900 dark:text-white leading-snug">{p.title}</p>
            <p className="text-[12px] text-slate-600 dark:text-slate-400 leading-snug">{p.sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export const AnatomyLegend: React.FC = () => (
  <ul className="flex flex-wrap gap-x-4 gap-y-1.5 text-[12px] text-slate-600 dark:text-slate-300" aria-label="圖例">
    {[
      ['var(--anat-bone)', '骨頭（椎體、椎弓）'],
      ['var(--anat-disc)', '椎間盤（纖維環）'],
      ['var(--anat-disc-core)', '髓核'],
      ['var(--anat-cord)', '脊髓／硬脊膜囊'],
      ['var(--anat-nerve)', '神經根'],
      ['var(--anat-soft)', '黃韌帶'],
    ].map(([c, l]) => (
      <li key={l} className="inline-flex items-center gap-1.5">
        <span className="w-3.5 h-3.5 rounded-sm border border-slate-300 dark:border-slate-600" style={{ background: c }} aria-hidden="true" />
        {l}
      </li>
    ))}
    <li className="inline-flex items-center gap-1.5">
      <span className="w-3.5 h-3.5 rounded-sm border-2" style={{ borderColor: 'var(--anat-hit)' }} aria-hidden="true" />
      紅框＝受壓或增生處
    </li>
  </ul>
);
