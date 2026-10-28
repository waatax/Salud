import React from 'react';
import { Flame, Activity, ShieldCheck, Microscope, Siren, Stethoscope } from 'lucide-react';
import {
  GastroTab,
  GASTRO_TABS,
  GASTRO_PATHS,
  GASTRO_UNITS,
  GASTRO_CHAPTERS,
  GASTRO_MYTHS,
  GASTRO_QUIZ,
  GASTRO_SOURCES,
  GASTRO_CHAPTER_SOURCES,
  GastroPathIcon,
} from '../../data/gastroData';
import { CourseShell, CourseSource } from '../common/pro/CourseShell';
import { HeroButton } from '../common/pro/HubHero';
import {
  GastroOverviewChapter,
  GerdUlcerChapter,
  HpGastricChapter,
  IbsFodmapChapter,
  IbdCareChapter,
  CrcPolypsChapter,
  MasldFattyChapter,
  HepatitisBcChapter,
  CirrhosisPortalChapter,
  GallbladderBileChapter,
  PancreasCareChapter,
  EndoscopyTriageChapter,
} from './gastro/GastroChapters';

/**
 * GastroHub — 肝膽腸胃科全方位臨床專區 (v5.2)
 * 涵蓋 5 大單元、12 個深度圖解章節：食道胃十二指腸、腸躁症與發炎性腸病、大腸息肉與癌篩、
 * 代謝性脂肪肝與 FIB-4 評估、B/C 型肝炎與肝硬化門脈高壓、膽結石膽管炎與胰臟炎、內視鏡準備與急症分流。
 */

const SOURCES = Object.fromEntries(
  Object.entries(GASTRO_CHAPTER_SOURCES).map(([tab, ids]) => [
    tab,
    ids.map((id) => GASTRO_SOURCES[id]).filter(Boolean) as CourseSource[],
  ])
) as Partial<Record<GastroTab, CourseSource[]>>;

const PATH_ICONS: Record<GastroPathIcon, typeof Flame> = {
  reflux: Flame,
  gut: Activity,
  liver: ShieldCheck,
  biliary: Siren,
  scope: Microscope,
  redflag: Stethoscope,
};

const PATHS = GASTRO_PATHS.map((p) => ({
  label: p.label,
  hint: p.hint,
  icon: PATH_ICONS[p.key],
  chapters: p.chapters,
}));

