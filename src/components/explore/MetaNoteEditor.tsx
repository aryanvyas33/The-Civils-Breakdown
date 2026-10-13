import React, { useState, useEffect } from 'react';
import { getMetaNote, saveMetaNote, deleteMetaNote } from '@/lib/notes';
import { Save, Trash2, Edit3, X } from 'lucide-react';

interface MetaNoteEditorProps {
  id: string;
  type: 'subject' | 'pointer';
  title: string;
}

export default function MetaNoteEditor({ id, type, title }: MetaNoteEditorProps) {
  const [content, setContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [hasNote, setHasNote] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  useEffect(() => {
    loadNote();
    window.addEventListener('pyq-meta-notes-updated', loadNote);
    return () => window.removeEventListener('pyq-meta-notes-updated', loadNote);
  }, [id]);

  const loadNote = () => {
    const note = getMetaNote(id);
    if (note) {
      setContent(note.content);
      setHasNote(true);
      setLastSaved(new Date(note.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    } else {
      setContent('');
      setHasNote(false);
      setLastSaved(null);
      setIsEditing(false); // Reset edit state if note is deleted externally
    }
  };

  const handleSave = () => {
    if (!content.trim()) {
      handleDelete();
      return;
    }
    saveMetaNote(id, type, content);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete your meta note for ${title}?`)) {
      deleteMetaNote(id);
      setContent('');
      setIsEditing(false);
    }
  };

  // If there's no note and we're not editing, show a minimal prompt
  if (!hasNote && !isEditing) {
    return (
      <div 
        onClick={() => setIsEditing(true)}
        className="mb-6 bg-amber-50/50 hover:bg-amber-50 border border-dashed border-amber-200 rounded-xl p-4 flex items-center justify-center gap-2 text-amber-700 cursor-pointer transition-colors"
      >
        <Edit3 className="w-4 h-4" />
        <span className="text-sm font-semibold">+ Add a Meta Note for {title}</span>
      </div>
    );
  }

  return (
    <div className="mb-6 bg-white border border-amber-200 shadow-sm rounded-xl overflow-hidden">
      <div className="bg-amber-50 px-4 py-2.5 border-b border-amber-200 flex justify-between items-center">
        <div className="flex items-center gap-2 text-amber-800">
          <Edit3 className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-wider">Meta Note</span>
        </div>
        <div className="flex items-center gap-3">
          {lastSaved && !isEditing && (
            <span className="text-[10px] font-semibold text-amber-600 bg-amber-100/50 px-2 py-0.5 rounded-full">
              Saved at {lastSaved}
            </span>
          )}
          {isEditing ? (
            <div className="flex gap-2">
              <button onClick={() => { loadNote(); setIsEditing(false); }} className="text-muted hover:text-primary p-1">
                <X className="w-4 h-4" />
              </button>
              <button onClick={handleSave} className="text-emerald-600 hover:text-emerald-700 p-1">
                <Save className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <button onClick={() => setIsEditing(true)} className="text-amber-600 hover:text-amber-700 p-1">
                <Edit3 className="w-4 h-4" />
              </button>
              <button onClick={handleDelete} className="text-red-500 hover:text-red-600 p-1">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
      
      {isEditing ? (
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={`Write your synthesized notes, key facts, or answer frameworks for ${title} here...`}
          className="w-full min-h-[150px] p-4 text-sm text-primary outline-none resize-y bg-white"
          autoFocus
        />
      ) : (
        <div className="p-4 text-sm text-primary leading-relaxed whitespace-pre-wrap">
          {content}
        </div>
      )}
    </div>
  );
}
