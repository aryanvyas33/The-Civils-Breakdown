'use client';

import React, { useState, useEffect } from 'react';
import { NoteEntry, getNote, saveNote, deleteNote, getFile, deleteFile } from '@/lib/notes';
import { Edit2, Trash2, Plus, ChevronDown, ChevronUp, FileText, File as FileIcon, Download } from 'lucide-react';

interface QuestionNoteEditorProps {
  questionId: string;
  pointerId?: string;
}

// PDF/File upload is temporarily disabled to conserve storage space.
// Will be re-enabled in a future update.

export default function QuestionNoteEditor({ questionId, pointerId }: QuestionNoteEditorProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [note, setNote] = useState<NoteEntry | null>(null);
  
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Draft states
  const [evalDraft, setEvalDraft] = useState('');
  const [ansType, setAnsType] = useState<'text' | 'file' | null>(null);
  const [ansTextDraft, setAnsTextDraft] = useState('');
  
  // Saved file references (for backward-compatibility with previously uploaded files)
  const [savedFileName, setSavedFileName] = useState<string | null>(null);
  const [savedFileId, setSavedFileId] = useState<string | null>(null);

  useEffect(() => {
    const loadNote = () => {
      const existing = getNote(questionId);
      setNote(existing);
      if (existing) {
        setEvalDraft(existing.content || '');
        setAnsType(existing.answerType || null);
        setAnsTextDraft(existing.answerText || '');
        setSavedFileName(existing.answerFileName || null);
        setSavedFileId(existing.answerFileId || null);
      }
    };
    
    loadNote();
    window.addEventListener('pyq-notes-updated', loadNote);
    return () => window.removeEventListener('pyq-notes-updated', loadNote);
  }, [questionId]);

  const handleSave = async () => {
    setIsSaving(true);
    setErrorMsg('');
    
    try {
      const currentAnsType = ansTextDraft.trim() ? 'text' : (savedFileId ? 'file' : null);
      const saved = saveNote(
        questionId, 
        evalDraft, 
        pointerId, 
        currentAnsType, 
        ansTextDraft, 
        savedFileId || undefined, 
        savedFileName || undefined
      );

      if (!saved) {
        setErrorMsg('Failed to save note to local storage. Local storage quota may be exceeded.');
        return;
      }

      setIsEditing(false);
    } catch (e) {
      console.error('[NoteEditor] Save failed:', e);
      setErrorMsg('Failed to save note.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this answer and evaluation?')) {
      if (savedFileId) {
        await deleteFile(savedFileId);
      }
      deleteNote(questionId);
      setEvalDraft('');
      setAnsType(null);
      setAnsTextDraft('');
      setSavedFileId(null);
      setSavedFileName(null);
      setIsEditing(false);
      setIsExpanded(false);
    }
  };

  const handleCancel = () => {
    if (note) {
      setEvalDraft(note.content || '');
      setAnsType(note.answerType || null);
      setAnsTextDraft(note.answerText || '');
      setSavedFileName(note.answerFileName || null);
      setSavedFileId(note.answerFileId || null);
      setIsEditing(false);
      setErrorMsg('');
    } else {
      setEvalDraft('');
      setAnsType(null);
      setAnsTextDraft('');
      setIsExpanded(false);
      setIsEditing(false);
      setErrorMsg('');
    }
  };

  const handleDownloadFile = async () => {
    if (!savedFileId || !savedFileName) return;
    try {
      const fileData = await getFile(savedFileId);
      if (!fileData) {
        setErrorMsg('Note: This legacy file attachment was stored locally on another device and is not available in this browser session.');
        return;
      }
      const blob = fileData instanceof Blob ? fileData : new Blob([fileData], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = savedFileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (e) {
      console.error('[NoteEditor] Download failed:', e);
      setErrorMsg('Failed to download file from local storage.');
    }
  };

  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  // State 1: Collapsed & No Note
  if (!isExpanded && !note) {
    return (
      <div className="border-t-4 border-dashed border-retro-border bg-retro-window rounded-none mt-4">
        <button 
          onClick={() => { setIsExpanded(true); setIsEditing(true); }}
          className="w-full px-5 py-3 text-left flex items-center justify-between text-xs font-bold font-space uppercase text-retro-border hover:bg-white transition-colors"
        >
          <span className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            <span>Add Answer & Evaluation</span>
          </span>
        </button>
      </div>
    );
  }

  // State 2: Collapsed & Has Note
  if (!isExpanded && note) {
    return (
      <div className="border-t-4 border-dashed border-retro-border bg-[#FFD1D1] mt-4">
        <button 
          onClick={() => setIsExpanded(true)}
          className="w-full px-5 py-3 text-left flex items-center justify-between text-xs font-bold font-space uppercase text-retro-accent hover:bg-white hover:text-retro-border transition-colors"
        >
          <span className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            <span>Your Answer & Evaluation</span>
            <span className="retro-badge bg-white shadow-none py-0.5 ml-2">
              Saved {timeAgo(note.updatedAt)}
            </span>
          </span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
    );
  }

  // Expanded State (both viewing and editing)
  return (
    <div className={`border-t-4 border-dashed mt-4 ${note && !isEditing ? 'border-retro-accent bg-[#FFD1D1]' : 'border-retro-border bg-retro-window'}`}>
      <button 
        onClick={() => setIsExpanded(false)}
        className={`w-full px-5 py-3 text-left flex items-center justify-between text-xs font-bold font-space uppercase transition-colors ${note && !isEditing ? 'text-retro-accent hover:bg-white hover:text-retro-border' : 'text-retro-border hover:bg-white'}`}
      >
        <span className="flex items-center gap-2">
          <FileText className="w-4 h-4" />
          <span>{isEditing ? (note ? 'Edit Answer & Evaluation' : 'Add Answer & Evaluation') : 'Your Answer & Evaluation'}</span>
          {note && !isEditing && (
            <span className="retro-badge bg-white shadow-none py-0.5 ml-2 text-retro-border">
              Saved {timeAgo(note.updatedAt)}
            </span>
          )}
        </span>
        <ChevronUp className="w-4 h-4" />
      </button>

      <div className="px-5 pb-5">
        
        {errorMsg && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 border border-red-200 rounded-lg text-xs font-medium">
            {errorMsg}
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-5">
          
          {/* LEFT PANE: ANSWER SCRIPT TEXT */}
          <div className={`flex-1 border-4 p-4 shadow-retro-sm flex flex-col ${isEditing ? 'bg-white border-retro-border' : 'bg-white border-retro-border'}`}>
            <h3 className="font-space font-bold mb-3 flex items-center gap-2 text-retro-border uppercase tracking-wide">
              <Edit2 className="w-4 h-4 text-retro-border" />
              Answer Script
            </h3>
            
            {isEditing ? (
              <div className="flex-1 flex flex-col">
                <textarea
                  value={ansTextDraft}
                  onChange={(e) => {
                    setAnsTextDraft(e.target.value);
                    setAnsType(e.target.value.trim() ? 'text' : null);
                  }}
                  placeholder="Write your full answer here..."
                  className="w-full font-space text-xs text-retro-border border-4 border-retro-border p-3 resize-y flex-1 min-h-[140px] bg-white placeholder-retro-border/40 focus:outline-none focus:bg-retro-window shadow-[4px_4px_0px_#2A2A2A]"
                />
              </div>
            ) : (
              // Viewing mode for Answer
              <div className="flex-1 flex flex-col">
                {ansTextDraft ? (
                  <div className="font-space text-xs text-retro-border leading-relaxed whitespace-pre-wrap font-bold bg-retro-window p-4 border-4 border-retro-border shadow-retro-sm">
                    {ansTextDraft}
                  </div>
                ) : ansType === 'file' && savedFileName ? (
                  <div className="border-4 border-retro-border bg-retro-window p-4 flex items-center justify-between shadow-retro-sm">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <FileIcon className="w-6 h-6 text-retro-accent flex-shrink-0" />
                      <span className="font-space text-xs font-bold text-retro-border truncate">
                        {savedFileName}
                      </span>
                    </div>
                    <button 
                      onClick={handleDownloadFile}
                      className="retro-badge hover:bg-retro-accent hover:text-white transition-colors cursor-pointer"
                      title="Download File"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="font-space text-xs text-retro-border/60 italic text-center py-6 border-4 border-dashed border-retro-border">
                    No answer script written.
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* RIGHT PANE: EVALUATION NOTES */}
          <div className="flex-1 border-4 border-retro-border p-4 shadow-retro-sm flex flex-col bg-retro-gs1">
            <h3 className="font-space font-bold mb-3 flex items-center gap-2 text-retro-border uppercase tracking-wide">
              <FileText className="w-4 h-4 text-retro-border" />
              Evaluation Notes
            </h3>
            
            {isEditing ? (
              <textarea 
                value={evalDraft}
                onChange={(e) => setEvalDraft(e.target.value)}
                placeholder="Add self-evaluation, key missing points, marks awarded..."
                className="w-full font-space text-xs text-retro-border border-4 border-retro-border p-3 resize-y flex-1 min-h-[140px] bg-white placeholder-retro-border/60 focus:outline-none focus:bg-retro-window shadow-[4px_4px_0px_#2A2A2A]"
              />
            ) : (
              <div className="font-space text-xs text-retro-border leading-relaxed whitespace-pre-wrap font-bold bg-white p-4 border-4 border-retro-border shadow-[4px_4px_0px_#2A2A2A] min-h-[140px]">
                {evalDraft || <span className="text-retro-border/60 italic">No evaluation notes yet.</span>}
              </div>
            )}
          </div>
          
        </div>

        {/* BOTTOM ACTION BAR */}
        <div className="mt-6 flex items-center justify-between border-t-4 border-dashed border-retro-border pt-4">
          {isEditing ? (
            <>
              <span className="font-space text-[10px] text-retro-border font-bold uppercase hidden sm:inline">Stored locally in your browser</span>
              <div className="flex gap-3">
                <button 
                  onClick={handleCancel}
                  disabled={isSaving}
                  className="retro-btn shadow-none bg-white hover:bg-retro-window disabled:opacity-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  disabled={isSaving}
                  className="retro-btn bg-retro-accent text-white hover:bg-retro-border disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-1.5"
                >
                  {isSaving ? 'Saving...' : '💾 Save All'}
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex gap-3 ml-auto">
                <button 
                  onClick={() => setIsEditing(true)}
                  className="retro-btn bg-white hover:bg-retro-window shadow-none flex items-center gap-1.5"
                >
                  <Edit2 className="w-3.5 h-3.5" /> Edit
                </button>
                <button 
                  onClick={handleDelete}
                  className="retro-btn bg-[#FFD1D1] text-retro-accent border-retro-accent shadow-none hover:bg-retro-accent hover:text-white flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
}
