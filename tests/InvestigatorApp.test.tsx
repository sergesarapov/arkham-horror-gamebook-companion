import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { InvestigatorApp } from '../src/InvestigatorApp';

const SLUG = 'abc12345';

const mockInvestigator = {
  id: '01KDZV0BFHFGG20NX3M9AK49WY',
  name: 'Roland Banks',
  willpower: 3,
  intellect: 3,
  combat: 4,
  health: 9,
  sanity: 5,
  resources: 5,
  clues: 0,
  doom: 0,
  startingItem: '.38 Revolver',
  otherItems: ['', '', ''],
  majorAbility: 'Combat specialist',
  otherAbilities: ['', '', ''],
  majorWeakness: 'Amnesia',
  otherWeaknesses: ['', '', ''],
};

const mockEntries = [
  { id: 1767722378356, text: '42', timestamp: '2026-01-06T17:59:38.356Z' },
  { id: 1767720895856, text: '17', timestamp: '2026-01-06T17:34:55.856Z' },
];

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
    get length() {
      return Object.keys(store).length;
    },
    key: (index: number) => Object.keys(store)[index] ?? null,
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock, writable: true });

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('InvestigatorApp', () => {
  beforeEach(() => {
    localStorageMock.clear();
    mockNavigate.mockClear();
    jest.clearAllMocks();

    localStorageMock.setItem(`arkgb-investigator-${SLUG}`, JSON.stringify(mockInvestigator));
    localStorageMock.setItem(`arkgb-entries-${SLUG}`, JSON.stringify(mockEntries));
  });

  const renderApp = () =>
    render(
      <MemoryRouter initialEntries={[`/investigator/${SLUG}`]}>
        <Routes>
          <Route path="/investigator/:slug" element={<InvestigatorApp />} />
        </Routes>
      </MemoryRouter>,
    );

  describe('Initial Rendering', () => {
    test('renders bookmark message with slug', () => {
      renderApp();
      expect(screen.getByText(/Bookmark this address/i)).toBeInTheDocument();
      expect(screen.getByText(SLUG)).toBeInTheDocument();
    });

    test('renders Home and Save Progress buttons', () => {
      renderApp();
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Save Progress')).toBeInTheDocument();
    });

    test('renders InvestigatorCard with Edit button', () => {
      renderApp();
      expect(screen.getByText('Edit')).toBeInTheDocument();
    });

    test('renders EntryTracker with input and Record button', () => {
      renderApp();
      expect(screen.getByPlaceholderText('e.g. 42')).toBeInTheDocument();
      expect(screen.getByText('Record')).toBeInTheDocument();
    });
  });

  describe('Data Loading', () => {
    test('loads investigator name from localStorage', () => {
      renderApp();
      expect(screen.getByText('Roland Banks')).toBeInTheDocument();
    });

    test('loads entries from localStorage', () => {
      renderApp();
      expect(screen.getByText('42')).toBeInTheDocument();
      expect(screen.getByText('17')).toBeInTheDocument();
    });

    test('shows "Unnamed Investigator" when no saved investigator', () => {
      localStorageMock.removeItem(`arkgb-investigator-${SLUG}`);
      renderApp();
      expect(screen.getByText('Unnamed Investigator')).toBeInTheDocument();
    });
  });

  describe('Navigation', () => {
    test('navigates to home when Home button is clicked', () => {
      renderApp();
      fireEvent.click(screen.getByText('Home'));
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  describe('InvestigatorCard Edit Mode', () => {
    test('enters edit mode when Edit button is clicked', () => {
      renderApp();
      fireEvent.click(screen.getByText('Edit'));
      expect(screen.getByText('Edit Investigator')).toBeInTheDocument();
    });

    test('exits edit mode when Save button is clicked', () => {
      renderApp();
      fireEvent.click(screen.getByText('Edit'));
      fireEvent.click(screen.getAllByText('Save')[0]);
      expect(screen.getByText('Edit')).toBeInTheDocument();
    });
  });

  describe('Entry Management', () => {
    test('adds a new entry when Record is clicked', async () => {
      renderApp();
      const input = screen.getByPlaceholderText('e.g. 42');
      fireEvent.change(input, { target: { value: '99' } });
      fireEvent.click(screen.getByText('Record'));

      await waitFor(() => {
        expect(screen.getByText('99')).toBeInTheDocument();
      });
    });

    test('clears input after adding entry', async () => {
      renderApp();
      const input = screen.getByPlaceholderText('e.g. 42') as HTMLInputElement;
      fireEvent.change(input, { target: { value: '55' } });
      fireEvent.click(screen.getByText('Record'));

      await waitFor(() => {
        expect(input.value).toBe('');
      });
    });

    test('does not add empty entry', () => {
      renderApp();
      const initialCount = JSON.parse(
        localStorageMock.getItem(`arkgb-entries-${SLUG}`) ?? '[]',
      ).length;
      fireEvent.click(screen.getByText('Record'));
      const finalCount = JSON.parse(
        localStorageMock.getItem(`arkgb-entries-${SLUG}`) ?? '[]',
      ).length;
      expect(finalCount).toBe(initialCount);
    });
  });

  describe('Save Progress', () => {
    test('creates a download with the correct filename', () => {
      renderApp();
      const mockCreateObjectURL = jest.fn(() => 'blob:mock-url');
      const mockRevokeObjectURL = jest.fn();
      const mockClick = jest.fn();
      const mockLink = { href: '', download: '', click: mockClick };

      global.URL.createObjectURL = mockCreateObjectURL;
      global.URL.revokeObjectURL = mockRevokeObjectURL;
      const createElementSpy = jest
        .spyOn(document, 'createElement')
        .mockReturnValueOnce(mockLink as any);

      fireEvent.click(screen.getByText('Save Progress'));

      expect(mockCreateObjectURL).toHaveBeenCalled();
      expect(mockLink.download).toBe(`arkgb-${SLUG}-backup.json`);
      expect(mockClick).toHaveBeenCalled();

      createElementSpy.mockRestore();
    });
  });

  describe('LocalStorage Persistence', () => {
    test('persists investigator data in localStorage', () => {
      renderApp();
      const saved = localStorageMock.getItem(`arkgb-investigator-${SLUG}`);
      expect(saved).toBeTruthy();
      expect(JSON.parse(saved!).name).toBe('Roland Banks');
    });

    test('persists entries in localStorage', () => {
      renderApp();
      const saved = localStorageMock.getItem(`arkgb-entries-${SLUG}`);
      expect(saved).toBeTruthy();
      expect(JSON.parse(saved!)).toHaveLength(2);
    });
  });
});
