import React, { useState, useRef, useEffect } from 'react';
import { Dice6, X } from 'lucide-react';
import { DiceRoller } from './DiceRoller';

export const FloatingDice: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen]);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2" ref={panelRef}>
      {isOpen && (
        <div className="bg-stone-50 dark:bg-zinc-800 rounded-xl shadow-xl p-4 w-60 flex flex-col gap-3 border border-stone-200 dark:border-zinc-700">
          <DiceRoller title="d6" d="d6" />
          <DiceRoller title="2d6" d="2d6" />
        </div>
      )}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="bg-rose-800 hover:bg-rose-900 text-white rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
      >
        {isOpen ? <X size={24} /> : <Dice6 size={24} />}
      </button>
    </div>
  );
};
