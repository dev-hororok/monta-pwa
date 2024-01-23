import { IMember } from '@/models/member.model';
import { StateCreator } from 'zustand';

export interface MemberSlice {
  member: IMember | null;
  egg_inventory: null;
  streak: null;
}
const INITIAL_STATE: MemberSlice = {
  member: null,
  egg_inventory: null,
  streak: null,
};

export const createMemberSlice: StateCreator<MemberSlice> = () => ({
  member: INITIAL_STATE.member,
  egg_inventory: INITIAL_STATE.egg_inventory,
  streak: INITIAL_STATE.streak,
});
