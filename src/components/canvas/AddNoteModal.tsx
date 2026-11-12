import React, { useState } from 'react';
import { CanvasSectionId, NoteColor } from '../../types/canvas';
import { CANVAS_SECTIONS } from '../../data/initialCanvasData';
import { X, Plus } from 'lucide-react';

interface AddNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddNote: (sectionId: CanvasSectionId, text: string, color: NoteColor) => void;
  defaultSectionId?: CanvasSectionId;
}

export const AddNoteModal: React.FC<AddNoteModalProps> = ({
  isOpen,
  onClose,
  onAddNote,
  defaultSectionId = 'key_propositions'
}) => {
  const [sectionId, setSectionId] = useState<CanvasSectionId>(defaultSectionId);
  const [text, setText] = useState('');
  const [color, setColor] = useState<NoteColor>('yellow');

  if (!isOpen) return null;

  const colorOptions: { color: NoteColor; label: string; hex: string }[] = [
    { color: 'yellow', label: 'Yellow (Propositions / Segments)', hex: '#FFF385' },
    { color: 'blue', label: 'Blue (Partners / Resources)', hex: '#BCE0FD' },
    { color: 'light-blue', label: 'Light Blue (Activities)', hex: '#CFE8FF' },
    { color: 'orange', label: 'Orange (Relationships / Channels)', hex: '#FFCCA6' },
    { color: 'green', label: 'Green (Cost Structure)', hex: '#8CE5A4' },
    { color: 'light-green', label: 'Light Green (Revenue Streams)', hex: '#A2EBB7' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAddNote(sectionId, text.trim(), color);
    setText('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-md overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-400" />
            <h3 className="font-semibold text-slate-900 text-sm">Add New Sticky Note</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1.5">
              Canvas Block / Section
            </label>
            <select
              value={sectionId}
              onChange={(e) => {
                const newSec = e.target.value as CanvasSectionId;
                setSectionId(newSec);
                const match = CANVAS_SECTIONS.find((s) => s.id === newSec);
                if (match) setColor(match.defaultColor);
              }}
              className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
            >
              {CANVAS_SECTIONS.map((sec) => (
                <option key={sec.id} value={sec.id}>
                  {sec.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1.5">
              Sticky Note Color
            </label>
            <div className="grid grid-cols-3 gap-2">
              {colorOptions.map((opt) => (
                <button
                  type="button"
                  key={opt.color}
                  onClick={() => setColor(opt.color)}
                  className={`p-2 rounded-lg border text-left flex items-center gap-2 transition-all text-xs ${
                    color === opt.color
                      ? 'border-slate-900 ring-2 ring-slate-900/10 font-semibold'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <span
                    className="w-4 h-4 rounded-full border border-black/10 shrink-0"
                    style={{ backgroundColor: opt.hex }}
                  />
                  <span className="truncate">{opt.color}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1.5">
              Note Description / Strategy Point
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="e.g. Automated ESG data pipeline from school accounting softwares"
              className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 min-h-[90px] resize-none"
              required
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!text.trim()}
              className="px-4 py-2 text-xs font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors disabled:opacity-50 flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add to Canvas</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
