import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { InvestigatorApp } from './InvestigatorApp';
import { Home } from './Home';
import { DarkModeToggle } from './components/DarkModeToggle';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';

const App: React.FC = () => {
  return (
    <div className="min-h-[100vh] flex flex-col justify-between relative bg-stone-50 dark:bg-[#0c0c10] dark:text-white max-w-screen-lg mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          ARKGB
          <span className="text-xs font-semibold bg-red-100 text-red-900 dark:bg-red-900/40 dark:text-red-300 px-2 py-0.5 rounded-full">
            BETA
          </span>
        </h1>
        <DarkModeToggle />
      </div>
      <Routes>
        <Route path="/investigator/:slug" element={<InvestigatorApp />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <footer className="dark:bg-zinc-900 bg-stone-200/80 mt-8 py-4 px-6 text-center">
        <p className="text-sm dark:text-slate-400 text-stone-600">
          Arkham Horror Investigator Gamebooks is published by Fantasy Flight Games and Aconyte
          Books.
          <br />
          <a
            href="https://www.fantasyflightgames.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-rose-700 hover:underline"
          >
            fantasyflightgames.com
          </a>
          {' · '}
          <a
            href="https://aconytebooks.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-rose-700 hover:underline"
          >
            aconytebooks.com
          </a>
        </p>
        <p className="text-sm dark:text-slate-400 text-stone-600 mt-2">
          This companion app is not part of the official Arkham Horror Investigator Gamebooks and is
          not affiliated with or endorsed by Fantasy Flight Games or Aconyte Books.
        </p>
        <p className="text-sm dark:text-slate-400 text-stone-600 mt-2">
          <a
            href="https://buymeacoffee.com/sergesarapov"
            target="_blank"
            rel="noopener noreferrer"
            className="text-rose-700 hover:underline"
          >
            Support the developer
          </a>
        </p>
      </footer>
    </div>
  );
};

const AppWrapper: React.FC = () => (
  <Router>
    <App />
    <SpeedInsights />
    <Analytics />
  </Router>
);

export default AppWrapper;
