import React, { useState } from 'react';
import { Header } from './components/Header';
import { InputPanel } from './components/InputPanel';
import { MediaPlayerBar } from './components/MediaPlayerBar';
import { ExecutiveSummaryView } from './components/ExecutiveSummaryView';
import { ChronologicalTopicsView } from './components/ChronologicalTopicsView';
import { ActionItemsView } from './components/ActionItemsView';
import { FlashcardsView } from './components/FlashcardsView';
import { CalendarScheduleView } from './components/CalendarScheduleView';
import { RawTranscriptView } from './components/RawTranscriptView';
import { AIChatDrawer } from './components/AIChatDrawer';
import { SAMPLE_RECORDINGS } from './data/samples';
import { AnalysisResult, SampleRecording, ActionItem } from './types';
import { exportAnalysisAsMarkdown } from './lib/exportUtils';

export default function App() {
  // Initialize with MIT Deep Learning lecture sample for instant interactive exploration
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(SAMPLE_RECORDINGS[0].data);
  const [activeTab, setActiveTab] = useState<string>('summary');
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [mediaUrl, setMediaUrl] = useState<string | null>(null);

  const [showInputModal, setShowInputModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [chatOpen, setChatOpen] = useState<boolean>(false);

  // Analyze uploaded File (Audio or Video)
  const handleAnalyzeFile = async (file: File) => {
    setIsLoading(true);
    setError(null);
    setLoadingStep(`Reading ${file.name} (${(file.size / (1024 * 1024)).toFixed(1)} MB)...`);

    try {
      // Create local blob URL for playback
      const localUrl = URL.createObjectURL(file);
      setMediaUrl(localUrl);

      const isVideo = file.type.startsWith('video/');
      const mediaType = isVideo ? 'video' : 'audio';

      // Read file as base64
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const resultStr = reader.result as string;
          const base64Data = resultStr.split(',')[1];
          const mimeType = file.type || (isVideo ? 'video/mp4' : 'audio/mp3');

          setLoadingStep('Uploading to Gemini 3.7 Intelligence Engine...');

          const response = await fetch('/api/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              mediaType,
              base64Data,
              mimeType,
              fileName: file.name,
            }),
          });

          if (!response.ok) {
            const errJson = await response.json().catch(() => ({}));
            throw new Error(errJson.error || `Server responded with ${response.status}`);
          }

          setLoadingStep('Synthesizing structured intelligence...');
          const data: AnalysisResult = await response.json();
          data.mediaType = mediaType;
          data.fileName = file.name;

          setAnalysis(data);
          setShowInputModal(false);
          setActiveTab('summary');
          setCurrentTime(0);
        } catch (err: any) {
          console.error('File analysis failed:', err);
          setError(err.message || 'Failed to analyze recording.');
        } finally {
          setIsLoading(false);
        }
      };

      reader.onerror = () => {
        setError('Failed to read file from disk.');
        setIsLoading(false);
      };

      reader.readAsDataURL(file);
    } catch (err: any) {
      setError(err.message || 'Failed to process file.');
      setIsLoading(false);
    }
  };

  // Analyze pasted Transcript / Text
  const handleAnalyzeTranscript = async (transcriptText: string, customTitle?: string) => {
    setIsLoading(true);
    setError(null);
    setLoadingStep('Processing transcript through Gemini 3.7 Intelligence...');

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mediaType: 'transcript',
          transcriptText,
          fileName: customTitle || 'Pasted Transcript',
        }),
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.error || `Server responded with ${response.status}`);
      }

      const data: AnalysisResult = await response.json();
      data.mediaType = 'transcript';
      if (customTitle) data.title = customTitle;

      setAnalysis(data);
      setMediaUrl(null);
      setShowInputModal(false);
      setActiveTab('summary');
      setCurrentTime(0);
    } catch (err: any) {
      console.error('Transcript analysis error:', err);
      setError(err.message || 'Failed to analyze transcript.');
    } finally {
      setIsLoading(false);
    }
  };

  // Select preloaded sample recording
  const handleSelectSample = (sample: SampleRecording) => {
    setAnalysis(sample.data);
    setMediaUrl(null);
    setShowInputModal(false);
    setActiveTab('summary');
    setCurrentTime(0);
    setError(null);
  };

  // Action item completion check-off
  const handleToggleActionItem = (id: string) => {
    if (!analysis) return;
    setAnalysis({
      ...analysis,
      actionItems: analysis.actionItems.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      ),
    });
  };

  // Flashcard mastery check-off
  const handleToggleFlashcardMastery = (id: string) => {
    if (!analysis) return;
    setAnalysis({
      ...analysis,
      flashcards: analysis.flashcards.map((fc) =>
        fc.id === id ? { ...fc, mastered: !fc.mastered } : fc
      ),
    });
  };

  // Seek callback
  const handleSeek = (seconds: number) => {
    setCurrentTime(seconds);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#D1D1D1] flex flex-col font-sans selection:bg-[#D4AF37]/30 selection:text-[#FFFFFF]">
      {/* Top Navigation Bar */}
      <Header
        analysis={analysis}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenNewSession={() => setShowInputModal(true)}
        onExportMarkdown={() => analysis && exportAnalysisAsMarkdown(analysis)}
        onOpenChat={() => setChatOpen(!chatOpen)}
        chatOpen={chatOpen}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-28">
        {showInputModal || !analysis ? (
          <InputPanel
            onAnalyzeFile={handleAnalyzeFile}
            onAnalyzeTranscript={handleAnalyzeTranscript}
            onSelectSample={handleSelectSample}
            isLoading={isLoading}
            loadingStep={loadingStep}
            error={error}
          />
        ) : (
          <div>
            {activeTab === 'summary' && <ExecutiveSummaryView analysis={analysis} />}
            {activeTab === 'topics' && (
              <ChronologicalTopicsView
                topics={analysis.topics || []}
                currentTime={currentTime}
                onSeek={handleSeek}
              />
            )}
            {activeTab === 'actions' && (
              <ActionItemsView
                actionItems={analysis.actionItems || []}
                onToggleItem={handleToggleActionItem}
              />
            )}
            {activeTab === 'flashcards' && (
              <FlashcardsView
                flashcards={analysis.flashcards || []}
                onToggleMastered={handleToggleFlashcardMastery}
              />
            )}
            {activeTab === 'calendar' && (
              <CalendarScheduleView events={analysis.calendarEvents || []} />
            )}
            {activeTab === 'transcript' && (
              <RawTranscriptView
                transcript={analysis.rawTranscript || []}
                currentTime={currentTime}
                onSeek={handleSeek}
                title={analysis.title}
              />
            )}
          </div>
        )}
      </main>

      {/* Floating Universal Media Player Bar (fixed at bottom when analysis is active) */}
      {analysis && !showInputModal && (
        <div className="fixed bottom-0 inset-x-0 z-40">
          <MediaPlayerBar
            analysis={analysis}
            currentTime={currentTime}
            onSeek={handleSeek}
            mediaUrl={mediaUrl}
          />
        </div>
      )}

      {/* AI Q&A Assistant Side Drawer */}
      {analysis && (
        <AIChatDrawer
          isOpen={chatOpen}
          onClose={() => setChatOpen(false)}
          analysis={analysis}
        />
      )}
    </div>
  );
}
