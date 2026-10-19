import React, { useMemo, useState } from 'react';
import { ClipboardCheck, Copy, Check, Gauge, Home, Stethoscope, Phone } from 'lucide-react';
import { FigureFrame, Callout } from '../../common/pro/Blocks';
import { ChartBody } from '../../figures/CurriculumChart';
import type { SpineTab } from '../../../config/routes';
import {
  ACUTE_72H_PLAN,
  ACUTE_RECOVERY_CURVE,
  HEAT_VS_ICE,
  SLEEP_POSITIONS,
  BOOM_BUST_CURVE,
  WHO_CHRONIC_MATRIX,
  RETURN_TO_WORK,
  PRESSURE_SITES,
  PRESSURE_STAGES,
  TURNING_CLOCK,
  TRANSFER_STEPS,
  ASSISTIVE_DEVICES,
  SCOLIOSIS_LADDER,
  IBP_VS_MECHANICAL,
  PREGNANCY_CARE,
  BACKPACK_BARS,
  FLARE_CARE_STEPS,
  HOME_SAFETY_ITEMS,
  IBP_CRITERIA,
} from '../../../data/spineCareData';

/**
 * SpineCareChapters — 脊椎照護擴充章節 (v4.9): acute flare-up care, chronic pain &
 * return to work, family caregiving at home, and special groups.
 */

type GoTo = { goTo: (id: SpineTab) => void };

const H3: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white pt-2">{children}</h3>
);

const P: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-[15px] leading-7 text-slate-700 dark:text-slate-300 max-w-3xl">{children}</p>
);

const ToolCard: React.FC<{ icon: typeof Gauge; title: string; id: string; children: React.ReactNode }> = ({ icon: Icon, title, id, children }) => (
  <section className="rounded-2xl border border-sky-200 dark:border-sky-900/70 bg-white dark:bg-slate-900/60 p-4 sm:p-5 space-y-3 print-avoid-break" aria-labelledby={id}>
    <div className="flex items-center gap-2">
      <Icon className="w-5 h-5 text-sky-600 dark:text-sky-400" aria-hidden="true" />
      <h3 id={id} className="text-base font-bold text-slate-900 dark:text-white">
        {title}
      </h3>
      <span className="ml-auto text-[11px] font-semibold text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-800 rounded-md px-1.5 py-0.5">互動工具</span>
    </div>
    {children}
  </section>
);

function useStoredList(key: string): [number[], (i: number) => void, () => void] {
  const [list, setList] = useState<number[]>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as number[]) : [];
    } catch {
      return [];
    }
  });
  const save = (next: number[]) => {
    setList(next);
    try {
      localStorage.setItem(key, JSON.stringify(next));
    } catch {
      /* private mode — keep in memory only */
    }
  };
  return [list, (i) => save(list.includes(i) ? list.filter((x) => x !== i) : [...list, i]), () => save([])];
}

const CopyButton: React.FC<{ text: string; label?: string }> = ({ text, label = '複製文字' }) => {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard?.writeText(text).then(
          () => {
            setCopied(true);
            window.setTimeout(() => setCopied(false), 2000);
          },
          () => setCopied(false)
        );
      }}
      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 dark:border-slate-700 px-3 py-1.5 text-[13px] font-semibold text-slate-700 dark:text-slate-200 hover:border-sky-500"
    >
      {copied ? <Check className="w-4 h-4 text-emerald-600" aria-hidden="true" /> : <Copy className="w-4 h-4" aria-hidden="true" />}
      {copied ? '已複製' : label}
    </button>
  );
};

// ── Tools ─────────────────────────────────────────────────────────────────────

