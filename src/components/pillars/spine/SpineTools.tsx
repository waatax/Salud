import React, { useMemo, useState } from 'react';
import { MapPin, Siren, ClipboardCheck, RotateCcw, Share2, Copy, Check, Printer, ExternalLink, ShieldCheck, AlertTriangle, CheckCircle2 } from 'lucide-react';
import {
  NUMB_LOCATOR,
  RED_FLAG_TIERS,
  URGENCY_META,
  Urgency,
  DAILY_CHECKLIST,
  SPINE_POSTOP_CARE_MODULES,
  SPINE_POSTOP_TIMELINE,
  TMGRGH_SPINE_CENTER_SERVICES,
} from '../../../data/spineData';

/**
 * Interactive helpers for the spine zone. They narrow possibilities and say how soon
 * to be seen; they never name a diagnosis as certain. Every result repeats that a
 * clinician's examination decides.
 */

const URGENCY_BOX: Record<Urgency, string> = {
  now: 'border-rose-400 dark:border-rose-700 bg-rose-50 dark:bg-rose-950/40 text-rose-950 dark:text-rose-100',
  soon: 'border-amber-400 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/30 text-amber-950 dark:text-amber-100',
  clinic: 'border-sky-300 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/30 text-sky-950 dark:text-sky-100',
  self: 'border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-950 dark:text-emerald-100',
};

const URGENCY_DOT: Record<Urgency, string> = {
  now: 'bg-rose-600',
  soon: 'bg-amber-500',
  clinic: 'bg-sky-600',
  self: 'bg-emerald-600',
};

