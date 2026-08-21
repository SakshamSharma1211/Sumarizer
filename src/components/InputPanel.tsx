import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  Mic,
  Square,
  FileText,
  Play,
  Sparkles,
  ArrowRight,
  Layers,
  CheckCircle2,
  AlertCircle,
  FileAudio,
  Film,
  Zap,
} from 'lucide-react';
import { SAMPLE_RECORDINGS } from '../data/samples';
import { SampleRecording } from '../types';

interface InputPanelProps {
  onAnalyzeFile: (file: File) => void;
  onAnalyzeTranscript: (text: string, title?: string) => void;
  onSelectSample: (sample: SampleRecording) => void;
  isLoading: boolean;
  loadingStep: string;
  error: string | null;
}

export const InputPanel: React.FC<InputPanelProps> = ({
  onAnalyzeFile,
  onAnalyzeTranscript,
  onSelectSample,
  isLoading,
  loadingStep,
  error,
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'record' | 'transcript' | 'samples'>('samples');
  const [pastedTranscript, setPastedTranscript] = useState('');
  const [customTitle, setCustomTitle] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<any>(null);

  // File Drop / Selection handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onAnalyzeFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onAnalyzeFile(e.dataTransfer.files[0]);
    }
  };

  // Live Microphone Recording handlers
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setRecordedBlob(audioBlob);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start(200);
      setIsRecording(true);
      setRecordingDuration(0);

      timerRef.current = setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.error('Microphone access error:', err);
      alert('Microphone access was denied or is unavailable.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(timerRef.current);
    }
  };

  const submitRecording = () => {
    if (!recordedBlob) return;
    const file = new File([recordedBlob], `recording_${new Date().toISOString().slice(0, 10)}.webm`, {
      type: 'audio/webm',
    });
    onAnalyzeFile(file);
  };

  const formatSeconds = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">
      {/* Banner Card */}
      <div className="bg-gradient-to-br from-[#161616] via-[#121212] to-[#1C180E] text-[#D1D1D1] rounded-2xl p-6 sm:p-8 mb-8 shadow-xl border border-[#282828] relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider mb-4 border border-[#D4AF37]/30">
            <Zap className="w-3.5 h-3.5 text-[#D4AF37]" />
            Gemini 3.7 Intelligence Engine
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#FFFFFF] mb-3">
            Transform Audio & Video into Structured Deep Intelligence
          </h1>
          <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed mb-6">
            Automatically classify sessions, generate 3-paragraph executive summaries, link chronological topic breakdowns to exact MM:SS timestamps, extract verified action items, build high-yield flashcard decks, and generate execution calendar payloads.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-[#888888]">
            <span className="flex items-center gap-1.5 text-[#D1D1D1]">
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> 5 Category Classification
            </span>
            <span className="flex items-center gap-1.5 text-[#D1D1D1]">
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> MM:SS Timestamps
            </span>
            <span className="flex items-center gap-1.5 text-[#D1D1D1]">
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> Action Responsibility Matrix
            </span>
            <span className="flex items-center gap-1.5 text-[#D1D1D1]">
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> Q&A Study Flashcards
            </span>
          </div>
        </div>

        {/* Subtle Background glow */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Error Notice if any */}
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-rose-950/40 border border-rose-800/60 text-rose-300 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold">Analysis Failed:</span> {error}
          </div>
        </div>
      )}

      {/* Loading Progress State */}
      {isLoading ? (
        <div className="bg-[#121212] rounded-2xl border border-[#262626] shadow-xl p-8 sm:p-12 text-center max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Sparkles className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-[#FFFFFF] mb-2">Analyzing Recording with Gemini 3.7</h3>
          <p className="text-sm text-[#888888] mb-6">{loadingStep || 'Processing audio/video streams...'}</p>

          <div className="w-full bg-[#1E1E1E] rounded-full h-2.5 mb-6 overflow-hidden border border-[#2E2E2E]">
            <div className="bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] h-2.5 rounded-full animate-[indeterminate_1.5s_infinite_linear]" style={{ width: '70%' }} />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left text-xs text-[#A1A1AA]">
            <div className="p-2.5 rounded-lg bg-[#181818] border border-[#262626] flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Transcribing</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#181818] border border-[#262626] flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Classifying</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#181818] border border-[#262626] flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Timestamps</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#181818] border border-[#262626] flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] animate-spin" />
              <span>Synthesizing</span>
            </div>
          </div>
        </div>
      ) : (
        /* Ingestion Modes Container */
        <div className="bg-[#121212] rounded-2xl border border-[#242424] shadow-xl overflow-hidden">
          {/* Ingestion Tabs */}
          <div className="grid grid-cols-4 border-b border-[#242424] bg-[#0E0E0E] p-1.5 gap-1">
            <button
              id="tab-samples"
              onClick={() => setActiveTab('samples')}
              className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'samples'
                  ? 'bg-[#1E1E1E] text-[#D4AF37] border border-[#D4AF37]/30 shadow-xs'
                  : 'text-[#888888] hover:text-[#FFFFFF] hover:bg-[#161616]'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span className="hidden sm:inline">Preloaded</span> Samples
            </button>

            <button
              id="tab-upload"
              onClick={() => setActiveTab('upload')}
              className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'upload'
                  ? 'bg-[#1E1E1E] text-[#D4AF37] border border-[#D4AF37]/30 shadow-xs'
                  : 'text-[#888888] hover:text-[#FFFFFF] hover:bg-[#161616]'
              }`}
            >
              <UploadCloud className="w-4 h-4" />
              Upload <span className="hidden sm:inline">File</span>
            </button>

            <button
              id="tab-record"
              onClick={() => setActiveTab('record')}
              className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'record'
                  ? 'bg-[#1E1E1E] text-[#D4AF37] border border-[#D4AF37]/30 shadow-xs'
                  : 'text-[#888888] hover:text-[#FFFFFF] hover:bg-[#161616]'
              }`}
            >
              <Mic className="w-4 h-4" />
              Record <span className="hidden sm:inline">Mic</span>
            </button>

            <button
              id="tab-transcript-input"
              onClick={() => setActiveTab('transcript')}
              className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'transcript'
                  ? 'bg-[#1E1E1E] text-[#D4AF37] border border-[#D4AF37]/30 shadow-xs'
                  : 'text-[#888888] hover:text-[#FFFFFF] hover:bg-[#161616]'
              }`}
            >
              <FileText className="w-4 h-4" />
              Paste <span className="hidden sm:inline">Transcript</span>
            </button>
          </div>

          <div className="p-6 sm:p-8">
            {/* Tab 1: Preloaded Samples */}
            {activeTab === 'samples' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base font-bold text-[#FFFFFF]">Explore Preloaded Sample Sessions</h3>
                    <p className="text-xs text-[#888888]">
                      Select any realistic recording dataset to preview complete extraction, interactive player sync, flashcards, and calendar export.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {SAMPLE_RECORDINGS.map((sample) => (
                    <div
                      key={sample.id}
                      onClick={() => onSelectSample(sample)}
                      className="group p-5 rounded-xl border border-[#242424] hover:border-[#D4AF37]/60 bg-[#161616] hover:bg-[#1A1A1A] transition-all cursor-pointer shadow-md flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                              sample.category === 'Lecture'
                                ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/50'
                                : sample.category === 'Meeting'
                                ? 'bg-blue-950/60 text-blue-300 border border-blue-800/50'
                                : sample.category === 'Workshop'
                                ? 'bg-amber-950/60 text-amber-300 border border-amber-800/50'
                                : sample.category === 'Interview'
                                ? 'bg-purple-950/60 text-purple-300 border border-purple-800/50'
                                : 'bg-rose-950/60 text-rose-300 border border-rose-800/50'
                            }`}
                          >
                            {sample.category}
                          </span>
                          <span className="text-xs font-medium text-[#777777] flex items-center gap-1">
                            <FileAudio className="w-3 h-3" /> {sample.duration}
                          </span>
                        </div>
                        <h4 className="font-bold text-[#FFFFFF] text-sm sm:text-base mb-1 group-hover:text-[#D4AF37] transition-colors">
                          {sample.title}
                        </h4>
                        <p className="text-xs text-[#888888] mb-3 line-clamp-2 leading-relaxed">
                          {sample.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[#222222] flex items-center justify-between text-xs text-[#D4AF37] font-semibold">
                        <span>Load & Analyze Session</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 2: Upload Audio or Video File */}
            {activeTab === 'upload' && (
              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="audio/*,video/*,.mp3,.wav,.m4a,.ogg,.aac,.flac,.mp4,.webm,.mov,.mkv"
                  className="hidden"
                />

                <div
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-[#333333] hover:border-[#D4AF37] rounded-2xl p-10 text-center cursor-pointer transition-colors bg-[#161616]/60 hover:bg-[#1A1A1A]"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] flex items-center justify-center mx-auto mb-4">
                    <UploadCloud className="w-7 h-7" />
                  </div>
                  <h4 className="text-base font-bold text-[#FFFFFF] mb-1">
                    Drag and drop your audio or video file here
                  </h4>
                  <p className="text-xs text-[#888888] mb-4">
                    Supports MP3, WAV, M4A, MP4, WebM, MOV, AAC, FLAC (up to 100MB)
                  </p>
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#0A0A0A] bg-[#D4AF37] hover:bg-[#E5C158] rounded-xl shadow-xs transition-colors"
                  >
                    <FileAudio className="w-4 h-4" />
                    Browse Files
                  </button>
                </div>
              </div>
            )}

            {/* Tab 3: Record Audio directly from Microphone */}
            {activeTab === 'record' && (
              <div className="text-center py-6">
                <div className="max-w-md mx-auto">
                  <div
                    className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 transition-all ${
                      isRecording
                        ? 'bg-rose-600 text-white animate-pulse shadow-lg shadow-rose-900/50'
                        : recordedBlob
                        ? 'bg-emerald-950/60 border border-emerald-700/60 text-emerald-300'
                        : 'bg-[#181818] border border-[#2E2E2E] text-[#D4AF37]'
                    }`}
                  >
                    <Mic className="w-10 h-10" />
                  </div>

                  <div className="text-2xl font-mono font-bold text-[#FFFFFF] mb-2">
                    {formatSeconds(recordingDuration)}
                  </div>
                  <p className="text-xs text-[#888888] mb-6">
                    {isRecording
                      ? 'Live microphone recording in progress... Speak clearly.'
                      : recordedBlob
                      ? 'Recording completed and ready for AI intelligence analysis.'
                      : 'Click the button below to start live recording from your microphone.'}
                  </p>

                  <div className="flex items-center justify-center gap-3">
                    {!isRecording && !recordedBlob && (
                      <button
                        onClick={startRecording}
                        className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-xs transition-colors"
                      >
                        <Mic className="w-4 h-4" /> Start Recording
                      </button>
                    )}

                    {isRecording && (
                      <button
                        onClick={stopRecording}
                        className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-[#0A0A0A] bg-[#D4AF37] hover:bg-[#E5C158] rounded-xl shadow-xs transition-colors"
                      >
                        <Square className="w-4 h-4" /> Stop & Process
                      </button>
                    )}

                    {recordedBlob && !isRecording && (
                      <>
                        <button
                          onClick={startRecording}
                          className="px-4 py-2.5 text-xs font-medium text-[#D1D1D1] bg-[#1E1E1E] hover:bg-[#282828] border border-[#2A2A2A] rounded-xl transition-colors"
                        >
                          Re-record
                        </button>
                        <button
                          onClick={submitRecording}
                          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-[#0A0A0A] bg-[#D4AF37] hover:bg-[#E5C158] rounded-xl shadow-xs transition-colors"
                        >
                          <Sparkles className="w-4 h-4" /> Analyze Recording
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 4: Paste Transcript Text */}
            {activeTab === 'transcript' && (
              <div>
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-[#D1D1D1] mb-1">
                    Session Title (Optional)
                  </label>
                  <input
                    type="text"
                    value={customTitle}
                    onChange={(e) => setCustomTitle(e.target.value)}
                    placeholder="e.g. Q3 Architecture Review or CS50 Lecture 1"
                    className="w-full px-3 py-2 text-sm rounded-xl bg-[#181818] border border-[#2E2E2E] text-[#E0E0E0] placeholder-[#666666] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 focus:border-[#D4AF37]"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-xs font-semibold text-[#D1D1D1] mb-1">
                    Paste Transcript or Meeting Notes (with or without MM:SS timestamps)
                  </label>
                  <textarea
                    rows={8}
                    value={pastedTranscript}
                    onChange={(e) => setPastedTranscript(e.target.value)}
                    placeholder="[00:00] Speaker 1: Welcome everyone to today's seminar on distributed systems...&#10;[05:20] Speaker 2: Let's discuss the Raft consensus algorithm..."
                    className="w-full p-3.5 text-xs sm:text-sm font-mono rounded-xl bg-[#181818] border border-[#2E2E2E] text-[#E0E0E0] placeholder-[#666666] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 focus:border-[#D4AF37]"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    disabled={!pastedTranscript.trim()}
                    onClick={() => onAnalyzeTranscript(pastedTranscript, customTitle)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-[#0A0A0A] bg-[#D4AF37] hover:bg-[#E5C158] disabled:opacity-40 disabled:cursor-not-allowed rounded-xl shadow-xs transition-colors"
                  >
                    <Sparkles className="w-4 h-4" /> Run Deep Intelligence Analysis
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