export const FlareCareCard: React.FC = () => {
  const [done, toggle, reset] = useStoredList('salud-spine-flare-steps');
  const pct = Math.round((done.length / FLARE_CARE_STEPS.length) * 100);
  const text = ['【我的腰頸痛發作應變卡】', ...FLARE_CARE_STEPS.map((s, i) => `${i + 1}. ${s}`), '若大小便異常、會陰麻木、雙腳無力或發燒，立即就醫。'].join('\n');
  return (
    <ToolCard icon={ClipboardCheck} title="發作應變卡：72 小時照護清單" id="flare-card-h">
      <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label="發作應變卡完成度">
        <div className="h-full bg-sky-600 dark:bg-sky-400 transition-all" style={{ width: `${pct}%` }} />
      </div>
      <ol className="grid gap-1.5 sm:grid-cols-2">
        {FLARE_CARE_STEPS.map((s, i) => (
          <li key={s}>
            <label className="flex gap-2 items-start rounded-xl border border-slate-200 dark:border-slate-800 px-3 py-2 text-[13px] leading-snug cursor-pointer hover:border-sky-400">
              <input type="checkbox" checked={done.includes(i)} onChange={() => toggle(i)} className="mt-0.5 w-4 h-4 shrink-0 accent-sky-600" />
              <span className={done.includes(i) ? 'line-through text-slate-500' : 'text-slate-800 dark:text-slate-200'}>
                <span className="font-semibold tabular-nums">{i + 1}.</span> {s}
              </span>
            </label>
          </li>
        ))}
      </ol>
      <div className="flex flex-wrap items-center gap-2">
        <CopyButton text={text} label="複製應變卡（存到手機備忘錄）" />
        {done.length > 0 && (
          <button type="button" onClick={reset} className="text-[13px] text-slate-500 hover:underline">
            重新開始
          </button>
        )}
        <span className="text-[12px] text-slate-500 dark:text-slate-400">勾選紀錄只存在你的瀏覽器。</span>
      </div>
    </ToolCard>
  );
};

export const PacingPlanner: React.FC = () => {
  const [activity, setActivity] = useState('散步');
  const [minutes, setMinutes] = useState(30);
  const weeks = useMemo(() => {
    const base = Math.max(5, Math.round(minutes * 0.8));
    return Array.from({ length: 6 }, (_, w) => Math.round(base * Math.pow(1.1, w)));
  }, [minutes]);
  const text = [`【${activity} 節律活動計畫】`, ...weeks.map((m, i) => `第 ${i + 1} 週：每天 ${m} 分鐘（可分 2–3 次）`), '原則：好的日子也不超量、痛的日子不歸零。'].join('\n');
  return (
    <ToolCard icon={Gauge} title="節律活動規劃器（Pacing）" id="pacing-h">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-[13px] text-slate-700 dark:text-slate-300 space-y-1">
          <span className="font-semibold block">想恢復的活動</span>
          <input
            value={activity}
            onChange={(e) => setActivity(e.target.value.slice(0, 20))}
            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-[14px]"
          />
        </label>
        <label className="text-[13px] text-slate-700 dark:text-slate-300 space-y-1">
          <span className="font-semibold block">目前能「舒服完成」的時間：{minutes} 分鐘</span>
          <input type="range" min={5} max={120} step={5} value={minutes} onChange={(e) => setMinutes(Number(e.target.value))} className="w-full accent-sky-600" aria-valuetext={`${minutes} 分鐘`} />
        </label>
      </div>
      <ol className="grid grid-cols-3 sm:grid-cols-6 gap-2" aria-label="六週計畫">
        {weeks.map((m, i) => (
          <li key={i} className="rounded-xl border border-sky-200 dark:border-sky-900 bg-sky-50/60 dark:bg-sky-950/30 p-2 text-center">
            <div className="text-[11px] text-slate-600 dark:text-slate-400">第 {i + 1} 週</div>
            <div className="text-lg font-bold tabular-nums text-sky-800 dark:text-sky-200">{m}</div>
            <div className="text-[11px] text-slate-500">分鐘/天</div>
          </li>
        ))}
      </ol>
      <p className="text-[13px] text-slate-600 dark:text-slate-400">
        基準線＝舒服可完成量的 80%（{weeks[0]} 分鐘），每週增加約 10%。痛得較厲害的日子維持基準線，不要歸零；狀況好的日子也不要超量。
      </p>
      <CopyButton text={text} label="複製六週計畫" />
    </ToolCard>
  );
};

