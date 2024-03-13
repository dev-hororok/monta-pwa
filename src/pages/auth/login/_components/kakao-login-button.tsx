import * as React from 'react';
import { toast } from 'sonner';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { BASE_URL, KAKAO_REST_API_KEY } from '@/constants/constants';
import { useKakaoLoginMutation } from '@/services/mutations/auth-mutations';

export const KakaoLoginButton = () => {
  const { mutateAsync: kakaoLogin } = useKakaoLoginMutation();

  const REDIRECT_URL = `${BASE_URL}/auth/login/callback/kakao`;
  const kakaoUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URL}&response_type=code`;
  const handleLogin = () => {
    const popupWindow = window.open(kakaoUrl, '_blank', 'width=500,height=600');
    if (popupWindow?.focus) popupWindow.focus();
  };

  React.useEffect(() => {
    const handleMessage = async (event: any) => {
      if (event.data.type === 'kakao-login') {
        const { code } = event.data;
        if (!code) {
          toast.error('문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
          return;
        }
        try {
          await kakaoLogin({ code });
          toast.success('로그인에 성공하였습니다.');
        } catch (e) {
          // react-query에서 처리됨
        }
      }
    };
    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [kakaoLogin]);

  return (
    <Button
      variant={'outline'}
      className="w-full h-12 gap-4 bg-[#FEE500] hover:bg-[#FEE500]"
      onClick={handleLogin}
    >
      <Icons.kakao className="w-6 h-6" />
      <p className="text-black">카카오 로그인</p>
    </Button>
  );
};
