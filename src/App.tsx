import React, { useState } from 'react';
import { CanvasNote, CanvasSectionId, NoteColor } from './types/canvas';
import { Grant } from './types/grant';
import { INITIAL_CANVAS_NOTES } from './data/initialCanvasData';
import { SAMPLE_GRANTS } from './data/sampleGrants';
import { CanvasBoard } from './components/canvas/CanvasBoard';
import { OriginalBoardModal } from './components/canvas/OriginalBoardModal';
import { GrantDashboard } from './components/tracker/GrantDashboard';
import { GrantDetailModal } from './components/tracker/GrantDetailModal';
import { SgxSustainabilityReporter } from './components/tracker/SgxSustainabilityReporter';
import { RevenueModelPricing } from './components/tracker/RevenueModelPricing';
import { BestPracticesHub } from './components/tracker/BestPracticesHub';
import { Eye, Shield, Layers, FileCheck } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<
    'canvas' | 'dashboard' | 'sgx' | 'pricing' | 'community'
  >('canvas');

  // Interactive Canvas State
  const [notes, setNotes] = useState<CanvasNote[]>(INITIAL_CANVAS_NOTES);
  const [isOriginalBoardModalOpen, setIsOriginalBoardModalOpen] = useState(false);

  // Live Grants Platform State
  const [grants, setGrants] = useState<Grant[]>(SAMPLE_GRANTS);
  const [selectedGrantForDetail, setSelectedGrantForDetail] = useState<Grant | null>(null);
  const [selectedGrantForSgx, setSelectedGrantForSgx] = useState<Grant | null>(null);

  // Canvas Handlers
  const handleVote = (noteId: string, color: 'cyan' | 'green') => {
    setNotes((prev) =>
      prev.map((n) => {
        if (n.id === noteId) {
          return {
            ...n,
            votes: {
              ...n.votes,
              [color]: (n.votes[color] || 0) + 1
            }
          };
        }
        return n;
      })
    );
  };

  const handleUpdateText = (noteId: string, newText: string) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === noteId ? { ...n, text: newText } : n))
    );
  };

  const handleDeleteNote = (noteId: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== noteId));
  };

  const handleAddNote = (
    sectionId: CanvasSectionId,
    text: string,
    color: NoteColor
  ) => {
    const tilts: ('tilt-1' | 'tilt-2' | 'tilt-3' | 'tilt-0')[] = [
      'tilt-1',
      'tilt-2',
      'tilt-3',
      'tilt-0'
    ];
    const randomTilt = tilts[Math.floor(Math.random() * tilts.length)];

    const newNote: CanvasNote = {
      id: `note-custom-${Date.now()}`,
      sectionId,
      text,
      color,
      tilt: randomTilt,
      votes: { cyan: 0, green: 0 },
      createdAt: new Date().toISOString()
    };
    setNotes((prev) => [newNote, ...prev]);
  };

  const handleResetToOriginal = () => {
    setNotes(INITIAL_CANVAS_NOTES);
  };

  const handleResetVotes = () => {
    setNotes((prev) =>
      prev.map((n) => {
        const orig = INITIAL_CANVAS_NOTES.find((o) => o.id === n.id);
        return {
          ...n,
          votes: orig ? { ...orig.votes } : { cyan: 0, green: 0 }
        };
      })
    );
  };

  // Grant Handlers
  const handleUpdateGrant = (updatedGrant: Grant) => {
    setGrants((prev) =>
      prev.map((g) => (g.id === updatedGrant.id ? updatedGrant : g))
    );
    setSelectedGrantForDetail(updatedGrant);
  };

  const handleOpenSgxFromDashboard = (grant: Grant) => {
    setSelectedGrantForSgx(grant);
    setActiveTab('sgx');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Top Bar following Top Bar Contract: Zone 1 (Wordmark) - Zone 2 (4-5 Nav Links) - Zone 3 (1 Primary Action) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <button
            type="button"
            onClick={() => setActiveTab('canvas')}
            className="text-lg font-extrabold tracking-tight text-slate-900 whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer"
          >
            <div className="w-6 h-6 rounded-md bg-amber-400 flex items-center justify-center text-slate-950 font-bold text-xs shadow-xs">
              GT
            </div>
            <span>GrantTracker</span>
          </button>

          {/* Zone 2: 4–5 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button
              type="button"
              onClick={() => setActiveTab('canvas')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-1 cursor-pointer ${
                activeTab === 'canvas'
                  ? 'text-slate-900 font-bold border-b-2 border-slate-900'
                  : ''
              }`}
            >
              Strategy Canvas
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('dashboard')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-1 cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'text-slate-900 font-bold border-b-2 border-slate-900'
                  : ''
              }`}
            >
              Efficacy Portfolio
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedGrantForSgx(null);
                setActiveTab('sgx');
              }}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-1 cursor-pointer ${
                activeTab === 'sgx'
                  ? 'text-slate-900 font-bold border-b-2 border-slate-900'
                  : ''
              }`}
            >
              SGX Reports
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('pricing')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-1 cursor-pointer ${
                activeTab === 'pricing'
                  ? 'text-slate-900 font-bold border-b-2 border-slate-900'
                  : ''
              }`}
            >
              Commercial Model
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('community')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-1 cursor-pointer ${
                activeTab === 'community'
                  ? 'text-slate-900 font-bold border-b-2 border-slate-900'
                  : ''
              }`}
            >
              Best Practice Hub
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setIsOriginalBoardModalOpen(true)}
              className="px-3.5 py-2 text-xs font-semibold text-slate-800 bg-amber-300 hover:bg-amber-400 border border-amber-400 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow-xs"
              title="Inspect original whiteboard uploaded by user"
            >
              <Eye className="w-3.5 h-3.5 text-slate-900" />
              <span>Original Whiteboard</span>
            </button>
          </div>
        </div>

        {/* Mobile Nav strip */}
        <div className="md:hidden flex items-center gap-4 px-4 py-2 border-t border-slate-100 overflow-x-auto text-xs font-medium text-slate-600 bg-slate-50">
          <button
            type="button"
            onClick={() => setActiveTab('canvas')}
            className={`whitespace-nowrap ${
              activeTab === 'canvas' ? 'text-slate-900 font-bold' : ''
            }`}
          >
            Canvas
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('dashboard')}
            className={`whitespace-nowrap ${
              activeTab === 'dashboard' ? 'text-slate-900 font-bold' : ''
            }`}
          >
            Portfolio
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('sgx')}
            className={`whitespace-nowrap ${
              activeTab === 'sgx' ? 'text-slate-900 font-bold' : ''
            }`}
          >
            SGX Reports
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('pricing')}
            className={`whitespace-nowrap ${
              activeTab === 'pricing' ? 'text-slate-900 font-bold' : ''
            }`}
          >
            Pricing
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('community')}
            className={`whitespace-nowrap ${
              activeTab === 'community' ? 'text-slate-900 font-bold' : ''
            }`}
          >
            Advisory
          </button>
        </div>
      </header>

      {/* Main Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeTab === 'canvas' && (
          <CanvasBoard
            notes={notes}
            onVote={handleVote}
            onUpdateText={handleUpdateText}
            onDeleteNote={handleDeleteNote}
            onAddNote={handleAddNote}
            onResetToOriginal={handleResetToOriginal}
            onResetVotes={handleResetVotes}
          />
        )}

        {activeTab === 'dashboard' && (
          <GrantDashboard
            grants={grants}
            onSelectGrant={(g) => setSelectedGrantForDetail(g)}
            onGenerateSgxReport={handleOpenSgxFromDashboard}
          />
        )}

        {activeTab === 'sgx' && (
          <SgxSustainabilityReporter
            grants={grants}
            initialSelectedGrant={selectedGrantForSgx}
          />
        )}

        {activeTab === 'pricing' && <RevenueModelPricing />}

        {activeTab === 'community' && <BestPracticesHub />}
      </main>

      {/* Modals */}
      <GrantDetailModal
        grant={selectedGrantForDetail}
        isOpen={!!selectedGrantForDetail}
        onClose={() => setSelectedGrantForDetail(null)}
        onUpdateGrant={handleUpdateGrant}
        onOpenSgxReport={(g) => {
          setSelectedGrantForDetail(null);
          handleOpenSgxFromDashboard(g);
        }}
      />

      <OriginalBoardModal
        isOpen={isOriginalBoardModalOpen}
        onClose={() => setIsOriginalBoardModalOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white mt-12 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900">GrantTracker</span>
            <span>·</span>
            <span>Based on Business Model Canvas (My First Board)</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setActiveTab('canvas')}
              className="hover:text-slate-900 transition-colors"
            >
              Whiteboard Canvas
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('dashboard')}
              className="hover:text-slate-900 transition-colors"
            >
              Portfolio Monitor
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('sgx')}
              className="hover:text-slate-900 transition-colors"
            >
              SGX Disclosure
            </button>
            <button
              type="button"
              onClick={() => setIsOriginalBoardModalOpen(true)}
              className="hover:text-slate-900 transition-colors"
            >
              Source Whiteboard
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
