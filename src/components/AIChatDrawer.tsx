import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Send,
  Sparkles,
  BotMessageSquare,
  User,
  HelpCircle,
  BookOpen,
  CheckCircle,
} from 'lucide-react';
import { AnalysisResult } from '../types';

interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
}

interface AIChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  analysis: AnalysisResult;
}

const QUICK_PROMPTS = [
  'Generate a 3-question quiz with answers based on this session.',
  'Explain the most complex technical concept in simple terms.',
  'List all upcoming deadlines and their priority levels.',
  'What were the primary takeaways from this discussion?',
];

export const AIChatDrawer: React.FC<AIChatDrawerProps> = ({
  isOpen,
  onClose,
  analysis,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      content: `Hello! I have analyzed **${analysis.title}** (${analysis.category}). Ask me any questions about the discussion, specific timestamps, technical formulas, or action items!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSendMessage = async (promptText?: string) => {
    const textToSend = promptText || inputPrompt;
    if (!textToSend.trim() || isTyping) return;

    const userMsg: Message = {
      id: 'msg-' + Date.now(),
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputPrompt('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
          sessionContext: {
            title: analysis.title,
            category: analysis.category,
            executiveSummary: analysis.executiveSummary,
            topics: analysis.topics,
            actionItems: analysis.actionItems,
            flashcards: analysis.flashcards,
            calendarEvents: analysis.calendarEvents,
          },
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to get response from AI Assistant');
      }

      const data = await res.json();
      const modelMsg: Message = {
        id: 'msg-' + Date.now(),
        role: 'model',
        content: data.reply || 'No response returned.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, modelMsg]);
    } catch (err: any) {
      const errorMsg: Message = {
        id: 'err-' + Date.now(),
        role: 'model',
        content: `Error: ${err.message || 'Unable to connect to AI engine.'}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-[440px] z-50 bg-[#121212] shadow-2xl border-l border-[#262626] flex flex-col animate-in slide-in-from-right duration-200">
      {/* Drawer Header */}
      <div className="p-4 border-b border-[#242424] flex items-center justify-between bg-[#0A0A0A] text-[#D1D1D1]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm leading-tight text-[#FFFFFF]">Session AI Assistant</h3>
            <p className="text-[11px] text-[#888888] truncate max-w-[240px]">
              Grounded in {analysis.title}
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-[#888888] hover:text-[#FFFFFF] hover:bg-[#1E1E1E] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0E0E0E]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 mt-0.5 ${
                msg.role === 'user'
                  ? 'bg-[#D4AF37] text-[#0A0A0A] font-bold'
                  : 'bg-[#1E1E1E] border border-[#2E2E2E] text-[#D4AF37]'
              }`}
            >
              {msg.role === 'user' ? <User className="w-3.5 h-3.5" /> : <BotMessageSquare className="w-3.5 h-3.5" />}
            </div>

            <div
              className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                msg.role === 'user'
                  ? 'bg-[#1E1E1E] border border-[#2E2E2E] text-[#FFFFFF] rounded-tr-xs shadow-xs'
                  : 'bg-[#141414] border border-[#262626] text-[#D1D1D1] rounded-tl-xs shadow-xs'
              }`}
            >
              {msg.content}
              <div
                className={`text-[10px] mt-1.5 ${
                  msg.role === 'user' ? 'text-[#888888] text-right' : 'text-[#666666]'
                }`}
              >
                {msg.timestamp}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-[#888888] pl-9">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-bounce" />
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-bounce [animation-delay:0.2s]" />
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-bounce [animation-delay:0.4s]" />
            <span className="ml-1 font-medium">Gemini is synthesizing answer...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <div className="px-4 py-2 bg-[#121212] border-t border-[#222222] flex gap-1.5 overflow-x-auto scrollbar-none">
        {QUICK_PROMPTS.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(prompt)}
            className="px-2.5 py-1 text-[11px] font-medium text-[#888888] bg-[#181818] border border-[#2A2A2A] hover:bg-[#222222] hover:text-[#D4AF37] hover:border-[#D4AF37]/40 rounded-full whitespace-nowrap transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <div className="p-3.5 bg-[#121212] border-t border-[#262626]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder="Ask anything about this recording..."
            className="flex-1 px-3.5 py-2 text-xs sm:text-sm bg-[#181818] border border-[#2E2E2E] text-[#E0E0E0] placeholder-[#666666] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 focus:border-[#D4AF37]"
          />
          <button
            type="submit"
            disabled={!inputPrompt.trim() || isTyping}
            className="p-2 rounded-xl bg-[#D4AF37] hover:bg-[#E5C158] disabled:opacity-50 text-[#0A0A0A] font-bold transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
