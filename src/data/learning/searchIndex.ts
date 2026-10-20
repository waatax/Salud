import { HUMAN_SYSTEMS } from '../humanSystemsData';
import { SYSTEM_DEEP_DIVES } from '../systems';
import { CHAPTERS, getChapterPages } from '../chapters';
import { PILLAR_NAV, EXERCISE_SUB_NAV, DIET_SUB_NAV } from '../../config/navigation';
import { LEARNING_TRACKS } from './tracks';
import { EVIDENCE_UPDATES } from './evidenceUpdates';
import { LAB_METRICS, TAIWAN_SCREENINGS } from './checkup';
import { GLOSSARY } from './glossary';
import { ALL_QUICK_TIPS } from './quickTips';
import { STARTER_WEEKS } from './starterPlan';
import { NUMB_CAUSES, SPINE_MEDS, PT_MODALITIES, SPINE_EXERCISES, POSTURE_GUIDE, SPUR_CONDITIONS } from '../spineData';
import { SPINE_COURSE_CHAPTERS } from '../spineCareData';
import { HEPB_CHAPTERS, HBV_MARKERS, HBV_DRUGS } from '../hepbData';
import { LTC_CHAPTERS, OTHER_SCALES, FACILITY_TYPES, SKILL_CARDS, OTHER_SUBSIDIES } from '../ltcData';
import { MINDBODY_CHAPTERS, BREATH_METHODS, MINDFUL_PRACTICES, LIU_ZI_JUE } from '../mindbodyData';

export type SearchGroup = '實用技巧' | '課程' | '主題' | '脊椎與神經' | 'B 型肝炎' | '失能與長照' | '睡眠呼吸正念' | '人體系統' | '疾病' | '檢驗與篩檢' | '最新實證' | '名詞' | '飲食章節' | '運動專項' | '工具';

export interface SearchDoc {
  id: string;
  group: SearchGroup;
  title: string;
  subtitle?: string;
  /** In-app hash, or `modal:<id>` for tools that open a dialog. */
  target: string;
  /** Extra text that should match but is not displayed. */
  keywords: string;
}

export const GROUP_ORDER: SearchGroup[] = ['課程', '實用技巧', '檢驗與篩檢', '疾病', '主題', '脊椎與神經', 'B 型肝炎', '失能與長照', '睡眠呼吸正念', '人體系統', '最新實證', '名詞', '飲食章節', '運動專項', '工具'];

/**
 * Build the in-memory search corpus. Every entry points to an existing route so the
 * test suite can assert that no result is a dead link.
 */
const CARE_KEYWORDS: Record<string, string> = {
  ACUTE: '閃到腰 落枕 急性腰痛 急性頸痛 熱敷 冰敷 睡姿 枕頭 72小時 發作',
  CHRONIC: '慢性疼痛 慢性腰痛 中樞敏感化 節律活動 pacing 認知行為治療 CBT 復工 重返工作 失眠',
  CAREGIVER: '照顧者 家屬 照護 臥床 翻身 移位 輪椅 壓瘡 褥瘡 壓力性損傷 防跌 跌倒 輔具 助行器 長照 1966 喘息服務',
  SPECIAL: '脊椎側彎 側彎 Cobb 背架 僵直性脊椎炎 HLA-B27 發炎性背痛 孕婦腰痛 產後腰痛 骨盆帶疼痛 書包 青少年',
};

