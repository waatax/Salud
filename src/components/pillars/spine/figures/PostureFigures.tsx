import React from 'react';
import { Figure, Ground, Box, Arrow, Label, PosePanel, Pose } from './StickFigure';

/**
 * Posture panels for 躺・坐・站・走. Each panel is a small self-contained drawing with a
 * ✓ / ✗ verdict; the explanatory text lives in HTML next to it so it stays legible.
 * Every pose is built from the same segment lengths (see StickFigure.SEG).
 */

// ── Lying ────────────────────────────────────────────────────────────────

const Bed: React.FC<{ y?: number }> = ({ y = 112 }) => (
  <g>
    <rect x={8} y={y} width={184} height={14} rx={4} fill="var(--viz-grid)" stroke="var(--viz-baseline)" strokeWidth={1.2} />
    <line x1={14} y1={y + 14} x2={14} y2={y + 26} stroke="var(--viz-baseline)" strokeWidth={3} strokeLinecap="round" />
    <line x1={186} y1={y + 14} x2={186} y2={y + 26} stroke="var(--viz-baseline)" strokeWidth={3} strokeLinecap="round" />
  </g>
);

const Pillow: React.FC<{ cx: number; cy: number; rx: number; ry: number }> = (p) => (
  <ellipse {...p} fill="var(--anat-disc)" opacity={0.55} stroke="var(--anat-disc-core)" strokeWidth={1.2} />
);

const SUPINE_KNEE_PILLOW: Pose = { hip: [112, 106], torso: 270, neck: 275, arm: [90, 90], leg: [62, 117, 0] };

export const SleepSupine: React.FC = () => (
  <PosePanel title="仰睡：膝下墊枕＋頸枕填滿空隙" verdict="good" caption="膝蓋微彎讓腰放鬆；頸枕支撐脖子，額頭與下巴約同高。" viewBox="0 70 200 70" label="仰睡時膝下與頸部各墊一個枕頭的示意圖">
    <Bed />
    <Pillow cx={50} cy={109} rx={18} ry={5.5} />
    <Pillow cx={140} cy={106} rx={15} ry={7} />
    <Figure pose={SUPINE_KNEE_PILLOW} tone="good" />
  </PosePanel>
);

/** Viewed from behind the sleeper: is the neck in line with the rest of the spine? */
const SideAlign: React.FC<{ head: number; pillowTop: number; good: boolean }> = ({ head, pillowTop, good }) => {
  const spineY = 71;
  const neckColor = good ? 'var(--viz-good)' : 'var(--viz-bad)';
  return (
    <g>
      <rect x={8} y={96} width={184} height={14} rx={4} fill="var(--viz-grid)" stroke="var(--viz-baseline)" strokeWidth={1.2} />
      <rect x={22} y={pillowTop} width={62} height={96 - pillowTop} rx={6} fill="var(--anat-disc)" opacity={0.55} stroke="var(--anat-disc-core)" strokeWidth={1.2} />
      {/* torso seen from behind, lying on its left side */}
      <rect x={80} y={46} width={100} height={50} rx={14} fill="var(--anat-skin)" stroke="var(--anat-figure)" strokeWidth={1.5} />
      {/* thoracolumbar spine */}
      <line x1={86} y1={spineY} x2={176} y2={spineY} stroke="var(--viz-good)" strokeWidth={4} strokeLinecap="round" />
      {[96, 110, 124, 138, 152, 166].map((x) => (
        <circle key={x} cx={x} cy={spineY} r={2.6} fill="var(--viz-surface)" stroke="var(--viz-good)" strokeWidth={1.4} />
      ))}
      {/* neck to head */}
      <line x1={86} y1={spineY} x2={58} y2={head} stroke={neckColor} strokeWidth={4} strokeLinecap="round" />
      <circle cx={52} cy={head} r={13} fill="var(--anat-skin)" stroke="var(--anat-figure)" strokeWidth={1.5} />
      {/* reference line */}
      <line x1={22} y1={spineY} x2={192} y2={spineY} stroke="var(--viz-ink-2)" strokeWidth={1} strokeDasharray="3 3" opacity={0.7} />
    </g>
  );
};

export const SleepSideTrio: React.FC = () => (
  <div className="grid grid-cols-3 gap-2">
    <PosePanel title="枕頭太低" verdict="bad" caption="頭往床歪，頸部側邊被擠壓" viewBox="0 0 200 118" label="側睡枕頭太低，頸椎往下彎">
      <SideAlign head={84} pillowTop={90} good={false} />
    </PosePanel>
    <PosePanel title="剛好" verdict="good" caption="頸椎與背部在同一直線" viewBox="0 0 200 118" label="側睡枕頭高度剛好，頸椎與脊椎成一直線">
      <SideAlign head={71} pillowTop={77} good />
    </PosePanel>
    <PosePanel title="枕頭太高" verdict="bad" caption="頭往上翹，另一側被拉扯" viewBox="0 0 200 118" label="側睡枕頭太高，頸椎往上彎">
      <SideAlign head={55} pillowTop={61} good={false} />
    </PosePanel>
  </div>
);

