import React from 'react';
import { X, ZoomIn, Download, ExternalLink } from 'lucide-react';

interface OriginalBoardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OriginalBoardModal: React.FC<OriginalBoardModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/80">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <h3 className="font-bold text-slate-900 text-sm">
                Original Whiteboard Source: My First Board
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              The original Business Model Canvas diagram created for Grant Tracker
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/assets/aistudio/My_First_Board_ebf95867.png"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open Raw Image</span>
            </a>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Image Viewer */}
        <div className="flex-1 overflow-auto p-4 bg-slate-100 flex items-center justify-center">
          <div className="relative max-w-full rounded-lg shadow-md border border-slate-200 overflow-hidden bg-white">
            <img
              src="/assets/aistudio/My_First_Board_ebf95867.png"
              alt="My First Board - Business Model Canvas for Grant Tracker"
              className="w-full h-auto object-contain max-h-[75vh]"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-white flex items-center justify-between text-xs text-slate-600 shrink-0">
          <div className="flex items-center gap-4">
            <span className="font-semibold text-slate-900">Transcribed Elements:</span>
            <span>9 Canvas Sections</span>
            <span>·</span>
            <span>35 Sticky Notes</span>
            <span>·</span>
            <span>Dot Voting Matrix (Cyan & Green)</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};
