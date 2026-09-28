import { HUMAN_SYSTEMS } from '../humanSystemsData';
import { SYSTEM_DEEP_DIVES } from '../systems';
import { CHAPTER_W_PAGES } from '../chapterW';
import { CHAPTER_O_PAGES } from '../chapterO';
import { CHAPTER_A_PAGES } from '../chapterA';
import { PILLAR_NAV, EXERCISE_SUB_NAV, DIET_SUB_NAV } from '../../config/navigation';
import { LEARNING_TRACKS } from './tracks';
import { EVIDENCE_UPDATES } from './evidenceUpdates';
import { LAB_METRICS, TAIWAN_SCREENINGS } from './checkup';
import { GLOSSARY } from './glossary';
import { ALL_QUICK_TIPS } from './quickTips';
import { STARTER_WEEKS } from './starterPlan';

export type SearchGroup = '實用技巧' | '課程' | '主題' | '人體系統' | '疾病' | '檢驗與篩檢' | '最新實證' | '名詞' | '飲食章節' | '運動專項' | '工具';

export interface SearchDoc {
  id: string;
  group: SearchGroup;
  title: string;
  subtitle?: string;
  /** In-app hash, or `modal:<id>` for tools that open a dialog. */
  target: string;
  /** Extra text that should match but is not displayed. */
  keywords: string;
}

export const GROUP_ORDER: SearchGroup[] = ['課程', '實用技巧', '檢驗與篩檢', '疾病', '主題', '人體系統', '最新實證', '名詞', '飲食章節', '運動專項', '工具'];

/**
 * Build the in-memory search corpus. Every entry points to an existing route so the
 * test suite can assert that no result is a dead link.
 */
