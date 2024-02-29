import { toast } from 'sonner';

import { Icons } from '@/components/icons';
import { useAppSettingsStore } from '@/stores/app-setting-store';

export const VibrationButton = () => {
  const appSettings = useAppSettingsStore((state) => state.appSettings);
  const setAppSettings = useAppSettingsStore((state) => state.setAppSettings);

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
  return (
    <div
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
    </div>
  );
};
