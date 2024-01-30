import { useEffect } from 'react';
import useBoundStore from '@/stores/useBoundStore';
import { useToast } from '@/components/ui/use-toast';

//* 뒤로가기를 {delay}초안에 안누르면 종료방지 history를 복구하는 훅 */
export const useCloseAppHandler = (delay = 2000) => {
  const { toast } = useToast();
  const setBackButtonPressed = useBoundStore(
    (state) => state.setBackButtonPressed
  );

  useEffect(() => {
    let timeout: any;

    const handleBackButtonEvent = (e: PopStateEvent) => {
      e.preventDefault();

      if (!useBoundStore.getState().backButtonPressed) {
        setBackButtonPressed(true);
        toast({
          title: '한번 더 누르면 앱이 종료됩니다.',
          duration: 2000,
        });

        timeout = setTimeout(() => {
          setBackButtonPressed(false);
          window.history.pushState(null, 'home', window.location.href);
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
  }, [setBackButtonPressed, delay, toast]);

  return null;
};
