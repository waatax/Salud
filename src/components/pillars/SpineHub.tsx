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
import {
  PeripheralNerveChapter,
  KneeHipOaChapter,
  ShoulderUpperChapter,
  AnkleFootNeuroChapter,
} from './spine/SpineNeuroOrthoChapters';

/**
 * SpineHub — 神經骨科與脊椎關節全方位專區 (v5.2): a 20-chapter course in seven units, covering
 * cervical/lumbar spine, bone health, minimally invasive spine surgery, caregiving, AND
 * peripheral nerve entrapment (carpal/cubital tunnel, piriformis, foot drop), knee/hip OA,
 * shoulder rotator cuff/frozen shoulder, and ankle/foot neuro-gait disorders.
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
      PERIPHERAL_NERVE: PeripheralNerveChapter,
      KNEE_HIP_OA: KneeHipOaChapter,
      SHOULDER_UPPER: ShoulderUpperChapter,
      ANKLE_FOOT_NEURO: AnkleFootNeuroChapter,
      TRIAGE: TriageChapter,
    }}
    units={SPINE_UNITS}
    paths={PATHS}
    myths={[...SPINE_MYTHS, ...SPINE_CARE_MYTHS]}
    quiz={{ ...SPINE_QUIZ, ...SPINE_CARE_QUIZ }}
    sources={SOURCES}
    tabTone="sky"
    ariaLabel="神經骨科與脊椎關節專區章節"
    hero={{
      icon: Bone,
      tone: 'sky',
      eyebrow: '專科深度教室 · 神經骨科與脊椎關節全方位課程',
      title: '神經骨科與脊椎關節：從頸腰椎骨刺、骨鬆骨折、微創手術到腕隧道、膝髖退化與五十肩旋轉肌',
      lead: (
        <>
          脖子痠、腰背痛、手麻腳麻、膝蓋退化蹲不下、肩膀舉不高或腳跟踩地劇痛——本專區整合 WHO 2023、NICE NG59、AAOS 美國骨科醫學會、OARSI、AO Spine 等國際指引與
          <strong>臺中市立老人復健綜合醫院（中國醫大經營）骨科部微創脊椎中心張建鈞副院長團隊</strong>的臨床經驗，以 7 個單元、20 章完整涵蓋
          <strong>頸腰椎神經壓迫、急性 72 小時照護、骨質疏鬆與壓迫性骨折、3D 導航微創脊椎手術、腕肘隧道周邊神經卡壓、退化性膝髖關節炎（玻尿酸/PRP/保膝截骨/人工關節）、五十肩 vs 旋轉肌撕裂，以及足底筋膜炎與神經步態鑑別</strong>。
        </>
      ),
      helps: [
        '分辨手腳發麻是「頸腰椎骨刺壓迫」還是「腕隧道／肘隧道／梨狀肌／腓總神經卡壓」',
        '看懂退化性膝髖關節炎 KL 1–4 期、玻尿酸／PRP 實證、HTO 保膝截骨與微創人工關節置換',
        '10 秒分辨「五十肩（關節囊沾黏）」與「旋轉肌袖撕裂」，學會足底筋膜炎下床前伸展與踝扭傷 PEACE & LOVE',
        '掌握骨鬆骨折、微創脊椎手術（PKP/PVP、UBE、OLIF）、術後復健與家屬翻身移位防壓瘡技巧',
      ],
      stats: [
        { value: '20 章', label: '脊椎＋四肢關節＋周邊神經全圖解' },
        { value: '1:4', label: '每減重 1kg 膝關節減壓 4kg' },
        { value: '每 2 小時', label: '臥床者翻身防壓瘡' },
      ],
      actions: (goTo) => (
        <>
          <HeroButton primary icon={Zap} onClick={() => goTo('PERIPHERAL_NERVE')}>
            腕隧道 vs 頸腰椎手腳麻
          </HeroButton>
          <HeroButton icon={Activity} onClick={() => goTo('KNEE_HIP_OA')}>
            膝髖退化與保膝/換關節
          </HeroButton>
          <HeroButton icon={Share2} onClick={() => goTo('SHOULDER_UPPER')}>
            五十肩 vs 旋轉肌撕裂
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
          <strong>立即就醫：</strong>大小便解不出或失禁、會陰部麻木、雙腿快速無力或垂足（腳板翹不起來）、大拇指或虎口肌肉明顯凹陷萎縮、背痛合併發燒或癌症病史。
        </>
      ),
      cta: '檢查我的狀況',
      target: 'TRIAGE',
    }}
    related={{
      title: '讀完神經骨科與脊椎關節專區，接著可以看',
      items: [
        { hash: 'exercise/mobility', label: '伸展與筋膜', hint: '活動度與柔軟度訓練' },
        { hash: 'exercise/strength', label: '重量訓練', hint: '安全地練核心與股四頭肌肌力' },
        { hash: 'systems/musculoskeletal/conditions', label: '肌肉骨骼系統疾病', hint: '骨質疏鬆、關節炎、肌少症' },
        { hash: 'ltc', label: '長照 2.0 與輔具補助專區', hint: '居家無障礙扶手與復能服務' },
        { hash: 'learn/spine', label: '脊椎與神經小課', hint: '白話課＋小測驗' },
      ],
    }}
    disclaimer="本專區依據 WHO 2023、NICE NG59、AAOS 美國骨科醫學會、OARSI、AANEM、AO Spine、EPUAP/NPIAP 2019、ASAS-EULAR 2022 等國際指引，並參考臺中市立老人復健綜合醫院（委託中國醫藥大學興建經營）骨科部／微創脊椎中心（張建鈞副院長團隊）與台灣各大醫學中心正式臨床照護衛教資料編寫，提供健康教育與家屬照護參考，不能取代主治醫師之個別診斷與醫囑。最後審閱：2026 年 10 月。"
  />
);
