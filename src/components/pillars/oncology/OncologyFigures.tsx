import React from 'react';

/**
 * OncologyFigures.tsx — 所有主要癌症防治與精準醫療專區客製化 SVG 解剖與機轉圖解
 * 覆蓋全部 12 章節：
 * 1. TnmStagingAndOncogeneFigure（致癌油門/抑癌煞車 ＋ TNM 第 0–IV 期解剖深度與存活率圖解）
 * 2. TaiwanScreeningVsMarkersFigure（台灣公費六大癌症篩檢黃金工具 vs 抽血腫瘤標記盲區對照圖）
 * 3. LungGgoAndDriverMutationFigure（肺結節 Pure GGO / Part-solid / Solid 與台灣肺腺癌 EGFR 等驅動基因圖譜）
 * 4. ColorectalLeftVsRightFigure（右側升結腸癌貧血 vs 左側降結腸/直腸癌阻塞血便與 TNT 保肛微創圖解）
 * 5. BreastBiradsAndSubtypesFigure（乳房攝影微鈣化 vs 超音波 ＋ 四大分子亞型與 ADC 導彈圖解）
 * 6. LiverBclcAndPancreasRedFlagFigure（肝癌 BCLC 消融/栓塞/雙免疫 與 胰臟癌後腹腔鑽背痛/新發糖尿病警訊）
 * 7. EsdAndHeadNeckAlcoholFigure（ALDH2 酒精乙醛致癌鏈 ＋ 早期胃癌/食道癌 ESD 內視鏡黏膜下剝離術）
 * 8. ProstateMriAndGynThreeCancersFigure（攝護腺 mpMRI 融合切片 ＋ 子宮頸/內膜/卵巢三癌解剖與抹片盲區）
 * 9. ThyroidTiradsAndMyelomaCrabFigure（甲狀腺結節良惡性特徵 ＋ 淋巴癌 B 症狀與多發性骨髓瘤 CRAB 警訊）
 * 10. FivePrecisionWeaponsFigure（抗癌五大武器：達文西、質子布拉格峰、NGS標靶、PD-1免疫鬆煞車、ADC旁觀者效應）
 * 11. CancerNutritionAndNeutropeniaFigure（抗惡病質高蛋白餐盤 ＋ 化療後第 7–14 天白血球谷底期安全防護曲線）
 * 12. SurvivorshipAndPainLadderFigure（WHO 癌症疼痛三階梯控制 ＋ 早期整合緩和醫療雙軌並行圖）
 */

// ── 1. TNM Staging & Oncogene/Tumor Suppressor Figure ────────────────────────
export const TnmStagingAndOncogeneFigure: React.FC = () => (
  <div className="space-y-3">
    <svg viewBox="0 0 680 195" className="w-full h-auto" role="img" aria-label="癌症TNM第0期原位癌至第IV期遠端轉移的解剖深度與5年存活率對照圖">
      <rect x="4" y="4" width="672" height="187" rx="14" fill="currentColor" className="text-slate-50 dark:text-slate-900/70" />
      {[
        { x: 16, stage: '第 0 期（原位癌 Tis）', depth: '侷限上皮層內，未穿破基底膜', surv: '5年存活率 > 98%', c: '#059669', bg: '#ecfdf5' },
        { x: 148, stage: '第 I 期（早期 T1–2 N0）', depth: '穿破基底膜但腫瘤小、無淋巴轉移', surv: '5年存活率 85–95%', c: '#0284c7', bg: '#e0f2fe' },
        { x: 280, stage: '第 II 期（局部進階）', depth: '腫瘤較大或侵犯深層肌層/鄰近組織', surv: '5年存活率 70–85%', c: '#d97706', bg: '#fef3c7' },
        { x: 412, stage: '第 III 期（區域淋巴 N+）', depth: '癌細胞已擴散至周圍區域淋巴結', surv: '前導/輔助治療關鍵期', c: '#ea580c', bg: '#ffedd5' },
        { x: 544, stage: '第 IV 期（遠端轉移 M1）', depth: '經血管轉移至肝、肺、骨或腦部', surv: 'NGS標靶/免疫/ADC控制', c: '#e11d48', bg: '#ffe4e6' },
      ].map((s) => (
        <g key={s.stage}>
          <rect x={s.x} y="18" width="122" height="114" rx="10" fill={s.bg} stroke={s.c} strokeWidth="2.5" />
          <text x={s.x + 61} y="40" textAnchor="middle" className="text-[10.5px] font-bold" fill={s.c}>{s.stage}</text>
          <text x={s.x + 61} y="64" textAnchor="middle" className="text-[9px]" fill="#334155">{s.depth.slice(0, 9)}</text>
          <text x={s.x + 61} y="78" textAnchor="middle" className="text-[9px]" fill="#334155">{s.depth.slice(9)}</text>
          <rect x={s.x + 8} y="94" width="106" height="26" rx="6" fill={s.c} />
          <text x={s.x + 61} y="111" textAnchor="middle" className="text-[9.5px] font-bold fill-white">{s.surv}</text>
        </g>
      ))}
      <rect x="16" y="142" width="648" height="38" rx="8" fill="#0f172a" />
      <text x="340" y="165" textAnchor="middle" className="text-[10.5px] font-bold fill-white">
        細胞叛變雙重打擊：致癌基因「油門卡死（EGFR / KRAS / HER2）」＋ 抑癌基因「煞車失靈（TP53 / BRCA1/2 / APC）」
      </text>
    </svg>
  </div>
);

