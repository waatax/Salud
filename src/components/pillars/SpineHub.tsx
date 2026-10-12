import React from 'react';
import { Bone, MapPin, Siren } from 'lucide-react';
import { SPINE_TABS } from '../../config/routes';
import { SPINE_CHAPTERS, SpineTab, SPINE_MYTHS, SPINE_QUIZ, SPINE_SOURCES } from '../../data/spineData';
import { CourseShell, CourseSource } from '../common/pro/CourseShell';
import { HeroButton } from '../common/pro/HubHero';
import {
  OverviewChapter,
  SpursChapter,
  OsteoporosisChapter,
  FractureChapter,
  SurgeryChapter,
  NumbnessChapter,
  PostureChapter,
  ExerciseChapter,
  RehabChapter,
  TreatmentChapter,
  MedsChapter,
  TriageChapter,
  CHAPTER_SOURCES,
} from './spine/SpineChapters';

/**
 * SpineHub — 脊椎・骨刺・骨鬆骨折・微創手術・復健全方位專區 (v4.5), taught as a 12-chapter
 * course on the shared CourseShell template.
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
      OSTEOPOROSIS: OsteoporosisChapter,
      FRACTURE: FractureChapter,
      SURGERY: SurgeryChapter,
      NUMBNESS: NumbnessChapter,
      POSTURE: PostureChapter,
      EXERCISE: ExerciseChapter,
      REHAB: RehabChapter,
      TREATMENT: TreatmentChapter,
      MEDS: MedsChapter,
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
      eyebrow: '症狀與疾病專區 · 脊柱健康與骨骼關節',
      title: '脊柱健康、骨刺、骨鬆骨折與微創骨泥：全方位醫療與復健指引',
      lead: (
        <>
          脖子痠、腰背劇痛、骨質流失或手腳發麻，是現代人與長者最普遍的健康挑戰。本專區提供 12 個深度章節與 25+ 張專業解剖與臨床圖表，完整解析
          <strong>脊柱健康生物力學、骨刺退化機轉、骨質疏鬆防骨折新藥、壓迫性骨折與微創骨泥手術（PKP/PVP）、雙通道內視鏡微創手術（UBE）、McGill 核心復健處方與用藥安全</strong>。
        </>
      ),
      helps: [
        '看懂骨刺與骨質疏鬆的形成機轉與臨床影像判讀（DXA T值與 MRI 水腫）',
        '了解壓迫性骨折的微創骨泥（PKP/PVP）手術原理、適應症與外漏防範',
        '掌握雙通道內視鏡（UBE）與微創手術（MISS）如何保留多裂肌與加速康復',
        '學會 McGill 護脊三大動作與骨鬆長者的安全復健及防跌運動處方',
        '從「麻在哪裡」精準定位受壓神經根，並掌握紅旗警訊就醫時機',
      ],
      stats: [
        { value: '80%', label: '成人一生中曾歷經下背痛' },
        { value: 'T ≤ -2.5', label: '骨質疏鬆診斷標準門檻' },
        { value: '< 1 cm', label: '雙通道內視鏡微創切口' },
        { value: '−45%', label: '運動＋衛教降低腰痛復發' },
      ],
      actions: (goTo) => (
        <>
          <HeroButton icon={Bone} onClick={() => goTo('OSTEOPOROSIS')}>
            骨質疏鬆與骨折照護
          </HeroButton>
          <HeroButton icon={MapPin} onClick={() => goTo('NUMBNESS')}>
            手腳發麻位置自我判讀
          </HeroButton>
          <HeroButton icon={Siren} onClick={() => goTo('TRIAGE')}>
            危險警訊與急症鑑別
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
