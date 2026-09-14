import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { SKILL_TREE_NODES } from '../../data/ultraHealthData';
import { MasterySkillTreeNode } from '../../types';
import {
  Sparkles,
  Award,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Lock,
  Unlock,
  RotateCcw,
  BookOpen,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

const STORAGE_KEY = 'salud_mastered_skills';

export const MasterySkillTree: React.FC = () => {
  const [masteredSkills, setMasteredSkills] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : ['TREE-W-01'];
    } catch {
      return ['TREE-W-01'];
    }
  });

  const [activeNode, setActiveNode] = useState<MasterySkillTreeNode>(SKILL_TREE_NODES[0]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(masteredSkills));
    } catch (e) {
      console.warn('Failed to save mastered skills', e);
    }
  }, [masteredSkills]);

  const handleSelectNode = (node: MasterySkillTreeNode) => {
    setActiveNode(node);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
  };

  const handleSubmitAnswer = (e: React.MouseEvent) => {
    if (selectedAnswer === null) return;
    setIsAnswerSubmitted(true);

    if (selectedAnswer === activeNode.quiz.correct_index) {
      if (!masteredSkills.includes(activeNode.id)) {
        setMasteredSkills([...masteredSkills, activeNode.id]);
      }
      // Confetti celebration
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { x, y }
      });
    }
  };

  const isMastered = masteredSkills.includes(activeNode.id);
  const isCorrect = selectedAnswer === activeNode.quiz.correct_index;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-indigo-500/10 via-salud-dark-surface to-purple-500/10 p-6 sm:p-8 backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/40 text-xs font-mono font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>均一教育平台核心架構 · 自適應精熟學習 (Mastery Learning)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
              個人超健康知識圖譜與技能樹
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
              拒絕「填鴨式死記硬背」。比照均一精熟教學法，將生化機轉原子化（KPs），透過先備知識拓撲依賴，
              配合 30 秒形成性即時自測診斷，真正建立「知其所以然」的底層健康認知護城河！
            </p>
          </div>

          {/* Mastery Stats */}
          <div className="bg-white/80 dark:bg-slate-900/80 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm min-w-[200px]">
            <div className="text-xs font-mono text-slate-500 dark:text-slate-400">已精熟技能節點</div>
            <div className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 mt-1 flex items-center gap-2">
              <span>{masteredSkills.length}</span>
              <span className="text-xs text-slate-400 font-normal">/ {SKILL_TREE_NODES.length} 節點</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
              <div
                className="bg-indigo-500 h-full rounded-full transition-all duration-500"
                style={{
                  width: `${(masteredSkills.length / SKILL_TREE_NODES.length) * 100}%`
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Skill Nodes Grid (Junyi Style Graph) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {SKILL_TREE_NODES.map((node) => {
          const isNodeMastered = masteredSkills.includes(node.id);
          const isSelected = node.id === activeNode.id;

          return (
            <button
              key={node.id}
              onClick={() => handleSelectNode(node)}
              className={`p-4 rounded-2xl border text-left transition-all relative ${
                isSelected
                  ? 'bg-indigo-500/20 dark:bg-indigo-500/25 border-indigo-500 shadow-md ring-2 ring-indigo-500/30'
                  : isNodeMastered
                  ? 'bg-emerald-500/10 dark:bg-emerald-500/15 border-emerald-500/40 hover:border-emerald-500'
                  : 'bg-white/60 dark:bg-salud-dark-surface/60 border-slate-200 dark:border-slate-800 hover:border-indigo-400'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold text-slate-500">
                  {node.code}
                </span>
                {isNodeMastered ? (
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold">
                    ✓
                  </span>
                ) : (
                  <span className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-500 flex items-center justify-center text-[10px] font-mono">
                    ○
                  </span>
                )}
              </div>
              <div className="font-bold text-xs text-slate-900 dark:text-white line-clamp-2">
                {node.title_zh}
              </div>
              <div className="mt-2 flex items-center gap-1.5">
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 font-mono font-bold">
                  {node.level}
                </span>
                <span className="text-[9px] font-mono text-slate-400">
                  {node.branch}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Node Detail & Adaptive Quiz Challenge */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Atomic Concept & Plain English Analogy */}
        <div className="bg-white/90 dark:bg-salud-dark-surface rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase">
                {activeNode.code} · {activeNode.branch} · {activeNode.level}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
                {activeNode.title_zh}
              </h3>
            </div>
            {isMastered && (
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> 已精熟
              </span>
            )}
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
            <h4 className="text-xs font-bold font-mono text-slate-500 uppercase">
              📖 原子化核心機轉 (Atomic Principle)
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
              {activeNode.summary_zh}
            </p>
          </div>

          {/* Plain English Analogy by Influencer */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-700 dark:text-amber-400">
              <Sparkles className="w-4 h-4" />
              <span>網紅級白話神比喻 (Plain-English Metaphor)</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed italic">
              {activeNode.plain_english_analogy_zh}
            </p>
          </div>
        </div>

        {/* Right: 30-Second Formative Assessment Quiz */}
        <div className="bg-white/90 dark:bg-salud-dark-surface rounded-3xl border border-indigo-500/30 p-6 sm:p-8 space-y-6 shadow-sm">
          <div>
            <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
              均一形成性自測 · 驗證掌握度
            </span>
            <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-1 leading-snug">
              {activeNode.quiz.question_zh}
            </h4>
          </div>

          {/* Options */}
          <div className="space-y-2.5">
            {activeNode.quiz.options_zh.map((opt, idx) => {
              const isSelected = selectedAnswer === idx;
              let optionStyle = 'bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-indigo-400';

              if (isAnswerSubmitted) {
                if (idx === activeNode.quiz.correct_index) {
                  optionStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-semibold';
                } else if (isSelected) {
                  optionStyle = 'bg-rose-500/20 border-rose-500 text-rose-800 dark:text-rose-300';
                }
              } else if (isSelected) {
                optionStyle = 'bg-indigo-500/20 border-indigo-500 text-indigo-900 dark:text-indigo-200 font-semibold';
              }

              return (
                <button
                  key={idx}
                  disabled={isAnswerSubmitted}
                  onClick={() => setSelectedAnswer(idx)}
                  className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-start gap-3 ${optionStyle}`}
                >
                  <span className="w-5 h-5 rounded-full border flex items-center justify-center font-mono text-xs shrink-0 mt-0.5">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="leading-relaxed">{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Action button */}
          {!isAnswerSubmitted ? (
            <button
              disabled={selectedAnswer === null}
              onClick={handleSubmitAnswer}
              className={`w-full py-3 rounded-2xl font-bold font-display text-sm transition-all flex items-center justify-center gap-2 ${
                selectedAnswer !== null
                  ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>送出答案檢驗精熟</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="space-y-4 pt-2 border-t border-slate-200 dark:border-slate-800 animate-fade-in">
              <div
                className={`p-4 rounded-2xl flex items-start gap-3 text-xs leading-relaxed ${
                  isCorrect
                    ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-800 dark:text-emerald-200'
                    : 'bg-rose-500/15 border border-rose-500/40 text-rose-800 dark:text-rose-200'
                }`}
              >
                {isCorrect ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                )}
                <div>
                  <div className="font-bold text-sm mb-1">
                    {isCorrect ? '🎉 太棒了！回答完全正確，已解鎖精熟徽章！' : '💡 還差一點點！來看看背後機轉解析：'}
                  </div>
                  <div>{activeNode.quiz.explanation_zh}</div>
                </div>
              </div>

              {!isCorrect && (
                <button
                  onClick={() => {
                    setIsAnswerSubmitted(false);
                    setSelectedAnswer(null);
                  }}
                  className="btn-tactile text-xs font-mono text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> 再試一次此題
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