export const UrgencyBadge: React.FC<{ level: Urgency }> = ({ level }) => (
  <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[12px] font-bold ${URGENCY_BOX[level]}`}>
    <span className={`w-2 h-2 rounded-full ${URGENCY_DOT[level]}`} aria-hidden="true" />
    {URGENCY_META[level].short}
  </span>
);

// ── Where is it numb? ───────────────────────────────────────────────────

const AREA_LABEL = { whole: '全身／緊急', hand: '手', arm: '手臂', leg: '大腿／小腿', foot: '腳' } as const;

export const NumbLocator: React.FC = () => {
  const [pick, setPick] = useState<string>('thumb-index');
  const opt = NUMB_LOCATOR.find((o) => o.id === pick) ?? NUMB_LOCATOR[0];
  const groups = useMemo(() => {
    const order: (keyof typeof AREA_LABEL)[] = ['whole', 'hand', 'arm', 'leg', 'foot'];
    return order.map((a) => ({ area: a, items: NUMB_LOCATOR.filter((o) => o.area === a) })).filter((g) => g.items.length);
  }, []);
  return (
    <section className="rounded-2xl border-2 border-sky-200 dark:border-sky-900/70 bg-white dark:bg-slate-900/60 p-4 sm:p-5 space-y-4" aria-labelledby="numb-locator-h">
      <div className="flex items-center gap-2">
        <MapPin className="w-5 h-5 text-sky-600 dark:text-sky-400" aria-hidden="true" />
        <h3 id="numb-locator-h" className="text-base font-bold text-slate-900 dark:text-white">
          互動工具：我的麻在哪裡？
        </h3>
      </div>
      <p className="text-[13px] text-slate-600 dark:text-slate-400 -mt-2">選一個最接近你的描述，看看常見原因、醫師會問什麼，以及多快該就醫。</p>
      <div className="space-y-2.5">
        {groups.map((g) => (
          <div key={g.area} className="space-y-1.5">
            <p className="text-[12px] font-semibold text-slate-500 dark:text-slate-400">{AREA_LABEL[g.area]}</p>
            <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label={AREA_LABEL[g.area]}>
              {g.items.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  role="radio"
                  aria-checked={pick === o.id}
                  onClick={() => setPick(o.id)}
                  className={`btn-tactile text-left rounded-xl border px-3 py-2 text-[13px] leading-snug transition-colors ${
                    pick === o.id
                      ? 'bg-sky-700 border-sky-700 text-white dark:bg-sky-400 dark:border-sky-400 dark:text-sky-950 font-semibold'
                      : o.urgency === 'now'
                      ? 'border-rose-300 dark:border-rose-800 bg-rose-50/60 dark:bg-rose-950/20 text-rose-900 dark:text-rose-200 hover:border-rose-500'
                      : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:border-sky-400'
                  }`}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className={`rounded-2xl border-2 p-4 space-y-3 ${URGENCY_BOX[opt.urgency]}`} role="status" aria-live="polite">
        <div className="flex flex-wrap items-center gap-2">
          <UrgencyBadge level={opt.urgency} />
          <span className="text-[13px] font-semibold">{URGENCY_META[opt.urgency].label}</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <p className="text-[12px] font-bold opacity-80 mb-1">常見可能原因</p>
            <ul className="space-y-1 text-[14px] leading-relaxed">
              {opt.likely.map((l) => (
                <li key={l} className="flex gap-1.5">
                  <span aria-hidden="true">•</span>
                  {l}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[12px] font-bold opacity-80 mb-1">先問自己（醫師也會問）</p>
            <ul className="space-y-1 text-[14px] leading-relaxed">
              {opt.ask.map((a) => (
                <li key={a} className="flex gap-1.5">
                  <span aria-hidden="true">?</span>
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="text-[14px] leading-relaxed">
          <strong>下一步：</strong>
          {opt.next}
        </p>
      </div>
      <p className="text-[12px] text-slate-500 dark:text-slate-400">這個工具只用來幫你整理方向，不能取代醫師的神經學檢查與診斷。</p>
    </section>
  );
};

// ── Red-flag checker ────────────────────────────────────────────────────

const ORDER: Urgency[] = ['now', 'soon', 'clinic', 'self'];

export const RedFlagChecker: React.FC = () => {
  const [checked, setChecked] = useState<Record<string, true>>({});
  const toggle = (k: string) =>
    setChecked((c) => {
      const n = { ...c };
      if (n[k]) delete n[k];
      else n[k] = true;
      return n;
    });
  const highest = ORDER.find((lvl) => RED_FLAG_TIERS.find((t) => t.level === lvl)!.items.some((_, i) => checked[`${lvl}-${i}`]));
  return (
    <section className="rounded-2xl border-2 border-rose-200 dark:border-rose-900/70 bg-white dark:bg-slate-900/60 p-4 sm:p-5 space-y-4" aria-labelledby="redflag-h">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Siren className="w-5 h-5 text-rose-600 dark:text-rose-400" aria-hidden="true" />
          <h3 id="redflag-h" className="text-base font-bold text-slate-900 dark:text-white">
            互動工具：我需要多快就醫？
          </h3>
        </div>
        {Object.keys(checked).length > 0 && (
          <button type="button" onClick={() => setChecked({})} className="inline-flex items-center gap-1 text-[12px] font-semibold text-slate-600 dark:text-slate-300 hover:underline">
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            清除
          </button>
        )}
      </div>
      <p className="text-[13px] text-slate-600 dark:text-slate-400 -mt-2">勾選所有符合你的狀況，系統會顯示「最緊急」的那一級。</p>
      <div className="grid gap-3 lg:grid-cols-2">
        {RED_FLAG_TIERS.map((tier) => (
          <fieldset key={tier.level} className={`rounded-xl border p-3 ${URGENCY_BOX[tier.level]}`}>
            <legend className="px-1 text-[13px] font-bold flex items-center gap-1.5">
              <span className={`w-2.5 h-2.5 rounded-full ${URGENCY_DOT[tier.level]}`} aria-hidden="true" />
              {URGENCY_META[tier.level].label}
            </legend>
            <ul className="space-y-1.5 mt-1">
              {tier.items.map((it, i) => {
                const k = `${tier.level}-${i}`;
                return (
                  <li key={k}>
                    <label className="flex gap-2 items-start text-[13px] leading-relaxed cursor-pointer">
                      <input type="checkbox" checked={!!checked[k]} onChange={() => toggle(k)} className="mt-1 w-4 h-4 shrink-0 accent-rose-600" />
                      <span>{it}</span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </fieldset>
        ))}
      </div>
      <div role="status" aria-live="polite">
        {highest ? (
          <div className={`rounded-2xl border-2 p-4 ${URGENCY_BOX[highest]}`}>
            <p className="text-[12px] font-bold opacity-80">你的結果</p>
            <p className="text-lg font-bold">{URGENCY_META[highest].label}</p>
            {highest === 'now' && <p className="text-[14px] mt-1">請立即撥打 119，或請家人陪同前往急診；不要自行開車。</p>}
            {highest === 'soon' && <p className="text-[14px] mt-1">請在 1–3 天內就醫（神經外科、骨科脊椎或神經內科）；若症狀快速惡化，直接到急診。</p>}
            {highest === 'clinic' && <p className="text-[14px] mt-1">安排復健科、骨科或家醫科門診，並參考下方「就醫前準備」整理資訊。</p>}
            {highest === 'self' && <p className="text-[14px] mt-1">可以先依本專區的姿勢與運動建議自我照護 2–6 週；若出現上面任何一項，再提早就醫。</p>}
          </div>
        ) : (
          <p className="text-[13px] text-slate-500 dark:text-slate-400">尚未勾選任何項目。</p>
        )}
      </div>
    </section>
  );
};

// ── Daily checklist (resets each day) ───────────────────────────────────

const todayKey = () => {
  const d = new Date();
  return `salud-spine-daily-${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
};

export const DailySpineChecklist: React.FC = () => {
  const key = todayKey();
  const [done, setDone] = useState<number[]>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as number[]) : [];
    } catch {
      return [];
    }
  });
  const toggle = (i: number) => {
    const next = done.includes(i) ? done.filter((x) => x !== i) : [...done, i];
    setDone(next);
    try {
      localStorage.setItem(key, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  };
  const pct = Math.round((done.length / DAILY_CHECKLIST.length) * 100);
  return (
    <section className="rounded-2xl border border-emerald-200 dark:border-emerald-900/70 bg-white dark:bg-slate-900/60 p-4 sm:p-5 space-y-3" aria-labelledby="daily-spine-h">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <ClipboardCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
          <h3 id="daily-spine-h" className="text-base font-bold text-slate-900 dark:text-white">
            今日護脊清單
          </h3>
        </div>
        <span className="text-[13px] font-semibold text-emerald-700 dark:text-emerald-300 tabular-nums">
          {done.length}/{DAILY_CHECKLIST.length}
        </span>
      </div>
      <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label="今日護脊清單完成度">
        <div className="h-full bg-emerald-600 dark:bg-emerald-400 transition-all" style={{ width: `${pct}%` }} />
      </div>
      <ul className="grid gap-1.5 sm:grid-cols-2">
        {DAILY_CHECKLIST.map((c, i) => (
          <li key={c}>
            <label className="flex gap-2 items-start rounded-xl border border-slate-200 dark:border-slate-800 px-3 py-2 text-[13px] leading-snug cursor-pointer hover:border-emerald-400">
              <input type="checkbox" checked={done.includes(i)} onChange={() => toggle(i)} className="mt-0.5 w-4 h-4 shrink-0 accent-emerald-600" />
              <span className={done.includes(i) ? 'line-through text-slate-500 dark:text-slate-500' : 'text-slate-800 dark:text-slate-200'}>{c}</span>
            </label>
          </li>
        ))}
      </ul>
      <p className="text-[12px] text-slate-500 dark:text-slate-400">清單每天自動重新開始，只存在你自己的瀏覽器。</p>
    </section>
  );
};

// ── Professional Shareable Post-Op & Fracture Care Card ─────────────────────

export type CareGuideScenario = 'all' | 'fracture' | 'miss';

const SCENARIO_META: Record<CareGuideScenario, { label: string; subtitle: string }> = {
  all: {
    label: '完整綜合版（骨折・微創・融合通用）',
    subtitle: '涵蓋脊椎壓迫性骨折、骨泥成形術（PKP/PVP）、3D導航微創內視鏡（UBE/PELD）與融合術後全方位居家照護',
  },
  fracture: {
    label: '脊椎壓迫性骨折＆骨泥（PKP/PVP）專版',
    subtitle: '針對高齡骨鬆楔形骨折、微創氣球骨泥灌注術後之硬式背架穿戴、圓滾木翻身與防鄰近節段再骨折照護',
  },
  miss: {
    label: '3D導航微創脊椎內視鏡＆OLIF／融合術後專版',
    subtitle: '針對單孔／雙通道內視鏡減壓、3D電腦導航置釘、OLIF側開融合與翻修手術後之 ERAS 快速康復與傷口照護',
  },
};

export const ShareableSpineCareGuide: React.FC<{ defaultScenario?: CareGuideScenario }> = ({ defaultScenario = 'all' }) => {
  const [scenario, setScenario] = useState<CareGuideScenario>(defaultScenario);
  const [copiedMode, setCopiedMode] = useState<'full' | 'mantra' | null>(null);
  const [activeModId, setActiveModId] = useState<string>('log-roll-bed');

  const shareTextFull = useMemo(() => {
    const header =
      scenario === 'fracture'
        ? '📋【脊椎壓迫性骨折＆微創骨泥術後 專業居家照護全攻略】'
        : scenario === 'miss'
        ? '📋【3D導航微創脊椎內視鏡／融合手術 術後恢復與照護全攻略】'
        : '📋【脊椎骨折・微創脊椎手術・術後恢復 專業居家照護全攻略】';

    const lines: string[] = [
      header,
      '（整合台灣醫學中心護理指導共識 ＆ 臺中市立老人復健綜合醫院／中國醫大經營 骨科部微創脊椎中心：張建鈞副院長團隊臨床照護規範）',
      '',
      '━━━━━━━━━━━━━━━',
      '🌟 五大黃金照護口訣（必背！）',
      '━━━━━━━━━━━━━━━',
      '1️⃣【翻身上下床】肩臀一直線（圓滾木翻身）、側躺手推床、絕對不捲腹！',
      '2️⃣【背架穿脫法】「先穿再坐、先躺再脫；下床必穿、平躺可脫」（內穿薄棉衫防摩擦、內褲穿在背架外方便如廁，依醫囑穿戴 1.5～6 個月）。',
      '3️⃣【傷口防水顧】未拆線前（約 7–14 天）絕不碰生水；拆線滿 24–48 小時確認乾燥方可淋浴（輕按壓乾勿搓結痂）；3 個月內禁泡澡溫泉。',
      '4️⃣【日常三不忌】不彎腰（改屈膝蹲下／用長柄取物夾）、不扭腰提重（禁提 >3–5kg）、不坐矮軟沙發與蹲式馬桶（每坐 30 分鐘必起身走動）。',
      '5️⃣【營養與骨本】高蛋白＋高鈣（1000mg）＋維生素 D3（800IU）促骨癒合；高纖多水防便秘閉氣用力（防腹壓暴增）；絕對戒菸；骨鬆患者務必持續抗骨鬆藥物（如保骼麗切勿擅自停藥）防二次骨折！',
      '',
      '━━━━━━━━━━━━━━━',
      '🛏️ 標準「圓滾木翻身＋上下床」四步驟',
      '━━━━━━━━━━━━━━━',
      '• 步驟 1（平躺穿背架）：起床前在平躺狀態下先穿妥背架（鬆緊度留 1–2 指幅）。',
      '• 步驟 2（圓滾木側翻）：雙膝微彎收小腹，頭、肩、胸、臀保持一直線同步轉向床緣側臥。',
      '• 步驟 3（垂腿手推床）：雙小腿移出床沿下垂，同時用手肘與手掌推壓床面撐起上半身。',
      '• 步驟 4（靜坐防頭暈）：於床緣靜坐 3–5 分鐘確認無頭暈後，雙手扶助行器大腿用力站起。（躺回床上時：先側躺→轉平躺→最後才脫背架！）',
      '',
      '━━━━━━━━━━━━━━━',
      '🚨 立即返院急診／門診紅旗警訊',
      '━━━━━━━━━━━━━━━',
      '⚠️ 傷口紅、腫、熱、痛加劇，或流出膿液／惡臭滲液',
      '⚠️ 傷口持續滲出清澈水樣液體，且站立時劇烈頭痛（疑似腦脊髓液滲漏）',
      '⚠️ 不明原因發燒（體溫 > 38°C）或畏寒',
      '⚠️ 雙下肢麻痛無力突然惡化、腳板抬不起（垂足）或大小便解不出／失禁',
      '',
      '🔗 臨床參考與專科資源：',
      '• 臺中市立老人復健綜合醫院 骨科部／微創脊椎中心（張建鈞、林琮凱、毛睿廷醫師團隊）：https://www.tmgrgh.org.tw/Department/Detail?depid=261',
      '• 脊椎與骨鬆健康知識專區：' + (typeof window !== 'undefined' ? window.location.href : 'https://tingyus.github.io/Dietary-guide/#/spine'),
    ];
    return lines.join('\n');
  }, [scenario]);

  const shareTextShort = useMemo(() => {
    return [
      '💡【脊椎骨折＆微創術後 床頭照護五口訣】',
      '① 翻身：肩臀一直線（圓滾木翻身），側躺手推床起身，禁仰臥起坐！',
      '② 背架：先穿再坐、先躺再脫；內穿棉衫、內褲穿背架外方便如廁。',
      '③ 傷口：未拆線禁碰水；紅腫熱痛、滲液或發燒 >38°C 立即回診。',
      '④ 姿勢：不彎腰、不扭轉、不坐矮軟沙發、不提重物（每坐 30 分鐘起身）。',
      '⑤ 飲食：高蛋白補鈣D、多水高纖防便秘閉氣用力、絕對戒菸、續治骨鬆！',
      '👉 完整圖解指南：' + (typeof window !== 'undefined' ? window.location.href : 'https://tingyus.github.io/Dietary-guide/#/spine'),
    ].join('\n');
  }, []);

  const handleCopy = async (mode: 'full' | 'mantra') => {
    const text = mode === 'full' ? shareTextFull : shareTextShort;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedMode(mode);
      setTimeout(() => setCopiedMode(null), 3500);
    } catch {
      // Fallback textarea copy
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopiedMode(mode);
      setTimeout(() => setCopiedMode(null), 3500);
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: '脊椎骨折・微創手術・術後恢復 專業居家照護全攻略',
          text: shareTextFull,
          url: typeof window !== 'undefined' ? window.location.href : undefined,
        });
        return;
      } catch {
        // User cancelled or share failed, fallback to copy
      }
    }
    await handleCopy('full');
  };

  const activeModule = SPINE_POSTOP_CARE_MODULES.find((m) => m.id === activeModId) ?? SPINE_POSTOP_CARE_MODULES[0];

  return (
    <section
      id="shareable-spine-care-guide"
      className="rounded-3xl border-2 border-emerald-300 dark:border-emerald-800/80 bg-gradient-to-br from-emerald-50/70 via-white to-sky-50/50 dark:from-slate-900 dark:via-slate-900/95 dark:to-emerald-950/30 p-4 sm:p-6 space-y-5 shadow-sm print-avoid-break"
      aria-labelledby="shareable-spine-care-title"
    >
      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-emerald-200/80 dark:border-slate-800 pb-4">
        <div className="space-y-1.5">
          <div className="inline-flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-700 text-white dark:bg-emerald-500 dark:text-emerald-950 px-3 py-1 text-[11px] font-extrabold tracking-wide">
              <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
              專業臨床照護可分享小卡
            </span>
            <span className="text-[12px] font-semibold text-emerald-800 dark:text-emerald-300">
              微創脊椎中心臨床衛教 × 台灣醫學中心護理指導共識
            </span>
          </div>
          <h3 id="shareable-spine-care-title" className="text-xl sm:text-2xl font-display font-bold text-slate-900 dark:text-white">
            脊椎骨折・微創手術・術後恢復 居家照護全攻略
          </h3>
          <p className="text-[13.5px] text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            出院返家後的前 3 個月是骨痂癒合、骨泥穩定與神經消腫的黃金期。您可以選擇適合的照護情境，<strong>一鍵複製完整指南傳送至家人 LINE 群組</strong>，或列印貼於長輩床頭。
          </p>
        </div>

        {/* One-Click Share Action Buttons */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 shrink-0 print:hidden">
          <button
            type="button"
            onClick={() => handleCopy('full')}
            className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-emerald-950 px-3.5 py-2.5 text-[13px] font-bold shadow-sm transition-all cursor-pointer"
          >
            {copiedMode === 'full' ? <Check className="w-4 h-4" aria-hidden="true" /> : <Copy className="w-4 h-4" aria-hidden="true" />}
            {copiedMode === 'full' ? '已複製完整攻略！可貼上 LINE' : '複製 LINE 完整照護包'}
          </button>

          <button
            type="button"
            onClick={() => handleCopy('mantra')}
            className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-300 dark:border-emerald-700 bg-white dark:bg-slate-800 text-emerald-900 dark:text-emerald-200 hover:bg-emerald-50 dark:hover:bg-slate-700 px-3 py-2.5 text-[13px] font-bold transition-all cursor-pointer"
          >
            {copiedMode === 'mantra' ? <Check className="w-4 h-4 text-emerald-600" aria-hidden="true" /> : <Copy className="w-4 h-4" aria-hidden="true" />}
            {copiedMode === 'mantra' ? '已複製五口訣！' : '複製精華五口訣'}
          </button>

          <button
            type="button"
            onClick={handleNativeShare}
            className="inline-flex items-center gap-1.5 rounded-xl border border-sky-300 dark:border-sky-700 bg-sky-50 dark:bg-sky-950/50 text-sky-900 dark:text-sky-200 hover:bg-sky-100 px-3 py-2.5 text-[13px] font-bold transition-all cursor-pointer"
            title="使用手機或系統分享選單傳送給家人"
          >
            <Share2 className="w-4 h-4" aria-hidden="true" />
            分享給家人
          </button>

          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 px-3 py-2.5 text-[13px] font-semibold transition-all cursor-pointer"
            title="列印或另存 PDF 床頭照護單張"
          >
            <Printer className="w-4 h-4" aria-hidden="true" />
            列印單張
          </button>
        </div>
      </div>

      {/* Scenario Selector Tabs */}
      <div className="space-y-2 print:hidden">
        <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="選擇照護專版">
          {(['all', 'fracture', 'miss'] as CareGuideScenario[]).map((sc) => (
            <button
              key={sc}
              type="button"
              role="tab"
              aria-selected={scenario === sc}
              onClick={() => setScenario(sc)}
              className={`rounded-xl px-3.5 py-2 text-[13px] font-bold transition-all cursor-pointer border ${
                scenario === sc
                  ? 'bg-slate-900 border-slate-900 text-white dark:bg-white dark:border-white dark:text-slate-900 shadow-xs'
                  : 'bg-white/90 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-emerald-400'
              }`}
            >
              {SCENARIO_META[sc].label}
            </button>
          ))}
        </div>
        <p className="text-[12.5px] text-emerald-800 dark:text-emerald-300 font-medium">
          當前模式：{SCENARIO_META[scenario].subtitle}
        </p>
      </div>

      {/* 5 Golden Mantras Quick-Glance Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
        {SPINE_POSTOP_CARE_MODULES.map((mod, idx) => {
          const isSelected = activeModId === mod.id;
          return (
            <button
              key={mod.id}
              type="button"
              onClick={() => setActiveModId(mod.id)}
              className={`text-left rounded-2xl border p-3 transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-emerald-600 dark:border-emerald-400 bg-emerald-600/10 dark:bg-emerald-500/15 ring-2 ring-emerald-500/30'
                  : 'border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/70 hover:border-emerald-400'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-[11px] font-extrabold text-emerald-700 dark:text-emerald-400">
                    重點 0{idx + 1}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold">
                    點擊詳情
                  </span>
                </div>
                <p className="text-[13.5px] font-bold text-slate-900 dark:text-white leading-snug">
                  {mod.badge_zh.split('・')[1] ?? mod.title_zh}
                </p>
              </div>
              <p className="text-[11.5px] text-emerald-800 dark:text-emerald-300 font-semibold mt-2 leading-snug">
                {mod.golden_mantra_zh.replace('口訣：', '')}
              </p>
            </button>
          );
        })}
      </div>

      {/* Active Module Detailed Breakdown */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/70 p-4 sm:p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <span className="text-[12px] font-bold text-emerald-700 dark:text-emerald-400">{activeModule.badge_zh}</span>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">{activeModule.title_zh}</h4>
          </div>
          <span className="rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-800 px-3 py-1.5 text-[13px] font-extrabold text-amber-900 dark:text-amber-200">
            {activeModule.golden_mantra_zh}
          </span>
        </div>

        <p className="text-[13.5px] leading-relaxed text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900/60 rounded-xl p-3 border border-slate-200/70 dark:border-slate-800">
          <strong className="text-slate-900 dark:text-white">臨床生物力學原因：</strong>
          {activeModule.why_it_matters_zh}
        </p>

        <div className="grid gap-4 lg:grid-cols-2">
          {/* Do Steps */}
          <div className="rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/30 dark:bg-emerald-950/20 p-3.5 space-y-2">
            <p className="text-[13.5px] font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" aria-hidden="true" />
              標準執行步驟（照著做最安全）
            </p>
            <ul className="space-y-2 text-[13.5px] leading-relaxed text-slate-800 dark:text-slate-200">
              {activeModule.do_steps_zh.map((step) => (
                <li key={step} className="flex gap-2 items-start">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold shrink-0">✓</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Don't Taboos */}
          <div className="rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/30 dark:bg-rose-950/20 p-3.5 space-y-2">
            <p className="text-[13.5px] font-bold text-rose-900 dark:text-rose-300 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" aria-hidden="true" />
              絕對禁止事項（避免二次傷害與骨釘鬆動）
            </p>
            <ul className="space-y-2 text-[13.5px] leading-relaxed text-rose-950 dark:text-rose-100">
              {activeModule.dont_taboos_zh.map((taboo) => (
                <li key={taboo} className="flex gap-2 items-start">
                  <span className="text-rose-600 dark:text-rose-400 font-bold shrink-0">✗</span>
                  <span>{taboo}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Recovery Timeline Summary Table */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/70 p-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h4 className="text-[15px] font-bold text-slate-900 dark:text-white">
            術後與骨折恢復里程碑時間軸（住院第 0 天 → 術後 6 個月）
          </h4>
          <span className="text-[12px] text-slate-500 dark:text-slate-400">
            依手術複雜度與個人骨質密度由主治醫師微調
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[13px]">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                <th className="py-2 pr-3 font-bold min-w-[130px]">恢復階段</th>
                <th className="py-2 px-3 font-bold min-w-[110px]">時程</th>
                {scenario !== 'fracture' && <th className="py-2 px-3 font-bold min-w-[200px]">微創內視鏡減壓 (UBE/PELD)</th>}
                {scenario !== 'miss' && <th className="py-2 px-3 font-bold min-w-[210px]">壓迫性骨折／骨泥／微創融合固定</th>}
                <th className="py-2 pl-3 font-bold min-w-[200px]">階段照護關鍵</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/70 text-slate-800 dark:text-slate-200">
              {SPINE_POSTOP_TIMELINE.map((row) => (
                <tr key={row.stage} className="align-top">
                  <td className="py-2.5 pr-3 font-bold text-slate-900 dark:text-white">{row.stage}</td>
                  <td className="py-2.5 px-3 font-mono text-emerald-700 dark:text-emerald-400 font-semibold">{row.period}</td>
                  {scenario !== 'fracture' && <td className="py-2.5 px-3 leading-relaxed">{row.miss_endoscopic_goal}</td>}
                  {scenario !== 'miss' && <td className="py-2.5 px-3 leading-relaxed">{row.fracture_or_fusion_goal}</td>}
                  <td className="py-2.5 pl-3 leading-relaxed text-rose-800 dark:text-rose-300 font-medium">{row.key_precautions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Hospital Clinical Reference Footer */}
      <div className="rounded-2xl border border-sky-200 dark:border-sky-900/70 bg-sky-50/60 dark:bg-sky-950/30 p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1 text-[12.5px] text-slate-700 dark:text-slate-300">
          <p className="font-bold text-slate-900 dark:text-white">
            臨床技術與衛教資料參考：臺中市立老人復健綜合醫院（委託財團法人中國醫藥大學興建經營）骨科部・微創脊椎中心
          </p>
          <p>
            由<strong>張建鈞副院長暨骨科部主任</strong>領導之微創脊椎中心團隊（張建鈞、林琮凱、毛睿廷醫師），榮獲 2023 及 2024 年 SNQ 國家品質標章，為脊椎電腦導航國際示範中心與微創脊椎內視鏡國際訓練中心，涵蓋全脊椎內視鏡、3D 電腦導航（O-arm）、OLIF 側開微創、微創側彎駝背翻修與快速骨折微創智能照護網。
          </p>
        </div>
        <div className="flex flex-wrap gap-2 shrink-0">
          <a
            href="https://www.tmgrgh.org.tw/Department/Detail?depid=261"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-xl border border-sky-300 dark:border-sky-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-[12px] font-bold text-sky-800 dark:text-sky-300 hover:border-sky-500 transition-colors"
          >
            骨科部／微創脊椎中心首頁
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
          <a
            href="https://www.tmgrgh.org.tw/Department/Feature?depid=261"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-xl border border-sky-300 dark:border-sky-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-[12px] font-bold text-sky-800 dark:text-sky-300 hover:border-sky-500 transition-colors"
          >
            微創脊椎八大特色技術
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
};
export { TMGRGH_SPINE_CENTER_SERVICES };