// ── 2. Taiwan 6 Free Screenings vs Tumor Marker Myth Figure ──────────────────
export const TaiwanScreeningVsMarkersFigure: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="rounded-xl border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50/30 dark:bg-emerald-950/20 p-3.5">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[13px] font-bold text-emerald-950 dark:text-emerald-200">✅ 真正能抓出第 0–I 期的「器官標準篩檢」</span>
        <span className="text-[10.5px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 font-semibold">國健署公費補助</span>
      </div>
      <svg viewBox="0 0 300 155" className="w-full h-auto" role="img" aria-label="台灣公費六大癌症篩檢工具與降低死亡率效益">
        <rect x="6" y="6" width="288" height="143" rx="10" fill="currentColor" className="text-white/85 dark:text-slate-900/70" />
        <text x="18" y="28" className="text-[10.5px] font-bold fill-emerald-800 dark:fill-emerald-300">• 肺癌：低劑量電腦斷層 (LDCT) → 揪出 &lt;1cm GGO</text>
        <text x="18" y="50" className="text-[10.5px] font-bold fill-emerald-800 dark:fill-emerald-300">• 乳癌：乳房 X 光攝影 ＋ 超音波 → 抓出原位癌微鈣化</text>
        <text x="18" y="72" className="text-[10.5px] font-bold fill-emerald-800 dark:fill-emerald-300">• 大腸癌：免疫糞便潛血 (iFOBT) ＋ 大腸鏡切息肉</text>
        <text x="18" y="94" className="text-[10.5px] font-bold fill-emerald-800 dark:fill-emerald-300">• 子宮頸癌：抹片 ＋ HPV 病毒檢測 ＋ 九價疫苗</text>
        <text x="18" y="116" className="text-[10.5px] font-bold fill-emerald-800 dark:fill-emerald-300">• 胃癌/肝癌：幽門桿菌除菌 ＋ B/C肝超音波篩檢</text>
        <text x="18" y="138" className="text-[10.5px] font-bold fill-emerald-800 dark:fill-emerald-300">• 口腔癌：每 2 年口腔黏膜視觸診檢查</text>
      </svg>
    </div>

    <div className="rounded-xl border border-rose-200 dark:border-rose-800/60 bg-rose-50/30 dark:bg-rose-950/20 p-3.5">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[13px] font-bold text-rose-950 dark:text-rose-200">⚠️ 單靠抽血「腫瘤標記」篩檢的兩大陷阱</span>
        <span className="text-[10.5px] px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-200 font-semibold">切勿當成唯一防線</span>
      </div>
      <svg viewBox="0 0 300 155" className="w-full h-auto" role="img" aria-label="抽血腫瘤標記在早期癌症常偽陰性、在良性發炎常偽陽性的雙重盲區">
        <rect x="6" y="6" width="288" height="143" rx="10" fill="currentColor" className="text-white/85 dark:text-slate-900/70" />
        <rect x="16" y="18" width="268" height="54" rx="8" fill="#fff1f2" stroke="#f43f5e" />
        <text x="26" y="37" className="text-[10.5px] font-bold fill-rose-900">陷阱 1：早期癌症「高達 70–80% 抽血完全正常」</text>
        <text x="26" y="55" className="text-[9.5px] fill-rose-800">第 I 期肺癌/大腸癌/乳癌分泌量極微，抽血正常絕不等於沒癌！</text>
        <rect x="16" y="82" width="268" height="56" rx="8" fill="#fffbeb" stroke="#f59e0b" />
        <text x="26" y="101" className="text-[10.5px] font-bold fill-amber-950">陷阱 2：良性發炎也常造成「紅字偽陽性恐慌」</text>
        <text x="26" y="118" className="text-[9.5px] fill-amber-900">抽菸讓 CEA 高、膽結石讓 CA19-9 高、生理期/肌腺症讓 CA125 高</text>
        <text x="26" y="131" className="text-[9px] font-bold fill-slate-700">★ 正確用途：確診後追蹤化療標靶療效與監測復發</text>
      </svg>
    </div>
  </div>
);