export function buildSearchIndex(): SearchDoc[] {
  const docs: SearchDoc[] = [];

  for (const t of LEARNING_TRACKS) {
    docs.push({ id: `track:${t.id}`, group: '課程', title: t.title_zh, subtitle: `學習路徑 · ${t.lessons.length} 課`, target: `learn/${t.id}`, keywords: `${t.subtitle_zh} ${t.audience_zh} ${t.title_en}` });
    for (const l of t.lessons) {
      docs.push({
        id: `lesson:${l.id}`,
        group: '課程',
        title: l.title_zh,
        subtitle: `${t.title_zh} · ${l.big_idea_zh}`,
        target: `learn/${t.id}/${l.id}`,
        keywords: `${l.key_points_zh.join(' ')} ${l.do_today_zh.join(' ')} ${l.myth_zh?.myth ?? ''}`,
      });
    }
  }

  for (const p of PILLAR_NAV) {
    docs.push({ id: `pillar:${p.id}`, group: '主題', title: p.label_zh, subtitle: p.blurb_zh, target: p.hash, keywords: `${p.label_en} ${p.blurb_en}` });
  }
  for (const d of DIET_SUB_NAV) {
    docs.push({ id: `diet:${d.hash}`, group: '主題', title: d.label_zh, subtitle: '飲食營養', target: d.hash, keywords: d.label_en });
  }

  for (const sys of HUMAN_SYSTEMS) {
    docs.push({ id: `system:${sys.id}`, group: '人體系統', title: sys.name_zh, subtitle: sys.tagline_zh, target: `systems/${sys.id}`, keywords: `${sys.name_en} ${sys.description_zh}` });
    const dd = SYSTEM_DEEP_DIVES[sys.id];
    if (!dd) continue;
    for (const kp of dd.how_it_works) {
      docs.push({ id: `how:${kp.id}`, group: '人體系統', title: kp.question_zh, subtitle: sys.name_zh, target: `systems/${sys.id}/how`, keywords: kp.answer_zh.slice(0, 160) });
    }
    for (const c of dd.conditions) {
      docs.push({
        id: `cond:${c.id}`,
        group: '疾病',
        title: c.name_zh,
        subtitle: `${sys.name_zh} · ${c.name_en}`,
        target: `systems/${sys.id}/conditions`,
        keywords: `${c.name_en} ${c.what_zh} ${c.symptoms_early_zh.join(' ')}`,
      });
    }
    for (const pr of dd.protocols) {
      docs.push({ id: `prot:${pr.id}`, group: '人體系統', title: pr.title_zh, subtitle: `${sys.name_zh} · 預防與改善`, target: `systems/${sys.id}/prevent`, keywords: pr.goal_zh });
    }
  }

  for (const [chId, pages] of [
    ['W', CHAPTER_W_PAGES],
    ['O', CHAPTER_O_PAGES],
    ['A', CHAPTER_A_PAGES],
  ] as const) {
    for (const p of pages) {
      docs.push({ id: `page:${p.id}`, group: '飲食章節', title: p.title_zh, subtitle: `第 ${chId} 章 · ${p.hook.slice(0, 40)}`, target: `${chId}/${p.id}`, keywords: `${p.title_en} ${p.kps.map((k) => k.title).join(' ')}` });
    }
  }

  for (const e of EXERCISE_SUB_NAV) {
    docs.push({ id: `sport:${e.hash}`, group: '運動專項', title: e.label_zh, subtitle: '運動訓練', target: e.hash, keywords: e.label_en });
  }

  for (const u of EVIDENCE_UPDATES) {
    docs.push({ id: `upd:${u.id}`, group: '最新實證', title: u.title_zh, subtitle: `${u.org} · ${u.date}`, target: `updates/${u.id}`, keywords: `${u.what_changed_zh} ${u.what_it_means_zh}` });
  }

  for (const m of LAB_METRICS) {
    docs.push({ id: `lab:${m.id}`, group: '檢驗與篩檢', title: `${m.name_zh}（${m.abbr}）`, subtitle: m.what_zh, target: 'checkup/labs', keywords: `${m.abbr} ${m.category} ${m.bands.map((b) => b.label_zh).join(' ')}` });
  }
  for (const s of TAIWAN_SCREENINGS) {
    docs.push({ id: `scr:${s.id}`, group: '檢驗與篩檢', title: s.name_zh, subtitle: `${s.who_zh} · ${s.frequency_zh}`, target: 'checkup/screening', keywords: `${s.how_zh} 篩檢 公費` });
  }

  for (const g of GLOSSARY) {
    docs.push({ id: `term:${g.term}`, group: '名詞', title: `${g.term} ${g.zh}`, subtitle: g.plain_zh, target: g.related_hash ?? 'glossary', keywords: g.category });
  }

  for (const tip of ALL_QUICK_TIPS) {
    docs.push({ id: `tip:${tip.id}`, group: '實用技巧', title: tip.title_zh, subtitle: `${tip.section.title_zh} · ${tip.how_zh}`, target: tip.section.hash, keywords: tip.why_zh });
  }
  docs.push({
    id: 'start',
    group: '實用技巧',
    title: '4 週健康啟動計畫',
    subtitle: '從零開始建立運動、飲食與睡眠習慣',
    target: 'start',
    keywords: `開始運動 新手 入門 ${STARTER_WEEKS.map((w) => w.theme_zh + w.tasks.map((t) => t.text_zh).join(' ')).join(' ')}`,
  });

  docs.push(
    { id: 'tool:emergency', group: '工具', title: '危險警訊：何時該立刻就醫', subtitle: '胸痛、中風、呼吸困難', target: 'modal:emergency', keywords: '急診 119 紅旗 中風 胸痛' },
    { id: 'tool:auditc', group: '工具', title: 'AUDIT-C 飲酒風險自評', subtitle: '三題快速篩檢', target: 'modal:auditC', keywords: '喝酒 酒精 篩檢' },
    { id: 'tool:722', group: '工具', title: '722 居家血壓評估', subtitle: '連續 7 天、早晚 2 次、每次 2 遍', target: 'cardiometabolic/BP_722', keywords: '血壓 高血壓 量血壓' },
    { id: 'tool:quick', group: '工具', title: '健檢報告快查', subtitle: '填入數字，看落在哪一區', target: 'checkup/quick', keywords: '血壓 血糖 BMI 腰圍 eGFR 代謝症候群' }
  );

  return docs;
}

const norm = (s: string) => s.toLowerCase().normalize('NFKC');

/**
 * Token AND-match with a simple score: a hit in the title outweighs one in the
 * subtitle, which outweighs the hidden keywords; a title that starts with the query wins.
 */
export function searchDocs(docs: SearchDoc[], query: string, limit = 40): SearchDoc[] {
  const tokens = norm(query).split(/\s+/).filter(Boolean);
  if (!tokens.length) return [];
  const scored: { doc: SearchDoc; score: number }[] = [];
  for (const doc of docs) {
    const title = norm(doc.title);
    const sub = norm(doc.subtitle ?? '');
    const kw = norm(doc.keywords);
    let score = 0;
    let ok = true;
    for (const t of tokens) {
      if (title.includes(t)) score += title.startsWith(t) ? 12 : 8;
      else if (sub.includes(t)) score += 4;
      else if (kw.includes(t)) score += 1;
      else {
        ok = false;
        break;
      }
    }
    if (!ok) continue;
    score += (GROUP_ORDER.length - GROUP_ORDER.indexOf(doc.group)) / 100; // tie-break only: lessons & labs first
    scored.push({ doc, score });
  }
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.doc);
}
