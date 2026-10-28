import React from 'react';
import { Ribbon, ShieldCheck, Microscope, HeartHandshake, Sparkles, Siren } from 'lucide-react';
import {
  OncologyTab,
  ONCOLOGY_TABS,
  ONCOLOGY_PATHS,
  ONCOLOGY_UNITS,
  ONCOLOGY_COURSE_CHAPTERS,
  ONCOLOGY_MYTHS,
  ONCOLOGY_QUIZ,
  ONCOLOGY_SOURCES,
  ONCOLOGY_CHAPTER_SOURCES,
  OncologyPathIcon,
} from '../../data/oncologyData';
import { CourseShell, CourseSource } from '../common/pro/CourseShell';
import { HeroButton } from '../common/pro/HubHero';
import {
  OncologyOverviewChapter,
  ScreeningTwChapter,
  LungCancerChapter,
  ColorectalCancerChapter,
  BreastCancerChapter,
  LiverBiliaryPancreasChapter,
  GastricEsophagealHeadNeckChapter,
  GynUroCancersChapter,
  ThyroidHemeCancersChapter,
  PrecisionTherapyChapter,
  NutritionSideEffectsChapter,
  SurvivorshipPalliativeChapter,
} from './oncology/OncologyChapters';

/**
 * OncologyHub — 所有主要癌症防治與精準醫療專區 (v5.2)
 * 涵蓋 5 大單元、12 個深度圖解章節：TNM 分期與台灣公費六癌篩檢、腫瘤標記迷思破解、
 * 肺癌、大腸直腸癌、乳癌、肝膽胰臟癌、胃食道頭頸口腔癌、攝護腺與婦科三癌、甲狀腺與血液腫瘤、
 * 五大精準抗癌武器（達文西、質子、NGS 標靶、免疫、ADC/CAR-T）、化放療高蛋白營養與早期整合緩和醫療。
 */

const SOURCES = Object.fromEntries(
  Object.entries(ONCOLOGY_CHAPTER_SOURCES).map(([tab, ids]) => [
    tab,
    ids.map((id) => ONCOLOGY_SOURCES[id]).filter(Boolean) as CourseSource[],
  ])
) as Partial<Record<OncologyTab, CourseSource[]>>;

const PATH_ICONS: Record<OncologyPathIcon, typeof Ribbon> = {
  screen: ShieldCheck,
  lung_breast: Microscope,
  gi_cancer: Siren,
  therapy: Sparkles,
  care: HeartHandshake,
};

const PATHS = ONCOLOGY_PATHS.map((p) => ({
  label: p.label,
  hint: p.hint,
  icon: PATH_ICONS[p.key],
  chapters: p.chapters,
}));

