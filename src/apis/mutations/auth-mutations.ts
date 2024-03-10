import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteAccount, emailLogin, emailRegister } from '../services/auth.api';
import { useAuthStore } from '@/stores/auth-store';

// 이메일 로그인
export const useEmailLoginMutation = () => {
  return useMutation({
    mutationFn: (data: { email: string; password: string }) => {
      return emailLogin(data);
    },

    onSuccess: async (data) => {
      useAuthStore.getState().authenticate(
        data.account.account_id,
        {
          accessToken: data.access_token,
          refreshToken: data.refresh_token,
        },
        data.expires_in
      );
    },
  });
};

// 이메일 회원가입
export const useEmailRegisterMutation = () => {
  return useMutation({
    mutationFn: (data: { email: string; password: string }) => {
      return emailRegister(data);
    },

    onSuccess: async (data) => {
      useAuthStore.getState().authenticate(
        data.account.account_id,
        {
          accessToken: data.access_token,
          refreshToken: data.refresh_token,
        },
        data.expires_in
      );
    },
  });
};

// 계정 탈퇴
export const useDeleteAccountMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      return deleteAccount();
    },

    onSuccess: async () => {
      queryClient.clear();
      useAuthStore.getState().logout();
    },
  });
};