// ── 3. Lung Nodule GGO Spectrum & Taiwan Adenocarcinoma Drivers Figure ───────
export const LungGgoAndDriverMutationFigure: React.FC = () => (
  <div className="space-y-3">
    <svg viewBox="0 0 680 190" className="w-full h-auto" role="img" aria-label="LDCT肺結節三種型態：純毛玻璃結節、部分實心結節、純實心結節與台灣肺腺癌驅動基因分布">
      <rect x="4" y="4" width="672" height="182" rx="14" fill="currentColor" className="text-slate-50 dark:text-slate-900/70" />
      {/* 1. Pure GGO */}
      <rect x="16" y="18" width="142" height="154" rx="10" fill="#ecfdf5" stroke="#10b981" strokeWidth="2" />
      <circle cx="87" cy="68" r="24" fill="#6ee7b7" opacity="0.45" stroke="#059669" strokeWidth="1.5" strokeDasharray="3 2" />
      <line x1="65" y1="68" x2="109" y2="68" stroke="#047857" strokeWidth="2" />
      <text x="87" y="112" textAnchor="middle" className="text-[10.5px] font-bold fill-emerald-950">純毛玻璃 (Pure GGO)</text>
      <text x="87" y="128" textAnchor="middle" className="text-[9px] fill-emerald-800">薄霧狀、看得到血管穿過</text>
      <text x="87" y="144" textAnchor="middle" className="text-[9px] font-bold fill-emerald-700">&lt;6mm 定期追蹤免急開刀</text>

      {/* 2. Part-solid Nodule */}
      <rect x="170" y="18" width="146" height="154" rx="10" fill="#fff1f2" stroke="#e11d48" strokeWidth="2.5" />
      <circle cx="243" cy="68" r="26" fill="#fda4af" opacity="0.45" stroke="#e11d48" strokeWidth="1.5" strokeDasharray="3 2" />
      <circle cx="243" cy="68" r="11" fill="#be123c" />
      <text x="243" y="112" textAnchor="middle" className="text-[10.5px] font-bold fill-rose-950">部分實心 (Part-solid)</text>
      <text x="243" y="128" textAnchor="middle" className="text-[9px] fill-rose-800">毛玻璃中長出白色硬核</text>
      <text x="243" y="144" textAnchor="middle" className="text-[9px] font-bold fill-rose-700">★ 惡性率最高！實心≥6mm評估切除</text>

      {/* 3. Solid Nodule */}
      <rect x="328" y="18" width="136" height="154" rx="10" fill="#fffbeb" stroke="#d97706" strokeWidth="2" />
      <circle cx="396" cy="68" r="22" fill="#d97706" />
      <text x="396" y="112" textAnchor="middle" className="text-[10.5px] font-bold fill-amber-950">純實心結節 (Solid)</text>
      <text x="396" y="128" textAnchor="middle" className="text-[9px] fill-amber-900">小顆多為舊發炎鈣化疤</text>
      <text x="396" y="144" textAnchor="middle" className="text-[9px] font-bold fill-amber-800">&gt;8mm 或邊緣毛刺需切片/PET</text>

      {/* 4. Taiwan Lung Adenocarcinoma Driver Mutations */}
      <rect x="476" y="18" width="188" height="154" rx="10" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
      <text x="570" y="38" textAnchor="middle" className="text-[11px] font-bold fill-sky-950">台灣肺腺癌驅動基因圖譜</text>
      <rect x="488" y="48" width="164" height="28" rx="6" fill="#0284c7" />
      <text x="570" y="66" textAnchor="middle" className="text-[10px] font-bold fill-white">EGFR 突變：高達 50–55%</text>
      <rect x="488" y="82" width="164" height="24" rx="6" fill="#0369a1" />
      <text x="570" y="98" textAnchor="middle" className="text-[9.5px] font-bold fill-white">ALK (5%) / ROS1 / MET / RET</text>
      <rect x="488" y="112" width="164" height="24" rx="6" fill="#075985" />
      <text x="570" y="128" textAnchor="middle" className="text-[9.5px] font-bold fill-white">KRAS / BRAF / HER2 / NTRK</text>
      <text x="570" y="156" textAnchor="middle" className="text-[9px] font-bold fill-sky-900">★ 逾 70% 可找到對應口服標靶藥！</text>
    </svg>
  </div>
);

// ── 4. Colorectal Right vs Left Colon & TNT Sphincter Preservation Figure ────
export const ColorectalLeftVsRightFigure: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="rounded-xl border border-amber-200 dark:border-amber-800/60 bg-amber-50/30 dark:bg-amber-950/20 p-3.5">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[13px] font-bold text-amber-950 dark:text-amber-200">右側大腸癌（盲腸、升結腸）</span>
        <span className="text-[10.5px] px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 font-semibold">管腔寬 · 液態糞便</span>
      </div>
      <p className="text-[12.5px] text-slate-700 dark:text-slate-300 leading-relaxed">
        因為右側大腸內徑很寬（約 6–8 cm）且剛從小腸流過來的糞便呈稀水狀，即使腫瘤長得像拳頭大也很少塞住腸道！最典型的早期表現是<strong>「腫瘤表面慢性滲血 → 不明原因缺鐵性貧血、臉色蒼白、走路容易喘、頭暈疲倦」</strong>，大便外觀甚至看不出紅色。
      </p>
    </div>

    <div className="rounded-xl border border-rose-200 dark:border-rose-800/60 bg-rose-50/30 dark:bg-rose-950/20 p-3.5">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[13px] font-bold text-rose-950 dark:text-rose-200">左側大腸與直腸癌（降結腸、乙狀結腸、直腸）</span>
        <span className="text-[10.5px] px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-200 font-semibold">管腔窄 · 固態成形便</span>
      </div>
      <p className="text-[12.5px] text-slate-700 dark:text-slate-300 leading-relaxed">
        左側大腸管徑較窄且水分已被吸乾成固態糞便，腫瘤常環繞腸壁生長像「束帶」一樣勒住腸道，典型表現為<strong>「排便習慣改變（突然常便秘或腹瀉交替）、大便變細、暗紅或鮮紅黏液血便、裡急後重（解不乾淨感）」</strong>。
      </p>
    </div>
  </div>
);

