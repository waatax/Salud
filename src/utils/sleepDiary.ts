/**
 * sleepDiary — pure helpers for the CAP-D sleep diary (睡眠・呼吸・正念 zone).
 *
 * Titration follows the sleep-restriction rules in the AASM 2021 behavioural-treatment
 * guideline and the European Insomnia Guideline 2023:
 *   - first window: time in bed ≈ average total sleep time, never under 5 h;
 *   - then weekly: efficiency ≥ 90 % → +15 min, 85–90 % → keep, < 85 % → −15 min.
 */

export interface DiaryRow {
  /** "HH:MM" lights out */
  bed: string;
  /** "HH:MM" out of bed */
  out: string;
  /** minutes to fall asleep */
  latency: number;
  /** minutes awake after first falling asleep */
  waso: number;
}

export interface Night {
  tib: number;
  tst: number;
  se: number;
}

export const MIN_WINDOW = 300;

export const toMin = (hhmm: string): number => {
  const [h, m] = hhmm.split(':').map(Number);
  return ((((h || 0) * 60 + (m || 0)) % 1440) + 1440) % 1440;
};

export const fmtClock = (min: number): string => {
  const m = ((Math.round(min) % 1440) + 1440) % 1440;
  return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
};

/** Time in bed, total sleep and efficiency for one night; null when incomplete or implausible. */
export function diaryNight(r: DiaryRow): Night | null {
  if (!r.bed || !r.out) return null;
  const tib = (toMin(r.out) - toMin(r.bed) + 1440) % 1440;
  if (tib < 120 || tib > 16 * 60) return null;
  const tst = Math.max(0, tib - (r.latency || 0) - (r.waso || 0));
  return { tib, tst, se: tst / tib };
}

/** Averages over the valid nights; efficiency is pooled (Σ sleep ÷ Σ bed), not a mean of ratios. */
export function summarise(nights: (Night | null)[]): (Night & { n: number }) | null {
  const v = nights.filter((n): n is Night => !!n);
  if (!v.length) return null;
  const tib = v.reduce((s, n) => s + n.tib, 0);
  const tst = v.reduce((s, n) => s + n.tst, 0);
  return { tib: tib / v.length, tst: tst / v.length, se: tst / tib, n: v.length };
}

export type Tone = 'good' | 'warn' | 'bad';

/** Next week's time-in-bed window (minutes) and the plain-language verdict. */
export function titrate(avgTst: number, avgSe: number, currentTib: number): { nextTib: number; verdict: string; tone: Tone } {
  const round15 = (m: number) => Math.round(m / 15) * 15;
  const tib = round15(currentTib);
  if (avgSe >= 0.9) return { nextTib: tib + 15, verdict: '睡眠效率 ≥ 90%：下週可提早 15 分鐘上床', tone: 'good' };
  if (avgSe >= 0.85) return { nextTib: tib, verdict: '睡眠效率 85–90%：維持目前的睡眠窗口一週', tone: 'warn' };
  // First restriction when bed time far exceeds sleep: window ≈ average sleep (rounded up).
  if (tib - avgTst > 60) {
    return { nextTib: Math.max(MIN_WINDOW, Math.ceil(avgTst / 15) * 15), verdict: '躺床比睡著多出 1 小時以上：先把躺床時間縮到接近實際睡著時間（延後上床）', tone: 'bad' };
  }
  return { nextTib: Math.max(MIN_WINDOW, tib - 15), verdict: '睡眠效率 < 85%：再縮短 15 分鐘躺床時間（延後上床），讓睡意集中', tone: 'bad' };
}
