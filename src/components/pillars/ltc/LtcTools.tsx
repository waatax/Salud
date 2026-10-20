import React, { useMemo, useState } from 'react';
import { Calculator, ClipboardCheck, Copy, Check, Printer, RotateCcw, Scale, UserCheck, HeartPulse, Phone, Wallet } from 'lucide-react';
import { copyText } from '../../../utils/copyText';
import {
  BARTHEL_ITEMS,
  BARTHEL_BANDS,
  barthelBand,
  CARE_QUOTA,
  TRANSPORT_QUOTA,
  RESPITE_QUOTA,
  ASSISTIVE_QUOTA,
  SMART_ASSISTIVE_QUOTA,
  COPAY_CARE,
  COPAY_ASSISTIVE,
  WELFARE_LABEL,
  WelfareStatus,
  FRAILTY_ITEMS,
  STRAIN_ITEMS,
  FACILITY_CHECKLIST,
} from '../../../data/ltcData';

/**
 * Interactive helpers for the long-term-care zone. Each one turns a rule or a scale into
 * an answer a family can act on, and says plainly that the 照管中心, the hospital or the
 * Ministry of Labor makes the official determination.
 */

const fmt = (n: number) => Math.round(n).toLocaleString('zh-TW');

const TONE_BOX = {
  good: 'border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-950 dark:text-emerald-100',
  neutral: 'border-sky-300 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/30 text-sky-950 dark:text-sky-100',
  warn: 'border-amber-400 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/30 text-amber-950 dark:text-amber-100',
  bad: 'border-rose-400 dark:border-rose-700 bg-rose-50 dark:bg-rose-950/40 text-rose-950 dark:text-rose-100',
} as const;

const ToolCard: React.FC<{ id: string; icon: typeof Calculator; title: string; lead: string; children: React.ReactNode }> = ({ id, icon: Icon, title, lead, children }) => (
  <section className="rounded-2xl border-2 border-teal-200 dark:border-teal-900/70 bg-white dark:bg-slate-900/60 p-4 sm:p-5 space-y-4 print-avoid-break" aria-labelledby={id}>
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <Icon className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0" aria-hidden="true" />
        <h3 id={id} className="text-base font-bold text-slate-900 dark:text-white">
          互動工具：{title}
        </h3>
      </div>
      <p className="text-[13px] leading-relaxed text-slate-600 dark:text-slate-400">{lead}</p>
    </div>
    {children}
  </section>
);

const Chip: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode; role?: string }> = ({ active, onClick, children, role = 'radio' }) => (
  <button
    type="button"
    role={role}
    aria-checked={active}
    onClick={onClick}
    className={`btn-tactile rounded-xl border px-3 py-2 text-[13px] leading-snug text-left transition-colors ${
      active
        ? 'bg-teal-700 border-teal-700 text-white dark:bg-teal-400 dark:border-teal-400 dark:text-teal-950 font-semibold'
        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:border-teal-400'
    }`}
  >
    {children}
  </button>
);

const CopyButton: React.FC<{ text: string; label?: string }> = ({ text, label = '複製結果' }) => {
  const [ok, setOk] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        if (await copyText(text)) {
          setOk(true);
          window.setTimeout(() => setOk(false), 1800);
        }
      }}
      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 dark:border-slate-600 px-2.5 py-1.5 text-[12px] font-semibold text-slate-700 dark:text-slate-200 hover:border-teal-500"
    >
      {ok ? <Check className="w-3.5 h-3.5" aria-hidden="true" /> : <Copy className="w-3.5 h-3.5" aria-hidden="true" />}
      {ok ? '已複製' : label}
    </button>
  );
};

// ── 巴氏量表計分器 ────────────────────────────────────────────────────────────

type AgeBand = 'u80' | '80' | '85';
const AGE_LABEL: Record<AgeBand, string> = { u80: '未滿 80 歲', '80': '80–84 歲', '85': '85 歲以上' };

