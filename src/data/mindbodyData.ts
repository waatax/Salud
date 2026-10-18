import type { MindbodyTab } from '../config/routes';
import type { CourseChapter, CourseQuiz, CourseSource } from '../components/common/pro/CourseShell';

export type { MindbodyTab };

/**
 * mindbodyData — 睡眠・呼吸・正念 身心修復專區 (v4.7).
 *
 * One course for the three levers a reader can pull on their own nervous system tonight:
 * sleep, breath (fast 卡帕拉巴提 vs slow 吐納) and attention (正念冥想).
 *
 * Content rules:
 *  - Every number names the study it came from (MB_SOURCES id), and the chapter lists it.
 *  - Traditional theory (六字訣臟腑對應、脈輪) is labelled as tradition, never as evidence.
 *  - Activating practices (卡帕拉巴提) and calming ones (慢呼吸、吐納) are never mixed up:
 *    the activating one is a morning practice with a contraindication gate.
 */

// ── Sources ────────────────────────────────────────────────────────────────

export const MB_SOURCES: Record<string, CourseSource> = {
  watson2015: {
    label: 'Watson NF, et al. Recommended amount of sleep for a healthy adult: AASM/SRS joint consensus. J Clin Sleep Med 2015;11(6):591–592.',
    url: 'https://jcsm.aasm.org/doi/10.5664/jcsm.4758',
  },
  windred2024: {
    label: 'Windred DP, et al. Sleep regularity is a stronger predictor of mortality risk than sleep duration. Sleep 2024;47(1):zsad253.',
    url: 'https://doi.org/10.1093/sleep/zsad253',
  },
  borbely2016: {
    label: 'Borbély AA, et al. The two-process model of sleep regulation: a reappraisal. J Sleep Res 2016;25(2):131–143.',
    url: 'https://onlinelibrary.wiley.com/doi/10.1111/jsr.12371',
  },
  xie2013: {
    label: 'Xie L, et al. Sleep drives metabolite clearance from the adult brain. Science 2013;342(6156):373–377.',
    url: 'https://www.science.org/doi/10.1126/science.1241224',
  },
  edinger2021: {
    label: 'Edinger JD, et al. Behavioral and psychological treatments for chronic insomnia disorder in adults: an AASM clinical practice guideline. J Clin Sleep Med 2021;17(2):255–262.',
    url: 'https://jcsm.aasm.org/doi/10.5664/jcsm.8986',
  },
  riemann2023: {
    label: 'Riemann D, et al. The European Insomnia Guideline 2023. J Sleep Res 2023;32(6):e14035.',
    url: 'https://onlinelibrary.wiley.com/doi/10.1111/jsr.14035',
  },
  qaseem2016: {
    label: 'Qaseem A, et al. Management of chronic insomnia disorder in adults: ACP clinical practice guideline. Ann Intern Med 2016;165(2):125–133.',
    url: 'https://www.acpjournals.org/doi/10.7326/M15-2175',
  },
  gardiner2023: {
    label: 'Gardiner C, et al. The effect of caffeine on subsequent sleep: a systematic review and meta-analysis. Sleep Med Rev 2023;69:101764.',
    url: 'https://doi.org/10.1016/j.smrv.2023.101764',
  },
  brown2022: {
    label: 'Brown TM, et al. Recommendations for daytime, evening, and nighttime indoor light exposure. PLoS Biol 2022;20(3):e3001571.',
    url: 'https://journals.plos.org/plosbiology/article?id=10.1371/journal.pbio.3001571',
  },
  haghayegh2019: {
    label: 'Haghayegh S, et al. Before-bedtime passive body heating by warm shower or bath to improve sleep: a systematic review and meta-analysis. Sleep Med Rev 2019;46:124–135.',
    url: 'https://doi.org/10.1016/j.smrv.2019.04.008',
  },
  stutz2019: {
    label: 'Stutz J, et al. Effects of evening exercise on sleep in healthy participants: a systematic review and meta-analysis. Sports Med 2019;49(2):269–287.',
    url: 'https://doi.org/10.1007/s40279-018-1015-0',
  },
  russo2017: {
    label: 'Russo MA, et al. The physiological effects of slow breathing in the healthy human. Breathe 2017;13(4):298–309.',
    url: 'https://breathe.ersjournals.com/content/13/4/298',
  },
  zaccaro2018: {
    label: 'Zaccaro A, et al. How breath-control can change your life: a systematic review on psycho-physiological correlates of slow breathing. Front Hum Neurosci 2018;12:353.',
    url: 'https://www.frontiersin.org/articles/10.3389/fnhum.2018.00353/full',
  },
  fincham2023: {
    label: 'Fincham GW, et al. Effect of breathwork on stress and mental health: a meta-analysis of randomised-controlled trials. Sci Rep 2023;13:432.',
    url: 'https://www.nature.com/articles/s41598-022-27247-y',
  },
  balban2023: {
    label: 'Balban MY, et al. Brief structured respiration practices enhance mood and reduce physiological arousal. Cell Rep Med 2023;4(1):100895.',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9873947/',
  },
  bernardi2001: {
    label: 'Bernardi L, et al. Effect of rosary prayer and yoga mantras on autonomic cardiovascular rhythms. BMJ 2001;323:1446–1449.',
    url: 'https://www.bmj.com/content/323/7327/1446',
  },
  tsai2015: {
    label: 'Tsai HJ, Kuo TBJ, Lee GS, Yang CCH. Efficacy of paced breathing for insomnia: enhances vagal activity and improves sleep quality. Psychophysiology 2015;52(3):388–396.',
    url: 'https://hub.tmu.edu.tw/en/publications/efficacy-of-paced-breathing-for-insomnia-enhances-vagal-activity-/',
  },
  raghuraj1998: {
    label: 'Raghuraj P, Telles S, et al. Effect of two selected yogic breathing techniques on heart rate variability. Indian J Physiol Pharmacol 1998;42(4):467–472.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Raghuraj+Telles+1998+heart+rate+variability+yogic+breathing',
  },
  telles2014: {
    label: 'Telles S, et al. 高頻瑜伽呼吸（Kapalabhati）對注意力與反應時間之系列研究（PubMed 檢索）.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/?term=telles+high+frequency+yoga+breathing',
  },
  johnson2004: {
    label: 'Case report. Kapalabhati pranayama: breath of fire or cause of pneumothorax? A case report. Chest 2004;125(5):1951–1952.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/?term=kapalabhati+pneumothorax',
  },
  liuzijue2021: {
    label: 'Effect of Liuzijue qigong on patients with stable COPD: a systematic review and meta-analysis（16 RCT、1,039 人）. Medicine 2021.',
    url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8519198/',
  },
  siu2021: {
    label: 'Siu PM, et al. Effects of tai chi or exercise on sleep in older adults with insomnia: a randomized clinical trial. JAMA Netw Open 2021;4(2):e2037199.',
    url: 'https://doi.org/10.1001/jamanetworkopen.2020.37199',
  },
  chqa: {
    label: '國家體育總局健身氣功管理中心《健身氣功・六字訣》標準功法；陶弘景《養性延命錄・服氣療病篇》（古籍）。',
    url: 'https://www.chqa.org.cn/',
  },
  goyal2014: {
    label: 'Goyal M, et al. Meditation programs for psychological stress and well-being: a systematic review and meta-analysis. JAMA Intern Med 2014;174(3):357–368.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Goyal+2014+meditation+programs+psychological+stress+meta-analysis',
  },
  hoge2023: {
    label: 'Hoge EA, et al. Mindfulness-based stress reduction vs escitalopram for the treatment of adults with anxiety disorders: a randomized clinical trial. JAMA Psychiatry 2023;80(1):13–21.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Hoge+MBSR+escitalopram+anxiety+JAMA+Psychiatry',
  },
  kuyken2016: {
    label: 'Kuyken W, et al. Efficacy of mindfulness-based cognitive therapy in prevention of depressive relapse: an individual patient data meta-analysis. JAMA Psychiatry 2016;73(6):565–574.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Kuyken+2016+MBCT+individual+patient+data+meta-analysis',
  },
  black2015: {
    label: 'Black DS, et al. Mindfulness meditation and improvement in sleep quality among older adults with sleep disturbances: a randomized clinical trial. JAMA Intern Med 2015;175(4):494–501.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Black+2015+mindfulness+meditation+sleep+quality+older+adults',
  },
  ong2014: {
    label: 'Ong JC, et al. A randomized controlled trial of mindfulness meditation for chronic insomnia (MBTI). Sleep 2014;37(9):1553–1563.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Ong+2014+mindfulness+meditation+chronic+insomnia+randomized',
  },
  killingsworth2010: {
    label: 'Killingsworth MA, Gilbert DT. A wandering mind is an unhappy mind. Science 2010;330(6006):932.',
    url: 'https://www.science.org/doi/10.1126/science.1192439',
  },
  britton2021: {
    label: 'Britton WB, et al. Defining and measuring meditation-related adverse effects in mindfulness-based programs. Clin Psychol Sci 2021;9(6):1185–1204.',
    url: 'https://journals.sagepub.com/doi/10.1177/2167702621996340',
  },
  tssm: {
    label: '台灣睡眠醫學學會 2019 年全國睡眠大調查（慢性失眠盛行率約 10.7%）。',
    url: 'https://www.tssm.org.tw/',
  },
  mohw1925: {
    label: '衛生福利部 1925 安心專線（依舊愛我）24 小時免付費心理諮詢。',
    url: 'https://dep.mohw.gov.tw/DOMHAOH/',
  },
};

