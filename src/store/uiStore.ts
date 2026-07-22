import { create } from 'zustand';

interface UIStore {
  isDarkMode: boolean;
  isSearchOpen: boolean;
  isAuthModalOpen: boolean;
  authModalTab: 'login' | 'signup';
  isLoading: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (val: boolean) => void;
  openSearch: () => void;
  closeSearch: () => void;
  openAuthModal: (tab?: 'login' | 'signup') => void;
  closeAuthModal: () => void;
  setLoading: (val: boolean) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isDarkMode: false,
  isSearchOpen: false,
  isAuthModalOpen: false,
  authModalTab: 'login',
  isLoading: false,

  toggleDarkMode: () =>
    set((s) => {
      const newMode = !s.isDarkMode;
      if (typeof document !== 'undefined') {
        document.documentElement.classList.toggle('dark', newMode);
        localStorage.setItem('theme', newMode ? 'dark' : 'light');
      }
      return { isDarkMode: newMode };
    }),

  setDarkMode: (val) =>
    set(() => {
      if (typeof document !== 'undefined') {
        document.documentElement.classList.toggle('dark', val);
      }
      return { isDarkMode: val };
    }),

  openSearch: () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false }),
  openAuthModal: (tab = 'login') =>
    set({ isAuthModalOpen: true, authModalTab: tab }),
  closeAuthModal: () => set({ isAuthModalOpen: false }),
  setLoading: (val) => set({ isLoading: val }),
}));
