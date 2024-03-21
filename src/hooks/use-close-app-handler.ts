import { useEffect, useRef } from 'react';
import { toast } from 'sonner';

/** 뒤로가기를 {delay}초안에 연속하여 누르면 앱을 종료하는 훅
 *  - 뒤로가기 후 상호작용이 없다면 delay초가 지나서 뒤로가기를 누르더라도 앱이 종료됨
 *  - (프로그래밍 형식으로 조작된 히스토리는 사용자 상호작용이 없으면 pop동작 시 무시됨)
 *
 *  - 종료가 될 페이지에서 항상 이전 히스토리가 1개가 되도록 신경써야함
 */
export const useCloseAppHandler = (delay = 1500) => {
  const isBackButtonPressed = useRef(false);

  // 앱 첫 시작시 히스토리 하나 추가(뒤로가기 종료 막기용)
  useEffect(() => {
    if (!sessionStorage.getItem('firstLoad')) {
      sessionStorage.setItem('firstLoad', 'true');
      window.history.pushState(null, 'current', '/');
    }
  }, []);

  useEffect(() => {
    let timeout: any;

    const handleBackButtonEvent = () => {
      if (!isBackButtonPressed.current) {
        isBackButtonPressed.current = true;
        toast('한번 더 누르면 앱이 종료됩니다.', { duration: delay });

        timeout = setTimeout(() => {
          window.history.pushState(null, 'current', '/'); // 히스토리 복구
          isBackButtonPressed.current = false;
        }, delay);
      }
    };
    window.addEventListener('popstate', handleBackButtonEvent);
    return () => {
      window.removeEventListener('popstate', handleBackButtonEvent);
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [delay]);

  return null;
};
