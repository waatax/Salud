import React from 'react';
import {
  GASTRO_KEY_NUMBERS,
  GI_ORGANS_OVERVIEW,
  LA_CLASSIFICATION,
  ULCER_COMPARISON,
  HP_TESTS_TABLE,
  HP_REGIMENS_TABLE,
  FODMAP_GUIDE_ROWS,
  IBD_VS_IBS_COMPARE,
  POLYP_FOLLOWUP_TABLE,
  MASLD_WEIGHT_LOSS_TARGETS,
  HBV_VS_HCV_TABLE,
  CIRRHOSIS_COMPLICATIONS,
  BILIARY_SPECTRUM_TABLE,
  COLONOSCOPY_PREP_TIMELINE,
  BRISTOL_STOOL_DATA,
} from '../../../data/gastroData';
import { DataTable } from '../../common/pro/DataTable';
import { FigureFrame, Callout, GradePill } from '../../common/pro/Blocks';
import {
  GiTractPanoramaFigure,
  GerdLesAndBarrettFigure,
  CorreaCascadeAndHpFigure,
  IbsFodmapMechanismFigure,
  IbdUcVsCdFigure,
  AdenomaCarcinomaSequenceFigure,
  MasldFibrosisProgressionFigure,
  HbvVsHcvViralFigure,
  PortalHypertensionFigure,
  BiliaryTreeAndCharcotFigure,
  PancreatitisMechanismFigure,
  BristolStoolAndAbdominalGridFigure,
} from './GastroFigures';
import { Fib4Calculator, AbdominalPainTriageTool, BowelPrepFoodChecker } from './GastroTools';

const H3: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white pt-2">{children}</h3>
);

const P: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-[15px] leading-7 text-slate-700 dark:text-slate-300 max-w-3xl">{children}</p>
);

// ── 1. OVERVIEW ──────────────────────────────────────────────────────────────
export const GastroOverviewChapter: React.FC = () => (
  <div className="space-y-6">
    <dl className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
      {GASTRO_KEY_NUMBERS.map((n) => (
        <div
          key={n.label}
          className="flex flex-col-reverse rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-3.5"
        >
          <dt className="text-[12px] leading-snug text-slate-600 dark:text-slate-400">{n.label}</dt>
          <dd className="text-2xl font-display font-bold text-emerald-700 dark:text-emerald-400">
            {n.value}
            <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 ml-1">{n.unit}</span>
          </dd>
        </div>
      ))}
    </dl>

    <FigureFrame
      number="圖 1-1"
      title="消化道全貌、十二指腸乳頭（膽胰匯流口）與腦腸軸雙向調控"
      source="標準解剖生理學；ACG / Rome IV 腦腸互動共識"
      caption="肝臟製造的膽汁與胰臟分泌的消化酵素，會在十二指腸第二段的「法特氏壺腹（乳頭）」會合流入腸道；而迷走神經與腸道菌產生的短鏈脂肪酸（SCFA）則構成雙向溝通的腦腸軸。"
    >
      <GiTractPanoramaFigure />
    </FigureFrame>

    <div className="space-y-4">
      <H3>為什麼緊張就會胃痛拉肚子？認識「第二大腦」</H3>
      <P>
        人體的腸胃道不只是消化食物的水管，它牆壁內嵌著超過 <strong>5 億個神經元組成的「腸道神經系統（ENS）」</strong>，不需要大腦下令就能獨立協調蠕動與分泌。更驚人的是，全身約 <strong>90% 的血清素（5-HT，調節情緒與腸蠕動）</strong>與 <strong>70% 的免疫細胞</strong>都駐紮在腸道。當工作高壓、失眠焦慮時，大腦交感神經與壓力荷爾蒙會直接讓胃酸失控、腸道痙攣；反過來，當腸道菌相失衡、黏膜發炎（腸漏），發炎訊號也會順著迷走神經傳回大腦，加重疲勞與焦慮。
      </P>
      <Callout kind="tip" title="養好腸道微生態的 3 個日常鐵律">
        <p>
          1. <strong>給好菌吃「益生元（膳食纖維）」</strong>：不能只吃益生菌膠囊卻不吃菜！每天攝取足量蔬菜、全穀、菇類與豆類，好菌才能發酵產生「丁酸（Butyrate）」修補腸黏膜緊密連接。<br />
          2. <strong>避開破壞黏液層的元兇</strong>：高果糖手搖飲、人工乳化劑（超加工食品）、過量酒精與非必要抗生素會快速剝蝕腸道保護黏液。<br />
          3. <strong>分辨「肝臟」與「膽囊」的分工</strong>：<strong>膽汁是肝臟製造的</strong>（每天約 800 mL），膽囊只是負責儲存濃縮的倉庫；所以切除膽囊後依然有膽汁可以消化食物。
        </p>
      </Callout>
    </div>

    <DataTable
      title="表 1-1　肝膽腸胃七大器官生理分工、常見疾病與首選檢查"
      source="ACG / AGA 臨床指引彙整"
      columns={[
        { key: 'organ', header: '器官部位', className: 'font-bold min-w-[140px]' },
        { key: 'role', header: '核心生理任務' },
        { key: 'common_diseases', header: '常見代表疾病' },
        { key: 'key_test', header: '黃金診斷工具', className: 'min-w-[150px]' },
      ]}
      rows={GI_ORGANS_OVERVIEW}
      rowKey={(_, idx) => String(idx)}
    />
  </div>
);

