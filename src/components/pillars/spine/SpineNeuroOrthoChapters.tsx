import React from 'react';
import { DataTable } from '../../common/pro/DataTable';
import { FigureFrame, Callout } from '../../common/pro/Blocks';

/**
 * SpineNeuroOrthoChapters.tsx — 神經骨科與四肢關節整合擴充章節 (v5.2)
 * 新增 4 個深度知識與客製化 SVG 圖解章節：
 * 1. PERIPHERAL_NERVE：周邊神經卡壓症候群（腕隧道正中神經、肘隧道尺神經、梨狀肌、腓總神經垂足 vs 頸腰椎神經根鑑別）
 * 2. KNEE_HIP_OA：膝關節與髖關節退化性關節炎（KL 分級、半月板/十字韌帶、玻尿酸/PRP 實證、保膝截骨與人工關節置換）
 * 3. SHOULDER_UPPER：肩關節與上肢神經骨科（旋轉肌袖撕裂 vs 五十肩沾黏性關節囊炎三期、鈣化性肌腱炎、網球肘與扳機指）
 * 4. ANKLE_FOOT_NEURO：足踝生物力學與神經病變步態（足底筋膜炎、阿基里斯腱炎、踝扭傷 PEACE&LOVE、中風/巴金森/脊髓步態）
 */

const H3: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white pt-2">{children}</h3>
);

const P: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-[15px] leading-7 text-slate-700 dark:text-slate-300 max-w-3xl">{children}</p>
);

// ── Custom SVG Figures for the 4 Neuro-Orthopedic Chapters ───────────────────

export const PeripheralNerveEntrapmentFigure: React.FC = () => (
  <div className="space-y-3">
    <svg viewBox="0 0 680 190" className="w-full h-auto" role="img" aria-label="周邊神經卡壓四大熱點：腕隧道正中神經、肘隧道尺神經、梨狀肌坐骨神經、腓骨頭腓總神經與雙重壓迫症候群">
      <rect x="4" y="4" width="672" height="182" rx="14" fill="currentColor" className="text-slate-50 dark:text-slate-900/70" />
      {[
        {
          x: 16,
          title: '① 腕隧道症候群（正中神經）',
          sub1: '卡壓點：手腕橫腕韌帶下',
          sub2: '麻區：大拇指、食指、中指（掌側）',
          sub3: '特徵：半夜甩手醒、魚際肌萎縮',
          c: '#0284c7',
          bg: '#e0f2fe',
        },
        {
          x: 180,
          title: '② 肘隧道症候群（尺神經）',
          sub1: '卡壓點：手肘內側麻筋溝',
          sub2: '麻區：無名指尺側 ＋ 小指',
          sub3: '特徵：手肘彎曲講電話加劇、爪狀手',
          c: '#059669',
          bg: '#ecfdf5',
        },
        {
          x: 344,
          title: '③ 梨狀肌症候群（假性坐骨痛）',
          sub1: '卡壓點：臀部深層梨狀肌緊繃',
          sub2: '麻區：臀部正中央深處往大腿後麻',
          sub3: '特徵：久坐硬椅痛，腰椎 MRI 正常',
          c: '#d97706',
          bg: '#fef3c7',
        },
        {
          x: 508,
          title: '④ 腓總神經卡壓（垂足症）',
          sub1: '卡壓點：膝蓋外側下方腓骨頭',
          sub2: '麻區：小腿前外側與腳背',
          sub3: '特徵：翹二郎腿壓迫 → 腳板翹不起來',
          c: '#e11d48',
          bg: '#ffe4e6',
        },
      ].map((n) => (
        <g key={n.title}>
          <rect x={n.x} y="18" width="156" height="114" rx="10" fill={n.bg} stroke={n.c} strokeWidth="2.5" />
          <text x={n.x + 78} y="40" textAnchor="middle" className="text-[10.5px] font-bold" fill={n.c}>{n.title}</text>
          <text x={n.x + 78} y="62" textAnchor="middle" className="text-[9px] font-semibold" fill="#1e293b">{n.sub1}</text>
          <text x={n.x + 78} y="82" textAnchor="middle" className="text-[9px]" fill="#334155">{n.sub2}</text>
          <text x={n.x + 78} y="102" textAnchor="middle" className="text-[9px] font-bold" fill={n.c}>{n.sub3}</text>
        </g>
      ))}
      <rect x="16" y="142" width="648" height="34" rx="8" fill="#0f172a" />
      <text x="340" y="163" textAnchor="middle" className="text-[10.5px] font-bold fill-white">
        ★ 雙重壓迫症候群（Double Crush）：頸椎 C6/C7 輕微壓迫 ＋ 手腕腕隧道卡壓常同時並存，需靠「神經傳導與肌電圖（NCS/EMG）」精準定位！
      </text>
    </svg>
  </div>
);