// ── 5. Breast BI-RADS & ADC Bystander Effect Figure ──────────────────────────
export const BreastBiradsAndSubtypesFigure: React.FC = () => (
  <div className="space-y-3">
    <svg viewBox="0 0 680 180" className="w-full h-auto" role="img" aria-label="乳房影像BI-RADS 0至5級處置光譜與ADC抗體藥物複合體生物導彈機轉">
      <rect x="4" y="4" width="672" height="172" rx="14" fill="currentColor" className="text-slate-50 dark:text-slate-900/70" />
      <text x="20" y="28" className="text-[11.5px] font-bold fill-slate-800 dark:fill-slate-100">
        乳房攝影／超音波 BI-RADS 分級行動指南（注意：0 級代表「需加做影像」，不是沒事！）
      </text>
      {[
        { x: 18, g: 'BI-RADS 0', act: '需加做超音波/放大攝影', c: '#64748b', bg: '#f1f5f9' },
        { x: 126, g: 'BI-RADS 1–2', act: '正常/良性，每2年篩檢', c: '#059669', bg: '#ecfdf5' },
        { x: 234, g: 'BI-RADS 3', act: '良性率>98%，6個月追蹤', c: '#0284c7', bg: '#e0f2fe' },
        { x: 342, g: 'BI-RADS 4A/B/C', act: '疑似惡性，門診粗針切片', c: '#d97706', bg: '#fef3c7' },
        { x: 450, g: 'BI-RADS 5', act: '高度惡性(>95%)，必切片', c: '#e11d48', bg: '#ffe4e6' },
        { x: 558, g: 'BI-RADS 6', act: '已切片確診，啟動治療', c: '#881337', bg: '#fce7f3' },
      ].map((b) => (
        <g key={b.g}>
          <rect x={b.x} y="38" width="102" height="60" rx="8" fill={b.bg} stroke={b.c} strokeWidth="2" />
          <text x={b.x + 51} y="60" textAnchor="middle" className="text-[10.5px] font-bold" fill={b.c}>{b.g}</text>
          <text x={b.x + 51} y="80" textAnchor="middle" className="text-[8.5px] font-semibold" fill="#1e293b">{b.act}</text>
        </g>
      ))}
      <rect x="18" y="110" width="642" height="54" rx="10" fill="#fdf2f8" stroke="#db2777" strokeWidth="2" />
      <text x="339" y="131" textAnchor="middle" className="text-[11px] font-bold fill-pink-950">
        ★ 抗體藥物複合體（ADC 生物導彈，如 Enhertu / Trodelvy）三大構造：
      </text>
      <text x="339" y="150" textAnchor="middle" className="text-[10px] fill-pink-900">
        ① 單株抗體導航頭（鎖定 HER2 或 Trop-2） ＋ ② 可裂解連接子（Linker） ＋ ③ 高效化療彈頭（鑽入癌細胞引爆並穿透殺死鄰近癌細胞！）
      </text>
    </svg>
  </div>
);

