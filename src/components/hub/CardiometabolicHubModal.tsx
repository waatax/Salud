import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { BP_722_PROTOCOL, METSYN_CRITERIA } from '../../data/cardiometabolicData';
import { useLanguage } from '../../i18n';
import { Activity, Heart, ShieldAlert, CheckCircle2, ChevronRight, Info } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const CardiometabolicHubModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'bp722' | 'metsyn' | 'prevent'>('bp722');

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('cardio.title')}
      subtitle={t('cardio.subtitle')}
      maxWidth="4xl"
    >
      <div className="space-y-6 font-sans text-xs text-slate-700 dark:text-slate-200">
        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 gap-2 pb-2">
          <button
            onClick={() => setActiveTab('bp722')}
            className={`px-3 py-1.5 rounded-xl font-mono text-xs transition-all ${
              activeTab === 'bp722'
                ? 'bg-salud-cyan text-black font-bold shadow-cyan-glow'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            722 居家血壓原則
          </button>
          <button
            onClick={() => setActiveTab('metsyn')}
            className={`px-3 py-1.5 rounded-xl font-mono text-xs transition-all ${
              activeTab === 'metsyn'
                ? 'bg-salud-amber text-black font-bold shadow-warm-glow'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            代謝症候群 5 項指標
          </button>
          <button
            onClick={() => setActiveTab('prevent')}
            className={`px-3 py-1.5 rounded-xl font-mono text-xs transition-all ${
              activeTab === 'prevent'
                ? 'bg-purple-600 text-white font-bold'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            PREVENT 心血管風險方程
          </button>
        </div>

        {/* Tab 1: 722 Protocol */}
        {activeTab === 'bp722' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-nature-sky-50 dark:bg-cyan-950/20 border border-nature-sky-200 dark:border-cyan-500/40 space-y-2 shadow-sm">
              <div className="flex items-center gap-2 font-display font-bold text-sm text-nature-sky-800 dark:text-cyan-400">
                <Heart className="w-5 h-5 text-nature-sky-600 dark:text-cyan-400" />
                <span>台灣心臟學會 (TSOC) 推薦：722 居家血壓量測金標準</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                診間量測常伴隨「白袍高血壓（診間緊張飆高）」或「隱匿性高血壓」。722 居家自量能最忠實反映血管真實阻力與硬化程度。
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-1">
                <span className="text-3xl font-display font-extrabold text-salud-cyan block">7</span>
                <strong className="text-slate-900 dark:text-slate-100 block">連續 7 天量測</strong>
                <span className="text-[11px] text-slate-500">取得連續一週穩定基準值</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-1">
                <span className="text-3xl font-display font-extrabold text-salud-amber block">2</span>
                <strong className="text-slate-900 dark:text-slate-100 block">每天 2 個時段</strong>
                <span className="text-[11px] text-slate-500">早晨起床後 ＋ 晚間就寢前</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-1">
                <span className="text-3xl font-display font-extrabold text-purple-400 block">2</span>
                <strong className="text-slate-900 dark:text-slate-100 block">每次量 2 遍</strong>
                <span className="text-[11px] text-slate-500">間隔 1 分鐘取平均值</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1 text-xs">
              <span className="font-bold text-slate-800 dark:text-slate-200">跨章生理連結：</span>
              <ul className="space-y-1 text-slate-600 dark:text-slate-400 list-disc pl-4">
                <li>Chapter A（酒精）：飲酒會引起自律神經反彈，次晨血壓常態性攀升（KP-A-029）。</li>
                <li>Chapter W（水分）：脫水血液濃縮或低血容量會引起反射性心跳過速與血管收縮。</li>
              </ul>
            </div>
          </div>
        )}

        {/* Tab 2: MetSyn Criteria */}
        {activeTab === 'metsyn' && (
          <div className="space-y-4">
            <div className="p-3 rounded-xl bg-nature-amber-50 dark:bg-amber-950/20 border border-nature-amber-200 dark:border-amber-500/40 text-xs text-nature-amber-900 dark:text-amber-200 shadow-sm">
              台灣國健署標準：下列 5 項指標中，符合 <strong>3 項或以上</strong> 即判定為代謝症候群。
            </div>

            <div className="space-y-2.5">
              {METSYN_CRITERIA.map((crit) => (
                <div key={crit.id} className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <strong className="text-slate-900 dark:text-slate-100 font-bold">{crit.name_zh}</strong>
                    <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-[11px]">
                      標準：{crit.threshold_zh}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
                    {crit.biological_link_zh}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: PREVENT Equation */}
        {activeTab === 'prevent' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-500/40 space-y-2 shadow-sm">
              <div className="flex items-center gap-2 font-display font-bold text-sm text-purple-800 dark:text-purple-300">
                <Activity className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <span>AHA PREVENT 方程（2023 最新版本化心血管風險評估）</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                取代傳統 PCE 方程，整合「心血管—腎臟—代謝（CKM）」綜合徵候群，納入估算腎絲球過濾率（eGFR）、尿蛋白，並將評估年齡下修至 30 歲。
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 font-mono text-xs">
              <span className="font-bold text-slate-800 dark:text-slate-200 block">
                核心監控指標矩陣（依 §9.2 規範）：
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <div className="p-2 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center">
                  <span className="text-slate-500 text-[10px] block">低密度膽固醇</span>
                  <strong className="text-slate-800 dark:text-slate-200">LDL-C</strong>
                </div>
                <div className="p-2 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center">
                  <span className="text-slate-500 text-[10px] block">載脂蛋白 B</span>
                  <strong className="text-salud-amber">ApoB (顆粒數)</strong>
                </div>
                <div className="p-2 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center">
                  <span className="text-slate-500 text-[10px] block">非高密度膽固醇</span>
                  <strong className="text-slate-800 dark:text-slate-200">Non-HDL-C</strong>
                </div>
              </div>
              <p className="text-[10px] text-slate-500 pt-1">
                ※ 遵循產品原則：風險方程僅在使用者主動點入時呈現，不得常駐於首頁造成不必要的健康焦慮。
              </p>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
