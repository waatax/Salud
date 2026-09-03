import React from 'react';
import { Modal } from './Modal';
import { useLanguage } from '../../i18n';
import { AlertOctagon, PhoneCall, ShieldAlert, HeartCrack, Droplets, Wine, Activity } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { t, language } = useLanguage();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('emergency.title')}
      subtitle={t('emergency.stop_flow')}
      maxWidth="4xl"
    >
      <div className="space-y-4 font-sans text-xs max-h-[70vh] overflow-y-auto pr-1">
        {/* 1. Acute Alcohol Poisoning (Spec §16.2 NEW in v0.3) */}
        <div className="p-4 rounded-xl border-2 border-red-500 bg-red-100/90 dark:bg-red-950/40 space-y-2 text-red-900 dark:text-red-100 shadow-md">
          <div className="flex items-center gap-2 text-red-700 dark:text-red-300 font-bold text-sm">
            <Wine className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0" />
            <span>1. 急性酒精中毒（致死性中樞呼吸抑制警戒）</span>
          </div>
          <p className="leading-relaxed font-sans">
            暴飲後出現：<strong>意識不清無法喚醒、呼吸極度緩慢或不規則（每分鐘小於 8 次）、皮膚蒼白濕冷或泛紫發紺、體溫過低、反覆嘔吐且無法保持清醒</strong>。
          </p>
          <div className="p-2.5 rounded-lg bg-red-600 text-white font-bold flex flex-col gap-1 shadow-sm font-sans">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>緊急急救鐵律（常識反應常犯致命錯誤）：</span>
            </div>
            <ul className="list-disc pl-6 text-xs font-normal space-y-0.5">
              <li><strong>立即撥打 119 送醫急救</strong>。</li>
              <li><strong>絕對不可催吐</strong>：醉酒者咽喉反射遲鈍，催吐極易引發胃內容物嗆入氣管，造成窒息死亡或吸入性肺炎。</li>
              <li><strong>絕對不可讓其獨自入睡</strong>：必須維持<strong>側臥（復甦姿勢 Recovery position）</strong>，防止嘔吐物倒流窒息。</li>
            </ul>
          </div>
        </div>

        {/* 2. Alcohol Withdrawal Crisis & Delirium Tremens (Spec §16.2 NEW) */}
        <div className="p-4 rounded-xl border border-red-400 dark:border-red-500/60 bg-red-100/90 dark:bg-red-950/40 space-y-2 text-red-900 dark:text-red-100">
          <div className="flex items-center gap-2 text-red-700 dark:text-red-300 font-bold text-sm">
            <Activity className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0" />
            <span>2. 酒精戒斷危象／震顫譫妄（Delirium Tremens, DTs）</span>
          </div>
          <p className="leading-relaxed font-sans">
            長期大量飲酒者，在停酒或大幅減量後 24–72 小時出現：<strong>強烈手部震顫、大汗淋漓、心跳極快（&gt;120 bpm）、胡言亂語意識混亂、看見不存在的小動物（視幻覺）或突然全身抽搐癲癇發作</strong>。
          </p>
          <div className="p-2 rounded-lg bg-red-700/90 text-white font-bold text-xs">
            處置原則：此屬高死亡率（未治療死亡率可達 15%）內科醫療急症，切勿強行約束壓制，速撥 119 送急診治療。
          </div>
        </div>

        {/* 3. Exercise-Associated Hyponatremia (EAH) */}
        <div className="p-4 rounded-xl border border-red-400 dark:border-red-500/60 bg-red-100/90 dark:bg-red-950/40 space-y-2 text-red-900 dark:text-red-100">
          <div className="flex items-center gap-2 text-red-700 dark:text-red-300 font-bold text-sm">
            <Droplets className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0" />
            <span>3. 運動相關低血鈉（EAH）急性腦水腫警戒</span>
          </div>
          <p className="leading-relaxed font-sans">
            長跑馬拉松或耐力勞動中/後出現：<strong>劇烈搏動性頭痛、噴射狀嘔吐、步伐踉蹌、神智混淆、嗜睡甚至抽搐</strong>。
          </p>
          <div className="p-2 rounded-lg bg-red-600 text-white font-bold text-xs">
            重要鐵律：絕對不要繼續給予大量純水！立即送至醫護站抽血檢驗血鈉並補充高濃度鹽水。
          </div>
        </div>

        {/* 4. Heat Stroke */}
        <div className="p-4 rounded-xl border border-orange-400 dark:border-orange-500/60 bg-orange-100/90 dark:bg-orange-950/30 space-y-2 text-orange-900 dark:text-orange-100">
          <div className="flex items-center gap-2 text-orange-700 dark:text-orange-300 font-bold text-sm">
            <AlertOctagon className="w-5 h-5 text-orange-600 dark:text-orange-400 shrink-0" />
            <span>4. 熱中暑（Heat Stroke）高致死率急症</span>
          </div>
          <p className="leading-relaxed font-sans">
            高溫環境下體溫飆升超過 40°C，<strong>全身皮膚乾熱突然停止排汗、意識混亂、胡言亂語或倒地昏迷</strong>。
          </p>
          <p className="text-orange-800 dark:text-orange-200 font-medium">
            急救動作：移至陰涼處，全身噴水開電扇蒸發散熱、冰敷頸部/腋下動脈，並即刻撥打 119。
          </p>
        </div>

        {/* 5. Heart Failure Fluid Overload */}
        <div className="p-4 rounded-xl border border-amber-400 dark:border-salud-amber/60 bg-amber-100/90 dark:bg-salud-amber-950/30 space-y-2 text-amber-900 dark:text-amber-100">
          <div className="flex items-center gap-2 text-amber-800 dark:text-salud-amber-300 font-bold text-sm">
            <HeartCrack className="w-5 h-5 text-amber-600 dark:text-salud-amber-400 shrink-0" />
            <span>5. 心衰竭與腎臟病體液過載（急性肺水腫）</span>
          </div>
          <p className="leading-relaxed font-sans">
            心臟病或洗腎病友，平躺時<strong>突發嚴重呼吸困難、端坐喘息、咳出粉紅色泡沫痰、雙腳水腫蔓延</strong>。
          </p>
          <p className="text-amber-800 dark:text-amber-200 font-medium">
            急救動作：採半坐臥姿勢，切勿強灌水，速撥 119 送醫。
          </p>
        </div>

        {/* Verified Emergency Hotlines (§16.4) */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-white font-mono">
          <div className="flex items-center gap-2">
            <PhoneCall className="w-4 h-4 text-salud-coral" />
            <span className="font-bold">台灣緊急通報專線 (已撥測驗證)：</span>
          </div>
          <div className="flex items-center gap-3">
            <a href="tel:119" className="px-3 py-1 rounded-lg bg-red-600 hover:bg-red-500 font-bold text-xs text-white">
              🚑 119 救護車
            </a>
            <a href="tel:110" className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 font-bold text-xs text-white">
              👮 110 警政報案
            </a>
            <a href="tel:1925" className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 font-bold text-xs text-white">
              💚 1925 安心專線
            </a>
          </div>
        </div>
      </div>
    </Modal>
  );
};
