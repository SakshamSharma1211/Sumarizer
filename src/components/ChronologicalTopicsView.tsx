import React, { useState } from 'react';
import {
  Clock,
  Play,
  Search,
  User,
  ChevronDown,
  ChevronUp,
  Bookmark,
  Sparkles,
  Layers,
} from 'lucide-react';
import { TopicBreakdownItem } from '../types';

interface ChronologicalTopicsViewProps {
  topics: TopicBreakdownItem[];
  currentTime: number;
  onSeek: (seconds: number) => void;
}

export const ChronologicalTopicsView: React.FC<ChronologicalTopicsViewProps> = ({
  topics,
  currentTime,
  onSeek,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedTopics, setExpandedTopics] = useState<Record<number, boolean>>({});

  const toggleTopic = (index: number) => {
    setExpandedTopics((prev) => ({
      ...prev,
      [index]: prev[index] !== undefined ? !prev[index] : false, // default true
    }));
  };

  const isExpanded = (index: number) => {
    return expandedTopics[index] !== undefined ? expandedTopics[index] : true;
  };

  const expandAll = () => {
    const all: Record<number, boolean> = {};
    topics.forEach((_, idx) => (all[idx] = true));
    setExpandedTopics(all);
  };

  const collapseAll = () => {
    const none: Record<number, boolean> = {};
    topics.forEach((_, idx) => (none[idx] = false));
    setExpandedTopics(none);
  };

  // Filter topics
  const filteredTopics = topics.filter((t) => {
    const q = searchQuery.toLowerCase();
    return (
      t.title.toLowerCase().includes(q) ||
      t.timestamp.toLowerCase().includes(q) ||
      (t.speaker && t.speaker.toLowerCase().includes(q)) ||
      t.bullets.some((b) => b.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-6 px-4 sm:px-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#242424]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
              Timestamp-Linked Agenda
            </span>
            <span className="text-xs text-[#555555]">•</span>
            <span className="text-xs text-[#888888] font-medium">
              {topics.length} Chronological Sections
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#FFFFFF] tracking-tight">
            Chronological Topic Breakdown
          </h2>
        </div>

        {/* Search & Collapse Controls */}
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#777777] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics or concepts..."
              className="pl-8 pr-3 py-1.5 text-xs bg-[#181818] border border-[#2E2E2E] text-[#E0E0E0] placeholder-[#666666] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 focus:border-[#D4AF37] w-48 sm:w-60"
            />
          </div>

          <button
            onClick={expandAll}
            className="px-2.5 py-1.5 text-xs font-medium text-[#D1D1D1] hover:text-[#FFFFFF] bg-[#181818] border border-[#2A2A2A] hover:bg-[#222222] rounded-lg transition-colors"
            title="Expand All Topics"
          >
            Expand All
          </button>
          <button
            onClick={collapseAll}
            className="px-2.5 py-1.5 text-xs font-medium text-[#D1D1D1] hover:text-[#FFFFFF] bg-[#181818] border border-[#2A2A2A] hover:bg-[#222222] rounded-lg transition-colors"
            title="Collapse All Topics"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* Timeline Section List */}
      <div className="relative pl-6 sm:pl-8 space-y-6 before:content-[''] before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#282828]">
        {filteredTopics.map((topic, idx) => {
          const isActive =
            currentTime >= (topic.seconds || 0) &&
            (idx === topics.length - 1 || currentTime < (topics[idx + 1]?.seconds || Infinity));
          const open = isExpanded(idx);

          return (
            <div
              key={idx}
              className={`relative rounded-2xl border transition-all ${
                isActive
                  ? 'bg-[#18160E] border-[#D4AF37]/70 shadow-md ring-2 ring-[#D4AF37]/15'
                  : 'bg-[#141414] border-[#262626] shadow-sm hover:border-[#D4AF37]/40'
              }`}
            >
              {/* Timeline Marker Node */}
              <div
                onClick={() => onSeek(topic.seconds || 0)}
                className={`absolute -left-[30px] sm:-left-[38px] top-5 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer transition-all ${
                  isActive
                    ? 'bg-[#D4AF37] text-[#0A0A0A] ring-4 ring-[#D4AF37]/20 shadow-xs'
                    : 'bg-[#181818] border-2 border-[#444444] text-[#888888] hover:border-[#D4AF37] hover:text-[#D4AF37]'
                }`}
                title={`Jump to ${topic.timestamp}`}
              >
                <Play className="w-2.5 h-2.5 ml-0.5 fill-current" />
              </div>

              {/* Card Header */}
              <div
                onClick={() => toggleTopic(idx)}
                className="p-5 sm:p-6 cursor-pointer flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSeek(topic.seconds || 0);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-colors shrink-0 ${
                      isActive
                        ? 'bg-[#D4AF37] text-[#0A0A0A] shadow-xs'
                        : 'bg-[#1E1E1E] border border-[#2E2E2E] hover:border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#262626]'
                    }`}
                    title="Click to jump audio playback to this section"
                  >
                    <Clock className="w-3 h-3" />
                    <span>{topic.timestamp}</span>
                  </button>

                  <div className="min-w-0">
                    <h3 className="text-sm sm:text-base font-bold text-[#FFFFFF] truncate">
                      {topic.title}
                    </h3>
                    {topic.speaker && (
                      <span className="inline-flex items-center gap-1 text-xs text-[#888888] font-medium">
                        <User className="w-3 h-3 text-[#666666]" />
                        {topic.speaker}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-[#666666] font-medium hidden sm:inline">
                    {topic.bullets.length} key insights
                  </span>
                  <div className="text-[#888888] p-1">
                    {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {/* Comprehensive 2-4 Bullets */}
              {open && (
                <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 border-t border-[#222222]">
                  <ul className="space-y-2.5 mt-4">
                    {topic.bullets.map((bullet, bIdx) => (
                      <li
                        key={bIdx}
                        className="text-xs sm:text-sm text-[#D1D1D1] leading-relaxed flex items-start gap-2.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0 mt-2" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