export function buildSearchIndex(): SearchDoc[] {
  const docs: SearchDoc[] = [];

  for (const t of LEARNING_TRACKS) {
    docs.push({ id: `track:${t.id}`, group: '課程', title: t.title_zh, subtitle: `學習路徑 · ${t.lessons.length} 課`, target: `learn/${t.id}`, keywords: `${t.subtitle_zh} ${t.audience_zh} ${t.title_en}` });
    for (const l of t.lessons) {
      docs.push({
        id: `lesson:${l.id}`,
        group: '課程',
        title: l.title_zh,
        subtitle: `${t.title_zh} · ${l.big_idea_zh}`,
        target: `learn/${t.id}/${l.id}`,
        keywords: `${l.key_points_zh.join(' ')} ${l.do_today_zh.join(' ')} ${l.myth_zh?.myth ?? ''}`,
      });
    }
  }

  for (const p of PILLAR_NAV) {
    docs.push({ id: `pillar:${p.id}`, group: '主題', title: p.label_zh, subtitle: p.blurb_zh, target: p.hash, keywords: `${p.label_en} ${p.blurb_en}` });
  }
  for (const d of DIET_SUB_NAV) {
    docs.push({ id: `diet:${d.hash}`, group: '主題', title: d.label_zh, subtitle: '飲食營養', target: d.hash, keywords: d.label_en });
  }

  // 脊椎與神經專區 (v4.4): chapters, causes of numbness, medicines, therapies, exercises, postures.
  for (const c of SPINE_COURSE_CHAPTERS) {
    docs.push({
      id: `spine:${c.id}`,
      group: '脊椎與神經',
      title: c.title_zh,
      subtitle: `脊椎專區 · ${c.label_zh}`,
      target: `spine/${c.id}`,
      keywords: `${c.goal_zh} ${c.learn_zh.join(' ')} 脊椎 骨刺 骨骼疏鬆 骨質疏鬆 壓迫性骨折 微創手術 骨泥 椎體成形術 UBE PELD 復健 物理治療 脊柱健康 生理曲線 McGill 麥吉爾 腰痛 背痛 脖子痛 頸椎 腰椎 手麻 腳麻 脊椎照護 ${CARE_KEYWORDS[c.id] ?? ''}`,
    });
  }
  // Dedicated specialty keyword targets
  docs.push(
    {
      id: 'topic:osteoporosis',
      group: '疾病',
      title: '骨質疏鬆症與骨骼疏鬆健康管理',
      subtitle: 'DXA 骨密度 T值、FRAX 評估與抗骨折處方藥物（保骼麗、益穩挺、骨穩）',
      target: 'spine/OSTEOPOROSIS',
      keywords: '骨骼疏鬆 骨質疏鬆 骨質流失 DXA T值 FRAX 骨折 保骼麗 Denosumab 益穩挺 Romosozumab 骨穩 福善美 雙磷酸鹽 鈣質 維生素D',
    },
    {
      id: 'topic:vcf-cement',
      group: '疾病',
      title: '脊椎壓迫性骨折與微創骨泥手術',
      subtitle: 'Genant 楔形塌陷分級、MRI STIR 水腫判讀與氣球擴張椎體成形術 (PKP/PVP)',
      target: 'spine/FRACTURE',
      keywords: '壓迫性骨折 骨泥 骨泥手術 椎體成形術 氣球擴張 PKP PVP SpineJack 楔形塌陷 翻身痛 背架 TLSO 道格氏駝背',
    },
    {
      id: 'topic:miss-surgery',
      group: '主題',
      title: '微創脊椎手術與雙通道內視鏡 (UBE)',
      subtitle: '組織保留哲學、多裂肌保護、經皮內視鏡 (PELD) 與 MIS-TLIF 減壓融合',
      target: 'spine/SURGERY',
      keywords: '微創手術 微創脊椎手術 內視鏡 UBE 雙通道內視鏡 PELD MIS-TLIF 多裂肌 傷口小 出血少 脊椎開刀 減壓手術',
    },
    {
      id: 'topic:spine-rehab',
      group: '實用技巧',
      title: '全方位脊椎復健與麥吉爾三大動作 (McGill Big 3)',
      subtitle: '三階段復健進程、改良式捲腹、側棒式、鳥狗式與骨鬆患者終生禁忌動作',
      target: 'spine/REHAB',
      keywords: '復健 物理治療 核心訓練 McGill 麥吉爾 改良捲腹 側棒式 鳥狗式 滾木翻身 骨鬆禁忌 禁忌動作 髖鉸鏈 健走 WalkBack',
    },
    {
      id: 'topic:spine-health',
      group: '主題',
      title: '整體脊柱健康與生理曲線生物力學',
      subtitle: '頸前凸、胸後凸、腰前凸、薦骨彈簧避震與矢狀平衡 (Sagittal Balance)',
      target: 'spine/OVERVIEW',
      keywords: '脊柱健康 脊椎健康 生理曲線 彈簧避震 矢狀平衡 Sagittal Balance 頸前凸 胸後凸 腰前凸 平背 駝背 避震',
    }
  );
  for (const n of NUMB_CAUSES) {
    docs.push({ id: `numb:${n.id}`, group: '疾病', title: n.condition, subtitle: `手腳麻 · ${n.pattern}`, target: 'spine/NUMBNESS', keywords: `${n.clues} ${n.tests} ${n.dept} 麻 手麻 腳麻 麻木` });
  }
  for (const c of SPUR_CONDITIONS) {
    docs.push({ id: `spur:${c.name}`, group: '疾病', title: c.name, subtitle: `骨刺與退化 · ${c.where}`, target: 'spine/SPURS', keywords: `${c.what} ${c.symptoms} ${c.clue} 骨刺 退化` });
  }
  for (const m of SPINE_MEDS) {
    docs.push({ id: `med:${m.id}`, group: '脊椎與神經', title: m.klass, subtitle: `常見藥物 · ${m.examples}`, target: 'spine/MEDS', keywords: `${m.pain} ${m.evidence} ${m.side_effects} ${m.caution} 止痛藥 用藥 副作用` });
  }
  for (const t of PT_MODALITIES) {
    docs.push({ id: `pt:${t.id}`, group: '脊椎與神經', title: t.name, subtitle: `物理治療 · ${t.verdict}`, target: 'spine/REHAB', keywords: `${t.what} 復健 物理治療 電療 熱敷` });
  }
  for (const e of SPINE_EXERCISES) {
    docs.push({ id: `spex:${e.id}`, group: '實用技巧', title: e.name, subtitle: `護脊運動 · ${e.dose}`, target: 'spine/EXERCISE', keywords: `${e.for_zh} ${e.steps.join(' ')} 運動 伸展` });
  }
  for (const g of POSTURE_GUIDE) {
    for (const it of g.items) {
      docs.push({ id: `posture:${g.group}:${it.title}`, group: '實用技巧', title: it.title, subtitle: `姿勢・${g.group} · ${it.how.slice(0, 40)}`, target: 'spine/POSTURE', keywords: `${it.why} ${it.avoid ?? ''} 姿勢 睡姿 坐姿 站姿 枕頭 床墊` });
    }
  }

  // B 型肝炎專區 (v4.4)
  for (const c of HEPB_CHAPTERS) {
    docs.push({ id: `hepb:${c.id}`, group: 'B 型肝炎', title: c.title_zh, subtitle: `B 肝專區 · ${c.label_zh}`, target: `hepb/${c.id}`, keywords: `${c.goal_zh} ${c.learn_zh.join(' ')} B肝 B型肝炎 肝炎 帶原 肝癌 肝硬化 HBV` });
  }
  for (const m of HBV_MARKERS) {
    docs.push({ id: `hbvlab:${m.marker}`, group: '檢驗與篩檢', title: `${m.zh}（${m.marker}）`, subtitle: m.meaning, target: 'hepb/TESTS', keywords: `B肝 檢驗 報告 ${m.normal}` });
  }
  for (const d of HBV_DRUGS) {
    docs.push({ id: `hbvdrug:${d.name}`, group: 'B 型肝炎', title: d.name, subtitle: `B 肝用藥 · ${d.brand}`, target: 'hepb/TREATMENT', keywords: `${d.how} ${d.pros} ${d.watch} 抗病毒 藥物` });
  }

  // 失能照護與長照專區 (v5.0): chapters, scales, facility types, care skills, subsidies.
  const LTC_KW: Partial<Record<string, string>> = {
    ASSESS: '巴氏量表 Barthel ADL 失能等級 CMS 長照等級 評估',
    APPLY: '1966 申請長照 照專 照管中心 個管 出院準備',
    BENEFITS: '四包錢 補助 喘息 交通接送 輔具 無障礙 自付額 扣除額 長照3.0',
    FOREIGN: '外籍看護 外勞 移工 看護工 申請 80歲免評 巴氏量表 仲介 就業安定費',
    FACILITY: '機構 護理之家 養護中心 安養 長照機構 住宿 補助 18萬',
    COMMUNITY: '日照 日間照顧 家托 小規機 巷弄長照站 據點',
    HOME: '居家服務 照服員 居家護理 居家醫療 復能 到宅沐浴',
    SKILLS: '移位 翻身 壓傷 壓瘡 鼻胃管 尿管 吞嚥 失禁 防跌',
    DEMENTIA: '失智 失智症 阿茲海默 BPSD 走失 譫妄',
    CAREGIVER: '照顧者 喘息 家庭照顧者 照顧壓力 1925',
    LEGAL: '監護宣告 輔助宣告 意定監護 信託 預立醫療 安寧 DNR 長照險',
    PREVENT: '衰弱 預防失能 ICOPE 肌少症',
  };
  for (const c of LTC_CHAPTERS) {
    docs.push({ id: `ltc:${c.id}`, group: '失能與長照', title: c.title_zh, subtitle: `長照專區 · ${c.label_zh}`, target: `ltc/${c.id}`, keywords: `${c.goal_zh} ${c.learn_zh.join(' ')} 長照 失能 照護 ${LTC_KW[c.id] ?? ''}` });
  }
  for (const s of OTHER_SCALES) {
    docs.push({ id: `ltcscale:${s.name}`, group: '檢驗與篩檢', title: s.name, subtitle: `${s.area} · ${s.cut}`, target: 'ltc/ASSESS', keywords: `${s.use} 量表 評估 失能 長照` });
  }
  for (const f of FACILITY_TYPES) {
    docs.push({ id: `ltcfac:${f.type}`, group: '失能與長照', title: f.type, subtitle: `住宿機構 · ${f.cost}`, target: 'ltc/FACILITY', keywords: `${f.for} ${f.law} 機構 安養 養護 護理之家` });
  }
  for (const k of SKILL_CARDS) {
    docs.push({ id: `ltcskill:${k.id}`, group: '實用技巧', title: k.title, subtitle: `居家照護 · ${k.steps[0].slice(0, 36)}`, target: 'ltc/SKILLS', keywords: `${k.steps.join(' ')} ${k.caution} 照護 照顧` });
  }
  for (const o of OTHER_SUBSIDIES) {
    docs.push({ id: `ltcsub:${o.name}`, group: '失能與長照', title: o.name, subtitle: `補助 · ${o.amount}`, target: 'ltc/BENEFITS', keywords: `${o.rule} 補助 津貼 長照` });
  }
  docs.push({ id: 'tool:barthel', group: '工具', title: '巴氏量表計分器', subtitle: '10 項 ADL 自評，附外看申請門檻', target: 'ltc/ASSESS', keywords: '巴氏量表 Barthel 失能 外籍看護 外勞 評估 分數' });
  docs.push({ id: 'tool:ltcbudget', group: '工具', title: '長照四包錢試算器', subtitle: '依等級與身分算出額度與自付額', target: 'ltc/BENEFITS', keywords: '長照 補助 試算 四包錢 自付額 喘息 輔具 交通' });
  docs.push({ id: 'tool:foreign', group: '工具', title: '外籍看護資格判斷', subtitle: '80 歲免評、癌症、巴氏量表門檻', target: 'ltc/FOREIGN', keywords: '外籍看護 外勞 移工 申請 資格 免評 巴氏量表' });

  // 睡眠・呼吸・正念專區 (v4.7): chapters, breathing methods, mindfulness practices, 六字訣.
  for (const c of MINDBODY_CHAPTERS) {
    docs.push({
      id: `mindbody:${c.id}`,
      group: '睡眠呼吸正念',
      title: c.title_zh,
      subtitle: `身心修復專區 · ${c.label_zh}`,
      target: `mindbody/${c.id}`,
      keywords: `${c.goal_zh} ${c.learn_zh.join(' ')} 睡眠 失眠 睡不著 呼吸法 冥想 正念 放鬆 自律神經`,
    });
  }
  docs.push(
    {
      id: 'topic:kapalabhati',
      group: '睡眠呼吸正念',
      title: '卡帕拉巴提呼吸法（頭顱清明調息・火呼吸）',
      subtitle: '主動吐氣、被動吸氣的提神呼吸：步驟、四週漸進、禁忌快篩',
      target: 'mindbody/KAPALABHATI',
      keywords: '卡帕拉巴提 卡巴拉提 卡帕拉帕提 卡酪梨 Kapalabhati 聖光調息 頭顱清明 火呼吸 breath of fire 風箱式呼吸 瑜伽呼吸 調息 pranayama',
    },
    {
      id: 'topic:tuna',
      group: '睡眠呼吸正念',
      title: '吐納與健身氣功六字訣',
      subtitle: '細勻深長的腹式慢呼吸；噓呵呼呬吹嘻六種吐氣',
      target: 'mindbody/TUNA',
      keywords: '吐納 吐故納新 六字訣 氣功 健身氣功 腹式呼吸 丹田 導引 噓 呵 呼 呬 吹 嘻 太極 養生',
    },
    {
      id: 'topic:mindfulness',
      group: '睡眠呼吸正念',
      title: '正念冥想：呼吸覺察、身體掃描與 MBSR',
      subtitle: '注意力循環、臨床證據、正念計時器與副作用',
      target: 'mindbody/MINDFULNESS',
      keywords: '正念 冥想 靜坐 打坐 身體掃描 MBSR MBCT 正念減壓 慈心 呼吸空間 mindfulness meditation',
    },
    {
      id: 'topic:capd-diary',
      group: '工具',
      title: 'CAP-D 睡眠日記與睡眠效率計算',
      subtitle: '記錄 7 晚，自動建議下週上床時間（CBT-I 睡眠窗口）',
      target: 'mindbody/CAPD_PLAN',
      keywords: '睡眠日記 睡眠效率 睡眠限制 CBT-I 失眠認知行為治療 上床時間 PDCA CAPD',
    },
    {
      id: 'topic:sleep-planner',
      group: '工具',
      title: '24 小時睡眠作息規劃器',
      subtitle: '依起床時間排出晨光、咖啡因截止、晚餐、洗澡與睡前流程',
      target: 'mindbody/SLEEP_PLAN',
      keywords: '作息 幾點睡 咖啡因 咖啡 截止 晨光 曬太陽 洗澡 泡澡 睡前 藍光 手機',
    },
    {
      id: 'topic:night-wake',
      group: '實用技巧',
      title: '半夜醒來睡不著怎麼辦？',
      subtitle: '不看時間、延長吐氣、20 分鐘仍清醒就離床',
      target: 'mindbody/BEDTIME',
      keywords: '半夜醒來 早醒 睡不回去 凌晨 失眠 刺激控制 認知洗牌',
    }
  );
  for (const b of BREATH_METHODS) {
    docs.push({ id: `breath:${b.method}`, group: '睡眠呼吸正念', title: b.method, subtitle: `呼吸法 · ${b.pattern}`, target: 'mindbody/BREATH_SCIENCE', keywords: `${b.effect} ${b.best} 呼吸法` });
  }
  for (const m of MINDFUL_PRACTICES) {
    docs.push({ id: `mindful:${m.name}`, group: '睡眠呼吸正念', title: m.name, subtitle: `正念練習 · ${m.dose}`, target: 'mindbody/MINDFULNESS', keywords: `${m.how} ${m.for_} 正念 冥想` });
  }
  for (const z of LIU_ZI_JUE) {
    docs.push({ id: `lzj:${z.sound}`, group: '睡眠呼吸正念', title: `六字訣「${z.sound}」字（${z.pinyin}）`, subtitle: z.mouth, target: 'mindbody/TUNA', keywords: `六字訣 吐納 ${z.organ} ${z.modern}` });
  }

  for (const sys of HUMAN_SYSTEMS) {
    docs.push({ id: `system:${sys.id}`, group: '人體系統', title: sys.name_zh, subtitle: sys.tagline_zh, target: `systems/${sys.id}`, keywords: `${sys.name_en} ${sys.description_zh}` });
    const dd = SYSTEM_DEEP_DIVES[sys.id];
    if (!dd) continue;
    for (const kp of dd.how_it_works) {
      docs.push({ id: `how:${kp.id}`, group: '人體系統', title: kp.question_zh, subtitle: sys.name_zh, target: `systems/${sys.id}/how`, keywords: kp.answer_zh.slice(0, 160) });
    }
    for (const c of dd.conditions) {
      docs.push({
        id: `cond:${c.id}`,
        group: '疾病',
        title: c.name_zh,
        subtitle: `${sys.name_zh} · ${c.name_en}`,
        target: `systems/${sys.id}/conditions`,
        keywords: `${c.name_en} ${c.what_zh} ${c.symptoms_early_zh.join(' ')}`,
      });
    }
    for (const pr of dd.protocols) {
      docs.push({ id: `prot:${pr.id}`, group: '人體系統', title: pr.title_zh, subtitle: `${sys.name_zh} · 預防與改善`, target: `systems/${sys.id}/prevent`, keywords: pr.goal_zh });
    }
  }

  // All 11 nutrition curriculum chapters (W, O, A, E, P, C, S, N, M, D, F).
  for (const ch of CHAPTERS) {
    for (const p of getChapterPages(ch.id)) {
      docs.push({
        id: `page:${p.id}`,
        group: '飲食章節',
        title: p.title_zh,
        subtitle: `第 ${ch.id} 章 ${ch.title_zh} · ${p.hook.slice(0, 40)}`,
        target: `${ch.id}/${p.id}`,
        keywords: `${p.title_en} ${p.category_zh ?? ''} ${(p.tags ?? []).join(' ')} ${p.kps.map((k) => `${k.title} ${k.one_liner}`).join(' ')}`,
      });
    }
  }

  for (const e of EXERCISE_SUB_NAV) {
    docs.push({ id: `sport:${e.hash}`, group: '運動專項', title: e.label_zh, subtitle: '運動訓練', target: e.hash, keywords: e.label_en });
  }

  for (const u of EVIDENCE_UPDATES) {
    docs.push({ id: `upd:${u.id}`, group: '最新實證', title: u.title_zh, subtitle: `${u.org} · ${u.date}`, target: `updates/${u.id}`, keywords: `${u.what_changed_zh} ${u.what_it_means_zh}` });
  }

  for (const m of LAB_METRICS) {
    docs.push({ id: `lab:${m.id}`, group: '檢驗與篩檢', title: `${m.name_zh}（${m.abbr}）`, subtitle: m.what_zh, target: 'checkup/labs', keywords: `${m.abbr} ${m.category} ${m.bands.map((b) => b.label_zh).join(' ')}` });
  }
  for (const s of TAIWAN_SCREENINGS) {
    docs.push({ id: `scr:${s.id}`, group: '檢驗與篩檢', title: s.name_zh, subtitle: `${s.who_zh} · ${s.frequency_zh}`, target: 'checkup/screening', keywords: `${s.how_zh} 篩檢 公費` });
  }

  for (const g of GLOSSARY) {
    docs.push({ id: `term:${g.term}`, group: '名詞', title: `${g.term} ${g.zh}`, subtitle: g.plain_zh, target: g.related_hash ?? 'glossary', keywords: g.category });
  }

  for (const tip of ALL_QUICK_TIPS) {
    docs.push({ id: `tip:${tip.id}`, group: '實用技巧', title: tip.title_zh, subtitle: `${tip.section.title_zh} · ${tip.how_zh}`, target: tip.section.hash, keywords: tip.why_zh });
  }
  docs.push({
    id: 'start',
    group: '實用技巧',
    title: '4 週健康啟動計畫',
    subtitle: '從零開始建立運動、飲食與睡眠習慣',
    target: 'start',
    keywords: `開始運動 新手 入門 ${STARTER_WEEKS.map((w) => w.theme_zh + w.tasks.map((t) => t.text_zh).join(' ')).join(' ')}`,
  });

  docs.push(
    { id: 'tool:emergency', group: '工具', title: '危險警訊：何時該立刻就醫', subtitle: '胸痛、中風、呼吸困難', target: 'modal:emergency', keywords: '急診 119 紅旗 中風 胸痛' },
    { id: 'tool:auditc', group: '工具', title: 'AUDIT-C 飲酒風險自評', subtitle: '三題快速篩檢', target: 'modal:auditC', keywords: '喝酒 酒精 篩檢' },
    { id: 'tool:722', group: '工具', title: '722 居家血壓評估', subtitle: '連續 7 天、早晚 2 次、每次 2 遍', target: 'cardiometabolic/BP_722', keywords: '血壓 高血壓 量血壓' },
    { id: 'tool:quick', group: '工具', title: '健檢報告快查', subtitle: '填入數字，看落在哪一區', target: 'checkup/quick', keywords: '血壓 血糖 BMI 腰圍 eGFR 代謝症候群' },
    { id: 'tool:hbv', group: '工具', title: 'B 肝報告解讀器', subtitle: '輸入 HBsAg、Anti-HBs、Anti-HBc 看懂結果', target: 'hepb/TESTS', keywords: 'B肝 表面抗原 表面抗體 核心抗體 疫苗 帶原' },
    { id: 'tool:numb', group: '工具', title: '我的麻在哪裡？手腳麻互動判斷', subtitle: '依麻的位置看可能原因與就醫急迫度', target: 'spine/NUMBNESS', keywords: '手麻 腳麻 麻木 腕隧道 坐骨神經 神經根' },
    { id: 'tool:redflag', group: '工具', title: '脊椎警訊：我需要多快就醫？', subtitle: '勾選症狀，看急診、盡快或門診', target: 'spine/TRIAGE', keywords: '腰痛 背痛 急診 馬尾 大小便 無力' }
  );

  return docs;
}

const norm = (s: string) => s.toLowerCase().normalize('NFKC');

/**
 * Token AND-match with a simple score: a hit in the title outweighs one in the
 * subtitle, which outweighs the hidden keywords; a title that starts with the query wins.
 */
export function searchDocs(docs: SearchDoc[], query: string, limit = 40): SearchDoc[] {
  const tokens = norm(query).split(/\s+/).filter(Boolean);
  if (!tokens.length) return [];
  const scored: { doc: SearchDoc; score: number }[] = [];
  for (const doc of docs) {
    const title = norm(doc.title);
    const sub = norm(doc.subtitle ?? '');
    const kw = norm(doc.keywords);
    let score = 0;
    let ok = true;
    for (const t of tokens) {
      if (title.includes(t)) score += title.startsWith(t) ? 12 : 8;
      else if (sub.includes(t)) score += 4;
      else if (kw.includes(t)) score += 1;
      else {
        ok = false;
        break;
      }
    }
    if (!ok) continue;
    score += (GROUP_ORDER.length - GROUP_ORDER.indexOf(doc.group)) / 100; // tie-break only: lessons & labs first
    scored.push({ doc, score });
  }
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.doc);
}
