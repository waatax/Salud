import React from 'react';
import { FigureFrame } from '../../common/pro/Blocks';
import { SpineColumnFigure, MotionSegmentFigure, AnatomyLegend } from './figures/AnatomyFigures';
import { ImagingSmallMultiples, DiscPressureChart, RegressionChart, TreatmentLadderFigure } from './figures/ChartFigures';
import { NumbPatternFigure, HandMapsFigure } from './figures/NerveFigures';
import { LiftPair } from './figures/PostureFigures';

/**
 * Lesson infographics for track 8 (脊椎與神經). Loaded lazily from the lesson page so
 * the other 54 lessons do not ship the spine drawings.
 */
const SpineLessonVisual: React.FC<{ lessonId: string }> = ({ lessonId }) => {
  switch (lessonId) {
    case 'L-SPN-01':
      return (
        <FigureFrame number="圖解" title="脊椎側面：三段彎曲與脊髓的終點" source="標準解剖學；ASIA ISNCSCI">
          <div className="max-w-sm mx-auto">
            <SpineColumnFigure />
          </div>
        </FigureFrame>
      );
    case 'L-SPN-02':
      return (
        <div className="space-y-4">
          <FigureFrame number="圖解" title="退化三階段：椎間盤變薄 → 骨刺 → 神經孔狹窄">
            <MotionSegmentFigure />
            <div className="mt-3">
              <AnatomyLegend />
            </div>
          </FigureFrame>
          <FigureFrame number="數據" title="無症狀者 MRI 也常見退化（依年齡）" source="Brinjikji 2015, AJNR" note={false}>
            <ImagingSmallMultiples />
          </FigureFrame>
        </div>
      );
    case 'L-SPN-03':
      return (
        <div className="space-y-4">
          <FigureFrame number="圖解" title="七種常見的「麻」分布型態" note="示意圖；分布範圍因人而異。">
            <NumbPatternFigure />
          </FigureFrame>
          <FigureFrame number="圖解" title="手麻：神經根 vs 腕部神經" source="ASIA ISNCSCI；周邊神經解剖">
            <HandMapsFigure />
          </FigureFrame>
        </div>
      );
    case 'L-SPN-04':
      return (
        <div className="space-y-4">
          <FigureFrame number="數據" title="不同姿勢的腰椎椎間盤壓力" source="Wilke 1999, Spine" note="單一受試者活體量測，適合比較相對大小。">
            <DiscPressureChart />
          </FigureFrame>
          <FigureFrame number="圖解" title="提重物：彎腰駝背 vs 屈膝貼近身體" source="Wilke 1999, Spine">
            <LiftPair />
          </FigureFrame>
        </div>
      );
    case 'L-SPN-05':
      return (
        <div className="grid gap-4 lg:grid-cols-2">
          <FigureFrame number="圖解" title="治療階梯：從最低風險開始" source="WHO 2023；ACP 2017；NICE NG59" note={false}>
            <TreatmentLadderFigure />
          </FigureFrame>
          <FigureFrame number="數據" title="椎間盤突出自行縮小的機率" source="Chiu 2015, Clin Rehabil" note={false}>
            <RegressionChart />
          </FigureFrame>
        </div>
      );
    default:
      return null;
  }
};

export default SpineLessonVisual;