// ── Chapters ───────────────────────────────────────────────────────────────

export type MindbodyChapter = CourseChapter<MindbodyTab>;

export const MINDBODY_CHAPTERS: MindbodyChapter[] = [
  {
    id: 'OVERVIEW',
    label_zh: '總覽：一條神經迴路',
    title_zh: '睡眠、呼吸、心：其實是同一條自律神經迴路',
    goal_zh: '看懂為什麼「睡不好 → 更焦慮 → 呼吸更淺 → 更睡不好」會惡性循環，以及從哪一個環節切入最省力。',
    learn_zh: ['交感（油門）與副交感（煞車）如何被睡眠、呼吸、注意力拉動', '三把鑰匙各自的證據強度與適用時段', '本專區 10 章的學習路線圖'],
    minutes: 6,
    takeaways_zh: [
      '睡眠、呼吸、情緒共用同一套自律神經系統；任何一環改善，另外兩環都會跟著被拉回來。',
      '呼吸是自律神經唯一「可以用意志直接控制」的開關，是最快的入口（幾分鐘）。',
      '慢呼吸與正念是「煞車」；卡帕拉巴提這類快速呼吸是「油門」，用錯時段會反效果。',
      '慢性失眠的第一線治療是 CBT-I（失眠認知行為治療），呼吸與正念是它的好搭檔，不是替代品。',
    ],
  },
  {
    id: 'SLEEP_SCIENCE',
    label_zh: '睡眠的科學',
    title_zh: '睡眠的科學：兩個歷程、四種睡眠、一夜五個週期',
    goal_zh: '用「睡意壓力」與「生理時鐘」兩條曲線解釋：為什麼熬夜後反而睡不著、為什麼補眠補不回來。',
    learn_zh: ['歷程 S（腺苷睡意壓力）與歷程 C（晝夜節律）', '一夜睡眠圖：深睡在前半夜、REM 在後半夜', '睡眠規律度為什麼比睡眠時數更能預測健康'],
    minutes: 8,
    takeaways_zh: [
      '睡意 = 清醒越久累積的腺苷壓力（S）＋ 生理時鐘打開的「睡眠閘門」（C）；兩者同時到位才睡得好。',
      '深睡（N3）集中在前兩個週期，REM 集中在清晨；晚睡或早起被砍掉的部分不一樣。',
      '成人每晚需要 7 小時以上（AASM/SRS 2015）；且每天固定時間起床比補眠更重要（Windred 2024）。',
      '午睡控制在 20–30 分鐘、下午 3 點前，才不會把晚上的睡意壓力用掉。',
    ],
  },
  {
    id: 'SLEEP_PLAN',
    label_zh: '睡好的 24 小時',
    title_zh: '睡好的 24 小時作息：從起床那一刻就開始準備今晚的睡眠',
    goal_zh: '把光、咖啡因、運動、晚餐、洗澡、螢幕安排在正確時間，並用個人化規劃器排出你的作息表。',
    learn_zh: ['晨光、晚間暗光的具體亮度目標', '咖啡因截止時間：一杯咖啡至少睡前 8.8 小時', '溫水澡、運動與晚餐的最佳時機', 'CBT-I 兩大核心：刺激控制與睡眠限制'],
    minutes: 10,
    takeaways_zh: [
      '起床後 1 小時內曬到戶外光，睡前 3 小時把燈調暗；光是生理時鐘最強的校正訊號（Brown 2022）。',
      '一杯咖啡（約 107 mg）至少在睡前 8.8 小時喝完，否則平均少睡約 45 分鐘（Gardiner 2023）。',
      '睡前 1–2 小時洗 40–42.5°C 溫水澡 10 分鐘以上，可縮短入睡時間（Haghayegh 2019）。',
      '床只用來睡覺：躺 20 分鐘睡不著就起來，想睡再回床，這是 CBT-I 最有力的一招。',
    ],
  },
  {
    id: 'BREATH_SCIENCE',
    label_zh: '呼吸生理',
    title_zh: '呼吸生理：為什麼「吐氣」能踩自律神經的煞車？',
    goal_zh: '理解呼吸頻率、吐吸比、鼻呼吸與二氧化碳如何改變心跳與情緒，分辨哪些呼吸法是油門、哪些是煞車。',
    learn_zh: ['呼吸性竇性心律不整（吸氣心跳加快、吐氣變慢）', '每分鐘 6 次的「共振呼吸」與心率變異度', '過度換氣與二氧化碳：為什麼焦慮時大口深呼吸反而更暈', '呼吸頻率光譜：從吐納到卡帕拉巴提'],
    minutes: 8,
    takeaways_zh: [
      '吸氣時迷走神經暫時放手、心跳加快；吐氣時迷走神經踩煞車、心跳變慢——所以「吐比吸長」會讓人平靜。',
      '每分鐘約 6 次（0.1 Hz）的慢呼吸會讓心跳與血壓波動同步共振，心率變異度明顯變大（Russo 2017）。',
      '呼吸法統合分析：對自評壓力有小到中度效果（g = −0.35，Fincham 2023）；以慢呼吸研究為主。',
      '呼吸用鼻子、用橫膈，量要「輕」不要「大」；大口用力吸反而容易過度換氣、手麻頭暈。',
    ],
  },
  {
    id: 'KAPALABHATI',
    label_zh: '卡帕拉巴提',
    title_zh: '卡帕拉巴提呼吸法（Kapalabhati，頭顱清明調息／火呼吸）：步驟、科學與禁忌',
    goal_zh: '學會安全的入門版卡帕拉巴提：主動短促吐氣、被動吸氣；知道它是「提神油門」、適合早上，以及誰絕對不能做。',
    learn_zh: ['動作原理：腹肌快速內收把氣「推」出鼻子，吸氣自然回彈', '入門劑量：每秒 1 下 × 20–30 下，休息 30 秒，共 3 輪', '研究發現：交感神經上升、警覺與反應速度提高', '禁忌清單與「頭暈就停」原則'],
    minutes: 9,
    takeaways_zh: [
      '卡帕拉巴提是「主動吐、被動吸」的快速腹式呼吸，每分鐘 60–120 下，屬於激發型（交感神經上升，Raghuraj 1998）。',
      '它適合早上或午後提神，不適合睡前；想助眠請改用本專區的慢呼吸與吐納。',
      '入門：坐直、每秒 1 下、20–30 下一輪、輪間休息 30 秒以上，共 3 輪；頭暈、手麻、胸悶立刻停。',
      '懷孕、未控制高血壓、心臟病、癲癇、疝氣或近期腹部／胸部手術、青光眼、曾氣胸、恐慌症者不要練。',
      '研究多為小樣本（證據等級 C）；曾有健康年輕人練習後發生氣胸的個案報告（Chest 2004）。',
    ],
  },
  {
    id: 'TUNA',
    label_zh: '吐納與六字訣',
    title_zh: '吐納：細、勻、深、長的東方慢呼吸，與健身氣功六字訣',
    goal_zh: '把「吐故納新」的傳統功法轉成可練習的步驟，並分清楚哪些是古籍理論、哪些有現代研究支持。',
    learn_zh: ['吐納四字訣：細、勻、深、長', '腹式順呼吸與逆呼吸的差別', '六字訣「噓、呵、呼、呬、吹、嘻」的口型與吐氣', '現代研究：慢呼吸生理、COPD 肺復健、太極氣功與睡眠'],
    minutes: 9,
    takeaways_zh: [
      '吐納的核心是把呼吸練到細、勻、深、長，吐氣比吸氣長；頻率自然落在每分鐘 4–6 次，與現代「共振呼吸」重疊。',
      '六字訣是發聲（或默念）延長吐氣的方法；臟腑對應屬傳統理論，延長吐氣的放鬆效果才是有生理依據的部分。',
      '六字訣在 COPD 病人：16 篇 RCT 統合顯示肺功能與 6 分鐘步行距離小幅改善（證據品質低到中）。',
      '太極與傳統運動改善長者失眠的效果與一般運動相當（Siu 2021），重點是「規律做」。',
      '初學者用順腹式呼吸即可；不要憋氣、不要追求「胎息」般極慢呼吸，舒服最重要。',
    ],
  },
  {
    id: 'MINDFULNESS',
    label_zh: '正念冥想',
    title_zh: '正念冥想：訓練注意力的「回來」肌肉',
    goal_zh: '理解正念不是「放空」，而是一次次發現走神、溫和帶回；學會呼吸覺察、身體掃描、STOP 三分鐘練習。',
    learn_zh: ['注意力循環：專注 → 走神 → 覺察 → 回來', 'MBSR／MBCT 的證據：焦慮、憂鬱復發、睡眠', '四種入門練習與劑量', '冥想也可能有副作用：如何辨識與調整'],
    minutes: 10,
    takeaways_zh: [
      '人醒著約 47% 的時間在走神（Killingsworth 2010）；正念練的不是不走神，而是「發現走神 → 帶回來」的次數。',
      '冥想課程對焦慮、憂鬱、疼痛有中等效果（ES 0.3–0.38，Goyal 2014）；8 週 MBSR 治療焦慮症不劣於 escitalopram（Hoge 2023）。',
      'MBCT 讓憂鬱症復發風險降低約 31%（HR 0.69，Kuyken 2016）。',
      '6 週正念課程改善長者睡眠品質優於睡眠衛生衛教（Black 2015）。',
      '少數人在冥想中出現焦慮、創傷畫面重現或解離；睜眼、縮短時間、改動態練習，持續不適請找專業人員。',
    ],
  },
  {
    id: 'BEDTIME',
    label_zh: '睡前整合處方',
    title_zh: '睡前 30 分鐘整合處方 ＋ 半夜醒來怎麼辦',
    goal_zh: '把呼吸、吐納、正念串成一套睡前流程，並在半夜醒來時有一份不會越想越清醒的決策圖。',
    learn_zh: ['睡前 30 分鐘：降光、放下手機、延長吐氣、身體掃描', '研究：睡前 20 分鐘每分鐘 6 次慢呼吸改善失眠者入睡（台灣研究）', '半夜醒來決策圖', '「煩惱時段」與待辦清單：把腦中的事先下載'],
    minutes: 8,
    takeaways_zh: [
      '睡前流程固定順序比內容更重要：大腦會把這串動作學成「準備睡覺」的訊號。',
      '台灣研究：失眠者睡前做 20 分鐘每分鐘 6 次的慢呼吸，入睡更快、半夜醒來更少（Tsai 2015，小型研究）。',
      '半夜醒來不要看時間、不要滑手機；先做 10 次延長吐氣，20 分鐘仍清醒就離床做無聊的事。',
      '傍晚先寫下「煩惱 + 下一步」，把需要想的事留在紙上，不要帶上床。',
    ],
  },
  {
    id: 'CAPD_PLAN',
    label_zh: 'CAP-D 四週計畫',
    title_zh: 'CAP-D 自我迭代：用睡眠日記，四週把作息調到最適合你',
    goal_zh: '用「檢查 → 調整 → 規劃 → 執行」的循環，每週根據睡眠效率調整上床時間，並逐週加入呼吸與正念練習。',
    learn_zh: ['CAP-D：先看數據（Check）再改（Act），計畫（Plan）後執行（Do）', '睡眠效率 = 實際睡著時間 ÷ 躺床時間', '每週調整規則：≥ 90% 提早 15 分鐘上床；< 85% 延後 15 分鐘', '四週練習進度表'],
    minutes: 8,
    takeaways_zh: [
      'CAP-D 從 Check 開始：先記一週睡眠日記，再決定改什麼，避免憑感覺亂調。',
      '睡眠效率 ≥ 90% 可提早 15 分鐘上床；85–90% 維持；< 85% 延後 15 分鐘（但躺床不少於 5 小時）。',
      '每週只改一件事，才知道是什麼有效。',
      '睡眠限制會讓頭幾週白天更睏：不要開車疲勞駕駛；有躁鬱症、癲癇、需高度警覺的工作者，請在醫師指導下做。',
    ],
  },
  {
    id: 'SAFETY',
    label_zh: '安全與就醫',
    title_zh: '安全與就醫：哪些睡不好需要醫師？哪些練習你不適合？',
    goal_zh: '辨識需要就醫的睡眠問題（睡眠呼吸中止、慢性失眠、憂鬱）與各種呼吸／冥想練習的禁忌。',
    learn_zh: ['睡眠紅綠燈：自己調整 / 看門診 / 立刻求助', '練習 × 身體狀況禁忌矩陣', '安眠藥與褪黑激素的正確定位', '1925 安心專線與緊急求助'],
    minutes: 7,
    takeaways_zh: [
      '打鼾很大聲、被看到呼吸暫停、白天嚴重嗜睡：先排除睡眠呼吸中止症，呼吸法不能治療它。',
      '每週 3 晚以上睡不好、持續 3 個月以上、影響白天功能 = 慢性失眠，可到身心科、睡眠中心求診 CBT-I。',
      '情緒低落、失去興趣超過 2 週，或有傷害自己的念頭：撥 1925（24 小時免付費），緊急時撥 119 或 110。',
      '快速呼吸（卡帕拉巴提、過度換氣型呼吸）禁忌最多；慢呼吸與吐納最安全；正念對創傷與精神病史者需專業帶領。',
    ],
  },
];

