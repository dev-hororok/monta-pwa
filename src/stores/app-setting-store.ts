import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppSettings {
  vibrationEnabled: boolean;
  notificationEnabled: boolean;
}

interface AppSettingsStore {
  appSettings: AppSettings;
  setAppSettings: (options: AppSettings) => void;
}

export const useAppSettingsStore = create<AppSettingsStore>()(
  persist(
    (set) => ({
      appSettings: {
        vibrationEnabled: false, // 진동 허용
        notificationEnabled: false, // 알림 허용
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
