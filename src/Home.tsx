import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ulid } from 'ulid';
import { Investigator } from './types';
import { PREGENS } from './pregens';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedPregen, setSelectedPregen] = useState<string>('');

  const createNewInvestigator = (): void => {
    const slug = Math.random().toString(36).substring(2, 10);
    navigate(`/investigator/${slug}`);
  };

  const handlePlayPregen = (): void => {
    if (!selectedPregen) return;
    const template = PREGENS[selectedPregen];
    const slug = Math.random().toString(36).substring(2, 10);
    const investigator: Investigator = { id: ulid(), ...template };
    localStorage.setItem(`arkgb-investigator-${slug}`, JSON.stringify(investigator));
    navigate(`/investigator/${slug}`);
  };

  const handleLoadInvestigator = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (!file) return;

    const slugMatch = file.name.match(/^arkgb-(.+?)-backup/);
    if (!slugMatch) {
      alert(
        'Could not determine investigator slug from file name.\n' +
          'Please make sure the file is named like: arkgb-<slug>-backup.json',
      );
      return;
    }
    const slug = slugMatch[1];

    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>): void => {
      try {
        const result = e.target?.result;
        if (typeof result !== 'string') {
          alert('Invalid file format.');
          return;
        }
        const data: Record<string, string> = JSON.parse(result);
        Object.entries(data).forEach(([key, value]) => {
          localStorage.setItem(key, value);
        });
        navigate(`/investigator/${slug}`);
      } catch {
        alert('Invalid file format.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <p className="text-stone-600 dark:text-slate-400 text-center max-w-sm">
        Create a new investigator or load an existing backup to continue your adventure.
      </p>
      <button
        onClick={createNewInvestigator}
        className="w-full max-w-sm bg-rose-800 text-white px-6 py-3 rounded hover:bg-rose-900 transition-colors font-semibold"
      >
        Create New Investigator
      </button>

      <div className="flex flex-col items-center gap-3 w-full max-w-sm">
        <p className="text-stone-500 dark:text-slate-500 text-sm">— or start with a premade investigator —</p>
        <select
          value={selectedPregen}
          onChange={(e) => setSelectedPregen(e.target.value)}
          className="w-full border border-stone-300 dark:border-zinc-600 bg-stone-50 dark:bg-zinc-800 text-stone-800 dark:text-slate-200 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-rose-700"
        >
          <option value="">Select an investigator…</option>
          <option value="nathaniel_cho">Nathaniel Cho – The Boxer</option>
          <option value="rex_murphy">Rex Murphy – The Reporter</option>
          <option value="agnes_baker">Agnes Baker – The Waitress</option>
          <option value="kohaku_narukami">Kōhaku Narukami – The Folklorist</option>
          <option value="marion_tavares">Marion Tavares – The Trawler</option>
          <option value="silas_marsh">Silas Marsh – The Sailor</option>
          <option value="skids_otoole">Skids O'Toole – The Ex-Con</option>
          <option value="sister_mary">Sister Mary – The Nun</option>
          <option value="george_barnaby">George Barnaby – The Lawyer</option>
          <option value="amanda_sharpe">Amanda Sharpe – The Student</option>
          <option value="stella_clark">Stella Clark – The Letter Carrier</option>
          <option value="lola_hayes">Lola Hayes – The Actress</option>
          <option value="lucius_galloway">Lucius Galloway – The Dreamer</option>
          <option value="jacqueline_fine">Jacqueline Fine – The Psychic</option>
        </select>
        <button
          onClick={handlePlayPregen}
          disabled={!selectedPregen}
          className="w-full bg-rose-800 text-white px-6 py-3 rounded hover:bg-rose-900 transition-colors font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Play as Premade Investigator
        </button>
      </div>

      <label className="w-full max-w-sm text-center cursor-pointer bg-stone-700 text-white px-6 py-3 rounded hover:bg-stone-800 transition-colors font-semibold">
        Load Existing Investigator
        <input
          type="file"
          accept=".json"
          onChange={handleLoadInvestigator}
          ref={fileInputRef}
          className="hidden"
        />
      </label>
    </div>
  );
};
