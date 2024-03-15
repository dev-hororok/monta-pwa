import create from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isLoggedIn: boolean;
  accountId: string;
  memberId: string;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
  expiresIn: number;
  authenticate: (
    accountId: string,
    tokens: {
      accessToken: string;
      refreshToken: string;
    },
    expiresIn: number
  ) => void;
  setMemberId: (memberId: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      memberId: '',
      accountId: '',
      tokens: {
        accessToken: '',
        refreshToken: '',
      },
      expiresIn: 0,
      authenticate: (accountId, tokens, expiresIn) => {
        set({ accountId, tokens, expiresIn, isLoggedIn: true });
      },
      setMemberId: (memberId) => {
        set({ memberId });
      },
      logout: () => {
        set({
          isLoggedIn: false,
          accountId: '',
          memberId: '',
          tokens: {
            accessToken: '',
            refreshToken: '',
          },
          expiresIn: 0,
        });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        memberId: state.memberId,
        accountId: state.accountId,
        tokens: state.tokens,
        expiresIn: state.expiresIn,
      }), // persist 할 상태 선택
    }
  )
);
