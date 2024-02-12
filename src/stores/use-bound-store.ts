import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { AuthSlice, createAuthSlice } from './authSlice';
import { AppSlice, createAppSlice } from './appSlice';

export type StoreState = AppSlice & AuthSlice;

export const useBoundStore = create<StoreState>()(
  devtools(
    persist(
      (...data) => ({
        ...createAppSlice(...data),
        ...createAuthSlice(...data),
      }),
      {
        name: 'bound-store',
        partialize: (state) => ({
          tokens: state.tokens,
          expiresIn: state.expiresIn,
        }),
      }
    )
  )
);

export default useBoundStore;
