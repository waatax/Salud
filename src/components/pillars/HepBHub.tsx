import React from 'react';
import { ShieldPlus, ClipboardList, Baby } from 'lucide-react';
import { HEPB_TABS } from '../../config/routes';
import { HEPB_CHAPTERS, HepbTab, HEPB_MYTHS, HEPB_QUIZ, HEPB_SOURCES, HEPB_CHAPTER_SOURCES } from '../../data/hepbData';
import { CourseShell, CourseSource } from '../common/pro/CourseShell';
import { HeroButton } from '../common/pro/HubHero';
import { HepbOverview, HepbSpread, HepbTests, HepbPhases, HepbTreatment, HepbMonitor, HepbLife } from './hepb/HepbChapters';

/** HepBHub — B 型肝炎專區 (v4.4), a seven-chapter course on the shared CourseShell. */

const SOURCES = Object.fromEntries(
  Object.entries(HEPB_CHAPTER_SOURCES).map(([tab, ids]) => [tab, ids.map((id) => HEPB_SOURCES[id]).filter(Boolean) as CourseSource[]])
) as Partial<Record<HepbTab, CourseSource[]>>;

export const HepBHub: React.FC = () => (
  <CourseShell<HepbTab>
    hubKey="hepb"
    tabs={HEPB_TABS}
    chapters={HEPB_CHAPTERS}
    views={{
      OVERVIEW: HepbOverview,
      SPREAD: HepbSpread,
      TESTS: HepbTests,
      PHASES: HepbPhases,
      TREATMENT: HepbTreatment,
      MONITOR: HepbMonitor,
      LIFE: HepbLife,
    }}
    myths={HEPB_MYTHS}
    quiz={HEPB_QUIZ}
    sources={SOURCES}
    tabTone="amber"
    ariaLabel="B 型肝炎專區章節"
    hero={{
      icon: ShieldPlus,
      tone: 'amber',
      eyebrow: '症狀與疾病專區 · B 型肝炎',
      title: 'B 型肝炎：預防、看懂報告、治療與追蹤',
      lead: (
        <>
          台灣約有 200 萬人是 B 肝帶原者，很多人一直到肝硬化或肝癌才知道。這個專區用 7 個章節帶你了解
          <strong>B 肝怎麼傳染、怎麼看懂報告、誰需要吃藥、多久追蹤一次，以及帶原者如何和家人一起照顧肝臟</strong>。
        </>
      ),
      helps: ['輸入三項檢驗，立即看懂自己的 B 肝狀態', '知道何時該打疫苗、何時該治療', '了解口服抗病毒藥與健保給付', '帶原媽媽如何保護寶寶'],
      stats: [
        { value: '約 200 萬', label: '台灣 B 肝帶原者（國健署推估）' },
        { value: '55%', label: '肝癌死亡與 B 肝相關' },
        { value: '6 成+', label: '抗病毒治療可降低的肝癌發生' },
      ],
      actions: (goTo) => (
        <>
          <HeroButton icon={ClipboardList} onClick={() => goTo('TESTS')}>
            解讀我的報告
          </HeroButton>
          <HeroButton icon={Baby} onClick={() => goTo('SPREAD')}>
            懷孕與疫苗
          </HeroButton>
        </>
      ),
    }}
    alert={{
      text: (
        <>
          <strong>盡快就醫：</strong>眼白或皮膚變黃、茶色尿、極度疲倦嘔吐、肚子變大、嘔血或黑便、意識混亂。帶原者自行停藥後出現這些症狀尤其危險。
        </>
      ),
      cta: '查看警訊',
      target: 'MONITOR',
    }}
    related={{
      title: '讀完 B 肝專區，接著可以看',
      items: [
        { hash: 'checkup/screening', label: '台灣公費篩檢時間軸', hint: '成人健檢、B/C 肝、癌症篩檢' },
        { hash: 'learn/checkup/L-CHK-06', label: '肝指數與脂肪肝', hint: 'ALT、FIB-4 白話解讀' },
        { hash: 'systems/digestive/conditions', label: '消化系統疾病', hint: '脂肪肝、肝硬化與其他肝病' },
        { hash: 'learn/prevent/L-PRE-10', label: 'B 肝小課', hint: '8 分鐘重點複習＋小測驗' },
      ],
    }}
    disclaimer="本專區依據 WHO 2024、EASL 2017、AASLD 2018 指引與衛福部、國健署、疾管署、健保署公開資料編寫，提供一般健康教育，不能取代醫師的診斷與治療。健保給付與公費篩檢條件以主管機關最新公告為準。最後審閱：2026 年 10 月。"
  />
);
