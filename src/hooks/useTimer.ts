import { useEndStudyTimerMutation } from '@/apis/mutations/studyTimerMutations';
import { useTimerOptionsStore } from '@/stores/timerOptionsStore';
import { useModalStore } from '@/stores/useModalStore';
import { useEffect, useState } from 'react';

export const useTimer = () => {
  const { pomodoroTime, selectedCategory } = useTimerOptionsStore(
    (state) => state.timerOptions
  );
  const openModal = useModalStore((state) => state.openModal);
  const { mutate: endStudyTimer } = useEndStudyTimerMutation();

  const [isActive, setIsActive] = useState(true);
  const [duration, setDuration] = useState(pomodoroTime * 60); // 초단위로 변환

  // 타이머 시간
  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      setDuration((prev) => {
        if (0 < prev) return prev - 1;
        return 0;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isActive]);

  // 타이머 종료 처리
  useEffect(() => {
    if (0 < duration) return;
    endStudyTimer({ status: 'Completed', duration: pomodoroTime * 60 }); // 공부시간 기록
    openModal('timerAlarm'); // 알람 모달 열기
    setIsActive(false); // 타이머 중지
  }, [duration, endStudyTimer, openModal, pomodoroTime]);

  const startTimer = () => setIsActive(true);
  const pauseTimer = () => setIsActive(false);
  const resetTimer = () => {
    setDuration(pomodoroTime * 60);
    setIsActive(false);
  };

  return {
    duration,
    pomodoroTime,
    startTimer,
    pauseTimer,
    resetTimer,
    selectedCategory,
  };
};
