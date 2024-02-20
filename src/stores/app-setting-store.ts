import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppSettings {
  isMobileDevice: boolean;
  vibrationEnabled: boolean;
}

interface AppSettingsStore {
  appSettings: AppSettings;
  setAppSettings: (options: AppSettings) => void;
}

export const useAppSettingsStore = create<AppSettingsStore>()(
  persist(
    (set) => ({
      appSettings: {
        isMobileDevice: false, // 모바일 환경인지 체크
        vibrationEnabled: false, // 진동 허용
      },
      setAppSettings: (settings) =>
        set(() => ({
          appSettings: settings,
        })),
    }),
    {
      name: 'app-settings-storage',
    }
  )
);
