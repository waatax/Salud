import React from 'react';
import { Flower2, Flame, Wind, Moon, ClipboardCheck } from 'lucide-react';
import { MINDBODY_TABS } from '../../config/routes';
import { MINDBODY_CHAPTERS, MindbodyTab, MINDBODY_MYTHS, MINDBODY_QUIZ, MB_SOURCES, MINDBODY_CHAPTER_SOURCES } from '../../data/mindbodyData';
import { CourseShell, CourseSource } from '../common/pro/CourseShell';
import { HeroButton } from '../common/pro/HubHero';
import {
  OverviewChapter,
  SleepScienceChapter,
  SleepPlanChapter,
  BreathScienceChapter,
  KapalabhatiChapter,
  TunaChapter,
  MindfulnessChapter,
  BedtimeChapter,
  CapdChapter,
  SafetyChapter,
} from './mindbody/MindBodyChapters';

/**
 * MindBodyHub — 睡眠・呼吸・正念 身心修復專區 (v4.7), a 10-chapter course on CourseShell:
 * sleep science and CBT-I, breath physiology, 卡帕拉巴提 (activating), 吐納・六字訣 (calming),
 * mindfulness, a bedtime protocol, a CAP-D sleep-diary loop, and safety.
 */

const SOURCES = Object.fromEntries(Object.entries(MINDBODY_CHAPTER_SOURCES).map(([tab, ids]) => [tab, ids.map((id) => MB_SOURCES[id]).filter(Boolean) as CourseSource[]])) as Partial<
  Record<MindbodyTab, CourseSource[]>
>;

export const MindBodyHub: React.FC = () => (
  <CourseShell<MindbodyTab>
    hubKey="mindbody"
    tabs={MINDBODY_TABS}
    chapters={MINDBODY_CHAPTERS}
    views={{
      OVERVIEW: OverviewChapter,
      SLEEP_SCIENCE: SleepScienceChapter,
      SLEEP_PLAN: SleepPlanChapter,
      BREATH_SCIENCE: BreathScienceChapter,
      KAPALABHATI: KapalabhatiChapter,
      TUNA: TunaChapter,
      MINDFULNESS: MindfulnessChapter,
      BEDTIME: BedtimeChapter,
      CAPD_PLAN: CapdChapter,
      SAFETY: SafetyChapter,
    }}
    myths={MINDBODY_MYTHS}
    quiz={MINDBODY_QUIZ}
    sources={SOURCES}
    tabTone="indigo"
    ariaLabel="睡眠呼吸正念專區章節"
    hero={{
      icon: Flower2,
      tone: 'indigo',
      eyebrow: '吃動睡心 · 身心修復專區',
      title: '睡眠・呼吸・正念：把神經系統調回睡得著的狀態',
      lead: (
        <>
          睡不著、睡不深、腦袋停不下來，背後常是同一個原因：<strong>自律神經卡在油門</strong>。本專區用 10 個章節、15 張互動圖解與 5 個練習工具，帶你從
          <strong>睡眠科學與 CBT-I</strong>、<strong>呼吸生理</strong>、提神的<strong>卡帕拉巴提（頭顱清明調息）</strong>、安神的<strong>吐納與六字訣</strong>，到<strong>正念冥想</strong>，最後用
          <strong>CAP-D 睡眠日記</strong>每週迭代出最適合你的作息。每一句都標示證據等級，傳統理論與現代研究分開說清楚。
        </>
      ),
      helps: [
        '輸入起床時間，排出你的 24 小時睡眠作息（光線、咖啡因、運動、晚餐、洗澡）',
        '分清楚「油門型」與「煞車型」呼吸：卡帕拉巴提早上做、吐納睡前做',
        '跟著呼吸引導器與正念計時器實際練習，含卡帕拉巴提安全快篩',
        '用 CAP-D 睡眠日記計算睡眠效率，每週自動建議下週上床時間',
        '知道哪些睡不好要看醫師：睡眠呼吸中止、慢性失眠、憂鬱與 1925',
      ],
      stats: [
        { value: '10.7%', label: '台灣成人慢性失眠盛行率' },
        { value: '6 次/分', label: '共振慢呼吸的最佳頻率' },
        { value: '−31%', label: 'MBCT 降低憂鬱復發風險' },
      ],
      actions: (goTo) => (
        <>
          <HeroButton icon={Moon} onClick={() => goTo('SLEEP_PLAN')}>
            排出我的睡眠作息
          </HeroButton>
          <HeroButton icon={Flame} onClick={() => goTo('KAPALABHATI')}>
            卡帕拉巴提呼吸法
          </HeroButton>
          <HeroButton icon={Wind} onClick={() => goTo('TUNA')}>
            吐納與六字訣
          </HeroButton>
          <HeroButton icon={ClipboardCheck} onClick={() => goTo('CAPD_PLAN')}>
            CAP-D 睡眠日記
          </HeroButton>
        </>
      ),
    }}
    alert={{
      text: (
        <>
          <strong>需要就醫：</strong>大聲打鼾合併呼吸暫停或白天嚴重嗜睡、失眠超過 3 個月；有傷害自己的念頭請撥 <strong>1925</strong>（24 小時）。快速呼吸法有明確禁忌，練習前請先看安全章。
        </>
      ),
      cta: '查看安全與就醫',
      target: 'SAFETY',
    }}
    related={{
      title: '讀完身心修復專區，接著可以看',
      items: [
        { hash: 'sleep', label: '睡眠修復', hint: '咖啡因代謝、OSA 快篩、晝夜模擬' },
        { hash: 'mental', label: '心理呼吸', hint: '壓力生理、HRV、焦慮急救' },
        { hash: 'exercise/mobility', label: '伸展與筋膜', hint: '睡前伸展與活動度' },
        { hash: 'learn/rest', label: '睡好與心理小課', hint: '白話課程＋小測驗' },
      ],
    }}
    disclaimer="本專區依據 AASM 2021 失眠行為治療指引、ACP 2016、歐洲失眠指引 2023、Brown 2022 國際光照建議，以及 JAMA、BMJ、Science、Sci Rep 等期刊之隨機對照試驗與統合分析編寫；卡帕拉巴提與六字訣之傳統說法另行標示為「傳統理論」。內容為健康教育，不能取代醫師、心理師之個別診斷與治療；有心肺疾病、懷孕或精神疾病史者練習呼吸法前請先諮詢醫師。最後審閱：2026 年 10 月。"
  />
);