export const KneeHipOaAndJointFigure: React.FC = () => (
  <div className="space-y-3">
    <svg viewBox="0 0 680 185" className="w-full h-auto" role="img" aria-label="退化性膝關節炎Kellgren-Lawrence第1至4期演進與保膝截骨及人工關節置換階梯">
      <rect x="4" y="4" width="672" height="177" rx="14" fill="currentColor" className="text-slate-50 dark:text-slate-900/70" />
      {[
        { x: 16, g: 'KL 第 1 期（初期）', img: '關節間隙可疑變窄、微小骨刺', tx: '減重＋股四頭肌訓練（免打針開刀）', c: '#059669', bg: '#ecfdf5' },
        { x: 180, g: 'KL 第 2 期（輕度）', img: '明確小骨刺、軟骨輕微磨損', tx: '運動物理治療 ± 短期消炎止痛/玻尿酸', c: '#0284c7', bg: '#e0f2fe' },
        { x: 344, g: 'KL 第 3 期（中度）', img: '關節間隙明顯變窄、軟骨下硬化', tx: '自體高濃度血小板 PRP / 保膝高位脛骨截骨 (HTO)', c: '#d97706', bg: '#fef3c7' },
        { x: 508, g: 'KL 第 4 期（重度）', img: '軟骨磨光「骨頭磨骨頭」、O型腿變形', tx: '微創半人工 (UKA) 或全人工膝關節置換 (TKA)', c: '#e11d48', bg: '#ffe4e6' },
      ].map((k) => (
        <g key={k.g}>
          <rect x={k.x} y="18" width="156" height="112" rx="10" fill={k.bg} stroke={k.c} strokeWidth="2.5" />
          <text x={k.x + 78} y="40" textAnchor="middle" className="text-[10.5px] font-bold" fill={k.c}>{k.g}</text>
          <text x={k.x + 78} y="64" textAnchor="middle" className="text-[9px]" fill="#334155">{k.img}</text>
          <rect x={k.x + 8} y="82" width="140" height="36" rx="6" fill={k.c} />
          <text x={k.x + 78} y="98" textAnchor="middle" className="text-[8.5px] font-bold fill-white">{k.tx.slice(0, 14)}</text>
          <text x={k.x + 78} y="111" textAnchor="middle" className="text-[8.5px] font-bold fill-white">{k.tx.slice(14)}</text>
        </g>
      ))}
      <rect x="16" y="138" width="648" height="34" rx="8" fill="#065f46" />
      <text x="340" y="159" textAnchor="middle" className="text-[10.5px] font-bold fill-white">
        生物力學鐵律：體重每減輕 1 公斤，走路時膝關節承受的衝擊力就減少 4 公斤！大腿股四頭肌更是膝蓋最強的天然避震器。
      </text>
    </svg>
  </div>
);

export const ShoulderRotatorCuffVsFrozenFigure: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="rounded-xl border border-sky-200 dark:border-sky-800/60 bg-sky-50/30 dark:bg-sky-950/20 p-3.5">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[13px] font-bold text-sky-950 dark:text-sky-200">五十肩（沾黏性關節囊炎）</span>
        <span className="text-[10.5px] px-2 py-0.5 rounded-full bg-sky-100 dark:bg-sky-900/60 text-sky-800 dark:text-sky-200 font-semibold">主動與被動皆卡死</span>
      </div>
      <p className="text-[12.5px] text-slate-700 dark:text-slate-300 leading-relaxed">
        關節囊像縮水的襯衫一樣發炎變厚沾黏。關鍵鑑別：<strong>「自己舉不起來（主動受限），別人幫你抬也抬不上去（被動受限），尤其手往後扣內衣或摸後口袋最卡！」</strong>分為疼痛結冰期（0–3月）、僵硬冰凍期（3–9月）與解凍期（9–18月）。
      </p>
    </div>

    <div className="rounded-xl border border-rose-200 dark:border-rose-800/60 bg-rose-50/30 dark:bg-rose-950/20 p-3.5">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[13px] font-bold text-rose-950 dark:text-rose-200">旋轉肌袖撕裂／夾擠症候群</span>
        <span className="text-[10.5px] px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-200 font-semibold">自己舉無力 · 別人抬得動</span>
      </div>
      <p className="text-[12.5px] text-slate-700 dark:text-slate-300 leading-relaxed">
        棘上肌等肌腱磨損或斷裂（拉繩斷了，但關節門軸沒生鏽）。關鍵鑑別：<strong>「自己側舉在 60–120 度疼痛弧最痛或無力垂下，但請醫師用另一隻手托著你的手肘往上抬，卻可以抬到頂！」</strong>高解析骨骼肌肉超音波即可一秒看清破洞。
      </p>
    </div>
  </div>
);

