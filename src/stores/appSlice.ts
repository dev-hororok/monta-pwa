import { StateCreator } from 'zustand';

export interface AppSlice {
  backButtonPressed: boolean;
  setBackButtonPressed: (pressed: boolean) => void;
}

export const createAppSlice: StateCreator<AppSlice> = (set) => ({
  backButtonPressed: false,
  setBackButtonPressed: (pressed: boolean) =>
    set(() => ({ backButtonPressed: pressed })),
});
