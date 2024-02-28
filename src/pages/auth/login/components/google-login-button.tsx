import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { handleApiError } from '@/apis/common/api-error-handler';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { API_URL_NEST } from '@/constants/constants';
import { useAuthStore } from '@/stores/auth-store';

export const GoogleLoginButton = () => {
  const navigate = useNavigate();
  const googleSocialLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (data) => {
      try {
        const response = await axios.post(
          `${API_URL_NEST}/timer-api/auth/google/login`,
          { code: data.code }
        );
        useAuthStore.getState().authenticate(
          {
            accessToken: response.data.data.access_token,
            refreshToken: response.data.data.refresh_token,
          },
          response.data.data.expires_in
        );

        toast.success('로그인에 성공하였습니다.');
        navigate('/');
      } catch (e) {
        const result = handleApiError(e);
        toast.error(result.error);
      }
    },
    onError: () => {
      toast.success('로그인에 실패하였습니다.');
    },
  });
  return (
    <Button
      variant={'outline'}
      className="w-full h-12 gap-4 bg-white dark:bg-white hover:bg-accent"
      onClick={() => googleSocialLogin()}
    >
      <Icons.google className="w-6 h-6 fill-foreground" />
      <p className="text-black">구글 로그인</p>
    </Button>
  );
};
