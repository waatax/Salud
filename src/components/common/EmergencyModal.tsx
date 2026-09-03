import React from 'react';
import { Modal } from './Modal';
import { AlertOctagon, PhoneCall, ShieldAlert, HeartCrack, Droplets } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyModal: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Red Flag Engine · 醫療急症與危險訊號快速指引"
      subtitle="STOP NORMAL FLOW：若出現下列症狀，常規健康衛教完全停止，請立刻尋求醫療急救"
      maxWidth="2xl"
    >
      <div className="space-y-4 font-sans text-xs">
        {/* Urgent Hyponatremia Block */}
        <div className="p-4 rounded-xl border border-red-400 dark:border-red-500/60 bg-red-100/90 dark:bg-red-950/40 space-y-2 text-red-900 dark:text-red-100">
          <div className="flex items-center gap-2 text-red-700 dark:text-red-300 font-bold text-sm">
            <Droplets className="w-5 h-5 text-red-600 dark:text-red-400" />
            <span>1. 運動相關低血鈉（EAH）急性腦水腫警戒</span>
          </div>
          <p className="leading-relaxed">
            長跑、馬拉松或長時間勞動後出現：<strong>劇烈搏動性頭痛、噴射狀噁心嘔吐、步伐踉蹌、神智混淆、嗜睡甚至抽搐</strong>。
          </p>
          <div className="p-2.5 rounded-lg bg-red-600 text-white font-bold flex items-center gap-2 shadow-sm">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>重要急救鐵律：絕對不要繼續給予大量白開水！立即送至醫護站抽血檢查血鈉。</span>
          </div>
        </div>

        {/* Heat Stroke */}
        <div className="p-4 rounded-xl border border-orange-400 dark:border-orange-500/60 bg-orange-100/90 dark:bg-orange-950/30 space-y-2 text-orange-900 dark:text-orange-100">
          <div className="flex items-center gap-2 text-orange-700 dark:text-orange-300 font-bold text-sm">
            <AlertOctagon className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            <span>2. 熱中暑（Heat Stroke）高死亡率急症</span>
          </div>
          <p className="leading-relaxed">
            高溫環境下體溫飆升（超過 40°C）、<strong>全身皮膚乾熱突然停止流汗、意識模糊、胡言亂語或倒地昏迷</strong>。
          </p>
          <p className="text-orange-800 dark:text-orange-200 font-medium">
            急救動作：立即移到陰涼處，全身噴水、冰敷頸部/腋下/腹股溝動脈，並立即撥打 119。
          </p>
        </div>

        {/* Heart Failure & ESRD Fluid Overload */}
        <div className="p-4 rounded-xl border border-amber-400 dark:border-salud-amber/60 bg-amber-100/90 dark:bg-salud-amber-950/30 space-y-2 text-amber-900 dark:text-amber-100">
          <div className="flex items-center gap-2 text-amber-800 dark:text-salud-amber-300 font-bold text-sm">
            <HeartCrack className="w-5 h-5 text-amber-600 dark:text-salud-amber-400" />
            <span>3. 心衰竭與腎臟病體液過載（急性肺水腫）</span>
          </div>
          <p className="leading-relaxed">
            已知心臟病或透析洗腎病友，在平躺時<strong>突發嚴重呼吸困難、端坐喘息、咳出粉紅色泡沫痰、雙腳水腫蔓延</strong>。
          </p>
          <p className="text-amber-800 dark:text-amber-200 font-medium">
            急救動作：立即採半坐臥姿勢，切勿強灌水，速撥 119 叫救護車送急診。
          </p>
        </div>

        {/* Emergency contact info */}
        <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 flex items-center justify-between text-slate-800 dark:text-slate-300 font-mono">
          <span>台灣緊急救護專線：</span>
          <span className="text-red-600 dark:text-red-400 font-bold text-sm flex items-center gap-1.5">
            <PhoneCall className="w-4 h-4" /> 119
          </span>
        </div>
      </div>
    </Modal>
  );
};
