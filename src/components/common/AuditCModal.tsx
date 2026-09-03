import React, { useState } from 'react';
import { Modal } from './Modal';
import { useLanguage } from '../../i18n';
import { ShieldAlert, HeartHandshake, PhoneCall, CheckCircle2, HelpCircle, AlertTriangle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AuditCModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { t, language } = useLanguage();
  const [gender, setGender] = useState<'MALE' | 'FEMALE'>('MALE');
  const [q1, setQ1] = useState<number>(0);
  const [q2, setQ2] = useState<number>(0);
  const [q3, setQ3] = useState<number>(0);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const totalScore = q1 + q2 + q3;
  const isPositive = gender === 'MALE' ? totalScore >= 4 : totalScore >= 3;

  const handleReset = () => {
    setQ1(0);
    setQ2(0);
    setQ3(0);
    setSubmitted(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('auditc.title')}
      subtitle={t('auditc.subtitle')}
      maxWidth="2xl"
    >
      <div className="space-y-6 font-sans text-xs text-slate-700 dark:text-slate-200">
        {!submitted ? (
          <div className="space-y-5">
            {/* Gender Switcher */}
            <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span className="font-bold text-slate-800 dark:text-slate-200">受試者生理性別（判定切點不同）：</span>
              <div className="flex gap-2 font-mono text-xs">
                <button
                  onClick={() => setGender('MALE')}
                  className={`px-3 py-1 rounded-lg border transition-all ${
                    gender === 'MALE'
                      ? 'border-cyan-400 bg-cyan-900/40 text-cyan-300 font-bold'
                      : 'border-slate-300 dark:border-slate-700 text-slate-500'
                  }`}
                >
                  男性 (切點 ≥ 4)
                </button>
                <button
                  onClick={() => setGender('FEMALE')}
                  className={`px-3 py-1 rounded-lg border transition-all ${
                    gender === 'FEMALE'
                      ? 'border-purple-400 bg-purple-900/40 text-purple-300 font-bold'
                      : 'border-slate-300 dark:border-slate-700 text-slate-500'
                  }`}
                >
                  女性 (切點 ≥ 3)
                </button>
              </div>
            </div>

            {/* Q1 */}
            <div className="space-y-2 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h4 className="font-bold text-slate-900 dark:text-slate-100">
                1. 您多久喝一次含有酒精的飲料？
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { label: '從不', score: 0 },
                  { label: '每月 1 次或更少', score: 1 },
                  { label: '每月 2 到 4 次', score: 2 },
                  { label: '每週 2 到 3 次', score: 3 },
                  { label: '每週 4 次或以上', score: 4 },
                ].map((opt) => (
                  <button
                    key={opt.score}
                    onClick={() => setQ1(opt.score)}
                    className={`p-2 rounded-xl border text-left font-mono text-xs transition-all ${
                      q1 === opt.score
                        ? 'border-salud-amber bg-salud-amber-500/20 text-salud-amber-600 dark:text-salud-amber-300 font-bold'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Q2 */}
            <div className="space-y-2 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h4 className="font-bold text-slate-900 dark:text-slate-100">
                2. 在喝酒的日子裡，您通常一天喝幾「標準杯」？（1標準杯約 1 罐啤酒或 1 杯紅酒）
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { label: '1 或 2 杯', score: 0 },
                  { label: '3 或 4 杯', score: 1 },
                  { label: '5 或 6 杯', score: 2 },
                  { label: '7 到 9 杯', score: 3 },
                  { label: '10 杯或以上', score: 4 },
                ].map((opt) => (
                  <button
                    key={opt.score}
                    onClick={() => setQ2(opt.score)}
                    className={`p-2 rounded-xl border text-left font-mono text-xs transition-all ${
                      q2 === opt.score
                        ? 'border-salud-amber bg-salud-amber-500/20 text-salud-amber-600 dark:text-salud-amber-300 font-bold'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Q3 */}
            <div className="space-y-2 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h4 className="font-bold text-slate-900 dark:text-slate-100">
                3. 您多久會單次喝下 6 杯或 6 杯以上的酒（單次大量暴飲）？
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { label: '從不', score: 0 },
                  { label: '少於每月一次', score: 1 },
                  { label: '每月一次', score: 2 },
                  { label: '每週一次', score: 3 },
                  { label: '每天或幾乎每天', score: 4 },
                ].map((opt) => (
                  <button
                    key={opt.score}
                    onClick={() => setQ3(opt.score)}
                    className={`p-2 rounded-xl border text-left font-mono text-xs transition-all ${
                      q3 === opt.score
                        ? 'border-salud-amber bg-salud-amber-500/20 text-salud-amber-600 dark:text-salud-amber-300 font-bold'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSubmitted(true)}
                className="px-6 py-2.5 rounded-xl bg-salud-amber hover:bg-salud-amber-400 text-black font-bold font-mono text-xs transition-all shadow-warm-glow"
              >
                完成評估並檢視分級
              </button>
            </div>
          </div>
        ) : (
          /* ── Triage Output (Spec §16.5: Display Band, No Raw Ranking) ── */
          <div className="space-y-5">
            <div className={`p-5 rounded-2xl border ${
              isPositive
                ? 'border-amber-500/60 bg-amber-950/20 text-amber-100'
                : 'border-emerald-500/60 bg-emerald-950/20 text-emerald-100'
            }`}>
              <div className="flex items-center gap-2 font-display font-bold text-base pb-2">
                {isPositive ? (
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                )}
                <span>
                  評估結果分級：
                  <strong className={isPositive ? 'text-amber-400' : 'text-emerald-400'}>
                    {isPositive ? '飲酒健康風險值得關注 (關注分級)' : '低健康風險飲酒範圍 (低風險分級)'}
                  </strong>
                </span>
              </div>

              <p className="text-xs leading-relaxed text-slate-300 font-sans">
                {isPositive ? (
                  <>
                    依據 WHO 實證指引，這個結果代表您目前的飲酒頻率或單次攝入量，可能已經開始對消化道黏膜、心血管彈性或夜間睡眠結構帶來額外的生理負擔。
                    <strong>這絕不代表「您有酒精問題」或是個人品格標籤</strong>，而是身體亮起的一盞提示燈，建議您進一步審視生活中的飲酒模式，或向醫療專業人員聊聊。
                  </>
                ) : (
                  <>
                    您目前的飲酒型態處於相對低風險的範疇。即便如此，請持續牢記「最健康的飲酒量是零」以及任何減害微步，保護自身與心血管。
                  </>
                )}
              </p>
            </div>

            {/* Verified Support Resources (§16.4) */}
            <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                <span className="font-bold text-xs text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                  <HeartHandshake className="w-4 h-4 text-salud-cyan" />
                  台灣在地求助與醫療諮詢資源 (依 §16.4 查證確認)
                </span>
                <span className="text-[10px] font-mono text-emerald-500">撥測查證日：2026-09-03</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-0.5">
                  <span className="text-slate-400 text-[10px] block">衛福部安心專線 (24 小時免付費)</span>
                  <a href="tel:1925" className="text-salud-cyan hover:underline font-bold text-sm block">
                    📞 1925
                  </a>
                  <span className="text-slate-500 text-[10px]">提供情緒支持與心理諮詢轉介</span>
                </div>

                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-0.5">
                  <span className="text-slate-400 text-[10px] block">緊急醫療救護</span>
                  <a href="tel:119" className="text-red-400 hover:underline font-bold text-sm block">
                    🚑 119
                  </a>
                  <span className="text-slate-500 text-[10px]">急性中毒昏迷、嘔吐窒息或抽搐</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-white font-mono text-xs"
              >
                重新填寫問卷
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2 rounded-xl bg-salud-cyan hover:bg-salud-cyan-400 text-black font-bold font-mono text-xs transition-all shadow-cyan-glow"
              >
                了解並關閉
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