// ── 6. Liver BCLC Stage & Pancreas Red Flags Figure ──────────────────────────
export const LiverBclcAndPancreasRedFlagFigure: React.FC = () => (
  <div className="space-y-3">
    <svg viewBox="0 0 680 185" className="w-full h-auto" role="img" aria-label="肝細胞癌BCLC分期對應治療武器與胰臟癌四大早期紅旗警訊">
      <rect x="4" y="4" width="672" height="177" rx="14" fill="currentColor" className="text-slate-50 dark:text-slate-900/70" />
      {/* Left: Liver Cancer BCLC */}
      <rect x="16" y="16" width="320" height="153" rx="12" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" />
      <text x="176" y="38" textAnchor="middle" className="text-[11.5px] font-bold fill-blue-950">肝細胞癌（HCC）BCLC 分期精準武器</text>
      <text x="28" y="62" className="text-[10px] font-bold fill-emerald-800">• 極早期/早期 (0–A期，單顆或 ≤3顆 ≤3cm)：</text>
      <text x="36" y="78" className="text-[9.5px] fill-slate-700">微創肝切除、射頻/微波消融 (RFA/MWA)、肝臟移植（根治性）</text>
      <text x="28" y="102" className="text-[10px] font-bold fill-amber-800">• 中期 (B期，多發性無血管侵犯)：</text>
      <text x="36" y="118" className="text-[9.5px] fill-slate-700">經動脈化學栓塞 (TACE)、釔-90 (Y-90) 體內放療或合併全身治療</text>
      <text x="28" y="142" className="text-[10px] font-bold fill-rose-800">• 晚期 (C期，門脈侵犯或轉移)：</text>
      <text x="36" y="158" className="text-[9.5px] font-bold fill-rose-700">第一線健保「免疫檢查點抑制劑＋抗血管標靶」或雙免疫療法</text>

      {/* Right: Pancreatic Cancer Red Flags */}
      <rect x="348" y="16" width="316" height="153" rx="12" fill="#fff1f2" stroke="#e11d48" strokeWidth="2.5" />
      <text x="506" y="38" textAnchor="middle" className="text-[11.5px] font-bold fill-rose-950">🚨「癌王」胰臟癌 4 大早期蛛絲馬跡</text>
      <text x="360" y="62" className="text-[10px] font-bold fill-rose-900">1. 50 歲後「突然新發生糖尿病」或原本穩定血糖突然失控</text>
      <text x="360" y="84" textAnchor="middle" className="text-[9.5px] fill-rose-800" />
      <text x="360" y="86" className="text-[10px] font-bold fill-rose-900">2. 上腹悶脹痛「像鑽子往後背刺」（前傾抱膝稍緩解）</text>
      <text x="360" y="110" className="text-[10px] font-bold fill-rose-900">3. 無痛性阻塞黃疸（胰頭腫瘤壓迫膽管 → 眼黃、茶色尿、灰白便）</text>
      <text x="360" y="134" className="text-[10px] font-bold fill-rose-900">4. 不明原因體重驟降 ＋ 脂肪瀉（馬桶浮一層油滴難沖掉）</text>
      <text x="506" y="158" textAnchor="middle" className="text-[9.5px] font-bold fill-blue-900">★ 檢查首選：增強型胰臟薄切 CT / MRI 或內視鏡超音波 (EUS)</text>
    </svg>
  </div>
);

// ── 7. ESD Endoscopic Submucosal Dissection & ALDH2 Figure ───────────────────
export const EsdAndHeadNeckAlcoholFigure: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="rounded-xl border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50/30 dark:bg-emerald-950/20 p-3.5">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[13px] font-bold text-emerald-950 dark:text-emerald-200">早期胃癌／食道癌：ESD 內視鏡黏膜下剝離術</span>
        <span className="text-[10.5px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 font-semibold">免切胃 · 無體表傷口</span>
      </div>
      <svg viewBox="0 0 280 120" className="w-full h-auto" role="img" aria-label="內視鏡黏膜下剝離術ESD在黏膜下層注射液體墊高病灶後用電刀完整片下早期癌">
        <rect x="10" y="84" width="260" height="22" rx="4" fill="#fda4af" />
        <text x="140" y="99" textAnchor="middle" className="text-[9.5px] font-bold fill-rose-950">固有肌肉層（完整保留不穿孔）</text>
        {/* Submucosal saline cushion */}
        <path d="M55 84 Q140 38 225 84 Z" fill="#bae6fd" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="3 2" />
        <text x="140" y="75" textAnchor="middle" className="text-[9px] font-bold fill-sky-900">① 黏膜下層注射藍染液體「水墊」撐高</text>
        {/* Early mucosal lesion being peeled */}
        <path d="M90 62 Q140 42 190 62" fill="none" stroke="#e11d48" strokeWidth="7" strokeLinecap="round" />
        <text x="140" y="34" textAnchor="middle" className="text-[10px] font-bold fill-emerald-800 dark:fill-emerald-300">② 微型電刀沿水墊完整片下早期癌！</text>
      </svg>
    </div>

    <div className="rounded-xl border border-rose-200 dark:border-rose-800/60 bg-rose-50/30 dark:bg-rose-950/20 p-3.5">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[13px] font-bold text-rose-950 dark:text-rose-200">菸＋酒＋檳榔：123 倍致癌暴風與 ALDH2 缺失</span>
        <span className="text-[10.5px] px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-200 font-semibold">台灣 47% 酒精不耐症</span>
      </div>
      <div className="space-y-2 text-[12.5px] text-slate-700 dark:text-slate-300 pt-1">
        <p>
          • <strong>喝酒臉紅＝乙醛中毒警訊</strong>：酒精（乙醇）進入體內會先變成一級致癌物<strong>「乙醛」</strong>，需靠 <code>ALDH2</code> 酵素分解成無毒乙酸。台灣高達 47% 民眾帶有 ALDH2 基因缺陷，喝酒臉紅代表劇毒乙醛全身累積，每天喝 2 杯酒得<strong>食道癌與頭頸癌風險暴增 40–50 倍</strong>！
        </p>
        <p>
          • <strong>經典研究（高醫葛應欽教授團隊）</strong>：吸菸＋喝酒＋嚼檳榔三項全有者，罹患口腔癌與食道癌風險是一般人的 <strong>123 倍</strong>！
        </p>
      </div>
    </div>
  </div>
);