export const FootAnkleAndNeuroGaitFigure: React.FC = () => (
  <div className="space-y-3">
    <svg viewBox="0 0 680 180" className="w-full h-auto" role="img" aria-label="足底筋膜炎晨起第一步劇痛機轉與四大神經骨科異常步態鑑別">
      <rect x="4" y="4" width="672" height="172" rx="14" fill="currentColor" className="text-slate-50 dark:text-slate-900/70" />
      {[
        { x: 16, t: '1. 垂足跨閾步態 (Steppage)', c: 'L5 神經根或腓總神經麻痺', d: '腳板翹不起來，走路需把大腿抬得特別高以免腳尖踢地跌倒', col: '#e11d48', bg: '#ffe4e6' },
        { x: 180, t: '2. 頸椎脊髓病變痙攣步態', c: '頸椎脊髓受壓迫 (Myelopathy)', d: '雙腿緊繃像機器人、踩棉花感、走一直線不穩、扣鈕扣困難', col: '#d97706', bg: '#fef3c7' },
        { x: 344, t: '3. 巴金森小碎步凍結步態', c: '腦部黑質多巴胺退化', d: '身體前傾、起步困難、小碎步越走越快剎不住、單側手靜止顫抖', col: '#7c3aed', bg: '#f3e8ff' },
        { x: 508, t: '4. 臀中肌無力搖擺步態', c: '髖關節退化或 L5 神經無力', d: '單腳站立時對側骨盆往下掉（Trendelenburg sign），走路像企鵝搖擺', col: '#0284c7', bg: '#e0f2fe' },
      ].map((g) => (
        <g key={g.t}>
          <rect x={g.x} y="18" width="156" height="144" rx="10" fill={g.bg} stroke={g.col} strokeWidth="2" />
          <text x={g.x + 78} y="40" textAnchor="middle" className="text-[10px] font-bold" fill={g.col}>{g.t}</text>
          <text x={g.x + 78} y="62" textAnchor="middle" className="text-[9px] font-bold" fill="#0f172a">{g.c}</text>
          <text x={g.x + 78} y="88" textAnchor="middle" className="text-[8.5px]" fill="#334155">{g.d.slice(0, 14)}</text>
          <text x={g.x + 78} y="104" textAnchor="middle" className="text-[8.5px]" fill="#334155">{g.d.slice(14, 28)}</text>
          <text x={g.x + 78} y="120" textAnchor="middle" className="text-[8.5px]" fill="#334155">{g.d.slice(28)}</text>
        </g>
      ))}
    </svg>
  </div>
);

// ── Tables Data ──────────────────────────────────────────────────────────────

