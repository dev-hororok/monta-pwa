import memberService from '@/apis/services/memberService';
import { IMember } from '@/models/member.model';
import { StateCreator } from 'zustand';

export interface MemberSlice {
  member: IMember | null;
  setMember: (member: IMember | null) => void;
  fetchCurrentMember: () => Promise<void>;
}

export const createMemberSlice: StateCreator<MemberSlice> = (set) => ({
  member: null,
  setMember: (member: IMember | null) => {
    set({ member: member });
  },
  fetchCurrentMember: async () => {
    try {
      const response = await memberService.getCurrentMember();
      if (response.success) {
        // Member 정보가 있다면 스토어에 저장
        set({ member: response.data });
      }
    } catch (error) {
      console.error('Error fetching current member data:', error);
    }
  },
});
