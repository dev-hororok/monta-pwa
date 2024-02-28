import { useGoogleLogin } from '@react-oauth/google';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { BASE_URL } from '@/constants/constants';

export const GoogleLoginButton = () => {
  const handleLogin = useGoogleLogin({
    flow: 'auth-code',
    ux_mode: 'redirect',
    redirect_uri: `${BASE_URL}/auth/login/callback/google`,
  });
  return (
    <Button
      variant={'outline'}
      className="w-full h-12 gap-4 bg-white dark:bg-white hover:bg-accent"
      onClick={() => handleLogin()}
    >
      <Icons.google className="w-6 h-6 fill-foreground" />
      <p className="text-black">구글 로그인</p>
    </Button>
  );
};