// ── 8. Prostate mpMRI & GYN Three Cancers Anatomy Figure ─────────────────────
export const ProstateMriAndGynThreeCancersFigure: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="rounded-xl border border-purple-200 dark:border-purple-800/60 bg-purple-50/30 dark:bg-purple-950/20 p-3.5 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-bold text-purple-950 dark:text-purple-200">婦科三大癌解剖位置與篩檢差異</span>
        <span className="text-[10.5px] px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/60 text-purple-800 dark:text-purple-200 font-semibold">抹片只抓子宮頸！</span>
      </div>
      <div className="grid grid-cols-3 gap-2 text-[11.5px]">
        <div className="rounded-lg border border-purple-200 dark:border-purple-800 bg-white dark:bg-slate-900 p-2">
          <p className="font-bold text-purple-700 dark:text-purple-300">1. 子宮頸癌</p>
          <p className="text-slate-600 dark:text-slate-400 mt-0.5">位於子宮大門口；<strong>抹片＋HPV檢測＋疫苗</strong>可預防 90%+</p>
        </div>
        <div className="rounded-lg border border-rose-200 dark:border-rose-800 bg-white dark:bg-slate-900 p-2">
          <p className="font-bold text-rose-700 dark:text-rose-300">2. 子宮內膜癌</p>
          <p className="text-slate-600 dark:text-slate-400 mt-0.5">長在子宮房間內壁；警訊為<strong>停經後出血</strong>，靠陰道超音波＋內膜採樣</p>
        </div>
        <div className="rounded-lg border border-amber-200 dark:border-amber-800 bg-white dark:bg-slate-900 p-2">
          <p className="font-bold text-amber-700 dark:text-amber-300">3. 卵巢癌</p>
          <p className="text-slate-600 dark:text-slate-400 mt-0.5">深藏骨盆腔；常以<strong>腹脹易飽、頻尿</strong>表現，必驗 BRCA / HRD 用 PARP 標靶</p>
        </div>
      </div>
    </div>

    <div className="rounded-xl border border-sky-200 dark:border-sky-800/60 bg-sky-50/30 dark:bg-sky-950/20 p-3.5 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-bold text-sky-950 dark:text-sky-200">男性攝護腺癌診斷黃金流程</span>
        <span className="text-[10.5px] px-2 py-0.5 rounded-full bg-sky-100 dark:bg-sky-900/60 text-sky-800 dark:text-sky-200 font-semibold">先 MRI 再靶向切片</span>
      </div>
      <div className="grid grid-cols-3 gap-2 text-[11.5px]">
        <div className="rounded-lg border border-sky-200 dark:border-sky-800 bg-white dark:bg-slate-900 p-2">
          <p className="font-bold text-sky-700 dark:text-sky-300">Step 1. PSA＋肛門指診</p>
          <p className="text-slate-600 dark:text-slate-400 mt-0.5">50歲起（家族史45歲）抽血 PSA 與游離型比例</p>
        </div>
        <div className="rounded-lg border border-sky-200 dark:border-sky-800 bg-white dark:bg-slate-900 p-2">
          <p className="font-bold text-sky-700 dark:text-sky-300">Step 2. 多參數 mpMRI</p>
          <p className="text-slate-600 dark:text-slate-400 mt-0.5">PI-RADS 評分定位高風險病灶，減少盲目穿刺</p>
        </div>
        <div className="rounded-lg border border-sky-200 dark:border-sky-800 bg-white dark:bg-slate-900 p-2">
          <p className="font-bold text-sky-700 dark:text-sky-300">Step 3. 經會陰融合切片</p>
          <p className="text-slate-600 dark:text-slate-400 mt-0.5">MRI與超音波影像融合經會陰穿刺，感染率趨近 0</p>
        </div>
      </div>
    </div>
  </div>
);

