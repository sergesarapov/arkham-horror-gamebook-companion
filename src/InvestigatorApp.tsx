import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ulid } from 'ulid';
import { InvestigatorCard } from './components/InvestigatorCard';
import { EntryTracker } from './components/EntryTracker';
import { FloatingDice } from './components/FloatingDice';
import { Investigator } from './types';

const EMPTY_INVESTIGATOR = (_slug: string): Investigator => ({
  id: ulid(),
  name: '',
  willpower: 0,
  intellect: 0,
  combat: 0,
  health: 0,
  sanity: 0,
  resources: 0,
  clues: 0,
  doom: 0,
  startingItem: '',
  otherItems: ['', '', ''],
  majorAbility: '',
  otherAbilities: ['', '', ''],
  majorWeakness: '',
  otherWeaknesses: ['', '', ''],
  secrets: ['', '', ''],
});

const storageKey = (slug: string) => `arkgb-investigator-${slug}`;

export const InvestigatorApp: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  if (!slug) throw new Error('Slug parameter is required');

  const navigate = useNavigate();

  const [investigator, setInvestigatorState] = useState<Investigator>(() => {
    const saved = localStorage.getItem(storageKey(slug));
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Investigator;
        return {
          ...EMPTY_INVESTIGATOR(slug),
          ...parsed,
          willpower: +parsed.willpower,
          intellect: +parsed.intellect,
          combat: +parsed.combat,
          health: +parsed.health,
          sanity: +parsed.sanity,
          resources: +parsed.resources,
          clues: +parsed.clues,
          doom: +parsed.doom,
        };
      } catch {
        return EMPTY_INVESTIGATOR(slug);
      }
    }
    return EMPTY_INVESTIGATOR(slug);
  });

  useEffect(() => {
    localStorage.setItem(storageKey(slug), JSON.stringify(investigator));
  }, [investigator, slug]);

  const handleSetInvestigator = useCallback((updated: Investigator) => {
    setInvestigatorState(updated);
  }, []);

  const handleSaveProgress = () => {
    const data: Record<string, string | null> = {};
    Object.keys(localStorage)
      .filter((key) => key.includes(slug))
      .forEach((key) => {
        data[key] = localStorage.getItem(key);
      });
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `arkgb-${slug}-backup.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <p className="mb-4 text-sm dark:text-slate-400 text-stone-600">
        Bookmark this address to return to your investigator later:{' '}
        <code className="bg-stone-200 dark:bg-zinc-700 px-1 rounded">
          /investigator/<b>{slug}</b>
        </code>
      </p>
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          className="bg-rose-800 text-white px-4 py-2 rounded hover:bg-rose-900 transition-colors"
          onClick={() => navigate('/')}
        >
          Home
        </button>
        <button
          className="bg-stone-600 text-white px-4 py-2 rounded hover:bg-stone-700 transition-colors"
          onClick={handleSaveProgress}
        >
          Save Progress
        </button>
      </div>
      <InvestigatorCard
        key={investigator.id}
        investigator={investigator}
        setInvestigator={handleSetInvestigator}
      />
      <EntryTracker slug={slug} />
      <FloatingDice />
    </>
  );
};
