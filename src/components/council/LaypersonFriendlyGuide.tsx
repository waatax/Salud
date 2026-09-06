import { ExpertSeatIllustration } from './ExpertSeatIllustration';
import React from 'react';
import {
  Droplets,
  Flame,
  Wine,
  Activity,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  HeartPulse,
  AlertTriangle,
  Lightbulb,
  Stethoscope,
  Smile,
  Zap
} from 'lucide-react';
import { ExpertBestPracticeData } from '../../data/expertBestPractices';

interface Props {
  expert: ExpertBestPracticeData;
}

// Layperson simplified content mapping for each expert
const LAYPERSON_DATA: Record<
  string,
  {
    tagline: string;
    doctorQuote: string;
    metaphor: string;
    threeSteps: {
      number: string;
      title: string;
      action: string;
      icon: 'avoid' | 'replace' | 'measure';
      badge: string;
    }[];
    myths: {
      myth: string;
      fact: string;
      explanation: string;
    }[];
  }
> = {
  'EC-01': {
    tagline: '健康 App 很好用，但「紅旗急症」不能等！',
    doctorQuote:
      '手機上的健康模擬器就像車上的導航，能提醒你前方路況，但如果引擎已經冒黑煙（劇烈胸痛、呼吸困難），第一件事必須是打 119 叫拖吊車，不能盯著螢幕自己猜。',
    metaphor: '手機健康演算法是「副駕駛」，真正的「主駕駛」是急診醫師與你的身體感受。',
    threeSteps: [
      {
        number: '1',
        title: '看懂身體紅旗警訊',
        action: '出現胸口像石頭壓著、劇烈頭痛或說話不清時，立即停止任何健康 App 測試。',
        icon: 'avoid',
        badge: '地雷警報'
      },
      {
        number: '2',
        title: '絕不自行停藥加藥',
        action: '不要因為看了網路衛教文章，就擅自停掉每天吃的降血壓藥或降血糖藥。',
        icon: 'replace',
        badge: '安全習慣'
      },
      {
        number: '3',
        title: '定期健康檢查留底',
        action: '每年記錄一次基礎血壓、空腹血糖與抽血報告，有疑問帶著數據問家醫科醫師。',
        icon: 'measure',
        badge: '定期檢查'
      }
    ],
    myths: [
      {
        myth: 'AI 或健康網站給的建議，可以直接取代醫院看診開藥？',
        fact: '絕對不行！網路工具只能提供日常保健參考。',
        explanation: '演算法無法聽診觸診，危急情況自己當醫生極易延誤黃金急救時間。'
      },
      {
        myth: '只要平常沒感覺不舒服，就不需要理會健康 App 的紅旗警告？',
        fact: '許多高血壓與心肌梗塞在發作前往往完全無痛。',
        explanation: '血壓逼近 180 mmHg 即使沒症狀也是血管隨時可能破裂的危險紅線。'
      }
    ]
  },
  'EC-02': {
    tagline: '三高前期不是絕症，現在改生活習慣還能逆轉！',
    doctorQuote:
      '健檢報告出現一兩項紅字（肚子微胖、血壓 135、空腹血糖 105），代表你的血管正在抗議。這不是要你馬上吞藥，而是大腦給你的黃金逆轉期！',
    metaphor: '三高前期就像水庫水位到達警戒線，只要少吃糖、多散步、換好油，就能平順洩洪。',
    threeSteps: [
      {
        number: '1',
        title: '戒掉手搖杯與含糖零食',
        action: '精緻果糖會直接在肝臟堆成脂肪，改成白開水、無糖綠茶或黑咖啡。',
        icon: 'avoid',
        badge: '少碰為妙'
      },
      {
        number: '2',
        title: '每餐先吃一大碗青菜',
        action: '按照「菜 ➔ 肉 ➔ 飯」的順序進食，膳食纖維會像濾網一樣幫你擋住糖分。',
        icon: 'replace',
        badge: '進食魔法'
      },
      {
        number: '3',
        title: '量腰圍比看體重更準',
        action: '男生腰圍維持小於 90 公分（約 35 吋）、女生小於 80 公分（約 31 吋）。',
        icon: 'measure',
        badge: '黃金指標'
      }
    ],
    myths: [
      {
        myth: '我看起來瘦瘦的，體重也正常，絕對不可能有代謝症候群？',
        fact: '「泡芙人」內臟脂肪過高，血管硬化風險跟肥胖者一樣高！',
        explanation: '手腳纖細但肚子微凸的人，脂肪常直接包覆肝臟與胰臟，不可掉以輕心。'
      },
      {
        myth: '三高指數一旦超標，就代表一輩子得吃藥不能停？',
        fact: '在疾病初期，超過七成的人藉由飲食與走路運動能完全恢復正常！',
        explanation: '生活型態醫學是世界公認最強大的非藥物處方。'
      }
    ]
  },
  'EC-03': {
    tagline: '保護心臟血管，先抓出血管裡的「水垢顆粒」(ApoB)！',
    doctorQuote:
      '很多人只看總膽固醇，其實真正會鑽進血管壁造成心肌梗塞的，是叫做 ApoB 的致病顆粒。血管就像水管，漂浮的水垢顆粒越少，水管越不容易堵塞爆炸！',
    metaphor: 'ApoB 就像水管裡的細砂石，砂石累積多了結成硬塊，哪天水壓一衝破裂就會中風。',
    threeSteps: [
      {
        number: '1',
        title: '廚房少用豬油與牛油',
        action: '飽和脂肪會讓肝臟清除水垢的能力變差，日常改用橄欖油或苦茶油。',
        icon: 'avoid',
        badge: '保護水管'
      },
      {
        number: '2',
        title: '落實 722 居家量血壓',
        action: '連續量 7 天、早晚各 1 次、每次量 2 遍取平均，數字維持在 120/80 以下。',
        icon: 'measure',
        badge: '血壓密碼'
      },
      {
        number: '3',
        title: '拒絕聚餐豪飲與烈酒',
        action: '一口氣狂喝好幾杯烈酒會刺激心臟亂跳（心房顫動），增加猝死風險。',
        icon: 'replace',
        badge: '心臟守則'
      }
    ],
    myths: [
      {
        myth: '長輩常說「每天睡前喝一小杯紅酒可以通血路、護心臟」？',
        fact: '醫學界已證實酒精完全沒有護心神話，反而增加中風與心律不整機率！',
        explanation: '過去所謂好處都是研究統計偏誤，世衛組織已宣告酒精對心血管無安全劑量。'
      },
      {
        myth: '只要血壓量起來高，吃一顆藥壓下去就可以繼續熬夜？',
        fact: '血壓藥是保護傘，不是放肆熬夜與吃重鹹的免死金牌！',
        explanation: '血管壁在長期睡眠不足與鹽分超標下會失去彈性脆化。'
      }
    ]
  },
  'EC-04': {
    tagline: '別讓血糖像坐雲霄飛車，空腹喝酒最容易昏迷！',
    doctorQuote:
      '吃飽飯昏昏欲睡、下午容易心慌手抖？這是血糖急速飆高又重重摔落的警訊。特別是糖尿病朋友，千萬不能空腹喝酒，那是會要命的半夜低血糖陷阱！',
    metaphor: '穩定的血糖像平緩的觀光小火車；吃精緻甜點配烈酒則是急速下衝的雲霄飛車。',
    threeSteps: [
      {
        number: '1',
        title: '吃飽後起身慢走 15 分鐘',
        action: '吃完飯別立刻癱在沙發上，散步能讓腿部大肌肉直接吸收血液中的葡萄糖。',
        icon: 'replace',
        badge: '降糖法寶'
      },
      {
        number: '2',
        title: '先吃蔬菜再吃澱粉',
        action: '把高纖蔬菜先吃進肚子墊底，像給小腸鋪上一層吸水防護網，延緩糖分吸收。',
        icon: 'avoid',
        badge: '聰明順序'
      },
      {
        number: '3',
        title: '喝酒前一定先吃主食',
        action: '喝酒會癱瘓肝臟製造葡萄糖的能力，空腹碰酒會引發致命的深層低血糖。',
        icon: 'measure',
        badge: '救命紅線'
      }
    ],
    myths: [
      {
        myth: '只要不吃甜的蛋糕糖果，多吃幾碗白飯和湯麵沒關係？',
        fact: '一碗白飯或炒麵下肚，升糖速度跟直接喝糖水差不多！',
        explanation: '精緻澱粉在體內分解就是葡萄糖，建議將一半主食換成地瓜或五穀米。'
      },
      {
        myth: '高血糖會致命，低血糖忍一下吃顆糖就沒事？',
        fact: '半夜的深度低血糖比高血糖更具致命性！',
        explanation: '低血糖會在幾十分鐘內使大腦缺糖昏迷，引發心律不整甚至猝死。'
      }
    ]
  },
  'EC-05': {
    tagline: '健康餐盤三口訣：一半青菜、一把堅果、好油代換！',
    doctorQuote:
      '計算卡路里算到神經緊繃？只要記住你的餐盤：蔬菜永遠佔一半、飯跟肉各佔四分之一，每天吃一湯匙無調味堅果，營養自然均衡達標！',
    metaphor: '你的腸胃是一座花園，多吃五顏六色蔬菜是好菌的肥料；超加工零食則是除草劑。',
    threeSteps: [
      {
        number: '1',
        title: '外食挑清湯不喝濃湯',
        action: '羹湯、濃湯裡面滿滿都是勾芡澱粉與鹽巴，選清燙青菜不淋肥肉燥。',
        icon: 'avoid',
        badge: '挑食智慧'
      },
      {
        number: '2',
        title: '白飯混入糙米五穀飯',
        action: '膳食纖維是腸道益生菌的最愛，每天吃到 25 公克纖維，腸道通暢不便秘。',
        icon: 'replace',
        badge: '高纖飲食'
      },
      {
        number: '3',
        title: '每天一小把無調味堅果',
        action: '核桃、杏仁含有優質不飽和脂肪與維生素E，保護血管抗氧化。',
        icon: 'measure',
        badge: '好油補充'
      }
    ],
    myths: [
      {
        myth: '想要減重或降膽固醇，最好「滴油不沾」全吃水煮餐？',
        fact: '完全不吃油會導致落髮、皮膚乾裂、膽結石甚至荷爾蒙失調！',
        explanation: '身體需要好油來吸收脂溶性維生素，關鍵是「選好油」而不是「不吃油」。'
      },
      {
        myth: '市售果汁標榜 100% 純天然，多喝等於補充新鮮水果營養？',
        fact: '濾掉膳食纖維的純果汁，本質上就是一杯吸收極快的高濃度糖水！',
        explanation: '吃整顆水果有果膠纖維緩衝，喝果汁則直接讓肝臟脂肪暴增。'
      }
    ]
  },
  'EC-06': {
    tagline: '肌肉是人體的長壽器官，練深蹲比吃補藥更有用！',
    doctorQuote:
      '運動不只是為了減肥，肌肉是全身上下最大的葡萄糖蓄水池。每週只要做兩次深蹲或大腿阻力訓練，老了不跌倒、血糖平穩，這才是真正的長壽秘方！',
    metaphor: '肌肉就像你的退休金帳戶，年輕時多存點肌肉，年老時才有本錢抵抗病痛與跌倒。',
    threeSteps: [
      {
        number: '1',
        title: '每週兩天練習深蹲起立',
        action: '扶著椅子做深蹲或微蹲，鍛鍊大腿與臀部肌肉，強化膝關節穩定度。',
        icon: 'replace',
        badge: '肌力儲蓄'
      },
      {
        number: '2',
        title: '每天快走 30 分鐘微喘',
        action: '走路步頻稍微加快，達到「可以講話但沒辦法唱歌」的微喘程度最適當。',
        icon: 'measure',
        badge: '心肺保養'
      },
      {
        number: '3',
        title: '運動後補充豆漿茶葉蛋',
        action: '運動後 2 小時內補充足量蛋白質修復肌肉，千萬別喝冰啤酒浪費運動成果。',
        icon: 'avoid',
        badge: '修復黃金期'
      }
    ],
    myths: [
      {
        myth: '長輩年紀大了關節退化，多坐著休息少走路比較不傷膝蓋？',
        fact: '越不動肌肉萎縮越快，膝蓋少了肌肉支撐，關節反而磨損得更兇！',
        explanation: '規律適度的低衝擊運動（水中慢走、平地散步、太極拳）能滋潤關節軟骨。'
      },
      {
        myth: '大汗淋漓運動完，喝冰啤酒最暢快解渴？',
        fact: '運動後喝酒會讓肌肉合成效率直接暴跌 37%，而且加速身體脫水！',
        explanation: '酒精是利尿劑且抑制肌肉修復，運動後喝白開水配電解質才是正解。'
      }
    ]
  },
  'EC-07': {
    tagline: '睡前小酌是麻醉不是助眠，半夜深睡期全被破壞！',
    doctorQuote:
      '很多人以為喝點小酒比較好睡，其實酒精只是把大腦敲昏。到了半夜酒精退散，交感神經像警報器一樣狂響，頻繁微醒、打呼窒息，醒來只會比沒睡更累！',
    metaphor: '睡前酒像向大腦高利貸借睡眠：前半夜借你昏睡 2 小時，後半夜要你用頭痛疲勞加倍奉還。',
    threeSteps: [
      {
        number: '1',
        title: '睡前 4 小時完全不碰酒',
        action: '給肝臟足夠時間代謝酒精，留給大腦完整的修復睡眠架構。',
        icon: 'avoid',
        badge: '深睡關鍵'
      },
      {
        number: '2',
        title: '睡前 90 分鐘少喝大杯水',
        action: '白天喝足水分，睡前別狂灌大杯水或冰飲，減少半夜爬起來上廁所的中斷。',
        icon: 'replace',
        badge: '防夜尿法'
      },
      {
        number: '3',
        title: '早晨起床曬太陽 15 分鐘',
        action: '戶外自然陽光能重設大腦生理時鐘，讓晚上的褪黑激素在對的時間準時分泌。',
        icon: 'measure',
        badge: '天然光照'
      }
    ],
    myths: [
      {
        myth: '失眠睡不著，吃顆安眠藥再配一小杯紅酒效果更好？',
        fact: '安眠藥跟酒精混用是致命的呼吸抑制高危險行為，千萬不可！',
        explanation: '兩者同時抑制中樞神經，極易在睡夢中窒息暴斃。'
      },
      {
        myth: '只要假日一口氣睡到中午 12 點，就能把平日累積的睡眠債補回來？',
        fact: '報復性補眠只會打亂生理時鐘，造成星期天晚上更嚴重的「週一失眠症」。',
        explanation: '每天固定起床時間（前後不超過 1 小時）才是穩定睡眠節律的核心。'
      }
    ]
  },
  'EC-13': {
    tagline: '水是良藥也是毒藥：小口慢喝，千萬別一口氣狂灌！',
    doctorQuote:
      '多喝水很好，但不能像水管灌水一樣牛飲！正常人腎臟每小時最多排泄 800-1000ml。如果在半小時內狂灌 1.5 公升，血液中的鹽分被瞬間稀釋，大腦吸水膨脹就是致命的水中毒！',
    metaphor: '大腦像一塊柔軟的海綿，慢慢滴水它能維持潤澤；一口氣丟進大水盆裡，海綿泡爛膨脹卡在頭骨裡就是腦水腫。',
    threeSteps: [
      {
        number: '1',
        title: '單次飲水 200-350ml 慢飲',
        action: '每隔 1-2 小時喝一杯水，小口啜飲，讓水分溫和進入血液與細胞。',
        icon: 'replace',
        badge: '溫和補水'
      },
      {
        number: '2',
        title: '看尿液顏色決定要不要喝',
        action: '尿液淡黃色像淡檸檬汁代表剛好；透明無色代表喝太多了，太深像烏龍茶要補水。',
        icon: 'measure',
        badge: '尿色指南'
      },
      {
        number: '3',
        title: '心臟洗腎患者嚴格限水',
        action: '腎功能不全或心衰竭朋友，請嚴格按照醫師指示限水，別聽信民間多喝水偏方。',
        icon: 'avoid',
        badge: '限水安全'
      }
    ],
    myths: [
      {
        myth: '每天強迫自己喝超過 4000-5000ml 可以快速排毒治百病？',
        fact: '過量狂灌水會引發急性「低血鈉腦水腫」，引發抽搐甚至昏迷致死！',
        explanation: '排毒靠的是肝腎正常代謝，不是用水把身體珍貴的電解質全沖走。'
      },
      {
        myth: '大太陽下長跑大出汗，只要一直灌純白開水就夠了？',
        fact: '大量出汗流失的是水分和鹽分，只灌純水會誘發運動型低血鈉痙攣！',
        explanation: '長跑流汗超過 1 小時，應適度補充電解質或運動飲料。'
      }
    ]
  },
  'EC-14': {
    tagline: '廚房烹調選好油：低溫用初榨橄欖，水炒健康不起煙！',
    doctorQuote:
      '看到鍋子冒大濃煙才下菜不是大廚鑊氣，那是油品高溫熱裂解產生的致癌油煙！廚房選高單元不飽和好油，改用水炒法，既保住青菜脆度，又保護全家人的肺部與血管。',
    metaphor: '好的天然油脂像血管的潤滑油；黑黑反覆油炸的回鍋油像廚房瀝青，把致癌自由基全吃進肚子。',
    threeSteps: [
      {
        number: '1',
        title: '廚房改用「水炒法」',
        action: '先在鍋裡放少許水加熱，放進青菜後再淋上一小匙好油，油溫絕不超標冒煙。',
        icon: 'replace',
        badge: '廚房神技'
      },
      {
        number: '2',
        title: '涼拌選初榨橄欖油',
        action: '特級初榨橄欖油含有珍貴的橄欖多酚，淋在沙拉或溫菜上抗發炎。',
        icon: 'measure',
        badge: '冷壓好油'
      },
      {
        number: '3',
        title: '看到黑稠泡沫炸油拒吃',
        action: '夜市或路邊攤炸油如果黑如醬油、炸物浮著不散的細泡沫，代表油已裂解變質。',
        icon: 'avoid',
        badge: '外食警鈴'
      }
    ],
    myths: [
      {
        myth: '炒菜一定要熱鍋到「白煙大起」再下菜，這樣青菜才會香又脆？',
        fact: '起白煙代表油脂已經裂解破壞，產生劇毒的致突變物丙二醛（MDA）！',
        explanation: '高溫油煙是許多不吸菸女性罹患肺腺癌的重要危險因子。'
      },
      {
        myth: '家裡炸過雞塊的油很香很乾淨，濾一濾可以反覆炸好幾次？',
        fact: '高溫回鍋油每炸一次，過氧化物與總極性化合物就翻倍暴增！',
        explanation: '家用油炸剩餘的油脂切勿反覆回鍋，建議直接當作廢油回收。'
      }
    ]
  },
  'EC-23': {
    tagline: '酒精是一級致癌物：肝臟會說話，給它每週無酒休息日！',
    doctorQuote:
      '在世界衛生組織眼中，酒精跟石綿、菸草並列第一類致癌物，根本沒有所謂的「安全飲酒量」。脂肪肝是肝臟最後的求救信號，只要及時戒酒，肝臟有不可思議的再生自癒能力！',
    metaphor: '肝臟是你體內唯一的解毒化工廠，只要沒有走到纖維化結疤，給它乾淨水源它就能奇蹟重生。',
    threeSteps: [
      {
        number: '1',
        title: '每週至少 3 天完全無酒',
        action: '給肝臟足夠的時間清理脂肪，嚴格避免每天一杯養成依賴慣性。',
        icon: 'avoid',
        badge: '肝臟假期'
      },
      {
        number: '2',
        title: '填寫 AUDIT-C 檢視風險',
        action: '用三道簡單題目了解自己的飲酒習慣有沒有超過危險門檻。',
        icon: 'measure',
        badge: '快速自評'
      },
      {
        number: '3',
        title: '聚會以無糖氣泡水代酒',
        action: '氣泡水加一片檸檬，一樣有乾杯的清爽氣氛，但給你的肝臟百分百安全。',
        icon: 'replace',
        badge: '健康社交'
      }
    ],
    myths: [
      {
        myth: '每天喝一點烈酒可以殺死胃裡的細菌，還能幫助消化暖胃？',
        fact: '酒精會直接破壞胃黏膜保護層，引發急性糜爛性胃炎與潰瘍出血！',
        explanation: '高濃度酒精對消化道黏膜是直接的化學性灼傷。'
      },
      {
        myth: '喝醉了只要吃顆解酒藥、催吐或喝杯濃茶就能把酒精排掉？',
        fact: '世上沒有任何藥物能加快肝臟分解酒精的速度，只有「時間」才能代謝！',
        explanation: '市售解酒糖只是補充維生素，血液裡的乙醇和致癌乙醛濃度一點都不會減少。'
      }
    ]
  },
  'EC-08': {
    tagline: '放下食物道德審判，用 80/20 原則找回飲食自由！',
    doctorQuote:
      '很多患者每天瘋狂計算卡路里，吃下一塊餅乾就充滿罪惡感去催吐或狂跑步。健康是為了讓你更有活力生活，不是把你關在食物恐懼的監獄裡。',
    metaphor:
      '飲食就像彈簧，你壓抑得越用力，反彈暴食的力量就越大；給自己 20% 彈性空間，彈簧才永遠不會彈性疲乏。',
    threeSteps: [
      {
        number: '1',
        title: '停止懲罰性補償',
        action: '吃多了不必逼自己跑 3 小時折磨身體，接納偶爾的享受，下一餐回歸原型食物即可。',
        icon: 'avoid',
        badge: '地雷警報'
      },
      {
        number: '2',
        title: '實踐 80/20 黃金法則',
        action: '80% 攝取豐富彩虹蔬果與優質蛋白質，20% 安心與親友享受喜歡的美味。',
        icon: 'replace',
        badge: '安全習慣'
      },
      {
        number: '3',
        title: '餐前 3 次深呼吸',
        action: '拿起食物前深呼吸 3 次，覺察自己是「生理飢餓」還是「焦慮無聊想吃」。',
        icon: 'measure',
        badge: '自我覺察'
      }
    ],
    myths: [
      {
        myth: '只要稍微吃一口炸物或甜點，今天一整天的減脂努力就徹底泡湯了？',
        fact: '體重與健康看的是長期平均，偶爾一餐享受完全不會摧毀代謝。',
        explanation: '慢性自責壓力分泌的皮質醇，對血管與內臟脂肪的傷害遠大於那一塊蛋糕。'
      },
      {
        myth: '只要靠鋼鐵般的意志力，任何人都能一輩子完全不吃碳水與甜食？',
        fact: '極端壓抑必定引發夜間報復性暴食反彈。',
        explanation: '大腦天生需要能量回饋，建立彈性親和的飲食關係才能長長久久。'
      }
    ]
  },
  'EC-09': {
    tagline: '吃藥絕不配酒！保健食品不能當糖果一把吞',
    doctorQuote:
      '診間常遇到患者頭痛吞了普拿疼，晚上又去應酬喝酒，結果肝指數飆到幾千急診住院。酒精與止痛藥在肝臟走同一條解毒通道，塞車會釀成致命毒害。',
    metaphor:
      '肝臟就像只有一條跑道的機場，酒精與止痛藥同時降落，必定在肝細胞引發大空難。',
    threeSteps: [
      {
        number: '1',
        title: '服藥前後 48 小時禁酒',
        action: '吃普拿疼、消炎止痛藥、安眠藥或降血壓藥期間，滴酒不沾。',
        icon: 'avoid',
        badge: '絕對紅線'
      },
      {
        number: '2',
        title: '保健品恪守每日上限',
        action: '脂溶性維生素（A、D、E、K）不可隨意加倍吞服，避免引發高血鈣與腎結石。',
        icon: 'replace',
        badge: '劑量防線'
      },
      {
        number: '3',
        title: '頭痛優先小口補水',
        action: '頭痛或宿醉時，以小口慢飲溫開水加上額頭冷敷優先，不濫用止痛藥。',
        icon: 'measure',
        badge: '安全自療'
      }
    ],
    myths: [
      {
        myth: '應酬前吞兩顆「解酒神藥」或薑黃錠，就能千杯不醉不傷肝？',
        fact: '市售解酒藥只是 B 群加咖啡因讓你提神，血液中的致癌酒精濃度絲毫沒少！',
        explanation: '喝下肚的酒精依舊毒害大腦與肝臟，解酒糖只是掩耳盜鈴。'
      },
      {
        myth: '保健食品是天然的，多吃只會排出來，多補多健康？',
        fact: '脂溶性營養素會在體內累積毒性，多吃反而加重肝腎排毒負擔。',
        explanation: '嚴格遵照包裝建議攝取量，天然均衡飲食才是最佳來源。'
      }
    ]
  },
  'EC-10': {
    tagline: '「每天喝紅酒通血管」是上世紀最大的醫學誤會！',
    doctorQuote:
      '很多長輩堅信睡前喝一小杯紅酒能預防心臟病，其實那是幾十年前統計數據混入了「生病被迫戒酒者」的假象。現代基因實證已敲定：最護心的飲酒量就是 0。',
    metaphor:
      '紅酒裡的白藜蘆醇就像微量抗氧化金沙，但你得先吞下一整卡車的酒精毒爛泥才能吃到它。',
    threeSteps: [
      {
        number: '1',
        title: '不為健康藉口喝酒',
        action: '不因為聽信「護心、助眠、軟化血管」等謠言而開始學喝酒。',
        icon: 'avoid',
        badge: '破除迷思'
      },
      {
        number: '2',
        title: '換喝無糖綠茶或黑咖啡',
        action: '想要攝取優質抗氧化多酚，綠茶、黑咖啡與深色莓果的保護力高出數百倍。',
        icon: 'replace',
        badge: '真護血管'
      },
      {
        number: '3',
        title: '聚餐以無糖氣泡水代酒',
        action: '杯中加入檸檬片與氣泡水，舉杯同歡大方又完全不傷血管大腦。',
        icon: 'measure',
        badge: '社交新寵'
      }
    ],
    myths: [
      {
        myth: '歐洲法國人常吃高油乳酪卻很少心臟病，是因為他們天天喝紅酒？',
        fact: '法國悖論已被推翻，其心血管健康來自充沛步行與地中海高纖飲食。',
        explanation: '酒精本身是一級致癌物，喝紅酒絕無法抵消致癌中風風險。'
      },
      {
        myth: '只要不喝醉、每天只小酌一杯，對身體只有好處沒有壞處？',
        fact: '世界衛生組織 (WHO) 明確指出：酒精沒有任何安全劑量標準。',
        explanation: '即使輕度飲酒，也會微幅推高乳癌、食道癌與心房顫動風險。'
      }
    ]
  },
  'EC-11': {
    tagline: '健康介面必須平視親和，字夠大、長輩戴老花眼鏡也能秒懂！',
    doctorQuote:
      '如果一個救命的健康功能，字體細得像螞蟻、按鈕小到長輩單手按不到，那它在醫學上就是徹底無效的。科技應該體貼人，而不是考驗視力。',
    metaphor:
      '無障礙設計就像診所門口的平緩無障礙坡道，讓坐輪椅的人與推嬰兒車的媽媽都能暢行無阻。',
    threeSteps: [
      {
        number: '1',
        title: '避開灰暗細小文字',
        action: '拒絕閱讀對比度不足、字級過小的警示；支援大字體無障礙排版。',
        icon: 'avoid',
        badge: '護眼防線'
      },
      {
        number: '2',
        title: '大於 44px 舒適按鈕',
        action: '所有核心功能按鍵均符合手指熱區，單手滑手機不卡手、不誤觸。',
        icon: 'replace',
        badge: '單手友好'
      },
      {
        number: '3',
        title: '色弱友善雙重標籤',
        action: '不僅以紅綠辨識，所有警告同步搭配圖標（⭕ / ⚠️ / ❌），清楚可辨。',
        icon: 'measure',
        badge: '全齡通用'
      }
    ],
    myths: [
      {
        myth: '健康 App 只要演算法厲害就好，字太小排版差長輩自己會放大？',
        fact: '介面認知過載是導致慢性病患看錯劑量或放棄記錄的最大主因。',
        explanation: '符合人體工學的直覺設計，能直接降低醫療疏失風險。'
      },
      {
        myth: '高對比大字體只有老年人才需要，年輕人用不到？',
        fact: '戶外強光下或疲憊時，每個人都需要清晰無負擔的介面。',
        explanation: '通用設計能造福所有情境下的使用者。'
      }
    ]
  },
  'EC-12': {
    tagline: '你的健康隱私就是身體主權，不留痕跡、保險公司看不到！',
    doctorQuote:
      '很多人不敢在線上誠實記錄自己喝了多少酒、血壓有多高，深怕被保險公司拒保或被雇主看見。我們堅持地端運算，你的資料只留在你自己的手機裡。',
    metaphor:
      '你的個人健康紀錄就像放在自家保險箱的日記本，鑰匙在你自己口袋，連我們工程師都沒有備份。',
    threeSteps: [
      {
        number: '1',
        title: '拒絕提供未加密個資',
        action: '絕不在隨意索取身分證號或健保卡號的未認證第三方網站填報病歷。',
        icon: 'avoid',
        badge: '隱私警報'
      },
      {
        number: '2',
        title: '享受完全本地端運算',
        action: '健康模擬與計算完全在手機瀏覽器端即時完成，免註冊、不留雲端。',
        icon: 'replace',
        badge: '安全金庫'
      },
      {
        number: '3',
        title: '一鍵無痕徹底銷毀',
        action: '提供隨時抹除本機儲存紀錄之開關，保障個資百分之百乾淨無痕。',
        icon: 'measure',
        badge: '資料主權'
      }
    ],
    myths: [
      {
        myth: '免費的健康工具一定會把我的生活習慣數據偷偷賣給廣告商？',
        fact: '傳統商業平台可能會，但 Salud 採取零知識地端運算架構。',
        explanation: '資料不上傳伺服器，從源頭徹底杜絕隱私洩漏。'
      },
      {
        myth: '只要隨手關掉網頁，在雲端留下的病歷足跡就會自己消失？',
        fact: '若伺服器後台有建檔，資料將永久留存；真正的安全是「一開始就不搜集」。',
        explanation: '資料最小化原則是唯一堅不可摧的隱私防護。'
      }
    ]
  },
  'EC-15': {
    tagline: '大火熱炒是在吸致癌油煙！學會「水炒法」蔬菜鮮甜又護肺',
    doctorQuote:
      '台灣非吸菸女性肺腺癌比率居高不下，廚房高溫油煙是隱形殺手。鍋子燒到冒白煙才下油，油早就熱裂解成劇毒丙烯醛。',
    metaphor:
      '熱鍋乾燒倒油就像在廚房燒塑膠袋吸毒煙；水炒法則是天然的 100°C 溫泉蒸煮。',
    threeSteps: [
      {
        number: '1',
        title: '拒絕乾燒油冒濃煙',
        action: '絕不在鐵鍋冒出滾滾白煙時才下油下菜，高溫裂解油煙具極高致癌毒性。',
        icon: 'avoid',
        badge: '油煙警報'
      },
      {
        number: '2',
        title: '全面改用「水炒法」',
        action: '先倒 30ml 清水煮沸，倒入青菜翻炒燜煮 90 秒，起鍋關火再淋上好油。',
        icon: 'replace',
        badge: '黃金廚藝'
      },
      {
        number: '3',
        title: '外食拒絕發黑回鍋油',
        action: '油炸鍋油色深褐、黏稠起泡沫或帶有刺鼻哈味時，一口都別吃。',
        icon: 'measure',
        badge: '外食自保'
      }
    ],
    myths: [
      {
        myth: '炒菜一定要有大火爆炒的「鑊氣」，蔬菜才會甜、營養才不會流失？',
        fact: '大火高溫會瞬間破壞維生素 C 與多酚，水炒法反而能多保留 40% 植化素！',
        explanation: '水蒸氣 100°C 溫和燜透菜葉，鎖住清脆爽口與天然甘甜。'
      },
      {
        myth: '萬年回鍋油只要用濾紙濾乾淨殘渣，就可以繼續炸好幾次回本？',
        fact: '反覆加熱已產生大量致癌極性化合物與反式脂肪，濾紙根本濾不掉！',
        explanation: '氧化回鍋油直接傷害血管內皮與胃黏膜，堅決拒吃。'
      }
    ]
  },
  'EC-16': {
    tagline: '夏天悶熱流汗不等於散熱！補水記得加少量鹽，頭暈立刻沖涼',
    doctorQuote:
      '在台灣高溫高濕的天氣裡，汗水滴滴答答掉在地上根本無法蒸發帶走熱量，核心體溫會像悶燒鍋一樣飆高。此時狂灌純水反而會誘發低血鈉昏迷。',
    metaphor:
      '悶熱天的身體就像一台水箱漏水的汽車，光灌水沒有冷卻風扇，引擎依然會過熱爆缸。',
    threeSteps: [
      {
        number: '1',
        title: '大汗後不狂灌純水',
        action: '劇烈流汗後一口氣猛灌幾千毫升無鹽純水，會迅速引發急性低血鈉水中毒。',
        icon: 'avoid',
        badge: '水中毒警報'
      },
      {
        number: '2',
        title: '補水伴隨少量電解質',
        action: '運動每流汗 1 公斤，分次補充 1 公升水分並搭配少許鹽分或香蕉補鉀。',
        icon: 'replace',
        badge: '安全補水'
      },
      {
        number: '3',
        title: '頭暈昏沉立即降溫',
        action: '出現說話不清或走路搖晃時，立刻移至陰涼處，全身潑冷水加吹風扇。',
        icon: 'measure',
        badge: '中暑急救'
      }
    ],
    myths: [
      {
        myth: '中暑時出不了汗，只要回房間關緊門窗、蓋厚被悶出一身汗就能退燒？',
        fact: '這是致命危險迷思！中暑體溫調節已癱瘓，悶被會直接導致多重器官衰竭死亡。',
        explanation: '熱傷害第一急救原則是盡快移至通風處、強力噴冷水降溫。'
      },
      {
        myth: '大熱天只要自己還沒覺得口渴，就代表身體水分還很充足？',
        fact: '當大腦感覺到口渴時，身體水分已經流失 2% 以上、心臟負擔已顯著加重。',
        explanation: '戶外活動每 15-20 分鐘定時小口慢飲 150-200ml。'
      }
    ]
  },
  'EC-17': {
    tagline: '一張精準好圖勝過千言萬語，拒絕未經審核的 AI 假圖！',
    doctorQuote:
      '看懂自己身體的器官是怎麼運作的，改變習慣才會心甘情願。我們所有的解剖與機制圖都經過專科醫師一筆一畫審核，絕不容許任何誤導性假圖。',
    metaphor:
      '精準的醫學插畫就像身體的 GPS 地圖，帶你看清動脈斑塊在哪裡，避開塞車拋錨危機。',
    threeSteps: [
      {
        number: '1',
        title: '拒絕未審查 AI 假圖',
        action: '不輕信網路上手指長錯、血管反接、生物結構荒謬的未驗證 AI 假插圖。',
        icon: 'avoid',
        badge: '假圖警報'
      },
      {
        number: '2',
        title: '認明醫學審查標章',
        action: '選擇由專業醫師與醫學繪圖師共同校閱、符合人體真實解剖學的直觀圖示。',
        icon: 'replace',
        badge: '專業嚴謹'
      },
      {
        number: '3',
        title: '看懂圖示及早預防',
        action: '看懂膽固醇與血壓如何刮傷血管壁，把視覺震撼轉化為每天少喝一杯糖飲的行動。',
        icon: 'measure',
        badge: '視覺賦能'
      }
    ],
    myths: [
      {
        myth: '健康衛教只要文字寫得詳細就好，配圖隨便抓網路圖沒關係？',
        fact: '大腦處理圖像速度比文字快 6 萬倍，一張錯誤配圖會直接誤導整個治療觀念。',
        explanation: '精確插圖能讓大眾在 3 秒內深刻記住心肌梗塞與中風的真正機轉。'
      },
      {
        myth: 'AI 自動產生的醫療插畫只要色彩漂亮，就能直接拿來衛教民眾？',
        fact: 'AI 經常生出多餘器官或錯誤神經走向等幻覺，必須由人類醫師親自把關。',
        explanation: '科學嚴謹度必須永遠凌駕於單純的美術裝飾之上。'
      }
    ]
  },
  'EC-18': {
    tagline: '誠實數據給人安心，絕不截斷 Y 軸人為放大數值微動製造焦慮！',
    doctorQuote:
      '很多健康手環或農場網站故意把血壓圖的軸線截斷，讓血壓從 118 浮動到 122 看起來像跳崖式暴衝，嚇得患者半夜狂吞降血壓藥引發低血壓休克。',
    metaphor:
      '截斷圖表軸線就像把放大鏡貼在平靜的小水坑上，硬把微風吹起的漣漪看成十級海嘯。',
    threeSteps: [
      {
        number: '1',
        title: '拒絕截斷坐標軸',
        action: '避開故意縮小數值量程、將正常微小起伏誇大為斷崖式危機的誇大圖表。',
        icon: 'avoid',
        badge: '假圖警報'
      },
      {
        number: '2',
        title: '認明誠實零基準線',
        action: '座標軸保留完整臨床危險量程，讓你清楚看見數值始終在綠色安全帶內。',
        icon: 'replace',
        badge: '誠實軸線'
      },
      {
        number: '3',
        title: '觀察長期週平均趨勢',
        action: '不為單一小時的心率或血壓微小起伏擔驚受怕，以連續 7 天平均值為準。',
        icon: 'measure',
        badge: '平靜安心'
      }
    ],
    myths: [
      {
        myth: '只要手環量出的血壓數值每小時都有波動，就代表心血管出大問題了？',
        fact: '正常人的血壓與心跳本來就會隨著說話、走動、喝水自然起伏。',
        explanation: '人體生理追求動態恆定，不需要像一條死直線般僵硬不變。'
      },
      {
        myth: '圖表折線起伏越劇烈、顏色越鮮紅，代表監測越靈敏專業？',
        fact: '刻意放大視覺雜訊只會誘發恐慌焦慮，反而讓真正的血壓因緊張飆升。',
        explanation: '客觀誠實的視覺編碼才能守護患者的心理平靜。'
      }
    ]
  },
  'EC-19': {
    tagline: '3 秒秒懂生活指南，想看論文隨時展開，拒絕醫學名詞狂轟濫炸！',
    doctorQuote:
      '把艱深的醫學講得每個人都能懂，不是稀釋科學，而是讓頂級智慧走進千家萬戶。我們採用 3 階梯揭露：3 秒懂黃金觀念、30 秒學會操作、深挖看 50 篇文獻。',
    metaphor:
      '學習健康就像爬階梯，先在第一階輕鬆散步，想挑戰登頂的人再走上學術高樓。',
    threeSteps: [
      {
        number: '1',
        title: '拒絕生澀術語轟炸',
        action: '首頁不堆疊看不懂的生化英文縮寫，以零門檻的大白話小標優先呈現。',
        icon: 'avoid',
        badge: '零門檻'
      },
      {
        number: '2',
        title: '每天看懂一條真心話',
        action: '每天只要花 30 秒看懂一張生活行動卡，今天就能落實一個微小健康改變。',
        icon: 'replace',
        badge: '秒懂實踐'
      },
      {
        number: '3',
        title: '按需深挖學術文獻',
        action: '想深入研究時，一鍵展開 50 篇國際期刊 GRADE 實證矩陣，嚴肅對照數據。',
        icon: 'measure',
        badge: '雙向滿足'
      }
    ],
    myths: [
      {
        myth: '通篇塞滿看不懂的醫學專有名詞，才是具有權威性的健康衛教？',
        fact: '真正的大師能用小學生都聽得懂的大白話，講清楚最深奧的生理學。',
        explanation: '晦澀難懂等於溝通無效，白話轉譯是最高境界的專業能力。'
      },
      {
        myth: '白話易讀的衛教內容，其背後的科學根據一定不如艱深論文紮實？',
        fact: 'Salud 每一句白話金句背後，都扎扎實實支撐著 50 篇國際一級期刊論文。',
        explanation: '親民好讀與學術嚴謹完全可以完美並存。'
      }
    ]
  },
  'EC-20': {
    tagline: '像身邊懂醫學的好友溫暖對話，生動比喻不嚇唬人！',
    doctorQuote:
      '恐嚇與斥責只會讓人因害怕而逃避健檢；溫暖平視的文字，才能給人主動改變生活的勇氣。我們永遠不用「再喝肝爛掉」嚇你，而是陪你一起無痛進步。',
    metaphor:
      '溫暖的文字就像冬天的熱茶，讓緊張防備的身心放鬆下來，溫柔接納健康的可能。',
    threeSteps: [
      {
        number: '1',
        title: '拒絕恐嚇斥責語言',
        action: '遠離用極端聳動字眼威脅「不聽話就會暴斃」的負能量農場文。',
        icon: 'avoid',
        badge: '告別恐慌'
      },
      {
        number: '2',
        title: '感受平視溫暖陪伴',
        action: '把健康當成一場與好友共同展開的探索，肯定自己每一次喝水運動的進步。',
        icon: 'replace',
        badge: '溫暖賦能'
      },
      {
        number: '3',
        title: '用生動比喻理解身體',
        action: '把血管想成水管、把肝臟想成機場，生動比喻讓複雜生理學變得親切有趣。',
        icon: 'measure',
        badge: '趣味生活'
      }
    ],
    myths: [
      {
        myth: '醫生必須板起臉孔嚴厲斥責，病患才會真正害怕乖乖聽話？',
        fact: '醫學研究證實，嚴厲恐嚇只會引發病患的逃避否認心理與回診中斷。',
        explanation: '同理支持的語言才能激發病患長期的自我照護意願。'
      },
      {
        myth: '生動的生活比喻會降低醫學知識的嚴謹度？',
        fact: '只要經過專業校審，貼切的比喻能無損傳遞最核心的生化真相。',
        explanation: '好的比喻是醫病溝通最強大的理解之橋。'
      }
    ]
  },
  'EC-21': {
    tagline: '目標小於 2 分鐘！不靠意志力，用微習慣輕鬆贏下長壽',
    doctorQuote:
      '很多人每年元旦發誓每天跑健身房 1 小時，往往第 3 天就放棄。行為科學證實：門檻低到不用花意志力的微步（例如出門前深蹲 5 下），才能持續一輩子。',
    metaphor:
      '微習慣就像小雪球，一開始輕輕一滾毫不費力，滾了 14 天就會變成堅不可摧的長壽雪崩。',
    threeSteps: [
      {
        number: '1',
        title: '不訂立宏大壯烈目標',
        action: '不勉強自己「明天起戒掉所有喜好食物」，過度嚴苛會在壓力來時徹底崩盤。',
        icon: 'avoid',
        badge: '告別崩潰'
      },
      {
        number: '2',
        title: '新習慣綁定日常動作',
        action: '門檻小於 2 分鐘（如早晨刷完牙立刻喝 250ml 溫水、穿好鞋原地深蹲 5 下）。',
        icon: 'replace',
        badge: '微習慣微步'
      },
      {
        number: '3',
        title: '完成立刻稱讚自己',
        action: '每次做完微步在心裡對自己說一聲「做得好！」，釋放多巴胺鞏固習慣迴路。',
        icon: 'measure',
        badge: '大腦獎勵'
      }
    ],
    myths: [
      {
        myth: '養成健康好習慣，必須完全依靠強大的自律與鋼鐵般的意志力？',
        fact: '人類的意志力就像手機電池每天都會耗盡；唯有習慣自動化才能長效維持。',
        explanation: '把目標縮小到不需要花費意志力，大腦就不會產生抗拒。'
      },
      {
        myth: '每天只深蹲 5 下或多喝一杯水，微不足道根本沒效果？',
        fact: '每天進步 1%，一年後你會比現在強大 37 倍！微步是長壽巨變的起點。',
        explanation: '微習慣的複利效應遠遠大於三分鐘熱度的偶爾苦練。'
      }
    ]
  },
  'EC-22': {
    tagline: '食品不能宣稱療效！敢宣稱包治百病百分之百是詐騙',
    doctorQuote:
      '坊間常有黑心廣告宣稱「喝某種神油能通血管」、「吃某種仙丹千杯不醉」。依照台灣食安法，一般食品只要宣稱降血糖治心臟病就是違法，更會耽誤急重症就醫。',
    metaphor:
      '法規防線就像道路兩旁的鋼鐵護欄，防止誇張不實的假宣傳把民眾的健康荷包撞入懸崖。',
    threeSteps: [
      {
        number: '1',
        title: '不信「治癒逆轉」神藥',
        action: '凡是宣稱能「根治高血壓、秒殺糖尿病、通血管」的食品，百分之百是騙局。',
        icon: 'avoid',
        badge: '詐騙警報'
      },
      {
        number: '2',
        title: '認明小綠人認證標章',
        action: '選購健康保健食品，認明衛福部食藥署核發之小綠人保健功效標章。',
        icon: 'replace',
        badge: '合法保障'
      },
      {
        number: '3',
        title: '絕不自行停藥斷藥',
        action: '清楚認知健康工具是日常衛教，慢性病處方藥務必遵照主治醫師指示服用。',
        icon: 'measure',
        badge: '生命底線'
      }
    ],
    myths: [
      {
        myth: '只要標榜純天然草本或國外原裝進口，就能宣稱有降血壓醫療療效？',
        fact: '台灣法律嚴格規定：非藥品宣稱醫療療效一律違法，重罰並勒令下架。',
        explanation: '誇大不實的假產品常違法偷摻西藥，傷肝傷腎甚至危及生命。'
      },
      {
        myth: '數位健康網站給出的建議，可以直接取代醫院看診與藥物開立？',
        fact: '演算法無法進行理學檢查與聽診，絕不能取代執業醫師之面診診斷。',
        explanation: '守住醫療免責與法規邊界，是守護使用者生命安全的最高責任。'
      }
    ]
  },
  'EC-24': {
    tagline: '喝酒臉紅不是代謝快：這是身體拉警報，一級致癌物正在狂飆！',
    doctorQuote:
      '台灣有將近一半的人天生基因缺陷（ALDH2 突變），解毒酵素只有常人的 10-20%。只要喝一口酒臉紅心跳，代表一級致癌物「乙醛」在體內飆高數十倍！帶有這種基因還硬喝酒，食道癌風險暴增 50 到 100 倍！',
    metaphor: '臉紅不是「氣血活絡」，而是你體內的火警警報器在尖叫，告訴你食道黏膜正在遭受一級致癌物火燒！',
    threeSteps: [
      {
        number: '1',
        title: '臉紅者終生滴酒不沾',
        action: '知道自己會臉紅，應果斷拒酒，這是保護食道最神聖的科學決策。',
        icon: 'avoid',
        badge: '終生守則'
      },
      {
        number: '2',
        title: '飯局勇敢說「我基因不耐受」',
        action: '不用找藉口說胃痛，直接拿出醫學科學：「我天生缺乏解毒酵素，喝了傷食道」。',
        icon: 'replace',
        badge: '自信拒酒'
      },
      {
        number: '3',
        title: '過去有常喝酒者做胃鏡檢查',
        action: '如果有常年臉紅硬喝的習慣，建議定期找消化內科進行食道窄頻內視鏡（NBI）篩檢。',
        icon: 'measure',
        badge: '定期防癌'
      }
    ],
    myths: [
      {
        myth: '喝酒容易臉紅的人，只要常常喝多訓練，酒量就可以練出來？',
        fact: '酒量變大只是大腦神經被麻痺習慣，體內乙醛致癌毒性絲毫未減！',
        explanation: '多喝只是讓警報器失靈，基因缺陷不會改變，食道癌風險以等比級數狂飆。'
      },
      {
        myth: '喝酒臉紅只要吃含有維生素 B 群的保肝丸，就可以繼續痛快乾杯？',
        fact: '保肝丸根本無法修復突變的 ALDH2 酵素，完全是自欺欺人的危險行為！',
        explanation: '沒有任何補充劑能代替代謝酵素，戒酒是唯一保命之道。'
      }
    ]
  }
};

