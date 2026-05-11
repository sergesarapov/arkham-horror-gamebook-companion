export interface Investigator {
  id: string;
  name: string;
  willpower: number;
  intellect: number;
  combat: number;
  health: number;
  sanity: number;
  resources: number;
  clues: number;
  doom: number;
  startingItem: string;
  otherItems: [string, string, string];
  majorAbility: string;
  otherAbilities: [string, string, string];
  majorWeakness: string;
  otherWeaknesses: [string, string, string];
  secrets: [string, string, string];
}

export interface LogEntryType {
  id: number;
  text: string;
  timestamp: string;
}

export interface LocalStorageValue {
  key: string;
  value: string;
}

export type DiceType = 'd6' | 'd66' | '2d6' | '3d6';