export const OncologyHub: React.FC = () => (
  <CourseShell<OncologyTab>
    hubKey="oncology"
    tabs={ONCOLOGY_TABS}
    chapters={ONCOLOGY_COURSE_CHAPTERS}
    views={{
      OVERVIEW: OncologyOverviewChapter,
      SCREENING_TW: ScreeningTwChapter,
      LUNG_CANCER: LungCancerChapter,
      COLORECTAL_CANCER: ColorectalCancerChapter,
      BREAST_CANCER: BreastCancerChapter,
      LIVER_BILIARY_PANCREAS: LiverBiliaryPancreasChapter,
      GASTRIC_ESOPHAGEAL_HEADNECK: GastricEsophagealHeadNeckChapter,
      GYN_URO_CANCERS: GynUroCancersChapter,
      THYROID_HEME_CANCERS: ThyroidHemeCancersChapter,
      PRECISION_THERAPY: PrecisionTherapyChapter,
      NUTRITION_SIDE_EFFECTS: NutritionSideEffectsChapter,
      SURVIVORSHIP_PALLIATIVE: SurvivorshipPalliativeChapter,
    }}
    units={ONCOLOGY_UNITS}
    paths={PATHS}
    myths={ONCOLOGY_MYTHS}
    quiz={ONCOLOGY_QUIZ}
    sources={SOURCES}
    tabTone="rose"
    ariaLabel="癌症防治與精準醫療專區章節"
    hero={{
      icon: Ribbon,
      tone: 'rose',
      eyebrow: '專科深度教室 · 所有主要癌症防治與精準醫療課程',
      title: '癌症防治與精準醫療：從台灣公費六癌篩檢、十大主要癌症圖譜到 NGS 標靶、免疫與營養照護',
      lead: (
        <>
          健檢抽血腫瘤標記出現紅字、LDCT 照出肺部毛玻璃結節、乳房攝影顯示 BI-RADS 異常，或家人剛確診癌症正在面對化放療與標靶選擇——本專區整合
          <strong>美國國家癌症資訊網（NCCN 2024–2025）、歐洲腫瘤內科學會（ESMO）、美國臨床腫瘤學會（ASCO）、ESPEN 腫瘤營養指引與台灣國健署擴大公費篩檢規範</strong>，
          以 5 個單元、12 章完整剖析台灣所有主要癌症（肺癌、大腸癌、乳癌、肝膽胰癌、胃食道頭頸癌、攝護腺與婦科三癌、甲狀腺與血液腫瘤）的早期攔截與現代精準治療。
        </>
      ),
      helps: [
        '10 秒試算您符合哪些台灣國健署免費癌症篩檢，並破除抽血腫瘤標記（CEA/CA19-9/CA125）的偽陽性與偽陰性迷思',
        '一次讀懂肺部毛玻璃結節（GGO）、乳房 BI-RADS 分級、左右側大腸癌症狀、肝癌 BCLC 分期與胰臟癌新發糖尿病警訊',
        '搞懂次世代基因定序（NGS）、口服標靶、PD-1 免疫檢查點抑制劑、ADC 生物導彈、CAR-T 與質子治療布拉格峰原理',
        '掌握化放療期間「高蛋白抗惡病質飲食」與「第 7–14 天白血球谷底期安全飲食」，破除餓死癌細胞與嗎啡成癮迷思',
      ],
      stats: [
        { value: '> 90%', label: '第 I 期早期癌症 5 年存活率' },
        { value: '6 項', label: '台灣國健署擴大公費癌篩' },
        { value: '1.2–1.5 g/kg', label: '化放療期每日高蛋白需求' },
      ],
      actions: (goTo) => (
        <>
          <HeroButton primary icon={ShieldCheck} onClick={() => goTo('SCREENING_TW')}>
            公費六癌篩檢資格試算
          </HeroButton>
          <HeroButton icon={Microscope} onClick={() => goTo('LUNG_CANCER')}>
            肺癌結節與 EGFR 標靶
          </HeroButton>
          <HeroButton icon={Sparkles} onClick={() => goTo('PRECISION_THERAPY')}>
            五大抗癌精準武器
          </HeroButton>
          <HeroButton icon={HeartHandshake} onClick={() => goTo('NUTRITION_SIDE_EFFECTS')}>
            化放療高蛋白與白血球低下照護
          </HeroButton>
        </>
      ),
    }}
    alert={{
      text: (
        <>
          <strong>化放療病友急診紅旗：</strong>化療後第 7–14 天白血球谷底期若出現<strong>發燒體溫 ≥ 38.0°C 或畏寒發抖</strong>，切勿自行吃退燒藥睡覺，請於 1–2 小時內立即掛急診！打免疫治療若出現新發呼吸喘咳或嚴重水瀉亦需立即通報。
        </>
      ),
      cta: '查看化放療副作用急診紅線',
      target: 'NUTRITION_SIDE_EFFECTS',
    }}
    related={{
      title: '讀完癌症防治與精準醫療專區，接著可以看',
      items: [
        { hash: 'gastro/CRC_POLYPS', label: '肝膽腸胃科專區', hint: '大腸息肉、幽門桿菌除菌與 B/C 肝硬化' },
        { hash: 'exercise/strength', label: '運動與肌力處方', hint: '實證降低 30–40% 復發並消除癌因性疲憊' },
        { hash: 'ltc', label: '長照 2.0 與居家照護專區', hint: '居家醫療、輔具與照顧者喘息資源' },
        { hash: 'mindbody', label: '身心修復與正念睡眠', hint: '舒緩治療焦慮與改善失眠' },
      ],
    }}
    disclaimer="本專區依據 NCCN Clinical Practice Guidelines in Oncology (2024–2025)、ESMO、ASCO、ESPEN 腫瘤營養指引、WHO 癌症防治報告與衛生福利部國民健康署公費篩檢規範編寫，僅供醫病溝通與健康教育參考，不能取代主治醫師與多專科腫瘤團隊（MDT）之個別診斷與治療決策。最後審閱：2026 年 10 月。"
  />
);

export default OncologyHub;