const NERVE_ROOT_VS_PERIPHERAL_TABLE = [
  {
    feature: '手麻分布範圍',
    cts: '腕隧道症候群（正中神經）：大拇指、食指、中指與無名指一半（手掌側麻，手背虎口通常不麻）',
    cubital: '肘隧道症候群（尺神經）：小指與無名指尺側半邊（連手背小指側也一起麻）',
    cervical: '頸椎神經根壓迫（C6/C7/C8）：從脖子、肩胛骨一路順著手臂放射麻到特定手指，常伴隨肩頸酸痛',
  },
  {
    feature: '誘發與緩解動作',
    cts: '騎機車催油門、拿手機、半夜睡覺手腕彎曲時麻醒，「甩一甩手（Flick sign）」會比較舒服',
    cubital: '手肘長時間彎曲（講電話、趴睡枕手肘、打電腦撐手肘）時加劇，手肘伸直即緩解',
    cervical: '後仰抬頭轉頭時麻痛往下竄（Spurling sign 陽性），把患側手舉高放在頭頂上反而減輕（Shoulder abduction relief）',
  },
  {
    feature: '嚴重肌肉萎縮警訊',
    cts: '大拇指根部肥厚的「大魚際肌（Thenar muscle）」塌陷萎縮，拇指無法對掌捏緊',
    cubital: '虎口第一骨間肌凹陷萎縮、手指無法併攏或張開，第四、五指呈「爪狀手（Claw hand）」',
    cervical: 'C5 三角肌舉手無力、C6 二頭肌彎手肘無力、C7 三頭肌推門無力、C8 手部握力減退',
  },
  {
    feature: '黃金治療策略',
    cts: '夜間穿戴「手腕副木（固定在 0 度中立位）」、超音波導引 5% 葡萄糖水神經解套注射；肌肉萎縮則行微創內視鏡腕隧道減壓術',
    cubital: '避免手肘壓桌面與過度彎曲、夜間手肘伸直護具、神經滑動運動；嚴重者行尺神經減壓或前移術',
    cervical: '頸椎姿勢矯正、物理治療牽引、神經根注射；若保守無效或肌力減退則行微創內視鏡減壓或人工椎間盤置換',
  },
];

const KNEE_INJECTION_AND_SURGERY_TABLE = [
  {
    modality: '減重 ＋ 股四頭肌與臀肌阻力訓練',
    grade: 'AAOS / OARSI 強烈推薦 (Grade A)',
    suitable: '所有期別（KL 1–4 期）皆為第一線核心基石',
    truth: '每減重 5% 即可減少 30–50% 膝蓋疼痛！直抬腿、靠牆微蹲、固定式腳踏車與水中運動可強化膝關節動態穩定度，不傷軟骨',
  },
  {
    modality: '關節內玻尿酸注射 (Hyaluronic Acid)',
    grade: '有條件建議 (Grade B/C)',
    suitable: 'KL 2–3 期輕中度退化、吃止痛藥胃不適或腎功能不佳者',
    truth: '提供關節液潤滑吸震與抗發炎作用，效果通常維持 6–12 個月（健保符合條件每半年至一年給付一次療程）；對第 4 期骨頭磨骨頭效果極有限',
  },
  {
    modality: '自體高濃度血小板血漿注射 (PRP)',
    grade: '中高度實證改善疼痛功能 (Grade B)',
    suitable: 'KL 1–3 期退化性關節炎、半月板輕度損傷、網球肘或肌腱部分撕裂',
    truth: '抽取自身血液離心濃縮血小板生長因子，抑制滑膜發炎並促進組織修復；搭配超音波導引精準注射效果更佳（屬自費項目）',
  },
  {
    modality: '3D 導航高位脛骨截骨術（HTO 保膝手術）',
    grade: '結構性力線矯正 (Grade A)',
    suitable: '50–65 歲活躍族群、僅內側軟骨磨損合併 O 型腿（內翻變形）、外側軟骨與韌帶仍健康者',
    truth: '不換人工關節！透過 3D 列印導板精準矯正小腿骨角度，把承重力線從磨損的內側移到健康的外側，保留自己原裝膝蓋，術後可跑跳運動',
  },
  {
    modality: '微創單髁半人工膝關節 (UKA) ／ 全人工膝關節 (TKA)',
    grade: '重度退化黃金終極武器 (Grade A)',
    suitable: 'KL 第 4 期軟骨磨光、嚴重變形、連走平路與睡覺都劇痛且保守治療無效者',
    truth: '若僅單側磨損且十字韌帶完整可換「半人工關節（UKA，傷口小恢復超快）」；全膝磨損則行微創「全人工關節（TKA）」，搭配機械手臂導航與術後當天或隔天即下床助行器行走（ERAS），滿意度逾 90%',
  },
];

