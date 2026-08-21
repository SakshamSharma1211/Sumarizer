import React, { useState } from 'react';
import {
  CheckSquare,
  Square,
  User,
  Calendar,
  AlertTriangle,
  Download,
  Filter,
  Search,
  Plus,
  Trash2,
  CheckCircle2,
} from 'lucide-react';
import { ActionItem } from '../types';
import { exportActionItemsAsCsv } from '../lib/exportUtils';

interface ActionItemsViewProps {
  actionItems: ActionItem[];
  onToggleItem: (id: string) => void;
  onAddItem?: (item: ActionItem) => void;
}

const PRIORITY_BADGES: Record<string, { bg: string; text: string; dot: string }> = {
  High: { bg: 'bg-rose-950/60 border-rose-800/60 text-rose-300', text: 'text-rose-300', dot: 'bg-rose-500' },
  Medium: { bg: 'bg-amber-950/60 border-amber-800/60 text-amber-300', text: 'text-amber-300', dot: 'bg-amber-400' },
  Low: { bg: 'bg-emerald-950/60 border-emerald-800/60 text-emerald-300', text: 'text-emerald-300', dot: 'bg-emerald-400' },
};

export const ActionItemsView: React.FC<ActionItemsViewProps> = ({
  actionItems,
  onToggleItem,
  onAddItem,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<string>('All');
  const [assigneeFilter, setAssigneeFilter] = useState<string>('All');

  // Extract unique assignees
  const assignees = React.useMemo(() => {
    const set = new Set<string>();
    actionItems.forEach((item) => {
      if (item.assignee) set.add(item.assignee);
    });
    return Array.from(set);
  }, [actionItems]);

  // Filter items
  const filteredItems = actionItems.filter((item) => {
    const matchesSearch =
      item.task.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.assignee.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.deadline.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPriority = priorityFilter === 'All' || item.priority === priorityFilter;
    const matchesAssignee = assigneeFilter === 'All' || item.assignee === assigneeFilter;

    return matchesSearch && matchesPriority && matchesAssignee;
  });

  const completedCount = actionItems.filter((i) => i.completed).length;
  const progressPercent = actionItems.length > 0 ? Math.round((completedCount / actionItems.length) * 100) : 0;

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-6 px-4 sm:px-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#242424]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
              Execution & Accountability Matrix
            </span>
            <span className="text-xs text-[#555555]">•</span>
            <span className="text-xs text-[#888888] font-medium">
              {completedCount} of {actionItems.length} Completed ({progressPercent}%)
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#FFFFFF] tracking-tight">
            Action Items & Responsibilities
          </h2>
        </div>

        {/* Export Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => exportActionItemsAsCsv(actionItems)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#D1D1D1] bg-[#181818] border border-[#2A2A2A] hover:bg-[#222222] hover:text-[#FFFFFF] rounded-lg shadow-xs transition-colors"
            title="Download CSV spreadsheet"
          >
            <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-[#141414] rounded-xl border border-[#262626] p-4 shadow-sm">
        <div className="flex items-center justify-between text-xs font-semibold text-[#D1D1D1] mb-2">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
            Task Execution Progress
          </span>
          <span className="font-mono text-[#D4AF37]">{progressPercent}% Completed</span>
        </div>
        <div className="w-full bg-[#1E1E1E] rounded-full h-2 overflow-hidden border border-[#2A2A2A]">
          <div
            className="bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-wrap items-center gap-3 bg-[#141414] p-3 rounded-xl border border-[#262626]">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-3.5 h-3.5 text-[#777777] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks, assignees, deadlines..."
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#181818] border border-[#2E2E2E] text-[#E0E0E0] placeholder-[#666666] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 focus:border-[#D4AF37]"
          />
        </div>

        {/* Priority Filter */}
        <div className="flex items-center gap-1 text-xs">
          <span className="text-[#888888] font-medium hidden sm:inline">Priority:</span>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-2.5 py-1.5 bg-[#181818] border border-[#2E2E2E] rounded-lg text-xs font-medium text-[#D1D1D1] focus:outline-none focus:border-[#D4AF37]"
          >
            <option value="All">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        {/* Assignee Filter */}
        {assignees.length > 0 && (
          <div className="flex items-center gap-1 text-xs">
            <span className="text-[#888888] font-medium hidden sm:inline">Assignee:</span>
            <select
              value={assigneeFilter}
              onChange={(e) => setAssigneeFilter(e.target.value)}
              className="px-2.5 py-1.5 bg-[#181818] border border-[#2E2E2E] rounded-lg text-xs font-medium text-[#D1D1D1] focus:outline-none focus:border-[#D4AF37] max-w-[150px] truncate"
            >
              <option value="All">All Assignees</option>
              {assignees.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Action Item Cards */}
      <div className="grid grid-cols-1 gap-3">
        {filteredItems.length === 0 ? (
          <div className="bg-[#141414] rounded-xl border border-[#262626] p-8 text-center text-[#777777] text-sm">
            No action items matching the selected filters.
          </div>
        ) : (
          filteredItems.map((item) => {
            const pBadge = PRIORITY_BADGES[item.priority] || PRIORITY_BADGES.Medium;

            return (
              <div
                key={item.id}
                onClick={() => onToggleItem(item.id)}
                className={`p-4 sm:p-5 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 select-none ${
                  item.completed
                    ? 'bg-[#101010] border-[#202020] opacity-60'
                    : 'bg-[#141414] border-[#262626] shadow-sm hover:border-[#D4AF37]/50'
                }`}
              >
                {/* Checkbox */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleItem(item.id);
                  }}
                  className="mt-0.5 text-[#777777] hover:text-[#D4AF37] transition-colors shrink-0"
                >
                  {item.completed ? (
                    <CheckSquare className="w-5 h-5 text-[#D4AF37]" />
                  ) : (
                    <Square className="w-5 h-5" />
                  )}
                </button>

                {/* Task Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    {/* Priority Badge */}
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold border ${pBadge.bg}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${pBadge.dot}`} />
                      {item.priority} Priority
                    </span>

                    {/* Category if present */}
                    {item.category && (
                      <span className="text-[11px] font-medium text-[#888888] bg-[#1E1E1E] border border-[#2A2A2A] px-2 py-0.5 rounded-md">
                        {item.category}
                      </span>
                    )}
                  </div>

                  <p
                    className={`text-sm sm:text-base font-medium leading-snug ${
                      item.completed ? 'line-through text-[#666666]' : 'text-[#FFFFFF]'
                    }`}
                  >
                    {item.task}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 mt-2.5 text-xs text-[#888888]">
                    <span className="flex items-center gap-1 font-medium text-[#D1D1D1]">
                      <User className="w-3.5 h-3.5 text-[#666666]" />
                      {item.assignee === 'Unassigned' ? (
                        <span className="text-amber-400 font-semibold">Unassigned</span>
                      ) : (
                        item.assignee
                      )}
                    </span>

                    <span className="flex items-center gap-1 font-medium text-[#D1D1D1]">
                      <Calendar className="w-3.5 h-3.5 text-[#666666]" />
                      {item.deadline === 'TBD' ? (
                        <span className="text-[#666666]">Deadline TBD</span>
                      ) : (
                        item.deadline
                      )}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
