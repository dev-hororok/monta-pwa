import { useGoogleLogin } from '@react-oauth/google';
import { Icons } from '../icons';
import { Button } from '../ui/button';
import axios from 'axios';
import { useAuthStore } from '@/stores/auth-store';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { API_URL_NEST } from '@/constants/constants';

export const OAuthList = () => {
  const navigate = useNavigate();
  const googleSocialLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (data) => {
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
    },
    onError: () => {
      toast.success('로그인에 실패하였습니다.');
    },
  });
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Button
        variant={'outline'}
        className="w-full h-12 gap-4"
        onClick={() => googleSocialLogin()}
      >
        <Icons.google className="w-6 h-6" />
        <p>구글 로그인</p>
      </Button>
    </div>
  );
};
