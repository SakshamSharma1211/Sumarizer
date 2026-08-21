import { AnalysisResult, ActionItem, Flashcard } from '../types';

export function exportAnalysisAsMarkdown(analysis: AnalysisResult): void {
  let md = `# ${analysis.title}\n\n`;
  md += `**Category:** ${analysis.category} | **Duration:** ${analysis.duration || 'N/A'} | **Generated:** ${new Date(analysis.createdAt).toLocaleString()}\n\n`;
  md += `---\n\n`;

  md += `## 1. Executive Summary\n\n`;
  md += `### Context & Purpose\n${analysis.executiveSummary.paragraph1}\n\n`;
  md += `### Core Discussions & Technical Concepts\n${analysis.executiveSummary.paragraph2}\n\n`;
  md += `### Outcomes & Next Steps\n${analysis.executiveSummary.paragraph3}\n\n`;

  if (analysis.keyTakeaways && analysis.keyTakeaways.length > 0) {
    md += `### Key Takeaways\n`;
    analysis.keyTakeaways.forEach((k) => (md += `- ${k}\n`));
    md += `\n`;
  }

  md += `---\n\n## 2. Chronological Topic Breakdown\n\n`;
  analysis.topics.forEach((t) => {
    md += `### [${t.timestamp}] ${t.title} ${t.speaker ? `(${t.speaker})` : ''}\n`;
    t.bullets.forEach((b) => (md += `- ${b}\n`));
    md += `\n`;
  });

  md += `---\n\n## 3. Action & Responsibility Matrix\n\n`;
  md += `| Task | Assignee | Deadline | Priority |\n`;
  md += `| :--- | :--- | :--- | :--- |\n`;
  analysis.actionItems.forEach((a) => {
    md += `| ${a.task.replace(/\|/g, '-')} | ${a.assignee} | ${a.deadline} | ${a.priority} |\n`;
  });
  md += `\n`;

  md += `---\n\n## 4. High-Yield Flashcards\n\n`;
  analysis.flashcards.forEach((f, idx) => {
    md += `**Q${idx + 1} (${f.category}${f.keyConcept ? ` - ${f.keyConcept}` : ''}):** ${f.question}\n`;
    md += `> **Answer:** ${f.answer}\n\n`;
  });

  if (analysis.calendarEvents && analysis.calendarEvents.length > 0) {
    md += `---\n\n## 5. Calendar Events & Deadlines\n\n`;
    analysis.calendarEvents.forEach((c) => {
      md += `- **${c.title}**: ${c.description} (Date: ${c.approximateDateTime}, Duration: ${c.durationMinutes} mins, Location: ${c.location || 'Remote'})\n`;
    });
    md += `\n`;
  }

  const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${analysis.title.replace(/[^a-zA-Z0-9_-]/g, '_')}_Analysis.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportActionItemsAsCsv(items: ActionItem[]): void {
  const headers = ['Task', 'Assignee', 'Deadline', 'Priority', 'Status', 'Category'];
  const rows = items.map((i) => [
    `"${i.task.replace(/"/g, '""')}"`,
    `"${i.assignee.replace(/"/g, '""')}"`,
    `"${i.deadline.replace(/"/g, '""')}"`,
    `"${i.priority}"`,
    `"${i.completed ? 'Completed' : 'Pending'}"`,
    `"${(i.category || 'General').replace(/"/g, '""')}"`,
  ]);

  const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `action_items_${Date.now()}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportFlashcardsAsAnkiCsv(flashcards: Flashcard[]): void {
  const rows = flashcards.map((f) => [
    `"${f.question.replace(/"/g, '""')}"`,
    `"${f.answer.replace(/"/g, '""')}"`,
    `"${(f.category || 'General').replace(/"/g, '""')}"`,
  ]);

  const csv = rows.map((r) => r.join('\t')).join('\n');
  const blob = new Blob([csv], { type: 'text/tab-separated-values;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `flashcards_anki_${Date.now()}.tsv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