const UPPER_LIMB_CONDITIONS_TABLE = [
  {
    disease: '沾黏性關節囊炎（五十肩 Frozen Shoulder）',
    hallmark: '主動與被動各方向角度全面受限（尤其外旋與手往後背扣內衣最卡），半夜翻身壓到劇痛（糖尿病與甲狀腺患者發生率高 3–5 倍）',
    treatment: '發炎結冰期先做「超音波導引關節囊擴張術（打入生理食鹽水加少量消炎藥把沾黏撐開）」快速止痛，再立刻搭配物理治療爬牆、毛巾操與鐘擺運動拉開角度！',
  },
  {
    disease: '旋轉肌袖肌腱撕裂 (Rotator Cuff Tear)',
    hallmark: '手臂側舉 60–120 度出現「疼痛弧」、拿高處物品無力，但別人幫你托起手臂卻能舉高（被動角度正常）',
    treatment: '部分撕裂（< 50%）可做肩胛穩定訓練與超音波導引 PRP 增生注射；全層破洞撕裂或持續無力者，應行「微創肩關節鏡肌腱縫合術」避免破洞越拉越大無法修補',
  },
  {
    disease: '鈣化性肌腱炎 (Calcific Tendinitis)',
    hallmark: '無外傷卻突然爆發「連衣服碰到都痛不欲生的急性劇痛」，X 光與超音波可見旋轉肌腱內有白色牙膏狀或粉筆狀鈣化沉積',
    treatment: '神效療法：在骨骼肌肉超音波導引下進行「雙針穿刺鈣化抽吸洗滌術（Barbotage）」將鈣化吸出，或配合體外震波治療（ESWT），往往隔天劇痛即消退大半！',
  },
  {
    disease: '網球肘（肱骨外上髁炎）＆ 扳機指（屈指肌腱狹窄性腱鞘炎）',
    hallmark: '網球肘：擰毛巾、提重物時手肘外側骨突劇痛；扳機指：早晨手指彎曲後「卡住彈不回來」，硬扳會發出喀一聲彈響',
    treatment: '網球肘：穿戴前臂減壓護帶、手腕伸肌「離心收縮訓練」、震波或 PRP；扳機指：溫水熱敷、夜間副木、局部注射，反覆卡死者可在門診局部麻醉行 3 分鐘「超音波導引微創針刀／小傷口滑車韌帶鬆解術」立即順暢',
  },
];

// ── 17. PERIPHERAL_NERVE Chapter View ────────────────────────────────────────
export const PeripheralNerveChapter: React.FC = () => (
  <div className="space-y-6">
    <FigureFrame
      number="圖 17-1"
      title="周邊神經卡壓四大熱點（腕隧道、肘隧道、梨狀肌、腓總神經）與雙重壓迫症候群"
      source="AAOS Carpal Tunnel Guideline；AANEM 電生理診斷指引"
      caption="手腳發麻不一定都是脊椎長骨刺！正中神經卡在手腕、尺神經卡在手肘、坐骨神經卡在臀部梨狀肌、腓總神經卡在膝外側，各有獨特的麻木地圖與誘發動作。"
    >
      <PeripheralNerveEntrapmentFigure />
    </FigureFrame>

    <div className="space-y-4">
      <H3>手麻到底是「頸椎骨刺壓迫」還是「腕隧道／肘隧道症候群」？</H3>
      <P>
        臨床上有高達三成手麻患者同時合併頸椎退化與手腕卡壓，稱為<strong>「雙重壓迫症候群（Double Crush Syndrome）」</strong>——因為上游頸椎神經根被輕微壓迫後，軸突養分運輸變差，導致下游手腕的正中神經變得極度脆弱。若沒透過<strong>神經傳導速度與肌電圖（NCS / EMG）</strong>及高解析神經超音波釐清主次，只開了手腕或只拉了脖子，手麻當然不會好！
      </P>
    </div>

    <DataTable
      title="表 17-1　「腕隧道症候群」、「肘隧道症候群」與「頸椎神經根病變」臨床鑑別表"
      source="AANEM；AAOS Clinical Practice Guideline"
      columns={[
        { key: 'feature', header: '鑑別面向', className: 'font-bold min-w-[130px]' },
        { key: 'cts', header: '腕隧道症候群（正中神經）' },
        { key: 'cubital', header: '肘隧道症候群（尺神經）' },
        { key: 'cervical', header: '頸椎神經根病變（C6–C8）' },
      ]}
      rows={NERVE_ROOT_VS_PERIPHERAL_TABLE}
      rowKey={(_, idx) => String(idx)}
    />

    <Callout kind="redflag" title="周邊神經卡壓不能拖延的開刀警訊：肌肉已經開始凹陷萎縮！">
      <p>
        當神經從「感覺發麻」演變到<strong>「反而不太麻了，但大拇指根部大魚際肌或虎口肌肉明顯凹陷萎縮、拿筷子扣鈕扣無力，或腳板翹不起來（垂足）」</strong>，代表運動神經軸突正在大量壞死！此時千萬別再只做熱敷電療，必須盡速請神經骨科／手外科評估微創神經減壓手術，以免肌肉永久萎縮無法恢復。
      </p>
    </Callout>
  </div>
);

