/**
 * hubPrimers.ts — the plain-language front door of each specialist hub (v6.4).
 *
 * The hubs carry Salud's deepest material, and several of them used to open with a dense
 * specialist headline. A reader without a medical background needs the opposite order: what this
 * page is about, the three things worth knowing even if they read nothing else, and an easy
 * lesson to start from — and only then the depth.
 *
 * Writing rules for this file:
 *   - everyday words in the title and lead; a technical term is explained where it appears;
 *   - each takeaway is one complete sentence a reader can act on or remember;
 *   - no superlatives and no claims about how the content was reviewed or graded;
 *   - `starter.hash` must resolve to a real page (checked in learning.test.ts).
 */

export interface HubPrimer {
  /** Short category label above the title. */
  eyebrow: string;
  title: string;
  lead: string;
  /** Exactly three — enough to remember, short enough to read before scrolling. */
  takeaways: [string, string, string];
  starter?: { hash: string; label: string; kind: 'lesson' | 'plan' };
}

export type HubPrimerKey =
  | 'diet'
  | 'supplements'
  | 'exercise'
  | 'sleep'
  | 'mental'
  | 'longevity'
  | 'ultrahealth'
  | 'cardiometabolic'
  | 'obesity'
  | 'systems';

export const HUB_PRIMERS: Record<HubPrimerKey, HubPrimer> = {
  diet: {
    eyebrow: '飲食營養',
    title: '吃得對：飲食法與營養素',
    lead: '沒有一種飲食法適合所有人。這裡比較常見飲食法的研究證據，整理醣類、蛋白質、油脂、維生素與礦物質的重點，再延伸到水、油、酒的專章。',
    takeaways: [
      '各種研究較一致的共同點：多吃蔬果、全穀、豆類與堅果，少喝含糖飲料、少吃加工肉品。',
      '地中海飲食與得舒（DASH）飲食是研究最多的兩種飲食模式；得舒飲食特別針對血壓設計。',
      '能長期吃下去的飲食才有用。有腎臟病、糖尿病或懷孕時，調整前先問醫師或營養師。',
    ],
    starter: { hash: 'learn/eat/L-EAT-01', label: '我的餐盤：一餐怎麼配', kind: 'lesson' },
  },
  supplements: {
    eyebrow: '營養保健品',
    title: '保健食品：哪些有證據，哪些要小心',
    lead: '保健食品不是藥，也不是吃越多越好。這裡整理常見成分在人體研究中的證據，並列出與處方藥一起使用時要注意的交互作用。',
    takeaways: [
      '飲食均衡的健康成人，多數保健品的額外好處有限；確實缺乏，或有特定需要的人（例如備孕與懷孕初期的葉酸）才是主要受益者。',
      '「天然」不等於安全：有些成分會影響抗凝血劑、降血壓藥等藥物的效果。',
      '正在服藥、懷孕、哺乳或準備手術時，使用前先告訴醫師或藥師。',
    ],
    starter: { hash: 'learn/basics/L-BAS-06', label: '用藥安全：藥袋要看哪幾行', kind: 'lesson' },
  },
  exercise: {
    eyebrow: '運動',
    title: '動起來：從快走到專項運動',
    lead: '規律活動是對身體好處最廣的生活習慣之一。先了解運動量與強度的基本觀念，再挑一項喜歡的深入：跑步、自行車、登山、重訓、伸展，或羽球、桌球、匹克球。',
    takeaways: [
      '一般成人可以逐步接近的目標：每週 150–300 分鐘中等強度有氧，加上每週至少 2 天肌力訓練。做不到全部也沒關係，有動就比沒動好。',
      '中等強度的簡單判斷：可以說話，但唱不了歌。',
      '運動中出現胸痛、胸悶、喘不過氣或頭暈，請立刻停下。有慢性病或很久沒運動，開始前先問醫師。',
    ],
    starter: { hash: 'learn/move/L-MOVE-01', label: '每週 150 分鐘：運動量的基本盤', kind: 'lesson' },
  },
  sleep: {
    eyebrow: '睡眠',
    title: '睡得好，身體才有時間修復',
    lead: '睡著的時候，大腦與身體仍在整理記憶、調節荷爾蒙、恢復體力。這裡從睡眠週期、咖啡因、失眠到打呼，一步步帶你看懂，並附上可以自己操作的小工具。',
    takeaways: [
      '多數成人每晚需要約 7–9 小時睡眠。每天固定時間起床，比週末補眠更能穩定生理時鐘。',
      '咖啡因在體內減少一半平均需要約 5–6 小時，個人差異很大；下午喝的咖啡，睡前可能還有不少留在體內。',
      '失眠持續三個月以上時，指引建議的第一線治療是「失眠認知行為治療」（CBT-I），而不是先用安眠藥。',
    ],
    starter: { hash: 'learn/rest/L-REST-01', label: '睡多久才夠？時數與規律都重要', kind: 'lesson' },
  },
  mental: {
    eyebrow: '壓力與情緒',
    title: '壓力、情緒與呼吸練習',
    lead: '壓力反應是身體的正常機制，但長期開著不關，會影響睡眠、血壓與心情。這裡介紹有研究支持的呼吸與放鬆方法、背後的生理原理，以及什麼時候該找專業協助。',
    takeaways: [
      '把吐氣拉得比吸氣長（例如吸 4 秒、吐 6–8 秒），練習幾分鐘，多數人會感覺心跳與緊繃感慢下來。',
      '呼吸練習是輔助，不能取代治療。情緒低落或焦慮持續兩週以上、影響到生活時，請找醫師或心理師。',
      '出現傷害自己的念頭時，請立刻求助：台灣安心專線 1925，全年 24 小時。',
    ],
    starter: { hash: 'learn/rest/L-REST-05', label: '壓力的生理學與 1 分鐘呼吸法', kind: 'lesson' },
  },
  longevity: {
    eyebrow: '健康老化',
    title: '健康老化：活得久，也活得好',
    lead: '老化無法停止，但失能與慢性病可以延後。這裡先講證據最扎實的生活做法，再介紹老化的生物學，以及仍在研究中的檢測與藥物。',
    takeaways: [
      '目前證據最扎實的做法仍是基本功：規律運動、均衡飲食、足夠睡眠、不吸菸、維持人際連結。',
      '肌力與心肺體能，和年老後能不能獨立生活密切相關；幾歲開始練都有幫助。',
      '「生物年齡」檢測與多數抗老補充品、藥物，在人體的證據仍然有限；想嘗試之前先與醫師討論。',
    ],
    starter: { hash: 'learn/prevent/L-PRE-06', label: '肌少症與骨質疏鬆：幾歲開始練都不嫌晚', kind: 'lesson' },
  },
  ultrahealth: {
    eyebrow: '健康生活',
    title: '把健康知識，變成每天的習慣',
    lead: '知道不等於做到。這裡提供一天作息的安排方式、小習慣追蹤與居家伸展動作，幫你把學到的東西一點一點放進生活。',
    takeaways: [
      '一次只改一件事。小到幾乎不可能失敗的行動（例如飯後走 10 分鐘）最容易持續。',
      '把新習慣接在原本就會做的事後面（例如刷完牙做 5 下深蹲），比單靠意志力記得更可靠。',
      '漏掉一天沒關係，隔天接回來就好；持續比完美重要。',
    ],
    starter: { hash: 'start', label: '4 週健康啟動計畫', kind: 'plan' },
  },
  cardiometabolic: {
    eyebrow: '三高與心血管',
    title: '血壓、血脂、血糖：看懂三高與血管健康',
    lead: '高血壓、高血脂、高血糖常在沒有症狀時慢慢傷害血管。這裡從日常量測、飲食運動調整到常用藥物，幫你看懂自己的健檢數字與保護血管的做法。',
    takeaways: [
      '居家血壓請用「722 原則」量測：連續 7 天、早晚各 1 次、每次量 2 遍取平均，一般成人目標是低於 130/80 mmHg。',
      '低密度膽固醇（LDL）目標因人而異：風險越高目標越低，飲食少吃飽和脂肪與反式脂肪，已開立降膽固醇藥請勿自行停藥。',
      '體重減輕 5–7% 搭配規律快走與肌力訓練，就能改善胰島素阻抗，明顯降低糖尿病前期進展為糖尿病的機率。',
    ],
    starter: { hash: 'learn/prevent/L-PRE-01', label: '代謝症候群：五項中有三項就要注意', kind: 'lesson' },
  },
  obesity: {
    eyebrow: '體重與代謝',
    title: '體重管理：從生活調整、保留肌肉到藥物選擇',
    lead: '體重過重不只是外觀問題，更與內臟脂肪、脂肪肝、睡眠呼吸中止症及心血管風險有關。這裡整理飲食、重訓保肌與減重藥物的臨床證據。',
    takeaways: [
      '減重的第一階段目標通常是減少原本體重的 5–10%，只要達到這個幅度，血壓、血糖與脂肪肝就會開始改善。',
      '減重時約有四分之一可能來自肌肉流失；搭配每公斤 1.2–1.6 克蛋白質與每週 2 次肌力訓練能幫助留住肌肉。',
      'GLP-1 等減重藥物屬於需要醫師評估的長期治療，停藥後多數人會回升部分體重，必須結合可持續的飲食與運動習慣。',
    ],
    starter: { hash: 'learn/prevent/L-PRE-05', label: '減重藥物 GLP-1：效果、副作用與停藥後', kind: 'lesson' },
  },
  systems: {
    eyebrow: '人體八大系統',
    title: '認識身體：八大器官系統怎麼運作與保養',
    lead: '從心血管、神經、消化到內分泌與免疫系統，身體各器官彼此連動。先選你想了解的系統，依序看懂生理功能、常見疾病警訊與日常保養方式。',
    takeaways: [
      '身體系統彼此影響：例如睡眠不足與長期壓力會牽動自律神經與荷爾蒙，進而影響血壓、血糖與腸胃蠕動。',
      '許多慢性病早期沒有明顯疼痛，認識各系統的「紅旗警訊」（如運動胸悶、不明黑便、單側無力）有助於及早就醫。',
      '每個系統分頁都整理了「正常運作原理、常見疾病、預防保養、用藥與營養」五個面向，可依需求切換閱讀。',
    ],
    starter: { hash: 'learn/body/L-BODY-01', label: '心臟與血管：一天跳 10 萬下的幫浦', kind: 'lesson' },
  },
};
