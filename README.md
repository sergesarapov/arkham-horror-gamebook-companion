# ARKGB Companion

A web-based companion app for the **Arkham Horror Investigator Gamebooks** published by Fantasy Flight Games and Aconyte Books. Currently in **BETA**.

## Disclaimer

This companion app is unofficial and not affiliated with or endorsed by Fantasy Flight Games or Aconyte Books.

## Features

- **Investigator Sheet**: Track all core stats — Willpower, Intellect, Combat, Health, Sanity, Resources, Clues, and Doom
- **Items & Abilities**: Record your starting item, additional items, major ability, other abilities, major weakness, and other weaknesses
- **Dice Roller**: Roll d6, d66, 2d6, or 3d6 with animated floating dice
- **Persistent Storage**: Investigator state auto-saves to localStorage per unique slug
- **Save/Load**: Export and import an investigator as a JSON backup file
- **Dark Mode**: Toggle light/dark theme
- **Bookmarkable URLs**: Each investigator lives at a stable `/investigator/<slug>` URL

## Getting Started

### Prerequisites

- Node.js 18+
- Yarn (`npm install --global yarn`)

### Installation

```bash
git clone https://github.com/sergesarapov/arkham-horror-gamebook-companion.git
cd arkham-horror-gamebook-companion
yarn
yarn start
```

Open `http://localhost:3000` in your browser.

### Build

```bash
yarn build
```

### Tests

```bash
yarn test
```

## Tech Stack

- React 18 + TypeScript
- React Router
- Tailwind CSS
- Vercel (hosting + analytics)

## Contributing

Pull requests are welcome. Please open an issue first for larger changes.

## License

Open source.

---

Support the creators — buy the **Arkham Horror Investigator Gamebooks** from [fantasyflightgames.com](https://www.fantasyflightgames.com/).
