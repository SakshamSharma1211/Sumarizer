import React, { useState } from 'react';
import {
  BookOpen,
  Volume2,
  VolumeX,
  Copy,
  Check,
  Sparkles,
  Target,
  Cpu,
  CheckCircle,
  FileCheck,
  ListOrdered,
} from 'lucide-react';
import { AnalysisResult } from '../types';

interface ExecutiveSummaryViewProps {
  analysis: AnalysisResult;
}

export const ExecutiveSummaryView: React.FC<ExecutiveSummaryViewProps> = ({ analysis }) => {
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const { paragraph1, paragraph2, paragraph3 } = analysis.executiveSummary;

  const handleCopy = () => {
    const text = `EXECUTIVE SUMMARY: ${analysis.title}\n\n1. CONTEXT & OBJECTIVES:\n${paragraph1}\n\n2. CORE DISCUSSIONS & TECHNICAL CONCEPTS:\n${paragraph2}\n\n3. OUTCOMES & NEXT STEPS:\n${paragraph3}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleSpeech = () => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      } else {
        const text = `${analysis.title}. Executive summary. First, context and objectives. ${paragraph1}. Second, core concepts. ${paragraph2}. Third, outcomes and next steps. ${paragraph3}`;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.05;
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
        setIsSpeaking(true);
      }
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-6 px-4 sm:px-6">
      {/* Title & Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#242424]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
              Structured Intelligence Briefing
            </span>
            <span className="text-xs text-[#555555]">•</span>
            <span className="text-xs text-[#888888] font-medium">3-Paragraph Executive Synthesis</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#FFFFFF] tracking-tight">
            {analysis.title}
          </h2>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={toggleSpeech}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
              isSpeaking
                ? 'bg-rose-950/60 border-rose-800 text-rose-300'
                : 'bg-[#181818] border-[#2A2A2A] text-[#D1D1D1] hover:bg-[#222222] hover:text-[#FFFFFF]'
            }`}
            title="Listen to synthesized audio summary"
          >
            {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#D4AF37]" />}
            <span>{isSpeaking ? 'Stop Audio' : 'Audio Briefing'}</span>
          </button>

          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#D1D1D1] bg-[#181818] border border-[#2A2A2A] hover:bg-[#222222] hover:text-[#FFFFFF] rounded-lg transition-colors"
            title="Copy Executive Summary"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#888888]" />}
            <span>{copied ? 'Copied' : 'Copy Summary'}</span>
          </button>
        </div>
      </div>

      {/* 3-Paragraph Structured Executive Breakdown */}
      <div className="grid grid-cols-1 gap-5">
        {/* Paragraph 1: Context, Purpose & Thesis */}
        <div className="bg-[#141414] rounded-2xl border border-[#262626] shadow-md p-6 sm:p-7 relative overflow-hidden transition-all hover:border-[#D4AF37]/50">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] shrink-0 mt-0.5 font-bold">
              <Target className="w-5 h-5" />
            </div>
            <div className="space-y-2 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                  Paragraph 1 • Context, Purpose & Objective
                </span>
                <span className="text-[11px] font-mono text-[#888888] bg-[#1E1E1E] border border-[#2A2A2A] px-2 py-0.5 rounded-md">
                  Section 1 of 3
                </span>
              </div>
              <h3 className="text-base font-bold text-[#FFFFFF]">
                Foundational Thesis & Meeting Framework
              </h3>
              <p className="text-sm sm:text-base text-[#D1D1D1] leading-relaxed font-normal">
                {paragraph1}
              </p>
            </div>
          </div>
        </div>

        {/* Paragraph 2: Core Discussions & Technical Concepts */}
        <div className="bg-[#141414] rounded-2xl border border-[#262626] shadow-md p-6 sm:p-7 relative overflow-hidden transition-all hover:border-[#D4AF37]/50">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-violet-950/60 border border-violet-800/50 flex items-center justify-center text-violet-300 shrink-0 mt-0.5 font-bold">
              <Cpu className="w-5 h-5" />
            </div>
            <div className="space-y-2 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-violet-300">
                  Paragraph 2 • Core Discussions & Technical Concepts
                </span>
                <span className="text-[11px] font-mono text-[#888888] bg-[#1E1E1E] border border-[#2A2A2A] px-2 py-0.5 rounded-md">
                  Section 2 of 3
                </span>
              </div>
              <h3 className="text-base font-bold text-[#FFFFFF]">
                Key Arguments, Architecture & Methodology
              </h3>
              <p className="text-sm sm:text-base text-[#D1D1D1] leading-relaxed font-normal">
                {paragraph2}
              </p>
            </div>
          </div>
        </div>

        {/* Paragraph 3: Outcomes, Decisions & Next Steps */}
        <div className="bg-[#141414] rounded-2xl border border-[#262626] shadow-md p-6 sm:p-7 relative overflow-hidden transition-all hover:border-[#D4AF37]/50">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-800/50 flex items-center justify-center text-emerald-300 shrink-0 mt-0.5 font-bold">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div className="space-y-2 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                  Paragraph 3 • Outcomes & Agreed Next Steps
                </span>
                <span className="text-[11px] font-mono text-[#888888] bg-[#1E1E1E] border border-[#2A2A2A] px-2 py-0.5 rounded-md">
                  Section 3 of 3
                </span>
              </div>
              <h3 className="text-base font-bold text-[#FFFFFF]">
                Strategic Decisions, Deliverables & Roadmap
              </h3>
              <p className="text-sm sm:text-base text-[#D1D1D1] leading-relaxed font-normal">
                {paragraph3}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Key Takeaways Card */}
      {analysis.keyTakeaways && analysis.keyTakeaways.length > 0 && (
        <div className="bg-[#141414] rounded-2xl border border-[#282828] p-6 sm:p-7 shadow-md">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-7 h-7 rounded-lg bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-[#FFFFFF]">High-Impact Key Takeaways</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {analysis.keyTakeaways.map((takeaway, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-[#181818] border border-[#2A2A2A] text-xs sm:text-sm text-[#D1D1D1] font-medium flex items-start gap-2.5 shadow-xs hover:border-[#D4AF37]/40 transition-colors"
              >
                <span className="w-5 h-5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{takeaway}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
