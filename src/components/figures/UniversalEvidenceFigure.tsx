import React, { useState } from 'react';
import type { FigureMeta, KnowledgePage } from '../../types';
import { getFourPillarsProfile } from '../../data/fourPillarsMatrix';

interface Props {
  figureId: string;
  meta: FigureMeta;
  page?: KnowledgePage;
}

export const UniversalEvidenceFigure: React.FC<Props> = ({ figureId, meta, page }) => {
  const [activeIdx, setActiveIdx] = useState<number>(0);

  const getFigureChapterTheme = (id: string) => {
    if (id.startsWith('FIG-W')) return { accent: '#06B6D4', badge: '體液與水合生理圖譜', bg: '#083344', border: '#22D3EE' };
    if (id.startsWith('FIG-O')) return { accent: '#F59E0B', badge: '脂質生化與烹調科學圖譜', bg: '#451A03', border: '#FBBF24' };
    if (id.startsWith('FIG-A')) return { accent: '#F43F5E', badge: '酒精毒理與防癌臨床圖譜', bg: '#4C0519', border: '#FB7185' };
    if (id.startsWith('FIG-E')) return { accent: '#F97316', badge: '能量平衡與熱量代謝圖譜', bg: '#431407', border: '#FB923C' };
    if (id.startsWith('FIG-P')) return { accent: '#3B82F6', badge: '蛋白質與肌力恆定圖譜', bg: '#172554', border: '#60A5FA' };
    if (id.startsWith('FIG-C')) return { accent: '#14B8A6', badge: '醣類結構與腸道發酵圖譜', bg: '#042F2E', border: '#2DD4BF' };
    if (id.startsWith('FIG-S')) return { accent: '#EC4899', badge: '游離糖與果糖病理圖譜', bg: '#500724', border: '#F472B6' };
    if (id.startsWith('FIG-N')) return { accent: '#EF4444', badge: '鈉鉀離子與血壓調節圖譜', bg: '#450A0A', border: '#F87171' };
    if (id.startsWith('FIG-M')) return { accent: '#8B5CF6', badge: '微量營養素生物利用率圖譜', bg: '#2E1065', border: '#A78BFA' };
    if (id.startsWith('FIG-D')) return { accent: '#10B981', badge: '流行病學飲食模式圖譜', bg: '#064E3B', border: '#34D399' };
    if (id.startsWith('FIG-F')) return { accent: '#0EA5E9', badge: '外食減害與食品標示解密圖譜', bg: '#0C4A6E', border: '#38BDF8' };
    return { accent: '#06B6D4', badge: '臨床實證醫學圖譜', bg: '#083344', border: '#22D3EE' };
  };

  const chapterTheme = getFigureChapterTheme(figureId);

  const profile = getFourPillarsProfile(page?.id || (figureId.startsWith('FIG-W') ? 'W' : figureId.startsWith('FIG-O') ? 'O' : 'A'));

  const nodes = page?.kps && page.kps.length > 0
    ? page.kps.slice(0, 4).map((kp, idx) => ({
        code: kp.id,
        title: kp.title,
        summary: kp.one_liner,
        detail: kp.statement || kp.why_it_matters,
        grade: kp.evidence_grade,
        pillarTag: idx === 0 ? '🔬 生理機轉' : idx === 1 ? '🥗 飲食與代謝' : idx === 2 ? '🛡️ 預防與篩檢' : '🩺 臨床處置'
      }))
    : [
        {
          code: 'NODE-01',
          title: profile.diet.title,
          summary: profile.diet.one_liner,
          detail: profile.diet.points[0] || '',
          grade: profile.diet.evidence_grade,
          pillarTag: '🥗 飲食營養'
        },
        {
          code: 'NODE-02',
          title: profile.exercise.title,
          summary: profile.exercise.one_liner,
          detail: profile.exercise.points[0] || '',
          grade: profile.exercise.evidence_grade,
          pillarTag: '🏃 運動訓練'
        },
        {
          code: 'NODE-03',
          title: profile.prevention.title,
          summary: profile.prevention.one_liner,
          detail: profile.prevention.points[0] || '',
          grade: profile.prevention.evidence_grade,
          pillarTag: '🛡️ 預防篩檢'
        },
        {
          code: 'NODE-04',
          title: profile.treatment.title,
          summary: profile.treatment.one_liner,
          detail: profile.treatment.points[0] || '',
          grade: profile.treatment.evidence_grade,
          pillarTag: '🩺 臨床治療'
        }
      ];

  const current = nodes[Math.min(activeIdx, nodes.length - 1)];

  return (
    <div className="w-full max-w-3xl space-y-3.5 font-sans text-xs">
      {/* Interactive Node Selector Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
        <span className="font-mono text-[11px] text-slate-300 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: chapterTheme.accent }} />
          {chapterTheme.badge} · 點擊節點檢視實證因果鏈：
        </span>
        <div className="flex flex-wrap gap-1.5">
          {nodes.map((n, idx) => (
            <button
              key={n.code}
              onClick={() => setActiveIdx(idx)}
              className={`px-2.5 py-1 rounded-lg font-mono text-[11px] transition-all ${
                activeIdx === idx
                  ? 'bg-salud-cyan text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {idx + 1}. {n.pillarTag}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive SVG Mechanism & Clinical Matrix Diagram */}
      <svg
        viewBox="0 0 800 320"
        className="w-full h-auto rounded-xl shadow-lg"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label={meta.alt_text}
      >
        <defs>
          <linearGradient id={`grad-${figureId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#090D16" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
        </defs>

        <rect width="800" height="320" rx="16" fill={`url(#grad-${figureId})`} stroke="#1E293B" strokeWidth="1.5" />

        {/* Header Title inside SVG */}
        <text x="30" y="34" fill="#F8FAFC" fontSize="15" fontWeight="bold">
          {meta.title} ({figureId})
        </text>
        <text x="30" y="54" fill="#94A3B8" fontSize="11" fontFamily="monospace">
          {page ? `${page.id} · ${page.title_en}` : meta.source_version}
        </text>

        {/* Connected Flow Nodes across the top */}
        {nodes.map((node, idx) => {
          const boxW = 172;
          const gap = 16;
          const x = 30 + idx * (boxW + gap);
          const y = 76;
          const isSelected = idx === activeIdx;

          return (
            <g
              key={node.code}
              transform={`translate(${x}, ${y})`}
              onClick={() => setActiveIdx(idx)}
              style={{ cursor: 'pointer' }}
            >
              {/* Connector line to next box */}
              {idx < nodes.length - 1 && (
                <line
                  x1={boxW}
                  y1="44"
                  x2={boxW + gap}
                  y2="44"
                  stroke={chapterTheme.accent}
                  strokeWidth="2.5"
                  strokeDasharray="3 3"
                />
              )}
              <rect
                width={boxW}
                height="88"
                rx="12"
                fill={isSelected ? chapterTheme.bg : '#151F32'}
                stroke={isSelected ? chapterTheme.border : '#334155'}
                strokeWidth={isSelected ? '2.5' : '1.5'}
              />
              <text x="12" y="22" fill={chapterTheme.accent} fontSize="10" fontWeight="bold" fontFamily="monospace">
                {node.pillarTag} · Grade {node.grade}
              </text>
              <text x="12" y="44" fill="#FFFFFF" fontSize="12" fontWeight="bold">
                {node.title.length > 12 ? `${node.title.slice(0, 12)}…` : node.title}
              </text>
              <text x="12" y="66" fill="#CBD5E1" fontSize="10">
                {node.summary.length > 15 ? `${node.summary.slice(0, 15)}…` : node.summary}
              </text>
            </g>
          );
        })}

        {/* Active Node Deep Inspection Panel inside SVG */}
        <g transform="translate(30, 184)">
          <rect width="740" height="112" rx="12" fill="#0F172A" stroke={chapterTheme.border} strokeWidth="1.5" />
          <text x="20" y="26" fill={chapterTheme.accent} fontSize="12" fontWeight="bold" fontFamily="monospace">
            [{current.code}] {current.pillarTag} — {current.title} (Evidence Grade {current.grade})
          </text>
          <text x="20" y="52" fill="#F8FAFC" fontSize="12" fontWeight="bold">
            💡 核心實證結論：{current.summary.length > 54 ? `${current.summary.slice(0, 54)}…` : current.summary}
          </text>
          <text x="20" y="76" fill="#94A3B8" fontSize="11">
            🔬 臨床機轉與實踐：{current.detail.length > 62 ? `${current.detail.slice(0, 62)}…` : current.detail}
          </text>
          <text x="20" y="98" fill="#34D399" fontSize="11" fontFamily="monospace">
            ✓ 今日行動處方：{page ? page.do_this.tier1.slice(0, 58) : profile.diet.action_item}
          </text>
        </g>
      </svg>
    </div>
  );
};
