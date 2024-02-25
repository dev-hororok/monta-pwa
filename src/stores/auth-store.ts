import create from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
  expiresIn: number;
  authenticate: (
    tokens: {
      accessToken: string;
      refreshToken: string;
    },
    expiresIn: number
  ) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      tokens: {
        accessToken: '',
        refreshToken: '',
      },
      expiresIn: 0,
      authenticate: (tokens, expiresIn) => {
        set({
          tokens,
          expiresIn,
        });
      },
      logout: () => {
        set({
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
        tokens: state.tokens,
        expiresIn: state.expiresIn,
      }), // persist 할 상태 선택
    }
  )
);
