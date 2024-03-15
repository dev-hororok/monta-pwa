import { useAuthStore } from '@/stores/auth-store';
import { useQueryClient } from '@tanstack/react-query';
import * as React from 'react';

// 유효하지 않는 상태나 결과를 정리
export const useInitializeApp = () => {
  const queryClient = useQueryClient();

  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const logout = useAuthStore((state) => state.logout);

  React.useEffect(() => {
    if (!isLoggedIn) {
      logout();
      queryClient.clear(); // react-query 캐시 정리
    }
  }, [isLoggedIn, logout, queryClient]);
};