// ── 18. KNEE_HIP_OA Chapter View ─────────────────────────────────────────────
export const KneeHipOaChapter: React.FC = () => (
  <div className="space-y-6">
    <FigureFrame
      number="圖 18-1"
      title="退化性膝關節炎 Kellgren-Lawrence (KL 1–4 期) 演進與「運動 ➔ 注射 ➔ 保膝截骨 ➔ 人工關節」階梯"
      source="AAOS Management of Osteoarthritis of the Knee (Non-Arthroplasty) Guideline；OARSI 指引"
      caption="膝蓋退化不是「用太多磨壞」，而是軟骨代謝失衡加上大腿肌力不足！第 1–3 期透過減重、股四頭肌訓練、精準注射或保膝截骨術（HTO），絕大多數能保住原裝膝蓋；第 4 期骨頭磨骨頭則有微創人工關節置換可重拾行走自由。"
    >
      <KneeHipOaAndJointFigure />
    </FigureFrame>

    <div className="space-y-4">
      <H3>膝蓋痛就不敢走路運動？錯！不動反而讓軟骨餓死、大腿萎縮</H3>
      <P>
        關節軟骨本身沒有血管，它像一塊海綿，必須靠<strong>「走路與溫和運動時的擠壓與放鬆」</strong>才能把關節液裡的養分吸進去！如果因為怕痛就整天坐著不動，大腿前側的<strong>「股四頭肌（Quadriceps）」</strong>與臀部<strong>「臀中肌」</strong>會在幾週內快速萎縮，失去肌肉吸震保護的膝蓋，每走一步就由軟骨直接硬扛衝擊，退化反而快 3 倍！
      </P>
      <Callout kind="tip" title="護膝黃金運動處方 ＆ 髖關節「鼠蹊部痛／股骨頭缺血性壞死」警訊">
        <p>
          • <strong>最安全護膝 3 動作</strong>：① <strong>坐姿直抬腿（勾腳尖、伸直膝蓋用力繃緊大腿前側 10 秒）</strong>、② <strong>靠牆微深蹲（膝蓋彎曲不超過 45 度、膝蓋對準第二腳趾不內夾）</strong>、③ <strong>水中走路或高坐墊室內腳踏車</strong>。避免深蹲到底、蹲著擦地種菜、跪姿與下樓梯衝刺。<br />
          • <strong>怎麼分辨「腰椎坐骨神經痛」跟「髖關節退化／股骨頭缺血性壞死」？</strong>：腰椎問題多從後腰、臀部順著大腿後外側麻到小腿；而<strong>真正的髖關節病變，疼痛中心在「前側鼠蹊部（腹股溝）深處」，且盤腿、穿襪子剪趾甲（髖關節內外旋）時卡住劇痛</strong>！若有長期飲酒或服用類固醇病史出現鼠蹊部痛，務必照 X 光與 MRI 排除股骨頭缺血性壞死。
        </p>
      </Callout>
    </div>

    <DataTable
      title="表 18-1　退化性膝關節炎治療武器實證評級（運動、玻尿酸、PRP、保膝截骨與人工關節）"
      source="AAOS 2021；OARSI Guidelines；台灣骨科醫學會"
      columns={[
        { key: 'modality', header: '治療方式', className: 'font-bold min-w-[165px]' },
        { key: 'grade', header: '國際實證推薦等級', className: 'font-bold text-sky-700 dark:text-sky-400 min-w-[140px]' },
        { key: 'suitable', header: '最適合期別與對象' },
        { key: 'truth', header: '臨床實證真相與關鍵細節' },
      ]}
      rows={KNEE_INJECTION_AND_SURGERY_TABLE}
      rowKey={(_, idx) => String(idx)}
    />
  </div>
);

