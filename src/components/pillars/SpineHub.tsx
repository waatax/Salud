import React from 'react';
import { Bone, MapPin, Siren } from 'lucide-react';
import { SPINE_TABS } from '../../config/routes';
import { SPINE_CHAPTERS, SpineTab, SPINE_MYTHS, SPINE_QUIZ, SPINE_SOURCES } from '../../data/spineData';
import { CourseShell, CourseSource } from '../common/pro/CourseShell';
import { HeroButton } from '../common/pro/HubHero';
import {
  OverviewChapter,
  SpursChapter,
  NumbnessChapter,
  PostureChapter,
  ExerciseChapter,
  TreatmentChapter,
  MedsChapter,
  RehabChapter,
  TriageChapter,
  CHAPTER_SOURCES,
} from './spine/SpineChapters';

/**
 * SpineHub — 脊椎・骨刺・手腳麻專區 (v4.4), taught as a nine-chapter course on the shared
 * CourseShell template.
 */

const SOURCES = Object.fromEntries(
  Object.entries(CHAPTER_SOURCES).map(([tab, ids]) => [tab, ids.map((id) => SPINE_SOURCES[id]).filter(Boolean) as CourseSource[]])
) as Partial<Record<SpineTab, CourseSource[]>>;

export const SpineHub: React.FC = () => (
  <CourseShell<SpineTab>
    hubKey="spine"
    tabs={SPINE_TABS}
    chapters={SPINE_CHAPTERS}
    views={{
      OVERVIEW: OverviewChapter,
      SPURS: SpursChapter,
      NUMBNESS: NumbnessChapter,
      POSTURE: PostureChapter,
      EXERCISE: ExerciseChapter,
      TREATMENT: TreatmentChapter,
      MEDS: MedsChapter,
      REHAB: RehabChapter,
      TRIAGE: TriageChapter,
    }}
    myths={SPINE_MYTHS}
    quiz={SPINE_QUIZ}
    sources={SOURCES}
    tabTone="sky"
    ariaLabel="脊椎專區章節"
    hero={{
      icon: Bone,
      tone: 'sky',
      eyebrow: '症狀與疾病專區 · 脊椎與神經',
      title: '脊椎、骨刺與手腳麻：從了解到照顧',
      lead: (
        <>
          脖子痠、腰痛、手麻腳麻，是門診最常見的困擾之一。這個專區用 9 個短章節、20 多張圖表，帶你看懂脊椎構造、骨刺與椎間盤突出、手腳麻的來源，以及
          <strong>躺坐站走的日常注意事項、居家運動、常見藥物、物理治療與何時該就醫</strong>。
        </>
      ),
      helps: ['從「麻在哪裡」判斷可能是哪條神經', '學會保護脊椎的睡姿、坐姿與搬重物方式', '看懂醫師常開的藥與復健項目的實際效果', '知道哪些警訊要立刻就醫'],
      stats: [
        { value: '80%', label: '的人一生中會經歷下背痛' },
        { value: '96%', label: '游離型椎間盤突出會自行縮小' },
        { value: '−45%', label: '運動＋衛教降低發作風險' },
      ],
      actions: (goTo) => (
        <>
          <HeroButton icon={MapPin} onClick={() => goTo('NUMBNESS')}>
            我手腳麻，先看這裡
          </HeroButton>
          <HeroButton icon={Siren} onClick={() => goTo('TRIAGE')}>
            何時要就醫
          </HeroButton>
        </>
      ),
    }}
    alert={{
      text: (
        <>
          <strong>立即就醫：</strong>大小便解不出或失禁、會陰部麻木、雙腿快速無力、突然單側臉手腳麻或說話不清。
        </>
      ),
      cta: '檢查我的狀況',
      target: 'TRIAGE',
    }}
    related={{
      title: '讀完脊椎專區，接著可以看',
      items: [
        { hash: 'exercise/mobility', label: '伸展與筋膜', hint: '活動度與柔軟度訓練' },
        { hash: 'exercise/strength', label: '重量訓練', hint: '安全地練核心與下肢肌力' },
        { hash: 'systems/musculoskeletal/conditions', label: '肌肉骨骼系統疾病', hint: '骨質疏鬆、關節炎、肌少症' },
        { hash: 'learn/spine', label: '脊椎與神經小課', hint: '5 堂白話課＋小測驗' },
      ],
    }}
    disclaimer="本專區依據 WHO 2023、NICE NG59、ACP 2017 等國際指引與同儕審查研究編寫，提供一般健康教育，不能取代醫師的診斷與個別化治療。任何藥物請依醫囑使用。最後審閱：2026 年 10 月。"
  />
);
