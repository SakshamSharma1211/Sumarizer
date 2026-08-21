import React, { useState } from 'react';
import {
  FileText,
  Search,
  Copy,
  Check,
  Play,
  User,
  Download,
  Clock,
} from 'lucide-react';
import { TranscriptSegment } from '../types';

interface RawTranscriptViewProps {
  transcript: TranscriptSegment[];
  currentTime: number;
  onSeek: (seconds: number) => void;
  title: string;
}

export const RawTranscriptView: React.FC<RawTranscriptViewProps> = ({
  transcript,
  currentTime,
  onSeek,
  title,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);

  const filteredTranscript = transcript.filter((t) => {
    const q = searchQuery.toLowerCase();
    return (
      t.text.toLowerCase().includes(q) ||
      t.speaker.toLowerCase().includes(q) ||
      t.timestamp.toLowerCase().includes(q)
    );
  });

  const handleCopyAll = () => {
    const fullText = transcript
      .map((t) => `[${t.timestamp}] ${t.speaker}: ${t.text}`)
      .join('\n\n');
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadTxt = () => {
    const fullText = `${title}\nTranscript\n\n` +
      transcript.map((t) => `[${t.timestamp}] ${t.speaker}:\n${t.text}`).join('\n\n');
    const blob = new Blob([fullText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/[^a-zA-Z0-9_-]/g, '_')}_Transcript.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-6 px-4 sm:px-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#242424]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
              Verbatim Timestamp Alignment
            </span>
            <span className="text-xs text-[#555555]">•</span>
            <span className="text-xs text-[#888888] font-medium">
              {transcript.length} Dialogue Segments
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#FFFFFF] tracking-tight">
            Session Transcript
          </h2>
        </div>

        {/* Search & Export */}
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#777777] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search in dialogue..."
              className="pl-8 pr-3 py-1.5 text-xs bg-[#181818] border border-[#2E2E2E] text-[#E0E0E0] placeholder-[#666666] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 focus:border-[#D4AF37] w-44 sm:w-56"
            />
          </div>

          <button
            onClick={handleCopyAll}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#D1D1D1] bg-[#181818] border border-[#2A2A2A] hover:bg-[#222222] hover:text-[#FFFFFF] rounded-lg transition-colors"
            title="Copy entire transcript"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#888888]" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <button
            onClick={handleDownloadTxt}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#D1D1D1] bg-[#181818] border border-[#2A2A2A] hover:bg-[#222222] hover:text-[#FFFFFF] rounded-lg transition-colors"
            title="Download as TXT file"
          >
            <Download className="w-3.5 h-3.5 text-[#888888]" />
            <span>.txt</span>
          </button>
        </div>
      </div>

      {/* Transcript Segments List */}
      <div className="space-y-3">
        {filteredTranscript.length === 0 ? (
          <div className="bg-[#141414] rounded-xl border border-[#262626] p-8 text-center text-[#777777] text-sm">
            No dialogue matches found for "{searchQuery}".
          </div>
        ) : (
          filteredTranscript.map((seg, idx) => {
            const isActive =
              currentTime >= (seg.seconds || 0) &&
              (idx === transcript.length - 1 || currentTime < (transcript[idx + 1]?.seconds || Infinity));

            return (
              <div
                key={seg.id || idx}
                className={`p-4 sm:p-5 rounded-xl border transition-all ${
                  isActive
                    ? 'bg-[#181611] border-[#D4AF37]/60 ring-1 ring-[#D4AF37]/30 shadow-md'
                    : 'bg-[#141414] border-[#262626] shadow-sm hover:border-[#D4AF37]/30'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSeek(seg.seconds || 0)}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-mono text-xs font-bold transition-colors ${
                        isActive
                          ? 'bg-[#D4AF37] text-[#0A0A0A]'
                          : 'bg-[#1E1E1E] text-[#D4AF37] hover:bg-[#262626] border border-[#2E2E2E]'
                      }`}
                      title={`Jump player to ${seg.timestamp}`}
                    >
                      <Play className="w-2.5 h-2.5" />
                      <span>{seg.timestamp}</span>
                    </button>

                    <span className="text-xs font-bold text-[#FFFFFF] flex items-center gap-1">
                      <User className="w-3 h-3 text-[#666666]" />
                      {seg.speaker || 'Speaker'}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#D1D1D1] leading-relaxed pl-1 font-normal">
                  {seg.text}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
