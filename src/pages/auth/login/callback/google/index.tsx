import { useEffect } from 'react';

const GoogleLoginCallback = () => {
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    if (code) {
      window.opener.postMessage({ type: 'google-login', code }, '*');
    }
    window.close();
  }, []);

  return null;
};

export default GoogleLoginCallback;
