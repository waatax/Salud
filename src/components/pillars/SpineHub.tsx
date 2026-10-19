import React from 'react';
import { Bone, Siren, Share2, HeartHandshake, Activity, Zap, Stethoscope, ShieldCheck } from 'lucide-react';
import { SPINE_TABS } from '../../config/routes';
import { SpineTab, SPINE_MYTHS, SPINE_QUIZ } from '../../data/spineData';
import {
  SPINE_COURSE_CHAPTERS,
  SPINE_CARE_MYTHS,
  SPINE_CARE_QUIZ,
  SPINE_CARE_CHAPTER_SOURCES,
  ALL_SPINE_SOURCES,
  SPINE_UNITS,
  SPINE_PATHS,
  SpinePathIcon,
} from '../../data/spineCareData';
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
import { AcuteChapter, ChronicChapter, CaregiverChapter, SpecialChapter } from './spine/SpineCareChapters';

/**
 * SpineHub — 脊椎照護全方位專區 (v4.9): a 16-chapter course in six units, from anatomy and
 * symptoms through pain care, bone health, surgery and home caregiving to prevention and
 * the safety net, on the shared CourseShell template with situation-based entry paths.
 */

const SOURCES = Object.fromEntries(
  Object.entries({ ...CHAPTER_SOURCES, ...SPINE_CARE_CHAPTER_SOURCES }).map(([tab, ids]) => [
    tab,
    ids.map((id) => ALL_SPINE_SOURCES[id]).filter(Boolean) as CourseSource[],
  ])
) as Partial<Record<SpineTab, CourseSource[]>>;

const PATH_ICONS: Record<SpinePathIcon, typeof Bone> = {
  flare: Zap,
  chronic: Activity,
  surgery: Stethoscope,
  caregiver: HeartHandshake,
  prevent: ShieldCheck,
};

const PATHS = SPINE_PATHS.map((p) => ({ label: p.label, hint: p.hint, icon: PATH_ICONS[p.key], chapters: p.chapters }));

export const SpineHub: React.FC = () => (
  <CourseShell<SpineTab>
    hubKey="spine"
    tabs={SPINE_TABS}
    chapters={SPINE_COURSE_CHAPTERS}
    views={{
      OVERVIEW: OverviewChapter,
      SPURS: SpursChapter,
      NUMBNESS: NumbnessChapter,
      ACUTE: AcuteChapter,
      TREATMENT: TreatmentChapter,
      MEDS: MedsChapter,
      CHRONIC: ChronicChapter,
      OSTEOPOROSIS: OsteoporosisChapter,
      FRACTURE: FractureChapter,
      SURGERY: SurgeryChapter,
      REHAB: RehabChapter,
      CAREGIVER: CaregiverChapter,
      POSTURE: PostureChapter,
      EXERCISE: ExerciseChapter,
      SPECIAL: SpecialChapter,
      TRIAGE: TriageChapter,
    }}
    units={SPINE_UNITS}
    paths={PATHS}
    myths={[...SPINE_MYTHS, ...SPINE_CARE_MYTHS]}
    quiz={{ ...SPINE_QUIZ, ...SPINE_CARE_QUIZ }}
    sources={SOURCES}
    tabTone="sky"
    ariaLabel="脊椎照護專區章節"
    hero={{
      icon: Bone,
      tone: 'sky',
      eyebrow: '症狀與疾病專區 · 脊椎照護全方位課程',
      title: '脊椎照護：從急性腰痛、慢性疼痛、骨鬆骨折、微創手術到家屬居家照護',
      lead: (
        <>
          脖子痠、腰背痛、骨質流失、手腳發麻，或家人術後返家需要照顧——本專區整合 WHO 2023、NICE NG59、ACP 2017、AO Spine 等國際指引、台灣醫學中心護理規範與
          <strong>臺中市立老人復健綜合醫院（中國醫大經營）骨科部微創脊椎中心張建鈞副院長團隊</strong>的臨床經驗，以 6 個單元、16 章完整說明
          <strong>急性發作 72 小時照護、慢性疼痛與重返工作、骨質疏鬆與壓迫性骨折、3D 導航微創手術、術後復健、家屬翻身移位與防壓瘡，以及脊椎側彎、僵直性脊椎炎與孕產期腰痛</strong>。
        </>
      ),
      helps: [
        '閃到腰或落枕時，照 72 小時計畫照顧自己，並知道哪些警訊不能等',
        '痛超過三個月時，用疼痛科學與節律活動把生活拿回來，循序重返工作',
        '看懂骨鬆、壓迫性骨折與微創手術（PKP/PVP、UBE、OLIF）的選擇與風險',
        '家屬學會翻身、移位、防壓瘡、居家防跌與長照 2.0 資源申請',
        '辨識青少年側彎、發炎性背痛與孕產期腰痛，找到對的科別',
      ],
      stats: [
        { value: '80%', label: '成人一生中曾歷經下背痛' },
        { value: '6 週', label: '多數急性腰痛明顯改善' },
        { value: '每 2 小時', label: '臥床者翻身防壓瘡' },
      ],
      actions: (goTo) => (
        <>
          <HeroButton icon={Zap} onClick={() => goTo('ACUTE')}>
            急性發作 72 小時照護
          </HeroButton>
          <HeroButton icon={HeartHandshake} onClick={() => goTo('CAREGIVER')}>
            家屬居家照護指南
          </HeroButton>
          <HeroButton icon={Share2} onClick={() => goTo('SURGERY')}>
            微創手術＆術後照護卡
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
          <strong>立即就醫：</strong>大小便解不出或失禁、會陰部麻木、雙腿快速無力、背痛合併發燒或癌症病史、突然單側臉手腳麻或說話不清。
        </>
      ),
      cta: '檢查我的狀況',
      target: 'TRIAGE',
    }}
    related={{
      title: '讀完脊椎照護專區，接著可以看',
      items: [
        { hash: 'exercise/mobility', label: '伸展與筋膜', hint: '活動度與柔軟度訓練' },
        { hash: 'exercise/strength', label: '重量訓練', hint: '安全地練核心與下肢肌力' },
        { hash: 'systems/musculoskeletal/conditions', label: '肌肉骨骼系統疾病', hint: '骨質疏鬆、關節炎、肌少症' },
        { hash: 'mindbody/SLEEP_PLAN', label: '睡眠與身心修復', hint: '睡不好會放大疼痛' },
        { hash: 'learn/spine', label: '脊椎與神經小課', hint: '白話課＋小測驗' },
      ],
    }}
    disclaimer="本專區依據 WHO 2023、NICE NG59、ACP 2017、AO Spine、EPUAP/NPIAP 2019、ASAS-EULAR 2022、SOSORT 2016 等國際指引，並參考臺中市立老人復健綜合醫院（委託中國醫藥大學興建經營）骨科部／微創脊椎中心（張建鈞副院長團隊）與台灣各大醫學中心正式臨床照護衛教資料編寫，提供健康教育與家屬照護參考，不能取代主治醫師之個別診斷與醫囑。最後審閱：2026 年 10 月。"
  />
);