// ── Ch1 Overview ───────────────────────────────────────────────────────────

export const MB_KEY_NUMBERS = [
  { value: '10.7', unit: '%', label: '台灣成人慢性失眠盛行率（台灣睡眠醫學學會 2019）' },
  { value: '7+', unit: '小時', label: '成人每晚建議睡眠時數（AASM/SRS 2015）' },
  { value: '6', unit: '次／分', label: '共振慢呼吸頻率，心率變異度最大' },
  { value: '47', unit: '%', label: '清醒時間花在走神（Science 2010）' },
];

export interface ThreeKey {
  key: string;
  lever: string;
  speed: string;
  best_time: string;
  evidence: 'A' | 'B' | 'C';
  first_step: string;
}

export const THREE_KEYS: ThreeKey[] = [
  { key: '睡眠（CBT-I 與作息）', lever: '重設生理時鐘、累積睡意壓力', speed: '2–6 週見效', best_time: '全天（起床時間最關鍵）', evidence: 'A', first_step: '明天起固定起床時間，起床 1 小時內曬光 10 分鐘' },
  { key: '慢呼吸／吐納', lever: '延長吐氣 → 迷走神經煞車', speed: '1–5 分鐘', best_time: '睡前、緊張時、半夜醒來', evidence: 'B', first_step: '吸 4 秒、吐 6 秒，做 5 分鐘' },
  { key: '卡帕拉巴提（快呼吸）', lever: '快速腹肌吐氣 → 交感上升、提神', speed: '1–3 分鐘', best_time: '早上、午後低潮（不要睡前）', evidence: 'C', first_step: '確認無禁忌後，每秒 1 下 × 20 下 × 3 輪' },
  { key: '正念冥想', lever: '訓練注意力與情緒調節，減少反芻', speed: '數週累積', best_time: '固定時段，每天 10 分鐘', evidence: 'A', first_step: '今天做一次 3 分鐘呼吸空間練習' },
];