// ── 9. Thyroid Nodule & Hematology Lymphoma B-Symptoms / Myeloma CRAB Figure ─
export const ThyroidTiradsAndMyelomaCrabFigure: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="rounded-xl border border-amber-200 dark:border-amber-800/60 bg-amber-50/30 dark:bg-amber-950/20 p-3.5">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[13px] font-bold text-amber-950 dark:text-amber-200">惡性淋巴癌「無痛腫塊 ＋ B 症狀」警訊</span>
        <span className="text-[10.5px] px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 font-semibold">六大警訊：燒腫癢汗咳瘦</span>
      </div>
      <ul className="space-y-1 text-[12.5px] text-slate-700 dark:text-slate-300">
        <li>• <strong>危險淋巴結特徵</strong>：頸部、鎖骨上窩、腋下或鼠蹊部出現<strong>「不痛、摸起來像硬橡皮擦、不易推動、持續變大 &gt; 2 公分且超過 2–4 週不消」</strong>的腫塊。</li>
        <li>• <strong>三大 B 症狀</strong>：① 不明原因發燒 &gt; 38°C、② 夜間盜汗（半夜汗流浹背需換睡衣）、③ 6 個月內體重減輕 &gt; 10%。</li>
      </ul>
    </div>

    <div className="rounded-xl border border-rose-200 dark:border-rose-800/60 bg-rose-50/30 dark:bg-rose-950/20 p-3.5">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[13px] font-bold text-rose-950 dark:text-rose-200">多發性骨髓瘤「CRAB 螃蟹四聯徵」</span>
        <span className="text-[10.5px] px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-200 font-semibold">常偽裝成老人背痛與腎病</span>
      </div>
      <div className="grid grid-cols-2 gap-1.5 text-[12px]">
        <div className="rounded-lg bg-white dark:bg-slate-900 p-2 border border-rose-200 dark:border-rose-800">
          <strong className="text-rose-700 dark:text-rose-400">C - Calcium 高血鈣</strong>：口渴多尿、便秘、意識嗜睡
        </div>
        <div className="rounded-lg bg-white dark:bg-slate-900 p-2 border border-rose-200 dark:border-rose-800">
          <strong className="text-rose-700 dark:text-rose-400">R - Renal 腎功能惡化</strong>：大量蛋白泡泡尿、肌酸酐升高
        </div>
        <div className="rounded-lg bg-white dark:bg-slate-900 p-2 border border-rose-200 dark:border-rose-800">
          <strong className="text-rose-700 dark:text-rose-400">A - Anemia 貧血</strong>：臉色蒼白、疲倦頭暈、活動喘
        </div>
        <div className="rounded-lg bg-white dark:bg-slate-900 p-2 border border-rose-200 dark:border-rose-800">
          <strong className="text-rose-700 dark:text-rose-400">B - Bone 蝕骨痛/骨折</strong>：頑固腰背肋骨痛、壓迫性骨折
        </div>
      </div>
    </div>
  </div>
);

// ── 10. Five Precision Weapons & Proton Bragg Peak / PD-1 Figure ─────────────
export const FivePrecisionWeaponsFigure: React.FC = () => (
  <div className="space-y-3">
    <svg viewBox="0 0 680 185" className="w-full h-auto" role="img" aria-label="質子治療布拉格峰能量釋放曲線與PD-1免疫檢查點抑制劑鬆開T細胞煞車機轉">
      <rect x="4" y="4" width="672" height="177" rx="14" fill="currentColor" className="text-slate-50 dark:text-slate-900/70" />
      {/* Left: Proton Bragg Peak */}
      <rect x="16" y="16" width="320" height="153" rx="12" fill="#f0f9ff" stroke="#0284c7" strokeWidth="2" />
      <text x="176" y="36" textAnchor="middle" className="text-[11px] font-bold fill-sky-950">質子／重粒子治療「布拉格峰（Bragg Peak）」</text>
      {/* Tumor zone highlight */}
      <rect x="165" y="48" width="52" height="86" fill="#fecdd3" opacity="0.6" />
      <text x="191" y="62" textAnchor="middle" className="text-[9px] font-bold fill-rose-800">腫瘤位置</text>
      {/* X-ray curve (conventional) */}
      <path d="M35 120 Q80 65 130 85 L310 118" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeDasharray="4 2" />
      <text x="270" y="110" className="text-[8.5px] fill-slate-500">傳統光子（後方仍有劑量）</text>
      {/* Proton Bragg Peak curve */}
      <path d="M35 112 L160 105 L190 50 L205 134 L310 134" fill="none" stroke="#0284c7" strokeWidth="3.5" />
      <text x="255" y="148" textAnchor="middle" className="text-[9px] font-bold fill-sky-800">★ 腫瘤後方劑量瞬間歸零，保護心肺肝臟！</text>

      {/* Right: PD-1 / PD-L1 Checkpoint Blockade */}
      <rect x="348" y="16" width="316" height="153" rx="12" fill="#ecfdf5" stroke="#059669" strokeWidth="2" />
      <text x="506" y="36" textAnchor="middle" className="text-[11px] font-bold fill-emerald-950">免疫檢查點抑制劑（PD-1 / PD-L1）鬆煞車機轉</text>
      <circle cx="425" cy="96" r="38" fill="#0284c7" />
      <text x="425" y="93" textAnchor="middle" className="text-[10.5px] font-bold fill-white">病患自身</text>
      <text x="425" y="108" textAnchor="middle" className="text-[10.5px] font-bold fill-white">殺手 T 細胞</text>
      <circle cx="585" cy="96" r="38" fill="#be123c" />
      <text x="585" y="93" textAnchor="middle" className="text-[10.5px] font-bold fill-white">偽裝的</text>
      <text x="585" y="108" textAnchor="middle" className="text-[10.5px] font-bold fill-white">癌細胞</text>
      {/* Antibody blocking shield */}
      <rect x="478" y="76" width="54" height="40" rx="8" fill="#10b981" stroke="#047857" strokeWidth="2" />
      <text x="505" y="94" textAnchor="middle" className="text-[9px] font-bold fill-white">PD-1抗體</text>
      <text x="505" y="107" textAnchor="middle" className="text-[8.5px] fill-emerald-100">拆掉煞車</text>
      <text x="506" y="152" textAnchor="middle" className="text-[9.5px] font-bold fill-emerald-900">T 細胞重新認出癌細胞，釋放穿孔素將其消滅！</text>
    </svg>
  </div>
);

