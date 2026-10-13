'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, Sparkles } from 'lucide-react';
import { getAutocompleteSuggestions } from '@/lib/search';

interface SearchBarProps {
  initialQuery?: string;
  size?: 'hero' | 'compact';
  autoFocus?: boolean;
  onSearchSubmit?: (query: string) => void;
}

export default function SearchBar({
  initialQuery = '',
  size = 'hero',
  autoFocus = false,
  onSearchSubmit,
}: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    if (query.trim().length >= 2) {
      const results = getAutocompleteSuggestions(query, 5);
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
    setSelectedIndex(null);
  }, [query]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSelectedIndex(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanQuery = query.trim();
    if (!cleanQuery) return;

    setIsOpen(false);
    setSelectedIndex(null);
    if (onSearchSubmit) {
      onSearchSubmit(cleanQuery);
    } else {
      router.push(`/search?q=${encodeURIComponent(cleanQuery)}`);
    }
  };

  const handleSelectSuggestion = (item: string) => {
    setQuery(item);
    setIsOpen(false);
    setSelectedIndex(null);
    if (onSearchSubmit) {
      onSearchSubmit(item);
    } else {
      router.push(`/search?q=${encodeURIComponent(item)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev === null || prev === suggestions.length - 1 ? 0 : prev + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev === null || prev === 0 ? suggestions.length - 1 : prev - 1));
    } else if (e.key === 'Enter') {
      if (selectedIndex !== null) {
        e.preventDefault();
        handleSelectSuggestion(suggestions[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setSelectedIndex(null);
    }
  };

  if (size === 'compact') {
    return (
      <div className="relative w-full" ref={dropdownRef}>
        <form onSubmit={handleSubmit} className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-retro-border">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder="C:\> search..."
            role="combobox"
            aria-expanded={isOpen}
            aria-controls="compact-suggestions-list"
            aria-autocomplete="list"
            aria-activedescendant={selectedIndex !== null ? `compact-suggestion-${selectedIndex}` : undefined}
            className="w-full pl-10 pr-24 py-2.5 rounded border-2 border-retro-border bg-white text-sm font-space font-bold text-retro-border placeholder-retro-border/70 focus:outline-none focus:shadow-retro-sm shadow-[2px_2px_0px_#2A2A2A] transition-all"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setSuggestions([]);
              }}
              className="absolute right-20 top-3 text-retro-border hover:text-retro-accent p-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="submit"
            className="absolute inset-y-1.5 right-1.5 px-3 bg-retro-border hover:bg-retro-accent text-white text-xs font-vt uppercase tracking-wider rounded-sm transition-colors border-2 border-transparent"
          >
            EXECUTE
          </button>
        </form>

        {isOpen && suggestions.length > 0 && (
          <div id="compact-suggestions-list" role="listbox" className="absolute left-0 right-0 top-full mt-1.5 bg-retro-window border-2 border-retro-border rounded shadow-retro-sm z-50 overflow-hidden py-1">
            {suggestions.map((item, idx) => (
              <button
                key={idx}
                id={`compact-suggestion-${idx}`}
                role="option"
                aria-selected={idx === selectedIndex}
                type="button"
                onClick={() => handleSelectSuggestion(item)}
                className={`w-full px-4 py-2 text-left text-xs font-space font-bold flex items-center gap-2 transition-colors ${
                  idx === selectedIndex ? 'bg-retro-border text-white' : 'hover:bg-retro-border hover:text-white text-retro-border'
                }`}
              >
                <Search className={`w-3.5 h-3.5 ${idx === selectedIndex ? 'text-white' : 'text-retro-border'}`} />
                <span>{item}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Hero Search Bar (Homepage & Main Search banner)
  return (
    <div className="w-full max-w-2xl relative" ref={dropdownRef}>
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-retro-border group-focus-within:text-retro-accent transition-colors" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          autoFocus={autoFocus}
          role="combobox"
          aria-expanded={isOpen}
          aria-controls="hero-suggestions-list"
          aria-autocomplete="list"
          aria-activedescendant={selectedIndex !== null ? `hero-suggestion-${selectedIndex}` : undefined}
          className="block w-full pl-12 pr-32 md:pr-36 py-4 rounded border-[3px] border-retro-border bg-white text-primary font-space font-bold placeholder-muted focus:outline-none focus:shadow-retro-hover shadow-retro transition-all text-base md:text-lg"
          placeholder='C:\> search query...'
        />

        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setSuggestions([]);
            }}
            className="absolute right-[100px] md:right-[130px] top-[1.15rem] text-retro-border hover:text-retro-accent p-1 bg-white border-2 border-retro-border shadow-retro-sm"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        <button
          type="submit"
          className="absolute inset-y-2 right-2 bg-retro-border hover:bg-retro-accent text-white px-5 md:px-7 py-2 rounded-sm font-vt text-xl md:text-2xl transition-colors flex items-center justify-center border-2 border-retro-border shadow-retro-sm hover:translate-y-0.5 hover:shadow-none"
        >
          EXECUTE
        </button>
      </form>

      {/* Autocomplete dropdown */}
      {isOpen && suggestions.length > 0 && (
        <div id="hero-suggestions-list" role="listbox" className="absolute left-0 right-0 top-full mt-3 bg-retro-window border-4 border-retro-border shadow-retro-lg z-50 overflow-hidden divide-y-2 divide-retro-border">
          <div className="px-4 py-2 bg-retro-folder border-b-2 border-retro-border text-sm font-vt text-retro-border uppercase tracking-widest flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            <span>Suggested Topics</span>
          </div>
          {suggestions.map((item, idx) => (
            <button
              key={idx}
              id={`hero-suggestion-${idx}`}
              role="option"
              aria-selected={idx === selectedIndex}
              type="button"
              onClick={() => handleSelectSuggestion(item)}
              className={`w-full px-4 py-3 text-left font-space text-sm flex items-center justify-between transition-colors ${
                idx === selectedIndex ? 'bg-retro-border text-white' : 'hover:bg-retro-border hover:text-white text-retro-border'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Search className={`w-4 h-4 ${idx === selectedIndex ? 'text-white' : 'text-retro-border'}`} />
                <span className="font-bold">{item}</span>
              </div>
              <span className={`text-xs ${idx === selectedIndex ? 'text-white' : 'text-retro-border'}`}>Topic</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
