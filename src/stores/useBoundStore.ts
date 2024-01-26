import { create } from 'zustand';
import { MemberSlice, createMemberSlice } from './memberSlice';
import { devtools, persist } from 'zustand/middleware';
import { AuthSlice, createAuthSlice } from './authSlice';

export type StoreState = MemberSlice & AuthSlice;

export const useBoundStore = create<StoreState>()(
  devtools(
    persist(
      (...data) => ({
        ...createMemberSlice(...data),
        ...createAuthSlice(...data),
      }),
      {
        name: 'bound-store',
        partialize: (state) => ({
          member: state.member,
          tokens: state.tokens,
          expiresIn: state.expiresIn,
        }),
      }
    )
  )
);

export default useBoundStore;
