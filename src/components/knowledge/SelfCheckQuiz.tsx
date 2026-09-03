import React, { useState } from 'react';
import { QuizItem } from '../../types';
import { CheckCircle2, XCircle, HelpCircle, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Props {
  items: QuizItem[];
  pageTitle: string;
}

export const SelfCheckQuiz: React.FC<Props> = ({ items, pageTitle }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);

  if (!items || items.length === 0) return null;

  const handleSelect = (itemId: string, optionIdx: number) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [itemId]: optionIdx }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    // Check score
    let score = 0;
    items.forEach((item) => {
      if (selectedAnswers[item.id] === item.correct_index) score++;
    });

    if (score === items.length) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F59E0B', '#06B6D4', '#10B981'],
      });
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setSubmitted(false);
  };

  const allAnswered = items.every((item) => selectedAnswers[item.id] !== undefined);
  const correctCount = items.filter((item) => selectedAnswers[item.id] === item.correct_index).length;

  return (
    <div className="rounded-2xl border border-salud-dark-border dark:border-salud-dark-border light:border-salud-light-border bg-salud-dark-card/40 dark:bg-salud-dark-card/40 light:bg-salud-light-card/40 p-4 sm:p-6 space-y-5 font-sans text-xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-salud-amber-400" />
          <h4 className="text-base font-display font-bold text-salud-dark-text dark:text-salud-dark-text light:text-salud-light-text">
            10 Self-check 本頁核心知識點自我檢測
          </h4>
        </div>
        <span className="text-xs font-mono text-slate-400">
          共 {items.length} 題
        </span>
      </div>

      <div className="space-y-4">
        {items.map((item, idx) => {
          const userChoice = selectedAnswers[item.id];
          const isCorrect = userChoice === item.correct_index;

          return (
            <div
              key={item.id}
              className="p-4 rounded-xl border border-salud-dark-border/80 bg-salud-dark-surface/80 dark:bg-salud-dark-surface/80 light:bg-salud-light-surface/80 space-y-3"
            >
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-800 text-salud-amber-400 flex items-center justify-center font-mono font-bold text-xs shrink-0">
                  {idx + 1}
                </span>
                <p className="text-sm font-semibold text-salud-dark-text dark:text-salud-dark-text light:text-salud-light-text leading-snug">
                  {item.question}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-1.5 pl-7">
                {item.options.map((opt, optIdx) => {
                  let optStyle = 'border-salud-dark-border bg-salud-dark-card/40 text-slate-300 hover:border-salud-amber/50';

                  if (userChoice === optIdx) {
                    optStyle = 'border-salud-amber bg-salud-amber/15 text-salud-amber-300 font-bold';
                  }

                  if (submitted) {
                    if (optIdx === item.correct_index) {
                      optStyle = 'border-emerald-500 bg-emerald-950/30 text-emerald-300 font-bold';
                    } else if (userChoice === optIdx) {
                      optStyle = 'border-red-500 bg-red-950/30 text-red-300 line-through';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={submitted}
                      onClick={() => handleSelect(item.id, optIdx)}
                      className={`w-full p-2.5 rounded-lg border text-left text-xs transition-all flex items-center justify-between ${optStyle}`}
                    >
                      <span>{opt}</span>
                      {submitted && optIdx === item.correct_index && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      )}
                      {submitted && userChoice === optIdx && optIdx !== item.correct_index && (
                        <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation upon submission */}
              {submitted && (
                <div className={`p-3 rounded-lg border text-xs pl-7 transition-all ${
                  isCorrect
                    ? 'border-emerald-500/40 bg-emerald-950/20 text-emerald-200'
                    : 'border-salud-amber/40 bg-salud-amber-950/20 text-salud-amber-200'
                }`}>
                  <strong className="font-semibold block mb-0.5">
                    {isCorrect ? '✓ 答對了！' : '✕ 觀念解析：'}
                  </strong>
                  <p className="leading-relaxed opacity-95">
                    {item.explanation}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        {!submitted ? (
          <button
            disabled={!allAnswered}
            onClick={handleSubmit}
            className={`px-5 py-2.5 rounded-xl font-mono font-bold text-xs transition-all ${
              allAnswered
                ? 'bg-salud-amber text-black hover:opacity-90 shadow-warm-glow'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            {allAnswered ? '提交答案看解析 ➔' : `請完成所有題目 (${Object.keys(selectedAnswers).length}/${items.length})`}
          </button>
        ) : (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 font-mono text-sm">
              <Award className="w-5 h-5 text-salud-amber-400" />
              <span>
                得分：<strong className="text-salud-amber-300">{correctCount}</strong> / {items.length}
              </span>
            </div>
            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-lg border border-slate-700 hover:bg-slate-800 text-slate-300 font-mono text-xs"
            >
              重新作答
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