// ── Ch2 Sleep science ──────────────────────────────────────────────────────

export const SLEEP_STAGES_MB = [
  { stage: 'N1 入睡期', pct: '約 5%', brain: '從清醒的 α 波轉為 θ 波', job: '清醒與睡眠的過渡；最容易被吵醒', tone: 'neutral' as const },
  { stage: 'N2 淺睡期', pct: '約 45–55%', brain: '睡眠紡錘波、K 複合波', job: '鞏固動作技能與記憶；阻擋外界聲音', tone: 'neutral' as const },
  { stage: 'N3 深睡期', pct: '約 15–25%', brain: '高振幅慢 δ 波', job: '生長激素分泌、組織修復、大腦清除代謝廢物', tone: 'good' as const },
  { stage: 'REM 快速動眼期', pct: '約 20–25%', brain: '類似清醒的快波，肌肉放鬆癱軟', job: '情緒處理、創意聯想；酒精會明顯壓抑', tone: 'good' as const },
];

export const SLEEP_NEED_BY_AGE = [
  { age: '學齡兒童 6–12 歲', hours: '9–12 小時', note: 'AASM 2016 兒科共識' },
  { age: '青少年 13–18 歲', hours: '8–10 小時', note: '生理時鐘自然往後移，早上課易睡眠不足' },
  { age: '成人 18–64 歲', hours: '7 小時以上（多數 7–9）', note: 'AASM/SRS 2015；少於 6 小時與多種疾病風險上升相關' },
  { age: '長者 65 歲以上', hours: '7–8 小時', note: '深睡比例下降、較早睡早起是正常變化' },
];

// ── Ch3 24-hour plan ───────────────────────────────────────────────────────

export interface ScheduleAnchor {
  id: string;
  label: string;
  /** Minutes relative to wake (positive) or bedtime (negative). */
  from: 'wake' | 'bed';
  offset: number;
  detail: string;
  source: string;
  kind: 'light' | 'eat' | 'move' | 'calm' | 'sleep';
}

export const SCHEDULE_ANCHORS: ScheduleAnchor[] = [
  { id: 'wake', label: '固定起床', from: 'wake', offset: 0, detail: '週末差距 1 小時內；先固定起床，上床時間會跟著穩定', source: 'Windred 2024', kind: 'sleep' },
  { id: 'light', label: '戶外晨光 10–30 分鐘', from: 'wake', offset: 30, detail: '陰天戶外也有數千勒克斯，遠高於室內；白天室內盡量 ≥ 250 lux', source: 'Brown 2022', kind: 'light' },
  { id: 'caffeine', label: '最後一杯咖啡', from: 'bed', offset: -9 * 60, detail: '一杯咖啡約 107 mg 需睡前 8.8 小時以上；運動補給品（約 218 mg）需 13 小時', source: 'Gardiner 2023', kind: 'eat' },
  { id: 'nap', label: '午睡截止', from: 'wake', offset: 8 * 60, detail: '午睡 20–30 分鐘、不要晚於起床後約 8 小時（多數人下午 3 點前）', source: '歐洲失眠指引 2023', kind: 'sleep' },
  { id: 'exercise', label: '中高強度運動結束', from: 'bed', offset: -2 * 60, detail: '傍晚運動不會傷睡眠；高強度在睡前 1 小時內結束可能延後入睡', source: 'Stutz 2019', kind: 'move' },
  { id: 'dinner', label: '晚餐吃完、停酒', from: 'bed', offset: -3 * 60, detail: '避免飽食平躺與逆流；酒精讓後半夜破碎、壓抑 REM', source: '歐洲失眠指引 2023', kind: 'eat' },
  { id: 'dim', label: '調暗燈光', from: 'bed', offset: -3 * 60, detail: '睡前 3 小時室內光盡量 ≤ 10 lux（melanopic EDI），改用暖色低位燈', source: 'Brown 2022', kind: 'light' },
  { id: 'worry', label: '寫下煩惱與明日待辦', from: 'bed', offset: -2 * 60, detail: '10 分鐘把擔心的事寫成「問題 → 下一步」，留在紙上', source: 'CBT-I 認知技巧', kind: 'calm' },
  { id: 'bath', label: '溫水澡 10 分鐘以上', from: 'bed', offset: -90, detail: '40–42.5°C、睡前 1–2 小時；洗完體溫下降的過程幫助入睡', source: 'Haghayegh 2019', kind: 'calm' },
  { id: 'screens', label: '手機離床、睡前流程', from: 'bed', offset: -30, detail: '慢呼吸 5 分鐘 → 身體掃描 10 分鐘 → 熄燈', source: 'Tsai 2015；Black 2015', kind: 'calm' },
  { id: 'bed', label: '上床（想睡才上床）', from: 'bed', offset: 0, detail: '躺 20 分鐘仍清醒就離床，想睡再回來', source: 'AASM 2021 CBT-I', kind: 'sleep' },
];

export const CBTI_COMPONENTS = [
  { part: '刺激控制', what: '床只用來睡覺（與親密）；想睡才上床；躺約 20 分鐘睡不著就離床；每天固定起床；白天不補眠', grade: 'A' as const, note: 'AASM 2021 強烈建議的單一成分' },
  { part: '睡眠限制', what: '先把躺床時間縮到接近實際睡著時間（不少於 5 小時），睡眠效率提高後每週加 15 分鐘', grade: 'A' as const, note: '頭幾週白天會更睏，避免疲勞駕駛' },
  { part: '認知重建', what: '辨識「今晚一定又睡不著」「少睡一晚明天就完了」等災難化想法，換成較平衡的說法', grade: 'B' as const, note: 'CBT-I 多成分治療的一部分' },
  { part: '放鬆訓練', what: '漸進式肌肉放鬆、慢呼吸、身體掃描、意象引導', grade: 'B' as const, note: 'AASM 2021 有條件建議' },
  { part: '睡眠衛生', what: '咖啡因、酒精、光線、運動、臥室環境的調整', grade: 'C' as const, note: '單獨使用效果不足，需搭配其他成分' },
];

// ── Ch4 Breath science ─────────────────────────────────────────────────────

export const BREATH_SPECTRUM = [
  { name: '吐納・胎息式慢呼吸', rate: 4, effect: 'calm' as const, note: '每分鐘 3–5 次，進階' },
  { name: '共振呼吸 / 六字訣', rate: 6, effect: 'calm' as const, note: '每分鐘約 6 次（吸 4 吐 6）' },
  { name: '4-7-8 呼吸', rate: 3.2, effect: 'calm' as const, note: '含 7 秒停頓；約每分鐘 3 次' },
  { name: '平常靜息呼吸', rate: 14, effect: 'neutral' as const, note: '成人每分鐘 12–20 次' },
  { name: '焦慮時過度換氣', rate: 24, effect: 'alert' as const, note: '淺快、胸式、CO₂ 下降' },
  { name: '卡帕拉巴提（入門）', rate: 60, effect: 'alert' as const, note: '每秒 1 下' },
  { name: '卡帕拉巴提（熟練）', rate: 120, effect: 'alert' as const, note: '每秒 2 下，僅限有經驗者' },
];

