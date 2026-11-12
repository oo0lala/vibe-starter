import React from 'react';
import { RotateCcw, Award } from 'lucide-react';

interface DotVotingToolbarProps {
  activeVoteColor: 'cyan' | 'green' | null;
  setActiveVoteColor: (color: 'cyan' | 'green' | null) => void;
  totalCyanVotes: number;
  totalGreenVotes: number;
  highlightTopVoted: boolean;
  setHighlightTopVoted: (val: boolean) => void;
  onResetVotes: () => void;
}

export const DotVotingToolbar: React.FC<DotVotingToolbarProps> = ({
  activeVoteColor,
  setActiveVoteColor,
  totalCyanVotes,
  totalGreenVotes,
  highlightTopVoted,
  setHighlightTopVoted,
  onResetVotes
}) => {
  return (
    <div className="bg-white/95 backdrop-blur border border-slate-200/80 rounded-lg p-2.5 shadow-sm flex items-center gap-3">
      <div className="flex items-center gap-2 pr-3 border-r border-slate-200">
        <span className="text-xs font-semibold text-slate-700">Dot Voting:</span>
        <span className="text-[11px] text-slate-500 hidden sm:inline">
          {activeVoteColor ? `Click notes to stamp ${activeVoteColor} dot` : 'Pick a dot to stamp'}
        </span>
      </div>

      <div className="flex items-center gap-2">
        {/* Cyan Dot Stamp */}
        <button
          type="button"
          onClick={() => setActiveVoteColor(activeVoteColor === 'cyan' ? null : 'cyan')}
          className={`px-2.5 py-1.5 rounded-md text-xs font-medium flex items-center gap-2 transition-all ${
            activeVoteColor === 'cyan'
              ? 'bg-sky-100 text-sky-900 ring-2 ring-sky-500 shadow-sm'
              : 'hover:bg-slate-100 text-slate-700'
          }`}
          title="Cyan dot: Feasibility & strategic priority"
        >
          <span className="w-3.5 h-3.5 rounded-full bg-[#00BCD4] shadow-sm inline-block shrink-0" />
          <span>Cyan</span>
          <span className="text-[11px] font-mono tabular-nums text-slate-600 bg-white px-1.5 py-0.2 rounded border border-slate-200">
            {totalCyanVotes}
          </span>
        </button>

        {/* Green Dot Stamp */}
        <button
          type="button"
          onClick={() => setActiveVoteColor(activeVoteColor === 'green' ? null : 'green')}
          className={`px-2.5 py-1.5 rounded-md text-xs font-medium flex items-center gap-2 transition-all ${
            activeVoteColor === 'green'
              ? 'bg-emerald-100 text-emerald-900 ring-2 ring-emerald-500 shadow-sm'
              : 'hover:bg-slate-100 text-slate-700'
          }`}
          title="Green dot: High business impact & revenue urgency"
        >
          <span className="w-3.5 h-3.5 rounded-full bg-[#10B981] shadow-sm inline-block shrink-0" />
          <span>Green</span>
          <span className="text-[11px] font-mono tabular-nums text-slate-600 bg-white px-1.5 py-0.2 rounded border border-slate-200">
            {totalGreenVotes}
          </span>
        </button>
      </div>

      <div className="flex items-center gap-1.5 pl-2 border-l border-slate-200">
        <button
          type="button"
          onClick={() => setHighlightTopVoted(!highlightTopVoted)}
          className={`p-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 ${
            highlightTopVoted ? 'bg-amber-100 text-amber-900' : 'text-slate-600 hover:bg-slate-100'
          }`}
          title="Highlight top 3 voted cards"
        >
          <Award className="w-4 h-4 text-amber-600" />
          <span className="hidden md:inline">Top Voted</span>
        </button>

        <button
          type="button"
          onClick={onResetVotes}
          className="p-1.5 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          title="Reset all dot votes to original whiteboard count"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
