import React, { useState } from 'react';
import { NoteEntry } from '@/lib/notes';
import { getQuestionById } from '@/lib/data';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface AggregatedNotesListProps {
  notes: NoteEntry[];
}

export default function AggregatedNotesList({ notes }: AggregatedNotesListProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!notes || notes.length === 0) return null;

  return (
    <div className="mb-6 bg-white border border-bordercolor shadow-sm rounded-xl overflow-hidden">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-3 bg-surface hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2 text-primary">
          <span className="text-xs font-bold uppercase tracking-wider">Aggregated Question Notes</span>
          <span className="text-xs font-bold bg-primary text-white px-1.5 py-0.5 rounded-full">{notes.length}</span>
        </div>
        {isExpanded ? <ChevronUp className="w-4 h-4 text-muted" /> : <ChevronDown className="w-4 h-4 text-muted" />}
      </button>

      {isExpanded && (
        <div className="divide-y divide-bordercolor border-t border-bordercolor max-h-96 overflow-y-auto custom-scrollbar">
          {notes.map((note) => {
            const question = getQuestionById(note.questionId);
            if (!question) return null;
            return (
              <div key={note.questionId} className="p-4 bg-white">
                <div className="flex justify-between items-start gap-4 mb-2">
                  <p className="text-sm font-medium text-primary flex-1 line-clamp-2">
                    {question.text}
                  </p>
                  <Link 
                    href={`/question/${question.id}`}
                    className="shrink-0 flex items-center gap-1 text-[10px] font-bold text-accent bg-accent-light px-2 py-1 rounded hover:bg-accent hover:text-white transition-colors"
                  >
                    Q ({question.year}) <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
                <div className="bg-amber-50/30 border-l-2 border-amber-300 pl-3 py-1.5 text-sm text-gray-700 whitespace-pre-wrap">
                  {note.content}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
