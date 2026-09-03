import React from 'react';
import { Droplets, Flame, Sparkles, AlertOctagon, HelpCircle, Network } from 'lucide-react';

interface Props {
  currentChapterId: string;
  onSelectChapter: (chapterId: string) => void;
  onOpenGraph: () => void;
  onOpenEmergencyModal: () => void;
  onOpenCouncil: () => void;
}

export const MobileNav: React.FC<Props> = ({
  currentChapterId,
  onSelectChapter,
  onOpenGraph,
  onOpenEmergencyModal,
  onOpenCouncil,
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-salud-dark-border bg-salud-dark-bg/95 dark:bg-salud-dark-bg/95 light:bg-salud-light-bg/95 backdrop-blur-lg px-2 py-1.5 flex items-center justify-around lg:hidden font-mono text-[10px]">
      <button
        onClick={() => onSelectChapter('W')}
        className={`flex flex-col items-center gap-0.5 p-1.5 rounded-lg transition-colors ${
          currentChapterId === 'W' ? 'text-salud-cyan font-bold' : 'text-slate-400'
        }`}
      >
        <Droplets className="w-4 h-4" />
        <span>水篇章</span>
      </button>

      <button
        onClick={() => onSelectChapter('O')}
        className={`flex flex-col items-center gap-0.5 p-1.5 rounded-lg transition-colors ${
          currentChapterId === 'O' ? 'text-salud-amber font-bold' : 'text-slate-400'
        }`}
      >
        <Flame className="w-4 h-4" />
        <span>油篇章</span>
      </button>

      <button
        onClick={onOpenGraph}
        className="flex flex-col items-center gap-0.5 p-1.5 rounded-lg text-slate-400 hover:text-slate-200"
      >
        <Network className="w-4 h-4" />
        <span>知識地圖</span>
      </button>

      <button
        onClick={onOpenEmergencyModal}
        className="flex flex-col items-center gap-0.5 p-1.5 rounded-lg text-red-400"
      >
        <AlertOctagon className="w-4 h-4 animate-pulse" />
        <span>紅旗警訊</span>
      </button>

      <button
        onClick={onOpenCouncil}
        className="flex flex-col items-center gap-0.5 p-1.5 rounded-lg text-slate-400 hover:text-slate-200"
      >
        <HelpCircle className="w-4 h-4" />
        <span>22席治理</span>
      </button>
    </nav>
  );
};
