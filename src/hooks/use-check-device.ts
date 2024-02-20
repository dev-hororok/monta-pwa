import { useAppSettingsStore } from '@/stores/app-setting-store';
import * as React from 'react';

export const useCheckDevice = () => {
  const appSettings = useAppSettingsStore((state) => state.appSettings);
  const setAppSettings = useAppSettingsStore((state) => state.setAppSettings);

  React.useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor;
    if (
      /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
        userAgent
      )
    ) {
      setAppSettings({
        ...appSettings,
        isMobileDevice: true,
      });
    } else {
      setAppSettings({
        ...appSettings,
        isMobileDevice: false,
      });
    }
    // eslint-disable-next-line
  }, []);

  return;
};