// ── 11. Cancer High-Protein Plate & Neutropenia Nadir Curve Figure ───────────
export const CancerNutritionAndNeutropeniaFigure: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="rounded-xl border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50/30 dark:bg-emerald-950/20 p-3.5">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[13px] font-bold text-emerald-950 dark:text-emerald-200">化放療期「抗惡病質高蛋白餐盤」</span>
        <span className="text-[10.5px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 font-semibold">蛋白質 1.2–1.5 g/kg</span>
      </div>
      <p className="text-[12.5px] text-slate-700 dark:text-slate-300 leading-relaxed">
        一位 60 公斤癌友每天需要 <strong>75–90 公克蛋白質（約 10–12 份肉魚豆蛋奶）</strong>！每餐至少要有「一個手掌心厚度的全熟魚肉／去皮雞肉／蒸蛋／嫩豆腐」，若正餐吃不下，務必在餐間補充<strong>濃縮高蛋白腫瘤配方奶（含 EPA 魚油與左旋麩醯胺酸）</strong>。
      </p>
    </div>

    <div className="rounded-xl border border-rose-200 dark:border-rose-800/60 bg-rose-50/30 dark:bg-rose-950/20 p-3.5">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[13px] font-bold text-rose-950 dark:text-rose-200">化療後第 7–14 天「白血球谷底期 (Nadir)」</span>
        <span className="text-[10.5px] px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-200 font-semibold">發燒 ≥ 38°C 秒速急診</span>
      </div>
      <p className="text-[12.5px] text-slate-700 dark:text-slate-300 leading-relaxed">
        化療結束返家後的<strong>第 7 到第 14 天</strong>，骨髓造血尚未恢復，嗜中性白血球（ANC）會掉到最低點（常 &lt; 500–1,000/μL）。這週請嚴格執行<strong>「全熟食、削皮水果、禁生菜生魚片與半熟蛋」</strong>，一旦體溫 ≥ 38.0°C 切勿吃退燒藥硬撐，請立刻掛急診！
      </p>
    </div>
  </div>
);

// ── 12. WHO 3-Step Pain Ladder & Early Palliative Integration Figure ─────────
export const SurvivorshipAndPainLadderFigure: React.FC = () => (
  <div className="space-y-3">
    <svg viewBox="0 0 680 175" className="w-full h-auto" role="img" aria-label="WHO癌症疼痛控制三階梯與早期整合緩和醫療模式">
      <rect x="4" y="4" width="672" height="167" rx="14" fill="currentColor" className="text-slate-50 dark:text-slate-900/70" />
      {[
        { x: 20, y: 98, w: 195, h: 58, step: '第一階：輕度疼痛 (1–3分)', drugs: '乙醯胺酚 / NSAIDs ± 輔助神經止痛藥', c: '#059669', bg: '#ecfdf5' },
        { x: 235, y: 62, w: 195, h: 94, step: '第二階：中度疼痛 (4–6分)', drugs: '弱效鴉片類（Tramadol）或低劑量強效鴉片', c: '#d97706', bg: '#fef3c7' },
        { x: 450, y: 24, w: 210, h: 132, step: '第三階：重度疼痛 (7–10分)', drugs: '醫療級強效鴉片（口服長短效嗎啡、吩坦尼貼片）＋骨轉移放療/雙磷酸鹽', c: '#0284c7', bg: '#e0f2fe' },
      ].map((st) => (
        <g key={st.step}>
          <rect x={st.x} y={st.y} width={st.w} height={st.h} rx="10" fill={st.bg} stroke={st.c} strokeWidth="2.5" />
          <text x={st.x + st.w / 2} y={st.y + 24} textAnchor="middle" className="text-[11px] font-bold" fill={st.c}>{st.step}</text>
          <text x={st.x + st.w / 2} y={st.y + 46} textAnchor="middle" className="text-[9.5px] font-semibold" fill="#1e293b">{st.drugs.slice(0, 18)}</text>
          {st.drugs.length > 18 && (
            <text x={st.x + st.w / 2} y={st.y + 64} textAnchor="middle" className="text-[9px]" fill="#334155">{st.drugs.slice(18)}</text>
          )}
        </g>
      ))}
      <text x="20" y="46" className="text-[11.5px] font-bold fill-slate-800 dark:fill-slate-100">
        WHO 癌症疼痛控制三階梯：按時給藥（By the clock）、不忍痛、醫療止痛不成癮！
      </text>
    </svg>
  </div>
);
