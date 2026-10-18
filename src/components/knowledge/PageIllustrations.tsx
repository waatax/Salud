import React from 'react';
import { KnowledgePage } from '../../types';

export const renderPageIllustration = (page: KnowledgePage): React.ReactNode => {
  const id = page.id;

  switch (id) {
    // ── Chapter W: 水與體液恆定 ──
    case 'PAGE-W-01':
      return (
        <svg viewBox="0 0 400 120" className="w-full h-auto max-h-28 text-xs font-mono">
          <rect x="10" y="20" width="220" height="80" rx="16" className="fill-sky-100/80 dark:fill-sky-950/60 stroke-sky-400 stroke-2" />
          <text x="120" y="55" textAnchor="middle" className="font-bold fill-sky-900 dark:fill-sky-200 text-[11px] font-sans">
            私人套房：細胞內液 (ICW ~67%)
          </text>
          <text x="120" y="75" textAnchor="middle" className="fill-sky-700 dark:fill-sky-400 text-[9px]">
            深層水分庫 · 酵素與代謝環境
          </text>
          <rect x="240" y="20" width="90" height="80" rx="12" className="fill-emerald-100/80 dark:fill-emerald-950/60 stroke-emerald-400 stroke-2" />
          <text x="285" y="55" textAnchor="middle" className="font-bold fill-emerald-900 dark:fill-emerald-200 text-[10px] font-sans">
            組織間液
          </text>
          <text x="285" y="75" textAnchor="middle" className="fill-emerald-700 dark:fill-emerald-400 text-[9px]">
            海綿 (~25%)
          </text>
          <rect x="340" y="20" width="50" height="80" rx="10" className="fill-rose-100/80 dark:fill-rose-950/60 stroke-rose-400 stroke-2" />
          <text x="365" y="55" textAnchor="middle" className="font-bold fill-rose-900 dark:fill-rose-200 text-[10px] font-sans">
            血管
          </text>
          <text x="365" y="75" textAnchor="middle" className="fill-rose-700 dark:fill-rose-400 text-[9px]">
            僅 8%!
          </text>
        </svg>
      );

    case 'PAGE-W-02':
      return (
        <div className="grid grid-cols-3 gap-2 p-3 bg-sky-50/70 dark:bg-sky-950/40 rounded-2xl border border-sky-200 dark:border-sky-800 text-center font-mono text-xs">
          <div className="space-y-1">
            <span className="text-rose-600 dark:text-rose-400 font-bold block text-[11px]">高滲透壓 (濃鹽水)</span>
            <div className="w-8 h-8 rounded-full bg-rose-200 dark:bg-rose-900 mx-auto flex items-center justify-center text-[10px]">萎縮</div>
            <span className="text-[9px] text-slate-500">水分子被抽出萎縮</span>
          </div>
          <div className="space-y-1 border-x border-sky-200 dark:border-sky-800 px-1">
            <span className="text-emerald-600 dark:text-emerald-400 font-bold block text-[11px]">等滲透壓 (285 mOsm)</span>
            <div className="w-8 h-8 rounded-full bg-emerald-200 dark:bg-emerald-900 mx-auto flex items-center justify-center text-[10px]">恆定</div>
            <span className="text-[9px] text-slate-500">內外水分動態平衡</span>
          </div>
          <div className="space-y-1">
            <span className="text-sky-600 dark:text-sky-400 font-bold block text-[11px]">低滲透壓 (純水過量)</span>
            <div className="w-8 h-8 rounded-full bg-sky-200 dark:bg-sky-900 mx-auto flex items-center justify-center text-[10px]">腫脹</div>
            <span className="text-[9px] text-slate-500">水倒灌腫脹破裂</span>
          </div>
        </div>
      );

    case 'PAGE-W-03':
      return (
        <svg viewBox="0 0 400 100" className="w-full h-auto max-h-24 text-xs font-mono">
          <circle cx="65" cy="50" r="35" className="fill-purple-100/80 dark:fill-purple-950/60 stroke-purple-400 stroke-2" />
          <text x="65" y="46" textAnchor="middle" className="font-bold fill-purple-900 dark:fill-purple-200 text-[10px] font-sans">
            滲透壓受器
          </text>
          <text x="65" y="62" textAnchor="middle" className="fill-purple-700 dark:fill-purple-400 text-[8px]">
            上升 1% 敲警鐘
          </text>
          <line x1="105" y1="50" x2="145" y2="50" className="stroke-purple-400 stroke-2" />
          <rect x="150" y="20" width="105" height="60" rx="10" className="fill-sky-100/80 dark:fill-sky-950/60 stroke-sky-400 stroke-2" />
          <text x="202" y="46" textAnchor="middle" className="font-bold fill-sky-900 dark:fill-sky-200 text-[10px] font-sans">
            ADH 關緊水閘
          </text>
          <text x="202" y="62" textAnchor="middle" className="fill-sky-700 dark:fill-sky-400 text-[8px]">
            腎臟回收水分濃縮
          </text>
          <line x1="260" y1="50" x2="295" y2="50" className="stroke-amber-400 stroke-2" />
          <rect x="300" y="20" width="90" height="60" rx="10" className="fill-amber-100/80 dark:fill-amber-950/60 stroke-amber-400 stroke-2" />
          <text x="345" y="46" textAnchor="middle" className="font-bold fill-amber-900 dark:fill-amber-200 text-[10px] font-sans">
            口渴大延遲
          </text>
          <text x="345" y="62" textAnchor="middle" className="fill-amber-700 dark:fill-amber-400 text-[8px]">
            已實質失水 2%
          </text>
        </svg>
      );

    case 'PAGE-W-06':
      return (
        <div className="flex items-center justify-around gap-2 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 font-mono text-xs">
          <div className="text-center space-y-1">
            <div className="w-8 h-8 rounded-full bg-emerald-200 border-2 border-emerald-400 mx-auto" />
            <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 block">淡檸檬黃</span>
            <span className="text-[9px] text-slate-400">水分充足理想</span>
          </div>
          <div className="text-slate-300">➔</div>
          <div className="text-center space-y-1">
            <div className="w-8 h-8 rounded-full bg-amber-300 border-2 border-amber-500 mx-auto" />
            <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300 block">金黃琥珀色</span>
            <span className="text-[9px] text-slate-400">輕度缺水注意</span>
          </div>
          <div className="text-slate-300">➔</div>
          <div className="text-center space-y-1">
            <div className="w-8 h-8 rounded-full bg-amber-800 border-2 border-amber-950 mx-auto" />
            <span className="text-[10px] font-bold text-rose-700 dark:text-rose-300 block">深烏龍茶色</span>
            <span className="text-[9px] text-rose-500 font-bold">嚴重缺水警報</span>
          </div>
        </div>
      );

    case 'PAGE-W-08':
      return (
        <div className="p-3 bg-rose-50/80 dark:bg-rose-950/40 rounded-2xl border border-rose-200 dark:border-rose-900/60 flex items-center justify-around gap-4 text-xs font-mono">
          <div className="text-center space-y-1">
            <div className="text-base">🧂 正常血鈉</div>
            <div className="font-bold text-slate-800 dark:text-slate-200">135–145 mmol/L</div>
            <span className="text-[10px] text-emerald-600">滲透壓細胞穩定</span>
          </div>
          <div className="text-rose-500 font-bold text-sm">➔ 狂灌純水 ➔</div>
          <div className="text-center space-y-1">
            <div className="text-base">🧠 運動低血鈉 (EAH)</div>
            <div className="font-bold text-rose-700 dark:text-rose-400">&lt; 130 mmol/L</div>
            <span className="text-[10px] text-rose-600 font-bold">水分倒灌腦細胞水腫</span>
          </div>
        </div>
      );

    case 'PAGE-W-09':
      return (
        <div className="p-3 bg-sky-50/80 dark:bg-sky-950/40 rounded-2xl border border-sky-200 dark:border-sky-900/60 flex items-center justify-between gap-2 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-xl bg-sky-500 text-white font-bold">SGLT1 高鐵</span>
            <span className="text-[11px] font-sans text-slate-700 dark:text-slate-300">
              1 鈉離子 + 1 葡萄糖 ＝ 瞬間狂飆帶動 260 水分子極速穿透吸收！
            </span>
          </div>
          <span className="px-2 py-0.5 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold shrink-0 text-[10px]">
            WHO ORS 基準
          </span>
        </div>
      );

    // ── Chapter O: 食用油與脂肪酸 ──
    case 'PAGE-O-01':
      return (
        <div className="grid grid-cols-2 gap-3 p-3 bg-amber-50/80 dark:bg-amber-950/40 rounded-2xl border border-amber-200 dark:border-amber-800 font-mono text-xs">
          <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <strong className="text-rose-600 dark:text-rose-400 block text-[11px]">飽和脂肪 (SFA)</strong>
            <div className="text-[10px] text-slate-600 dark:text-slate-400">直條狀緊密堆疊 ─── 剛性常溫固態</div>
            <span className="text-[9px] text-slate-500">過量攝取推高 LDL-C 膽固醇沉積</span>
          </div>
          <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <strong className="text-emerald-600 dark:text-emerald-400 block text-[11px]">不飽和脂肪 (MUFA/PUFA)</strong>
            <div className="text-[10px] text-slate-600 dark:text-slate-400">順式雙鍵天然彎折 ─\__─ 具流動性</div>
            <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-bold">維持細胞膜流動與受體敏感性</span>
          </div>
        </div>
      );

    case 'PAGE-O-02':
      return (
        <div className="p-3 bg-amber-50/80 dark:bg-amber-950/40 rounded-2xl border border-amber-200 dark:border-amber-800 space-y-2 font-mono text-xs">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-rose-600 dark:text-rose-400 font-bold">促發炎 Omega-6 (大豆沙拉油)</span>
            <span className="font-bold text-slate-700 dark:text-slate-300">天平失衡 20:1 ➔ 理想 &lt; 4:1</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">抗發炎 Omega-3 (深海魚油)</span>
          </div>
          <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-slate-800 flex overflow-hidden">
            <div className="bg-rose-500 h-full w-[85%]" title="外食常見 Omega-6 比例" />
            <div className="bg-emerald-500 h-full w-[15%]" title="缺乏的 Omega-3 比例" />
          </div>
          <div className="flex justify-between text-[9px] text-slate-500">
            <span>現代外食超標促發炎 (PGE2, LTB4)</span>
            <span>補充足量 EPA/DHA 促發炎消退素 (Resolvins)</span>
          </div>
        </div>
      );

    case 'PAGE-O-03':
      return (
        <div className="grid grid-cols-3 gap-2 p-3 bg-amber-50/70 dark:bg-amber-950/40 rounded-2xl border border-amber-200 dark:border-amber-800 text-center font-mono text-xs">
          <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-sky-600 font-bold block text-[10px]">低溫涼拌</span>
            <div className="font-bold text-slate-800 dark:text-slate-200 text-xs">亞麻仁油 107°C</div>
            <span className="text-[9px] text-rose-500 font-bold">高溫極易氧化</span>
          </div>
          <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-emerald-600 font-bold block text-[10px]">日常中溫煎炒</span>
            <div className="font-bold text-emerald-600 dark:text-emerald-400 text-xs">初榨橄欖油 200°C</div>
            <span className="text-[9px] text-slate-500">單元不飽和高耐熱</span>
          </div>
          <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-amber-600 font-bold block text-[10px]">高溫大火爆炒</span>
            <div className="font-bold text-slate-800 dark:text-slate-200 text-xs">酪梨油 270°C</div>
            <span className="text-[9px] text-slate-500">超高發煙點不熱裂</span>
          </div>
        </div>
      );

    // ── Chapter A: 酒精毒理與代謝 ──
    case 'PAGE-A-01':
      return (
        <div className="p-3 bg-purple-50/80 dark:bg-purple-950/40 rounded-2xl border border-purple-200 dark:border-purple-800 flex items-center justify-around gap-2 font-mono text-xs">
          <div className="text-center space-y-0.5">
            <span className="text-slate-500 text-[10px]">乙醇 Ethanol</span>
            <div className="font-bold text-purple-700 dark:text-purple-300">酒 精</div>
          </div>
          <div className="text-purple-400 font-bold text-xs">➔ ADH ➔</div>
          <div className="text-center space-y-0.5 p-1 rounded-lg bg-rose-100 dark:bg-rose-950 border border-rose-300">
            <span className="text-rose-700 dark:text-rose-300 text-[10px] font-bold">一級致癌物</span>
            <div className="font-bold text-rose-800 dark:text-rose-200">乙 醛</div>
          </div>
          <div className="text-purple-400 font-bold text-xs">➔ ALDH2 ➔</div>
          <div className="text-center space-y-0.5">
            <span className="text-emerald-600 text-[10px]">無毒代謝產物</span>
            <div className="font-bold text-emerald-700 dark:text-emerald-300">乙 酸 (醋酸)</div>
          </div>
        </div>
      );

    case 'PAGE-A-02':
      return (
        <div className="p-3 bg-rose-50/80 dark:bg-rose-950/40 rounded-2xl border border-rose-200 dark:border-rose-900/60 space-y-2 font-mono text-xs">
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white font-bold text-[10px]">
              🚨 台灣人口盛行率高達 47%
            </span>
            <span className="text-rose-700 dark:text-rose-300 font-bold text-xs">食道癌風險高達 50 倍！</span>
          </div>
          <p className="text-[11px] font-sans text-slate-700 dark:text-slate-300 leading-tight">
            飲酒臉紅不是代謝好或氣血活絡，而是 ALDH2 酵素基因缺陷導致一級致癌物「乙醛」無法排除並瞬間暴增。
          </p>
        </div>
      );

    case 'PAGE-A-03':
      return (
        <div className="p-3 bg-purple-50/80 dark:bg-purple-950/40 rounded-2xl border border-purple-200 dark:border-purple-800 font-mono text-xs space-y-1">
          <div className="flex items-center justify-between text-[11px] font-bold">
            <span className="text-purple-700 dark:text-purple-300">前半夜：GABA 鎮定假象</span>
            <span className="text-rose-600 dark:text-rose-400">後半夜：REM 睡眠崩潰與利尿頻醒</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden flex">
            <div className="w-1/2 bg-purple-400" />
            <div className="w-1/2 bg-rose-500 animate-pulse" />
          </div>
          <div className="text-[9px] text-slate-500 flex justify-between">
            <span>入睡速度加快但缺少深層修復</span>
            <span>交感神經反彈、心率飆升、下視丘 ADH 受抑脫水</span>
          </div>
        </div>
      );

    // ── Chapter E: 能量與代謝平衡 ──
    case 'PAGE-E-01':
      return (
        <div className="p-3 bg-amber-50/80 dark:bg-amber-950/40 rounded-2xl border border-amber-200 dark:border-amber-800 flex items-center justify-around font-mono text-xs">
          <div className="text-center">
            <div className="text-xs text-slate-500">攝入熱量 Calories In</div>
            <strong className="text-amber-700 dark:text-amber-300 text-sm">飲食營養 (C/P/F)</strong>
          </div>
          <div className="text-lg font-bold text-amber-600">⚖️ 平衡天秤</div>
          <div className="text-center">
            <div className="text-xs text-slate-500">消耗熱量 Calories Out</div>
            <strong className="text-emerald-700 dark:text-emerald-300 text-sm">TDEE (BMR+NEAT+TEF)</strong>
          </div>
        </div>
      );

    case 'PAGE-E-02':
      return (
        <div className="p-3 bg-amber-50/80 dark:bg-amber-950/40 rounded-2xl border border-amber-200 dark:border-amber-800 space-y-2 font-mono text-xs">
          <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300 flex justify-between">
            <span>TDEE 每日總能耗四重奏拆解：</span>
            <span className="text-amber-600 font-bold">NEAT 是日常燃脂最大變異槓桿</span>
          </div>
          <div className="w-full h-4 rounded-xl bg-slate-200 dark:bg-slate-800 overflow-hidden flex text-[9px] text-white font-bold text-center leading-4">
            <div className="bg-sky-500 w-[65%]" title="BMR 基礎代謝">BMR 65%</div>
            <div className="bg-emerald-500 w-[20%]" title="NEAT 非運動產熱">NEAT 20%</div>
            <div className="bg-purple-500 w-[10%]" title="TEF 食物產熱">TEF 10%</div>
            <div className="bg-amber-500 w-[5%]" title="EAT 運動">5%</div>
          </div>
        </div>
      );

    case 'PAGE-E-03':
      return (
        <div className="p-3 bg-rose-50/80 dark:bg-rose-950/40 rounded-2xl border border-rose-200 dark:border-rose-900/60 flex items-center justify-between gap-2 font-mono text-xs">
          <div className="space-y-0.5">
            <span className="text-rose-700 dark:text-rose-400 font-bold text-[11px]">過激節食熱量斷崖</span>
            <p className="text-[10px] text-slate-600 dark:text-slate-400 font-sans">
              瘦素 Leptin 崩跌 ➔ 大腦開啟飢餓保命模式 ➔ 代謝適應能耗下調 15% ➔ 暴食反彈
            </p>
          </div>
          <span className="px-2.5 py-1 rounded-xl bg-emerald-500 text-white font-bold text-[10px] shrink-0">
            解方: 300-500 kcal 漸進赤字
          </span>
        </div>
      );

    // ── Chapter P: 蛋白質與肌蛋白合成 ──
    case 'PAGE-P-01':
      return (
        <div className="p-3 bg-blue-50/80 dark:bg-blue-950/40 rounded-2xl border border-blue-200 dark:border-blue-800 flex items-center justify-around gap-2 font-mono text-xs">
          <div className="text-center p-2 rounded-xl bg-slate-100 dark:bg-slate-800">
            <span className="text-slate-500 text-[10px]">低於門檻 (&lt; 1.5g)</span>
            <div className="text-slate-400 font-bold">mTOR 開關休眠</div>
            <span className="text-[9px] text-slate-400">無法誘發最大 MPS</span>
          </div>
          <div className="text-blue-500 font-bold text-sm">➔ 突破關鍵 ➔</div>
          <div className="text-center p-2 rounded-xl bg-blue-100 dark:bg-blue-900 border border-blue-300">
            <span className="text-blue-700 dark:text-blue-300 text-[10px] font-bold">白胺酸門檻 (2.7–3.0g)</span>
            <div className="text-blue-900 dark:text-blue-100 font-extrabold text-xs">mTORC1 瞬間引爆</div>
            <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-bold">啟動肌蛋白合成高峰</span>
          </div>
        </div>
      );

    case 'PAGE-P-02':
      return (
        <div className="grid grid-cols-2 gap-2 p-3 bg-blue-50/80 dark:bg-blue-950/40 rounded-2xl border border-blue-200 dark:border-blue-800 font-mono text-xs">
          <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-rose-600 font-bold text-[10px]">❌ 傾斜集中型 (晚餐狂嗑 90g)</span>
            <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded flex">
              <div className="w-[10%] bg-slate-400" />
              <div className="w-[10%] bg-slate-400" />
              <div className="w-[80%] bg-rose-500" />
            </div>
            <span className="text-[9px] text-slate-500">早午餐未達門檻，晚餐溢出氧化浪費</span>
          </div>
          <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-emerald-600 font-bold text-[10px]">✅ 均勻脈衝型 (30g x 3-4餐)</span>
            <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded flex gap-1">
              <div className="w-1/3 bg-emerald-500 rounded" />
              <div className="w-1/3 bg-emerald-500 rounded" />
              <div className="w-1/3 bg-emerald-500 rounded" />
            </div>
            <span className="text-[9px] text-emerald-600 font-bold">全日 24 小時維持多次合成高峰</span>
          </div>
        </div>
      );

    case 'PAGE-P-03':
      return (
        <div className="p-3 bg-rose-50/80 dark:bg-rose-950/40 rounded-2xl border border-rose-200 dark:border-rose-900/60 flex items-center justify-between gap-3 font-mono text-xs">
          <div className="space-y-0.5">
            <strong className="text-rose-700 dark:text-rose-400 block text-[11px]">慢性腎病 (CKD) 嚴格限蛋白安全閘</strong>
            <span className="text-[10px] text-slate-600 dark:text-slate-400 font-sans">
              健康腎臟耐受 2.2 g/kg 無虞；但 eGFR &lt; 45 (CKD G3b+) 須限至 0.6–0.8 g/kg 減緩腎絲球硬化。
            </span>
          </div>
          <span className="px-2.5 py-1 rounded-xl bg-rose-600 text-white font-bold text-[10px] shrink-0">
            eGFR 警示線
          </span>
        </div>
      );

    // ── Chapter C: 碳水化合物與膳食纖維 ──
    case 'PAGE-C-01':
      return (
        <div className="p-3 bg-teal-50/80 dark:bg-teal-950/40 rounded-2xl border border-teal-200 dark:border-teal-800 font-mono text-xs space-y-1">
          <div className="flex justify-between text-[11px] font-bold">
            <span className="text-rose-600">高 GI (GI ≥ 70)：尖銳血糖過山車</span>
            <span className="text-teal-700 dark:text-teal-300">低 GI (GI ≤ 55)：溫和續航平原波</span>
          </div>
          <svg viewBox="0 0 300 40" className="w-full h-8">
            <path d="M 0 35 Q 40 5, 80 35 T 160 35" fill="none" stroke="#F43F5E" strokeWidth="2.5" />
            <path d="M 0 35 Q 80 20, 160 25 T 300 35" fill="none" stroke="#0D9488" strokeWidth="2.5" />
          </svg>
          <div className="flex justify-between text-[9px] text-slate-500">
            <span>胰島素暴衝 ➔ 脂肪囤積 ➔ 2小時反彈飢餓</span>
            <span>緩慢水解釋放 ➔ 穩定大腦專注與持久飽足</span>
          </div>
        </div>
      );

    case 'PAGE-C-02':
      return (
        <div className="p-3 bg-teal-50/80 dark:bg-teal-950/40 rounded-2xl border border-teal-200 dark:border-teal-800 flex items-center justify-around font-mono text-xs">
          <div className="text-center">
            <span className="text-slate-500 text-[10px]">水溶性膳食纖維</span>
            <div className="font-bold text-teal-800 dark:text-teal-200 text-xs">β-葡聚醣 / 果膠</div>
          </div>
          <div className="text-teal-500 font-bold text-xs">➔ 腸道微菌發酵 ➔</div>
          <div className="text-center p-1.5 rounded-xl bg-teal-100 dark:bg-teal-900 border border-teal-300">
            <span className="text-teal-800 dark:text-teal-200 text-[10px] font-bold">短鏈脂肪酸 (SCFA)</span>
            <div className="font-bold text-emerald-700 dark:text-emerald-300 text-xs">丁酸 (Butyrate)</div>
            <span className="text-[8px] text-emerald-600">修復腸黏膜屏障</span>
          </div>
        </div>
      );

    case 'PAGE-C-03':
      return (
        <div className="grid grid-cols-2 gap-2 p-3 bg-amber-50/80 dark:bg-amber-950/40 rounded-2xl border border-amber-200 dark:border-amber-800 font-mono text-xs">
          <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-amber-700 font-bold text-[10px]">肌肉肝醣庫 (~400g)</span>
            <div className="font-bold text-slate-800 dark:text-slate-200 text-xs">封閉型自用發電機</div>
            <span className="text-[9px] text-slate-500">缺少葡萄糖-6-磷酸酶，僅供肌纖維燃燒</span>
          </div>
          <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-emerald-600 font-bold text-[10px]">肝臟肝醣庫 (~100g)</span>
            <div className="font-bold text-slate-800 dark:text-slate-200 text-xs">全身公用水庫</div>
            <span className="text-[9px] text-slate-500">分解入血穩定空腹與夜間大腦血糖恆定</span>
          </div>
        </div>
      );

    // ── Chapter S: 糖與游離糖 ──
    case 'PAGE-S-01':
      return (
        <div className="p-3 bg-rose-50/80 dark:bg-rose-950/40 rounded-2xl border border-rose-200 dark:border-rose-900/60 flex items-center justify-between font-mono text-xs">
          <div className="space-y-1">
            <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white font-bold text-[10px]">
              WHO 每日游離糖上限：&lt; 25g (約 5 顆方糖)
            </span>
            <div className="text-[11px] text-slate-700 dark:text-slate-300 font-sans">
              一杯市售 700mL 全糖珍奶含糖高達 <strong>60–70g</strong>，直接飆破 2.5 天上限！
            </div>
          </div>
          <div className="text-2xl font-bold shrink-0">🧋💥</div>
        </div>
      );

    case 'PAGE-S-02':
      return (
        <div className="p-3 bg-amber-50/80 dark:bg-amber-950/40 rounded-2xl border border-amber-200 dark:border-amber-800 font-mono text-xs space-y-1">
          <div className="flex justify-between text-[11px] font-bold">
            <span className="text-sky-600">葡萄糖：全身 80% 肌肉組織先消耗</span>
            <span className="text-rose-600 font-bold">果糖：100% 直灌肝臟特異性生化</span>
          </div>
          <p className="text-[10px] text-slate-600 dark:text-slate-400 font-sans leading-tight">
            果糖繞過磷酸果糖激酶 (PFK) 剎車機制，不受細胞能量飽和負回饋調節，源源不絕轉化為三酸甘油酯 ➔ 引發非酒精性脂肪肝 (NAFLD)。
          </p>
        </div>
      );

    case 'PAGE-S-03':
      return (
        <div className="p-3 bg-purple-50/80 dark:bg-purple-950/40 rounded-2xl border border-purple-200 dark:border-purple-800 flex items-center justify-between gap-3 font-mono text-xs">
          <div className="space-y-0.5">
            <span className="text-purple-700 dark:text-purple-300 font-bold text-[11px]">高倍甜味劑大腦訊號脫鉤</span>
            <p className="text-[10px] text-slate-600 dark:text-slate-400 font-sans">
              舌尖甜味受體接受 200–600 倍甜味衝擊，但腸胃與血液未獲得相應熱量回饋，易干擾中樞飽足平衡並促發代償性食慾。
            </p>
          </div>
          <span className="px-2 py-0.5 rounded-lg bg-purple-200 dark:bg-purple-900 text-purple-800 dark:text-purple-200 font-bold text-[10px] shrink-0">
            代糖雙面刃
          </span>
        </div>
      );

    // ── Chapter N: 鈉、鉀與血壓生理 ──
    case 'PAGE-N-01':
      return (
        <div className="p-3 bg-red-50/80 dark:bg-red-950/40 rounded-2xl border border-red-200 dark:border-red-900/60 flex items-center justify-around font-mono text-xs">
          <div className="text-center space-y-0.5">
            <span className="text-red-600 text-[10px] font-bold">外食重鹹高鈉</span>
            <div className="text-slate-800 dark:text-slate-200 font-bold">抽吸水分入血管</div>
          </div>
          <div className="text-red-500 font-bold text-sm">➔ 體液擴張 ➔</div>
          <div className="text-center space-y-0.5">
            <span className="text-red-700 dark:text-red-400 text-[10px] font-bold">血管平滑肌張力</span>
            <div className="text-rose-700 dark:text-rose-300 font-extrabold text-xs">收縮壓 SBP 飆升</div>
          </div>
        </div>
      );

    case 'PAGE-N-02':
      return (
        <div className="p-3 bg-emerald-50/80 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800 flex items-center justify-around font-mono text-xs">
          <div className="text-center">
            <span className="text-emerald-700 text-[10px] font-bold">鉀離子 (K+) 攝取</span>
            <div className="text-slate-800 dark:text-slate-200 font-bold">促腎小管排鈉</div>
          </div>
          <div className="text-emerald-500 font-bold text-sm">➔ 血管超極化 ➔</div>
          <div className="text-center">
            <span className="text-emerald-700 text-[10px] font-bold">一氧化氮 (NO) 釋放</span>
            <div className="text-emerald-600 dark:text-emerald-400 font-bold text-xs">動脈壁舒張降壓</div>
          </div>
        </div>
      );

    case 'PAGE-N-03':
      return (
        <div className="p-3 bg-amber-50/80 dark:bg-amber-950/40 rounded-2xl border border-amber-200 dark:border-amber-800 font-mono text-xs space-y-1">
          <div className="flex justify-between text-[11px] font-bold text-amber-900 dark:text-amber-200">
            <span>台灣傳統排骨便當隱形鈉解密：</span>
            <span className="text-rose-600">總鈉量 ~1600mg (超標 70%)</span>
          </div>
          <div className="grid grid-cols-4 gap-1 text-[9px] text-center">
            <div className="bg-white dark:bg-slate-900 p-1 rounded border">炸肉排 400mg</div>
            <div className="bg-white dark:bg-slate-900 p-1 rounded border">滷汁拌飯 350mg</div>
            <div className="bg-white dark:bg-slate-900 p-1 rounded border">炒酸菜麵輪 500mg</div>
            <div className="bg-white dark:bg-slate-900 p-1 rounded border">附贈貢丸湯 350mg</div>
          </div>
        </div>
      );

    // ── Chapter M: 微量營養素與生物利用率 ──
    case 'PAGE-M-01':
      return (
        <div className="grid grid-cols-2 gap-2 p-3 bg-violet-50/80 dark:bg-violet-950/40 rounded-2xl border border-violet-200 dark:border-violet-800 font-mono text-xs">
          <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <strong className="text-violet-700 dark:text-violet-300 block text-[10px]">血基質鐵 (紅肉/內臟)</strong>
            <span className="text-emerald-600 font-bold text-[11px]">吸收率 15–35%</span>
            <div className="text-[9px] text-slate-500">不受飲食植酸單寧干擾</div>
          </div>
          <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <strong className="text-amber-700 dark:text-amber-300 block text-[10px]">非血基質鐵 (深綠蔬菜/豆類)</strong>
            <span className="text-rose-600 font-bold text-[11px]">吸收率僅 2–10%</span>
            <div className="text-[9px] text-emerald-600 font-bold">搭配維生素 C 助攻還原 3倍</div>
          </div>
        </div>
      );

    case 'PAGE-M-02':
      return (
        <div className="p-3 bg-violet-50/80 dark:bg-violet-950/40 rounded-2xl border border-violet-200 dark:border-violet-800 flex items-center justify-around font-mono text-xs">
          <div className="text-center">
            <span className="text-sky-600 text-[10px] font-bold">維生素 D3</span>
            <div className="font-bold text-slate-800 dark:text-slate-200 text-xs">打開腸道吸鈣門</div>
          </div>
          <div className="text-violet-500 font-bold text-xs">➔ 鈣質入血 ➔</div>
          <div className="text-center">
            <span className="text-emerald-600 text-[10px] font-bold">維生素 K2</span>
            <div className="font-bold text-slate-800 dark:text-slate-200 text-xs">引導鈣離子沉積入骨</div>
          </div>
        </div>
      );

    case 'PAGE-M-03':
      return (
        <div className="p-3 bg-sky-50/80 dark:bg-sky-950/40 rounded-2xl border border-sky-200 dark:border-sky-800 flex items-center justify-between font-mono text-xs">
          <div className="space-y-0.5">
            <span className="text-sky-700 dark:text-sky-300 font-bold text-[11px]">B12 + 葉酸單碳代謝齒輪</span>
            <p className="text-[10px] text-slate-600 dark:text-slate-400 font-sans">
              將具血管刮刀毒性的「同半胱胺酸」甲基化轉化為甲硫胺酸，預防動脈粥狀硬化與中風。
            </p>
          </div>
          <span className="px-2 py-0.5 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold text-[10px] shrink-0">
            清除血管毒素
          </span>
        </div>
      );

    // ── Chapter D: 飲食模式與流行病學 ──
    case 'PAGE-D-01':
      return (
        <div className="p-3 bg-emerald-50/80 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800 flex items-center justify-between gap-3 font-mono text-xs">
          <div className="space-y-0.5">
            <strong className="text-emerald-800 dark:text-emerald-200 text-[11px] block">
              PREDIMED 隨機對照試驗 (NEJM 萬人研究)
            </strong>
            <p className="text-[10px] text-slate-600 dark:text-slate-400 font-sans">
              特級初榨橄欖油 + 堅果地中海飲食，主要心血管不良事件 (MACE) 顯著降低 <strong>30% (HR 0.70)</strong>。
            </p>
          </div>
          <span className="px-2.5 py-1 rounded-xl bg-emerald-600 text-white font-bold text-[10px] shrink-0">
            CVD 降幅 30%
          </span>
        </div>
      );

    case 'PAGE-D-02':
      return (
        <div className="p-3 bg-teal-50/80 dark:bg-teal-950/40 rounded-2xl border border-teal-200 dark:border-teal-800 font-mono text-xs space-y-1">
          <div className="flex justify-between text-[11px] font-bold text-teal-800 dark:text-teal-200">
            <span>DASH 得舒飲食三大核心降壓礦物質：</span>
            <span className="text-emerald-600 font-bold">收縮壓降幅 -11 mmHg</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5 text-center text-[10px]">
            <div className="p-1 rounded-lg bg-white dark:bg-slate-900 border">高鉀 (蔬果)</div>
            <div className="p-1 rounded-lg bg-white dark:bg-slate-900 border">高鎂 (全穀堅果)</div>
            <div className="p-1 rounded-lg bg-white dark:bg-slate-900 border">高鈣 (低脂乳品)</div>
          </div>
        </div>
      );

    case 'PAGE-D-03':
      return (
        <div className="p-3 bg-purple-50/80 dark:bg-purple-950/40 rounded-2xl border border-purple-200 dark:border-purple-800 flex items-center justify-between font-mono text-xs">
          <div className="space-y-0.5">
            <span className="text-purple-700 dark:text-purple-300 font-bold text-[11px]">MIND 麥得飲食大腦神經防護</span>
            <p className="text-[10px] text-slate-600 dark:text-slate-400 font-sans">
              深色莓果花青素跨越血腦屏障 (BBB)，清除自由基與 β-澱粉樣蛋白，阿茲海默症風險降低高達 53%。
            </p>
          </div>
          <span className="text-2xl shrink-0">🫐🧠</span>
        </div>
      );

    // ── Chapter F: 食品標示與台灣外食 ──
    case 'PAGE-F-01':
      return (
        <div className="p-3 bg-cyan-50/80 dark:bg-cyan-950/40 rounded-2xl border border-cyan-200 dark:border-cyan-800 font-mono text-xs space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-bold">
            <span className="text-rose-600">⚠️ 反式脂肪標示陷阱：&lt; 0.3g 可標示為「0」！</span>
            <span className="text-cyan-700 dark:text-cyan-300">必看「每份 vs 每百克」</span>
          </div>
          <p className="text-[10px] text-slate-600 dark:text-slate-400 font-sans leading-tight">
            一包餅乾常拆成 4–5 份，每份標示低熱量無反式脂肪，整包吃下瞬間熱量破表並累積大量氫化油！
          </p>
        </div>
      );

    case 'PAGE-F-02':
      return (
        <div className="grid grid-cols-2 gap-2 p-3 bg-amber-50/80 dark:bg-amber-950/40 rounded-2xl border border-amber-200 dark:border-amber-800 font-mono text-xs">
          <div className="p-1.5 rounded-xl bg-white dark:bg-slate-900 border text-center space-y-0.5">
            <span className="text-rose-600 font-bold text-[10px]">火鍋高湯與貢丸魚餃</span>
            <div className="text-[9px] text-slate-500">一碗湯鈉破 800mg + 飽和重組油</div>
          </div>
          <div className="p-1.5 rounded-xl bg-white dark:bg-slate-900 border text-center space-y-0.5">
            <span className="text-rose-600 font-bold text-[10px]">油麵與肉燥乾麵</span>
            <div className="text-[9px] text-slate-500">鈉鹽拌入麵體 + 淋高脂豬油渣</div>
          </div>
        </div>
      );

    case 'PAGE-F-03':
      return (
        <div className="p-3 bg-emerald-50/80 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800 font-mono text-xs space-y-1">
          <span className="text-emerald-800 dark:text-emerald-200 font-bold text-[11px] block">
            🍱 台灣外食族減害三不三要黃金 SOP：
          </span>
          <div className="grid grid-cols-2 gap-2 text-[10px] font-sans">
            <div className="text-rose-700 dark:text-rose-300">
              ❌ 不喝羹湯大骨湯 / 不吃油炸厚皮 / 不淋肉燥醬汁
            </div>
            <div className="text-emerald-700 dark:text-emerald-300 font-bold">
              ✅ 要加點一份純燙青菜 / 要先吃蛋白質 / 要自備無糖綠茶
            </div>
          </div>
        </div>
      );

    default:
      // 通用高精度生理圖譜回退機制
      return (
        <div className="p-3 bg-slate-50/80 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 font-mono text-xs space-y-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-bold text-slate-700 dark:text-slate-300">
              🔬 臨床實證關鍵焦點 · {page.id}
            </span>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
              Oxford CEBM Level 1a
            </span>
          </div>
          <p className="text-[10px] text-slate-600 dark:text-slate-400 font-sans line-clamp-2">
            {page.hook || page.clinical_pearl}
          </p>
        </div>
      );
  }
};
