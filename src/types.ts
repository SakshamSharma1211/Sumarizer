export type SessionCategory = 'Meeting' | 'Lecture' | 'Workshop' | 'Interview' | 'Presentation';

export interface ExecutiveSummary {
  paragraph1: string; // Context, purpose, and main thesis/objective
  paragraph2: string; // Core discussions, key arguments, or technical concepts taught
  paragraph3: string; // Outcomes, conclusions, and agreed next steps
}

export interface TopicBreakdownItem {
  timestamp: string; // "MM:SS"
  seconds: number;
  title: string;
  bullets: string[]; // 2-4 comprehensive bullet points
  speaker?: string;
}

export interface ActionItem {
  id: string;
  task: string;
  assignee: string; // Name or "Unassigned"
  deadline: string; // Explicit/implied date or "TBD"
  priority: 'High' | 'Medium' | 'Low';
  completed?: boolean;
  category?: string;
}

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  category: string;
  keyConcept?: string;
  mastered?: boolean;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  approximateDateTime: string; // e.g. "2026-08-25T14:00:00" or human-readable
  durationMinutes: number;
  location?: string;
}

export interface TranscriptSegment {
  id: string;
  timestamp: string;
  seconds: number;
  speaker: string;
  text: string;
}

export interface AnalysisResult {
  id: string;
  createdAt: string;
  category: SessionCategory;
  title: string;
  duration?: string;
  mediaType: 'audio' | 'video' | 'transcript' | 'sample';
  mediaUrl?: string;
  fileName?: string;
  executiveSummary: ExecutiveSummary;
  topics: TopicBreakdownItem[];
  actionItems: ActionItem[];
  flashcards: Flashcard[];
  calendarEvents: CalendarEvent[];
  rawTranscript?: TranscriptSegment[];
  keyTakeaways?: string[];
  metadata?: {
    wordCount?: number;
    speakerCount?: number;
    modelUsed?: string;
    processedDurationSec?: number;
  };
}

export interface SampleRecording {
  id: string;
  title: string;
  category: SessionCategory;
  subtitle: string;
  duration: string;
  description: string;
  transcriptText: string;
  audioTone: string;
  data: AnalysisResult;
}
