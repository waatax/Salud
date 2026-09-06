import React from 'react';

interface Props {
  expertId: string;
  className?: string;
}

export const ExpertSeatIllustration: React.FC<Props> = ({ expertId, className = '' }) => {
  switch (expertId) {
    // ── EC-01: 醫療總監 · 紅旗急症與安全閘門 ──
    case 'EC-01':
      return (
        <div className={`p-4 rounded-2xl bg-gradient-to-br from-rose-500/10 via-amber-500/5 to-slate-900/10 border border-rose-500/30 dark:border-rose-500/40 relative overflow-hidden ${className}`}>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <svg className="w-full sm:w-48 h-32 shrink-0 drop-shadow-md" viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="15" width="180" height="100" rx="16" className="fill-slate-900/80 stroke-rose-500" strokeWidth="2" />
              <path d="M25 65 H55 L65 35 L75 95 L85 50 L95 75 L105 65 H175" className="stroke-rose-400" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="145" cy="40" r="14" className="fill-rose-500/20 stroke-rose-400" strokeWidth="2" />
              <path d="M145 32 V43 M145 47 V48" className="stroke-rose-300" strokeWidth="2.5" strokeLinecap="round" />
              <rect x="30" y="85" width="60" height="18" rx="5" className="fill-rose-600" />
              <text x="60" y="97" textAnchor="middle" className="fill-white font-mono text-[9px] font-bold">119 緊急急診</text>
              <rect x="105" y="85" width="65" height="18" rx="5" className="fill-emerald-600" />
              <text x="137" y="97" textAnchor="middle" className="fill-white font-mono text-[9px] font-bold">安全閘門鎖定</text>
            </svg>
            <div className="space-y-1 text-center sm:text-left">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/40">
                🚨 EC-01 臨床急症分流插圖
              </span>
              <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                紅旗急症 0 延遲 · 立即撥打 119 救護車
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                胸痛輻射至下巴、劇烈頭痛或呼吸困難時，立即退出任何手機健康 App，第一時間由專業急診團隊守護生命！
              </p>
            </div>
          </div>
        </div>
      );

    // ── EC-02: 家庭內科 · 三高前期黃金逆轉 ──
    case 'EC-02':
      return (
        <div className={`p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 via-emerald-500/5 to-slate-900/10 border border-amber-500/30 dark:border-amber-500/40 relative overflow-hidden ${className}`}>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <svg className="w-full sm:w-48 h-32 shrink-0 drop-shadow-md" viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="15" width="180" height="100" rx="16" className="fill-slate-900/80 stroke-amber-500" strokeWidth="2" />
              <line x1="100" y1="30" x2="100" y2="95" className="stroke-amber-400" strokeWidth="3" />
              <line x1="45" y1="50" x2="155" y2="50" className="stroke-amber-400" strokeWidth="3" strokeLinecap="round" />
              <path d="M45 50 L30 75 H60 Z" className="fill-rose-500/30 stroke-rose-400" strokeWidth="1.5" />
              <text x="45" y="90" textAnchor="middle" className="fill-rose-300 font-mono text-[8px] font-bold">三高紅字</text>
              <path d="M155 50 L140 75 H170 Z" className="fill-emerald-500/30 stroke-emerald-400" strokeWidth="1.5" />
              <text x="155" y="90" textAnchor="middle" className="fill-emerald-300 font-mono text-[8px] font-bold">逆轉平衡</text>
              <circle cx="100" cy="30" r="6" className="fill-amber-400" />
              <rect x="65" y="100" width="70" height="16" rx="4" className="fill-amber-500/20 stroke-amber-400" strokeWidth="1" />
              <text x="100" y="111" textAnchor="middle" className="fill-amber-300 font-mono text-[8px] font-bold">黃金 90 天逆轉期</text>
            </svg>
            <div className="space-y-1 text-center sm:text-left">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/40">
                ⚖️ EC-02 三高前期平衡圖解
              </span>
              <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                微幅紅字不是絕症 · 趁早換好習慣全能逆轉
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                肚子稍大、血壓微高時，戒掉含糖飲料、每天快走 20 分鐘，90 天內血管指標就能穩健回歸正常！
              </p>
            </div>
          </div>
        </div>
      );

    // ── EC-03: 心臟內科 · 動脈血管與 ApoB 暢通 ──
    case 'EC-03':
      return (
        <div className={`p-4 rounded-2xl bg-gradient-to-br from-rose-500/10 via-purple-500/5 to-slate-900/10 border border-purple-500/30 dark:border-purple-500/40 relative overflow-hidden ${className}`}>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <svg className="w-full sm:w-48 h-32 shrink-0 drop-shadow-md" viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="15" width="180" height="100" rx="16" className="fill-slate-900/80 stroke-purple-500" strokeWidth="2" />
              <path d="M25 45 C70 45 130 45 175 45 C175 85 130 85 25 85 Z" className="fill-rose-950/60 stroke-rose-500" strokeWidth="2" />
              <circle cx="50" cy="65" r="7" className="fill-emerald-400/80" />
              <circle cx="85" cy="60" r="7" className="fill-emerald-400/80" />
              <circle cx="120" cy="68" r="6" className="fill-emerald-400/80" />
              <circle cx="155" cy="63" r="7" className="fill-emerald-400/80" />
              <path d="M70 47 Q95 62 120 47" className="fill-amber-500/50 stroke-amber-400" strokeWidth="1.5" />
              <text x="95" y="38" textAnchor="middle" className="fill-amber-300 font-mono text-[8px] font-bold">ApoB 斑塊清除</text>
              <rect x="35" y="98" width="130" height="16" rx="4" className="fill-purple-500/20 stroke-purple-400" strokeWidth="1" />
              <text x="100" y="109" textAnchor="middle" className="fill-purple-200 font-mono text-[8px] font-bold">血液暢通 · 心臟零負擔</text>
            </svg>
            <div className="space-y-1 text-center sm:text-left">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/40">
                🫀 EC-03 血管保養插圖
              </span>
              <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                血管就像自來水管 · 用好油防鏽、控制血壓防爆管
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                飲食換成特級初榨橄欖油、落實「722」量血壓法，預防膽固醇泥沙卡在動脈壁，心血管長壽又通暢。
              </p>
            </div>
          </div>
        </div>
      );

    // ── EC-04: 新陳代謝 · 血糖海盜船平穩波浪 ──
    case 'EC-04':
      return (
        <div className={`p-4 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-sky-500/5 to-slate-900/10 border border-emerald-500/30 dark:border-emerald-500/40 relative overflow-hidden ${className}`}>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <svg className="w-full sm:w-48 h-32 shrink-0 drop-shadow-md" viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="15" width="180" height="100" rx="16" className="fill-slate-900/80 stroke-emerald-500" strokeWidth="2" />
              <path d="M25 85 Q45 20 70 85 Q90 30 110 85" className="stroke-rose-500" strokeWidth="2" strokeDasharray="3 3" />
              <text x="65" y="32" className="fill-rose-400 font-mono text-[8px] font-bold">精緻糖暴衝</text>
              <path d="M25 70 C55 60 85 65 115 63 C145 61 165 65 175 64" className="stroke-emerald-400" strokeWidth="3" strokeLinecap="round" />
              <text x="145" y="55" className="fill-emerald-300 font-mono text-[8px] font-bold">蔬菜蛋白平緩波</text>
              <rect x="25" y="58" width="150" height="18" rx="3" className="fill-emerald-500/10" />
              <rect x="40" y="98" width="120" height="16" rx="4" className="fill-emerald-500/20 stroke-emerald-400" strokeWidth="1" />
              <text x="100" y="109" textAnchor="middle" className="fill-emerald-200 font-mono text-[8px] font-bold">進食順序：菜 ➜ 肉 ➜ 飯</text>
            </svg>
            <div className="space-y-1 text-center sm:text-left">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/40">
                📉 EC-04 血糖穩定插圖
              </span>
              <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                別坐血糖海盜船 · 先吃菜再吃肉最後吃飯
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                只要調整吃飯順序，高纖蔬菜與蛋白質就能像海綿般減緩糖分吸收，飯後不再昏昏欲睡！
              </p>
            </div>
          </div>
        </div>
      );

    // ── EC-05: 註冊營養師 · 地中海黃金餐盤 ──
    case 'EC-05':
      return (
        <div className={`p-4 rounded-2xl bg-gradient-to-br from-lime-500/10 via-amber-500/5 to-slate-900/10 border border-lime-500/30 dark:border-lime-500/40 relative overflow-hidden ${className}`}>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <svg className="w-full sm:w-48 h-32 shrink-0 drop-shadow-md" viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="15" width="180" height="100" rx="16" className="fill-slate-900/80 stroke-lime-500" strokeWidth="2" />
              <circle cx="100" cy="65" r="40" className="fill-slate-800 stroke-slate-600" strokeWidth="2" />
              <path d="M100 65 L60 65 A40 40 0 0 1 100 25 Z" className="fill-emerald-500/70" />
              <path d="M100 65 L60 65 A40 40 0 0 0 100 105 Z" className="fill-emerald-600/70" />
              <text x="78" y="67" textAnchor="middle" className="fill-white font-mono text-[8px] font-extrabold">1/2 蔬菜</text>
              <path d="M100 65 L100 25 A40 40 0 0 1 140 65 Z" className="fill-amber-500/80" />
              <text x="118" y="47" textAnchor="middle" className="fill-slate-900 font-mono text-[8px] font-extrabold">1/4 蛋白</text>
              <path d="M100 65 L140 65 A40 40 0 0 1 100 105 Z" className="fill-amber-700/80" />
              <text x="118" y="85" textAnchor="middle" className="fill-white font-mono text-[8px] font-extrabold">1/4 全穀</text>
              <rect x="25" y="45" width="4" height="40" rx="2" className="fill-slate-400" />
              <rect x="171" y="45" width="4" height="40" rx="2" className="fill-slate-400" />
            </svg>
            <div className="space-y-1 text-center sm:text-left">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-lime-500/20 text-lime-700 dark:text-lime-300 border border-lime-500/40">
                🥗 EC-05 地中海黃金餐盤
              </span>
              <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                一拳蔬菜、一掌肉、每餐淋上一匙好油
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                不用痛苦秤卡路里，只要盤子一半放綠色蔬菜、四分之一放豆魚蛋肉、四分之一放糙米燕麥，就是最棒的長壽飲食！
              </p>
            </div>
          </div>
        </div>
      );

    // ── EC-06: 運動醫學 · 肌肉充電與微步快走 ──
    case 'EC-06':
      return (
        <div className={`p-4 rounded-2xl bg-gradient-to-br from-sky-500/10 via-indigo-500/5 to-slate-900/10 border border-sky-500/30 dark:border-sky-500/40 relative overflow-hidden ${className}`}>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <svg className="w-full sm:w-48 h-32 shrink-0 drop-shadow-md" viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="15" width="180" height="100" rx="16" className="fill-slate-900/80 stroke-sky-500" strokeWidth="2" />
              <circle cx="65" cy="45" r="10" className="fill-sky-400" />
              <path d="M65 55 L65 75 L80 90 M65 75 L50 95" className="stroke-sky-300" strokeWidth="3" strokeLinecap="round" />
              <path d="M50 65 L65 60 L80 68" className="stroke-sky-300" strokeWidth="3" strokeLinecap="round" />
              <rect x="110" y="45" width="55" height="28" rx="6" className="stroke-emerald-400 fill-emerald-950/40" strokeWidth="2" />
              <rect x="165" y="53" width="5" height="12" rx="2" className="fill-emerald-400" />
              <rect x="114" y="49" width="36" height="20" rx="3" className="fill-emerald-500" />
              <text x="137" y="63" textAnchor="middle" className="fill-white font-mono text-[8px] font-bold">肌力存摺</text>
              <rect x="35" y="100" width="130" height="16" rx="4" className="fill-sky-500/20 stroke-sky-400" strokeWidth="1" />
              <text x="100" y="111" textAnchor="middle" className="fill-sky-200 font-mono text-[8px] font-bold">天天 30 分鐘微喘快走</text>
            </svg>
            <div className="space-y-1 text-center sm:text-left">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-sky-500/20 text-sky-700 dark:text-sky-300 border border-sky-500/40">
                🏃 EC-06 肌肉活化插圖
              </span>
              <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                肌肉是最好的血糖蓄水池 · 每天微喘把體力存起來
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                不用去健身房拚大重量，每天多走捷運兩層樓梯、每週做兩次深蹲，就能有效降低糖尿病與跌倒風險！
              </p>
            </div>
          </div>
        </div>
      );

    // ── EC-07: 睡眠醫學 · 晝夜節律與深睡波形 ──
    case 'EC-07':
      return (
        <div className={`p-4 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-slate-900/10 border border-indigo-500/30 dark:border-indigo-500/40 relative overflow-hidden ${className}`}>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <svg className="w-full sm:w-48 h-32 shrink-0 drop-shadow-md" viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="15" width="180" height="100" rx="16" className="fill-slate-900/80 stroke-indigo-500" strokeWidth="2" />
              <path d="M45 35 A18 18 0 1 0 65 65 A14 14 0 1 1 45 35 Z" className="fill-amber-300" />
              <path d="M80 55 Q95 30 110 55 T140 55 T170 55" className="stroke-indigo-400" strokeWidth="3" strokeLinecap="round" />
              <text x="125" y="40" textAnchor="middle" className="fill-indigo-300 font-mono text-[8px] font-bold">深睡修復波</text>
              <rect x="30" y="90" width="65" height="18" rx="4" className="fill-indigo-600" />
              <text x="62" y="102" textAnchor="middle" className="fill-white font-mono text-[8px] font-bold">睡前 2hr 熄大燈</text>
              <rect x="105" y="90" width="65" height="18" rx="4" className="fill-rose-600" />
              <text x="137" y="102" textAnchor="middle" className="fill-white font-mono text-[8px] font-bold">嚴禁酒精助眠</text>
            </svg>
            <div className="space-y-1 text-center sm:text-left">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-500/40">
                🌙 EC-07 睡眠修復插圖
              </span>
              <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                大腦最深度的夜間排毒 · 睡前別碰酒精破壞深睡
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                睡前喝酒看似好睡，實則徹底癱瘓深睡期，讓大腦無法清除毒素；睡前調暗燈光、小口抿水才是長效好眠配方。
              </p>
            </div>
          </div>
        </div>
      );

    // ── EC-08: 臨床心理學 · 破除食物道德焦慮 ──
    case 'EC-08':
      return (
        <div className={`p-4 rounded-2xl bg-gradient-to-br from-pink-500/10 via-amber-500/5 to-slate-900/10 border border-pink-500/30 dark:border-pink-500/40 relative overflow-hidden ${className}`}>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <svg className="w-full sm:w-48 h-32 shrink-0 drop-shadow-md" viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="15" width="180" height="100" rx="16" className="fill-slate-900/80 stroke-pink-500" strokeWidth="2" />
              <path d="M70 45 C70 35 85 35 90 45 C95 35 110 35 110 45 C110 65 90 80 90 80 C90 80 70 65 70 45 Z" className="fill-pink-500/80" />
              <circle cx="145" cy="45" r="15" className="fill-amber-400/20 stroke-amber-400" strokeWidth="2" />
              <path d="M145 35 V55 M135 45 H155" className="stroke-amber-300" strokeWidth="2" strokeLinecap="round" />
              <rect x="35" y="95" width="130" height="18" rx="4" className="fill-pink-500/20 stroke-pink-400" strokeWidth="1" />
              <text x="100" y="107" textAnchor="middle" className="fill-pink-200 font-mono text-[8px] font-bold">80% 優質營養 + 20% 彈性享受</text>
            </svg>
            <div className="space-y-1 text-center sm:text-left">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-pink-500/20 text-pink-700 dark:text-pink-300 border border-pink-500/40">
                🧘 EC-08 直覺飲食插圖
              </span>
              <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                食物不是有毒的敵人 · 健康是為了開心生活
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                別把自己逼入極端自責的卡路里監獄。落實「80/20 原則」，八成吃原型食物，兩成與朋友歡聚享用甜點，身心都平衡！
              </p>
            </div>
          </div>
        </div>
      );

    // ── EC-09: 藥師與補充劑安全 · 普拿疼與酒精禁忌 ──
    case 'EC-09':
      return (
        <div className={`p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 via-red-500/5 to-slate-900/10 border border-amber-500/30 dark:border-amber-500/40 relative overflow-hidden ${className}`}>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <svg className="w-full sm:w-48 h-32 shrink-0 drop-shadow-md" viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="15" width="180" height="100" rx="16" className="fill-slate-900/80 stroke-amber-500" strokeWidth="2" />
              <rect x="40" y="45" width="30" height="14" rx="7" className="fill-white stroke-slate-400" strokeWidth="1.5" />
              <text x="55" y="55" textAnchor="middle" className="fill-slate-900 font-mono text-[7px] font-bold">藥物</text>
              <path d="M125 40 L135 60 V75 H145 M125 75 H145" className="stroke-rose-400" strokeWidth="2" strokeLinecap="round" />
              <circle cx="95" cy="52" r="16" className="fill-rose-600" />
              <path d="M88 45 L102 59 M102 45 L88 59" className="stroke-white" strokeWidth="3" strokeLinecap="round" />
              <rect x="35" y="95" width="130" height="18" rx="4" className="fill-rose-500/20 stroke-rose-400" strokeWidth="1" />
              <text x="100" y="107" textAnchor="middle" className="fill-rose-200 font-mono text-[8px] font-bold">服藥前後 48 小時嚴禁酒精！</text>
            </svg>
            <div className="space-y-1 text-center sm:text-left">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/40">
                💊 EC-09 用藥安全防線
              </span>
              <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                喝酒配止痛藥是玩命 · 保健品不能當糖果狂吞
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                酒精與普拿疼會在肝臟生成劇毒中間產物引發急性肝壞死；市售「千杯不醉解酒糖」純屬安慰劑，絕不能預防酒毒！
              </p>
            </div>
          </div>
        </div>
      );

    // ── EC-10: 流行病學 · 破解紅酒護心神話 ──
    case 'EC-10':
      return (
        <div className={`p-4 rounded-2xl bg-gradient-to-br from-purple-500/10 via-blue-500/5 to-slate-900/10 border border-purple-500/30 dark:border-purple-500/40 relative overflow-hidden ${className}`}>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <svg className="w-full sm:w-48 h-32 shrink-0 drop-shadow-md" viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="15" width="180" height="100" rx="16" className="fill-slate-900/80 stroke-purple-500" strokeWidth="2" />
              <path d="M30 65 Q60 85 90 40 L160 25" className="stroke-rose-400" strokeWidth="2" strokeDasharray="3 3" />
              <text x="75" y="90" className="fill-slate-500 font-mono text-[7px]">舊觀察假象 J-Curve</text>
              <line x1="30" y1="75" x2="165" y2="28" className="stroke-rose-500" strokeWidth="3" strokeLinecap="round" />
              <text x="135" y="24" className="fill-rose-300 font-mono text-[8px] font-bold">真實因果線性上升</text>
              <rect x="35" y="98" width="130" height="16" rx="4" className="fill-purple-500/20 stroke-purple-400" strokeWidth="1" />
              <text x="100" y="109" textAnchor="middle" className="fill-purple-200 font-mono text-[8px] font-bold">WHO 證實：最安全的飲酒量是 0</text>
            </svg>
            <div className="space-y-1 text-center sm:text-left">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/40">
                🧭 EC-10 實證醫學破解
              </span>
              <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                別再相信喝紅酒軟化血管 · 醫學證實安全劑量是零
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                過去「每天一杯護心臟」是把重病戒酒者當對照組的統計漏洞。現代基因分析證實，哪怕只喝一小杯，中風風險依然提高！
              </p>
            </div>
          </div>
        </div>
      );

    // ── EC-11: 無障礙 UX · 大字高對比與單手操作 ──
    case 'EC-11':
      return (
        <div className={`p-4 rounded-2xl bg-gradient-to-br from-teal-500/10 via-emerald-500/5 to-slate-900/10 border border-teal-500/30 dark:border-teal-500/40 relative overflow-hidden ${className}`}>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <svg className="w-full sm:w-48 h-32 shrink-0 drop-shadow-md" viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="15" width="180" height="100" rx="16" className="fill-slate-900/80 stroke-teal-500" strokeWidth="2" />
              <rect x="50" y="25" width="100" height="80" rx="10" className="fill-slate-800 stroke-teal-400" strokeWidth="1.5" />
              <rect x="65" y="40" width="70" height="12" rx="3" className="fill-slate-600" />
              <rect x="65" y="60" width="70" height="26" rx="6" className="fill-nature-amber-500 stroke-amber-400" strokeWidth="1" />
              <text x="100" y="76" textAnchor="middle" className="fill-black font-mono text-[9px] font-extrabold">≥ 44px 舒適按鍵</text>
              <circle cx="100" cy="98" r="4" className="fill-slate-500" />
            </svg>
            <div className="space-y-1 text-center sm:text-left">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-teal-500/20 text-teal-700 dark:text-teal-300 border border-teal-500/40">
                👁️ EC-11 無障礙人因插圖
              </span>
              <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                字夠大、對比夠高 · 長輩戴著老花眼鏡也能秒懂
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                符合 WCAG 2.2 AA 標準，重要健康指示不藏在暗處、按鈕單手點得到，連長輩都能輕鬆安心使用。
              </p>
            </div>
          </div>
        </div>
      );

    // ── EC-12: 隱私架構 · 地端無痕與資料主權 ──
    case 'EC-12':
      return (
        <div className={`p-4 rounded-2xl bg-gradient-to-br from-slate-500/10 via-sky-500/5 to-slate-900/10 border border-slate-500/30 dark:border-slate-500/40 relative overflow-hidden ${className}`}>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <svg className="w-full sm:w-48 h-32 shrink-0 drop-shadow-md" viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="15" width="180" height="100" rx="16" className="fill-slate-900/80 stroke-sky-400" strokeWidth="2" />
              <circle cx="100" cy="55" r="28" className="fill-slate-800 stroke-sky-400" strokeWidth="2" />
              <path d="M100 40 L115 50 V65 L100 75 L85 65 V50 Z" className="fill-sky-500/30 stroke-sky-300" strokeWidth="2" />
              <circle cx="100" cy="56" r="4" className="fill-sky-400" />
              <rect x="35" y="95" width="130" height="18" rx="4" className="fill-sky-500/20 stroke-sky-400" strokeWidth="1" />
              <text x="100" y="107" textAnchor="middle" className="fill-sky-200 font-mono text-[8px] font-bold">資料只存在你的手機 · 廣告商看不到</text>
            </svg>
            <div className="space-y-1 text-center sm:text-left">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-sky-500/20 text-sky-700 dark:text-sky-300 border border-sky-500/40">
                🛡️ EC-12 隱私金庫插圖
              </span>
              <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                你的健康隱私就是身體主權 · 支援一鍵無痕銷毀
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                任何飲酒與生理量測數據完全於本地端運算，不搜集、不上傳，沒有任何保險公司能窺探你的健康紀錄！
              </p>
            </div>
          </div>
        </div>
      );

    // ── EC-13: 腎臟科 · 水分電解質與淡黃尿色 ──
    case 'EC-13':
      return (
        <div className={`p-4 rounded-2xl bg-gradient-to-br from-sky-500/10 via-cyan-500/5 to-slate-900/10 border border-cyan-500/30 dark:border-cyan-500/40 relative overflow-hidden ${className}`}>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <svg className="w-full sm:w-48 h-32 shrink-0 drop-shadow-md" viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="15" width="180" height="100" rx="16" className="fill-slate-900/80 stroke-cyan-500" strokeWidth="2" />
              <text x="100" y="35" textAnchor="middle" className="fill-slate-300 font-mono text-[8px] font-bold">尿液水分色票檢驗</text>
              <rect x="30" y="45" width="26" height="20" rx="3" className="fill-amber-100" />
              <rect x="60" y="45" width="26" height="20" rx="3" className="fill-yellow-200 stroke-emerald-400" strokeWidth="2" />
              <rect x="90" y="45" width="26" height="20" rx="3" className="fill-amber-300" />
              <rect x="120" y="45" width="26" height="20" rx="3" className="fill-amber-500" />
              <rect x="150" y="45" width="26" height="20" rx="3" className="fill-amber-800" />
              <text x="73" y="78" textAnchor="middle" className="fill-emerald-400 font-mono text-[8px] font-bold">最剛好！</text>
              <rect x="35" y="95" width="130" height="18" rx="4" className="fill-cyan-500/20 stroke-cyan-400" strokeWidth="1" />
              <text x="100" y="107" textAnchor="middle" className="fill-cyan-200 font-mono text-[8px] font-bold">小口慢喝 250ml · 絕不一口氣暴飲</text>
            </svg>
            <div className="space-y-1 text-center sm:text-left">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-500/40">
                💧 EC-13 體液平衡插圖
              </span>
              <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                看尿色不看杯數 · 短時間狂灌大水會水中毒
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                每次喝 250-350ml 溫水慢慢吞下；尿液呈現「淡黃色」代表體液最剛好，洗腎或心衰竭患者務必遵守醫師限水叮嚀。
              </p>
            </div>
          </div>
        </div>
      );

    // ── EC-14: 食用油化學 · 廚房水炒法護血管 ──
    case 'EC-14':
      return (
        <div className={`p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 via-yellow-500/5 to-slate-900/10 border border-amber-500/30 dark:border-amber-500/40 relative overflow-hidden ${className}`}>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <svg className="w-full sm:w-48 h-32 shrink-0 drop-shadow-md" viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="15" width="180" height="100" rx="16" className="fill-slate-900/80 stroke-amber-500" strokeWidth="2" />
              <path d="M70 40 C70 40 50 65 50 78 A20 20 0 0 0 90 78 C90 65 70 40 70 40 Z" className="fill-amber-500/80 stroke-amber-300" strokeWidth="1.5" />
              <circle cx="65" cy="72" r="3" className="fill-white" />
              <path d="M125 40 L155 48 V68 C155 82 125 92 125 92 C125 92 95 82 95 68 V48 Z" className="fill-emerald-500/30 stroke-emerald-400" strokeWidth="2" />
              <path d="M115 65 L123 73 L138 58" className="stroke-emerald-300" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="35" y="98" width="130" height="16" rx="4" className="fill-amber-500/20 stroke-amber-400" strokeWidth="1" />
              <text x="100" y="109" textAnchor="middle" className="fill-amber-200 font-mono text-[8px] font-bold">廚房不冒煙 · 涼拌用橄欖</text>
            </svg>
            <div className="space-y-1 text-center sm:text-left">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/40">
                🥑 EC-14 用油科學插圖
              </span>
              <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                冒濃煙就是在吸致癌物 · 先加少許水再下油
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                高溫乾燒會破壞油品雙鍵產生有害醛類；改用「水炒法」以 100°C 沸水鎖住蔬菜清脆，起鍋淋上特級初榨橄欖油最養生！
              </p>
            </div>
          </div>
        </div>
      );

    // ── EC-15: 食品加工烹飪 · 水炒法與回鍋油防護 ──
    case 'EC-15':
      return (
        <div className={`p-4 rounded-2xl bg-gradient-to-br from-orange-500/10 via-amber-500/5 to-slate-900/10 border border-orange-500/30 dark:border-orange-500/40 relative overflow-hidden ${className}`}>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <svg className="w-full sm:w-48 h-32 shrink-0 drop-shadow-md" viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="15" width="180" height="100" rx="16" className="fill-slate-900/80 stroke-orange-500" strokeWidth="2" />
              <path d="M40 70 C40 90 140 90 140 70 Z" className="fill-slate-800 stroke-slate-400" strokeWidth="2" />
              <line x1="140" y1="75" x2="165" y2="85" className="stroke-amber-600" strokeWidth="4" strokeLinecap="round" />
              <path d="M70 60 Q75 45 70 30 M90 60 Q95 45 90 30 M110 60 Q115 45 110 30" className="stroke-sky-300" strokeWidth="2" strokeDasharray="3 3" />
              <text x="90" y="24" textAnchor="middle" className="fill-sky-200 font-mono text-[8px] font-bold">100°C 溫和水蒸氣</text>
              <rect x="35" y="98" width="130" height="16" rx="4" className="fill-orange-500/20 stroke-orange-400" strokeWidth="1" />
              <text x="100" y="109" textAnchor="middle" className="fill-orange-200 font-mono text-[8px] font-bold">水炒法保留 40% 更多植化素</text>
            </svg>
            <div className="space-y-1 text-center sm:text-left">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-orange-500/20 text-orange-700 dark:text-orange-300 border border-orange-500/40">
                🍳 EC-15 廚房水炒示範
              </span>
              <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                大火爆炒傷肺臟 · 水炒法清甜無油煙
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                鍋底先倒 30ml 水煮滾，下青菜蓋鍋燜 90 秒，起鍋再淋油拌勻，維生素 C 與多酚完美保留，廚房乾淨不油膩！
              </p>
            </div>
          </div>
        </div>
      );

    // ── EC-16: 環境熱調節 · 濕熱島與中暑急救 ──
    case 'EC-16':
      return (
        <div className={`p-4 rounded-2xl bg-gradient-to-br from-red-500/10 via-amber-500/5 to-slate-900/10 border border-red-500/30 dark:border-red-500/40 relative overflow-hidden ${className}`}>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <svg className="w-full sm:w-48 h-32 shrink-0 drop-shadow-md" viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="15" width="180" height="100" rx="16" className="fill-slate-900/80 stroke-red-500" strokeWidth="2" />
              <rect x="45" y="30" width="12" height="55" rx="6" className="fill-slate-800 stroke-slate-400" strokeWidth="1.5" />
              <circle cx="51" cy="85" r="10" className="fill-rose-500" />
              <rect x="48" y="45" width="6" height="40" className="fill-rose-500" />
              <circle cx="125" cy="55" r="22" className="fill-sky-500/20 stroke-sky-400" strokeWidth="2" />
              <path d="M125 35 V75 M105 55 H145" className="stroke-sky-300" strokeWidth="2" strokeLinecap="round" />
              <text x="125" y="60" textAnchor="middle" className="fill-sky-200 font-mono text-[8px] font-bold">通風降溫</text>
              <rect x="35" y="98" width="130" height="16" rx="4" className="fill-red-500/20 stroke-red-400" strokeWidth="1" />
              <text x="100" y="109" textAnchor="middle" className="fill-rose-200 font-mono text-[8px] font-bold">高溫頭暈意識不清 ➜ 淋水送醫</text>
            </svg>
            <div className="space-y-1 text-center sm:text-left">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-red-500/20 text-red-700 dark:text-red-300 border border-red-500/40">
                🌡️ EC-16 熱傷害急救插圖
              </span>
              <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                悶熱天氣汗蒸發不了 · 大量出汗要補少許鹽
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                高溫濕度高時汗珠滴落無法散熱；劇烈運動每小時補水記得搭配電解質，發現身邊人神智不清立即潑冷水吹風降溫！
              </p>
            </div>
          </div>
        </div>
      );

    // ── EC-17: 醫學插畫師 · 專業向量圖拒絕假圖 ──
    case 'EC-17':
      return (
        <div className={`p-4 rounded-2xl bg-gradient-to-br from-violet-500/10 via-purple-500/5 to-slate-900/10 border border-violet-500/30 dark:border-violet-500/40 relative overflow-hidden ${className}`}>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <svg className="w-full sm:w-48 h-32 shrink-0 drop-shadow-md" viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="15" width="180" height="100" rx="16" className="fill-slate-900/80 stroke-violet-500" strokeWidth="2" />
              <path d="M50 80 L75 35 L85 40 L60 85 Z" className="fill-violet-400 stroke-violet-200" strokeWidth="1" />
              <circle cx="50" cy="80" r="2" className="fill-white" />
              <circle cx="130" cy="55" r="22" className="fill-emerald-500/20 stroke-emerald-400" strokeWidth="2" />
              <path d="M120 55 L127 62 L142 47" className="stroke-emerald-300" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <text x="130" y="70" textAnchor="middle" className="fill-emerald-300 font-mono text-[7px] font-bold">100% 醫師審定</text>
              <rect x="35" y="98" width="130" height="16" rx="4" className="fill-violet-500/20 stroke-violet-400" strokeWidth="1" />
              <text x="100" y="109" textAnchor="middle" className="fill-violet-200 font-mono text-[8px] font-bold">0 容忍黑盒 AI 幻覺假圖</text>
            </svg>
            <div className="space-y-1 text-center sm:text-left">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-violet-500/20 text-violet-700 dark:text-violet-300 border border-violet-500/40">
                🎨 EC-17 醫學精準插圖
              </span>
              <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                一張精準好圖勝過千言萬語 · 嚴格杜絕 AI 假圖
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                所有醫學解剖與生化機制圖均經醫師嚴密校對，絕不使用隨意胡謅的 AI 幻覺圖形，讓大眾看圖就學會正確醫學。
              </p>
            </div>
          </div>
        </div>
      );

    // ── EC-18: 資訊架構 · 誠實圖表不截斷軸線 ──
    case 'EC-18':
      return (
        <div className={`p-4 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-slate-500/5 to-slate-900/10 border border-emerald-500/30 dark:border-emerald-500/40 relative overflow-hidden ${className}`}>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <svg className="w-full sm:w-48 h-32 shrink-0 drop-shadow-md" viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="15" width="180" height="100" rx="16" className="fill-slate-900/80 stroke-emerald-500" strokeWidth="2" />
              <line x1="40" y1="30" x2="40" y2="85" className="stroke-slate-400" strokeWidth="2" />
              <line x1="40" y1="85" x2="165" y2="85" className="stroke-slate-400" strokeWidth="2" />
              <text x="32" y="88" className="fill-slate-400 font-mono text-[7px]">0</text>
              <text x="25" y="35" className="fill-slate-400 font-mono text-[7px]">180</text>
              <rect x="42" y="45" width="120" height="30" className="fill-emerald-500/15" />
              <text x="102" y="62" textAnchor="middle" className="fill-emerald-300 font-mono text-[8px] font-bold">健康平穩安全區</text>
              <rect x="35" y="98" width="130" height="16" rx="4" className="fill-emerald-500/20 stroke-emerald-400" strokeWidth="1" />
              <text x="100" y="109" textAnchor="middle" className="fill-emerald-200 font-mono text-[8px] font-bold">不截斷 Y 軸 · 不製造健康焦慮</text>
            </svg>
            <div className="space-y-1 text-center sm:text-left">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/40">
                📊 EC-18 誠實圖表插圖
              </span>
              <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                誠實數據給人平靜 · 微小波動不需恐慌
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                有些網站故意縮小刻度讓微幅血壓跳動看起來像暴跌狂飆；我們堅持真實零基準線，讓你一眼看出數值仍在安全綠色區！
              </p>
            </div>
          </div>
        </div>
      );

    // ── EC-19: 學習體驗 · 3 階梯漸進式揭露 ──
    case 'EC-19':
      return (
        <div className={`p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 via-sky-500/5 to-slate-900/10 border border-amber-500/30 dark:border-amber-500/40 relative overflow-hidden ${className}`}>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <svg className="w-full sm:w-48 h-32 shrink-0 drop-shadow-md" viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="15" width="180" height="100" rx="16" className="fill-slate-900/80 stroke-amber-500" strokeWidth="2" />
              <rect x="30" y="70" width="40" height="25" rx="4" className="fill-amber-500" />
              <text x="50" y="85" textAnchor="middle" className="fill-black font-mono text-[8px] font-extrabold">L1 秒懂</text>
              <rect x="75" y="50" width="45" height="45" rx="4" className="fill-sky-500" />
              <text x="97" y="65" textAnchor="middle" className="fill-white font-mono text-[8px] font-extrabold">L2 實踐卡</text>
              <rect x="125" y="30" width="45" height="65" rx="4" className="fill-purple-600" />
              <text x="147" y="45" textAnchor="middle" className="fill-white font-mono text-[8px] font-extrabold">L3 論文表</text>
              <rect x="35" y="100" width="130" height="16" rx="4" className="fill-amber-500/20 stroke-amber-400" strokeWidth="1" />
              <text x="100" y="111" textAnchor="middle" className="fill-amber-200 font-mono text-[8px] font-bold">按需深入 · 絕不資訊超載</text>
            </svg>
            <div className="space-y-1 text-center sm:text-left">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/40">
                🪜 EC-19 認知階梯插圖
              </span>
              <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                3 秒秒懂生活指南 · 想看論文隨時一鍵展開
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                我們把 50 篇期刊嚴肅實證收納在後方，首頁只呈現你今天能立刻行動的黃金微步，讓閱讀成為一種享受。
              </p>
            </div>
          </div>
        </div>
      );

    // ── EC-20: 健康傳播科普 · 溫暖對話不嚇人 ──
    case 'EC-20':
      return (
        <div className={`p-4 rounded-2xl bg-gradient-to-br from-nature-amber-500/10 via-emerald-500/5 to-slate-900/10 border border-nature-amber-500/30 dark:border-nature-amber-500/40 relative overflow-hidden ${className}`}>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <svg className="w-full sm:w-48 h-32 shrink-0 drop-shadow-md" viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="15" width="180" height="100" rx="16" className="fill-slate-900/80 stroke-nature-amber-500" strokeWidth="2" />
              <rect x="35" y="30" width="80" height="30" rx="8" className="fill-nature-amber-500/80" />
              <text x="75" y="47" textAnchor="middle" className="fill-black font-mono text-[8px] font-extrabold">「我們一起試這招！」</text>
              <rect x="90" y="58" width="75" height="26" rx="8" className="fill-emerald-600/80" />
              <text x="127" y="73" textAnchor="middle" className="fill-white font-mono text-[8px] font-extrabold">不責怪 · 溫柔改變</text>
              <rect x="35" y="98" width="130" height="16" rx="4" className="fill-nature-amber-500/20 stroke-nature-amber-400" strokeWidth="1" />
              <text x="100" y="109" textAnchor="middle" className="fill-nature-amber-200 font-mono text-[8px] font-bold">生活比喻 · 無痛轉化新習慣</text>
            </svg>
            <div className="space-y-1 text-center sm:text-left">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-nature-amber-500/20 text-nature-amber-800 dark:text-nature-amber-300 border border-nature-amber-500/40">
                🗣️ EC-20 溫暖科普對話
              </span>
              <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                溫暖平視的語言 · 真正打動人心的不是恐嚇
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                好的健康引導像一位身邊懂醫學的好友，不用「再喝肝爛掉」嚇唬你，而是陪你找出今天就能多喝一杯水的小樂趣！
              </p>
            </div>
          </div>
        </div>
      );

    // ── EC-21: 行為科學 · 14 天微習慣飛輪 ──
    case 'EC-21':
      return (
        <div className={`p-4 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-amber-500/5 to-slate-900/10 border border-emerald-500/30 dark:border-emerald-500/40 relative overflow-hidden ${className}`}>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <svg className="w-full sm:w-48 h-32 shrink-0 drop-shadow-md" viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="15" width="180" height="100" rx="16" className="fill-slate-900/80 stroke-emerald-500" strokeWidth="2" />
              <circle cx="100" cy="58" r="28" className="stroke-emerald-400 stroke-dashed" strokeWidth="2" strokeDasharray="4 4" />
              <rect x="85" y="24" width="30" height="12" rx="3" className="fill-amber-500 text-center" />
              <text x="100" y="33" textAnchor="middle" className="fill-black font-mono text-[7px] font-bold">提示 Cue</text>
              <rect x="120" y="52" width="36" height="12" rx="3" className="fill-sky-500" />
              <text x="138" y="61" textAnchor="middle" className="fill-white font-mono text-[7px] font-bold">微步 Action</text>
              <rect x="45" y="52" width="36" height="12" rx="3" className="fill-emerald-500" />
              <text x="63" y="61" textAnchor="middle" className="fill-white font-mono text-[7px] font-bold">獎勵 Reward</text>
              <rect x="35" y="98" width="130" height="16" rx="4" className="fill-emerald-500/20 stroke-emerald-400" strokeWidth="1" />
              <text x="100" y="109" textAnchor="middle" className="fill-emerald-200 font-mono text-[8px] font-bold">門檻小於 2 分鐘 · 輕鬆贏下長壽</text>
            </svg>
            <div className="space-y-1 text-center sm:text-left">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/40">
                🎯 EC-21 微習慣飛輪插圖
              </span>
              <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                目標縮到小於 2 分鐘 · 不考驗意志力自然能持久
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                不要發誓明天跑 10 公里，只要穿上鞋子原地深蹲 5 下，綁定刷牙提示，連續做 14 天，大腦自動化養成健康好習慣！
              </p>
            </div>
          </div>
        </div>
      );

    // ── EC-22: 台灣 TFDA 法規 · 四大防火牆 ──
    case 'EC-22':
      return (
        <div className={`p-4 rounded-2xl bg-gradient-to-br from-blue-500/10 via-amber-500/5 to-slate-900/10 border border-blue-500/30 dark:border-blue-500/40 relative overflow-hidden ${className}`}>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <svg className="w-full sm:w-48 h-32 shrink-0 drop-shadow-md" viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="15" width="180" height="100" rx="16" className="fill-slate-900/80 stroke-blue-500" strokeWidth="2" />
              <circle cx="70" cy="55" r="22" className="fill-emerald-500/20 stroke-emerald-400" strokeWidth="2" />
              <path d="M70 42 C65 48 75 52 70 68" className="stroke-emerald-300" strokeWidth="3" strokeLinecap="round" />
              <text x="70" y="74" textAnchor="middle" className="fill-emerald-300 font-mono text-[7px] font-bold">健康認證</text>
              <rect x="105" y="42" width="65" height="26" rx="5" className="fill-rose-500/20 stroke-rose-400" strokeWidth="1.5" />
              <text x="137" y="58" textAnchor="middle" className="fill-rose-300 font-mono text-[8px] font-bold">嚴禁宣稱療效</text>
              <rect x="35" y="98" width="130" height="16" rx="4" className="fill-blue-500/20 stroke-blue-400" strokeWidth="1" />
              <text x="100" y="109" textAnchor="middle" className="fill-blue-200 font-mono text-[8px] font-bold">拆穿神油神藥 · 守護民眾荷包與生命</text>
            </svg>
            <div className="space-y-1 text-center sm:text-left">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-500/40">
                🏛️ EC-22 法律合規防火牆
              </span>
              <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                食品不能宣稱降血壓 · 敢稱包治百病百分之百是騙局
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                遵循台灣食安法嚴謹規範，認明衛福部小綠人標章；本平台絕不慫恿病患停藥，堅持臨床安全邊界。
              </p>
            </div>
          </div>
        </div>
      );

    // ── EC-23: 成癮毒理 · 肝臟乙醛堆積毒性 ──
    case 'EC-23':
      return (
        <div className={`p-4 rounded-2xl bg-gradient-to-br from-rose-500/10 via-purple-500/5 to-slate-900/10 border border-rose-500/30 dark:border-rose-500/40 relative overflow-hidden ${className}`}>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <svg className="w-full sm:w-48 h-32 shrink-0 drop-shadow-md" viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="15" width="180" height="100" rx="16" className="fill-slate-900/80 stroke-rose-500" strokeWidth="2" />
              <path d="M50 45 C75 35 110 38 120 50 C125 65 110 80 85 85 C65 85 45 75 50 45 Z" className="fill-rose-900/60 stroke-rose-400" strokeWidth="2" />
              <circle cx="85" cy="58" r="10" className="fill-rose-600" />
              <text x="85" y="62" textAnchor="middle" className="fill-white font-mono text-[9px] font-extrabold">毒</text>
              <rect x="130" y="45" width="45" height="26" rx="4" className="fill-rose-500/20 stroke-rose-400" strokeWidth="1" />
              <text x="152" y="58" textAnchor="middle" className="fill-rose-300 font-mono text-[7px] font-bold">1級致癌物</text>
              <text x="152" y="66" textAnchor="middle" className="fill-rose-300 font-mono text-[7px] font-bold">乙醛堆積</text>
              <rect x="35" y="98" width="130" height="16" rx="4" className="fill-rose-500/20 stroke-rose-400" strokeWidth="1" />
              <text x="100" y="109" textAnchor="middle" className="fill-rose-200 font-mono text-[8px] font-bold">脂肪肝 ➜ 肝炎 ➜ 肝硬化 · 及早止步</text>
            </svg>
            <div className="space-y-1 text-center sm:text-left">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-500/40">
                🍷 EC-23 酒精毒理插圖
              </span>
              <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                酒精下肚全由肝臟承擔 · 乙醛是貨真價實的致癌毒藥
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                酒精不是提神良藥，而是中樞神經抑制劑；肝臟代謝乙醇產生的乙醛會攻擊細胞 DNA，聚會用無糖氣泡水敬酒更帥氣！
              </p>
            </div>
          </div>
        </div>
      );

    // ── EC-24: 藥物基因體學 · ALDH2 臉紅火警 ──
    case 'EC-24':
    default:
      return (
        <div className={`p-4 rounded-2xl bg-gradient-to-br from-rose-500/10 via-amber-500/5 to-slate-900/10 border border-rose-500/30 dark:border-rose-500/40 relative overflow-hidden ${className}`}>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <svg className="w-full sm:w-48 h-32 shrink-0 drop-shadow-md" viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="15" width="180" height="100" rx="16" className="fill-slate-900/80 stroke-rose-500" strokeWidth="2" />
              <path d="M40 40 Q55 60 70 40 T100 40" className="stroke-amber-400" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M40 60 Q55 40 70 60 T100 60" className="stroke-sky-400" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="55" y1="42" x2="55" y2="58" className="stroke-slate-400" strokeWidth="1.5" />
              <line x1="85" y1="42" x2="85" y2="58" className="stroke-slate-400" strokeWidth="1.5" />
              <circle cx="140" cy="50" r="18" className="fill-rose-500" />
              <circle cx="134" cy="47" r="2.5" className="fill-white" />
              <circle cx="146" cy="47" r="2.5" className="fill-white" />
              <path d="M134 56 Q140 60 146 56" className="stroke-white" strokeWidth="2" strokeLinecap="round" />
              <text x="140" y="78" textAnchor="middle" className="fill-rose-400 font-mono text-[8px] font-bold">臉紅警報！</text>
              <rect x="35" y="98" width="130" height="16" rx="4" className="fill-rose-500/20 stroke-rose-400" strokeWidth="1" />
              <text x="100" y="109" textAnchor="middle" className="fill-rose-200 font-mono text-[8px] font-bold">近半台灣人帶有變異 · 終生滴酒不沾</text>
            </svg>
            <div className="space-y-1 text-center sm:text-left">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-500/40">
                🧬 EC-24 基因臉紅警報
              </span>
              <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                臉紅是身體最仁慈的警報器 · 絕不能靠多喝練酒量
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                全台灣約 48% 人帶有 ALDH2 基因變異，喝酒臉紅代表缺乏乙醛解毒酵素；只要完全不喝酒，食道癌風險立刻降回正常！
              </p>
            </div>
          </div>
        </div>
      );
  }
};
