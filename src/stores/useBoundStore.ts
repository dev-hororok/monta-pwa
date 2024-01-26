import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { AuthSlice, createAuthSlice } from './authSlice';

export type StoreState = AuthSlice;

export const useBoundStore = create<StoreState>()(
  devtools(
    persist(
      (...data) => ({
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
