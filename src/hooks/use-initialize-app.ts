import { useAuthStore } from '@/stores/auth-store';
import * as React from 'react';

// 유효하지 않는 상태나 결과를 정리
export const useInitializeApp = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const logout = useAuthStore((state) => state.logout);

  React.useEffect(() => {
    if (!isLoggedIn) {
      logout();
    }
  }, [isLoggedIn, logout]);
};
