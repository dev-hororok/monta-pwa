import { FIREBASE_VAPID_KEY } from '@/constants/constants';
import { messaging } from '@/lib/firebase';
import { getToken } from 'firebase/messaging';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type TimerMode = 'normal' | 'pomodoro';
export type TimerOptionKey = 'pomodoroTime' | 'sectionCount' | 'restTime';
// | 'longRestTime';

export const timerOptions: Record<TimerOptionKey, number[]> = {
  pomodoroTime: [0.1, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 90, 120],
  sectionCount: [1, 2, 3, 4, 5, 6, 7, 8],
  restTime: [0.1, 3, 5, 10, 15, 20, 25, 30, 35, 40],
  // longRestTime: [3, 5, 10, 15, 20, 25, 30, 35, 40],
};

interface TimerOptionsStore {
  timerMode: TimerMode;
  pomodoroTime: number;
  sectionCount: number;
  restTime: number;
  // longRestTime: number;
  setTimerOptions: (options: Partial<Record<TimerOptionKey, number>>) => void;

  isTogetherEnabled: boolean;
  toggleIsTogetherEnabled: () => void;
  toggleTimerMode: () => void;
}

export const useTimerOptionsStore = create<TimerOptionsStore>()(
  persist(
    (set, get) => ({
      timerMode: 'normal',
      pomodoroTime: 25, // 기본 뽀모도로 시간 25분
      sectionCount: 4, // 기본 섹션 4회
      restTime: 5, // 쉬는시간
      // longRestTime: 15, // 긴 쉬는시간
      isTogetherEnabled: false, // 함께 공부하기 유무
      setTimerOptions: (options) =>
        set((state) => ({
          ...state,
          ...options,
        })),
      toggleIsTogetherEnabled: () => {
        set((state) => ({
          ...state,
          isTogetherEnabled: !state.isTogetherEnabled,
        }));
      },
      toggleTimerMode: async () => {
        if (get().timerMode === 'normal') {
          // 웹 푸시 권한 요청 & notification_token 등록 api
          try {
            const permission = await Notification.requestPermission();

            if (permission === 'granted') {
              const token = await getToken(messaging, {
                vapidKey: FIREBASE_VAPID_KEY,
              });

              // 토큰 백엔드에 보내기

              console.log('Token generated : ', token);
            } else if (permission === 'denied') {
              //notifications are blocked
              alert('You denied for the notification');
            }
          } catch (e) {
            console.log(e);
          }

          set((state) => ({
            ...state,
            timerMode: 'pomodoro',
          }));
        } else {
          // notification_token 만료 api

          set((state) => ({
            ...state,
            timerMode: 'normal',
          }));
        }
      },
    }),
    {
      name: 'timer-option-storage',
    }
  )
);
