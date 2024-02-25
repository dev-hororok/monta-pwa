import { useState } from 'react';

import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useModalStore } from '@/stores/use-modal-store';
import OptionPicker from './option-picker';
import { useTimerOptionsStore } from '@/stores/timer-options-store';
import { useTimerStateStore } from '@/stores/timer-state-store';

const pomodoroTimeOptions = [
  0.1, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 90, 120,
];
const sectionCountOptions = [1, 2, 3, 4, 5, 6, 7, 8];
const restTimeOptions = [0.1, 3, 5, 10, 15, 20, 25, 30, 35, 40];
const longRestTimeOptions = [3, 5, 10, 15, 20, 25, 30, 35, 40];

const TimerOptionDialog = () => {
  const { isOpen } = useModalStore((state) => state.modals.timerOptions);
  const closeModal = useModalStore((state) => state.closeModal);
  const timerOptions = useTimerOptionsStore();
  const setTimerOptions = useTimerOptionsStore(
    (state) => state.setTimerOptions
  );
  const initTimer = useTimerStateStore((state) => state.initTimer);

  const [pomodoroTime, setPomodoro] = useState(
    pomodoroTimeOptions.findIndex((o) => o === timerOptions.pomodoroTime)
  );
  const [sectionCount, setSelectionCount] = useState(
    sectionCountOptions.findIndex((o) => o === timerOptions.sectionCount)
  );
  const [restTime, setRestTime] = useState(
    restTimeOptions.findIndex((o) => o === timerOptions.restTime)
  );
  const [longRestTime, setLongRestTime] = useState(
    longRestTimeOptions.findIndex((o) => o === timerOptions.longRestTime)
  );

  const onClickSubmit = () => {
    setTimerOptions({
      pomodoroTime: pomodoroTimeOptions[pomodoroTime],
      sectionCount: sectionCountOptions[sectionCount],
      restTime: restTimeOptions[restTime],
      longRestTime: longRestTimeOptions[longRestTime],
    });
    initTimer();
    closeModal('timerOptions');
  };
  if (!isOpen) {
    return null;
  }

  return (
    <Dialog open={isOpen}>
      <DialogContent
        className={cn(
          `w-full md:max-w-mobile max-h-mobile flex-center flex-col`
        )}
      >
        <DialogHeader className="items-center gap-2">
          <DialogTitle>타이머 설정</DialogTitle>
          <DialogDescription>
            타이머 설정을 변경하면 진행 중인 포모도로가 초기화됩니다.
          </DialogDescription>
        </DialogHeader>
        <div className="pb-6 w-full">
          <div className="flex justify-between items-center w-full font-semibold py-2">
            <p className="text-sm">집중 시간</p>
            <OptionPicker
              state={pomodoroTime}
              setState={setPomodoro}
              options={pomodoroTimeOptions}
            />
          </div>
          <div className="flex justify-between items-center w-full font-semibold py-2">
            <p className="text-sm">집중 횟수</p>
            <OptionPicker
              state={sectionCount}
              setState={setSelectionCount}
              postfix="회"
              options={sectionCountOptions}
            />
          </div>
          <div className="flex justify-between items-center w-full font-semibold py-2">
            <p className="text-sm">쉬는 시간</p>
            <OptionPicker
              state={restTime}
              setState={setRestTime}
              options={restTimeOptions}
            />
          </div>
          <div className="flex justify-between items-center w-full font-semibold py-2">
            <p className="text-sm">긴 쉬는 시간</p>
            <OptionPicker
              state={longRestTime}
              setState={setLongRestTime}
              options={longRestTimeOptions}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={onClickSubmit} className="w-full">
            확인
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TimerOptionDialog;