export const LogRollSteps: React.FC = () => {
  const p1: Pose = { hip: [118, 106], torso: 270, neck: 272, arm: [92, 90], leg: [48, 145, 20] };
  const p2: Pose = { hip: [118, 106], torso: 270, neck: 272, arm: [170, 110], leg: [118, 210, 120], spine: 'neutral' };
  const p3: Pose = { hip: [100, 106], torso: 352, neck: 0, arm: [205, 178], leg: [88, 180, 90] };
  return (
    <div className="grid grid-cols-3 gap-2">
      <PosePanel title="① 仰躺屈膝" caption="雙膝彎起、雙腳踩床" viewBox="0 58 200 82" label="起床第一步：仰躺並彎曲雙膝">
        <Bed />
        <Pillow cx={56} cy={109} rx={16} ry={5} />
        <Figure pose={p1} tone="good" />
      </PosePanel>
      <PosePanel title="② 整個人一起翻側躺" caption="肩膀、骨盆同時轉，不扭腰" viewBox="0 58 200 82" label="起床第二步：身體像木頭一樣整體翻成側躺">
        <Bed />
        <Pillow cx={56} cy={109} rx={16} ry={5} />
        <Figure pose={p2} tone="good" />
        <Arrow from={[96, 84]} to={[124, 84]} curve={-8} />
      </PosePanel>
      <PosePanel title="③ 腳放下、手撐起" caption="雙腳移出床緣時用手把身體推起" viewBox="0 30 200 110" label="起床第三步：雙腳移下床緣並用手撐起上半身">
        <Bed />
        <Figure pose={p3} tone="good" />
        <Arrow from={[70, 92]} to={[86, 74]} curve={6} />
      </PosePanel>
    </div>
  );
};

// ── Sitting ──────────────────────────────────────────────────────────────

const Chair: React.FC<{ seatY: number; x: number; lumbar?: boolean }> = ({ seatY, x, lumbar }) => (
  <g>
    <rect x={x} y={seatY} width={44} height={6} rx={2} fill="var(--viz-grid)" stroke="var(--viz-baseline)" strokeWidth={1.2} />
    <line x1={x + 2} y1={seatY} x2={x - 4} y2={seatY - 48} stroke="var(--viz-baseline)" strokeWidth={4} strokeLinecap="round" />
    <line x1={x + 22} y1={seatY + 6} x2={x + 22} y2={140} stroke="var(--viz-baseline)" strokeWidth={3} strokeLinecap="round" />
    <line x1={x + 8} y1={140} x2={x + 36} y2={140} stroke="var(--viz-baseline)" strokeWidth={3} strokeLinecap="round" />
    {lumbar && <rect x={x - 3} y={seatY - 24} width={9} height={14} rx={4} fill="var(--viz-series-1)" opacity={0.75} />}
  </g>
);

export const DeskGood: React.FC = () => {
  const pose: Pose = { hip: [60, 110], torso: -6, neck: 0, arm: [176, 92], leg: [90, 180, 90] };
  return (
    <PosePanel title="螢幕與眼同高、靠著椅背" verdict="good" caption="手肘約 90°、雙腳平放、腰後有支撐" label="正確的辦公坐姿：螢幕上緣與眼睛同高、背靠椅背、腰部有靠墊">
      <Chair seatY={113} x={46} lumbar />
      <Box x={74} y={93} w={120} h={5} />
      <line x1={180} y1={98} x2={180} y2={140} stroke="var(--viz-baseline)" strokeWidth={3} strokeLinecap="round" />
      {/* monitor */}
      <rect x={124} y={48} width={6} height={32} rx={1.5} fill="var(--anat-figure)" />
      <line x1={127} y1={80} x2={127} y2={93} stroke="var(--anat-figure)" strokeWidth={3} />
      <line x1={58} y1={52} x2={124} y2={52} stroke="var(--viz-series-1)" strokeWidth={1.3} strokeDasharray="3 3" />
      <Ground y={141} />
      <Figure pose={pose} tone="good" />
    </PosePanel>
  );
};

export const DeskBad: React.FC = () => {
  const pose: Pose = { hip: [72, 110], torso: 26, neck: 58, arm: [150, 100], leg: [92, 175, 90], spine: 'flex' };
  return (
    <PosePanel title="筆電放桌上、身體往前探" verdict="bad" caption="低頭＋駝背，頸椎與下背持續受力" label="不良坐姿：低頭看筆電、身體前傾駝背">
      <Chair seatY={113} x={52} />
      <Box x={84} y={93} w={110} h={5} />
      <line x1={180} y1={98} x2={180} y2={140} stroke="var(--viz-baseline)" strokeWidth={3} strokeLinecap="round" />
      {/* laptop */}
      <line x1={112} y1={92} x2={136} y2={92} stroke="var(--anat-figure)" strokeWidth={3} strokeLinecap="round" />
      <line x1={136} y1={92} x2={141} y2={72} stroke="var(--anat-figure)" strokeWidth={3} strokeLinecap="round" />
      <Ground y={141} />
      <Figure pose={pose} tone="bad" />
    </PosePanel>
  );
};

