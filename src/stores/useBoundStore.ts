import { create } from 'zustand';
import { MemberSlice, createMemberSlice } from './memberSlice';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { AuthSlice, createAuthSlice } from './authSlice';

export type StoreState = MemberSlice & AuthSlice;

export const useBoundStore = create<StoreState>()(
  devtools(
    persist(
      immer((...data) => ({
        ...createMemberSlice(...data),
        ...createAuthSlice(...data),
      })),
      {
        name: 'bound-store',
        partialize: (state) => ({ bears: state.member }),
      }
    )
  )
);

export default useBoundStore;
