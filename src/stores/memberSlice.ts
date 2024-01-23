import { IMember } from '@/models/member.model';
import { StateCreator } from 'zustand';

export interface MemberSlice {
  member: IMember | null;
  setMember: (member: IMember) => void;
}

export const createMemberSlice: StateCreator<MemberSlice> = (set) => ({
  member: null,
  setMember: (member: IMember) => {
    set({ member: member });
  },
});