// ── 19. SHOULDER_UPPER Chapter View ──────────────────────────────────────────
export const ShoulderUpperChapter: React.FC = () => (
  <div className="space-y-6">
    <FigureFrame
      number="圖 19-1"
      title="肩膀舉不起來兩大元兇鑑別：五十肩（關節囊沾黏卡死）vs 旋轉肌袖撕裂（肌腱斷裂無力）"
      source="AAOS Rotator Cuff & Adhesive Capsulitis Guidelines；台灣復健醫學會骨骼肌肉超音波指引"
      caption="千萬別把「旋轉肌袖破洞」當成「五十肩」拼命甩手拉筋！五十肩是連別人幫你抬都卡死（需關節囊擴張與伸展）；旋轉肌袖撕裂則是自己舉無力但別人抬得動（過度甩手反而把破洞撕得更大！）。"
    >
      <ShoulderRotatorCuffVsFrozenFigure />
    </FigureFrame>

    <DataTable
      title="表 19-1　肩關節與上肢四大常見神經骨科疾病（五十肩、旋轉肌撕裂、鈣化性肌腱炎、網球肘/扳機指）"
      source="AAOS / 台灣骨科與復健醫學會臨床共識"
      columns={[
        { key: 'disease', header: '疾病名稱', className: 'font-bold min-w-[165px]' },
        { key: 'hallmark', header: '典型症狀與 10 秒自我鑑別特徵' },
        { key: 'treatment', header: '現代精準微創與復健治療策略' },
      ]}
      rows={UPPER_LIMB_CONDITIONS_TABLE}
      rowKey={(_, idx) => String(idx)}
    />
  </div>
);

// ── 20. ANKLE_FOOT_NEURO Chapter View ────────────────────────────────────────
export const AnkleFootNeuroChapter: React.FC = () => (
  <div className="space-y-6">
    <FigureFrame
      number="圖 20-1"
      title="從走路姿勢看懂神經與骨骼病變：四大異常步態（垂足跨閾、頸椎痙攣、巴金森碎步、搖擺步態）"
      source="ASIA ISNCSCI；神經骨科步態生物力學分析"
      caption="步態是神經系統與骨骼關節的綜合成績單：單腳板翹不起來（垂足）要查腰椎 L5 或腓總神經；雙腳僵硬像踩棉花要查頸椎脊髓壓迫（Myelopathy）；小碎步前傾則要查腦部巴金森氏症。"
    >
      <FootAnkleAndNeuroGaitFigure />
    </FigureFrame>

    <div className="space-y-4">
      <H3>早晨下床第一步腳跟像踩到釘子？足底筋膜炎與阿基里斯腱照護</H3>
      <P>
        <strong>足底筋膜炎（Plantar Fasciitis）</strong>最典型的特徵就是<strong>「早上睡醒下床踩地的那一瞬間，腳跟內側出現如針刺刀割般劇痛，走十幾步後稍微緩解，但久站或走久又痛起來」</strong>。這是因為睡覺時腳板自然下垂，微小撕裂的足底筋膜與小腿肚阿基里斯腱整晚處於縮短狀態，早上一踩地被瞬間拉扯再度撕裂！
      </P>
      <Callout kind="tip" title="足底筋膜炎「下床前 3 分鐘保命操」＆ 急性踝扭傷最新 PEACE & LOVE 原則">
        <p>
          • <strong>解決晨起第一步劇痛</strong>：早上醒來<strong>「雙腳還沒踩到地板前」</strong>，先在床沿坐著將患側腳跨在另一腳膝蓋上，用手把<strong>腳趾頭往腳背方向扳到底（同時拉伸足底筋膜）維持 15 秒 × 10 次</strong>，並做小腿肚推牆拉筋與踩網球按摩足弓；嚴禁赤腳踩硬磁磚地板，室內務必穿具足弓支撐的厚底拖鞋！頑固超過 3 個月者可接受<strong>體外震波（ESWT）</strong>治療。<br />
          • <strong>腳踝翻船扭傷最新國際共識「PEACE & LOVE」（取代舊版長期冰敷 RICE）</strong>：急性期前 1–3 天講求 <strong>P（保護護踝）、E（抬高消腫）、A（避免過度使用消炎止痛藥與長時間冰敷，因為適度發炎是韌帶修復必需的！）、C（彈性繃帶加壓）、E（衛教）</strong>；亞急性期則啟動 <strong>L（漸進負重行走）、O（樂觀）、V（有氧促循環）、E（單腳閉眼平衡本體感覺訓練，預防變成習慣性扭傷！）</strong>。
        </p>
      </Callout>
    </div>
  </div>
);
