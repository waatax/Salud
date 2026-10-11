import React from 'react';
import { FigureFrame } from '../../common/pro/Blocks';
import { VirusFigure, LiverProgressionFigure } from './HepbFigures';

/** Lesson infographic for L-PRE-10 (B 型肝炎), loaded lazily from the lesson page. */
const HepbLessonVisual: React.FC = () => (
  <div className="space-y-4">
    <FigureFrame number="圖解" title="B 肝病毒的構造與檢驗對應" source="標準病毒學">
      <VirusFigure />
    </FigureFrame>
    <FigureFrame number="圖解" title="慢性 B 肝可能的進程" source="WHO 2024；EASL 2017">
      <LiverProgressionFigure />
    </FigureFrame>
  </div>
);

export default HepbLessonVisual;
