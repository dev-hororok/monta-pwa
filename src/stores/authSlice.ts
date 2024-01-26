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
    refreshToken: '',
  },
  expiresIn: 0,
  authenticate: (tokens, expiresIn) => {
    // localStorage.setItem('refreshToken', tokens.refreshToken);
    // localStorage.setItem('accessToken', tokens.accessToken);
    set(() => ({
      tokens,
      expiresIn,
    }));
  },
  logout: () => {
    // localStorage.setItem('accessToken', '');
    // localStorage.setItem('refreshToken', '');
    set(() => ({
      tokens: {
        accessToken: '',
        refreshToken: '',
      },
      expiresIn: 0,
    }));
  },
});
