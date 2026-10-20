import React from 'react';
import { HeartHandshake, Hospital, Globe2, Building2, Brain, BatteryLow, ShieldCheck, Calculator, UserCheck } from 'lucide-react';
import { LTC_TABS } from '../../config/routes';
import { LTC_CHAPTERS, LtcTab, LTC_MYTHS, LTC_QUIZ, LTC_SOURCES, LTC_CHAPTER_SOURCES, LTC_UNITS, LTC_PATHS, LtcPathIcon } from '../../data/ltcData';
import { CourseShell, CourseSource } from '../common/pro/CourseShell';
import { HeroButton } from '../common/pro/HubHero';
import {
  LtcOverview,
  LtcPrevent,
  LtcAssess,
  LtcApply,
  LtcBenefits,
  LtcChoose,
  LtcHome,
  LtcCommunity,
  LtcForeign,
  LtcFacility,
  LtcSkills,
  LtcDementia,
  LtcCaregiver,
  LtcLegal,
} from './ltc/LtcChapters';

/**
 * LtcHub — 失能照護與長照專區 (v5.0): a 14-chapter course in five units covering
 * disability, prevention, the Barthel index and CMS levels, the 1966 application,
 * every subsidy (長照 3.0, 2026), home / community / foreign-caregiver / facility care,
 * caregiving skills, dementia, caregiver support and legal / end-of-life planning.
 */

const SOURCES = Object.fromEntries(
  Object.entries(LTC_CHAPTER_SOURCES).map(([tab, ids]) => [tab, ids.map((id) => LTC_SOURCES[id]).filter(Boolean) as CourseSource[]])
) as Partial<Record<LtcTab, CourseSource[]>>;

const PATH_ICONS: Record<LtcPathIcon, typeof Hospital> = {
  hospital: Hospital,
  foreign: Globe2,
  facility: Building2,
  dementia: Brain,
  caregiver: BatteryLow,
  prevent: ShieldCheck,
};

const PATHS = LTC_PATHS.map((p) => ({ label: p.label, hint: p.hint, icon: PATH_ICONS[p.key], chapters: p.chapters }));

export const LtcHub: React.FC = () => (
  <CourseShell<LtcTab>
    hubKey="ltc"
    tabs={LTC_TABS}
    chapters={LTC_CHAPTERS}
    views={{
      OVERVIEW: LtcOverview,
      PREVENT: LtcPrevent,
      ASSESS: LtcAssess,
      APPLY: LtcApply,
      BENEFITS: LtcBenefits,
      CHOOSE: LtcChoose,
      HOME: LtcHome,
      COMMUNITY: LtcCommunity,
      FOREIGN: LtcForeign,
      FACILITY: LtcFacility,
      SKILLS: LtcSkills,
      DEMENTIA: LtcDementia,
      CAREGIVER: LtcCaregiver,
      LEGAL: LtcLegal,
    }}
    units={LTC_UNITS}
    paths={PATHS}
    myths={LTC_MYTHS}
    quiz={LTC_QUIZ}
    sources={SOURCES}
    tabTone="teal"
    ariaLabel="失能照護與長照專區章節"
    hero={{
      icon: HeartHandshake,
      tone: 'teal',
      eyebrow: '臨床照護專區 · 失能照護與長照',
      title: '失能照護與長照：從評估、申請、選擇到每天的照顧',
      lead: (
        <>
          台灣 2025 年邁入超高齡社會，幾乎每個家庭都會遇到長照。這個專區用 14 章、5 個單元，帶你搞懂
          <strong>巴氏量表與長照等級、1966 申請與四包錢、居家／社區／外籍看護／機構怎麼選，以及照護技巧、失智照顧、照顧者支持與法律善終規劃</strong>，
          並整理到 2026 年最新的長照 3.0 與補助新制。
        </>
      ),
      helps: ['巴氏量表計分器與外看資格判斷', '長照四包錢與自付額試算', '機構參訪檢核表與費用比較', '照顧者負荷自評與求助管道'],
      stats: [
        { value: '1966', label: '長照服務單一窗口' },
        { value: '18 萬', label: '2026 住宿機構補助／年' },
        { value: '80 歲', label: '2025-08 起外看免評估' },
      ],
      actions: (goTo) => (
        <>
          <HeroButton icon={Calculator} onClick={() => goTo('ASSESS')}>
            巴氏量表計分
          </HeroButton>
          <HeroButton icon={UserCheck} onClick={() => goTo('FOREIGN')}>
            外看資格判斷
          </HeroButton>
        </>
      ),
    }}
    alert={{
      text: (
        <>
          <strong>立即撥 119：</strong>突然單側無力或口齒不清、意識改變叫不醒、呼吸喘或胸痛、跌倒撞頭（尤其吃抗凝血劑）、發燒合併不吃不喝精神變差。照顧者出現傷害自己或他人的念頭，請撥 1925。
        </>
      ),
      cta: '查看分級警訊',
      target: 'SKILLS',
    }}
    related={{
      title: '讀完長照專區，接著可以看',
      items: [
        { hash: 'spine/CAREGIVER', label: '家屬居家照護（脊椎專區）', hint: '壓傷分期、翻身時鐘、移位與防跌' },
        { hash: 'spine/OSTEOPOROSIS', label: '骨質疏鬆與防跌', hint: '避免骨折造成的突發失能' },
        { hash: 'longevity', label: '抗老延壽', hint: '肌少症、衰弱與健康餘命' },
        { hash: 'mindbody', label: '睡眠呼吸正念', hint: '照顧者的睡眠與壓力調適' },
      ],
    }}
    disclaimer="本專區依據衛福部長照司（長照 2.0／3.0、給付及支付基準、2026 住宿式機構補助）、勞動部（就業服務法第 46 條 2025-08-01 新制）、財政部、健保署公開資料，以及 WHO ICOPE、NICE、EPUAP 等國際指引編寫，提供一般健康與福利資訊，不能取代醫師、照管專員、社工或法律專業人員的個別評估。補助金額與資格以主管機關及各縣市最新公告為準。最後審閱：2026 年 10 月。"
  />
);
