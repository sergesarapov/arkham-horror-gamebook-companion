import React, { useState, useEffect } from 'react';
import { Investigator } from '../types';

interface InvestigatorCardProps {
  investigator: Investigator;
  setInvestigator: (investigator: Investigator) => void;
}

const inputCls =
  'dark:bg-slate-800 mt-1 block p-2 border border-stone-300 dark:border-slate-600 rounded focus:outline-none focus:ring-1 focus:ring-rose-700';
const labelCls = 'block text-sm dark:text-slate-400 font-medium text-stone-700';
const counterBtnCls = (color: 'green' | 'red') =>
  `px-2 py-1 rounded text-white text-sm transition-colors ${
    color === 'green'
      ? 'bg-emerald-700 hover:bg-emerald-800'
      : 'bg-red-800 hover:bg-red-900'
  }`;

interface StatBoxProps {
  label: string;
  value: number;
  suffix?: string;
}
const StatBox: React.FC<StatBoxProps> = ({ label, value, suffix }) => (
  <div className="flex flex-col items-center border border-rose-800/40 dark:border-rose-700/30 rounded px-2 py-1.5 flex-1">
    <span className="text-[10px] font-bold tracking-widest uppercase text-rose-800 dark:text-rose-400 mb-0.5">
      {label}
    </span>
    <span className="text-2xl font-bold dark:text-white text-stone-900">
      {value}
      {suffix && <span className="text-base font-normal text-stone-500 dark:text-slate-400 ml-1">{suffix}</span>}
    </span>
  </div>
);

interface CounterRowProps {
  label: string;
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  min?: number;
  warning?: string;
}
const CounterRow: React.FC<CounterRowProps> = ({ label, value, onIncrement, onDecrement, min, warning }) => (
  <div className="flex items-center gap-3 flex-wrap">
    <span className="text-sm font-semibold tracking-wide uppercase text-rose-800 dark:text-rose-400 w-24">
      {label}
    </span>
    <span className="text-2xl font-bold dark:text-white text-stone-900 w-10 text-center">{value}</span>
    <button onClick={onIncrement} className={counterBtnCls('green')}>+1</button>
    <button onClick={onDecrement} disabled={min !== undefined && value <= min} className={counterBtnCls('red')}>−1</button>
    {warning && value < 0 && (
      <span className="text-xs text-red-700 dark:text-red-400">{warning}</span>
    )}
  </div>
);

const sectionTitle = (text: string) => (
  <div className="flex items-center gap-3 my-4">
    <div className="flex-1 border-t border-stone-300 dark:border-slate-600" />
    <span className="text-xs font-bold tracking-widest uppercase text-stone-500 dark:text-slate-400">{text}</span>
    <div className="flex-1 border-t border-stone-300 dark:border-slate-600" />
  </div>
);

