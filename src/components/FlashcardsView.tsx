import React, { useState } from 'react';
import {
  Sparkles,
  RotateCw,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  HelpCircle,
  Shuffle,
  Grid,
  CreditCard,
  Download,
  Bookmark,
  Layers,
} from 'lucide-react';
import { Flashcard } from '../types';
import { exportFlashcardsAsAnkiCsv } from '../lib/exportUtils';

interface FlashcardsViewProps {
  flashcards: Flashcard[];
  onToggleMastered: (id: string) => void;
}

export const FlashcardsView: React.FC<FlashcardsViewProps> = ({
  flashcards,
  onToggleMastered,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [viewMode, setViewMode] = useState<'deck' | 'grid'>('deck');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [deckCards, setDeckCards] = useState<Flashcard[]>(flashcards);

  // Sync deckCards when flashcards change
  React.useEffect(() => {
    setDeckCards(flashcards);
  }, [flashcards]);

  const categories = React.useMemo(() => {
    const set = new Set<string>();
    flashcards.forEach((f) => {
      if (f.category) set.add(f.category);
    });
    return Array.from(set);
  }, [flashcards]);

  const filteredCards = deckCards.filter((card) => {
    return categoryFilter === 'All' || card.category === categoryFilter;
  });

  const activeCard = filteredCards[currentIndex] || filteredCards[0];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    const shuffled = [...deckCards].sort(() => Math.random() - 0.5);
    setDeckCards(shuffled);
    setCurrentIndex(0);
  };

  const masteredCount = flashcards.filter((f) => f.mastered).length;
  const masteredPercent = flashcards.length > 0 ? Math.round((masteredCount / flashcards.length) * 100) : 0;

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-6 px-4 sm:px-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#242424]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
              Active Recall & Retention
            </span>
            <span className="text-xs text-[#555555]">•</span>
            <span className="text-xs text-[#888888] font-medium">
              {flashcards.length} Conceptual Flashcards ({masteredCount} Mastered)
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#FFFFFF] tracking-tight">
            High-Yield Conceptual Flashcards
          </h2>
        </div>

        {/* Action Toolbar */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleShuffle}
            className="p-1.5 text-[#D1D1D1] hover:text-[#FFFFFF] bg-[#181818] border border-[#2A2A2A] hover:bg-[#222222] rounded-lg transition-colors"
            title="Shuffle deck"
          >
            <Shuffle className="w-4 h-4 text-[#D4AF37]" />
          </button>

          {/* View Mode Toggle */}
          <div className="bg-[#141414] border border-[#282828] p-0.5 rounded-lg flex items-center">
            <button
              onClick={() => setViewMode('deck')}
              className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
                viewMode === 'deck'
                  ? 'bg-[#222222] text-[#D4AF37] shadow-xs'
                  : 'text-[#888888] hover:text-[#FFFFFF]'
              }`}
              title="Study Deck Mode"
            >
              <CreditCard className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
                viewMode === 'grid'
                  ? 'bg-[#222222] text-[#D4AF37] shadow-xs'
                  : 'text-[#888888] hover:text-[#FFFFFF]'
              }`}
              title="Grid Overview Mode"
            >
              <Grid className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => exportFlashcardsAsAnkiCsv(flashcards)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#D1D1D1] bg-[#181818] border border-[#2A2A2A] hover:bg-[#222222] hover:text-[#FFFFFF] rounded-lg shadow-xs transition-colors"
            title="Export for Anki or Quizlet"
          >
            <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Export Anki</span>
          </button>
        </div>
      </div>

      {/* Category Filter & Mastery Stats */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#141414] p-3 rounded-xl border border-[#262626]">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[#888888]">Category:</span>
          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className="px-2.5 py-1 bg-[#181818] border border-[#2E2E2E] rounded-lg text-xs font-medium text-[#D1D1D1] focus:outline-none focus:border-[#D4AF37]"
          >
            <option value="All">All Categories ({flashcards.length})</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3 text-xs font-semibold text-[#D1D1D1]">
          <span>Mastery: {masteredPercent}%</span>
          <div className="w-24 bg-[#1E1E1E] border border-[#2A2A2A] rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] h-2 rounded-full transition-all"
              style={{ width: `${masteredPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* MODE 1: STUDY DECK (Single 3D Flip Card) */}
      {viewMode === 'deck' && activeCard && (
        <div className="max-w-2xl mx-auto space-y-4">
          {/* Card Container with 3D Flip */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="min-h-[280px] sm:min-h-[320px] bg-[#141414] rounded-3xl border border-[#282828] shadow-xl hover:border-[#D4AF37]/50 transition-all p-7 sm:p-9 cursor-pointer flex flex-col justify-between select-none relative group overflow-hidden"
          >
            {/* Top Bar on Card */}
            <div className="flex items-center justify-between text-xs mb-4">
              <span className="px-3 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] font-bold border border-[#D4AF37]/30">
                {activeCard.category}
              </span>
              <span className="text-[#777777] font-mono font-semibold">
                Card {currentIndex + 1} of {filteredCards.length}
              </span>
            </div>

            {/* Content Area */}
            <div className="my-auto py-4">
              {!isFlipped ? (
                // Question Front
                <div className="space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#888888] flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-[#D4AF37]" />
                    Question
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#FFFFFF] leading-snug">
                    {activeCard.question}
                  </h3>
                </div>
              ) : (
                // Answer Back
                <div className="space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Explanation & Core Concept
                  </div>
                  {activeCard.keyConcept && (
                    <div className="text-xs font-semibold text-[#D4AF37] bg-[#1E1E1E] border border-[#2E2E2E] px-2.5 py-1 rounded-md inline-block">
                      Key Concept: {activeCard.keyConcept}
                    </div>
                  )}
                  <p className="text-sm sm:text-base text-[#D1D1D1] leading-relaxed font-normal">
                    {activeCard.answer}
                  </p>
                </div>
              )}
            </div>

            {/* Card Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-[#222222] text-xs text-[#777777]">
              <span className="flex items-center gap-1">
                <RotateCw className="w-3 h-3 group-hover:rotate-180 transition-transform duration-300 text-[#D4AF37]" />
                Click anywhere to flip
              </span>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleMastered(activeCard.id);
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg font-semibold transition-colors ${
                  activeCard.mastered
                    ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/60'
                    : 'bg-[#1E1E1E] hover:bg-[#282828] border border-[#2E2E2E] text-[#888888] hover:text-[#D1D1D1]'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{activeCard.mastered ? 'Mastered' : 'Mark Mastered'}</span>
              </button>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4 pt-2">
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-full bg-[#181818] border border-[#2A2A2A] text-[#D1D1D1] hover:bg-[#222222] shadow-xs transition-colors"
              title="Previous card"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <span className="text-xs font-mono font-bold text-[#888888] px-4">
              {currentIndex + 1} / {filteredCards.length}
            </span>

            <button
              onClick={handleNext}
              className="p-2.5 rounded-full bg-[#181818] border border-[#2A2A2A] text-[#D1D1D1] hover:bg-[#222222] shadow-xs transition-colors"
              title="Next card"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* MODE 2: GRID OVERVIEW (All Cards) */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCards.map((card, idx) => (
            <div
              key={card.id}
              className="p-5 rounded-2xl bg-[#141414] border border-[#262626] shadow-sm hover:border-[#D4AF37]/40 flex flex-col justify-between gap-4"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/30 px-2 py-0.5 rounded-md">
                    {card.category}
                  </span>
                  <span className="text-xs font-mono text-[#666666]">Card {idx + 1}</span>
                </div>

                <h4 className="font-bold text-[#FFFFFF] text-sm mb-2 leading-snug">
                  {card.question}
                </h4>

                <div className="pt-2 border-t border-[#222222]">
                  {card.keyConcept && (
                    <div className="text-[11px] font-semibold text-[#888888] mb-1">
                      Concept: {card.keyConcept}
                    </div>
                  )}
                  <p className="text-xs text-[#D1D1D1] leading-relaxed font-normal">
                    {card.answer}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#222222] flex items-center justify-between">
                <button
                  onClick={() => onToggleMastered(card.id)}
                  className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md transition-colors ${
                    card.mastered
                      ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/60'
                      : 'bg-[#1E1E1E] text-[#888888] border border-[#2E2E2E] hover:text-[#D1D1D1] hover:bg-[#262626]'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{card.mastered ? 'Mastered' : 'Mark Mastered'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
