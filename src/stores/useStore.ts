import { create } from 'zustand';
import { MemberSlice, createMemberSlice } from './memberSlice';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export type StoreState = MemberSlice;

export const useStore = create<StoreState>()(
  devtools(
    persist(
      immer((...data) => ({
        ...createMemberSlice(...data),
      })),
      {
        name: 'bound-store',
      }
    )
  )
);

export default useStore;
