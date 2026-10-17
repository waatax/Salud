import React from 'react';
import { Bone, MapPin, Siren, Share2 } from 'lucide-react';
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
 * SpineHub — 脊椎・骨刺・骨鬆骨折・微創手術・復健全方位專區 (v4.6), taught as a 12-chapter
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
      eyebrow: '症狀與疾病專區 · 脊柱健康、微創手術與術後照護',
      title: '脊柱健康、骨刺、壓迫性骨折、3D導航微創手術與術後照護全攻略',
      lead: (
        <>
          脖子痠、腰背劇痛、骨質流失或手腳發麻，是現代人與長者最普遍的健康挑戰。本專區整合國際實證指引、台灣各大醫學中心護理規範與
          <strong>臺中市立老人復健綜合醫院（中國醫大經營）骨科部微創脊椎中心：張建鈞副院長團隊</strong>之臨床經驗，透過 12 個深度章節與 28+ 張專業解剖圖表，完整解析
          <strong>脊柱生物力學、骨質疏鬆新藥、壓迫性骨折與微創骨泥（PKP/PVP）、3D 電腦導航與全脊椎內視鏡（UBE/OLIF）、圓滾木翻身、背架穿戴口訣與可一鍵分享的術後居家照護指南</strong>。
        </>
      ),
      helps: [
        '看懂骨刺與骨質疏鬆的形成機轉與臨床影像判讀（DXA T值與 MRI STIR 水腫）',
        '了解壓迫性骨折的微創骨泥（PKP/PVP）手術原理、適應症與鄰近節段再骨折預防',
        '掌握 3D 電腦導航（O-arm）、雙通道內視鏡（UBE）與 OLIF 側開微創如何保留背肌並加速康復',
        '學會術後五大照護核心：「先穿再坐、先躺再脫」背架口訣、圓滾木翻身四步驟、傷口防水與日常禁忌，並可一鍵複製分享給家人',
        '學會 McGill 護脊三大動作與骨鬆長者的安全復健及防跌運動處方',
      ],
      stats: [
        { value: '80%', label: '成人一生中曾歷經下背痛' },
        { value: 'T ≤ -2.5', label: '骨質疏鬆診斷標準門檻' },
        { value: '< 1 cm', label: '雙通道內視鏡微創切口' },
        { value: '−45%', label: '運動＋衛教降低腰痛復發' },
      ],
      actions: (goTo) => (
        <>
          <HeroButton icon={Share2} onClick={() => goTo('SURGERY')}>
            微創手術＆可分享術後照護卡
          </HeroButton>
          <HeroButton icon={Bone} onClick={() => goTo('FRACTURE')}>
            壓迫性骨折與骨泥照護
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
    disclaimer="本專區依據 WHO 2023、NICE NG59、ACP 2017、AO Spine 等國際指引，並參考臺中市立老人復健綜合醫院（委託中國醫藥大學興建經營）骨科部／微創脊椎中心（張建鈞副院長團隊）與台灣各大醫學中心正式臨床照護衛教資料編寫，提供健康教育與家屬照護參考，不能取代主治醫師之個別診斷與醫囑。最後審閱：2026 年 10 月。"
  />
);