export const BREATH_METHODS = [
  { method: '延長吐氣（吸 4 吐 6）', pattern: '吸 4 秒 → 吐 6 秒', rate: '6 次／分', effect: '平靜（副交感）', best: '任何時候、睡前', evidence: 'B' as const },
  { method: '生理嘆息（Cyclic sighing）', pattern: '鼻吸 → 再補吸一小口 → 嘴巴慢慢長吐', rate: '依個人', effect: '平靜、改善情緒', best: '壓力當下 1–5 分鐘', evidence: 'B' as const },
  { method: '箱式呼吸', pattern: '吸 4 → 停 4 → 吐 4 → 停 4', rate: '約 4 次／分', effect: '平靜、專注', best: '上台、考試前', evidence: 'C' as const },
  { method: '4-7-8 呼吸', pattern: '吸 4 → 停 7 → 吐 8', rate: '約 3 次／分', effect: '平靜', best: '睡前（憋氣不舒服可省略停頓）', evidence: 'C' as const },
  { method: '吐納／六字訣', pattern: '細勻深長，吐氣發「噓、呵、呼…」', rate: '4–6 次／分', effect: '平靜', best: '早晚練功、睡前', evidence: 'B' as const },
  { method: '卡帕拉巴提', pattern: '主動短促吐氣、被動吸氣', rate: '60–120 次／分', effect: '激發（交感）', best: '早上、提神（勿睡前）', evidence: 'C' as const },
];

// ── Ch5 Kapalabhati ────────────────────────────────────────────────────────

export const KAPALA_STEPS = [
  { n: 1, title: '坐直、放鬆肩膀', how: '盤坐或坐椅子前半，脊椎立直，雙手放膝上；空腹或飯後 2 小時以上。' },
  { n: 2, title: '先做 2 次自然深呼吸', how: '用鼻子吸到七八分滿，慢慢吐掉，讓身體進入狀態。' },
  { n: 3, title: '腹部快速內收、鼻子噴氣', how: '下腹（肚臍下方）像被輕拍一樣快速往內收，把氣從鼻子短促「哼」出去，約 0.3 秒。' },
  { n: 4, title: '放鬆腹部，讓吸氣自然回彈', how: '不要主動用力吸；腹肌一放，空氣自己會回來。胸口與肩膀保持不動。' },
  { n: 5, title: '每秒 1 下，連續 20–30 下', how: '入門速度每秒 1 下即可，不求快；做完一輪後恢復正常呼吸。' },
  { n: 6, title: '休息 30–60 秒，共 3 輪', how: '輪與輪之間自然呼吸、觀察身體；頭暈、手麻、胸悶、心悸立刻停止並恢復正常呼吸。' },
];

export const KAPALA_PROGRESSION = [
  { week: '第 1 週', dose: '每秒 1 下 × 20 下 × 3 輪', rest: '輪間休息 60 秒', check: '完全沒有頭暈、胸悶' },
  { week: '第 2 週', dose: '每秒 1 下 × 30 下 × 3 輪', rest: '輪間休息 45 秒', check: '腹部有力、肩膀不聳' },
  { week: '第 3–4 週', dose: '每秒 1.5 下 × 40 下 × 3 輪', rest: '輪間休息 30–45 秒', check: '練完精神好，而非緊張心悸' },
  { week: '之後（選擇性）', dose: '每秒 2 下 × 60 下以內 × 3 輪', rest: '輪間休息 30 秒以上', check: '最好有合格老師指導；不需要追求更快更久' },
];

export const KAPALA_EVIDENCE = [
  { finding: '心率變異度轉向交感主導（LF/HF 上升）', study: 'Raghuraj 1998（健康成人，小型交叉研究）', grade: 'C' as const },
  { finding: '練習後選擇反應時間、注意力測驗表現較好', study: 'Telles 團隊系列研究（小型、多為瑜伽練習者）', grade: 'C' as const },
  { finding: '快速呼吸類（含循環過度換氣）短期提升正向情緒，但不如延長吐氣的生理嘆息', study: 'Balban 2023（RCT，108 人，5 分鐘／天 × 28 天）', grade: 'B' as const },
  { finding: '呼吸法整體降低自評壓力，但快速呼吸的研究很少（多數為慢呼吸）', study: 'Fincham 2023（12 RCT 統合）', grade: 'B' as const },
  { finding: '健康 29 歲女性練習後發生自發性氣胸', study: 'Chest 2004 個案報告', grade: 'C' as const },
];

export const KAPALA_CONTRA = [
  { who: '懷孕、生理期大量出血', why: '腹壓快速反覆升高', level: 'bad' as const },
  { who: '未控制的高血壓、心臟病、曾中風', why: '交感神經與血壓上升', level: 'bad' as const },
  { who: '癲癇', why: '過度換氣可能誘發發作', level: 'bad' as const },
  { who: '疝氣、近 3 個月腹部／胸部／眼部手術', why: '腹壓與胸壓反覆衝擊', level: 'bad' as const },
  { who: '曾發生氣胸、肺大泡、嚴重 COPD 或氣喘發作期', why: '肺部壓力變化，個案曾報告氣胸', level: 'bad' as const },
  { who: '青光眼、視網膜剝離病史', why: '用力時眼壓可能升高', level: 'bad' as const },
  { who: '恐慌症、焦慮發作期', why: '快速呼吸的身體感覺可能誘發恐慌', level: 'warn' as const },
  { who: '胃食道逆流、剛吃飽', why: '腹壓推擠胃部', level: 'warn' as const },
  { who: '睡前 2 小時內', why: '激發交感神經，延後入睡', level: 'warn' as const },
];

// ── Ch6 吐納 ───────────────────────────────────────────────────────────────

export interface LiuZiJue {
  sound: string;
  pinyin: string;
  mouth: string;
  organ: string;
  element: string;
  modern: string;
}

export const LIU_ZI_JUE: LiuZiJue[] = [
  { sound: '噓', pinyin: 'xū', mouth: '嘴角後拉、上下齒間留縫，氣從齒縫與舌兩側吐出', organ: '肝', element: '木・春', modern: '細長吐氣，最容易延長吐氣時間' },
  { sound: '呵', pinyin: 'hē', mouth: '舌頂下齒、嘴半張，氣從舌面與上顎間吐出', organ: '心', element: '火・夏', modern: '溫和的開口長吐氣' },
  { sound: '呼', pinyin: 'hū', mouth: '嘴唇撮圓、舌放平，氣從喉嚨經口中央吐出', organ: '脾', element: '土・長夏', modern: '腹部自然內收，有助橫膈上提' },
  { sound: '呬', pinyin: 'sī', mouth: '上下門牙對齊留縫、舌尖輕抵齒背，氣從齒縫吐出', organ: '肺', element: '金・秋', modern: '齒縫阻力讓吐氣變慢，類似「縮唇呼吸」' },
  { sound: '吹', pinyin: 'chuī', mouth: '嘴角後引、舌尖微上翹，氣從舌兩側與唇間吐出', organ: '腎', element: '水・冬', modern: '帶輕微阻力的長吐氣' },
  { sound: '嘻', pinyin: 'xī', mouth: '嘴角略向後上提、上下齒輕合，氣從齒間吐出', organ: '三焦', element: '少陽', modern: '收功時放鬆面部與全身' },
];

export const TUNA_FOUR = [
  { word: '細', meaning: '氣流細到在鼻前放一根羽毛也幾乎不動', modern: '降低通氣量、避免過度換氣' },
  { word: '勻', meaning: '吸與吐的速度均勻，不忽快忽慢、不卡頓', modern: '穩定的呼吸節律讓心跳波動規律' },
  { word: '深', meaning: '氣沉丹田：吸氣時下腹自然鼓起', modern: '以橫膈為主的腹式呼吸' },
  { word: '長', meaning: '每一口氣的時間逐漸拉長，吐比吸長', modern: '頻率降到每分鐘 4–6 次，接近共振呼吸' },
];

