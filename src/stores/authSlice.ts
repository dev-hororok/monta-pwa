import { StateCreator } from 'zustand';

export interface AuthSlice {
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

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  tokens: {
    accessToken: '',
    refreshToken: localStorage.getItem('refreshToken') || '',
  },
  expiresIn: 0,
  authenticate: (tokens, expiresIn) => {
    localStorage.setItem('refreshToken', tokens.refreshToken);
    set(() => ({
      tokens,
      expiresIn,
    }));
  },
  logout: () => {
    localStorage.setItem('refreshToken', '');
    set(() => ({
      tokens: {
        accessToken: '',
        refreshToken: '',
      },
      tokenExpiry: 0,
    }));
  },
});
