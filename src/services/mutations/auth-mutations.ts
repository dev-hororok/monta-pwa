import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  checkForgotPasswordCode,
  deleteAccount,
  emailLogin,
  emailRegister,
  googleLogin,
  kakaoLogin,
  naverLogin,
  resetPassword,
  sendCheckEmail,
  sendForgotPasswordCodeEmail,
} from '../apis/auth.api';
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

// 이메일 확인 메일 발송
export const useSendCheckEmailMutation = () => {
  return useMutation({
    mutationFn: (data: { email: string }) => {
      return sendCheckEmail(data);
    },
  });
};

// 이메일 회원가입
export const useEmailRegisterMutation = () => {
  return useMutation({
    mutationFn: (data: { email: string; password: string; code: string }) => {
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

// 패스워드 분실 코드 메일 발송
export const useForgotPasswordCodeEmailMutation = () => {
  return useMutation({
    mutationFn: (data: { email: string }) => {
      return sendForgotPasswordCodeEmail(data);
    },
  });
};

// 패스워드 분실 코드 메일 발송
export const useCheckForgotPasswordMutation = () => {
  return useMutation({
    mutationFn: (data: { email: string; code: string }) => {
      return checkForgotPasswordCode(data);
    },
  });
};

// 패스워드 변경
export const useResetPasswordMutation = () => {
  return useMutation({
    mutationFn: (data: { hash: string; password: string }) => {
      return resetPassword(data);
    },
  });
};

// 카카오 oauth
export const useKakaoLoginMutation = () => {
  return useMutation({
    mutationFn: (data: { code: string }) => {
      return kakaoLogin(data);
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

// 구글 oauth
export const useGoogleLoginMutation = () => {
  return useMutation({
    mutationFn: (data: { code: string }) => {
      return googleLogin(data);
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

// 네이버 oauth
export const useNaverLoginMutation = () => {
  return useMutation({
    mutationFn: (data: { code: string }) => {
      return naverLogin(data);
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
