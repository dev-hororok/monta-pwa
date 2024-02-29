import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { BASE_URL, NAVER_CLIENT_ID } from '@/constants/constants';

export const NaverLoginButton = () => {
  const REDIRECT_URL = `${BASE_URL}/auth/login/callback/naver`;
  const naverUrl = `https://nid.naver.com/oauth2.0/authorize?client_id=${NAVER_CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=code&state=false`;
  const handleLogin = () => {
    window.location.href = naverUrl;
  };

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
