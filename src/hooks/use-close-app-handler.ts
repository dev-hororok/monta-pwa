import { useEffect } from 'react';
import { toast } from 'sonner';

import { useAppStore } from '@/stores/app-store';

//* 뒤로가기를 {delay}초안에 안누르면 종료방지 history를 복구하는 훅 */
export const useCloseAppHandler = (delay = 1500) => {
  const { setBackButtonPressed, backButtonPressed } = useAppStore(
    (state) => state
  );

  // 앱 첫 시작시 히스토리 하나 추가(뒤로가기 종료 막기용)
  useEffect(() => {
    if (!sessionStorage.getItem('firstLoad')) {
      sessionStorage.setItem('firstLoad', 'true');
      window.history.pushState(null, 'current', '/');
    }
  }, []);

  useEffect(() => {
    let timeout: any;

    const handleBackButtonEvent = (e: PopStateEvent) => {
      e.preventDefault();

      if (!backButtonPressed) {
        setBackButtonPressed(true);
        toast('한번 더 누르면 앱이 종료됩니다.', { duration: delay });

        timeout = setTimeout(() => {
          setBackButtonPressed(false);
          window.history.pushState(null, 'current', '/');
        }, delay);
      } else {
        // 사용자가 지정된 시간 내에 다시 뒤로 가기를 누르면 앱 종료 로직 추가
        window.history.back();
      }
    };

    window.addEventListener('popstate', handleBackButtonEvent);

    return () => {
      window.removeEventListener('popstate', handleBackButtonEvent);
      if (timeout) {
        clearTimeout(timeout);
      }
    };
    // eslint-disable-next-line
  }, [setBackButtonPressed, delay]);

  return null;
};
