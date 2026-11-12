import React from 'react';
import { useLanguage } from '../../i18n';
import { useNavigation } from '../../context/NavigationContext';
import { useModal } from '../../context/ModalContext';
import { APP_VERSION } from '../../config/version';
import {
  AlertTriangle,
  ShieldCheck,
  HeartPulse,
  BookOpen,
  Calculator,
  Compass,
  GraduationCap,
  ExternalLink,
  PhoneCall,
  CheckCircle2,
} from 'lucide-react';

/**
 * SiteFooter — Authoritative Medical Education Footer (v6.11)
 *
 * Modeled after world-class institutional health resources (Harvard Health, Mayo Clinic, Cleveland Clinic).
 * Provides multi-column quick discovery, clinical evidence standards, emergency triage notice,
 * and transparent governance.
 */
export const SiteFooter: React.FC = () => {
  const { language } = useLanguage();
  const { openMeta, openSynergy, go, selectPillar } = useNavigation();
  const { openModal } = useModal();
  const zh = language === 'zh-TW';

  const linkClass =
    'text-xs text-slate-500 hover:text-emerald-700 dark:text-slate-400 dark:hover:text-emerald-300 transition-colors inline-flex items-center gap-1';

  return (
    <footer className="mt-20 border-t border-slate-200/90 dark:border-slate-800/90 bg-slate-50/60 dark:bg-slate-950/40 pb-28 lg:pb-12 pt-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Core Value Statement & Safety Alert */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
          <div className="flex items-start gap-3">
            <span className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </span>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                {zh ? '嚴謹 GRADE 實證分級' : 'GRADE Evidence Rigor'}
              </h4>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {zh
                  ? '所有生理數值、用藥安全與生活干預均嚴格對齊最新國際隨機對照試驗 (RCT) 與衛福部臨床指引。'
                  : 'All physiological thresholds and clinical advice strictly align with peer-reviewed RCTs and official guidelines.'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="w-8 h-8 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 flex items-center justify-center shrink-0">
              <HeartPulse className="w-4 h-4" />
            </span>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                {zh ? '平易近人・生活實作' : 'Accessible & Actionable'}
              </h4>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {zh
                  ? '拒絕晦澀生硬的醫療黑話；用生動比喻、圖解機轉與每課「今天就能做的事」陪伴每個人快樂自學。'
                  : 'Plain-language physiological insights, clear infographics, and executable micro-actions for every reader.'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-4 h-4" />
            </span>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                {zh ? '衛教免責與紅旗警訊' : 'Medical Disclaimer'}
              </h4>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {zh
                  ? 'Salud 僅供衛教學習，不代替個別門診處方。突發壓榨性胸悶、單側手足麻木臉歪等紅旗請立刻撥打 119。'
                  : 'Salud provides educational content only. Please consult clinicians for prescriptions; call 119 for emergencies.'}
              </p>
            </div>
          </div>
        </div>

        {/* Multi-Column Fast Navigation Directory */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-2">
          {/* Column 1: Lifestyle Pillars */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
              {zh ? '🌿 四大生活基石' : 'Lifestyle Pillars'}
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#diet" className={linkClass}>
                  {zh ? '飲食營養：2:1:1 餐盤與好油' : 'Nutrition & Healthy Fats'}
                </a>
              </li>
              <li>
                <a href="#exercise/strength" className={linkClass}>
                  {zh ? '科學運動：最大肌力與耐力天梯' : 'Strength & Muscular Endurance'}
                </a>
              </li>
              <li>
                <a href="#sleep" className={linkClass}>
                  {zh ? '睡眠修復：慢波深睡與晝夜光線' : 'Slow-Wave Sleep & Circadian'}
                </a>
              </li>
              <li>
                <a href="#mindbody" className={linkClass}>
                  {zh ? '身心調息：生理性嘆氣與正念' : 'Mind-Body Breathwork'}
                </a>
              </li>
              <li>
                <a href="#supplements" className={linkClass}>
                  {zh ? '營養補充品：實證評估與交互作用' : 'Supplements Evaluation'}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Clinical Specialties */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
              {zh ? '🏥 專科與健康指引' : 'Clinical Specializations'}
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#cardiometabolic" className={linkClass}>
                  {zh ? '心血代謝：ApoB、血壓 722 與血脂' : 'Cardiometabolic & ApoB'}
                </a>
              </li>
              <li>
                <a href="#obesity" className={linkClass}>
                  {zh ? '體重管理：腸泌素 GLP-1 與防肌少' : 'Weight & Sarcopenia Prevention'}
                </a>
              </li>
              <li>
                <a href="#spine" className={linkClass}>
                  {zh ? '脊椎神經骨科：久坐骨刺與手腳麻' : 'Spine & Neuro-Orthopedics'}
                </a>
              </li>
              <li>
                <a href="#gastro" className={linkClass}>
                  {zh ? '胃腸肝膽：腸道菌、胃食道逆流' : 'Gastroenterology & Hepatology'}
                </a>
              </li>
              <li>
                <a href="#ltc" className={linkClass}>
                  {zh ? '長照防衰：巴氏量表與居家 1966' : 'Long-Term Care & Frailty'}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Interactive Learning */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
              {zh ? '💡 快樂學習與練習' : 'Interactive Learning'}
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#learn/practice" className={linkClass}>
                  <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
                  {zh ? '情境實戰與知識閃卡練習場' : 'Practice Scenarios & Flashcards'}
                </a>
              </li>
              <li>
                <a href="#learn/academy" className={linkClass}>
                  {zh ? '8 大迷人醫學學科博覽館' : '8 Medical Disciplines Expo'}
                </a>
              </li>
              <li>
                <button type="button" onClick={() => openModal('simulators')} className={linkClass}>
                  <Calculator className="w-3.5 h-3.5 text-amber-500" />
                  {zh ? '18+ 互動健康試算工具箱' : 'Health Calculators'}
                </button>
              </li>
              <li>
                <a href="#checkup" className={linkClass}>
                  {zh ? '看懂健檢數值與公費篩檢' : 'Lab Metrics & Screenings'}
                </a>
              </li>
              <li>
                <a href="#glossary" className={linkClass}>
                  {zh ? '白話健康小辭典 (ApoB、VO₂max)' : 'Health Glossary'}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Governance & Transparency */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
              {zh ? '🛡️ 實證原則與公開治理' : 'Governance & Sources'}
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button type="button" onClick={() => openMeta('evidence')} className={linkClass}>
                  {zh ? '實證來源庫與分級系統' : 'Evidence Library & Grading'}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => openMeta('about')} className={linkClass}>
                  {zh ? '關於 Salud 與實證原則' : 'About Salud Editorial Standards'}
                </button>
              </li>
              <li>
                <button type="button" onClick={openSynergy} className={linkClass}>
                  {zh ? '跨主題交互作用與綜效' : 'Cross-Topic Synergy Map'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openModal('emergency')}
                  className="text-xs text-rose-600 dark:text-rose-400 font-semibold hover:underline inline-flex items-center gap-1"
                >
                  <PhoneCall className="w-3 h-3" />
                  {zh ? '緊急急診警訊紅旗清單' : 'Emergency Red Flags'}
                </button>
              </li>
              <li>
                <a
                  href="https://github.com/waatax/Salud"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  {zh ? 'GitHub 原始碼 (開源公益)' : 'GitHub Source Code'}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits & Version */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 dark:text-slate-500 font-mono">
          <p>
            Salud © 2026 ・ Giving everyone the tools to understand their body. Built with evidence & care.
          </p>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>CI Governance-as-Code Certified</span>
            </span>
            <span>v{APP_VERSION}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