export const TUNA_TYPES = [
  { type: '自然呼吸', how: '不刻意控制，只是觀察', for_: '所有人入門；正念呼吸覺察', caution: '無' },
  { type: '順腹式呼吸', how: '吸氣腹部鼓起、吐氣腹部內收', for_: '初學吐納、睡前、焦慮時', caution: '無；最推薦的基本功' },
  { type: '逆腹式呼吸', how: '吸氣腹部內收、吐氣腹部鼓起', for_: '有經驗的氣功／武術練習者', caution: '初學易憋氣、胸悶；高血壓、懷孕不建議' },
  { type: '停閉呼吸（閉氣）', how: '吸或吐後短暫停頓', for_: '進階；4-7-8、箱式呼吸', caution: '不舒服就縮短；心肺疾病、懷孕避免長時間閉氣' },
];

export const TUNA_EVIDENCE = [
  { finding: '唸誦玫瑰經與瑜伽咒語讓呼吸自然降到每分鐘約 6 次，心血管節律同步、壓力反射敏感度上升', study: 'Bernardi, BMJ 2001', grade: 'B' as const },
  { finding: '六字訣改善穩定期 COPD 病人肺功能與 6 分鐘步行距離（約 +22 公尺）', study: '16 RCT、1,039 人統合分析（2021）', grade: 'B' as const },
  { finding: '太極與一般運動改善長者慢性失眠的效果相當，且效果維持 24 個月', study: 'Siu, JAMA Netw Open 2021（RCT，320 人）', grade: 'B' as const },
  { finding: '慢呼吸（≤ 10 次／分）提升心率變異度、α 腦波，降低焦慮與憤怒', study: 'Zaccaro 2018 系統性回顧', grade: 'B' as const },
  { finding: '六字訣與臟腑、五行的對應', study: '陶弘景《養性延命錄》等古籍傳統理論', grade: 'C' as const },
];

// ── Ch7 Mindfulness ────────────────────────────────────────────────────────

export const MINDFUL_PRACTICES = [
  { name: '呼吸覺察', dose: '每天 5–10 分鐘', how: '把注意力放在鼻孔或腹部的呼吸感覺；發現走神，標記「想法」，回到呼吸。', for_: '入門、專注力' },
  { name: '身體掃描', dose: '10–20 分鐘，可躺著', how: '從腳趾到頭頂，依序把注意力停在每個部位 20–30 秒，只觀察、不改變。', for_: '睡前、慢性疼痛、身體緊繃' },
  { name: 'STOP 一分鐘', dose: '一天 3 次，各 1 分鐘', how: 'Stop 停下 → Take a breath 呼吸 → Observe 觀察身體情緒想法 → Proceed 再繼續。', for_: '工作中、情緒上來時' },
  { name: '三分鐘呼吸空間', dose: '3 分鐘', how: '第 1 分鐘：覺察此刻的想法感受；第 2 分鐘：只專注呼吸；第 3 分鐘：擴展到全身。', for_: 'MBCT 核心練習、壓力當下' },
  { name: '慈心練習', dose: '5–10 分鐘', how: '默念「願我平安、願我健康、願我自在」，再依序送給親友、陌生人、困難的人。', for_: '自我批評、人際壓力' },
  { name: '正念行走', dose: '10 分鐘', how: '放慢速度，感受腳跟、腳掌、腳趾依序著地；走神就回到腳底。', for_: '坐不住、焦躁、想動的人' },
];

export const MINDFUL_EVIDENCE = [
  { outcome: '焦慮（8 週）', es: 0.38, lo: 0.12, hi: 0.64, study: 'Goyal 2014' },
  { outcome: '憂鬱（8 週）', es: 0.3, lo: 0.0, hi: 0.59, study: 'Goyal 2014' },
  { outcome: '疼痛', es: 0.33, lo: 0.03, hi: 0.62, study: 'Goyal 2014' },
  { outcome: '自評壓力（呼吸法）', es: 0.35, lo: 0.14, hi: 0.55, study: 'Fincham 2023' },
];

export const MINDFUL_TRIALS = [
  { trial: 'MBSR vs escitalopram（焦慮症）', who: '276 位焦慮症成人', result: '8 週後焦慮改善程度相當（不劣性成立）；藥物組副作用較多', source: 'Hoge, JAMA Psychiatry 2023', grade: 'A' as const },
  { trial: 'MBCT 預防憂鬱復發', who: '9 個 RCT、1,258 人個別資料', result: '60 週內復發風險降低 31%（HR 0.69）', source: 'Kuyken, JAMA Psychiatry 2016', grade: 'A' as const },
  { trial: '正念課程 vs 睡眠衛生（長者）', who: '49 位中度睡眠障礙長者', result: '6 週後睡眠品質（PSQI）改善較多，憂鬱、疲勞也下降', source: 'Black, JAMA Intern Med 2015', grade: 'B' as const },
  { trial: '正念失眠治療（MBTI）', who: '54 位慢性失眠成人', result: '失眠嚴重度與睡前高喚起下降，效果維持 6 個月', source: 'Ong, Sleep 2014', grade: 'B' as const },
];

export const MEDITATION_ADVERSE = [
  { sign: '焦慮、心悸變多', adjust: '縮短到 3–5 分鐘、睜眼、改把注意力放在腳底或聲音而非呼吸' },
  { sign: '創傷畫面或回憶湧現', adjust: '停止、睜眼看四周說出 5 樣看到的東西；改動態練習；找受過創傷知情訓練的老師或治療師' },
  { sign: '解離、不真實感', adjust: '停止靜坐，改正念行走或伸展；持續出現請就醫' },
  { sign: '失眠反而變嚴重（長時間密集靜修後）', adjust: '減少練習時數、避免睡前長時間靜坐、恢復規律作息' },
];

// ── Ch8 Bedtime ────────────────────────────────────────────────────────────

export const WIND_DOWN = [
  { t: '−30 分', step: '手機充電放到床外 2 公尺', detail: '設定鬧鐘後就不再拿起；改用紙本書或輕音樂' },
  { t: '−25 分', step: '燈光調到最暗的暖色', detail: '只留低位小夜燈；浴室與走廊也一樣' },
  { t: '−20 分', step: '延長吐氣 5 分鐘', detail: '吸 4 秒、吐 6 秒，或六字訣「噓」字默念吐氣' },
  { t: '−15 分', step: '躺下做身體掃描 10 分鐘', detail: '從腳趾到頭頂；掃到一半睡著是好事' },
  { t: '0 分', step: '熄燈；還清醒也沒關係', detail: '不看時鐘；20 分鐘仍清醒就照「半夜醒來決策圖」' },
];

// ── Ch9 CAP-D ──────────────────────────────────────────────────────────────

export const CAPD_STEPS = [
  { step: 'C', name: 'Check 檢查', what: '看過去 7 天睡眠日記：平均躺床時間、實際睡著時間、睡眠效率、白天精神（0–10）', color: 'sky' },
  { step: 'A', name: 'Act 調整', what: '依規則調整上床時間；挑出一個最大的干擾（咖啡、手機、晚餐太晚…）', color: 'amber' },
  { step: 'P', name: 'Plan 規劃', what: '寫下下週的固定起床時間、上床時間與要新增的一個練習', color: 'violet' },
  { step: 'D', name: 'Do 執行', what: '照計畫做 7 天，每天早上 1 分鐘填日記；然後回到 Check', color: 'emerald' },
];

