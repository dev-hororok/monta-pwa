import { KakaoLoginButton } from './kakao-login-button';
import { GoogleLoginButton } from './google-login-button';

export const OAuthLoginList = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <GoogleLoginButton />
      <KakaoLoginButton />
    </div>
  );
};
