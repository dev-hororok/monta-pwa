import * as React from 'react';
import { toast } from 'sonner';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { BASE_URL, NAVER_CLIENT_ID } from '@/constants/constants';
import { useNaverLoginMutation } from '@/services/mutations/auth-mutations';

export const NaverLoginButton = () => {
  const { mutateAsync: naverLogin } = useNaverLoginMutation();

  const REDIRECT_URL = `${BASE_URL}/auth/login/callback/naver`;
  const naverUrl = `https://nid.naver.com/oauth2.0/authorize?client_id=${NAVER_CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=code&state=false`;
  const handleLogin = () => {
    const popupWindow = window.open(naverUrl, '_blank', 'width=500,height=600');
    if (popupWindow?.focus) popupWindow.focus();
  };

  React.useEffect(() => {
    const handleMessage = async (event: any) => {
      if (event.data.type === 'naver-login') {
        const { code } = event.data;
        if (!code) {
          toast.error('문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
          return;
        }
        try {
          await naverLogin({ code });
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
  }, [naverLogin]);

  return (
    <Button
      variant={'outline'}
      className="w-full h-12 gap-4 bg-[#03C75A] hover:bg-[#03C75A]"
      onClick={handleLogin}
    >
      <Icons.naver className="w-6 h-6" />
      <p className="text-white">네이버 로그인</p>
    </Button>
  );
};
