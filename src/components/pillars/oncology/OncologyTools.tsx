import React, { useMemo, useState } from 'react';
import { ShieldCheck, Siren, CheckCircle2, AlertTriangle } from 'lucide-react';

/**
 * OncologyTools.tsx — 癌症防治與腫瘤照護專區臨床互動工具
 * 1. TaiwanCancerScreeningChecker：台灣國健署公費癌症篩檢個人化資格試算器
 * 2. CancerTenRedFlagChecker：十大癌症早期警訊自我檢核與看診科別導航
 */

// ── 1. Personalized Taiwan Free Cancer Screening Eligibility Checker ─────────
export const TaiwanCancerScreeningChecker: React.FC = () => {
  const [age, setAge] = useState<number>(50);
  const [sex, setSex] = useState<'female' | 'male'>('female');
  const [smokePackYears, setSmokePackYears] = useState<boolean>(false);
  const [betelOrSmoke, setBetelOrSmoke] = useState<boolean>(false);
  const [familyLung, setFamilyLung] = useState<boolean>(false);
  const [familyCrc, setFamilyCrc] = useState<boolean>(false);

  const recommendations = useMemo(() => {
    const list: { title: string; badge: string; detail: string; urgent?: boolean }[] = [];

    // 1. Lung Cancer LDCT
    const lungByFamily = (sex === 'female' && age >= 40 && age <= 74 && familyLung) || (sex === 'male' && age >= 45 && age <= 74 && familyLung);
    const lungBySmoke = age >= 50 && age <= 74 && smokePackYears;
    if (lungByFamily || lungBySmoke) {
      list.push({
        title: '✅ 公費「低劑量胸部電腦斷層（LDCT）」肺癌篩檢',
        badge: '每 2 年 1 次免費',
        detail: '您符合國健署肺癌高風險公費篩檢資格！LDCT 是唯一能揪出 < 1 公分早期毛玻璃肺腺癌的工具，請攜帶健保卡至合約醫院胸腔科或健檢中心預約。',
        urgent: true,
      });
    }

    // 2. Colorectal Cancer iFOBT
    if ((age >= 45 && age <= 74) || (age >= 40 && age <= 44 && familyCrc)) {
      list.push({
        title: '✅ 公費「定量免疫法糞便潛血檢查（iFOBT）」大腸癌篩檢',
        badge: '每 2 年 1 次免費',
        detail: '攜帶健保卡至全台健保特約診所或醫院即可領取採便管，不需限制飲食；若結果為陽性，務必於 3 個月內安排全大腸鏡檢查！',
      });
    }

    // 3. Breast Cancer Mammography
    if (sex === 'female' && age >= 40 && age <= 74) {
      list.push({
        title: '✅ 公費「乳房 X 光攝影檢查」乳癌篩檢',
        badge: '每 2 年 1 次免費',
        detail: '40–74 歲女性每 2 年可免費做 1 次乳房攝影，能精準抓出無症狀第 0 期原位癌的微鈣化點；建議避開生理期前一週檢查以減輕夾緊脹痛，並搭配乳房超音波互補。',
      });
    }

    // 4. Cervical Cancer Pap Smear & HPV
    if (sex === 'female' && age >= 25) {
      const hpvYear = age === 35 || age === 45 || age === 65;
      list.push({
        title: `✅ 公費「子宮頸抹片檢查」${hpvYear ? '＋ 當年度免費「HPV 人類乳突病毒檢測」' : ''}`,
        badge: age >= 30 ? '每年 1 次免費' : '25–29歲每 3 年 1 次',
        detail: '25–29 歲每 3 年 1 次、30 歲以上每年 1 次公費抹片；且滿 35、45、65 歲當年度加碼 1 次免費高風險 HPV DNA 檢測。',
      });
    }

    // 5. Oral Cancer Mucosal Exam
    if (betelOrSmoke && age >= 30) {
      list.push({
        title: '✅ 公費「口腔黏膜視觸診檢查」口腔癌篩檢',
        badge: '每 2 年 1 次免費',
        detail: '凡 30 歲以上有吸菸或嚼檳榔（含已戒除者），每 2 年可至牙科或耳鼻喉科免費檢查口腔紅斑、白斑與潰瘍。',
      });
    }

    // 6. Hepatitis B/C & H. pylori
    if (age >= 45 && age <= 79) {
      list.push({
        title: '✅ 公費「B、C 型肝炎篩檢」與「幽門螺旋桿菌胃癌篩檢」',
        badge: '終身免費篩檢',
        detail: '45–79 歲（原住民 40 歲）享終身 1 次免費 B/C 肝抽血篩檢（C 肝陽性健保全額給付口服新藥根治），並可洽詢國健署公費糞便幽門桿菌抗原篩檢預防胃癌。',
      });
    }

    if (list.length === 0) {
      list.push({
        title: '💡 一般風險族群主動健康管理建議',
        badge: '定期追蹤',
        detail: '您目前年齡尚未進入多數公費癌篩區間，若有B肝帶原請每半年做腹部超音波，女性可考慮接種九價 HPV 疫苗與定期乳房超音波，有家族史者請提早與醫師討論自費篩檢。',
      });
    }

    return list;
  }, [age, sex, smokePackYears, betelOrSmoke, familyLung, familyCrc]);

  return (
    <section
      className="rounded-2xl border-2 border-rose-200 dark:border-rose-900/70 bg-white dark:bg-slate-900/60 p-4 sm:p-5 space-y-4"
      aria-labelledby="tw-screen-checker-title"
    >
      <div className="flex items-center gap-2">
        <ShieldCheck className="w-5 h-5 text-rose-600 dark:text-rose-400" aria-hidden="true" />
        <h3 id="tw-screen-checker-title" className="text-base font-bold text-slate-900 dark:text-white">
          互動工具：台灣國健署「擴大公費癌症篩檢」個人化資格快篩
        </h3>
      </div>
      <p className="text-[13px] text-slate-600 dark:text-slate-400">
        輸入您的年齡、生理性別與風險因子，10 秒列出您今年拿健保卡就能免費做的國家級防癌檢查。
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <label className="block space-y-1">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">目前年齡（歲）</span>
          <input
            type="number"
            min={18}
            max={95}
            value={age}
            onChange={(e) => setAge(Number(e.target.value) || 18)}
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm font-bold text-slate-900 dark:text-white"
          />
        </label>

        <div className="space-y-1">
          <span className="block text-xs font-bold text-slate-700 dark:text-slate-300">生理性別</span>
          <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="生理性別">
            {[
              { k: 'female' as const, label: '女性' },
              { k: 'male' as const, label: '男性' },
            ].map((g) => (
              <button
                key={g.k}
                type="button"
                role="radio"
                aria-checked={sex === g.k}
                onClick={() => setSex(g.k)}
                className={`rounded-xl border py-2 text-xs font-bold transition-colors ${
                  sex === g.k
                    ? 'bg-rose-600 text-white border-rose-600 dark:bg-rose-500'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1.5 pt-1">
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200 cursor-pointer">
            <input
              type="checkbox"
              checked={familyLung}
              onChange={(e) => setFamilyLung(e.target.checked)}
              className="rounded border-slate-300 text-rose-600 focus:ring-rose-500"
            />
            父母、子女或兄弟姊妹曾罹患「肺癌」
          </label>
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200 cursor-pointer">
            <input
              type="checkbox"
              checked={familyCrc}
              onChange={(e) => setFamilyCrc(e.target.checked)}
              className="rounded border-slate-300 text-rose-600 focus:ring-rose-500"
            />
            父母、子女或兄弟姊妹曾罹患「大腸癌」
          </label>
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200 cursor-pointer">
            <input
              type="checkbox"
              checked={smokePackYears}
              onChange={(e) => setSmokePackYears(e.target.checked)}
              className="rounded border-slate-300 text-rose-600 focus:ring-rose-500"
            />
            重度吸菸史（≥ 20 包-年，如每天1包抽20年）
          </label>
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200 cursor-pointer">
            <input
              type="checkbox"
              checked={betelOrSmoke}
              onChange={(e) => setBetelOrSmoke(e.target.checked)}
              className="rounded border-slate-300 text-rose-600 focus:ring-rose-500"
            />
            有吸菸或嚼檳榔習慣（含已戒除者）
          </label>
        </div>
      </div>

      <div className="space-y-2.5" role="status" aria-live="polite">
        {recommendations.map((rec) => (
          <div
            key={rec.title}
            className={`rounded-xl border p-3.5 space-y-1 ${
              rec.urgent
                ? 'border-rose-300 dark:border-rose-800 bg-rose-50/70 dark:bg-rose-950/30'
                : 'border-emerald-200 dark:border-emerald-800/80 bg-emerald-50/50 dark:bg-emerald-950/20'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-[13.5px] font-bold text-slate-900 dark:text-white">{rec.title}</span>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-emerald-700 dark:text-emerald-300">
                {rec.badge}
              </span>
            </div>
            <p className="text-[12.5px] text-slate-700 dark:text-slate-300 leading-relaxed">{rec.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

// ── 2. Ten Early Cancer Warning Signs & Specialist Triage Tool ───────────────
const RED_FLAG_ITEMS = [
  {
    id: 'oral',
    symptom: '口腔同一個位置潰瘍（嘴破）超過 2 週未癒合，或口腔出現白斑、紅斑、摸到硬塊、張口受限',
    dept: '耳鼻喉頭頸外科 ／ 口腔顎面外科',
    note: '切勿只擦口內膏！口腔潰瘍 > 14 天不癒合必須做組織切片排除早期口腔癌。',
  },
  {
    id: 'swallow',
    symptom: '吃東西覺得胸口卡卡的（進行性吞嚥困難：先乾飯卡、後來連稀飯也卡），或長期不明原因聲音沙啞 > 2 週',
    dept: '胃腸肝膽科（胃鏡） ／ 耳鼻喉科（內視鏡）',
    note: '高度警覺食道癌、賁門胃癌、下咽喉癌或肺癌縱膈腔淋巴結壓迫返喉神經。',
  },
  {
    id: 'lung_cough',
    symptom: '持續乾咳超過 3 週未改善、咳痰帶血絲、不明原因胸痛或走平路變得容易喘',
    dept: '胸腔內科 ／ 胸腔外科',
    note: '一般胸部 X 光常有死角，建議由醫師評估安排低劑量胸部電腦斷層（LDCT）或支氣管鏡。',
  },
  {
    id: 'breast_lump',
    symptom: '乳房摸到無痛性且邊緣不規則的硬塊、單側乳頭流出暗紅血水、乳頭凹陷或乳房皮膚呈橘皮樣凹陷',
    dept: '乳房外科（一般外科）',
    note: '85% 以上早期乳癌硬塊是「完全不痛」的！請安排乳房攝影＋超音波與必要的粗針穿刺切片。',
  },
  {
    id: 'stool_anemia',
    symptom: '排便習慣改變超過 2 週、大便變細、解黏液血便／瀝青黑便，或成人出現「不明原因缺鐵性貧血」',
    dept: '胃腸肝膽科 ／ 大腸直腸外科',
    note: '右側大腸癌與胃癌常以貧血頭暈表現；左側大腸與直腸癌則常以血便與大便變細表現，切勿自己當成痔瘡！',
  },
  {
    id: 'pancreas_dm',
    symptom: '50 歲後無家族史卻「突然新發生糖尿病」、合併非刻意體重減輕、上腹悶痛像鑽子刺向後背或無痛性眼黃茶色尿',
    dept: '胃腸肝膽科（胰膽專科）',
    note: '此為「癌王」胰臟癌與膽道癌最重要的早期組合警訊，需安排增強型胰臟 CT/MRI 或內視鏡超音波 (EUS)。',
  },
  {
    id: 'post_meno_bleed',
    symptom: '女性「停經後」出現任何一點陰道出血、粉色或褐色分泌物，或未停經但非經期異常大量出血',
    dept: '婦產科（婦癌專科）',
    note: '切記：子宮頸抹片正常不能排除「子宮內膜癌」！停經後出血務必做陰道超音波量內膜厚度並採樣。',
  },
  {
    id: 'hematuria',
    symptom: '無痛性血尿（尿液呈洗肉水紅或暗褐色，卻完全沒有頻尿尿痛等發炎症狀）',
    dept: '泌尿科',
    note: '會痛的血尿多為結石或膀胱炎；「完全不痛的間歇性血尿」則是膀胱癌、腎盂輸尿管泌尿道上皮癌與腎細胞癌的首要警訊！',
  },
  {
    id: 'lymph_b',
    symptom: '頸部、鎖骨上、腋下或鼠蹊部摸到「不痛、偏硬像橡皮擦、> 2 公分且持續變大」的腫塊，伴隨夜間盜汗、不明發燒或半年體重掉 > 10%',
    dept: '血液腫瘤科 ／ 耳鼻喉頭頸外科',
    note: '此為惡性淋巴瘤、鼻咽癌頸部轉移或消化道癌症鎖骨上淋巴轉移（Virchow node）的典型警訊。',
  },
];

export const CancerRedFlagChecker: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>(['oral']);

  const toggle = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const activeItems = RED_FLAG_ITEMS.filter((i) => selectedIds.includes(i.id));

  return (
    <section
      className="rounded-2xl border-2 border-amber-200 dark:border-amber-900/70 bg-white dark:bg-slate-900/60 p-4 sm:p-5 space-y-4"
      aria-labelledby="cancer-redflag-title"
    >
      <div className="flex items-center gap-2">
        <Siren className="w-5 h-5 text-amber-600 dark:text-amber-400" aria-hidden="true" />
        <h3 id="cancer-redflag-title" className="text-base font-bold text-slate-900 dark:text-white">
          互動工具：身體出現這些「持續超過 2 週」的異常？9 大早期警訊與看診科別導航
        </h3>
      </div>
      <p className="text-[13px] text-slate-600 dark:text-slate-400">
        勾選您或家人目前符合的症狀，系統將顯示對應的專科門診與標準確認檢查（避免掛錯科或做錯檢查延誤黃金期）。
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {RED_FLAG_ITEMS.map((item) => {
          const checked = selectedIds.includes(item.id);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => toggle(item.id)}
              aria-pressed={checked}
              className={`rounded-xl border p-3 text-left transition-all flex gap-2.5 items-start ${
                checked
                  ? 'border-rose-500 bg-rose-50/80 dark:bg-rose-950/35 text-rose-950 dark:text-rose-100'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 text-slate-700 dark:text-slate-300 hover:border-amber-400'
              }`}
            >
              {checked ? (
                <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" aria-hidden="true" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" aria-hidden="true" />
              )}
              <span className="text-[12.5px] font-semibold leading-snug">{item.symptom}</span>
            </button>
          );
        })}
      </div>

      {activeItems.length > 0 && (
        <div className="space-y-2 pt-1" role="status" aria-live="polite">
          {activeItems.map((a) => (
            <div
              key={a.id}
              className="rounded-xl border border-rose-300 dark:border-rose-800 bg-white dark:bg-slate-900 p-3.5 space-y-1"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold text-rose-700 dark:text-rose-300">建議優先掛號：{a.dept}</span>
              </div>
              <p className="text-[13px] text-slate-700 dark:text-slate-300">{a.note}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