// ── 2. GERD_ULCER ────────────────────────────────────────────────────────────
export const GerdUlcerChapter: React.FC = () => (
  <div className="space-y-6">
    <FigureFrame
      number="圖 2-1"
      title="下食道括約肌（LES）失靈機轉、夜間左側睡姿與洛杉磯食道炎分級"
      source="ACG GERD Clinical Guideline 2022"
      caption="胃食道逆流大多不是「胃酸過多」，而是賁門括約肌頻繁鬆弛（TLESR）或橫膈膜裂孔疝氣；睡覺採「左側躺＋墊高床頭 15–20 公分」可利用重力讓胃袋低於食道出口。"
    >
      <GerdLesAndBarrettFigure />
    </FigureFrame>

    <div className="space-y-4">
      <H3>典型火燒心 vs 非典型「咽喉逆流（LPR）」</H3>
      <P>
        典型胃食道逆流表現為胸骨後灼熱感（火燒心）與酸水逆流；但門診有將近三成患者沒有明顯火燒心，而是表現為<strong>慢性乾咳、早上起床聲音沙啞、喉嚨卡痰異物感（梅核氣）、經常清喉嚨或牙齒酸蝕</strong>——這稱為<strong>咽喉逆流（LPR）</strong>，因為咽喉黏膜完全沒有抗酸保護力，只要極微量的胃酸或胃蛋白酶氣霧飄上來就會發炎。
      </P>
      <Callout kind="evidence" title="為什麼胃藥 PPI「吃錯時間」效果差一半？認識新一代 P-CAB">
        <p>
          • <strong>傳統氫離子幫浦抑制劑（PPI，如耐適恩、百抑潰、泰克胃通）</strong>：必須在<strong>「早餐（或一天第一餐）飯前 30–60 分鐘空腹吃」</strong>！因為藥物吸收後需要剛好遇上「進食誘發胃壁質子幫浦活化」才能將其封鎖；若睡前才吃或飯後吃，藥效大打折扣。<br />
          • <strong>新一代鉀離子競爭性酸阻斷劑（P-CAB，如วอนoprazan 沃克）</strong>：不需等待進食活化、不受餐前餐後限制，起效極快且夜間控酸更穩定，是重度食道炎（LA Grade C/D）與難治型逆流的新利器。<br />
          • <strong>海藻酸製劑（如胃逆舒 Gaviscon）</strong>：飯後與睡前服用，會在胃酸表面形成一層物理性「泡沫浮筏（Alginate raft）」，像蓋子一樣擋住逆流。
        </p>
      </Callout>
    </div>

    <DataTable
      title="表 2-1　胃鏡「洛杉磯糜爛性食道炎分級（LA Classification）」與臨床處置"
      source="ACG 2022；Lyon Consensus 2.0"
      columns={[
        { key: 'grade', header: '洛杉磯分級', className: 'font-bold min-w-[130px]' },
        { key: 'endoscopic', header: '胃鏡下黏膜破損特徵' },
        {
          key: 'meaning',
          header: '臨床意義與治療策略',
          render: (r) => (
            <div className="space-y-1">
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full border text-[11px] font-semibold ${r.tone === 'good' ? 'bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950/50 dark:text-emerald-200 dark:border-emerald-800' : r.tone === 'warn' ? 'bg-amber-50 text-amber-900 border-amber-300 dark:bg-amber-950/50 dark:text-amber-200 dark:border-amber-800' : 'bg-rose-50 text-rose-800 border-rose-300 dark:bg-rose-950/50 dark:text-rose-200 dark:border-rose-800'}`}>{r.grade.split('（')[0]}</span>
              <p className="text-[13px]">{r.meaning}</p>
            </div>
          ),
        },
      ]}
      rows={LA_CLASSIFICATION}
      rowKey={(_, idx) => String(idx)}
    />

    <DataTable
      title="表 2-2　「胃潰瘍（GU）」與「十二指腸潰瘍（DU）」臨床鑑別表"
      source="台灣消化系醫學會；ACG Peptic Ulcer Guideline"
      columns={[
        { key: 'feature', header: '比較項目', className: 'font-bold min-w-[130px]' },
        { key: 'gu', header: '胃潰瘍 (Gastric Ulcer)' },
        { key: 'du', header: '十二指腸潰瘍 (Duodenal Ulcer)' },
      ]}
      rows={ULCER_COMPARISON}
      rowKey={(_, idx) => String(idx)}
    />

    <Callout kind="redflag" title="上消化道 6 大警示症狀（Alarm Symptoms）：請勿只買胃藥，務必做胃鏡！">
      <p>
        若出現：① <strong>吞嚥困難或吞嚥疼痛（食物卡在胸口）</strong>、② <strong>吐鮮血或咖啡色嘔吐物</strong>、③ <strong>解柏油般發亮且腥臭的黑便</strong>、④ <strong>不明原因體重減輕或貧血（缺鐵性貧血）</strong>、⑤ <strong>持續嘔吐無法進食</strong>、⑥ <strong>45–50 歲以上新發生的持續上腹痛或有胃癌家族史</strong>，請立即安排上消化道內視鏡檢查。
      </p>
    </Callout>
  </div>
);

// ── 3. HP_GASTRIC ────────────────────────────────────────────────────────────
export const HpGastricChapter: React.FC = () => (
  <div className="space-y-6">
    <FigureFrame
      number="圖 3-1"
      title="幽門螺旋桿菌「Correa 胃癌致病五部曲」與黃金除菌攔截點"
      source="Maastricht VI / Florence Consensus 2022；ACG H. pylori Guideline 2024"
      caption="幽門螺旋桿菌分泌尿素酶中和胃酸並釋放 CagA/VacA 毒素，讓胃黏膜歷經數十年從慢性發炎走向萎縮、腸上皮化生與胃癌。在進入「腸上皮化生」前成功除菌，幾乎可完全阻斷胃癌發生！"
    >
      <CorreaCascadeAndHpFigure />
    </FigureFrame>

    <div className="space-y-4">
      <H3>第一類致癌物：為什麼沒症狀也一定要除菌？</H3>
      <P>
        幽門螺旋桿菌（<em>Helicobacter pylori</em>）被世界衛生組織列為<strong>第一類明確致癌物（Group 1 Carcinogen）</strong>，高達 85–90% 的非賁門胃腺癌、90% 的十二指腸潰瘍與 70% 的胃潰瘍都由它引起。台灣成人感染率約 25–30%，多數經由家庭內共食唾液或糞口途徑傳播。根據國際《京都胃炎共識》與台灣國健署胃癌防治政策：<strong>只要檢測確認為現症感染，不論有無胃痛症狀，一律建議接受除菌治療</strong>，除菌後更應鼓勵同住家人一併篩檢，避免交叉重複感染。
      </P>
    </div>

    <DataTable
      title="表 3-1　幽門螺旋桿菌四大檢測工具優缺點與停藥準備（防偽陰性鐵律）"
      source="Maastricht VI 2022；台灣消化系醫學會臨床共識"
      columns={[
        { key: 'method', header: '檢測方法', className: 'font-bold min-w-[160px]' },
        { key: 'invasive', header: '侵入性', className: 'min-w-[90px]' },
        { key: 'sensitivity', header: '準確度' },
        { key: 'pros', header: '臨床定位與優勢' },
        { key: 'prep', header: '檢查前注意事項（極重要！）' },
      ]}
      rows={HP_TESTS_TABLE}
      rowKey={(_, idx) => String(idx)}
    />

    <DataTable
      title="表 3-2　幽門螺旋桿菌第一線與救援除菌處方對照表（10–14 天完整療程）"
      source="ACG 2024；台灣消化系醫學會指引"
      columns={[
        { key: 'regimen', header: '處方名稱', className: 'font-bold min-w-[160px]' },
        { key: 'drugs', header: '藥物組合' },
        { key: 'days', header: '天數' },
        { key: 'rate', header: '除菌成功率' },
        { key: 'note', header: '服藥叮嚀與適用情境' },
      ]}
      rows={HP_REGIMENS_TABLE}
      rowKey={(_, idx) => String(idx)}
    />

    <Callout kind="tip" title="成功除菌的 3 個關鍵細節">
      <p>
        1. <strong>絕對不可擅自停藥</strong>：除菌處方含 2–3 種抗生素，若吃幾天覺得嘴巴苦、微腹瀉就自己停藥，沒死光的細菌會立刻產生抗藥性，下次更難殺！可搭配益生菌（與抗生素間隔 2 小時）減輕腸道不適。<br />
        2. <strong>務必做「除菌後確認吹氣測試」</strong>：吃完藥不代表一定殺乾淨！請在<strong>停用抗生素滿 4 週、停用 PPI 滿 2 週後</strong>回診吹氣（碳 13）或驗糞便抗原確認清零。<br />
        3. <strong>已有萎縮性胃炎或腸化生者仍須定期胃鏡</strong>：若除菌前胃黏膜已經出現中重度「萎縮性胃炎（OLGA III/IV）」或「腸上皮化生（OLGIM III/IV）」，即使細菌殺光了，胃黏膜仍帶有癌變風險，需每 1–3 年追蹤胃鏡。
      </p>
    </Callout>
  </div>
);

// ── 4. IBS_FODMAP ────────────────────────────────────────────────────────────
export const IbsFodmapChapter: React.FC = () => (
  <div className="space-y-6">
    <FigureFrame
      number="圖 4-1"
      title="高 FODMAP 短鏈醣類引發腸躁症腹脹絞痛機轉與 Monash 三階段飲食流程"
      source="ACG IBS Guideline 2021；Monash University Low FODMAP Protocol"
      caption="FODMAP（可發酵性的寡醣、雙醣、單醣與多元醇）在小腸吸引水分、在大腸被細菌瞬間發酵產氣，刺激內臟超敏感神經引發腹痛。採用三階段低 FODMAP 飲食可讓 70% 患者顯著改善。"
    >
      <IbsFodmapMechanismFigure />
    </FigureFrame>

    <div className="space-y-4">
      <H3>Rome IV 診斷標準：怎麼確定是不是大腸激躁症（IBS）？</H3>
      <P>
        大腸激躁症並非「心理作用」，而是真實的<strong>腦腸互動障礙（Disorder of Gut-Brain Interaction, DGBI）</strong>。根據國際 Rome IV 標準：過去 3 個月內，<strong>平均每週至少 1 天出現反覆腹痛</strong>，且合併以下至少兩項：① <strong>疼痛與排便相關（通常排便後腹痛緩解）</strong>、② <strong>伴隨排便頻率改變</strong>、③ <strong>伴隨糞便型態（外觀）改變</strong>。依便型可分為<strong>腹瀉型（IBS-D）</strong>、<strong>便秘型（IBS-C）</strong>與<strong>混合型（IBS-M）</strong>。
      </P>
      <Callout kind="redflag" title="先排除器質性疾病！出現這 6 個警訊絕不能只當成腸躁症">
        <p>
          若出現：① <strong>50 歲以後才第一次發作</strong>、② <strong>大便帶血或黑便</strong>、③ <strong>半夜熟睡中被腹痛或腹瀉叫醒（腸躁症極少在半夜熟睡時發作！）</strong>、④ <strong>不明原因體重減輕、發燒或貧血</strong>、⑤ <strong>大腸癌或發炎性腸病家族史</strong>、⑥ <strong>糞便潛血或糞便鈣衛蛋白異常</strong>，必須先安排大腸鏡檢查！
        </p>
      </Callout>
    </div>

    <DataTable
      title="表 4-1　台灣在地飲食「高 FODMAP 地雷 vs 低 FODMAP 安心替換」實戰對照表"
      source="Monash University FODMAP Database；台灣營養學會調整"
      columns={[
        { key: 'group', header: 'FODMAP 四大類別', className: 'font-bold min-w-[160px]' },
        { key: 'high_avoid', header: '🔴 高 FODMAP（第一階段 2–6 週先避開）' },
        { key: 'low_eat', header: '🟢 低 FODMAP（安心替換食材）' },
      ]}
      rows={FODMAP_GUIDE_ROWS}
      rowKey={(_, idx) => String(idx)}
    />
  </div>
);

// ── 5. IBD_CARE ──────────────────────────────────────────────────────────────
export const IbdCareChapter: React.FC = () => (
  <div className="space-y-6">
    <FigureFrame
      number="圖 5-1"
      title="發炎性腸道疾病雙雄：潰瘍性結腸炎（UC）vs 克隆氏症（CD）解剖與深度差異"
      source="STRIDE-II IOIBD Consensus 2021；台灣發炎性腸道疾病學會"
      caption="潰瘍性結腸炎（UC）從直腸開始往上「連續性」侵犯大腸黏膜表層；克隆氏症（CD）則從口腔到肛門皆可發生「跳躍式、全層穿透性」發炎，極易造成腸狹窄、穿孔與肛門廔管。"
    >
      <IbdUcVsCdFigure />
    </FigureFrame>

    <div className="space-y-4">
      <H3>不是吃壞肚子，而是免疫軍隊攻擊自己的腸道</H3>
      <P>
        <strong>發炎性腸道疾病（IBD）</strong>好發於 20–40 歲青壯年，是基因易感性、腸道微生態失衡與環境飲食共同誘發的慢性免疫發炎，在台灣屬健保重大傷病。過去治療只求「不拉肚子」，但現代國際 <strong>STRIDE-II 達標治療（Treat-to-Target）</strong>強調：即使沒有症狀，若腸壁深層仍在發炎，未來仍會腸穿孔或癌變；因此治療終極目標是讓<strong>「糞便鈣衛蛋白（Calprotectin）降回正常」並達成內視鏡下的「黏膜完全癒合（Mucosal Healing）」</strong>。
      </P>
    </div>

    <DataTable
      title="表 5-1　大腸激躁症（IBS）、潰瘍性結腸炎（UC）與克隆氏症（CD）全方位鑑別"
      source="ACG / ECCO / 台灣發炎性腸道疾病學會指引"
      columns={[
        { key: 'item', header: '鑑別面向', className: 'font-bold min-w-[130px]' },
        { key: 'ibs', header: '大腸激躁症 (IBS)' },
        { key: 'uc', header: '潰瘍性結腸炎 (UC)' },
        { key: 'cd', header: '克隆氏症 (Crohn’s)' },
      ]}
      rows={IBD_VS_IBS_COMPARE}
      rowKey={(_, idx) => String(idx)}
    />

    <Callout kind="tip" title="IBD 病友日常照護與生物製劑治療守則">
      <p>
        • <strong>急性發作期 vs 緩解期飲食</strong>：急性血便腹瀉期應採「低渣、高蛋白、低脂、去乳糖」飲食減少腸道刮擦；進入緩解期後則應逐步恢復地中海型原型飲食，避開含人工乳化劑（聚山梨醇酯、卡拉膠）的超加工食品。<br />
        • <strong>切勿擅自停用抗發炎藥（5-ASA）或生物製劑／小分子標靶藥</strong>：擅自停藥會誘發抗藥抗體產生並導致嚴重復發；啟用生物製劑前需先完成 B 肝、C 肝與潛伏結核菌（LTBI）篩檢。<br />
        • <strong>大腸癌監測</strong>：全結腸型 IBD 罹病滿 8–10 年後，應每 1–2 年接受染色或窄頻高畫質大腸鏡監測異生病變。
      </p>
    </Callout>
  </div>
);

// ── 6. CRC_POLYPS ────────────────────────────────────────────────────────────
export const CrcPolypsChapter: React.FC = () => (
  <div className="space-y-6">
    <FigureFrame
      number="圖 6-1"
      title="大腸「腺瘤–癌變序列（Adenoma-Carcinoma Sequence）」與內視鏡息肉切除攔截"
      source="US Multi-Society Task Force (USMSTF) 2020；台灣國健署大腸癌篩檢指引"
      caption="超過 85–90% 的大腸癌是由良性的「腺瘤性息肉」或「無柄鋸齒狀息肉（SSL）」歷經 5–10 年基因突變長成。在大腸鏡檢查當下用通電套環（Snare）切除腺瘤，就能直接把大腸癌消滅在萌芽前！"
    >
      <AdenomaCarcinomaSequenceFigure />
    </FigureFrame>

    <div className="space-y-4">
      <H3>台灣發生人數長年居冠，卻是「最能被預防」的癌症</H3>
      <P>
        早期大腸癌與進階大腺瘤幾乎<strong>完全沒有症狀</strong>——等到出現大便變細如鉛筆、持續血便、裡急後重、不明原因缺鐵性貧血或體重下降時，往往已是第二、三期以上。台灣國健署已擴大公費篩檢：<strong>45–74 歲一般民眾，以及 40–44 歲具大腸癌一等親家族史者，每 2 年可免費做 1 次「定量免疫法糞便潛血檢查（iFOBT）」</strong>。實證顯示定期篩檢可降低 35% 大腸癌死亡率！
      </P>
      <Callout kind="redflag" title="糞便潛血陽性（iFOBT +）的黃金鐵律：千萬別「重驗一次看會不會變陰性」！">
        <p>
          定量免疫法糞便潛血（iFOBT）專門偵測人類下消化道血紅素，<strong>不會因為前天吃豬血鴨血、紅肉、鐵劑或維他命 C 而偽陽性</strong>。因為大腸腫瘤或大息肉是「間歇性流血」，今天流、明天不一定流，所以<strong>重驗一次變陰性完全不能排除大腸癌</strong>！統計顯示 iFOBT 陽性者每 2 人就有 1 人有腺瘤息肉、每 20–25 人就有 1 人確診大腸癌，請務必於 <strong>3 個月內完成全大腸鏡檢查</strong>。
        </p>
      </Callout>
    </div>

    <DataTable
      title="表 6-1　大腸鏡息肉病理報告判讀與「下一次大腸鏡追蹤年限」國際指引表"
      source="US Multi-Society Task Force (USMSTF) 2020；台灣消化系內視鏡醫學會"
      columns={[
        { key: 'finding', header: '大腸鏡與病理切片結果', className: 'font-bold min-w-[190px]' },
        { key: 'risk', header: '風險分層', className: 'min-w-[120px]' },
        { key: 'next_scope', header: '建議下次大腸鏡間隔', className: 'font-bold text-emerald-700 dark:text-emerald-400 min-w-[130px]' },
        { key: 'note', header: '臨床關鍵前提與備註' },
      ]}
      rows={POLYP_FOLLOWUP_TABLE}
      rowKey={(_, idx) => String(idx)}
    />
  </div>
);

// ── 7. MASLD_FATTY ───────────────────────────────────────────────────────────
export const MasldFattyChapter: React.FC = () => (
  <div className="space-y-6">
    <FigureFrame
      number="圖 7-1"
      title="代謝性脂肪性肝病（MASLD）四部曲與「3–7–10% 減重逆轉階梯」"
      source="EASL-EASD-EASO MASLD Guideline 2024；AASLD Practice Guidance 2023"
      caption="國際肝病學界已將過往的 NAFLD 正式更名為「代謝性脂肪性肝病（MASLD）」。在發展成F4肝硬化前，透過減重 3–5% 可消減肝脂肪、減重 ≥7% 可消除肝炎發炎、減重 ≥10% 更能逆轉肝纖維化！"
    >
      <MasldFibrosisProgressionFigure />
    </FigureFrame>

    <Fib4Calculator />

    <div className="space-y-4">
      <H3>為什麼瘦子也會得脂肪肝？果糖與肌少症是隱形推手</H3>
      <P>
        台灣約每 3 位成人就有 1 人有脂肪肝，其中約 15–20% 屬於 BMI 正常的<strong>「瘦子脂肪肝（Lean MASLD）」</strong>。除了亞洲人常見的 <code>PNPLA3</code> 基因多型性外，最大的飲食元兇是<strong>「液態果糖（手搖飲高果糖糖漿、含糖飲料）」</strong>——葡萄糖可被全身肌肉利用，但果糖幾乎 100% 必須送進肝臟代謝，直接啟動「新生脂肪合成（De novo lipogenesis）」把肝臟塞滿油滴並升高尿酸！此外，久坐缺乏肌肉（肌少症）會導致胰島素阻抗，讓游離脂肪酸不斷湧入肝臟。
      </P>
    </div>

    <DataTable
      title="表 7-1　逆轉代謝性脂肪肝（MASLD / MASH）的實證減重目標與行動處方"
      source="EASL 2024；AASLD 2023"
      columns={[
        { key: 'target', header: '體重減輕幅度', className: 'font-bold text-emerald-700 dark:text-emerald-400 min-w-[130px]' },
        { key: 'liver_benefit', header: '肝臟組織學實證改善效益' },
        { key: 'how', header: '具體執行處方（飲食＋運動＋藥物評估）' },
      ]}
      rows={MASLD_WEIGHT_LOSS_TARGETS}
      rowKey={(_, idx) => String(idx)}
    />
  </div>
);

// ── 8. HEPATITIS_BC ──────────────────────────────────────────────────────────
export const HepatitisBcChapter: React.FC = () => (
  <div className="space-y-6">
    <FigureFrame
      number="圖 8-1"
      title="B 型肝炎（細胞核 cccDNA 長期抑制）vs C 型肝炎（細胞質 RNA 口服新藥 98% 根治）"
      source="WHO Hepatitis B Guideline 2024；AASLD-IDSA HCV Guidance 2023"
      caption="B 肝病毒會在肝細胞核內形成極頑固的共價閉合環狀 DNA（cccDNA），因此口服抗病毒藥需長期服用不可擅停；C 肝病毒則是純細胞質 RNA 病毒，健保全額給付的 DAA 口服新藥只需 8–12 週即可 98% 徹底根治！"
    >
      <HbvVsHcvViralFigure />
    </FigureFrame>

    <div className="space-y-4">
      <H3>慢性肝病三部曲（肝炎 ➔ 肝硬化 ➔ 肝癌）是可以被切斷的！</H3>
      <P>
        肝臟內部沒有痛覺神經，是標準的「沉默器官」。台灣國健署提供 <strong>45–79 歲民眾（原住民提早至 40–79 歲）終身 1 次免費 B、C 型肝炎抽血篩檢</strong>：
      </P>
      <Callout kind="evidence" title="看懂 B、C 肝抽血報告與治療黄金原則">
        <p>
          • <strong>B 型肝炎表面抗原陽性（HBsAg +）</strong>：代表您是 B 肝帶原者。即使肝指數 AST/ALT 正常，也必須<strong>每 6 個月定期抽血（ALT、AFP 胎兒蛋白）並做腹部超音波</strong>；若病毒量（HBV DNA）偏高且伴隨發炎或纖維化，服用高抗藥性屏障口服藥（Entecavir 貝樂克、TAF 韋立得、TDF 惠立妥）可大幅降低 60–70% 肝硬化與肝癌風險，<strong>絕對不可因指數正常就自行停藥</strong>！<br />
          • <strong>接受化療、免疫抑制劑或類固醇前必驗 B 肝</strong>：曾經感染過 B 肝者（即使 HBsAg 陰性但 Anti-HBc 陽性），在接受癌症化療、標靶（如 Rituximab）或高劑量類固醇時，必須預防性投予抗病毒藥，以免 B 肝病毒猛爆性復發！<br />
          • <strong>C 型肝炎抗體陽性（Anti-HCV +）</strong>：下一步請立刻加驗<strong>「C 肝病毒量（HCV RNA）」</strong>！只要測得到病毒，台灣健保不限肝纖維化程度，<strong>100% 全額給付泛基因型全口服新藥（DAA，如夏奉寧、艾百樂、宜譜莎）</strong>，一天吃一次、幾乎無副作用，8–12 週治癒率高達 98–99%！
        </p>
      </Callout>
    </div>

    <DataTable
      title="表 8-1　B 型肝炎（HBV）與 C 型肝炎（HCV）病毒特性、疫苗與治療全比較"
      source="WHO 2024；AASLD 2023；台灣肝臟研究學會 (TASL)"
      columns={[
        { key: 'feature', header: '比較面向', className: 'font-bold min-w-[130px]' },
        { key: 'hbv', header: 'B 型肝炎病毒 (HBV)' },
        { key: 'hcv', header: 'C 型肝炎病毒 (HCV)' },
      ]}
      rows={HBV_VS_HCV_TABLE}
      rowKey={(_, idx) => String(idx)}
    />
  </div>
);

// ── 9. CIRRHOSIS_PORTAL ──────────────────────────────────────────────────────
export const CirrhosisPortalChapter: React.FC = () => (
  <div className="space-y-6">
    <FigureFrame
      number="圖 9-1"
      title="肝硬化與門靜脈高壓（Portal Hypertension）四大致命併發症與防護網"
      source="Baveno VII Consensus 2022；ESPEN Clinical Nutrition in Liver Disease 2020"
      caption="當肝臟布滿纖維疤痕變硬（F4），來自腸胃脾臟的門靜脈血液流不進肝臟，水壓飆高並向四周逆流，引發食道靜脈曲張破裂出血、腹水、脾腫大血小板低下與肝性腦病變。"
    >
      <PortalHypertensionFigure />
    </FigureFrame>

    <div className="space-y-4">
      <H3>顛覆舊觀念：肝硬化患者「不能少吃蛋白質」，更要吃「睡前點心」！</H3>
      <P>
        過去許多家屬以為肝硬化怕肝昏迷（血氨高）就不敢給病人吃肉、吃魚、吃蛋，結果導致病人四肢瘦如柴骨（<strong>嚴重肌少症 Sarcopenia</strong>）。現代歐洲臨床營養學會（ESPEN）與國際肝病指引一致指出：<strong>人體的「骨骼肌」是肝臟以外代謝清除血氨最重要的第二器官！</strong>肌肉越萎縮，肝昏迷反而越頻繁、死亡率越高。
      </P>
      <Callout kind="tip" title="肝硬化營養與日常保命 4 大鐵律">
        <p>
          1. <strong>每日攝取 1.2–1.5 g/kg 優質蛋白質</strong>：優先選擇<strong>植物性蛋白（豆腐、豆漿、毛豆）與乳製品／蛋類</strong>，它們產氨量低且富含支鏈胺基酸（BCAA）與膳食纖維，耐受度極佳。<br />
          2. <strong>必吃「睡前點心（Late Evening Snack）」</strong>：肝硬化肝臟無法儲存肝醣，空腹睡覺 8 小時相當於常人斷食 3 天，身體會在半夜分解肌肉當燃料！睡前補充一份約 150–200 大卡的點心（如一杯無糖豆漿配半片全麥吐司或燕麥）能顯著保住肌肉。<br />
          3. <strong>每天解 2–3 次軟糊便排氨</strong>：便祕會讓腸道細菌大量產氨誘發肝昏迷，請依醫囑調整 Lactulose（杜化液）劑量。<br />
          4. <strong>絕對禁止事項</strong>：<strong>❌ 禁吃 NSAID 消炎止痛藥</strong>（會直接引發肝腎症候群急性腎衰竭與胃出血）、<strong>❌ 禁吃生魚片生蠔</strong>（海洋創傷弧菌在肝硬化患者死亡率逾 50%）、<strong>❌ 禁吃來路不明中草藥偏方</strong>。
        </p>
      </Callout>
    </div>

    <DataTable
      title="表 9-1　肝硬化四大併發症機轉、早期警訊與臨床預防策略"
      source="Baveno VII 2022；AASLD Cirrhosis Guidance"
      columns={[
        { key: 'comp', header: '併發症名稱', className: 'font-bold min-w-[150px]' },
        { key: 'mechanism', header: '病理機轉' },
        { key: 'warning', header: '早期臨床警訊' },
        { key: 'prevention', header: '治療與日常預防重點' },
      ]}
      rows={CIRRHOSIS_COMPLICATIONS}
      rowKey={(_, idx) => String(idx)}
    />
  </div>
);

// ── 10. GALLBLADDER_BILE ─────────────────────────────────────────────────────
export const GallbladderBileChapter: React.FC = () => (
  <div className="space-y-6">
    <FigureFrame
      number="圖 10-1"
      title="膽道解剖：膽囊管阻塞（急性膽囊炎）vs 總膽管結石（急性膽管炎 Charcot 三聯徵）"
      source="Tokyo Guidelines 2018 (TG18)"
      caption="石頭卡在膽囊管會引起右上腹持續痛的「急性膽囊炎」；若石頭掉進主幹道「總膽管」塞住膽汁出口，則會引爆高燒寒顫、黃疸茶色尿與右上腹痛的「急性膽管炎（Charcot 三聯徵）」，必須緊急做 ERCP 內視鏡取石。"
    >
      <BiliaryTreeAndCharcotFigure />
    </FigureFrame>

    <div className="space-y-4">
      <H3>健檢發現「膽結石」或「膽囊息肉」，到底要不要開刀切膽囊？</H3>
      <P>
        約 10–15% 成人有膽結石，但其中 <strong>80% 終生沒有任何症狀</strong>。無症狀的膽結石<strong>不需要開刀，也不必吃藥排石</strong>（亂排石掉進總膽管反而致命！），只要保持三餐規律進食（避免極端長時間斷食或快速暴瘦讓膽汁濃稠淤積）即可。
      </P>
      <Callout kind="evidence" title="哪些情況下，醫師會建議「腹腔鏡膽囊切除術」？">
        <p>
          • <strong>有症狀的膽結石</strong>：曾經發生過典型膽絞痛、急性膽囊炎、膽源性胰臟炎或總膽管結石。<br />
          • <strong>高膽囊癌風險的無症狀膽結石／膽囊息肉（預防性切除指徵）</strong>：① <strong>膽囊息肉直徑 ≥ 1.0 公分（10 mm）</strong>、② <strong>息肉在追蹤期間快速長大（≥ 2 mm）或屬於廣基無柄息肉</strong>、③ <strong>「膽結石合併膽囊息肉」或年齡 &gt; 50–60 歲且息肉 ≥ 6–9 mm</strong>、④ <strong>膽結石超大（&gt; 2.5–3 公分）</strong>、⑤ <strong>瓷化膽囊（Porcelain gallbladder，膽囊壁鈣化）</strong>。<br />
          • <strong>切掉膽囊後怎麼吃？</strong>：肝臟依然每天製造膽汁，只是少了膽囊集中濃縮，術後前 1–3 個月少數人吃到高油大餐會輕微腹瀉（膽酸腹瀉），採「少量多餐、漸進恢復油脂」後，總膽管會自然代償適應。
        </p>
      </Callout>
    </div>

    <DataTable
      title="表 10-1　膽石症四大臨床光譜：從無症狀結石、膽絞痛到致命急性膽管炎"
      source="Tokyo Guidelines 2018 (TG18)；ACG Biliary Guideline"
      columns={[
        { key: 'condition', header: '疾病階段', className: 'font-bold min-w-[150px]' },
        { key: 'pain', header: '疼痛特徵與持續時間' },
        { key: 'fever_jaundice', header: '發燒與黃疸', className: 'min-w-[120px]' },
        { key: 'labs', header: '抽血與超音波表現' },
        { key: 'action', header: '標準醫療處置' },
      ]}
      rows={BILIARY_SPECTRUM_TABLE}
      rowKey={(_, idx) => String(idx)}
    />
  </div>
);

// ── 11. PANCREAS_CARE ────────────────────────────────────────────────────────
export const PancreasCareChapter: React.FC = () => (
  <div className="space-y-6">
    <FigureFrame
      number="圖 11-1"
      title="急性胰臟炎三大致病元兇（膽結石、酒精、三酸甘油酯 > 500）與典型鑽背劇痛"
      source="ACG Acute Pancreatitis Guideline 2024"
      caption="當膽結石卡住十二指腸乳頭、大量飲酒或空腹三酸甘油酯飆破 500–1,000 mg/dL 時，胰臟內的強效消化酵素會提早活化，「自己消化腐蝕自己的胰臟」，引發刀割般刺向背後的劇烈上腹痛。"
    >
      <PancreatitisMechanismFigure />
    </FigureFrame>

    <div className="space-y-4">
      <H3>急性胰臟炎「3 取 2」診斷標準與現代復甦照護</H3>
      <P>
        臨床上只要符合以下三項中的兩項即可確診<strong>急性胰臟炎（Acute Pancreatitis）</strong>：① <strong>典型上腹持續劇痛（常像鑽子般往背後放射，平躺加劇、身體前傾抱膝稍緩）</strong>、② <strong>抽血血清解脂酶（Lipase）或澱粉酶（Amylase）飆升超過正常上限 3 倍以上</strong>、③ <strong>腹部電腦斷層（CT）、磁振造影（MRI）或超音波呈現胰臟水腫發炎或壞死表現</strong>。
      </P>
      <Callout kind="evidence" title="打破舊觀念：急性胰臟炎不是「餓越久越好」，也不應亂打預防性抗生素！">
        <p>
          • <strong>早期適度點滴輸液 ＋ 儘早經口低脂飲食</strong>：過去常讓患者禁食（NPO）長達一週，反而導致腸黏膜萎縮、腸道細菌移位感染壞死胰臟！2024 ACG 指引強調：輕中度胰臟炎只要噁心嘔吐緩解、腹痛改善（通常 24–48 小時內），<strong>應儘早開始清淡低脂軟質飲食</strong>，能顯著縮短住院天數並減少感染。<br />
          • <strong>預防復發 3 件事</strong>：① <strong>膽源性胰臟炎</strong>應在同次住院或康復後盡速行腹腔鏡膽囊切除；② <strong>高三酸甘油酯胰臟炎</strong>必須終生嚴格控糖戒酒、搭配降血脂藥（Fibrates / 高純度魚油）將空腹 TG 壓在 <strong>&lt; 500 mg/dL（理想 &lt; 150 mg/dL）</strong>；③ <strong>徹底戒酒戒菸</strong>。
        </p>
      </Callout>
      <Callout kind="redflag" title="警惕「胰臟外分泌功能不全（PEI）」與早期胰臟癌警訊">
        <p>
          反覆發作演變為<strong>慢性胰臟炎</strong>後，胰臟萎縮鈣化會導致：① <strong>脂肪瀉（大便浮一層油滴、惡臭難沖、體重減輕）</strong>，需隨餐服用高單位胰酵素膠囊（Creon）；② <strong>胰源性糖尿病（Type 3c DM）</strong>。此外，若 <strong>50 歲以上無家族史卻突然新發生糖尿病（或原本穩定的血糖突然失控）合併不明原因消瘦、上腹背痛或無痛性黃疸</strong>，務必提高警覺安排增強型胰臟 CT/MRI 或內視鏡超音波（EUS）排除早期胰臟癌！
        </p>
      </Callout>
    </div>
  </div>
);

// ── 12. ENDOSCOPY_TRIAGE ─────────────────────────────────────────────────────
export const EndoscopyTriageChapter: React.FC = () => (
  <div className="space-y-6">
    <FigureFrame
      number="圖 12-1"
      title="布里斯托大便分類法（Bristol Stool Chart 1–7 型）視覺判讀圖譜"
      source="Rome IV Criteria；USMSTF Bowel Cleansing Guideline 2025"
      caption="每天沖馬桶前花 2 秒看一眼便型與顏色：第 3、4 型代表腸道蠕動與水分吸收最平衡；而做大腸鏡清腸時，最後排出的必須是「第 7 型清澈淡黃色水狀便（波士頓清腸量表 BBPS ≥ 6 分）」。"
    >
      <BristolStoolAndAbdominalGridFigure />
    </FigureFrame>

    <BowelPrepFoodChecker />

    <DataTable
      title="表 12-1　無痛大腸鏡「前 3 天低渣飲食 ＋ 分次清腸（Split-Dose）」黃金時間軸"
      source="US Multi-Society Task Force (USMSTF) 2025；台灣消化系內視鏡醫學會"
      columns={[
        { key: 'day', header: '時間階段', className: 'font-bold min-w-[140px]' },
        { key: 'title', header: '核心任務', className: 'font-bold text-emerald-700 dark:text-emerald-400 min-w-[150px]' },
        { key: 'eat', header: '✅ 怎麼吃／怎麼喝瀉藥' },
        { key: 'avoid', header: '⚠️ 禁忌地雷與特殊藥物叮嚀' },
      ]}
      rows={COLONOSCOPY_PREP_TIMELINE}
      rowKey={(_, idx) => String(idx)}
    />

    <DataTable
      title="表 12-2　布里斯托大便分類法（1–7 型）腸道停留時間與臨床意義"
      source="Heaton KW, et al. Bristol Stool Form Scale"
      columns={[
        { key: 'type', header: '便型', className: 'font-bold min-w-[85px]' },
        { key: 'shape', header: '外觀特徵' },
        { key: 'transit', header: '腸道通過時間' },
        {
          key: 'meaning',
          header: '臨床解讀',
          render: (r) => (
            <div className="flex flex-wrap items-center gap-2">
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full border text-[11px] font-semibold ${r.tone === 'good' ? 'bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950/50 dark:text-emerald-200 dark:border-emerald-800' : r.tone === 'warn' ? 'bg-amber-50 text-amber-900 border-amber-300 dark:bg-amber-950/50 dark:text-amber-200 dark:border-amber-800' : 'bg-slate-50 text-slate-700 border-slate-300 dark:bg-slate-800/60 dark:text-slate-300 dark:border-slate-700'}`}>{r.type}</span>
              <span>{r.meaning}</span>
            </div>
          ),
        },
      ]}
      rows={BRISTOL_STOOL_DATA}
      rowKey={(_, idx) => String(idx)}
    />

    <AbdominalPainTriageTool />
  </div>
);
