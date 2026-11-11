import React from 'react';
import { Dumbbell, GraduationCap, ClipboardCheck, Hammer, BookOpenCheck, Timer } from 'lucide-react';
import { STRENGTH_TABS } from '../../config/routes';
import {
  STRENGTH_CHAPTERS,
  StrengthTab,
  STRENGTH_MYTHS,
  STRENGTH_QUIZ,
  STRENGTH_SOURCES,
  STRENGTH_CHAPTER_SOURCES,
  STRENGTH_UNITS,
} from '../../data/strengthCoachData';
import { CourseShell, CourseSource } from '../common/pro/CourseShell';
import { HeroButton } from '../common/pro/HubHero';
import { StrengthOverview, StrengthM1, StrengthM2, StrengthM3, StrengthM4, StrengthM5 } from './strength/StrengthChapters';

/**
 * StrengthHub — 肌力訓練 (v6.7). A new topic whose first section is the TSCA 丙級肌力及體能
 * 教練證照研究 course (overview + five modules). Later sections are added as further units
 * on the same CourseShell so progress tracking and deep links (#strength/<TAB>) keep working.
 */

const SOURCES = Object.fromEntries(
  Object.entries(STRENGTH_CHAPTER_SOURCES).map(([tab, ids]) => [tab, ids.map((id) => STRENGTH_SOURCES[id]).filter(Boolean) as CourseSource[]])
) as Partial<Record<StrengthTab, CourseSource[]>>;

export const StrengthHub: React.FC = () => (
  <CourseShell<StrengthTab>
    hubKey="strength"
    tabs={STRENGTH_TABS}
    chapters={STRENGTH_CHAPTERS}
    views={{
      OVERVIEW: StrengthOverview,
      M1_SCIENCE: StrengthM1,
      M2_PROGRAM: StrengthM2,
      M3_TECHNIQUE: StrengthM3,
      M4_COACHING: StrengthM4,
      M5_EXAM: StrengthM5,
    }}
    units={STRENGTH_UNITS}
    paths={[
      { label: '第一次準備丙級', hint: '從頭建立完整觀念', icon: GraduationCap, chapters: ['OVERVIEW', 'M1_SCIENCE', 'M2_PROGRAM', 'M3_TECHNIQUE', 'M4_COACHING', 'M5_EXAM'] },
      { label: '學科考前衝刺', hint: '能量系統、變數表、週期化、模擬考', icon: BookOpenCheck, chapters: ['M1_SCIENCE', 'M2_PROGRAM', 'M5_EXAM'] },
      { label: '術科考前兩週', hint: '技術、口令、修正、保護與 10 分鐘流程', icon: Timer, chapters: ['M3_TECHNIQUE', 'M4_COACHING', 'M5_EXAM'] },
    ]}
    myths={STRENGTH_MYTHS}
    quiz={STRENGTH_QUIZ}
    sources={SOURCES}
    tabTone="indigo"
    ariaLabel="肌力訓練專區章節"
    hero={{
      icon: Dumbbell,
      tone: 'indigo',
      eyebrow: '肌力訓練 · 專題一：TSCA 丙級肌力及體能教練證照',
      title: '肌力訓練：TSCA 丙級肌力及體能教練證照研究',
      lead: (
        <>
          把丙級證照的研究大綱整理成 6 章課程：<strong>運動科學、課表與週期化、術科技術、執教與錯誤修正、營養與考場衝刺</strong>。
          每個模組都附上可複製的 AI 深度研究提示，以及逐條對照 NSCA 教科書與國際立場聲明的研究成果。
        </>
      ),
      helps: ['看懂三大能量系統與運動休息比', '照著 NSCA 變數表開出課表', '學會硬舉講義與三大錯誤修正', '用 15 題模擬考卷做總體檢'],
      stats: [
        { value: '5', label: '大模組＋大綱深度校訂' },
        { value: '15', label: '題模擬考卷＋3 題情境題' },
        { value: '10', label: '處大綱校正與補充' },
      ],
      actions: (goTo) => (
        <>
          <HeroButton icon={ClipboardCheck} onClick={() => goTo('M5_EXAM')}>
            直接做模擬考
          </HeroButton>
          <HeroButton icon={Hammer} onClick={() => goTo('M3_TECHNIQUE')}>
            硬舉教學講義
          </HeroButton>
        </>
      ),
    }}
    alert={{
      text: (
        <>
          <strong>訓練安全：</strong>大重量閉氣用力後出現劇烈頭痛、胸痛、視線模糊、單側無力或暈厥，請立即停止並就醫；有高血壓、心血管疾病或懷孕者，負重與閉氣前先諮詢醫師。
        </>
      ),
      cta: '保護與安全',
      target: 'M4_COACHING',
    }}
    related={{
      title: '讀完這個專題，接著可以看',
      items: [
        { hash: 'exercise/strength', label: '肌力與肌耐力訓練', hint: '最大肌力、肌耐力與 1RM 試算' },
        { hash: 'learn/move/L-MOVE-08', label: '最大肌力與肌耐力小課', hint: '6 分鐘白話入門' },
        { hash: 'obesity/HYPERTROPHY', label: '增肌與肌肥大', hint: '訓練量、蛋白質與恢復' },
        { hash: 'supplements', label: '保健食品的證據', hint: '肌酸、咖啡因、蛋白粉' },
      ],
    }}
    disclaimer="本專區依據 NSCA《Essentials of Strength Training and Conditioning》第 4 版、ACSM 與 ISSN 立場聲明及同儕審查文獻編寫，作為備考與教育用途；TSCA 丙級課程時數、費用、報考資格與考試細則以授證單位當期簡章為準。訓練前如有疾病或傷痛，請先諮詢醫師或物理治療師。最後審閱：2026 年 11 月。"
  />
);