export const PhonePair: React.FC = () => {
  const bad: Pose = { hip: [80, 81], torso: 4, neck: 56, arm: [170, 60], arm2: [172, 70], leg: [180, 180, 90] };
  const good: Pose = { hip: [80, 81], torso: 0, neck: 2, arm: [122, 2], arm2: [130, 10], leg: [180, 180, 90] };
  return (
    <div className="grid grid-cols-2 gap-2">
      <PosePanel title="低頭滑手機" verdict="bad" caption="低頭 60° 時頸椎等效負荷約 27 公斤" label="低頭看手機的姿勢">
        <Ground y={140} />
        <Figure pose={bad} tone="bad" />
        <rect x={96} y={47} width={5} height={10} rx={1} fill="var(--viz-series-1)" transform="rotate(-30 98 52)" />
      </PosePanel>
      <PosePanel title="手機舉到眼前" verdict="good" caption="手肘靠身體，頭維持在肩膀正上方" label="將手機舉到眼睛高度的姿勢">
        <Ground y={140} />
        <Figure pose={good} tone="good" />
        <rect x={96} y={22} width={5} height={11} rx={1} fill="var(--viz-series-1)" />
      </PosePanel>
    </div>
  );
};

// ── Standing ─────────────────────────────────────────────────────────────

export const StandPair: React.FC = () => {
  const bad: Pose = { hip: [62, 81], torso: 34, neck: 58, arm: [150, 160], leg: [184, 178, 90], spine: 'flex' };
  const good: Pose = { hip: [68, 81], torso: 4, neck: 6, arm: [160, 112], leg: [125, 175, 90], leg2: [180, 180, 90] };
  return (
    <div className="grid grid-cols-2 gap-2">
      <PosePanel title="工作檯太低，整段時間彎腰" verdict="bad" caption="站著前彎時，椎間盤壓力約為站直的 2 倍" label="在過低的流理台前彎腰工作">
        <Box x={100} y={104} w={92} h={36} />
        <Ground y={140} />
        <Figure pose={bad} tone="bad" />
      </PosePanel>
      <PosePanel title="一腳踩小凳、檯面約手肘下 10–15 cm" verdict="good" caption="兩腳每隔幾分鐘交換" label="一腳踩在小凳上、身體挺直在流理台前工作">
        <Box x={98} y={72} w={94} h={68} />
        <Box x={84} y={126} w={24} h={14} fill="var(--viz-surface)" />
        <Ground y={140} />
        <Figure pose={good} tone="good" />
      </PosePanel>
    </div>
  );
};

// ── Moving / lifting ─────────────────────────────────────────────────────

export const LiftPair: React.FC = () => {
  const bad: Pose = { hip: [62, 81], torso: 100, neck: 122, arm: [180, 180], leg: [182, 178, 90], spine: 'flex' };
  const good: Pose = { hip: [54, 112], torso: 36, neck: 22, arm: [168, 176], leg: [75, 200, 90], spine: 'neutral' };
  return (
    <div className="grid grid-cols-2 gap-2">
      <PosePanel title="膝蓋打直、彎腰駝背提" verdict="bad" caption="20 kg：椎間盤壓力約 2.3 MPa（站立的 4.6 倍）" label="錯誤提重物：膝蓋伸直、彎腰駝背">
        <Box x={92} y={124} w={30} h={16} fill="var(--anat-bone)" />
        <Ground y={140} />
        <Figure pose={bad} tone="bad" />
        <Label x={150} y={40} size={13} tone="bad">
          2.3 MPa
        </Label>
      </PosePanel>
      <PosePanel title="屈膝屈髖、物品貼近身體" verdict="good" caption="屈膝提約 1.7 MPa；貼近身體拿著約 1.1 MPa" label="正確提重物：屈膝蹲下、背部打直、物品貼近身體">
        <Box x={84} y={118} w={26} h={22} fill="var(--anat-bone)" />
        <Ground y={140} />
        <Figure pose={good} tone="good" />
        <Label x={150} y={40} size={13} tone="good">
          1.1–1.7 MPa
        </Label>
      </PosePanel>
    </div>
  );
};

export const POSTURE_FIGURES: Record<string, React.FC> = {
  'sleep-supine': SleepSupine,
  'sleep-side': SleepSideTrio,
  logroll: LogRollSteps,
  'desk-good': () => (
    <div className="grid grid-cols-2 gap-2">
      <DeskBad />
      <DeskGood />
    </div>
  ),
  phone: PhonePair,
  'stand-stool': StandPair,
  lift: LiftPair,
};