export const HomeSafetyChecklist: React.FC = () => {
  const [done, toggle, reset] = useStoredList('salud-spine-home-safety');
  const areas = Array.from(new Set(HOME_SAFETY_ITEMS.map((i) => i.area)));
  const score = done.length;
  const total = HOME_SAFETY_ITEMS.length;
  const level = score >= 9 ? { t: '居家環境安全度高', c: 'text-emerald-700 dark:text-emerald-300' } : score >= 6 ? { t: '還有幾處可加強', c: 'text-amber-700 dark:text-amber-300' } : { t: '跌倒風險偏高，建議優先改善', c: 'text-rose-700 dark:text-rose-300' };
  return (
    <ToolCard icon={Home} title="居家防跌安全檢核" id="home-safety-h">
      <p className={`text-[14px] font-bold ${level.c}`} aria-live="polite">
        已完成 {score}/{total} 項：{level.t}
      </p>
      <div className="grid gap-3 md:grid-cols-2">
        {areas.map((a) => (
          <fieldset key={a} className="rounded-xl border border-slate-200 dark:border-slate-800 p-3 space-y-1.5">
            <legend className="px-1 text-[13px] font-bold text-slate-700 dark:text-slate-200">{a}</legend>
            {HOME_SAFETY_ITEMS.map((it, i) =>
              it.area === a ? (
                <label key={it.item} className="flex gap-2 items-start text-[13px] leading-snug cursor-pointer">
                  <input type="checkbox" checked={done.includes(i)} onChange={() => toggle(i)} className="mt-0.5 w-4 h-4 shrink-0 accent-sky-600" />
                  <span className="text-slate-800 dark:text-slate-200">{it.item}</span>
                </label>
              ) : null
            )}
          </fieldset>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-3 text-[12px] text-slate-500 dark:text-slate-400">
        <span>扶手、止滑與無障礙改造可透過長照 1966 申請補助。</span>
        {done.length > 0 && (
          <button type="button" onClick={reset} className="hover:underline">
            清除勾選
          </button>
        )}
      </div>
    </ToolCard>
  );
};

export const IbpScreener: React.FC<GoTo> = ({ goTo }) => {
  const [yes, setYes] = useState<number[]>([]);
  const toggle = (i: number) => setYes((v) => (v.includes(i) ? v.filter((x) => x !== i) : [...v, i]));
  const n = yes.length;
  return (
    <ToolCard icon={Stethoscope} title="發炎性背痛自我篩檢（ASAS 5 項）" id="ibp-h">
      <p className="text-[13px] text-slate-600 dark:text-slate-400">適用於背痛已持續 3 個月以上的人。勾選符合的描述：</p>
      <ul className="space-y-1.5">
        {IBP_CRITERIA.map((c, i) => (
          <li key={c}>
            <label className="flex gap-2 items-start rounded-xl border border-slate-200 dark:border-slate-800 px-3 py-2 text-[13px] cursor-pointer hover:border-sky-400">
              <input type="checkbox" checked={yes.includes(i)} onChange={() => toggle(i)} className="mt-0.5 w-4 h-4 shrink-0 accent-sky-600" />
              <span className="text-slate-800 dark:text-slate-200">{c}</span>
            </label>
          </li>
        ))}
      </ul>
      <div
        aria-live="polite"
        className={`rounded-xl border px-3 py-2 text-[14px] ${
          n >= 4
            ? 'border-rose-300 bg-rose-50 text-rose-900 dark:border-rose-800 dark:bg-rose-950/30 dark:text-rose-100'
            : 'border-slate-200 bg-slate-50 text-slate-800 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200'
        }`}
      >
        {n >= 4 ? (
          <>
            <strong>符合 {n}/5 項：</strong>較像發炎性背痛，建議至<strong>風濕免疫科</strong>評估（HLA-B27、發炎指數、骨盆 X 光或 MRI）。
          </>
        ) : (
          <>
            <strong>符合 {n}/5 項：</strong>較像一般機械性背痛。若出現警訊或症狀持續，仍請就醫。
          </>
        )}
      </div>
      <p className="text-[12px] text-slate-500 dark:text-slate-400">
        此篩檢僅供參考，不能用來診斷。
        <button type="button" onClick={() => goTo('TRIAGE')} className="ml-1 underline hover:text-sky-700">
          查看危險警訊
        </button>
      </p>
    </ToolCard>
  );
};

// ── Chapters ──────────────────────────────────────────────────────────────────

export const AcuteChapter: React.FC<GoTo> = ({ goTo }) => (
  <div className="space-y-6">
    <Callout kind="redflag" title="先確認不是急症">
      <p>
        背痛合併<strong>大小便解不出或失禁、會陰（坐墊區）麻木、雙腳快速無力、發燒、明顯外傷、癌症病史或不明體重減輕</strong>，不要等待，直接就醫。
      </p>
      <button type="button" onClick={() => goTo('TRIAGE')} className="mt-1 rounded-lg border border-rose-400 dark:border-rose-700 px-3 py-1 text-[13px] font-semibold hover:bg-rose-100 dark:hover:bg-rose-900/40">
        開啟警訊檢查
      </button>
    </Callout>

    <H3>好消息：大多數急性腰痛會自己好</H3>
    <P>
      急性下背痛（6 週內）與落枕多半來自肌肉、韌帶或小面關節的暫時性刺激。統合分析顯示，第一個月疼痛平均就能減少一半以上，多數人在 6 週內恢復日常功能。這段期間的目標不是「完全不痛」，而是<strong>安全地維持活動</strong>，讓身體在自然修復時不失去肌力與信心。
    </P>
    <FigureFrame number="圖 1-1" title="急性下背痛的典型恢復曲線" source="da C Menezes Costa 2012（CMAJ）統合分析" caption="曲線為平均趨勢示意；個人差異大，若出現新的神經症狀或疼痛持續加劇應就醫。">
      <ChartBody chart={ACUTE_RECOVERY_CURVE} />
    </FigureFrame>

    <FigureFrame number="圖 1-2" title="72 小時到 6 週：每個階段該做什麼" source="NICE NG59；ACP 2017" note={false}>
      <ChartBody chart={ACUTE_72H_PLAN} />
    </FigureFrame>

    <FlareCareCard />

    <H3>熱敷、冰敷、藥物與臥床：哪個有用？</H3>
    <FigureFrame number="圖 1-3" title="急性期常見處置的實證比較" source="French 2006（Cochrane）；ACP 2017" note={false}>
      <ChartBody chart={HEAT_VS_ICE} />
    </FigureFrame>

    <H3>怎麼睡比較不痛</H3>
    <FigureFrame number="圖 1-4" title="三種睡姿的護脊重點" source="臨床實務共識" note={false}>
      <ChartBody chart={SLEEP_POSITIONS} />
    </FigureFrame>

    <Callout kind="tip" title="落枕（急性頸痛）的照顧重點">
      <ul className="list-disc pl-5 space-y-0.5">
        <li>在不痛的範圍內慢慢轉頭、點頭，每小時做幾次，不要整天固定不動。</li>
        <li>熱敷頸肩 15–20 分鐘；避免大力扭轉、甩頭或自行「喬脖子」。</li>
        <li>看手機時把螢幕抬高到眼睛高度，每 20–30 分鐘休息一下。</li>
        <li>手臂發麻無力、走路不穩或手部變得笨拙，應盡快就醫。</li>
      </ul>
    </Callout>
  </div>
);

export const ChronicChapter: React.FC<GoTo> = ({ goTo }) => (
  <div className="space-y-6">
    <H3>為什麼痛會「卡住」：疼痛不等於傷害</H3>
    <P>
      疼痛是大腦根據各種訊號做出的「保護警報」。當疼痛持續超過 3 個月，神經系統可能變得過度敏感（中樞敏感化）：輕微的動作也被當成威脅，警報音量被調大。睡眠不足、壓力、害怕活動與長時間不動，都會讓警報更敏感。好消息是，這個系統是可以<strong>重新校正</strong>的。
    </P>
    <Callout kind="evidence" title="研究怎麼說">
      <p>
        疼痛神經科學教育搭配運動，可降低疼痛、害怕活動與失能（Louw 2016 系統性回顧）。RESTORE 試驗（Lancet 2023）顯示，結合疼痛認知、動作再訓練與生活調整的「認知功能治療」，失能改善效果可維持到 1 年以上。
      </p>
    </Callout>

    <H3>衝過頭再倒下 vs 節律活動</H3>
    <P>許多慢性疼痛的人在狀況好的日子做很多，隔天痛到起不來，反覆循環。節律活動（pacing）用固定、可預期的量取代這種起伏，讓身體逐步適應。</P>
    <FigureFrame number="圖 2-1" title="兩種活動模式兩週後的差異" source="慢性疼痛復健實務" caption="節律活動以舒服可完成量的 80% 為基準線，每週增加約 10%，兩週後總活動量反而更高、更穩定。">
      <ChartBody chart={BOOM_BUST_CURVE} />
    </FigureFrame>
    <PacingPlanner />

    <H3>哪些治療值得投入</H3>
    <FigureFrame number="圖 2-2" title="WHO 2023 慢性原發性下背痛指引重點" source="WHO 2023" note={false}>
      <ChartBody chart={WHO_CHRONIC_MATRIX} />
    </FigureFrame>

    <Callout kind="tip" title="睡眠與情緒，也是疼痛治療的一部分">
      <ul className="list-disc pl-5 space-y-0.5">
        <li>失眠與疼痛互相放大：固定起床時間、睡前減少螢幕，必要時尋求失眠認知行為治療。</li>
        <li>持續兩週以上情緒低落、失去興趣，可能合併憂鬱，請與醫師討論。</li>
        <li>把目標放在「能做什麼」（散步、工作、陪孩子），而不只是疼痛分數。</li>
      </ul>
    </Callout>

    <H3>重返工作：先調整、再增量</H3>
    <FigureFrame number="圖 2-3" title="漸進式重返工作的四個步驟" source="NICE NG59；職業醫學實務" note={false}>
      <ChartBody chart={RETURN_TO_WORK} />
    </FigureFrame>
    <P>
      想了解運動處方，可接著閱讀
      <button type="button" onClick={() => goTo('EXERCISE')} className="mx-1 font-semibold text-sky-700 dark:text-sky-300 underline">
        護脊運動
      </button>
      與
      <button type="button" onClick={() => goTo('POSTURE')} className="mx-1 font-semibold text-sky-700 dark:text-sky-300 underline">
        姿勢與人體工學
      </button>
      。
    </P>
  </div>
);

export const CaregiverChapter: React.FC<GoTo> = ({ goTo }) => (
  <div className="space-y-6">
    <P>
      照顧脊椎骨折、術後或長期臥床的家人，最常見的三個挑戰是：<strong>皮膚（壓力性損傷）、移動（翻身與移位）、安全（跌倒）</strong>。下面每一節都可以印出來貼在床邊。術後的圓滾木翻身與背架穿戴，請同時參考
      <button type="button" onClick={() => goTo('SURGERY')} className="mx-1 font-semibold text-sky-700 dark:text-sky-300 underline">
        手術與術後照護
      </button>
      章節的分享照護卡。
    </P>

    <H3>一、保護皮膚：預防壓力性損傷（壓瘡）</H3>
    <FigureFrame number="圖 3-1" title="不同姿勢的壓瘡好發部位與減壓方法" source="EPUAP/NPIAP/PPPIA 2019" note={false}>
      <ChartBody chart={PRESSURE_SITES} />
    </FigureFrame>
    <FigureFrame number="圖 3-2" title="臥床翻身時間表範例（每 2 小時）" source="EPUAP/NPIAP/PPPIA 2019" note="實際間隔依皮膚狀況、床墊與醫護評估調整。">
      <ChartBody chart={TURNING_CLOCK} />
    </FigureFrame>
    <FigureFrame number="圖 3-3" title="壓力性損傷分級：看到什麼、該怎麼做" source="EPUAP/NPIAP/PPPIA 2019" note={false}>
      <ChartBody chart={PRESSURE_STAGES} />
    </FigureFrame>
    <Callout kind="tip" title="每天 3 分鐘皮膚檢查">
      <ul className="list-disc pl-5 space-y-0.5">
        <li>洗澡或換尿布時看薦尾骨、髖部、腳跟、手肘與後腦勺。</li>
        <li>保持皮膚乾爽，大小便後溫和清潔並擦乾，可使用隔離霜。</li>
        <li>攝取足夠蛋白質與水分；體重下降或食慾差要告知醫護。</li>
        <li>床單拉平、避免皺褶；翻身時用「抬」而不是「拖」，減少摩擦。</li>
      </ul>
    </Callout>

    <H3>二、安全移位：床到輪椅</H3>
    <FigureFrame number="圖 3-4" title="床 → 輪椅轉位五步驟" source="台灣醫學中心居家護理指導" note={false}>
      <ChartBody chart={TRANSFER_STEPS} />
    </FigureFrame>
    <Callout kind="redflag" title="照顧者也要護腰">
      <p>
        移位時雙腳與肩同寬、屈膝蹲低而不是彎腰、讓對方盡量靠近你、用腳步轉身而不是扭腰。對方無法自行承重時，請兩人協助或使用移位腰帶、移位板與移位機，<strong>不要獨自硬抱</strong>。
      </p>
    </Callout>

    <H3>三、輔具與居家改造</H3>
    <FigureFrame number="圖 3-5" title="常見輔具怎麼選" source="長照 2.0 輔具服務" note={false}>
      <ChartBody chart={ASSISTIVE_DEVICES} />
    </FigureFrame>
    <HomeSafetyChecklist />

    <H3>四、台灣照護資源與照顧者自我照顧</H3>
    <div className="grid gap-3 sm:grid-cols-3">
      {[
        { n: '1966', t: '長照服務專線', d: '申請居家照顧、日照、喘息服務、交通接送與輔具、無障礙改造補助' },
        { n: '0800-507272', t: '家庭照顧者關懷專線', d: '照顧壓力、情緒支持與照顧技巧諮詢' },
        { n: '居家護理', t: '醫院或居家護理所', d: '管路、傷口與壓瘡照護，可請出院準備服務協助轉介' },
      ].map((r) => (
        <div key={r.t} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-3 space-y-1">
          <div className="flex items-center gap-1.5 text-sky-800 dark:text-sky-200 font-bold">
            <Phone className="w-4 h-4" aria-hidden="true" />
            <span className="tabular-nums">{r.n}</span>
          </div>
          <div className="text-[14px] font-semibold text-slate-900 dark:text-white">{r.t}</div>
          <p className="text-[13px] leading-relaxed text-slate-600 dark:text-slate-400">{r.d}</p>
        </div>
      ))}
    </div>
    <Callout kind="note" title="照顧者倦怠的警訊">
      <p>長期睡不好、易怒、常常想哭、身體疼痛增加、對原本喜歡的事失去興趣——這些都是需要休息與協助的訊號。善用喘息服務，讓其他家人輪班，照顧才能走得長久。</p>
    </Callout>
  </div>
);

export const SpecialChapter: React.FC<GoTo> = ({ goTo }) => (
  <div className="space-y-6">
    <H3>一、青少年特發性脊椎側彎</H3>
    <P>
      脊椎側彎指脊椎在正面看出現 Cobb 角 ≥ 10° 的側向彎曲並伴隨旋轉，青少年盛行率約 2–3%，女生較容易進展。原因多半不明，與書包或坐姿沒有直接因果。家長可在孩子洗澡時觀察：
      <strong>兩肩是否不等高、肩胛骨一邊突出、腰線不對稱，以及向前彎腰時背部一側隆起（Adams 前彎測試）</strong>。
    </P>
    <FigureFrame number="圖 4-1" title="依 Cobb 角度與成長狀態的處置階梯" source="SOSORT 2016；BrAIST 2013" note={false}>
      <ChartBody chart={SCOLIOSIS_LADDER} />
    </FigureFrame>
    <Callout kind="evidence" title="背架真的有用嗎？">
      <p>BrAIST 隨機試驗（NEJM 2013）：成長中、20–40° 的青少年，穿背架者 72% 未進展到手術門檻，觀察組為 48%；每天穿戴時數越長，成功率越高。</p>
    </Callout>

    <H3>二、僵直性脊椎炎（中軸型脊椎關節炎）</H3>
    <P>
      年輕人長期下背或臀部痛、早上特別僵硬、半夜痛醒，可能不是姿勢問題，而是免疫系統攻擊脊椎與薦腸關節的發炎性疾病。台灣患者 HLA-B27 陽性比例高，但 HLA-B27 陽性不等於生病；平均延誤診斷可達數年，及早治療可保留脊椎活動度。
    </P>
    <FigureFrame number="圖 4-2" title="發炎性背痛 vs 機械性背痛" source="ASAS 2009" note={false}>
      <ChartBody chart={IBP_VS_MECHANICAL} />
    </FigureFrame>
    <IbpScreener goTo={goTo} />
    <Callout kind="tip" title="治療重點（ASAS-EULAR 2022）">
      <ul className="list-disc pl-5 space-y-0.5">
        <li>規律運動與伸展是基礎治療，游泳、伸展與姿勢訓練有助維持脊椎活動度。</li>
        <li>第一線藥物為非類固醇消炎止痛藥（NSAIDs），需留意胃腸、腎臟與心血管風險。</li>
        <li>效果不佳時，可由風濕免疫科評估生物製劑（TNF 抑制劑、IL-17 抑制劑）或標靶藥物。</li>
        <li>戒菸：吸菸與較快的脊椎結構進展相關。</li>
      </ul>
    </Callout>

    <H3>三、孕產期腰痛與骨盆帶疼痛</H3>
    <P>約一半的孕婦會經歷腰痛或骨盆帶疼痛，與荷爾蒙使韌帶鬆弛、重心前移與體重增加有關。多數產後會改善，但持續疼痛也值得處理。</P>
    <FigureFrame number="圖 4-3" title="孕期腰痛：可以做與要避免的事" source="Liddle 2015（Cochrane）；US FDA 2020" note={false}>
      <ChartBody chart={PREGNANCY_CARE} />
    </FigureFrame>
    <Callout kind="tip" title="產後照顧寶寶也要護腰">
      <ul className="list-disc pl-5 space-y-0.5">
        <li>抱寶寶時先蹲低靠近，再用雙腳站起；不要彎腰單手抱起。</li>
        <li>哺乳時用枕頭把寶寶墊高到胸前，背部有支撐，不要駝背前傾。</li>
        <li>嬰兒床、尿布台高度約在腰部，減少反覆彎腰。</li>
        <li>產後 6–8 週可在醫師同意下開始骨盆底與核心訓練；腹直肌分離可尋求物理治療。</li>
      </ul>
    </Callout>

    <H3>四、學童與青少年</H3>
    <FigureFrame number="圖 4-4" title="書包重量建議（體重 10–15%）" source="小兒科與復健科臨床共識" note="書包過重會造成肩背痠痛，但不會造成結構性側彎。">
      <ChartBody chart={BACKPACK_BARS} />
    </FigureFrame>
    <Callout kind="redflag" title="青少年背痛需就醫的情況">
      <ul className="list-disc pl-5 space-y-0.5">
        <li>體操、棒球、舞蹈等常做後仰動作的運動員，腰痛持續超過 2–3 週（需排除脊椎解離）。</li>
        <li>夜間痛醒、發燒、體重減輕或年紀很小（10 歲以下）就有持續背痛。</li>
        <li>側彎合併疼痛明顯、神經症狀或快速進展。</li>
      </ul>
    </Callout>
  </div>
);
