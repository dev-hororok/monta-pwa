import * as React from 'react';
import { toast } from 'sonner';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { useGoogleLoginMutation } from '@/services/mutations/auth-mutations';
import { BASE_URL, GOOGLE_CLIENT_ID } from '@/constants/constants';

export const GoogleLoginButton = () => {
  const { mutateAsync: googleLogin } = useGoogleLoginMutation();

  const REDIRECT_URL = `${BASE_URL}/auth/login/callback/google`;
  const googleUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=code&scope=openid%20profile%20email`;
  const handleLogin = () => {
    const popupWindow = window.open(
      googleUrl,
      '_blank',
      'width=500,height=600'
    );
    if (popupWindow?.focus) popupWindow.focus();
  };

  React.useEffect(() => {
    const handleMessage = async (event: any) => {
      if (event.data.type === 'google-login') {
        const { code } = event.data;
        if (!code) {
          toast.error('문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
          return;
        }
        try {
          await googleLogin({ code });
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
  }, [googleLogin]);

  return (
    <Button
      variant={'outline'}
      className="w-full h-12 gap-4 bg-white dark:bg-white hover:bg-white"
      onClick={handleLogin}
    >
      <Icons.google className="w-6 h-6 fill-foreground" />
      <p className="text-black">구글 로그인</p>
    </Button>
  );
};
