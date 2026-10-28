import React, { useMemo, useState } from 'react';
import { Calculator, CalendarClock, MapPin, AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import { STOOL_COLOR_ALERTS } from '../../../data/gastroData';

/**
 * GastroTools.tsx — 肝膽腸胃科臨床互動工具
 * 1. Fib4Calculator：FIB-4 肝纖維化無創風險計算機（年齡、AST、ALT、血小板）
 * 2. AbdominalPainAndStoolTriageTool：腹部九宮格疼痛定位 ＋ 糞便顏色紅旗分流器
 * 3. BowelPrepFoodChecker：無痛大腸鏡「低渣飲食 vs 禁吃地雷」互動快篩器
 */

// ── 1. FIB-4 Non-invasive Liver Fibrosis Calculator ──────────────────────────
export const Fib4Calculator: React.FC = () => {
  const [age, setAge] = useState<number>(52);
  const [ast, setAst] = useState<number>(42);
  const [alt, setAlt] = useState<number>(48);
  const [plt, setPlt] = useState<number>(210); // 10^3 / uL (例如 210 代表 21萬)

  const result = useMemo(() => {
    const safeAlt = Math.max(1, alt);
    const safePlt = Math.max(10, plt);
    const score = (age * ast) / (safePlt * Math.sqrt(safeAlt));
    const rounded = Math.round(score * 100) / 100;

    // Age-adjusted threshold for >= 65 years old (low cutoff 2.0 instead of 1.3)
    const lowCutoff = age >= 65 ? 2.0 : 1.3;

    if (rounded < lowCutoff) {
      return {
        score: rounded,
        band: 'low' as const,
        label: `低度肝纖維化風險（FIB-4 < ${lowCutoff}）`,
        box: 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/80 dark:bg-emerald-950/30 text-emerald-950 dark:text-emerald-100',
        action:
          '目前排除顯著肝纖維化（F3–F4）的準確率超過 90%。建議透過飲食控糖、運動減重 5–7% 改善脂肪肝，並每 1–2 年於基層診所或健檢追蹤抽血與腹部超音波。',
      };
    }
    if (rounded <= 2.67) {
      return {
        score: rounded,
        band: 'mid' as const,
        label: `中度／灰色地帶風險（FIB-4 ${lowCutoff}–2.67）`,
        box: 'border-amber-300 dark:border-amber-800 bg-amber-50/80 dark:bg-amber-950/30 text-amber-950 dark:text-amber-100',
        action:
          '建議轉介至胃腸肝膽科門診，安排非侵入性「肝纖維化震波檢驗（FibroScan / VCTE）」或音波彈性成像（ARFI），進一步確認肝臟軟硬度（kPa）與脂肪定量（CAP）。',
      };
    }
    return {
      score: rounded,
      band: 'high' as const,
      label: '高度進階肝纖維化／肝硬化風險（FIB-4 > 2.67）',
      box: 'border-rose-400 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/40 text-rose-950 dark:text-rose-100',
      action:
        '⚠️ 高度懷疑已有重度肝纖維化（F3）或早期肝硬化（F4）！請務必至胃腸肝膽專科門診做超音波、FibroScan 與病因檢查（B/C 肝、自體免疫、代謝共病），並啟動每 6 個月定期肝癌篩檢。',
    };
  }, [age, ast, alt, plt]);

  return (
    <section
      className="rounded-2xl border-2 border-emerald-200 dark:border-emerald-900/70 bg-white dark:bg-slate-900/60 p-4 sm:p-5 space-y-4"
      aria-labelledby="fib4-calc-title"
    >
      <div className="flex items-center gap-2">
        <Calculator className="w-5 h-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
        <h3 id="fib4-calc-title" className="text-base font-bold text-slate-900 dark:text-white">
          互動工具：FIB-4 肝纖維化無創風險計算機（EASL / AASLD 國際指引推薦）
        </h3>
      </div>
      <p className="text-[13px] text-slate-600 dark:text-slate-400">
        輸入健檢報告常見的 4 個數值（公式：<code>年齡 × AST ÷ [血小板(10³/μL) × √ALT]</code>），立即評估脂肪肝或慢性肝炎是否已出現隱形纖維化。
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <label className="block space-y-1">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">年齡（歲）</span>
          <input
            type="number"
            min={18}
            max={100}
            value={age}
            onChange={(e) => setAge(Number(e.target.value) || 18)}
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm font-bold text-slate-900 dark:text-white"
          />
        </label>
        <label className="block space-y-1">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">AST / GOT (U/L)</span>
          <input
            type="number"
            min={5}
            max={1000}
            value={ast}
            onChange={(e) => setAst(Number(e.target.value) || 5)}
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm font-bold text-slate-900 dark:text-white"
          />
        </label>
        <label className="block space-y-1">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">ALT / GPT (U/L)</span>
          <input
            type="number"
            min={5}
            max={1000}
            value={alt}
            onChange={(e) => setAlt(Number(e.target.value) || 5)}
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm font-bold text-slate-900 dark:text-white"
          />
        </label>
        <label className="block space-y-1">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">血小板 PLT (10³/μL，如 210=21萬)</span>
          <input
            type="number"
            min={20}
            max={800}
            value={plt}
            onChange={(e) => setPlt(Number(e.target.value) || 20)}
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm font-bold text-slate-900 dark:text-white"
          />
        </label>
      </div>

      <div className={`rounded-2xl border-2 p-4 space-y-2 ${result.box}`} role="status" aria-live="polite">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <span className="text-sm font-bold">{result.label}</span>
          <span className="text-2xl font-display font-black">FIB-4 = {result.score.toFixed(2)}</span>
        </div>
        <p className="text-[13.5px] leading-relaxed">{result.action}</p>
        <p className="text-[11.5px] opacity-80">
          註：65 歲以上長者因年齡分子較大，國際指引將低風險門檻調整為 &lt; 2.0。急性肝炎發作期（AST/ALT 數百以上）或血小板疾病患者不適用此公式。
        </p>
      </div>
    </section>
  );
};

// ── 2. Abdominal 9-Region Pain & Stool Color Triage Tool ─────────────────────
interface AbdominalZone {
  id: string;
  name: string;
  organs: string;
  commonCauses: string[];
  redFlags: string;
}

const ABDOMINAL_ZONES: AbdominalZone[] = [
  {
    id: 'ruq',
    name: '右上腹（Right Upper Quadrant）',
    organs: '肝臟右葉、膽囊、總膽管、十二指腸、大腸肝曲',
    commonCauses: ['膽結石膽絞痛（常在大餐後痛並輻射到右肩胛骨）', '急性膽囊炎（按壓吸氣劇痛 Murphy sign）', '急性膽管炎、十二指腸潰瘍、急性肝炎肝腫大'],
    redFlags: '合併高燒寒顫、眼白變黃、深茶色尿（Charcot 三聯徵）需立即急診！',
  },
  {
    id: 'epi',
    name: '上腹部／心窩（Epigastric）',
    organs: '胃、十二指腸、胰臟、肝臟左葉、（下壁心肌梗塞轉移痛）',
    commonCauses: ['胃食道逆流、急慢性胃炎、消化性潰瘍', '急性胰臟炎（刀割般劇痛像鑽子刺向背後，前傾抱膝稍緩）', '功能性消化不良'],
    redFlags: '痛到背後、吐鮮血或解瀝青黑便、或伴隨胸悶冒冷汗下巴痛（小心非典型心肌梗塞！）需立即急診。',
  },
  {
    id: 'luq',
    name: '左上腹（Left Upper Quadrant）',
    organs: '脾臟、胃底與胃體、胰臟尾部、大腸脾曲',
    commonCauses: ['胃潰瘍或胃炎', '胰臟體尾部發炎或腫瘤', '脾臟腫大或外傷破裂、大腸脾曲積氣症候群'],
    redFlags: '左肋骨外傷後左上腹痛伴頭暈蒼白（小心脾臟破裂內出血）需立即急診。',
  },
  {
    id: 'rlq',
    name: '右下腹（Right Lower Quadrant）',
    organs: '闌尾（盲腸）、末端迴腸、右側卵巢與輸卵管、右側輸尿管',
    commonCauses: ['急性闌尾炎（常先肚臍周圍悶痛，4–12 小時後轉移固定到右下腹，按壓反彈劇痛）', '克隆氏症（末端迴腸炎）、大腸憩室炎（亞洲人好發右側）', '右側輸尿管結石、卵巢囊腫扭轉或子宮外孕'],
    redFlags: '肚臍痛轉移至右下腹且走路震動就痛、發燒、或育齡女性月經遲來伴劇痛需立即急診！',
  },
  {
    id: 'umb',
    name: '肚臍周圍（Periumbilical）',
    organs: '小腸、闌尾早期神經反射、腹主動脈',
    commonCauses: ['急性病毒性或細菌性腸胃炎（常伴上吐下瀉）', '急性闌尾炎極早期表現、小腸腸阻塞（絞痛、吐、不排氣）', '腸繫膜缺血（心房顫動或血管硬化長者飯後劇痛）'],
    redFlags: '年長三高患者突發腹部撕裂劇痛且摸到搏動性腫塊（腹主動脈瘤破裂）或劇痛與理學檢查不成比例（腸中風）需秒速急診！',
  },
  {
    id: 'llq',
    name: '左下腹（Left Lower Quadrant）',
    organs: '乙狀結腸、降結腸、左側卵巢與輸卵管、左側輸尿管',
    commonCauses: ['乙狀結腸憩室炎、潰瘍性結腸炎、腸躁症痙攣或宿便堆積', '乙狀結腸或直腸腫瘤阻塞', '左側輸尿管結石、左側婦科附件急症'],
    redFlags: '左下腹劇痛合併發燒、大量鮮紅或暗紅血便、無法排便排氣需盡速就醫。',
  },
];

export const AbdominalPainTriageTool: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState<string>('epi');
  const activeZone = ABDOMINAL_ZONES.find((z) => z.id === selectedZone) ?? ABDOMINAL_ZONES[1];

  return (
    <section
      className="rounded-2xl border-2 border-sky-200 dark:border-sky-900/70 bg-white dark:bg-slate-900/60 p-4 sm:p-5 space-y-4"
      aria-labelledby="abdo-triage-title"
    >
      <div className="flex items-center gap-2">
        <MapPin className="w-5 h-5 text-sky-600 dark:text-sky-400" aria-hidden="true" />
        <h3 id="abdo-triage-title" className="text-base font-bold text-slate-900 dark:text-white">
          互動工具：肚子痛在哪一格？腹部定位與急症紅旗導航
        </h3>
      </div>
      <p className="text-[13px] text-slate-600 dark:text-slate-400">
        點選最接近您疼痛的位置（注意：圖中左右以「自己身體的左右」為準），查看對應的器官、常見疾病與不能拖延的急診警訊。
      </p>

      <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="腹部疼痛區域選擇">
        {ABDOMINAL_ZONES.map((z) => {
          const active = z.id === selectedZone;
          return (
            <button
              key={z.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => setSelectedZone(z.id)}
              className={`rounded-xl border p-3 text-left transition-all ${
                active
                  ? 'border-sky-600 bg-sky-600 text-white dark:bg-sky-500 dark:border-sky-400 shadow-sm'
                  : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/70 text-slate-800 dark:text-slate-200 hover:border-sky-400'
              }`}
            >
              <span className="block text-xs font-bold">{z.name.split('（')[0]}</span>
              <span className={`block text-[10.5px] mt-0.5 line-clamp-1 ${active ? 'text-sky-100' : 'text-slate-500 dark:text-slate-400'}`}>
                {z.organs.split('、').slice(0, 2).join('、')}
              </span>
            </button>
          );
        })}
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 p-4 space-y-2.5" role="status" aria-live="polite">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">{activeZone.name}</h4>
          <span className="text-xs font-semibold text-sky-700 dark:text-sky-300 bg-sky-100/80 dark:bg-sky-950/60 px-2.5 py-0.5 rounded-full">
            對應臟器：{activeZone.organs}
          </span>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-bold text-slate-700 dark:text-slate-300">常見可能原因：</p>
          <ul className="space-y-1 text-[13.5px] text-slate-700 dark:text-slate-300">
            {activeZone.commonCauses.map((c) => (
              <li key={c} className="flex gap-1.5">
                <span className="text-sky-600 font-bold" aria-hidden="true">•</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-rose-300 dark:border-rose-800 bg-rose-50/90 dark:bg-rose-950/40 p-3 flex gap-2.5 items-start">
          <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-[13px] font-semibold text-rose-950 dark:text-rose-100">
            <strong>急診紅旗警訊：</strong>
            {activeZone.redFlags}
          </p>
        </div>
      </div>

      {/* Stool Color Quick Cards */}
      <div className="pt-2 space-y-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          糞便顏色自我警訊快篩（沖水前多看一眼）
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {STOOL_COLOR_ALERTS.map((s) => (
            <div
              key={s.color}
              className={`rounded-xl border p-3 space-y-1 ${
                s.tone === 'bad'
                  ? 'border-rose-300 dark:border-rose-800/80 bg-rose-50/50 dark:bg-rose-950/25'
                  : s.tone === 'warn'
                  ? 'border-amber-300 dark:border-amber-800/80 bg-amber-50/50 dark:bg-amber-950/25'
                  : 'border-emerald-300 dark:border-emerald-800/80 bg-emerald-50/50 dark:bg-emerald-950/25'
              }`}
            >
              <div className="flex items-center justify-between gap-1">
                <span className="text-[13px] font-bold text-slate-900 dark:text-white">{s.color}</span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700">
                  {s.badge}
                </span>
              </div>
              <p className="text-[12px] text-slate-600 dark:text-slate-300">{s.cause}</p>
              <p className="text-[12px] font-semibold text-slate-900 dark:text-slate-100">處置：{s.action}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── 3. Colonoscopy Bowel Prep Low-Residue Food Checker ───────────────────────
const PREP_FOOD_ITEMS = [
  { food: '白稀飯、白米飯、白吐司、白麵條', ok: true, reason: '精緻澱粉幾乎無殘渣，是檢查前 2–3 天補充熱量的首選主食。' },
  { food: '蒸蛋、水煮蛋白、去皮魚肉、嫩豆腐（過濾豆花）', ok: true, reason: '優質低渣蛋白質，好消化且不會在大腸壁留下纖維殘渣。' },
  { food: '澄清雞湯、無渣運動飲料、蜂蜜水（前1天流質期）', ok: true, reason: '可補充水分、電解質與糖分，預防清腸期間頭暈低血糖。' },
  { food: '奇異果、火龍果、百香果、番茄、草莓', ok: false, reason: '❌ 大忌！細小果籽無法消化，會直接塞死大腸鏡的抽吸孔導致檢查中斷！' },
  { food: '燙青菜、竹筍、金針菇、木耳、燕麥、堅果', ok: false, reason: '❌ 大忌！不溶性粗纖維會像海苔一樣黏在腸壁上，遮蔽扁平鋸齒狀息肉。' },
  { food: '鮮奶、優酪乳、起司、拿鐵咖啡、濃豆漿', ok: false, reason: '❌ 大忌！乳製品與高脂豆漿與胃酸作用後會形成乳白色凝塊糊在腸壁。' },
  { food: '葡萄汁、蔓越莓汁、紅火龍果、豬血湯', ok: false, reason: '❌ 大忌！深紅紫色色素會染色腸黏膜，干擾醫師判斷是否有黏膜出血。' },
];

export const BowelPrepFoodChecker: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'ok' | 'avoid'>('all');
  const shown = PREP_FOOD_ITEMS.filter((i) => (filter === 'all' ? true : filter === 'ok' ? i.ok : !i.ok));

  return (
    <section
      className="rounded-2xl border-2 border-amber-200 dark:border-amber-900/70 bg-white dark:bg-slate-900/60 p-4 sm:p-5 space-y-3.5"
      aria-labelledby="bowel-prep-title"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <CalendarClock className="w-5 h-5 text-amber-600 dark:text-amber-400" aria-hidden="true" />
          <h3 id="bowel-prep-title" className="text-base font-bold text-slate-900 dark:text-white">
            互動工具：大腸鏡前 3 天「低渣飲食紅綠燈」快篩
          </h3>
        </div>
        <div className="flex gap-1.5" role="group" aria-label="篩選可吃或禁吃食物">
          {[
            { k: 'all' as const, label: '全部顯示' },
            { k: 'ok' as const, label: '✅ 可以吃（低渣）' },
            { k: 'avoid' as const, label: '❌ 絕對禁吃（高渣/染色）' },
          ].map((btn) => (
            <button
              key={btn.k}
              type="button"
              onClick={() => setFilter(btn.k)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-colors ${
                filter === btn.k
                  ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
        {shown.map((item) => (
          <div
            key={item.food}
            className={`rounded-xl border p-3 flex gap-2.5 items-start ${
              item.ok
                ? 'border-emerald-200 dark:border-emerald-800/70 bg-emerald-50/40 dark:bg-emerald-950/20'
                : 'border-rose-200 dark:border-rose-800/70 bg-rose-50/40 dark:bg-rose-950/20'
            }`}
          >
            {item.ok ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
            ) : (
              <Info className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" aria-hidden="true" />
            )}
            <div className="space-y-0.5 text-[13px]">
              <p className="font-bold text-slate-900 dark:text-white">{item.food}</p>
              <p className="text-slate-600 dark:text-slate-300 text-[12px] leading-relaxed">{item.reason}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
