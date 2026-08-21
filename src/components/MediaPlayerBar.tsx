import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  FastForward,
  Film,
  Sparkles,
  Maximize2,
} from 'lucide-react';
import { AnalysisResult } from '../types';

interface MediaPlayerBarProps {
  analysis: AnalysisResult;
  currentTime: number;
  onSeek: (seconds: number) => void;
  mediaUrl?: string | null;
}

export const MediaPlayerBar: React.FC<MediaPlayerBarProps> = ({
  analysis,
  currentTime,
  onSeek,
  mediaUrl,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const simulatedTimerRef = useRef<any>(null);

  // Compute total duration in seconds from topics or explicit duration string
  const totalSeconds = React.useMemo(() => {
    if (analysis.duration) {
      const parts = analysis.duration.split(':');
      if (parts.length === 2) {
        return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
      }
      if (parts.length === 3) {
        return parseInt(parts[0], 10) * 3600 + parseInt(parts[1], 10) * 60 + parseInt(parts[2], 10);
      }
    }
    // Fallback to highest topic timestamp + 300s
    if (analysis.topics && analysis.topics.length > 0) {
      const maxTopicSec = Math.max(...analysis.topics.map((t) => t.seconds || 0));
      return maxTopicSec + 300;
    }
    return 1800; // 30 mins fallback
  }, [analysis]);

  // Handle Play / Pause for Real Media or Simulated Timeline
  const togglePlay = () => {
    if (mediaUrl && (audioRef.current || videoRef.current)) {
      const media = audioRef.current || videoRef.current;
      if (media) {
        if (isPlaying) {
          media.pause();
          setIsPlaying(false);
        } else {
          media.play().catch(console.error);
          setIsPlaying(true);
        }
      }
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  // Simulated player tick if no raw media file URL
  useEffect(() => {
    if (!mediaUrl && isPlaying) {
      simulatedTimerRef.current = setInterval(() => {
        onSeek(Math.min(totalSeconds, currentTime + 1 * playbackRate));
      }, 1000 / playbackRate);
    } else {
      clearInterval(simulatedTimerRef.current);
    }
    return () => clearInterval(simulatedTimerRef.current);
  }, [isPlaying, currentTime, playbackRate, mediaUrl, totalSeconds, onSeek]);

  // Sync seek to real media element
  const handleScrubberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    onSeek(val);
    if (mediaUrl) {
      if (audioRef.current) audioRef.current.currentTime = val;
      if (videoRef.current) videoRef.current.currentTime = val;
    }
  };

  const seekRelative = (delta: number) => {
    const next = Math.max(0, Math.min(totalSeconds, currentTime + delta));
    onSeek(next);
    if (mediaUrl) {
      if (audioRef.current) audioRef.current.currentTime = next;
      if (videoRef.current) videoRef.current.currentTime = next;
    }
  };

  const handleRateCycle = () => {
    const rates = [1, 1.25, 1.5, 2, 0.75];
    const nextRate = rates[(rates.indexOf(playbackRate) + 1) % rates.length];
    setPlaybackRate(nextRate);
    if (audioRef.current) audioRef.current.playbackRate = nextRate;
    if (videoRef.current) videoRef.current.playbackRate = nextRate;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Find currently active topic
  const activeTopic = React.useMemo(() => {
    if (!analysis.topics || analysis.topics.length === 0) return null;
    const sorted = [...analysis.topics].sort((a, b) => (a.seconds || 0) - (b.seconds || 0));
    let current = sorted[0];
    for (const t of sorted) {
      if (currentTime >= (t.seconds || 0)) {
        current = t;
      } else {
        break;
      }
    }
    return current;
  }, [analysis.topics, currentTime]);

  return (
    <div className="bg-[#0E0E0E] text-[#D1D1D1] border-t border-[#242424] px-4 py-3 shadow-2xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Active Topic & Media Info */}
        <div className="flex items-center gap-3 w-full md:w-1/3 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] shrink-0">
            {analysis.mediaType === 'video' ? <Film className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
          </div>
          <div className="min-w-0">
            <div className="text-xs font-semibold text-[#FFFFFF] truncate">
              {activeTopic ? activeTopic.title : analysis.title}
            </div>
            <div className="text-[11px] text-[#888888] truncate flex items-center gap-1.5">
              <span>Section: {activeTopic?.timestamp || '00:00'}</span>
              {activeTopic?.speaker && <span>• {activeTopic.speaker}</span>}
            </div>
          </div>
        </div>

        {/* Playback Controls & Progress Scrubber */}
        <div className="flex flex-col items-center w-full md:w-1/2 gap-1.5">
          <div className="flex items-center gap-4">
            <button
              onClick={() => seekRelative(-10)}
              className="p-1.5 text-[#888888] hover:text-[#FFFFFF] rounded-lg transition-colors"
              title="Seek back 10 seconds"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={togglePlay}
              className="w-10 h-10 rounded-full bg-[#D4AF37] hover:bg-[#E5C158] text-[#0A0A0A] flex items-center justify-center shadow-md transition-transform active:scale-95 font-bold"
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 ml-0.5 fill-current" />}
            </button>

            <button
              onClick={() => seekRelative(10)}
              className="p-1.5 text-[#888888] hover:text-[#FFFFFF] rounded-lg transition-colors"
              title="Seek forward 10 seconds"
            >
              <RotateCw className="w-4 h-4" />
            </button>

            <button
              onClick={handleRateCycle}
              className="px-2 py-0.5 text-[11px] font-mono font-bold text-[#D1D1D1] bg-[#181818] hover:bg-[#222222] rounded-md border border-[#2E2E2E] transition-colors"
              title="Change playback speed"
            >
              {playbackRate}x
            </button>
          </div>

          {/* Scrubber Bar */}
          <div className="w-full flex items-center gap-2 text-[11px] font-mono text-[#888888]">
            <span>{formatTime(currentTime)}</span>
            <input
              type="range"
              min={0}
              max={totalSeconds}
              step={1}
              value={currentTime}
              onChange={handleScrubberChange}
              className="w-full h-1.5 bg-[#222222] rounded-lg appearance-none cursor-pointer accent-[#D4AF37] hover:h-2 transition-all"
            />
            <span>{formatTime(totalSeconds)}</span>
          </div>
        </div>

        {/* Volume & Additional Details */}
        <div className="hidden md:flex items-center justify-end gap-3 w-1/4">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-1.5 text-[#888888] hover:text-[#FFFFFF] rounded-lg transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {mediaUrl && analysis.mediaType === 'video' && (
            <button
              onClick={() => setShowVideoModal(true)}
              className="flex items-center gap-1 px-2.5 py-1 text-xs text-[#D1D1D1] bg-[#181818] hover:bg-[#222222] border border-[#2E2E2E] rounded-lg transition-colors"
            >
              <Maximize2 className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Video</span>
            </button>
          )}

          <div className="text-[11px] text-[#888888] font-mono px-2 py-0.5 rounded-md bg-[#181818] border border-[#262626]">
            {analysis.category}
          </div>
        </div>
      </div>

      {/* Hidden real audio/video element if file provided */}
      {mediaUrl && (
        <audio
          ref={audioRef}
          src={mediaUrl}
          muted={isMuted}
          onTimeUpdate={() => {
            if (audioRef.current) onSeek(audioRef.current.currentTime);
          }}
          onEnded={() => setIsPlaying(false)}
        />
      )}
    </div>
  );
};