export const InvestigatorCard: React.FC<InvestigatorCardProps> = ({ investigator, setInvestigator }) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [local, setLocal] = useState<Investigator>(investigator);

  useEffect(() => {
    setInvestigator(local);
  }, [local]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setLocal((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocal((prev) => ({ ...prev, [name]: value === '' ? 0 : +value }));
  };

  const inc = (field: keyof Investigator) =>
    setLocal((prev) => ({ ...prev, [field]: (prev[field] as number) + 1 }));

  const dec = (field: keyof Investigator, min?: number) =>
    setLocal((prev) => {
      const cur = prev[field] as number;
      if (min !== undefined && cur <= min) return prev;
      return { ...prev, [field]: cur - 1 };
    });

  const setOtherItem = (index: number, value: string) => {
    const items = [...local.otherItems] as [string, string, string];
    items[index] = value;
    setLocal((prev) => ({ ...prev, otherItems: items }));
  };

  const setOtherAbility = (index: number, value: string) => {
    const abilities = [...local.otherAbilities] as [string, string, string];
    abilities[index] = value;
    setLocal((prev) => ({ ...prev, otherAbilities: abilities }));
  };

  const setOtherWeakness = (index: number, value: string) => {
    const weaknesses = [...local.otherWeaknesses] as [string, string, string];
    weaknesses[index] = value;
    setLocal((prev) => ({ ...prev, otherWeaknesses: weaknesses }));
  };

  const effectiveCombat = local.combat + Math.min(0, local.health);
  const effectiveWillpower = local.willpower + Math.min(0, local.sanity);
  const healthPenalty = Math.abs(Math.min(0, local.health));
  const sanityPenalty = Math.abs(Math.min(0, local.sanity));

  if (isEditMode) {
    return (
      <div className="dark:bg-zinc-900 bg-stone-100/80 dark:text-white p-4 rounded">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Edit Investigator</h2>
          <button
            onClick={() => setIsEditMode(false)}
            className="bg-rose-800 text-white px-4 py-2 rounded hover:bg-rose-900 transition-colors"
          >
            Save
          </button>
        </div>

        <div className="mb-4">
          <label className={labelCls}>Name</label>
          <input
            type="text"
            name="name"
            value={local.name}
            onChange={handleChange}
            placeholder="Investigator name"
            className={`${inputCls} w-full max-w-sm`}
          />
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          {(['willpower', 'intellect', 'combat'] as const).map((stat) => (
            <div key={stat}>
              <label className={labelCls}>{stat.charAt(0).toUpperCase() + stat.slice(1)}</label>
              <input
                type="number"
                name={stat}
                value={local[stat]}
                onChange={handleNumChange}
                className={`${inputCls} w-full`}
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className={labelCls}>Health</label>
            <input type="number" name="health" value={local.health} onChange={handleNumChange} className={`${inputCls} w-full`} />
          </div>
          <div>
            <label className={labelCls}>Sanity</label>
            <input type="number" name="sanity" value={local.sanity} onChange={handleNumChange} className={`${inputCls} w-full`} />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          {(['resources', 'clues', 'doom'] as const).map((stat) => (
            <div key={stat}>
              <label className={labelCls}>{stat.charAt(0).toUpperCase() + stat.slice(1)}</label>
              <input
                type="number"
                name={stat}
                value={local[stat]}
                onChange={handleNumChange}
                min="0"
                className={`${inputCls} w-full`}
              />
            </div>
          ))}
        </div>

        {sectionTitle('Items')}
        <div className="mb-3">
          <label className={labelCls}>Starting Item</label>
          <textarea
            name="startingItem"
            value={local.startingItem}
            onChange={handleChange}
            rows={2}
            className={`${inputCls} w-full`}
          />
        </div>
        <label className={labelCls}>Other Items</label>
        <div className="grid grid-cols-3 gap-3 mb-4">
          {local.otherItems.map((item, i) => (
            <div key={i}>
              <textarea
                value={item}
                onChange={(e) => setOtherItem(i, e.target.value)}
                rows={3}
                className={`${inputCls} w-full`}
              />
            </div>
          ))}
        </div>

        {sectionTitle('Abilities')}
        <div className="mb-3">
          <label className={labelCls}>Major Ability</label>
          <textarea
            name="majorAbility"
            value={local.majorAbility}
            onChange={handleChange}
            rows={2}
            className={`${inputCls} w-full`}
          />
        </div>
        <label className={labelCls}>Other Abilities</label>
        <div className="grid grid-cols-3 gap-3 mb-4">
          {local.otherAbilities.map((ab, i) => (
            <div key={i}>
              <textarea
                value={ab}
                onChange={(e) => setOtherAbility(i, e.target.value)}
                rows={3}
                className={`${inputCls} w-full`}
              />
            </div>
          ))}
        </div>

        {sectionTitle('Weaknesses')}
        <div className="mb-3">
          <label className={labelCls}>Major Weakness</label>
          <textarea
            name="majorWeakness"
            value={local.majorWeakness}
            onChange={handleChange}
            rows={2}
            className={`${inputCls} w-full`}
          />
        </div>
        <label className={labelCls}>Other Weaknesses</label>
        <div className="grid grid-cols-3 gap-3 mb-4">
          {local.otherWeaknesses.map((w, i) => (
            <div key={i}>
              <textarea
                value={w}
                onChange={(e) => setOtherWeakness(i, e.target.value)}
                rows={3}
                className={`${inputCls} w-full`}
              />
            </div>
          ))}
        </div>

        <button
          onClick={() => setIsEditMode(false)}
          className="bg-rose-800 text-white px-4 py-2 rounded hover:bg-rose-900 transition-colors"
        >
          Save
        </button>
      </div>
    );
  }

  return (
    <div className="dark:bg-zinc-900 bg-stone-100/80 dark:text-white p-4 rounded">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-bold dark:text-white text-stone-900">
            {local.name || <span className="italic text-stone-400">Unnamed Investigator</span>}
          </h2>
        </div>
        <button
          onClick={() => setIsEditMode(true)}
          className="bg-rose-800 text-white px-4 py-2 rounded hover:bg-rose-900 transition-colors"
        >
          Edit
        </button>
      </div>

      {/* Base stats */}
      <div className="flex gap-2 mb-4">
        <StatBox
          label="Willpower"
          value={local.willpower}
          suffix={sanityPenalty > 0 ? `→ ${effectiveWillpower}` : undefined}
        />
        <StatBox label="Intellect" value={local.intellect} />
        <StatBox
          label="Combat"
          value={local.combat}
          suffix={healthPenalty > 0 ? `→ ${effectiveCombat}` : undefined}
        />
      </div>

      {/* Tracked values */}
      <div className="space-y-3 mb-4 dark:bg-zinc-800 bg-stone-50 rounded p-3">
        <CounterRow
          label="Health"
          value={local.health}
          onIncrement={() => inc('health')}
          onDecrement={() => dec('health')}
          warning={`Combat −${healthPenalty} (effective: ${effectiveCombat})`}
        />
        <CounterRow
          label="Sanity"
          value={local.sanity}
          onIncrement={() => inc('sanity')}
          onDecrement={() => dec('sanity')}
          warning={`Willpower −${sanityPenalty} (effective: ${effectiveWillpower})`}
        />
        <hr className="border-stone-200 dark:border-slate-700" />
        <CounterRow
          label="Resources"
          value={local.resources}
          onIncrement={() => inc('resources')}
          onDecrement={() => dec('resources', 0)}
          min={0}
        />
        <CounterRow
          label="Clues"
          value={local.clues}
          onIncrement={() => inc('clues')}
          onDecrement={() => dec('clues', 0)}
          min={0}
        />
        <CounterRow
          label="Doom"
          value={local.doom}
          onIncrement={() => inc('doom')}
          onDecrement={() => dec('doom', 0)}
          min={0}
        />
      </div>

      {/* Items */}
      {sectionTitle('Items')}
      <div className="mb-3">
        <p className="text-xs font-bold tracking-wide uppercase text-stone-500 dark:text-slate-400 mb-1">Starting Item</p>
        <div className="border border-stone-300 dark:border-slate-600 rounded p-2 min-h-[48px] text-sm dark:text-slate-200 text-stone-800 whitespace-pre-wrap">
          {local.startingItem || <span className="text-stone-400 italic">—</span>}
        </div>
      </div>
      <p className="text-xs font-bold tracking-wide uppercase text-stone-500 dark:text-slate-400 mb-1">Other Items</p>
      <div className="grid grid-cols-3 gap-3 mb-4">
        {local.otherItems.map((item, i) => (
          <div key={i}>
            <div className="border border-stone-300 dark:border-slate-600 rounded p-2 min-h-[64px] text-sm dark:text-slate-200 text-stone-800 whitespace-pre-wrap">
              {item || <span className="text-stone-400 italic">—</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Abilities */}
      {sectionTitle('Abilities')}
      <div className="mb-3">
        <p className="text-xs font-bold tracking-wide uppercase text-stone-500 dark:text-slate-400 mb-1">Major Ability</p>
        <div className="border border-stone-300 dark:border-slate-600 rounded p-2 min-h-[48px] text-sm dark:text-slate-200 text-stone-800 whitespace-pre-wrap">
          {local.majorAbility || <span className="text-stone-400 italic">—</span>}
        </div>
      </div>
      <p className="text-xs font-bold tracking-wide uppercase text-stone-500 dark:text-slate-400 mb-1">Other Abilities</p>
      <div className="grid grid-cols-3 gap-3 mb-4">
        {local.otherAbilities.map((ab, i) => (
          <div key={i}>
            <div className="border border-stone-300 dark:border-slate-600 rounded p-2 min-h-[64px] text-sm dark:text-slate-200 text-stone-800 whitespace-pre-wrap">
              {ab || <span className="text-stone-400 italic">—</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Weaknesses */}
      {sectionTitle('Weaknesses')}
      <div className="mb-3">
        <p className="text-xs font-bold tracking-wide uppercase text-stone-500 dark:text-slate-400 mb-1">Major Weakness</p>
        <div className="border border-stone-300 dark:border-slate-600 rounded p-2 min-h-[48px] text-sm dark:text-slate-200 text-stone-800 whitespace-pre-wrap">
          {local.majorWeakness || <span className="text-stone-400 italic">—</span>}
        </div>
      </div>
      <p className="text-xs font-bold tracking-wide uppercase text-stone-500 dark:text-slate-400 mb-1">Other Weaknesses</p>
      <div className="grid grid-cols-3 gap-3 mb-4">
        {local.otherWeaknesses.map((w, i) => (
          <div key={i}>
            <div className="border border-stone-300 dark:border-slate-600 rounded p-2 min-h-[64px] text-sm dark:text-slate-200 text-stone-800 whitespace-pre-wrap">
              {w || <span className="text-stone-400 italic">—</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
