import React from 'react';
import {
  Sparkles,
  FileAudio,
  Calendar,
  Download,
  Share2,
  BookOpen,
  CheckSquare,
  Clock,
  RotateCcw,
  BotMessageSquare,
} from 'lucide-react';
import { AnalysisResult, SessionCategory } from '../types';

interface HeaderProps {
  analysis: AnalysisResult | null;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenNewSession: () => void;
  onExportMarkdown: () => void;
  onOpenChat: () => void;
  chatOpen: boolean;
}

const CATEGORY_COLORS: Record<SessionCategory, { bg: string; text: string; border: string }> = {
  Meeting: { bg: 'bg-blue-950/50 text-blue-300', text: 'text-blue-300', border: 'border-blue-800/60' },
  Lecture: { bg: 'bg-emerald-950/50 text-emerald-300', text: 'text-emerald-300', border: 'border-emerald-800/60' },
  Workshop: { bg: 'bg-amber-950/50 text-amber-300', text: 'text-amber-300', border: 'border-amber-800/60' },
  Interview: { bg: 'bg-purple-950/50 text-purple-300', text: 'text-purple-300', border: 'border-purple-800/60' },
  Presentation: { bg: 'bg-rose-950/50 text-rose-300', text: 'text-rose-300', border: 'border-rose-800/60' },
};

export const Header: React.FC<HeaderProps> = ({
  analysis,
  activeTab,
  setActiveTab,
  onOpenNewSession,
  onExportMarkdown,
  onOpenChat,
  chatOpen,
}) => {
  const categoryStyle = analysis ? CATEGORY_COLORS[analysis.category] || CATEGORY_COLORS.Meeting : null;

  return (
    <header className="sticky top-0 z-30 bg-[#0E0E0E]/95 backdrop-blur-md border-b border-[#242424] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand & Active Session Title */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#D4AF37] via-[#E5C158] to-[#996515] flex items-center justify-center text-[#0A0A0A] shadow-sm shrink-0 font-bold">
              <Sparkles className="w-5 h-5 text-[#0A0A0A]" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#FFFFFF] tracking-tight text-base sm:text-lg truncate">
                  {analysis ? analysis.title : 'Audio & Video Intelligence Engine'}
                </span>
                {analysis && categoryStyle && (
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold border ${categoryStyle.bg} ${categoryStyle.border}`}
                  >
                    {analysis.category}
                  </span>
                )}
              </div>
              <p className="text-xs text-[#888888] truncate hidden sm:block">
                {analysis
                  ? `${analysis.fileName || 'Recording'} • Duration: ${analysis.duration || 'Auto-detected'} • Gemini 3.7 Intelligence`
                  : 'AI Multimodal Transcription, Structural Breakdown & Execution Engine'}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            {analysis && (
              <>
                <button
                  id="btn-export-markdown"
                  onClick={onExportMarkdown}
                  className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#D1D1D1] bg-[#181818] hover:bg-[#242424] border border-[#2A2A2A] rounded-lg transition-colors"
                  title="Export analysis as Markdown report"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Report</span>
                </button>

                <button
                  id="btn-toggle-ai-chat"
                  onClick={onOpenChat}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    chatOpen
                      ? 'bg-[#D4AF37] text-[#0A0A0A] shadow-xs'
                      : 'text-[#D4AF37] bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 border border-[#D4AF37]/30'
                  }`}
                >
                  <BotMessageSquare className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">AI Q&A</span>
                </button>
              </>
            )}

            <button
              id="btn-new-recording"
              onClick={onOpenNewSession}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-[#0A0A0A] bg-[#D4AF37] hover:bg-[#E5C158] rounded-lg shadow-sm transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{analysis ? 'New Recording' : 'Load Recording'}</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs (when an analysis is active) */}
        {analysis && (
          <div className="flex space-x-1 border-t border-[#1F1F1F] overflow-x-auto scrollbar-none py-1">
            <button
              id="tab-summary"
              onClick={() => setActiveTab('summary')}
              className={`px-3 py-2 text-xs font-medium rounded-md whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeTab === 'summary'
                  ? 'bg-[#1C1C1C] text-[#D4AF37] border border-[#D4AF37]/40 font-semibold shadow-xs'
                  : 'text-[#888888] hover:text-[#FFFFFF] hover:bg-[#161616]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Executive Summary</span>
            </button>

            <button
              id="tab-topics"
              onClick={() => setActiveTab('topics')}
              className={`px-3 py-2 text-xs font-medium rounded-md whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeTab === 'topics'
                  ? 'bg-[#1C1C1C] text-[#D4AF37] border border-[#D4AF37]/40 font-semibold shadow-xs'
                  : 'text-[#888888] hover:text-[#FFFFFF] hover:bg-[#161616]'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Chronological Topics ({analysis.topics?.length || 0})</span>
            </button>

            <button
              id="tab-actions"
              onClick={() => setActiveTab('actions')}
              className={`px-3 py-2 text-xs font-medium rounded-md whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeTab === 'actions'
                  ? 'bg-[#1C1C1C] text-[#D4AF37] border border-[#D4AF37]/40 font-semibold shadow-xs'
                  : 'text-[#888888] hover:text-[#FFFFFF] hover:bg-[#161616]'
              }`}
            >
              <CheckSquare className="w-3.5 h-3.5" />
              <span>Action Items ({analysis.actionItems?.length || 0})</span>
            </button>

            <button
              id="tab-flashcards"
              onClick={() => setActiveTab('flashcards')}
              className={`px-3 py-2 text-xs font-medium rounded-md whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeTab === 'flashcards'
                  ? 'bg-[#1C1C1C] text-[#D4AF37] border border-[#D4AF37]/40 font-semibold shadow-xs'
                  : 'text-[#888888] hover:text-[#FFFFFF] hover:bg-[#161616]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Flashcards ({analysis.flashcards?.length || 0})</span>
            </button>

            <button
              id="tab-calendar"
              onClick={() => setActiveTab('calendar')}
              className={`px-3 py-2 text-xs font-medium rounded-md whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeTab === 'calendar'
                  ? 'bg-[#1C1C1C] text-[#D4AF37] border border-[#D4AF37]/40 font-semibold shadow-xs'
                  : 'text-[#888888] hover:text-[#FFFFFF] hover:bg-[#161616]'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Calendar Schedule ({analysis.calendarEvents?.length || 0})</span>
            </button>

            <button
              id="tab-transcript"
              onClick={() => setActiveTab('transcript')}
              className={`px-3 py-2 text-xs font-medium rounded-md whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeTab === 'transcript'
                  ? 'bg-[#1C1C1C] text-[#D4AF37] border border-[#D4AF37]/40 font-semibold shadow-xs'
                  : 'text-[#888888] hover:text-[#FFFFFF] hover:bg-[#161616]'
              }`}
            >
              <FileAudio className="w-3.5 h-3.5" />
              <span>Transcript</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