export const FOUR_WEEK_PLAN = [
  { week: '第 1 週', focus: 'Check：只記錄不改變', sleep: '每天早上填睡眠日記；固定起床時間', breath: '每天任一時間吸 4 吐 6，5 分鐘', mind: 'STOP 一分鐘 × 每天 1 次' },
  { week: '第 2 週', focus: '設定睡眠窗口', sleep: '依第 1 週平均睡著時間設定躺床時間（≥ 5 小時）', breath: '睡前延長吐氣 5 分鐘', mind: '身體掃描 10 分鐘（睡前）' },
  { week: '第 3 週', focus: '加入吐納與晨間提神', sleep: '依睡眠效率調整 ±15 分鐘', breath: '早上吐納或六字訣 10 分鐘；無禁忌者可試卡帕拉巴提入門', mind: '呼吸覺察 10 分鐘' },
  { week: '第 4 週', focus: '鞏固、找出你的組合', sleep: '再依效率調整；週末起床差距 ≤ 1 小時', breath: '挑出最喜歡的一種，固定時段', mind: '三分鐘呼吸空間 × 壓力當下' },
];

// ── Ch10 Safety ────────────────────────────────────────────────────────────

export type MatrixLevel = 'ok' | 'caution' | 'avoid';

export const PRACTICE_COLUMNS = ['慢呼吸／吐納', '閉氣（4-7-8、箱式）', '卡帕拉巴提', '正念冥想'] as const;

export const SAFETY_MATRIX: { condition: string; levels: [MatrixLevel, MatrixLevel, MatrixLevel, MatrixLevel]; note: string }[] = [
  { condition: '懷孕', levels: ['ok', 'caution', 'avoid', 'ok'], note: '不要長時間閉氣；快速腹壓呼吸避免' },
  { condition: '高血壓（未控制）', levels: ['ok', 'caution', 'avoid', 'ok'], note: '慢呼吸可能幫助降壓；閉氣與快呼吸會升壓' },
  { condition: '心臟病、心律不整', levels: ['ok', 'caution', 'avoid', 'ok'], note: '先與心臟科醫師討論' },
  { condition: '癲癇', levels: ['ok', 'caution', 'avoid', 'ok'], note: '過度換氣是誘發因子' },
  { condition: '氣喘、COPD', levels: ['ok', 'caution', 'avoid', 'ok'], note: '縮唇與六字訣「呬」字有幫助；發作期依醫囑用藥' },
  { condition: '近期腹部／胸部手術、疝氣', levels: ['ok', 'ok', 'avoid', 'ok'], note: '至少 3 個月且經醫師同意' },
  { condition: '恐慌症', levels: ['ok', 'caution', 'avoid', 'caution'], note: '從睜眼、短時間開始；專注呼吸可能放大身體感覺' },
  { condition: '創傷後壓力症（PTSD）', levels: ['ok', 'caution', 'caution', 'caution'], note: '選擇創傷知情的帶領者；可以睜眼、隨時停' },
  { condition: '思覺失調、躁鬱症', levels: ['ok', 'caution', 'avoid', 'caution'], note: '密集靜修可能誘發症狀；在治療團隊同意下練習' },
  { condition: '睡眠呼吸中止症', levels: ['ok', 'caution', 'caution', 'ok'], note: '呼吸練習不能取代正壓呼吸器（CPAP）' },
];

export const SLEEP_TRAFFIC = [
  {
    level: 'green' as const,
    title: '自己調整即可',
    items: ['偶爾一兩晚睡不好（壓力、時差、旅行）', '起床後 30 分鐘內精神恢復', '調整作息 2–4 週明顯改善'],
  },
  {
    level: 'amber' as const,
    title: '安排門診（家醫科、身心科、睡眠中心）',
    items: [
      '每週 ≥ 3 晚難入睡或易醒，持續 ≥ 3 個月（慢性失眠）',
      '打鼾很大聲、被看到呼吸暫停、早上頭痛口乾、白天嚴重嗜睡',
      '腿部不適、想動才舒服（不寧腿）',
      '長期依賴安眠藥或酒精才能睡',
      '情緒低落、提不起勁超過 2 週',
    ],
  },
  {
    level: 'red' as const,
    title: '立刻求助',
    items: ['有傷害自己或結束生命的念頭 → 1925 安心專線（24 小時）、緊急撥 119／110', '開車時打瞌睡、差點出事 → 立即停止開車並就醫', '睡眠中出現胸痛、嚴重喘不過氣、意識不清 → 119'],
  },
];

export const SLEEP_MEDS = [
  { klass: '苯二氮平類與 Z 藥（如 zolpidem）', role: '短期（數週）、急性壓力期', caution: '長期使用耐受、依賴；長者跌倒與認知風險；夢遊等複雜睡眠行為', grade: 'B' as const },
  { klass: '食慾素受體拮抗劑（如 lemborexant、daridorexant）', role: '入睡與睡眠維持困難', caution: '隔日嗜睡；猝睡症禁用', grade: 'B' as const },
  { klass: '低劑量鎮靜型抗憂鬱劑', role: '合併憂鬱或焦慮時', caution: '口乾、姿勢性低血壓；需醫師評估', grade: 'C' as const },
  { klass: '褪黑激素', role: '時差、晝夜節律延遲；長者', caution: '對一般慢性失眠效果小；台灣屬處方藥，劑量與時機請諮詢醫師', grade: 'C' as const },
  { klass: 'CBT-I（非藥物）', role: '慢性失眠第一線', caution: '需要 4–8 週；效果比藥物持久', grade: 'A' as const },
];

// ── Myths ──────────────────────────────────────────────────────────────────

export const MINDBODY_MYTHS: { chapter: MindbodyTab; myth: string; fact: string }[] = [
  { chapter: 'OVERVIEW', myth: '睡不好是心理問題，想開一點就好。', fact: '失眠牽涉生理時鐘、睡意壓力與過度激發的神經系統；CBT-I 用行為方法調整這些機制，比「想開」有效得多。' },
  { chapter: 'SLEEP_SCIENCE', myth: '平日少睡，週末補眠就扯平了。', fact: '補眠只能部分恢復精神，卻會讓生理時鐘往後推（社交時差）；睡眠規律度比總時數更能預測死亡風險（Windred 2024）。' },
  { chapter: 'SLEEP_SCIENCE', myth: '每個人一定要睡滿 8 小時。', fact: '成人建議 7 小時以上，個體差異存在；比起湊滿數字，白天精神好、作息規律更重要。過度焦慮時數反而會失眠。' },
  { chapter: 'SLEEP_PLAN', myth: '喝酒能幫助入睡。', fact: '酒精確實讓人較快睡著，但後半夜會讓睡眠破碎、壓抑 REM、加重打鼾與呼吸中止，整體睡眠品質變差。' },
  { chapter: 'SLEEP_PLAN', myth: '睡不著就在床上多躺一下，總會睡著。', fact: '長時間清醒躺在床上，大腦會把床和「清醒、焦慮」連結起來；約 20 分鐘睡不著就離床，是 CBT-I 的核心技巧。' },
  { chapter: 'BREATH_SCIENCE', myth: '緊張時就大口深呼吸，吸越多氧氣越好。', fact: '大口用力吸容易過度換氣、二氧化碳下降，反而手麻、頭暈。重點是「吐得比吸長」、量輕而慢。' },
  { chapter: 'KAPALABHATI', myth: '卡帕拉巴提可以排毒、燃脂、治百病。', fact: '目前研究只支持短期提神、交感神經上升與注意力表現；「排毒」「燃脂」沒有可靠證據，而且它有明確禁忌。' },
  { chapter: 'KAPALABHATI', myth: '火呼吸做越快越久越好。', fact: '越快越久，過度換氣與腹壓風險越高。入門每秒 1 下、每輪 20–30 下就有效果；頭暈就是身體叫你停。' },
  { chapter: 'TUNA', myth: '吐納要練到「胎息」幾乎不呼吸才算成功。', fact: '刻意追求極慢呼吸或長時間閉氣會造成缺氧不適。每分鐘 4–6 次、舒服不憋，就是最有生理效益的區間。' },
  { chapter: 'TUNA', myth: '六字訣唸「噓」就能治肝病。', fact: '臟腑對應是傳統理論；可驗證的效果來自延長吐氣與規律練習帶來的放鬆與肺復健，不能取代肝病治療。' },
  { chapter: 'MINDFULNESS', myth: '冥想就是要讓腦袋完全放空。', fact: '正念不是清空想法，而是發現自己走神、不批判地帶回來。走神 100 次、帶回 100 次，就是練了 100 下。' },
  { chapter: 'MINDFULNESS', myth: '冥想百利無一害，越多越好。', fact: '多數人安全，但少數人會出現焦慮、創傷回憶或解離；有精神病史或創傷者，應在專業帶領下練習。' },
  { chapter: 'BEDTIME', myth: '半夜醒來要趕快看幾點，算還能睡多久。', fact: '看時間會啟動計算與焦慮，讓人更清醒。把時鐘轉過去，直接做延長吐氣。' },
  { chapter: 'CAPD_PLAN', myth: '睡眠限制就是叫失眠的人睡更少，太殘忍了。', fact: '它是縮短「躺床但醒著」的時間，讓睡意集中、睡眠變深；效率提高後每週慢慢加回躺床時間，是有 A 級證據的治療。' },
  { chapter: 'SAFETY', myth: '褪黑激素是天然的，可以天天當安眠藥吃。', fact: '褪黑激素主要調整生理時鐘時間點，對一般慢性失眠效果小；台灣屬處方藥，長期使用請與醫師討論。' },
  { chapter: 'SAFETY', myth: '打呼代表睡得很熟。', fact: '大聲打呼、呼吸暫停、白天嗜睡是睡眠呼吸中止症的警訊，與高血壓、心律不整、中風相關，需要睡眠檢查。' },
];

