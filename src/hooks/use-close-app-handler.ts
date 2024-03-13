import { useEffect, useRef } from 'react';
import { toast } from 'sonner';

/** 뒤로가기를 {delay}초안에 연속하여 누르면 앱을 종료하는 훅
 *  - 뒤로가기 후 상호작용이 없다면 delay초가 지나서 누르더라도 앱이 종료됨
 *  - (히스토리를 조작한 후 사용자 상호작용이 없을 때 pop동작 시 해당 도메인 전체가 pop됨)
 */
export const useCloseAppHandler = (delay = 1500) => {
  const backButtonPressed = useRef(false);

  // 앱 첫 시작시 히스토리 하나 추가(뒤로가기 종료 막기용)
  useEffect(() => {
    if (!sessionStorage.getItem('firstLoad')) {
      sessionStorage.setItem('firstLoad', 'true');
      window.history.pushState(null, 'current', window.location.href);
    }
  }, []);

  useEffect(() => {
    let timeout: any;

    const handleBackButtonEvent = () => {
      if (!backButtonPressed.current) {
        backButtonPressed.current = true;
        toast('한번 더 누르면 앱이 종료됩니다.', { duration: delay });

        timeout = setTimeout(() => {
          window.history.pushState(null, 'current', window.location.href); // 히스토리 복구
          backButtonPressed.current = false;
        }, delay);
      } else {
        // 사용자가 지정된 시간 내에 다시 뒤로 가기를 누르면 앱 종료
        window.history.go(-(window.history.length + 2));
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
