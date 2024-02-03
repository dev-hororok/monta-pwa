import { TimerOptionSlice, createTimerOptionSlice } from './timerOptionSlice';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { AuthSlice, createAuthSlice } from './authSlice';
import { AppSlice, createAppSlice } from './appSlice';
import { TimerSlice, createTimerSlice } from './timerSlice';

export type StoreState = AppSlice & AuthSlice & TimerOptionSlice & TimerSlice;

export const useBoundStore = create<StoreState>()(
  devtools(
    persist(
      (...data) => ({
        ...createAppSlice(...data),
        ...createTimerOptionSlice(...data),
        ...createAuthSlice(...data),
        ...createTimerSlice(...data),
      }),
      {
        name: 'bound-store',
        partialize: (state) => ({
          tokens: state.tokens,
          expiresIn: state.expiresIn,
          selectedCategory: state.selectedCategory,
          initialTime: state.initialTime,
        }),
      }
    )
  )
);

export default useBoundStore;
