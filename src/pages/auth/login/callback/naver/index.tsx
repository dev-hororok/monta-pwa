import { useEffect } from 'react';

const NaverLoginCallback = () => {
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    if (code) {
      window.opener.postMessage({ type: 'naver-login', code }, '*');
    }
    window.close();
  }, []);

  return null;
};

export default NaverLoginCallback;
