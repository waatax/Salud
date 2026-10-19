import type { DataTable, EvidenceGrade, FigureMeta, FigureType } from '../types';
import { FIGURES_E } from './curriculum/chapterE';
import { FIGURES_P } from './curriculum/chapterP';
import { FIGURES_C } from './curriculum/chapterC';
import { FIGURES_S } from './curriculum/chapterS';
import { FIGURES_N } from './curriculum/chapterN';
import { FIGURES_M } from './curriculum/chapterM';
import { FIGURES_D } from './curriculum/chapterD';
import { FIGURES_F } from './curriculum/chapterF';
import { FIGURES_WOA } from './curriculum/figuresWOA';

/**
 * Curriculum figures — bespoke, data-driven charts for the 11 nutrition chapters (SALUD spec §4.2).
 *
 * Each figure is declared as data (a ChartSpec) and drawn by CurriculumChart, so every
 * knowledge page gets a chart that shows its own numbers instead of the generic placeholder.
 * The accessible data table and long description are derived from the same spec (§4.6).
 */

export type Tone = 'good' | 'ok' | 'warn' | 'bad' | 'info' | 'neutral';

export interface ChartItem {
  label: string;
  value: number;
  /** Text shown instead of the raw number, e.g. "60–70%". */
  display?: string;
  tone?: Tone;
  icon?: string;
  note?: string;
}

export interface StepItem {
  label: string;
  detail?: string;
  tone?: Tone;
  icon?: string;
}

export interface LadderItem {
  range: string;
  label: string;
  detail?: string;
  tone: Tone;
  icon?: string;
}

export interface CompareColumn {
  title: string;
  icon?: string;
  tone: Tone;
  points: string[];
}

export interface MatrixCell {
  text: string;
  tone?: Tone;
}

export interface CurveSeries {
  name: string;
  tone: Tone;
  points: [number, number][];
  dashed?: boolean;
}

export type ChartSpec =
  | { kind: 'bars'; unit?: string; max?: number; items: ChartItem[]; ref?: { value: number; label: string } }
  | { kind: 'stack'; unit?: string; items: ChartItem[] }
  | { kind: 'donut'; unit?: string; center?: string; items: ChartItem[] }
  | { kind: 'flow'; steps: StepItem[] }
  | { kind: 'ladder'; items: LadderItem[] }
  | { kind: 'compare'; columns: CompareColumn[]; verdict?: string }
  | { kind: 'matrix'; cols: string[]; rows: { label: string; icon?: string; cells: (string | MatrixCell)[] }[] }
  | { kind: 'timeline'; items: (StepItem & { t: string })[] }
  | {
      kind: 'curve';
      x: { label: string; min: number; max: number; ticks?: number[]; unit?: string };
      y: { label: string; min: number; max: number; ticks?: number[]; unit?: string };
      series: CurveSeries[];
      bands?: { from: number; to: number; label: string; tone: Tone }[];
      markers?: { x: number; label: string }[];
    };

export interface CurriculumFigure {
  title: string;
  caption: string;
  /** One-sentence message the learner should walk away with. */
  takeaway: string;
  grade: EvidenceGrade;
  sources: string[];
  chart: ChartSpec;
  /** Marks schematic (not to scale) figures. */
  schematic?: boolean;
}

export const CURRICULUM_FIGURES: Record<string, CurriculumFigure> = {
  ...FIGURES_WOA,
  ...FIGURES_E,
  ...FIGURES_P,
  ...FIGURES_C,
  ...FIGURES_S,
  ...FIGURES_N,
  ...FIGURES_M,
  ...FIGURES_D,
  ...FIGURES_F,
};

const KIND_TO_TYPE: Record<ChartSpec['kind'], FigureType> = {
  bars: 'T7',
  stack: 'T7',
  donut: 'T7',
  curve: 'T7',
  flow: 'T1',
  ladder: 'T5',
  compare: 'T6',
  matrix: 'T4',
  timeline: 'T9',
};