export const GastroHub: React.FC = () => (
  <CourseShell<GastroTab>
    hubKey="gastro"
    tabs={GASTRO_TABS}
    chapters={GASTRO_CHAPTERS}
    views={{
      OVERVIEW: GastroOverviewChapter,
      GERD_ULCER: GerdUlcerChapter,
      HP_GASTRIC: HpGastricChapter,
      IBS_FODMAP: IbsFodmapChapter,
      IBD_CARE: IbdCareChapter,
      CRC_POLYPS: CrcPolypsChapter,
      MASLD_FATTY: MasldFattyChapter,
      HEPATITIS_BC: HepatitisBcChapter,
      CIRRHOSIS_PORTAL: CirrhosisPortalChapter,
      GALLBLADDER_BILE: GallbladderBileChapter,
      PANCREAS_CARE: PancreasCareChapter,
      ENDOSCOPY_TRIAGE: EndoscopyTriageChapter,
    }}
    units={GASTRO_UNITS}
    paths={PATHS}
    myths={GASTRO_MYTHS}
    quiz={GASTRO_QUIZ}
    sources={SOURCES}
    tabTone="emerald"
    ariaLabel="肝膽腸胃科專區章節"
    hero={{
      icon: Stethoscope,
      tone: 'emerald',
      eyebrow: '專科深度教室 · 肝膽腸胃科全方位課程',
      title: '肝膽腸胃科：從胃食道逆流、幽門桿菌、腸躁症、大腸息肉到脂肪肝、B/C 肝與膽胰照護',
      lead: (
        <>
          火燒心、胃痛、常拉肚子或便秘、健檢發現脂肪肝與膽結石，或收到糞便潛血陽性通知不知所措——本專區整合
          <strong>美國胃腸病學院（ACG 2022–2024）、歐洲肝病學會（EASL 2024 MASLD）、Maastricht VI 幽門桿菌共識、東京指引（TG18）與台灣消化系醫學會／國健署篩檢規範</strong>，
          以 5 個單元、12 章深度圖解與互動工具，帶您一次掌握上消化道、大小腸微生態、肝臟纖維化逆轉、膽胰急症與無痛內視鏡全攻略。
        </>
      ),
      helps: [
        '搞懂火燒心與胃潰瘍用藥時機，以及如何徹底根除「第一類致癌物」幽門螺旋桿菌',
        '用低 FODMAP 三階段飲食穩定腸躁症，並看懂大腸鏡息肉報告與追蹤年限',
        '線上計算 FIB-4 肝纖維化風險，掌握減重 3–7–10% 逆轉脂肪肝與 C 肝口服新藥根治關鍵',
        '做無痛大腸鏡前 3 天低渣飲食與分次清腸 SOP，一眼辨識黑便、血便、灰白便與膽胰急診警訊',
      ],
      stats: [
        { value: '1/3', label: '台灣成人患代謝性脂肪肝' },
        { value: '98%+', label: 'C 型肝炎全口服新藥根治率' },
        { value: '45–74 歲', label: '公費大腸癌與幽門桿菌篩檢' },
      ],
      actions: (goTo) => (
        <>
          <HeroButton primary icon={Flame} onClick={() => goTo('GERD_ULCER')}>
            逆流與潰瘍照護
          </HeroButton>
          <HeroButton icon={ShieldCheck} onClick={() => goTo('MASLD_FATTY')}>
            算算我的 FIB-4 肝纖維化
          </HeroButton>
          <HeroButton icon={Microscope} onClick={() => goTo('CRC_POLYPS')}>
            大腸息肉與癌篩追蹤
          </HeroButton>
          <HeroButton icon={Siren} onClick={() => goTo('ENDOSCOPY_TRIAGE')}>
            大腸鏡清腸與腹痛便色紅旗
          </HeroButton>
        </>
      ),
    }}
    alert={{
      text: (
        <>
          <strong>立即急診警訊：</strong>吐鮮血或咖啡渣嘔吐物、解柏油般發亮黑便或大量鮮血便伴頭暈冷汗、右上腹劇痛合併高燒寒顫與眼黃茶色尿（急性膽管炎）、上腹刀割劇痛鑽向後背（急性胰臟炎）。
        </>
      ),
      cta: '查看腹痛與便色急症分流',
      target: 'ENDOSCOPY_TRIAGE',
    }}
    related={{
      title: '讀完肝膽腸胃科專區，接著可以看',
      items: [
        { hash: 'hepb', label: 'B 型肝炎深度專區', hint: '帶原追蹤、表面抗原與抗病毒藥' },
        { hash: 'oncology/COLORECTAL_CANCER', label: '大腸直腸癌與肝膽胰癌', hint: '癌症篩檢與精準醫療專區' },
        { hash: 'diet', label: '飲食模式與腸道營養', hint: '地中海飲食與高纖抗發炎' },
        { hash: 'checkup/labs', label: '健檢報告紅字解讀', hint: 'AST/ALT、膽紅素與血脂判讀' },
      ],
    }}
    disclaimer="本專區依據 ACG 2022–2024、AGA、EASL-EASD-EASO 2024 MASLD、AASLD 2023、Maastricht VI、Tokyo Guidelines (TG18)、USMSTF 2025 與台灣消化系醫學會／國民健康署最新臨床實證指引編寫，僅供健康教育參考，不能取代主治醫師之當面診斷與內視鏡／超音波檢查。最後審閱：2026 年 10 月。"
  />
);

export default GastroHub;
