import React, { useState } from 'react';
import { OBESITY_MASTERY_QUIZZES, MasteryQuizQuestion } from '../../../data/obesityIterationsData';
import confetti from 'canvas-confetti';
import {
  Award,
  CheckCircle2,
  XCircle,
  Sparkles,
  HelpCircle,
  RotateCcw,
  ArrowRight,
  BookOpen,
  Stethoscope,
  ChevronRight,
  Trophy,
} from 'lucide-react';

interface Props {
  onNavigateToTab?: (tab: string) => void;
}

export const ObesityMasteryQuiz: React.FC<Props> = ({ onNavigateToTab }) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);

  const currentQ = OBESITY_MASTERY_QUIZZES[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswerSubmitted(true);

    if (selectedOption === currentQ.correct_index) {
      setScore((prev) => prev + 1);
      // Fire confetti celebration!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#06b6d4', '#10b981', '#f59e0b', '#8b5cf6'],
        });
      } catch {}
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx < OBESITY_MASTERY_QUIZZES.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsQuizCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setIsQuizCompleted(false);
  };

  return (
    <div className="rounded-3xl border border-indigo-500/30 bg-white/80 dark:bg-slate-900/80 p-6 sm:p-8 space-y-6 shadow-sm backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30 text-xs font-mono font-bold mb-1.5">
            <Award className="w-3.5 h-3.5" />
            <span>均一教育平台自適應學習哲學 · FORMATIVE MASTERY ASSESSMENT</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 dark:text-white">
            肥胖與減重精熟情境評量 (Mastery Quiz)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            由 EC-19 學習體驗架構師與專科醫師設計，以實戰臨床情境測驗檢視你的知識抗體，答對釋放多巴胺煙火！
          </p>
        </div>

        {!isQuizCompleted && (
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="text-slate-400">進度：</span>
            <span className="font-bold text-indigo-600 dark:text-indigo-400">
              {currentIdx + 1} / {OBESITY_MASTERY_QUIZZES.length}
            </span>
          </div>
        )}
      </div>

      {/* COMPLETED STATE */}
      {isQuizCompleted ? (
        <div className="p-8 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-slate-900/90 to-cyan-500/10 border border-indigo-500/40 text-center space-y-4 animate-fade-in">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-500 flex items-center justify-center mx-auto text-2xl font-extrabold shadow-lg">
            <Trophy className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h4 className="text-2xl font-display font-bold text-white">精熟挑戰完成！</h4>
            <p className="text-xs text-slate-300">
              你一共答對了 <strong className="text-emerald-400 text-base">{score}</strong> / {OBESITY_MASTERY_QUIZZES.length} 題
            </p>
          </div>

          <div className="inline-block p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-slate-300">
            {score === OBESITY_MASTERY_QUIZZES.length ? (
              <span className="text-emerald-400 font-bold">⭐⭐⭐ 頂級醫學精熟！你已具備專科等級的減重實證認知防線！</span>
            ) : score >= 4 ? (
              <span className="text-salud-cyan font-bold">⭐⭐ 優秀掌握度！已破除絕大部分常見商業廣告陷阱！</span>
            ) : (
              <span className="text-amber-400 font-bold">⭐ 持續累積！建議多查閱各章節的生化機轉與飲食法頁面！</span>
            )}
          </div>

          <div className="pt-2">
            <button
              onClick={handleRestart}
              className="btn-tactile inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md"
            >
              <RotateCcw className="w-4 h-4" />
              <span>重新挑戰測驗</span>
            </button>
          </div>
        </div>
      ) : (
        /* ACTIVE QUIZ QUESTION CARD */
        <div className="space-y-5 text-xs animate-fade-in">
          {/* Question Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30">
                {currentQ.category}
              </span>
              <span className="text-[10px] font-mono text-slate-400">第 {currentIdx + 1} 題</span>
            </div>

            <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-relaxed">
              {currentQ.question}
            </h4>
          </div>

          {/* Options List */}
          <div className="space-y-2">
            {currentQ.options.map((opt, i) => {
              const isSelected = selectedOption === i;
              const isCorrect = i === currentQ.correct_index;

              let btnStyle = 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 hover:border-indigo-400';
              if (isAnswerSubmitted) {
                if (isCorrect) {
                  btnStyle = 'border-emerald-500 bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 font-bold ring-2 ring-emerald-500/30';
                } else if (isSelected && !isCorrect) {
                  btnStyle = 'border-rose-500 bg-rose-500/20 text-rose-800 dark:text-rose-300 font-bold';
                } else {
                  btnStyle = 'opacity-50 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-400';
                }
              } else if (isSelected) {
                btnStyle = 'border-indigo-500 bg-indigo-500/20 text-indigo-800 dark:text-indigo-300 font-bold ring-2 ring-indigo-500/20';
              }

              return (
                <button
                  key={`opt-${i}`}
                  onClick={() => handleSelectOption(i)}
                  disabled={isAnswerSubmitted}
                  className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between text-xs ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center font-mono font-bold text-[11px] shrink-0">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="leading-snug">{opt}</span>
                  </div>

                  {isAnswerSubmitted && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  )}
                  {isAnswerSubmitted && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Action Bar */}
          {!isAnswerSubmitted ? (
            <button
              onClick={handleSubmitAnswer}
              disabled={selectedOption === null}
              className={`btn-tactile w-full py-3 rounded-2xl font-bold transition-all text-xs ${
                selectedOption !== null
                  ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
              }`}
            >
              提交答案
            </button>
          ) : (
            /* Explanation & Remedy Box */
            <div className="space-y-3 animate-fade-in">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                  <BookOpen className="w-4 h-4 text-salud-cyan" />
                  <span>臨床生化機制詳解：</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                  {currentQ.biochemical_explanation_zh}
                </p>

                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-800 dark:text-amber-300">
                  <strong>專家教學珍珠 (Pearl)：</strong> {currentQ.clinical_pearl_zh}
                </div>
              </div>

              <div className="flex items-center justify-between gap-3">
                {onNavigateToTab && selectedOption !== currentQ.correct_index && (
                  <button
                    onClick={() => onNavigateToTab(currentQ.target_remedy_tab)}
                    className="btn-tactile text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 font-bold"
                  >
                    <span>📖 前往「{currentQ.target_remedy_tab}」補救閱讀</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}

                <button
                  onClick={handleNextQuestion}
                  className="btn-tactile ml-auto flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-md text-xs"
                >
                  <span>{currentIdx < OBESITY_MASTERY_QUIZZES.length - 1 ? '下一題' : '查看總成果'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
