import { Outlet } from 'react-router-dom';
import { Toaster } from '../ui/toaster';
import { DarkModeToggle } from '../DarkmodeToggle';
import { useEffect } from 'react';
import { CloseAppTrigger } from '../providers/CloseAppTrigger';

export const RootLayout = () => {
  // 앱 첫 시작시 히스토리 하나 추가(뒤로가기 종료 막기용)
  useEffect(() => {
    if (!sessionStorage.getItem('firstLoad')) {
      sessionStorage.setItem('firstLoad', 'true');
      window.history.pushState(null, 'home', window.location.href);
    }
  }, []);

  return (
    <div className="w-full h-screen">
      <div className="w-full fixed top-0 md:top-1/2 md:left-1/2 md:-ml-[213px] md:-mt-[368px]">
        <div className="relative w-full h-screen md:w-[416px] md:h-[736px] md:border md:rounded-md bg-background select-none">
          <CloseAppTrigger>
            <Outlet />
          </CloseAppTrigger>
          <Toaster />
          <div className="absolute -bottom-16 -right-16">
            <DarkModeToggle />
          </div>
        </div>
      </div>
    </div>
  );
};