export const BarthelCalculator: React.FC = () => {
  const initial = useMemo(() => Object.fromEntries(BARTHEL_ITEMS.map((i) => [i.id, i.options[0].score])), []);
  const [scores, setScores] = useState<Record<string, number>>(initial);
  const [age, setAge] = useState<AgeBand>('u80');
  const total = Object.values(scores).reduce((s, v) => s + v, 0);
  const band = barthelBand(total);
  const anyLoss = BARTHEL_ITEMS.some((i) => scores[i.id] < i.options[0].score);

  const foreign =
    age === '85'
      ? anyLoss
        ? { ok: true, text: '85 歲以上：已有項目失能（輕度依賴以上），符合評估途徑門檻；且 80 歲以上依 2025-08 新制可免評估申請。' }
        : { ok: true, text: '85 歲以上依 2025-08 新制屬 80 歲以上，可免醫療評估申請（仍需國內求才）。' }
      : age === '80'
      ? { ok: true, text: `80–84 歲依 2025-08 新制可免評估申請；若走評估途徑，門檻為 60 分以下（目前 ${total} 分${total <= 60 ? '，符合' : '，未達'}）。` }
      : total <= 35
      ? { ok: true, text: `未滿 80 歲：${total} 分在 35 分以下，通常可認定有全日照護需要（以醫院團隊評估為準）。` }
      : { ok: false, text: `未滿 80 歲：${total} 分高於 35 分，需醫師詳述全日照護理由；70–79 歲癌症二期以上、特定身障重度以上等可免評，請用下方「外看資格判斷」再確認。` };

  const summary = `巴氏量表自評 ${total} 分（${band.label}）\n${BARTHEL_ITEMS.map((i) => `${i.name}：${scores[i.id]}`).join('、')}\n※ 自評結果僅供參考，正式分數由醫院醫師評估。`;

  return (
    <ToolCard id="barthel-h" icon={Calculator} title="巴氏量表（Barthel Index）計分器" lead="依長輩「最近一週最常見的狀況」逐項點選。結果可複製帶去門診或照管評估，正式分數仍由醫院醫師判定。">
      <div className="grid gap-3 lg:grid-cols-2">
        {BARTHEL_ITEMS.map((item, idx) => (
          <fieldset key={item.id} className="rounded-xl border border-slate-200 dark:border-slate-700 p-3 space-y-2">
            <legend className="px-1 text-[14px] font-bold text-slate-900 dark:text-white">
              {idx + 1}. {item.name}
              <span className="ml-2 text-[12px] font-semibold text-teal-700 dark:text-teal-300">{scores[item.id]} 分</span>
            </legend>
            <div className="space-y-1.5" role="radiogroup" aria-label={item.name}>
              {item.options.map((o) => (
                <label
                  key={o.score}
                  className={`flex gap-2 items-start rounded-lg border px-2.5 py-2 text-[13px] leading-snug cursor-pointer transition-colors ${
                    scores[item.id] === o.score
                      ? 'border-teal-500 bg-teal-50 dark:bg-teal-950/40 text-slate-900 dark:text-white'
                      : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-teal-300'
                  }`}
                >
                  <input
                    type="radio"
                    name={`barthel-${item.id}`}
                    className="mt-0.5 accent-teal-600"
                    checked={scores[item.id] === o.score}
                    onChange={() => setScores((s) => ({ ...s, [item.id]: o.score }))}
                  />
                  <span>
                    <strong className="tabular-nums">{o.score}</strong>　{o.label}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        ))}
      </div>

      <div className={`rounded-2xl border-2 p-4 space-y-3 ${TONE_BOX[band.tone]}`} role="status" aria-live="polite">
        <div className="flex flex-wrap items-baseline gap-3">
          <p className="text-3xl font-display font-bold tabular-nums">{total}<span className="text-base font-semibold"> / 100</span></p>
          <p className="text-lg font-bold">{band.label}</p>
        </div>
        <div className="relative h-3 rounded-full overflow-hidden flex" aria-hidden="true">
          {BARTHEL_BANDS.map((b) => (
            <div
              key={b.label}
              className={b.tone === 'bad' ? 'bg-rose-400/70' : b.tone === 'warn' ? 'bg-amber-400/70' : b.tone === 'neutral' ? 'bg-sky-400/70' : 'bg-emerald-500/80'}
              style={{ width: `${((b.max - b.min + 1) / 101) * 100}%` }}
            />
          ))}
          <div className="absolute top-[-3px] h-[18px] w-1 rounded bg-slate-900 dark:bg-white" style={{ left: `calc(${(total / 100) * 100}% - 2px)` }} />
        </div>
        <div className="flex justify-between text-[10px] opacity-80 tabular-nums" aria-hidden="true">
          <span>0</span><span>20</span><span>60</span><span>90</span><span>100</span>
        </div>
        <p className="text-[14px] leading-relaxed">{band.hint}</p>
        <div className="rounded-xl bg-white/70 dark:bg-slate-950/40 p-3 space-y-2">
          <p className="text-[12px] font-bold opacity-80">外籍看護申請參考（被看護者年齡）</p>
          <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label="被看護者年齡">
            {(Object.keys(AGE_LABEL) as AgeBand[]).map((a) => (
              <Chip key={a} active={age === a} onClick={() => setAge(a)}>
                {AGE_LABEL[a]}
              </Chip>
            ))}
          </div>
          <p className="text-[13px] leading-relaxed">
            {foreign.ok ? '✅ ' : 'ℹ️ '}
            {foreign.text}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <CopyButton text={summary} />
          <button
            type="button"
            onClick={() => setScores(initial)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 dark:border-slate-600 px-2.5 py-1.5 text-[12px] font-semibold text-slate-700 dark:text-slate-200 hover:border-teal-500"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            重新計分
          </button>
        </div>
      </div>
    </ToolCard>
  );
};

// ── 長照四包錢試算 ─────────────────────────────────────────────────────────────

export const LtcBudgetCalculator: React.FC = () => {
  const [level, setLevel] = useState(5);
  const [welfare, setWelfare] = useState<WelfareStatus>('general');
  const [foreign, setForeign] = useState(false);
  const [area, setArea] = useState(1);

  const care = CARE_QUOTA[level] * (foreign ? 0.3 : 1);
  const careCopay = care * COPAY_CARE[welfare];
  const t = TRANSPORT_QUOTA.find((x) => x.cls === area) ?? TRANSPORT_QUOTA[0];
  const transport = level >= 4 ? t.amount : 0;
  const transportRate = welfare === 'low' ? 0 : welfare === 'mid' ? t.copayMid : t.copayGeneral;
  const respite = RESPITE_QUOTA(level);
  const max = CARE_QUOTA[8];

  const rows = [
    { name: '照顧及專業服務（每月）', amount: care, copay: careCopay, note: foreign ? '外看家庭以專業服務為主，額度約為一般家庭 30%（估算）' : `自付 ${Math.round(COPAY_CARE[welfare] * 100)}%` },
    { name: '交通接送（每月）', amount: transport, copay: transport * transportRate, note: level >= 4 ? `${t.label}，自付 ${Math.round(transportRate * 100)}%` : '限長照 4 級以上' },
    { name: '喘息服務（每年）', amount: respite, copay: respite * COPAY_CARE[welfare], note: level >= 7 ? '7–8 級額度' : '2–6 級額度' },
    { name: '輔具及居家無障礙（每 3 年）', amount: ASSISTIVE_QUOTA, copay: ASSISTIVE_QUOTA * COPAY_ASSISTIVE[welfare], note: `自付 ${Math.round(COPAY_ASSISTIVE[welfare] * 100)}%` },
    { name: '智慧科技輔具租賃（每 3 年，2026-07 起）', amount: SMART_ASSISTIVE_QUOTA, copay: SMART_ASSISTIVE_QUOTA * COPAY_ASSISTIVE[welfare], note: '五大類租賃，自付比例依身分（以公告為準）' },
  ];

  const summary = `長照試算：${level} 級・${WELFARE_LABEL[welfare]}${foreign ? '・聘外看' : ''}\n${rows.map((r) => `${r.name}：額度 ${fmt(r.amount)} 元，用滿自付約 ${fmt(r.copay)} 元`).join('\n')}\n※ 試算僅供參考，以長照管理中心核定為準。`;

  return (
    <ToolCard id="budget-h" icon={Wallet} title="長照四包錢試算器" lead="選擇長照需要等級、福利身分與居住地區，看看每項給付的額度，以及「全部用滿」時大約要自付多少。">
      <div className="space-y-3">
        <div className="space-y-1.5">
          <p className="text-[12px] font-semibold text-slate-500 dark:text-slate-400">長照需要等級（CMS）</p>
          <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label="長照需要等級">
            {[2, 3, 4, 5, 6, 7, 8].map((l) => (
              <Chip key={l} active={level === l} onClick={() => setLevel(l)}>
                第 {l} 級
              </Chip>
            ))}
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-1.5">
            <p className="text-[12px] font-semibold text-slate-500 dark:text-slate-400">福利身分</p>
            <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label="福利身分">
              {(Object.keys(WELFARE_LABEL) as WelfareStatus[]).map((w) => (
                <Chip key={w} active={welfare === w} onClick={() => setWelfare(w)}>
                  {WELFARE_LABEL[w]}
                </Chip>
              ))}
            </div>
          </div>
          <div className="space-y-1.5">
            <p className="text-[12px] font-semibold text-slate-500 dark:text-slate-400">是否聘僱外籍看護</p>
            <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label="是否聘僱外籍看護">
              <Chip active={!foreign} onClick={() => setForeign(false)}>沒有</Chip>
              <Chip active={foreign} onClick={() => setForeign(true)}>有聘外看</Chip>
            </div>
          </div>
        </div>
        <div className="space-y-1.5">
          <p className="text-[12px] font-semibold text-slate-500 dark:text-slate-400">交通接送地區類別</p>
          <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label="交通接送地區類別">
            {TRANSPORT_QUOTA.map((x) => (
              <Chip key={x.cls} active={area === x.cls} onClick={() => setArea(x.cls)}>
                {x.label}
              </Chip>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 p-4 space-y-3" role="status" aria-live="polite">
        <div className="space-y-1">
          <div className="flex justify-between text-[12px] text-slate-600 dark:text-slate-400">
            <span>照顧及專業服務每月額度</span>
            <span className="tabular-nums">{fmt(care)} / {fmt(max)} 元</span>
          </div>
          <div className="h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden" aria-hidden="true">
            <div className="h-full rounded-full bg-gradient-to-r from-teal-500 to-emerald-500" style={{ width: `${(care / max) * 100}%` }} />
          </div>
        </div>
        <ul className="divide-y divide-slate-100 dark:divide-slate-800">
          {rows.map((r) => (
            <li key={r.name} className="py-2 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
              <span className="flex-1 text-[14px] font-semibold text-slate-800 dark:text-slate-100">{r.name}</span>
              <span className="text-[14px] tabular-nums text-slate-900 dark:text-white">額度 <strong>{fmt(r.amount)}</strong> 元</span>
              <span className="text-[13px] tabular-nums text-teal-700 dark:text-teal-300">用滿自付約 {fmt(r.copay)} 元</span>
              <span className="text-[12px] text-slate-500 dark:text-slate-400 sm:w-56">{r.note}</span>
            </li>
          ))}
        </ul>
        <p className="text-[12px] leading-relaxed text-slate-500 dark:text-slate-400">
          額度依長期照顧服務申請及給付辦法（2025–2026 年修正）；「用多少付多少」、當月未用完不累積。實際核定、外看家庭可用項目與自付比例以長照管理中心為準。
        </p>
        <CopyButton text={summary} />
      </div>
    </ToolCard>
  );
};

// ── 外籍看護資格判斷 ───────────────────────────────────────────────────────────

type Cancer = 'none' | 'stage2' | 'stage4';

export const ForeignEligibilityChecker: React.FC = () => {
  const [age, setAge] = useState(78);
  const [cancer, setCancer] = useState<Cancer>('none');
  const [bedridden, setBedridden] = useState(false);
  const [disability, setDisability] = useState(false);
  const [hiredBefore, setHiredBefore] = useState(false);
  const [barthel, setBarthel] = useState<number | ''>('');

  const result = useMemo(() => {
    if (age >= 80) return { tone: 'good' as const, title: '可免評估申請（80 歲以上）', detail: '2025-08-01 起免醫療機構專業評估。若只持身分證明，需先在台灣就業通刊登求才 7 天；若有醫療或長照證明，可經照管中心推介並適用重症優先。' };
    if (cancer === 'stage4') return { tone: 'good' as const, title: '可免巴氏量表重評（癌症第四期以上，不限年齡）', detail: '準備一年內有效的診斷證明，屬重症優先處理。' };
    if (age >= 70 && cancer === 'stage2') return { tone: 'good' as const, title: '可免評估申請（70–79 歲癌症二期以上）', detail: '準備癌症診斷證明書即可。' };
    if (bedridden) return { tone: 'good' as const, title: '可免巴氏量表重評（全癱無法自行下床）', detail: '準備一年內有效的相關證明，屬重症優先處理。' };
    if (disability) return { tone: 'good' as const, title: '可能免評估（特定身心障礙重度以上）', detail: '需符合勞動部公告的特定身障項目，請帶身障證明向照管中心或就業服務站確認。' };
    if (hiredBefore) return { tone: 'good' as const, title: '可免巴氏量表重評（一年內曾聘僱看護工）', detail: '準備一年內有效的證明文件。' };
    if (barthel === '') return { tone: 'neutral' as const, title: '需要醫院團隊評估（巴氏量表）', detail: '未滿 80 歲：需有全日照護需要，實務上巴氏量表約 35 分以下；超過 35 分需醫師詳述理由。可先用上方巴氏量表計分器自評。' };
    if (barthel <= 35) return { tone: 'good' as const, title: `巴氏 ${barthel} 分：可能符合全日照護需要`, detail: '請至指定醫院做正式評估並開立病症暨失能診斷證明書，再向照管中心申請推介本國照服員。' };
    return { tone: 'warn' as const, title: `巴氏 ${barthel} 分：未滿 80 歲通常不符合`, detail: '可先使用長照居家服務、日照或喘息；病情改變時再評估。若有全日照護的特殊理由，需由醫師詳述。' };
  }, [age, cancer, bedridden, disability, hiredBefore, barthel]);

  return (
    <ToolCard id="foreign-h" icon={UserCheck} title="外籍家庭看護工資格判斷" lead="依 2025-08-01 就業服務法第 46 條新制與審查標準整理。輸入被看護者的狀況，看看走「免評估」還是「巴氏量表評估」途徑。">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="space-y-1.5">
          <span className="block text-[12px] font-semibold text-slate-500 dark:text-slate-400">被看護者年齡：<strong className="text-slate-900 dark:text-white tabular-nums">{age} 歲</strong></span>
          <input type="range" min={40} max={100} value={age} onChange={(e) => setAge(Number(e.target.value))} className="w-full accent-teal-600" aria-label="被看護者年齡" />
        </label>
        <label className="space-y-1.5">
          <span className="block text-[12px] font-semibold text-slate-500 dark:text-slate-400">巴氏量表分數（如已評估，可留空）</span>
          <input
            type="number"
            min={0}
            max={100}
            step={5}
            value={barthel}
            onChange={(e) => setBarthel(e.target.value === '' ? '' : Math.max(0, Math.min(100, Number(e.target.value))))}
            className="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-3 py-2 text-[14px] text-slate-900 dark:text-white"
            placeholder="例如 30"
          />
        </label>
      </div>
      <div className="space-y-1.5">
        <p className="text-[12px] font-semibold text-slate-500 dark:text-slate-400">癌症狀況</p>
        <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label="癌症狀況">
          <Chip active={cancer === 'none'} onClick={() => setCancer('none')}>無或第一期</Chip>
          <Chip active={cancer === 'stage2'} onClick={() => setCancer('stage2')}>第二、三期</Chip>
          <Chip active={cancer === 'stage4'} onClick={() => setCancer('stage4')}>第四期以上</Chip>
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5">
        <Chip role="checkbox" active={bedridden} onClick={() => setBedridden((v) => !v)}>全癱、無法自行下床</Chip>
        <Chip role="checkbox" active={disability} onClick={() => setDisability((v) => !v)}>特定身心障礙重度以上</Chip>
        <Chip role="checkbox" active={hiredBefore} onClick={() => setHiredBefore((v) => !v)}>一年內曾聘僱看護工</Chip>
      </div>
      <div className={`rounded-2xl border-2 p-4 space-y-1.5 ${TONE_BOX[result.tone]}`} role="status" aria-live="polite">
        <p className="text-[15px] font-bold">{result.title}</p>
        <p className="text-[14px] leading-relaxed">{result.detail}</p>
        <p className="text-[12px] opacity-80">※ 僅供初步判斷；正式資格以勞動部勞動力發展署、長期照顧管理中心審查為準。</p>
      </div>
    </ToolCard>
  );
};

// ── 衰弱自評 ───────────────────────────────────────────────────────────────────

export const FrailtyCheck: React.FC = () => {
  const [picked, setPicked] = useState<string[]>([]);
  const n = picked.length;
  const res =
    n >= 3
      ? { tone: 'bad' as const, label: '衰弱', text: '建議到家醫科或老年醫學科做完整評估（周全性老年評估），並開始運動與營養處方；可申請長照評估。' }
      : n >= 1
      ? { tone: 'warn' as const, label: '衰弱前期', text: '這是最能逆轉的階段：每週 3 天肌力平衡運動、每餐足量蛋白質，並參加社區據點的預防延緩失能課程。' }
      : { tone: 'good' as const, label: '目前未見衰弱', text: '維持規律運動與社交，65 歲起每年做一次長者功能評估（ICOPE）。' };
  return (
    <ToolCard id="frailty-h" icon={Scale} title="衰弱五項自評（Fried 表型）" lead="勾選過去一年內符合的狀況。這是簡化的居家版本，正式評估會量握力與步行速度。">
      <div className="space-y-1.5">
        {FRAILTY_ITEMS.map((f) => (
          <label key={f.id} className="flex items-start gap-2 rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-2 text-[14px] text-slate-800 dark:text-slate-200 cursor-pointer hover:border-teal-400">
            <input
              type="checkbox"
              className="mt-1 accent-teal-600"
              checked={picked.includes(f.id)}
              onChange={() => setPicked((p) => (p.includes(f.id) ? p.filter((x) => x !== f.id) : [...p, f.id]))}
            />
            {f.label}
          </label>
        ))}
      </div>
      <div className={`rounded-2xl border-2 p-4 space-y-1 ${TONE_BOX[res.tone]}`} role="status" aria-live="polite">
        <p className="text-[15px] font-bold">
          {n} / 5 項：{res.label}
        </p>
        <p className="text-[14px] leading-relaxed">{res.text}</p>
      </div>
    </ToolCard>
  );
};

// ── 照顧者負荷自我檢核 ─────────────────────────────────────────────────────────

export const CaregiverStrainCheck: React.FC = () => {
  const [picked, setPicked] = useState<string[]>([]);
  const n = picked.length;
  const danger = picked.includes('harm');
  const res = danger
    ? { tone: 'bad' as const, label: '請立即求助', text: '你承受的壓力已經非常大。請現在撥打安心專線 1925（24 小時），或告訴身邊信任的人；也請撥 1966 申請緊急喘息。' }
    : n >= 4
    ? { tone: 'bad' as const, label: '高負荷照顧者', text: '建議本週就撥 1966，請照管中心轉介家庭照顧者支持服務據點、安排規律喘息，並檢視是否需要增加居家服務、日照或外看。' }
    : n >= 2
    ? { tone: 'warn' as const, label: '負荷偏高', text: '開始固定使用喘息服務、找一位可輪替的家人，並把自己的就醫與睡眠排進行程。' }
    : { tone: 'good' as const, label: '目前尚可', text: '持續留意自己的睡眠與情緒，提前認識喘息與社區資源，需要時就不會手忙腳亂。' };
  return (
    <ToolCard id="strain-h" icon={HeartPulse} title="照顧者負荷自我檢核" lead="勾選最近一個月符合你的狀況。整理自高負荷家庭照顧者的常見風險因子，用來幫助你決定何時求助，不是診斷。">
      <div className="grid gap-1.5 sm:grid-cols-2">
        {STRAIN_ITEMS.map((f) => (
          <label
            key={f.id}
            className={`flex items-start gap-2 rounded-lg border px-3 py-2 text-[14px] cursor-pointer ${
              f.id === 'harm' ? 'border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200' : 'border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200'
            } hover:border-teal-400`}
          >
            <input
              type="checkbox"
              className="mt-1 accent-teal-600"
              checked={picked.includes(f.id)}
              onChange={() => setPicked((p) => (p.includes(f.id) ? p.filter((x) => x !== f.id) : [...p, f.id]))}
            />
            {f.label}
          </label>
        ))}
      </div>
      <div className={`rounded-2xl border-2 p-4 space-y-2 ${TONE_BOX[res.tone]}`} role="status" aria-live="polite">
        <p className="text-[15px] font-bold">
          {n} / {STRAIN_ITEMS.length} 項：{res.label}
        </p>
        <p className="text-[14px] leading-relaxed">{res.text}</p>
        <div className="flex flex-wrap gap-2 text-[13px] font-semibold">
          <a href="tel:1925" className="inline-flex items-center gap-1 rounded-lg bg-white/70 dark:bg-slate-950/40 px-2.5 py-1.5"><Phone className="w-3.5 h-3.5" aria-hidden="true" />安心專線 1925</a>
          <a href="tel:1966" className="inline-flex items-center gap-1 rounded-lg bg-white/70 dark:bg-slate-950/40 px-2.5 py-1.5"><Phone className="w-3.5 h-3.5" aria-hidden="true" />長照專線 1966</a>
          <a href="tel:0800507272" className="inline-flex items-center gap-1 rounded-lg bg-white/70 dark:bg-slate-950/40 px-2.5 py-1.5"><Phone className="w-3.5 h-3.5" aria-hidden="true" />家總 0800-507272</a>
        </div>
      </div>
    </ToolCard>
  );
};

// ── 機構參訪檢核表 ─────────────────────────────────────────────────────────────

export const FacilityChecklist: React.FC = () => {
  const all = FACILITY_CHECKLIST.flatMap((g) => g.items);
  const [done, setDone] = useState<string[]>([]);
  const pct = Math.round((done.length / all.length) * 100);
  return (
    <ToolCard id="facility-h" icon={ClipboardCheck} title="住宿機構參訪檢核表" lead="參訪時逐項確認並勾選；建議至少比較 2–3 家，並在用餐或傍晚時段再去一次。可直接列印帶去。">
      <div className="flex items-center gap-3">
        <div className="flex-1 h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden" aria-hidden="true">
          <div className="h-full bg-teal-500 transition-all" style={{ width: `${pct}%` }} />
        </div>
        <span className="text-[13px] font-semibold tabular-nums text-slate-700 dark:text-slate-200">
          {done.length}/{all.length}
        </span>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {FACILITY_CHECKLIST.map((g) => (
          <fieldset key={g.group} className="rounded-xl border border-slate-200 dark:border-slate-700 p-3 space-y-1.5">
            <legend className="px-1 text-[14px] font-bold text-slate-900 dark:text-white">{g.group}</legend>
            {g.items.map((it) => (
              <label key={it} className="flex items-start gap-2 text-[14px] leading-snug text-slate-800 dark:text-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  className="mt-1 accent-teal-600"
                  checked={done.includes(it)}
                  onChange={() => setDone((d) => (d.includes(it) ? d.filter((x) => x !== it) : [...d, it]))}
                />
                {it}
              </label>
            ))}
          </fieldset>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 print:hidden">
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 dark:border-slate-600 px-2.5 py-1.5 text-[12px] font-semibold text-slate-700 dark:text-slate-200 hover:border-teal-500"
        >
          <Printer className="w-3.5 h-3.5" aria-hidden="true" />
          列印本章
        </button>
        <button
          type="button"
          onClick={() => setDone([])}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 dark:border-slate-600 px-2.5 py-1.5 text-[12px] font-semibold text-slate-700 dark:text-slate-200 hover:border-teal-500"
        >
          <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
          清除勾選
        </button>
      </div>
    </ToolCard>
  );
};
