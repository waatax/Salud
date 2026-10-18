import React from 'react';
import { ArrowRight, Flower2 } from 'lucide-react';
import { useNavigation } from '../../../context/NavigationContext';

/** Slim hand-off banner from the sleep and mental hubs into the 睡眠・呼吸・正念 course. */
export const MindBodyBridge: React.FC<{ from: 'sleep' | 'mental' }> = ({ from }) => {
  const { go } = useNavigation();
  const target = from === 'sleep' ? 'mindbody/SLEEP_PLAN' : 'mindbody/BREATH_SCIENCE';
  return (
    <button
      type="button"
      onClick={() => go(target)}
      className="no-print w-full text-left rounded-2xl border border-indigo-200 dark:border-indigo-900 bg-indigo-50/70 dark:bg-indigo-950/30 px-4 py-3 flex items-center gap-3 hover:bg-indigo-100/70 dark:hover:bg-indigo-900/30 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      <Flower2 className="w-5 h-5 shrink-0 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
      <span className="flex-1 min-w-0">
        <span className="block text-[14px] font-bold text-indigo-950 dark:text-indigo-100">新專區：睡眠・呼吸・正念（10 章課程＋練習工具）</span>
        <span className="block text-[13px] text-indigo-800/80 dark:text-indigo-300/80">
          {from === 'sleep' ? '24 小時作息規劃器、CBT-I、CAP-D 睡眠日記、半夜醒來決策圖' : '卡帕拉巴提、吐納六字訣、正念冥想計時器與安全矩陣'}
        </span>
      </span>
      <ArrowRight className="w-4 h-4 shrink-0 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
    </button>
  );
};
