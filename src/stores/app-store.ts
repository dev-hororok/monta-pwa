import { create } from 'zustand';

interface AppStore {
  backButtonPressed: boolean;
  setBackButtonPressed: (pressed: boolean) => void;

  viewportWidth: number;
  viewportHeight: number;
  setViewportSize: (width: number, height: number) => void;
}

export const useAppStore = create<AppStore>()((set) => ({
  backButtonPressed: false,
  setBackButtonPressed: (pressed) => set({ backButtonPressed: pressed }),

  viewportWidth: window.innerWidth,
  viewportHeight: window.innerHeight,
  setViewportSize: (width, height) =>
    set({ viewportWidth: width, viewportHeight: height }),
}));
