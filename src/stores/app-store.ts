import { create } from 'zustand';

interface AppStore {
  viewportWidth: number;
  viewportHeight: number;
  setViewportSize: (width: number, height: number) => void;
}

export const useAppStore = create<AppStore>()((set) => ({
  viewportWidth: window.innerWidth,
  viewportHeight: window.innerHeight,
  setViewportSize: (width, height) =>
    set({ viewportWidth: width, viewportHeight: height }),
}));
