import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { MorePageHeader } from '@/components/headers/more-page-header';
import { Icons } from '@/components/icons';
import { useTheme } from '@/components/providers/theme-provider';
import { useAppSettingsStore } from '@/stores/app-setting-store';
import { useAuthStore } from '@/stores/auth-store';

const MorePage = () => {
  const { setTheme } = useTheme();
  const logout = useAuthStore((state) => state.logout);
  const appSettings = useAppSettingsStore((state) => state.appSettings);
  const setAppSettings = useAppSettingsStore((state) => state.setAppSettings);
  const queryClient = useQueryClient();

  const handleVibrationToggle = () => {
    if (!appSettings.isMobileDevice) {
      toast.error('모바일 환경에서 접속해주세요!');
      return;
    }

    if (appSettings.vibrationEnabled) {
      setAppSettings({
        ...appSettings,
        vibrationEnabled: false,
      });
    } else {
      toast.info('디바이스의 진동이 켜져있나 확인해주세요!', {
        duration: 1000,
      });
      window.navigator.vibrate([100]);
      setAppSettings({
        ...appSettings,
        vibrationEnabled: true,
      });
    }
  };

  const handleLogoutClick = () => {
    queryClient.clear();
    logout();
  };

  const handleDummyClick = () => {
    toast.error('미구현', { duration: 1000 });
  };
  return (
    <div className="rounded-t-md rounded-b-3xl pt-safe-offset-14 h-full pb-safe-offset-14">
      <MorePageHeader />

      <main className="h-full overflow-y-scroll scrollbar-hide space-y-4">
        <div className="space-y-2">
          <p className="px-6 font-semibold">시스템</p>
          <ul className="">
            <li className="flex">
              <div
                className="flex items-center w-full py-4 px-6 hover:bg-accent cursor-pointer text-sm gap-2 dark:hidden"
                onClick={() => setTheme('dark')}
              >
                <Icons.moon className="h-[1.2rem] w-[1.2rem]" />
                다크모드
              </div>
              <div
                className="hidden dark:flex items-center w-full py-4 px-6 hover:bg-accent cursor-pointer text-sm gap-2"
                onClick={() => setTheme('light')}
              >
                <Icons.sun className="h-[1.2rem] w-[1.2rem]" />
                라이트모드
              </div>
            </li>
            <li
              onClick={handleVibrationToggle}
              className="flex items-center w-full py-4 px-6 hover:bg-accent cursor-pointer text-sm"
            >
              {appSettings.vibrationEnabled ? (
                <div className="flex items-center gap-2">
                  <Icons.vibrate className="h-[1.2rem] w-[1.2rem]" />
                  진동 On
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Icons.vibrateOff className="h-[1.2rem] w-[1.2rem]" />
                  진동 Off
                </div>
              )}
            </li>
          </ul>
        </div>
        <div className="space-y-2">
          <p className="px-6 font-semibold">계정</p>
          <ul className="">
            <li
              onClick={handleDummyClick}
              className="flex items-center w-full py-4 px-6 hover:bg-accent cursor-pointer text-sm"
            >
              <div className="flex items-center gap-2">
                <Icons.removeUser className="h-[1.2rem] w-[1.2rem]" />
                계정 삭제
              </div>
            </li>
            <li
              onClick={handleLogoutClick}
              className="flex items-center w-full py-4 px-6 hover:bg-accent cursor-pointer text-sm"
            >
              <div className="flex items-center gap-2">
                <Icons.logout className="h-[1.2rem] w-[1.2rem]" />
                로그아웃
              </div>
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <p className="px-6 font-semibold">앱 정보</p>
          <ul className="">
            <li className="flex items-center justify-between w-full py-4 px-6 text-sm">
              <div className="flex items-center gap-2">
                <Icons.alert className="h-[1.2rem] w-[1.2rem]" />앱 버전
              </div>
              <span>0.0.1</span>
            </li>
            <li
              onClick={handleDummyClick}
              className="flex items-center w-full py-4 px-6 hover:bg-accent cursor-pointer text-sm"
            >
              <div className="flex items-center gap-2">
                <Icons.fileText className="h-[1.2rem] w-[1.2rem]" />
                이용약관
              </div>
            </li>
            <li
              onClick={handleDummyClick}
              className="flex items-center w-full py-4 px-6 hover:bg-accent cursor-pointer text-sm"
            >
              <div className="flex items-center gap-2">
                <Icons.shield className="h-[1.2rem] w-[1.2rem]" />
                개인정보처리방침
              </div>
            </li>
            <li
              onClick={handleDummyClick}
              className="flex items-center w-full py-4 px-6 hover:bg-accent cursor-pointer text-sm"
            >
              <div className="flex items-center gap-2">
                <Icons.star className="h-[1.2rem] w-[1.2rem]" />
                리뷰 작성
              </div>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default MorePage;
