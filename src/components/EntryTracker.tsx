import React, { useState, useEffect } from 'react';
import { LogEntryType } from '../types';

const entriesKey = (slug: string) => `arkgb-entries-${slug}`;

interface EntryTrackerProps {
  slug: string;
}

export const EntryTracker: React.FC<EntryTrackerProps> = ({ slug }) => {
  const [currentEntry, setCurrentEntry] = useState('');
  const [entryHistory, setEntryHistory] = useState<LogEntryType[]>(() => {
    const saved = localStorage.getItem(entriesKey(slug));
    if (saved) {
      try {
        return JSON.parse(saved) as LogEntryType[];
      } catch {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(entriesKey(slug), JSON.stringify(entryHistory));
  }, [entryHistory, slug]);

  const handleAddEntry = () => {
    if (!currentEntry.trim()) return;
    setEntryHistory((prev) => [
      { id: Date.now(), text: currentEntry.trim(), timestamp: new Date().toLocaleString() },
      ...prev,
    ]);
    setCurrentEntry('');
  };

  const handleDeleteEntry = (id: number) => {
    setEntryHistory((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className="dark:bg-zinc-900 bg-stone-100/80 dark:text-white p-4 rounded mt-6 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <label className="text-sm font-semibold tracking-wide dark:text-slate-300 text-stone-700 whitespace-nowrap">
          Entry №:
        </label>
        <input
          type="text"
          value={currentEntry}
          onChange={(e) => setCurrentEntry(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddEntry()}
          placeholder="e.g. 42"
          className="dark:bg-slate-800 p-2 border border-stone-300 dark:border-slate-600 rounded focus:outline-none focus:ring-1 focus:ring-rose-700 w-32"
        />
        <button
          onClick={handleAddEntry}
          disabled={!currentEntry.trim()}
          className="bg-rose-800 text-white px-3 py-2 rounded hover:bg-rose-900 transition-colors disabled:opacity-50"
        >
          Record
        </button>
      </div>
      {entryHistory.length > 0 && (
        <div className="flex flex-wrap items-center gap-1">
          {[...entryHistory].reverse().map((entry, index) => (
            <React.Fragment key={entry.id}>
              {index > 0 && (
                <span className="text-stone-400 dark:text-slate-500 text-sm select-none">→</span>
              )}
              <div className="flex items-center gap-1 dark:bg-zinc-800 bg-stone-50 rounded px-2 py-1">
                <span className="text-sm font-medium dark:text-white text-stone-800">{entry.text}</span>
                <button
                  onClick={() => handleDeleteEntry(entry.id)}
                  aria-label="Delete entry"
                  className="text-stone-400 hover:text-red-700 dark:text-slate-500 dark:hover:text-red-400 transition-colors text-xs leading-none"
                >
                  ✕
                </button>
              </div>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};
