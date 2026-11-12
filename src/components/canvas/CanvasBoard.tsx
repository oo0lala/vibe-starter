import React, { useState, useMemo } from 'react';
import { CanvasNote, CanvasSectionId, NoteColor } from '../../types/canvas';
import { CANVAS_SECTIONS, CANVAS_BANNER_TEXT } from '../../data/initialCanvasData';
import { StickyNote } from './StickyNote';
import { DotVotingToolbar } from './DotVotingToolbar';
import { AddNoteModal } from './AddNoteModal';
import { OriginalBoardModal } from './OriginalBoardModal';
import {
  Plus,
  RotateCcw,
  Download,
  Copy,
  Check,
  Search,
  Filter,
  Eye,
  Sparkles,
  Info
} from 'lucide-react';

interface CanvasBoardProps {
  notes: CanvasNote[];
  onVote: (noteId: string, color: 'cyan' | 'green') => void;
  onUpdateText: (noteId: string, text: string) => void;
  onDeleteNote: (noteId: string) => void;
  onAddNote: (sectionId: CanvasSectionId, text: string, color: NoteColor) => void;
  onResetToOriginal: () => void;
  onResetVotes: () => void;
}

export const CanvasBoard: React.FC<CanvasBoardProps> = ({
  notes,
  onVote,
  onUpdateText,
  onDeleteNote,
  onAddNote,
  onResetToOriginal,
  onResetVotes
}) => {
  const [activeVoteColor, setActiveVoteColor] = useState<'cyan' | 'green' | null>(null);
  const [highlightTopVoted, setHighlightTopVoted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [colorFilter, setColorFilter] = useState<string>('all');
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedSectionForAdd, setSelectedSectionForAdd] =
    useState<CanvasSectionId>('key_propositions');
  const [isOriginalModalOpen, setIsOriginalModalOpen] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);

  // Totals for votes
  const totalCyanVotes = useMemo(
    () => notes.reduce((sum, n) => sum + (n.votes.cyan || 0), 0),
    [notes]
  );
  const totalGreenVotes = useMemo(
    () => notes.reduce((sum, n) => sum + (n.votes.green || 0), 0),
    [notes]
  );

  // Calculate top voted note IDs if highlight enabled
  const topVotedIds = useMemo(() => {
    if (!highlightTopVoted) return new Set<string>();
    const sorted = [...notes].sort(
      (a, b) =>
        b.votes.cyan + b.votes.green - (a.votes.cyan + a.votes.green)
    );
    return new Set(sorted.slice(0, 5).map((n) => n.id));
  }, [notes, highlightTopVoted]);

  // Filter notes
  const filteredNotes = useMemo(() => {
    return notes.filter((n) => {
      const matchesSearch = searchTerm
        ? n.text.toLowerCase().includes(searchTerm.toLowerCase())
        : true;
      const matchesColor =
        colorFilter === 'all' ? true : n.color === colorFilter;
      return matchesSearch && matchesColor;
    });
  }, [notes, searchTerm, colorFilter]);

  const getNotesForSection = (sectionId: CanvasSectionId) => {
    return filteredNotes.filter((n) => n.sectionId === sectionId);
  };

  const handleOpenAddForSection = (secId: CanvasSectionId) => {
    setSelectedSectionForAdd(secId);
    setAddModalOpen(true);
  };

  const handleExportJSON = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify({ banner: CANVAS_BANNER_TEXT, notes }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'grant_tracker_business_model_canvas.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleCopySummary = () => {
    const lines = [
      `# Grant Tracker - Business Model Canvas`,
      `"${CANVAS_BANNER_TEXT}"\n`
    ];

    CANVAS_SECTIONS.forEach((sec) => {
      lines.push(`## ${sec.title} (${sec.promptQuestion})`);
      const secNotes = notes.filter((n) => n.sectionId === sec.id);
      if (secNotes.length === 0) {
        lines.push(`(No notes recorded)`);
      } else {
        secNotes.forEach((n) => {
          lines.push(`- ${n.text} [Votes: Cyan ${n.votes.cyan}, Green ${n.votes.green}]`);
        });
      }
      lines.push('');
    });

    navigator.clipboard.writeText(lines.join('\n'));
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner exactly replicating the board's yellow header */}
      <div className="relative mx-auto max-w-4xl px-4 text-center">
        <div className="inline-block bg-[#FACC15] text-slate-950 font-semibold px-8 py-3.5 rounded-2xl shadow-sm border border-amber-400 text-xs sm:text-sm tracking-tight leading-relaxed max-w-3xl">
          {CANVAS_BANNER_TEXT}
        </div>
      </div>

      {/* Canvas Controls Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
        {/* Search & Filter */}
        <div className="flex items-center gap-2.5 flex-1 max-w-lg">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search sticky notes..."
              className="w-full text-xs pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={colorFilter}
              onChange={(e) => setColorFilter(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 focus:outline-none"
            >
              <option value="all">All Note Colors</option>
              <option value="yellow">Yellow Notes</option>
              <option value="blue">Blue Notes</option>
              <option value="light-blue">Light Blue Notes</option>
              <option value="orange">Orange Notes</option>
              <option value="green">Green Notes</option>
              <option value="light-green">Light Green Notes</option>
            </select>
          </div>
        </div>

        {/* Center: Dot Voting Toolbar */}
        <div className="shrink-0">
          <DotVotingToolbar
            activeVoteColor={activeVoteColor}
            setActiveVoteColor={setActiveVoteColor}
            totalCyanVotes={totalCyanVotes}
            totalGreenVotes={totalGreenVotes}
            highlightTopVoted={highlightTopVoted}
            setHighlightTopVoted={setHighlightTopVoted}
            onResetVotes={onResetVotes}
          />
        </div>

        {/* Right action buttons */}
        <div className="flex items-center gap-2 justify-end shrink-0 flex-wrap">
          <button
            type="button"
            onClick={() => setIsOriginalModalOpen(true)}
            className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-colors flex items-center gap-1.5"
            title="Inspect original photo uploaded by user"
          >
            <Eye className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Original Whiteboard</span>
          </button>

          <button
            type="button"
            onClick={handleCopySummary}
            className="p-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
            title="Copy entire canvas text summary to clipboard"
          >
            {copiedSummary ? (
              <Check className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>

          <button
            type="button"
            onClick={handleExportJSON}
            className="p-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
            title="Export canvas as JSON backup"
          >
            <Download className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={onResetToOriginal}
            className="px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1"
            title="Restore original 35 sticky notes from the image"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          <button
            type="button"
            onClick={() => setAddModalOpen(true)}
            className="px-3.5 py-1.5 text-xs font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Sticky</span>
          </button>
        </div>
      </div>

      {/* Main Whiteboard Canvas Grid */}
      <div className="canvas-grid p-6 bg-slate-50/90 rounded-2xl border border-slate-200/80 shadow-inner overflow-x-auto">
        <div className="min-w-[1180px] space-y-4">
          {/* Upper Osterwalder Grid: 5 columns */}
          <div className="grid grid-cols-5 gap-4 items-start">
            {/* 1. Key Partners */}
            <SectionCard
              section={CANVAS_SECTIONS[0]}
              notes={getNotesForSection('key_partners')}
              activeVoteColor={activeVoteColor}
              topVotedIds={topVotedIds}
              onVote={onVote}
              onUpdateText={onUpdateText}
              onDeleteNote={onDeleteNote}
              onAddClick={() => handleOpenAddForSection('key_partners')}
            />

            {/* 2. Middle Stacked: Key Activities (top) & Key Resources (bottom) */}
            <div className="space-y-4">
              <SectionCard
                section={CANVAS_SECTIONS[1]}
                notes={getNotesForSection('key_activities')}
                activeVoteColor={activeVoteColor}
                topVotedIds={topVotedIds}
                onVote={onVote}
                onUpdateText={onUpdateText}
                onDeleteNote={onDeleteNote}
                onAddClick={() => handleOpenAddForSection('key_activities')}
              />
              <SectionCard
                section={CANVAS_SECTIONS[2]}
                notes={getNotesForSection('key_resources')}
                activeVoteColor={activeVoteColor}
                topVotedIds={topVotedIds}
                onVote={onVote}
                onUpdateText={onUpdateText}
                onDeleteNote={onDeleteNote}
                onAddClick={() => handleOpenAddForSection('key_resources')}
              />
            </div>

            {/* 3. Center: Key Propositions (Value Propositions) */}
            <SectionCard
              section={CANVAS_SECTIONS[3]}
              notes={getNotesForSection('key_propositions')}
              activeVoteColor={activeVoteColor}
              topVotedIds={topVotedIds}
              onVote={onVote}
              onUpdateText={onUpdateText}
              onDeleteNote={onDeleteNote}
              onAddClick={() => handleOpenAddForSection('key_propositions')}
              isCenterPrimary
            />

            {/* 4. Middle Stacked Right: Customer Relationships (top) & Channels (bottom) */}
            <div className="space-y-4">
              <SectionCard
                section={CANVAS_SECTIONS[4]}
                notes={getNotesForSection('customer_relationships')}
                activeVoteColor={activeVoteColor}
                topVotedIds={topVotedIds}
                onVote={onVote}
                onUpdateText={onUpdateText}
                onDeleteNote={onDeleteNote}
                onAddClick={() => handleOpenAddForSection('customer_relationships')}
              />
              <SectionCard
                section={CANVAS_SECTIONS[5]}
                notes={getNotesForSection('channels')}
                activeVoteColor={activeVoteColor}
                topVotedIds={topVotedIds}
                onVote={onVote}
                onUpdateText={onUpdateText}
                onDeleteNote={onDeleteNote}
                onAddClick={() => handleOpenAddForSection('channels')}
              />
            </div>

            {/* 5. Customer Segments */}
            <SectionCard
              section={CANVAS_SECTIONS[6]}
              notes={getNotesForSection('customer_segments')}
              activeVoteColor={activeVoteColor}
              topVotedIds={topVotedIds}
              onVote={onVote}
              onUpdateText={onUpdateText}
              onDeleteNote={onDeleteNote}
              onAddClick={() => handleOpenAddForSection('customer_segments')}
            />
          </div>

          {/* Bottom Financial Foundations: Cost Structure (left) & Revenue Streams (right) */}
          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-200">
            <SectionCard
              section={CANVAS_SECTIONS[7]}
              notes={getNotesForSection('cost_structure')}
              activeVoteColor={activeVoteColor}
              topVotedIds={topVotedIds}
              onVote={onVote}
              onUpdateText={onUpdateText}
              onDeleteNote={onDeleteNote}
              onAddClick={() => handleOpenAddForSection('cost_structure')}
              horizontalNotes
            />

            <SectionCard
              section={CANVAS_SECTIONS[8]}
              notes={getNotesForSection('revenue_streams')}
              activeVoteColor={activeVoteColor}
              topVotedIds={topVotedIds}
              onVote={onVote}
              onUpdateText={onUpdateText}
              onDeleteNote={onDeleteNote}
              onAddClick={() => handleOpenAddForSection('revenue_streams')}
              horizontalNotes
            />
          </div>
        </div>
      </div>

      {/* Add Note Modal */}
      <AddNoteModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAddNote={onAddNote}
        defaultSectionId={selectedSectionForAdd}
      />

      {/* Original Board Modal */}
      <OriginalBoardModal
        isOpen={isOriginalModalOpen}
        onClose={() => setIsOriginalModalOpen(false)}
      />
    </div>
  );
};

interface SectionCardProps {
  section: (typeof CANVAS_SECTIONS)[0];
  notes: CanvasNote[];
  activeVoteColor: 'cyan' | 'green' | null;
  topVotedIds: Set<string>;
  onVote: (noteId: string, color: 'cyan' | 'green') => void;
  onUpdateText: (noteId: string, text: string) => void;
  onDeleteNote: (noteId: string) => void;
  onAddClick: () => void;
  isCenterPrimary?: boolean;
  horizontalNotes?: boolean;
}

const SectionCard: React.FC<SectionCardProps> = ({
  section,
  notes,
  activeVoteColor,
  topVotedIds,
  onVote,
  onUpdateText,
  onDeleteNote,
  onAddClick,
  isCenterPrimary,
  horizontalNotes
}) => {
  return (
    <div
      className={`rounded-xl bg-white/70 backdrop-blur-xs border p-3.5 flex flex-col justify-between transition-colors ${
        isCenterPrimary
          ? 'border-amber-300/80 bg-amber-50/20 shadow-xs'
          : 'border-slate-200/90'
      }`}
    >
      {/* Section Header */}
      <div className="mb-3">
        <div className="flex items-center justify-between gap-1.5">
          <h3 className="font-bold text-slate-900 text-sm tracking-tight">{section.title}</h3>
          <button
            type="button"
            onClick={onAddClick}
            className="p-1 rounded-md text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            title={`Add note to ${section.title}`}
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
        <p className="text-[11px] text-slate-500 leading-tight mt-0.5 line-clamp-2">
          {section.promptQuestion}
        </p>
      </div>

      {/* Sticky Notes Container */}
      <div
        className={`flex-1 ${
          horizontalNotes
            ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'
            : 'grid grid-cols-1 sm:grid-cols-2 gap-3'
        }`}
      >
        {notes.length === 0 ? (
          <div className="col-span-full py-6 text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-lg">
            No notes here yet
          </div>
        ) : (
          notes.map((note) => {
            const isTop = topVotedIds.has(note.id);
            return (
              <div
                key={note.id}
                className={`relative transition-all ${
                  isTop ? 'ring-2 ring-amber-400 rounded-sm scale-102 z-10' : ''
                }`}
              >
                {isTop && (
                  <span className="absolute -top-2 -right-1 bg-amber-500 text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full shadow-xs z-20">
                    ★ Top Pick
                  </span>
                )}
                <StickyNote
                  note={note}
                  activeVoteColor={activeVoteColor}
                  onVote={onVote}
                  onUpdateText={onUpdateText}
                  onDelete={onDeleteNote}
                />
              </div>
            );
          })
        )}
      </div>

      {/* Section Footer: Count */}
      <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
        <span>{notes.length} {notes.length === 1 ? 'note' : 'notes'}</span>
        <button
          type="button"
          onClick={onAddClick}
          className="text-slate-500 hover:text-slate-900 font-medium transition-colors"
        >
          + Add
        </button>
      </div>
    </div>
  );
};
