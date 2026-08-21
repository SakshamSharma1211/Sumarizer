import React from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  Download,
  CalendarCheck,
  CalendarPlus,
  Sparkles,
} from 'lucide-react';
import { CalendarEvent } from '../types';
import { createGoogleCalendarUrl, downloadIcsFile, downloadAllIcsFiles } from '../lib/calendarExport';

interface CalendarScheduleViewProps {
  events: CalendarEvent[];
}

export const CalendarScheduleView: React.FC<CalendarScheduleViewProps> = ({ events }) => {
  const formatEventDate = (dtString: string) => {
    try {
      const d = new Date(dtString);
      if (isNaN(d.getTime())) return dtString;
      return d.toLocaleDateString(undefined, {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      });
    } catch {
      return dtString;
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-6 px-4 sm:px-6">
      {/* Header & Global Export */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#242424]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
              Execution Readiness & Scheduling
            </span>
            <span className="text-xs text-[#555555]">•</span>
            <span className="text-xs text-[#888888] font-medium">
              {events.length} Extracted Deadlines & Follow-ups
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#FFFFFF] tracking-tight">
            Calendar Events & Follow-up Schedule
          </h2>
        </div>

        {events.length > 0 && (
          <button
            onClick={() => downloadAllIcsFiles(events)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#0A0A0A] bg-[#D4AF37] hover:bg-[#E5C158] rounded-xl shadow-xs transition-colors"
            title="Download all events as .ics calendar file"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download All (.ics)</span>
          </button>
        )}
      </div>

      {/* Event Cards */}
      {events.length === 0 ? (
        <div className="bg-[#141414] rounded-2xl border border-[#262626] p-12 text-center text-[#888888] max-w-md mx-auto">
          <CalendarCheck className="w-12 h-12 mx-auto mb-3 text-[#555555]" />
          <h3 className="font-bold text-[#FFFFFF] text-base mb-1">No Explicit Calendar Deadlines</h3>
          <p className="text-xs text-[#888888]">
            No specific deadlines, follow-up meetings, or submission dates were identified in this session.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {events.map((event) => {
            const gcalUrl = createGoogleCalendarUrl(event);

            return (
              <div
                key={event.id}
                className="bg-[#141414] rounded-2xl border border-[#262626] shadow-sm hover:border-[#D4AF37]/50 transition-all p-6 flex flex-col justify-between"
              >
                <div>
                  {/* Top Metadata */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/30">
                      <Clock className="w-3 h-3" />
                      {event.durationMinutes || 60} mins
                    </span>

                    {event.location && (
                      <span className="inline-flex items-center gap-1 text-xs text-[#888888] truncate max-w-[180px]">
                        <MapPin className="w-3 h-3 text-[#666666] shrink-0" />
                        <span className="truncate">{event.location}</span>
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-bold text-[#FFFFFF] text-base mb-2 leading-snug">
                    {event.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#D1D1D1] leading-relaxed mb-4">
                    {event.description}
                  </p>

                  {/* Scheduled Date/Time Badge */}
                  <div className="p-3 rounded-xl bg-[#181818] border border-[#2A2A2A] mb-4 flex items-center gap-2.5 text-xs text-[#E0E0E0] font-semibold">
                    <Calendar className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span>{formatEventDate(event.approximateDateTime)}</span>
                  </div>
                </div>

                {/* Integration Actions */}
                <div className="pt-4 border-t border-[#222222] flex items-center justify-between gap-2">
                  <a
                    href={gcalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#D4AF37] bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 rounded-lg border border-[#D4AF37]/30 transition-colors"
                  >
                    <CalendarPlus className="w-3.5 h-3.5" />
                    <span>Google Calendar</span>
                    <ExternalLink className="w-3 h-3 ml-0.5 opacity-60" />
                  </a>

                  <button
                    onClick={() => downloadIcsFile(event)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#D1D1D1] bg-[#181818] hover:bg-[#222222] border border-[#2A2A2A] rounded-lg transition-colors"
                    title="Download Apple / Outlook .ics file"
                  >
                    <Download className="w-3.5 h-3.5 text-[#888888]" />
                    <span>.ics File</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
