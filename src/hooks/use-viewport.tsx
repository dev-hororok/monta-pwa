import { useEffect } from 'react';

import { useAppStore } from '@/stores/app-store';

// 사용자 뷰포트(모바일) 저장
export const useViewport = () => {
  const setViewportSize = useAppStore((state) => state.setViewportSize);

  useEffect(() => {
    const handleViewportChange = () => {
      if (window.visualViewport) {
        setViewportSize(window.innerWidth, window.visualViewport.height);
      } else {
        setViewportSize(window.innerWidth, window.innerHeight);
      }
    };

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleViewportChange);
    }

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener(
          'resize',
          handleViewportChange
        );
      }
    };
  }, [setViewportSize]);
};
