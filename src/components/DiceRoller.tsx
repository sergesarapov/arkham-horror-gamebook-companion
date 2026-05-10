import React, { useState } from 'react';
import { Dice6 } from 'lucide-react';
import { DiceType } from '../types';

interface DiceRollerProps {
  title: string;
  d: DiceType;
}

export const DiceRoller: React.FC<DiceRollerProps> = ({ title, d }) => {
  const [result, setResult] = useState<number | null>(null);
  const [rolls, setRolls] = useState<[number, number] | null>(null);
  const [isRolling, setIsRolling] = useState<boolean>(false);

  const rollDice = (): void => {
    const getResult = (): void => {
      if (d === '2d6') {
        const firstRoll = Math.floor(Math.random() * 6) + 1;
        const secondRoll = Math.floor(Math.random() * 6) + 1;
        setRolls([firstRoll, secondRoll]);
        setResult(firstRoll + secondRoll);
      } else if (d === 'd66') {
        const firstRoll = Math.floor(Math.random() * 6) + 1;
        const secondRoll = Math.floor(Math.random() * 6) + 1;
        setResult(parseInt(`${firstRoll}${secondRoll}`));
      } else if (d === 'd6') {
        setResult(Math.floor(Math.random() * 6) + 1);
      }
      setIsRolling(false);
    };

    if (result) {
      setResult(null);
      setRolls(null);
      setIsRolling(true);
      setTimeout(getResult, 300);
    } else {
      setIsRolling(true);
      setTimeout(getResult, 300);
    }
  };

  return (
    <div className="rounded">
      <h3 className="mb-2 text-lg font-semibold text-stone-800 dark:text-slate-200">{title}</h3>
      <div className="flex items-center gap-3 flex-wrap">
        <button
          onClick={rollDice}
          disabled={isRolling}
          className="relative bg-gradient-to-r from-violet-700 to-violet-800 text-white px-3 py-2 h-[40px] rounded
                     hover:from-violet-800 hover:to-violet-900 transition-all duration-300
                     shadow-lg hover:shadow-xl
                     disabled:opacity-50 disabled:cursor-not-allowed
                     font-medium flex items-center gap-2"
        >
          <div className={`flex ${isRolling ? 'animate-bounce' : ''}`}>
            <Dice6 className={`inline-block ${isRolling ? 'animate-spin' : ''}`} size={20} />
            {d !== 'd6' && (
              <Dice6
                className={`inline-block -ml-1 ${isRolling ? 'animate-spin' : ''}`}
                size={20}
                style={{ animationDelay: '0.1s' }}
              />
            )}
          </div>
        </button>

        {result !== null && (
          <div className="animate-bounce-in">
            <div className="bg-gradient-to-br from-stone-700 to-stone-800 text-white px-2 py-1 rounded shadow-lg flex items-center justify-center min-w-[40px] h-[40px]">
              {rolls !== null ? (
                <p className="text-2xl font-bold">{rolls[0]} + {rolls[1]} = {result}</p>
              ) : (
                <p className="text-2xl font-bold">{result}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