export const LaypersonFriendlyGuide: React.FC<Props> = ({ expert }) => {
  const layperson =
    LAYPERSON_DATA[expert.expertId] || LAYPERSON_DATA['EC-03'];

  return (
    <div className="space-y-6">
      {/* ── 頂部橫幅：醫師白話解讀 ── */}
      <div className="p-5 sm:p-6 rounded-2xl border border-nature-amber-300/80 dark:border-nature-amber-800/60 bg-gradient-to-br from-nature-amber-50/90 via-white to-orange-50/40 dark:from-nature-amber-950/40 dark:via-salud-dark-card/60 dark:to-slate-950 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-nature-amber-500 text-black font-bold">
              <Stethoscope className="w-4 h-4" />
            </span>
            <div>
              <span className="font-mono text-[10px] text-nature-amber-800 dark:text-nature-amber-400 font-extrabold uppercase tracking-wider block">
                一般民眾通俗白話專欄 · 一分鐘聽懂
              </span>
              <h3 className="text-base sm:text-lg font-display font-extrabold text-slate-900 dark:text-white">
                {layperson.tagline}
              </h3>
            </div>
          </div>

          <span className="px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold bg-nature-amber-100 dark:bg-nature-amber-900/60 text-nature-amber-900 dark:text-nature-amber-300 border border-nature-amber-300 dark:border-nature-amber-700">
            不用醫學術語 · 人人都懂
          </span>
        </div>

        {/* 精美專屬插圖：24 席每席專屬視覺插畫 */}
        <ExpertSeatIllustration expertId={expert.expertId} className="shadow-xs" />

        {/* Doctor's Friendly Quote */}
        <div className="p-3.5 rounded-xl bg-white/90 dark:bg-slate-900/80 border border-nature-amber-200/80 dark:border-nature-amber-800/40 flex items-start gap-3">
          <Smile className="w-5 h-5 text-nature-amber-600 dark:text-nature-amber-400 shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-sans">
            <strong className="text-nature-amber-800 dark:text-nature-amber-400 font-bold mr-1">
              專科醫師真心話：
            </strong>
            {layperson.doctorQuote}
          </p>
        </div>

        {/* Vivid Metaphor Box */}
        <div className="p-3 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 flex items-start gap-2.5">
          <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-950 dark:text-amber-200 font-sans">
            <strong className="font-bold mr-1">生活生動比喻：</strong>
            {layperson.metaphor}
          </p>
        </div>
      </div>

      {/* ── 核心模組：民眾生活 3 步極簡行動卡 ── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
          <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <Zap className="w-4 h-4 text-nature-amber-600 dark:text-nature-amber-400" />
            日常生活 3 步極簡行動卡 (Action Cards)
          </h4>
          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
            今天就能立刻動手做
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {layperson.threeSteps.map((step, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-nature-amber-400 dark:hover:border-nature-amber-500 transition-all shadow-xs hover:shadow-sm space-y-2.5 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="w-6 h-6 rounded-full bg-nature-amber-500 text-black font-mono font-extrabold text-xs flex items-center justify-center shadow-xs">
                  {step.number}
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                  {step.badge}
                </span>
              </div>

              <div>
                <h5 className="font-display font-bold text-xs sm:text-sm text-slate-900 dark:text-white mb-1">
                  {step.title}
                </h5>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                  {step.action}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                科學證實有效
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 核心模組：常見民間迷思 vs 醫師實證真相 ── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
          <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            常見民間迷思 vs 醫師實證真相 (Mythbusters)
          </h4>
          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
            別再被長輩圖或網路謠言誤導
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {layperson.myths.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 space-y-3"
            >
              {/* Myth Row */}
              <div className="p-2.5 rounded-xl bg-rose-50/80 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 flex items-start gap-2">
                <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-mono font-bold text-rose-700 dark:text-rose-400 uppercase block">
                    常見迷思
                  </span>
                  <p className="text-xs text-rose-900 dark:text-rose-200 font-semibold leading-relaxed">
                    {item.myth}
                  </p>
                </div>
              </div>

              {/* Fact Row */}
              <div className="p-2.5 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-mono font-bold text-emerald-700 dark:text-emerald-400 uppercase block">
                    實證真相
                  </span>
                  <p className="text-xs text-emerald-900 dark:text-emerald-200 font-bold leading-relaxed">
                    {item.fact}
                  </p>
                </div>
              </div>

              {/* Explanation */}
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed font-sans px-1">
                💡 {item.explanation}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
