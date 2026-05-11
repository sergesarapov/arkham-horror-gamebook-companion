import { Investigator } from './types';

export type PregenTemplate = Omit<Investigator, 'id'>;

export const PREGENS: Record<string, PregenTemplate> = {
  nathaniel_cho: {
    name: 'Nathaniel Cho',
    willpower: 3,
    intellect: 2,
    combat: 5,
    health: 9,
    sanity: 6,
    resources: 0,
    clues: 0,
    doom: 0,
    startingItem:
      'HIDDEN WEAPON – Once per adventure, you may add +3 to your COMBAT.',
    otherItems: ['', '', ''],
    majorAbility:
      'BOXER – If you roll a 6 while using your COMBAT, add +1 to your total score. (If you are rolling more than one dice, add +1 for each 6 you roll.)',
    otherAbilities: ['Guardian', 'Fighter', 'Tough'],
    majorWeakness:
      'HUNTED BY THE MOB – Each time you gain a RESOURCE, roll a die. If the score is below your current number of RESOURCE, do not gain a RESOURCE.',
    otherWeaknesses: ['Criminal', '', ''],
    secrets: ['', '', ''],
  },
  rex_murphy: {
    name: 'Rex Murphy',
    willpower: 3,
    intellect: 4,
    combat: 2,
    health: 6,
    sanity: 9,
    resources: 0,
    clues: 1,
    doom: 0,
    startingItem: "REPORTER'S NOTEBOOK – You begin with +1 CLUE.",
    otherItems: ['', '', ''],
    majorAbility:
      'REPORTER – If you roll a 6 while using your INTELLECT, gain +1 CLUE.',
    otherAbilities: ['Seeker', '', ''],
    majorWeakness:
      "REX'S CURSE – If you roll a double when using your INTELLECT or WILLPOWER, treat the score on each dice as a 1.",
    otherWeaknesses: ['Cursed', '', ''],
    secrets: ['', '', ''],
  },
  kohaku_narukami: {
    name: 'Kōhaku Narukami',
    willpower: 4,
    intellect: 4,
    combat: 3,
    health: 6,
    sanity: 8,
    resources: 0,
    clues: 0,
    doom: 0,
    startingItem:
      'THE BOOK OF LIVING MYTHS – Once per adventure, you may substitute your INTELLECT for your COMBAT in any given fight.',
    otherItems: ['', '', ''],
    majorAbility:
      'BLESSED, CURSED – For WILLPOWER tests, you may roll 2 dice instead of 1, and select one of the die of your choosing. However, if the dice roll results in a double, you automatically fail and gain 1 DOOM.',
    otherAbilities: ['Mystic', 'Academic', 'Arcane Studies'],
    majorWeakness:
      'WEEPING YŪREI – When you fail a WILLPOWER test, roll a die and add your COMBAT. If the total sum is equal to or less than the current DOOM, lose 1 HEALTH.',
    otherWeaknesses: ['Cursed', 'Haunted', ''],
    secrets: ['', '', ''],
  },
  marion_tavares: {
    name: 'Marion Tavares',
    willpower: 2,
    intellect: 3,
    combat: 4,
    health: 8,
    sanity: 6,
    resources: 0,
    clues: 0,
    doom: 0,
    startingItem: 'STRONG ROPE – Once per adventure, you may add +3 to your WILLPOWER.',
    otherItems: ['', '', ''],
    majorAbility:
      'DETERMINED – When using COMBAT, if you win a round, add an additional +1 COMBAT to the next round.',
    otherAbilities: ['Guardian', 'Fighter', 'Tough'],
    majorWeakness:
      "I'LL DO IT MYSELF – Each time you lose SANITY or HEALTH roll a die. If the score is below your current SANITY or HEALTH (as appropriate), gain +1 DOOM. If you lose SANITY and HEALTH at the same time, choose one to apply the effect (your choice).",
    otherWeaknesses: ['', '', ''],
    secrets: ['', '', ''],
  },
  silas_marsh: {
    name: 'Silas Marsh',
    willpower: 5,
    intellect: 2,
    combat: 2,
    health: 2,
    sanity: 2,
    resources: 0,
    clues: 0,
    doom: 0,
    startingItem:
      "SAILOR'S NET – Once per adventure, while using COMBAT, you may immediately cancel the first dice roll and roll the dice again.",
    otherItems: ['', '', ''],
    majorAbility:
      'DRIFTER – Whenever you spend a RESOURCE as part of a test, if the test is successful, gain 1 RESOURCE.',
    otherAbilities: ['Survivor', 'Sailor', 'Tough'],
    majorWeakness:
      "SIREN'S CALL – Each time you gain DOOM, spend a RESOURCE. Otherwise, gain 1 additional DOOM.",
    otherWeaknesses: ['Tainted Lineage', '', ''],
    secrets: ['', '', ''],
  },
  skids_otoole: {
    name: "Skids O'Toole",
    willpower: 2,
    intellect: 3,
    combat: 3,
    health: 8,
    sanity: 6,
    resources: 0,
    clues: 0,
    doom: 0,
    startingItem:
      '.45 AUTOMATIC – Start with 6 ammo. When a test allows you to spend a RESOURCE to add to your COMBAT, you may spend 1 ammo, instead.',
    otherItems: ['', '', ''],
    majorAbility:
      'EX-CON – You may spend 1 RESOURCE to attempt any failed test again. Repeat the test using the same number of dice you used the first time and counting any other modifiers the same. You can only repeat each failed test once.',
    otherAbilities: ['Rogue', '', ''],
    majorWeakness:
      'HOSPITAL DEBTS – When you spend a RESOURCE, lose one additional RESOURCE (if you have one).',
    otherWeaknesses: ['Criminal', '', ''],
    secrets: ['', '', ''],
  },
  sister_mary: {
    name: 'Sister Mary',
    willpower: 4,
    intellect: 2,
    combat: 3,
    health: 5,
    sanity: 9,
    resources: 0,
    clues: 0,
    doom: 0,
    startingItem:
      'ROSARY BEADS – Once per adventure, add 2 to your WILLPOWER and remove 1 DOOM.',
    otherItems: ['', '', ''],
    majorAbility:
      'GUARDIAN ANGEL – Once per adventure, when you would lose HEALTH, gain +1 HEALTH, instead.',
    otherAbilities: ['Guardian', 'Arcane Studies', 'Studious'],
    majorWeakness:
      'CRISIS OF FAITH – Each time you gain DOOM, roll 1 die. If you roll a 4 or higher, spend 2 RESOURCES or lose 1 SANITY.',
    otherWeaknesses: ['Watched', 'Paranoid', ''],
    secrets: ['', '', ''],
  },
  george_barnaby: {
    name: 'George Barnaby',
    willpower: 2,
    intellect: 4,
    combat: 3,
    health: 7,
    sanity: 7,
    resources: 0,
    clues: 0,
    doom: 0,
    startingItem:
      'WALLET OF WEALTH – At any time, you may spend 2 RESOURCES to gain 1 CLUE.',
    otherItems: ['', '', ''],
    majorAbility:
      'KNOWLEDGE OF POWER – Each time you gain 1 RESOURCE, gain 2 RESOURCES, instead.',
    otherAbilities: ['Survivor', 'Civic', 'Drifter'],
    majorWeakness:
      'CAST ADRIFT – If you spend a RESOURCE during a Skill test, and the Skill test is not successful, lose 3 RESOURCE.',
    otherWeaknesses: ['Grief', 'Criminal', ''],
    secrets: ['', '', ''],
  },
  amanda_sharpe: {
    name: 'Amanda Sharpe',
    willpower: 2,
    intellect: 2,
    combat: 2,
    health: 7,
    sanity: 7,
    resources: 0,
    clues: 2,
    doom: 0,
    startingItem: 'OBSCURE TOME – You begin the adventure with 2 CLUES.',
    otherItems: ['', '', ''],
    majorAbility:
      'SCHOLAR – Whenever you spend a CLUE or RESOURCE as part of a test, if the test is successful, gain 1 CLUE or 1 RESOURCE (your choice).',
    otherAbilities: ['Seeker', 'Academic', 'Arcane Studies'],
    majorWeakness:
      'WHISPERS OF THE DEEP – Whenever you lose SANITY, also lose 1 RESOURCE or 1 CLUE (your choice).',
    otherWeaknesses: ['Troubled Dreams', '', ''],
    secrets: ['', '', ''],
  },
  stella_clark: {
    name: 'Stella Clark',
    willpower: 3,
    intellect: 2,
    combat: 3,
    health: 8,
    sanity: 8,
    resources: 0,
    clues: 0,
    doom: 0,
    startingItem:
      'MAILBAG – Whenever you gain an ITEM, if you do not already gain 1 RESOURCE, gain 1 RESOURCE.',
    otherItems: ['', '', ''],
    majorAbility:
      'NOR GLOOM OF NIGHT – When you roll less than the required score in any test using your WILLPOWER, choose to gain 1 RESOURCE, 1 HEALTH or 1 SANITY. You may not increase your HEALTH or SANITY above their starting level using this ability.',
    otherAbilities: ['Survivor', 'Tough', 'Civic'],
    majorWeakness:
      'CALLED BY THE MISTS – Whenever you lose SANITY, roll one dice. (If you are in Kingsport, roll two dice and pick the highest.) If the score is higher than your current SANITY, lose 1 RESOURCE.',
    otherWeaknesses: ['Haunted', '', ''],
    secrets: ['', '', ''],
  },
  lola_hayes: {
    name: 'Lola Hayes',
    willpower: 3,
    intellect: 3,
    combat: 3,
    health: 6,
    sanity: 6,
    resources: 0,
    clues: 0,
    doom: 0,
    startingItem:
      'CALLING CARD – Once per adventure, choose to gain an ABILITY mentioned in the entry of your choosing, if you do not already have it. You may keep this ABILITY for the remainder of your adventure.',
    otherItems: ['', '', ''],
    majorAbility:
      'IMPROVISATION – Once per adventure, you may increase a SKILL of your choice by +1 but you must also decrease a SKILL by -1. You may use this ABILITY more than once per adventure, but after the first time, you must spend +1 RESOURCE for each additional use.',
    otherAbilities: ['Guardian', 'Quick-Witted', ''],
    majorWeakness:
      'CRISIS OF IDENTITY – Each time you spend a RESOURCE, roll 1 dice. If you roll a 1, lose 1 SANITY.',
    otherWeaknesses: ['Haunted', 'Cursed', 'Cautious'],
    secrets: ['', '', ''],
  },
  lucius_galloway: {
    name: 'Lucius Galloway',
    willpower: 2,
    intellect: 4,
    combat: 1,
    health: 8,
    sanity: 6,
    resources: 0,
    clues: 0,
    doom: 0,
    startingItem:
      'BOOK OF VERSE – You may spend RESOURCES as if they were CLUES when using your INTELLECT.',
    otherItems: ['', '', ''],
    majorAbility:
      'POET – Whenever you spend a CLUE as part of a test, if the test is successful, gain 1 CLUE.',
    otherAbilities: ['Seeker', 'Academic', 'Ancient Languages'],
    majorWeakness:
      'DREAMS OF THE FLOOD – Each time you gain a CLUE, roll 1 dice. If the number is lower than your current number of CLUES, do not take a CLUE.',
    otherWeaknesses: ['Troubled Dreams', '', ''],
    secrets: ['', '', ''],
  },
  jacqueline_fine: {
    name: 'Jacqueline Fine',
    willpower: 5,
    intellect: 3,
    combat: 2,
    health: 6,
    sanity: 9,
    resources: 1,
    clues: 1,
    doom: 0,
    startingItem:
      'DREAM JOURNAL – You begin each adventure with +1 CLUE and +1 RESOURCE.',
    otherItems: ['', '', ''],
    majorAbility:
      'CLAIRVOYANT – For INTELLECT tests, you may roll 2 dice instead of 1 and select the dice of your choosing.',
    otherAbilities: ['Mystic', 'Agile', ''],
    majorWeakness:
      'DARK FUTURE – If you roll a double during a test, gain +1 DOOM and the test is automatically unsuccessful.',
    otherWeaknesses: ['Troubled Dreams', 'Paranoia', ''],
    secrets: ['', '', ''],
  },
  agnes_baker: {
    name: 'Agnes Baker',
    willpower: 5,
    intellect: 2,
    combat: 2,
    health: 6,
    sanity: 8,
    resources: 0,
    clues: 0,
    doom: 0,
    startingItem:
      'HEIRLOOM OF HYPERBOREA – If you succeed in a test using your WILLPOWER, gain +1 RESOURCE.',
    otherItems: ['', '', ''],
    majorAbility:
      'SORCERER – Once per adventure, you may use your WILLPOWER instead of your COMBAT in a fight or test.',
    otherAbilities: ['Mystic', 'Sorcery', 'Arcane Studies'],
    majorWeakness:
      'DARK MEMORIES – Each time you spend a CLUE, roll a dice. On a roll of a 1, Agnes loses -1 SANITY.',
    otherWeaknesses: ['Haunted', '', ''],
    secrets: ['', '', ''],
  },
};
