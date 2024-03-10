import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { BASE_URL, KAKAO_REST_API_KEY } from '@/constants/constants';

export const KakaoLoginButton = () => {
  const REDIRECT_URL = `${BASE_URL}/auth/login/callback/kakao`;
  const kakaoUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URL}&response_type=code`;
  const handleLogin = () => {
    window.location.href = kakaoUrl;
  };

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
