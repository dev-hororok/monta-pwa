import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { handleApiError } from '@/apis/common/api-error-handler';
import { API_URL_NEST } from '@/constants/constants';
import { useAuthStore } from '@/stores/auth-store';

export const NaverLoginCallback = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    const fetch = async () => {
      try {
        const response = await axios.post(
          `${API_URL_NEST}/timer-api/auth/naver/login`,
          { code }
        );
        useAuthStore.getState().authenticate(
          response.data.data.account.account_id,
          {
            accessToken: response.data.data.access_token,
            refreshToken: response.data.data.refresh_token,
          },
          response.data.data.expires_in
        );

        toast.success('로그인에 성공하였습니다.');
        navigate('/');
      } catch (e) {
        const result = handleApiError(e);
        toast.error(result.error);
        navigate('/auth/login');
      }
    };
    fetch();
  }, [navigate]);
  return null;
};
