import React, { useState } from 'react';
import { CanvasNote } from '../../types/canvas';
import { Pencil, Trash2, Check, X } from 'lucide-react';

interface StickyNoteProps {
  note: CanvasNote;
  activeVoteColor: 'cyan' | 'green' | null;
  onVote: (noteId: string, color: 'cyan' | 'green') => void;
  onUpdateText: (noteId: string, text: string) => void;
  onDelete: (noteId: string) => void;
}

export const StickyNote: React.FC<StickyNoteProps> = ({
  note,
  activeVoteColor,
  onVote,
  onUpdateText,
  onDelete
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(note.text);

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'yellow':
        return 'bg-[#FFF385] text-amber-950 border-[#F2E057] shadow-amber-200/40';
      case 'blue':
        return 'bg-[#BCE0FD] text-sky-950 border-[#98CDFC] shadow-sky-200/40';
      case 'light-blue':
        return 'bg-[#CFE8FF] text-sky-950 border-[#B5DAFC] shadow-sky-200/40';
      case 'orange':
        return 'bg-[#FFCCA6] text-orange-950 border-[#FDB482] shadow-orange-200/40';
      case 'green':
        return 'bg-[#8CE5A4] text-emerald-950 border-[#72D68E] shadow-emerald-200/40';
      case 'light-green':
        return 'bg-[#A2EBB7] text-emerald-950 border-[#87E0A1] shadow-emerald-200/40';
      case 'pink':
        return 'bg-[#FFC0D0] text-rose-950 border-[#FCA5BC] shadow-rose-200/40';
      case 'purple':
        return 'bg-[#E3D1FC] text-purple-950 border-[#CFB6F8] shadow-purple-200/40';
      default:
        return 'bg-[#FFF385] text-amber-950 border-[#F2E057] shadow-amber-200/40';
    }
  };

  const getTiltClass = (tilt: string) => {
    switch (tilt) {
      case 'tilt-1':
        return 'sticky-tilt-1 hover:rotate-0';
      case 'tilt-2':
        return 'sticky-tilt-2 hover:rotate-0';
      case 'tilt-3':
        return 'sticky-tilt-3 hover:rotate-0';
      default:
        return 'hover:rotate-0';
    }
  };

  const handleSave = () => {
    if (editText.trim()) {
      onUpdateText(note.id, editText.trim());
    } else {
      setEditText(note.text);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      setEditText(note.text);
      setIsEditing(false);
    }
  };

  return (
    <div
      className={`group relative p-3.5 min-h-[110px] w-full border border-opacity-70 rounded-sm sticky-shadow transition-all duration-200 flex flex-col justify-between select-text ${getColorClasses(
        note.color
      )} ${getTiltClass(note.tilt)}`}
    >
      {/* Tape effect at the top */}
      <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-10 h-3 bg-white/40 backdrop-blur-[1px] border border-black/5 rotate-1 pointer-events-none rounded-[1px]" />

      {/* Main note content */}
      <div className="flex-1">
        {isEditing ? (
          <div className="flex flex-col gap-1.5 h-full">
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full text-xs font-medium leading-relaxed bg-white/70 border border-black/10 rounded p-1.5 outline-none resize-none focus:bg-white focus:ring-1 focus:ring-slate-400"
              rows={3}
              autoFocus
            />
            <div className="flex items-center justify-end gap-1">
              <button
                type="button"
                onClick={() => {
                  setEditText(note.text);
                  setIsEditing(false);
                }}
                className="p-1 rounded hover:bg-black/10 text-slate-700"
                title="Cancel"
              >
                <X className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="p-1 rounded bg-slate-900 text-white hover:bg-slate-800"
                title="Save changes"
              >
                <Check className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <p
            onDoubleClick={() => setIsEditing(true)}
            className="text-xs font-semibold leading-relaxed tracking-tight break-words cursor-text select-text"
          >
            {note.text}
          </p>
        )}
      </div>

      {/* Footer: Dot Voting markers & action buttons */}
      <div className="mt-2.5 pt-2 border-t border-black/10 flex items-center justify-between gap-1.5 text-[11px]">
        {/* Dot Votes */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Cyan dot voting */}
          <button
            type="button"
            onClick={() => onVote(note.id, 'cyan')}
            className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded transition-transform active:scale-90 ${
              note.votes.cyan > 0
                ? 'bg-[#38bdf8]/20 border border-[#38bdf8]/50 text-sky-950 font-bold'
                : 'opacity-40 hover:opacity-100 hover:bg-black/5'
            }`}
            title="Add Cyan Dot Vote (Priority / Feasibility)"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#00BCD4] shadow-sm inline-block shrink-0" />
            <span className="font-mono text-[10px] tabular-nums">{note.votes.cyan}</span>
          </button>

          {/* Green dot voting */}
          <button
            type="button"
            onClick={() => onVote(note.id, 'green')}
            className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded transition-transform active:scale-90 ${
              note.votes.green > 0
                ? 'bg-[#22c55e]/20 border border-[#22c55e]/50 text-emerald-950 font-bold'
                : 'opacity-40 hover:opacity-100 hover:bg-black/5'
            }`}
            title="Add Green Dot Vote (Impact / Urgency)"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] shadow-sm inline-block shrink-0" />
            <span className="font-mono text-[10px] tabular-nums">{note.votes.green}</span>
          </button>
        </div>

        {/* Action icons (revealed on hover) */}
        {!isEditing && (
          <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="p-1 rounded hover:bg-black/10 text-slate-700 transition-colors"
              title="Edit note text"
            >
              <Pencil className="w-3 h-3" />
            </button>
            <button
              type="button"
              onClick={() => onDelete(note.id)}
              className="p-1 rounded hover:bg-red-500/20 text-red-700 transition-colors"
              title="Delete sticky note"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>

      {/* Visual Dot stamp indicator if activeVoteColor is selected */}
      {activeVoteColor && (
        <button
          type="button"
          onClick={() => onVote(note.id, activeVoteColor)}
          className="absolute inset-0 bg-transparent cursor-pointer rounded-sm hover:ring-2 hover:ring-slate-800/40"
          title={`Click to stamp a ${activeVoteColor} vote`}
        />
      )}
    </div>
  );
};
