import { KakaoLoginButton } from './kakao-login-button';
import { GoogleLoginButton } from './google-login-button';
import { NaverLoginButton } from './naver-login.button';

export const OAuthLoginList = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <GoogleLoginButton />
      <KakaoLoginButton />
      <NaverLoginButton />
    </div>
  );
};
