import { useEffect } from 'react';

const KakaoLoginCallback = () => {
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    if (code) {
      window.opener.postMessage({ type: 'kakao-login', code }, '*');
    }
    window.close();
  }, []);

  return null;
};

export default KakaoLoginCallback;
