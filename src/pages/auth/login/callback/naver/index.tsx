import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { useNaverLoginMutation } from '@/services/mutations/auth-mutations';

const NaverLoginCallback = () => {
  const { mutateAsync: naverLogin } = useNaverLoginMutation();
  const navigate = useNavigate();
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    if (!code) {
      navigate('/auth/login');
      return;
    }
    const fetch = async () => {
      try {
        await naverLogin({ code });
        toast.success('로그인에 성공하였습니다.');
      } catch (e) {
        // react-query에서 처리됨
        navigate('/auth/login');
      }
    };
    fetch();
  }, [navigate, naverLogin]);

  return null;
};

export default NaverLoginCallback;
