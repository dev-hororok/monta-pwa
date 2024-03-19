import { useAuthStore } from '@/stores/auth-store';
import { useTimerOptionsStore } from '@/stores/timer-options-store';
import { useTimerStateStore } from '@/stores/timer-state-store';
import { useQueryClient } from '@tanstack/react-query';
import * as React from 'react';
import { toast } from 'sonner';

// 유효하지 않는 상태나 결과를 정리
export const useInitializeApp = () => {
  const queryClient = useQueryClient();

  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const logout = useAuthStore((state) => state.logout);
  const initTimer = useTimerStateStore((state) => state.initTimer);
  const resetOptions = useTimerOptionsStore((state) => state.resetOptions);
  const toggleTimerMode = useTimerOptionsStore(
    (state) => state.toggleTimerMode
  );
  const timerMode = useTimerOptionsStore((state) => state.timerMode);

  // 로그인 상태가 아닌데 상태들을 가지고 있는경우 처리
  React.useEffect(() => {
    if (!isLoggedIn) {
      logout();
      initTimer(); // 타이머 상태 초기화
      resetOptions(); // 타이머 옵션 초기화
      queryClient.clear(); // react-query 캐시 정리
    }
  }, [isLoggedIn, logout, queryClient, initTimer, resetOptions]);

  // 알람 권한이 없는데 뽀모도로 모드가 켜져있는 경우 처리
  React.useEffect(() => {
    if (typeof window !== 'undefined' && typeof Notification !== 'undefined') {
      if (Notification.permission !== 'granted' && timerMode === 'pomodoro') {
        toast.error(
          '푸시 메세지 토큰에 문제가 발생하여 일반 타이머 모드로 전환되었습니다.'
        );
        toggleTimerMode();
      }
    }
  }, [timerMode, toggleTimerMode]);

  React.useEffect(() => {
    const preventZoom = () => (event: TouchEvent) => {
      // 핀치 줌의 경우 두 개 이상의 이벤트가 발생
      if (event.touches.length > 1) {
        event.preventDefault();
      }
    };

    document.addEventListener('touchmove', preventZoom, { passive: false });
    return () => {
      document.removeEventListener('touchmove', preventZoom);
    };
  }, []);
};