export const TONE_ZH: Record<Tone, string> = {
  good: '建議／安全',
  ok: '可接受',
  warn: '注意',
  bad: '高風險',
  info: '資訊',
  neutral: '基準',
};

function itemValue(i: ChartItem, unit?: string): string {
  return i.display ?? `${i.value}${unit ? ` ${unit}` : ''}`;
}

/** Accessible equivalent table (spec §4.6) derived from the chart spec. */
export function chartToTable(chart: ChartSpec): DataTable {
  switch (chart.kind) {
    case 'bars':
    case 'stack':
    case 'donut':
      return {
        headers: ['項目', `數值${chart.unit ? `（${chart.unit}）` : ''}`, '說明'],
        rows: chart.items.map((i) => [`${i.icon ?? ''} ${i.label}`.trim(), itemValue(i), i.note ?? (i.tone ? TONE_ZH[i.tone] : '')]),
      };
    case 'flow':
      return {
        headers: ['步驟', '環節', '說明'],
        rows: chart.steps.map((s, idx) => [idx + 1, `${s.icon ?? ''} ${s.label}`.trim(), s.detail ?? '']),
      };
    case 'timeline':
      return {
        headers: ['時間點', '事件', '說明'],
        rows: chart.items.map((s) => [s.t, `${s.icon ?? ''} ${s.label}`.trim(), s.detail ?? '']),
      };
    case 'ladder':
      return {
        headers: ['區間', '分級', '說明', '燈號'],
        rows: chart.items.map((s) => [s.range, `${s.icon ?? ''} ${s.label}`.trim(), s.detail ?? '', TONE_ZH[s.tone]]),
      };
    case 'compare':
      return {
        headers: chart.columns.map((c) => c.title),
        rows: Array.from({ length: Math.max(...chart.columns.map((c) => c.points.length)) }, (_, r) =>
          chart.columns.map((c) => c.points[r] ?? '')
        ),
      };
    case 'matrix':
      return {
        headers: ['', ...chart.cols],
        rows: chart.rows.map((r) => [r.label, ...r.cells.map((c) => (typeof c === 'string' ? c : c.text))]),
      };
    case 'curve': {
      const xs = Array.from(new Set(chart.series.flatMap((s) => s.points.map((p) => p[0])))).sort((a, b) => a - b);
      return {
        headers: [`${chart.x.label}${chart.x.unit ? `（${chart.x.unit}）` : ''}`, ...chart.series.map((s) => s.name)],
        rows: xs.map((x) => [x, ...chart.series.map((s) => s.points.find((p) => p[0] === x)?.[1] ?? '—')]),
      };
    }
  }
}

function describe(fig: CurriculumFigure): string {
  const t = chartToTable(fig.chart);
  const lines = t.rows.map((r) => `• ${r.filter((c) => c !== '').join(' — ')}`);
  return [`圖解目的：${fig.caption}`, '', '內容：', ...lines, '', `重點：${fig.takeaway}`].join('\n');
}

export function curriculumFigureMeta(figId: string, fig: CurriculumFigure, kpIds: string[] = []): FigureMeta {
  return {
    id: figId,
    page_id: figId.replace(/^FIG-([A-Z])-(\d+)-.*$/, 'PAGE-$1-$2'),
    serves_kp: kpIds,
    type: KIND_TO_TYPE[fig.chart.kind],
    title: fig.title,
    caption: fig.caption,
    alt_text: `${fig.title}。${fig.takeaway}`.slice(0, 150),
    long_description: describe(fig),
    data_table: chartToTable(fig.chart),
    data_source_ids: fig.sources,
    source_version: '2026 課綱審定版',
    evidence_grade: fig.grade,
    scale_disclaimer: fig.schematic,
    accuracy_reviewed_by: ['EC-05', 'EC-14'],
    a11y_reviewed_by: ['EC-08'],
  };
}