// ── Quiz ───────────────────────────────────────────────────────────────────

export const MINDBODY_QUIZ: Record<MindbodyTab, CourseQuiz> = {
  OVERVIEW: {
    question: '晚上 11 點躺在床上腦袋停不下來，下面哪一個最適合當下做？',
    options: ['做 3 輪卡帕拉巴提', '吸 4 秒、吐 6 秒的延長吐氣', '起來喝一杯紅酒', '滑手機到想睡'],
    answer: 1,
    explain: '延長吐氣會加強迷走神經煞車；卡帕拉巴提是提神油門，酒精與手機都會破壞睡眠。',
  },
  SLEEP_SCIENCE: {
    question: '前一晚只睡 4 小時，今天最好的做法是？',
    options: ['早上睡到中午補回來', '照常時間起床，午睡最多 30 分鐘，晚上睏了再睡', '晚上 8 點就上床躺著', '下午喝兩杯咖啡撐過去'],
    answer: 1,
    explain: '固定起床保護生理時鐘，累積的睡意壓力會讓今晚睡得更深；長時間補眠會把時鐘往後推。',
  },
  SLEEP_PLAN: {
    question: '預計晚上 11 點睡，最後一杯咖啡最晚大約幾點喝完？',
    options: ['晚上 8 點', '下午 5 點', '下午 2 點左右', '睡前一小時都可以'],
    answer: 2,
    explain: 'Gardiner 2023 統合分析：一杯咖啡（約 107 mg）至少要在睡前 8.8 小時喝完，11 點睡約是下午 2 點。',
  },
  BREATH_SCIENCE: {
    question: '哪一種呼吸模式最能讓心跳變慢、身體平靜？',
    options: ['吸 6 秒、吐 2 秒', '吸 4 秒、吐 6 秒', '每秒快速吐氣一次', '用嘴巴大口快速吸氣'],
    answer: 1,
    explain: '吐氣時迷走神經活性增加、心跳變慢；吐比吸長、每分鐘約 6 次最能放鬆。',
  },
  KAPALABHATI: {
    question: '下列誰最「不適合」練卡帕拉巴提？',
    options: ['想在早上提神的健康上班族', '血壓未控制、曾經氣胸的人', '已練習 3 週無不適的人', '想改善午後低潮的學生'],
    answer: 1,
    explain: '未控制高血壓與氣胸病史都在禁忌清單上；快速腹壓呼吸會升高血壓與胸腔壓力。',
  },
  TUNA: {
    question: '初學吐納，最推薦先練哪一種呼吸？',
    options: ['逆腹式呼吸', '長時間閉氣', '順腹式呼吸：吸氣腹部鼓起、吐氣腹部內收', '胸式快速呼吸'],
    answer: 2,
    explain: '順腹式呼吸最自然、安全；逆腹式與閉氣屬進階，初學易憋氣胸悶。',
  },
  MINDFULNESS: {
    question: '靜坐 5 分鐘，你發現自己走神了 10 次，這代表？',
    options: ['你不適合冥想', '你練了 10 次「覺察並帶回」，正是練習本身', '應該延長到 1 小時才有效', '要用力壓抑想法'],
    answer: 1,
    explain: '正念訓練的就是發現走神、溫和帶回；每一次回來都像做一下重訓。',
  },
  BEDTIME: {
    question: '凌晨 3 點醒來 20 分鐘還睡不著，最好的做法是？',
    options: ['看手機確認時間與訊息', '起床到客廳昏暗燈光下看本無聊的書，想睡再回床', '在床上努力逼自己睡', '吃宵夜'],
    answer: 1,
    explain: '刺激控制：離床做低刺激的事，想睡再回床，避免床與清醒焦慮產生連結。',
  },
  CAPD_PLAN: {
    question: '這週平均躺床 8 小時、實際睡 6 小時 20 分（效率 79%），下週上床時間應該？',
    options: ['提早 15 分鐘', '維持不變', '延後約 15 分鐘（縮短躺床時間）', '延後 3 小時'],
    answer: 2,
    explain: '效率低於 85%，延後 15 分鐘上床縮短躺床時間；但總躺床時間不少於 5 小時。',
  },
  SAFETY: {
    question: '先生打呼很大聲、太太看到他半夜停止呼吸，白天開會常打瞌睡，下一步？',
    options: ['練習卡帕拉巴提強化肺活量', '買止鼾貼片就好', '到睡眠中心或耳鼻喉科、胸腔科評估睡眠呼吸中止症', '睡前喝酒幫助放鬆'],
    answer: 2,
    explain: '這是睡眠呼吸中止症的典型警訊，需要睡眠檢查；呼吸練習與酒精都無法處理，酒精還會加重。',
  },
};

// ── Chapter sources ────────────────────────────────────────────────────────

export const MINDBODY_CHAPTER_SOURCES: Record<MindbodyTab, string[]> = {
  OVERVIEW: ['tssm', 'watson2015', 'edinger2021', 'fincham2023', 'goyal2014', 'killingsworth2010'],
  SLEEP_SCIENCE: ['borbely2016', 'watson2015', 'windred2024', 'xie2013', 'riemann2023'],
  SLEEP_PLAN: ['brown2022', 'gardiner2023', 'haghayegh2019', 'stutz2019', 'edinger2021', 'qaseem2016', 'riemann2023'],
  BREATH_SCIENCE: ['russo2017', 'zaccaro2018', 'fincham2023', 'balban2023', 'bernardi2001'],
  KAPALABHATI: ['raghuraj1998', 'telles2014', 'balban2023', 'fincham2023', 'johnson2004'],
  TUNA: ['chqa', 'bernardi2001', 'liuzijue2021', 'siu2021', 'zaccaro2018'],
  MINDFULNESS: ['killingsworth2010', 'goyal2014', 'hoge2023', 'kuyken2016', 'black2015', 'ong2014', 'britton2021'],
  BEDTIME: ['tsai2015', 'black2015', 'edinger2021', 'riemann2023'],
  CAPD_PLAN: ['edinger2021', 'riemann2023', 'qaseem2016'],
  SAFETY: ['riemann2023', 'qaseem2016', 'johnson2004', 'britton2021', 'mohw1925'],
};
