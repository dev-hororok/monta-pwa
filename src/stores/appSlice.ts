import { StateCreator } from 'zustand';

export interface AppSlice {
  backButtonPressed: boolean;
  setBackButtonPressed: (pressed: boolean) => void;

  viewportWidth: number;
  viewportHeight: number;
  setViewportSize: (width: number, height: number) => void;
}

export const createAppSlice: StateCreator<AppSlice> = (set) => ({
  backButtonPressed: false,
  setBackButtonPressed: (pressed: boolean) =>
    set(() => ({ backButtonPressed: pressed })),
  viewportWidth: window.innerWidth,
  viewportHeight: window.innerHeight,
  setViewportSize: (width, height) =>
    set({ viewportWidth: width, viewportHeight: height }),
});
