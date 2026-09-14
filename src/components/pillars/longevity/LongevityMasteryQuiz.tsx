import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { LONGEVITY_MASTERY_QUIZZES } from '../../../data/longevityData';
import { LongevityQuizItem, LongevitySubTab } from '../../../types';
import {
  Award,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  BookOpen,
} from 'lucide-react';

interface Props {
  onNavigateToTab: (tab: LongevitySubTab) => void;
}

export const LongevityMasteryQuiz: React.FC<Props> = ({ onNavigateToTab }) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const currentQ: LongevityQuizItem = LONGEVITY_MASTERY_QUIZZES[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === currentQ.correct_index) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < LONGEVITY_MASTERY_QUIZZES.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
      // Trigger confetti fireworks
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsCompleted(false);
  };

  return (
    <div className="rounded-3xl border border-salud-cyan/30 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-salud-cyan uppercase tracking-wider">
            <Award className="w-4 h-4 text-salud-cyan" />
            <span>INFOGRAPH 7 · 長壽醫學臨床情境精熟測驗</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white mt-1">
            長壽生化機轉與抗老介入 14 題精熟檢驗
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            驗收您對 12 大衰老標誌、表觀遺傳時鐘、雷帕黴素脈衝與桑拿激效的掌握深度。
          </p>
        </div>

        {!isCompleted && (
          <div className="flex items-center gap-2 font-mono text-xs text-slate-400 self-start sm:self-auto">
            <span>進度：</span>
            <span className="text-salud-cyan font-bold text-sm">
              {currentIdx + 1} / {LONGEVITY_MASTERY_QUIZZES.length}
            </span>
          </div>
        )}
      </div>

      {/* Completion View */}
      {isCompleted ? (
        <div className="py-8 text-center space-y-5 animate-fade-in">
          <div className="inline-flex p-4 rounded-3xl bg-salud-cyan/20 border border-salud-cyan/40 text-salud-cyan">
            <Sparkles className="w-12 h-12 animate-pulse" />
          </div>

          <div className="space-y-2">
            <h4 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
              測驗完成！恭喜達成認知進階
            </h4>
            <div className="text-sm font-mono text-slate-300">
              您的最終得分：<span className="text-2xl font-extrabold text-salud-cyan">{score}</span> / {LONGEVITY_MASTERY_QUIZZES.length}
            </div>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              {score >= 12
                ? '卓越！您已完全具備前沿分子老年學 (Geroscience) 與長壽精準處方的深厚知識儲備。'
                : score >= 8
                ? '良好！您已掌握大部分核心抗衰邏輯，可針對答錯的環節點擊下方專題進一步鞏固。'
                : '建議回顧！抗衰老醫學具有高度系統性，請多參閱 12 大標誌與表觀遺傳時鐘專章。'}
            </p>
          </div>

          <button
            onClick={handleRestart}
            className="btn-tactile inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-salud-cyan text-slate-950 font-bold text-xs shadow-lg hover:brightness-110"
          >
            <RotateCcw className="w-4 h-4" />
            <span>重新測驗</span>
          </button>
        </div>
      ) : (
        /* Quiz Question View */
        <div className="space-y-5 animate-fade-in">
          {/* Question Title */}
          <div className="text-sm sm:text-base font-bold text-white leading-relaxed">
            <span className="text-salud-cyan font-mono mr-2">Q{currentIdx + 1}.</span>
            {currentQ.question_zh}
          </div>

          {/* Options */}
          <div className="space-y-2.5">
            {currentQ.options_zh.map((opt, idx) => {
              const isChosen = selectedOption === idx;
              const isCorrect = idx === currentQ.correct_index;

              let btnStyle = 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700 hover:bg-slate-850';
              if (isAnswered) {
                if (isCorrect) {
                  btnStyle = 'border-emerald-500 bg-emerald-500/20 text-white font-bold ring-2 ring-emerald-500/20';
                } else if (isChosen) {
                  btnStyle = 'border-rose-500 bg-rose-500/20 text-rose-200';
                }
              }

              return (
                <button
                  key={`opt-${idx}`}
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-start gap-3 text-xs leading-relaxed ${btnStyle}`}
                >
                  <span className="w-5 h-5 rounded-full border border-slate-700 flex items-center justify-center font-mono text-[10px] shrink-0 mt-0.5">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="flex-1">{opt}</span>
                  {isAnswered && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />}
                  {isAnswered && isChosen && !isCorrect && <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />}
                </button>
              );
            })}
          </div>

          {/* Clinical Pearl Feedback */}
          {isAnswered && (
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 animate-fade-in text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>專家臨床珠璣 (Clinical Pearl)</span>
                </span>
                <button
                  onClick={() => onNavigateToTab(currentQ.remedy_tab)}
                  className="inline-flex items-center gap-1 text-[11px] font-mono text-salud-cyan hover:underline"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>跳轉專區複習</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <p className="text-slate-300 text-[11px] leading-relaxed">
                {currentQ.clinical_pearl_zh}
              </p>

              <div className="flex justify-end pt-1">
                <button
                  onClick={handleNext}
                  className="btn-tactile px-5 py-2 rounded-xl bg-salud-cyan text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md hover:brightness-110"
                >
                  <span>{currentIdx < LONGEVITY_MASTERY_QUIZZES.length - 1 ? '下一題' : '查看成果'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
