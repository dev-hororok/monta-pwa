import { useState } from 'react';

import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useModalStore } from '@/stores/use-modal-store';
import OptionPicker from './option-picker';
import { useTimerOptionsStore } from '@/stores/timer-options-store';

const pomodoroTimeOptions = [
  0.1, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 90, 120,
];
const sectionCountOptions = [1, 2, 3, 4, 5, 6, 7, 8];
const restTimeOptions = [0.1, 3, 5, 10, 15, 20, 25, 30, 35, 40];
const longRestTimeOptions = [3, 5, 10, 15, 20, 25, 30, 35, 40];

const TimerOptionDialog = () => {
  const { isOpen } = useModalStore((state) => state.modals.timerOptions);
  const closeModal = useModalStore((state) => state.closeModal);
  const timerOptions = useTimerOptionsStore((state) => state.timerOptions);
  const setTimerOptions = useTimerOptionsStore(
    (state) => state.setTimerOptions
  );

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
    closeModal('timerOptions');
  };
  if (!isOpen) {
    return null;
  }

  return (
    <Dialog open={isOpen}>
      <DialogContent
        className={cn(
          `w-full md:max-w-[416px] max-h-[400px] flex flex-col justify-start items-center pt-safe-offset-14`
        )}
      >
        <DialogHeader>
          <DialogTitle>타이머 설정</DialogTitle>
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
          <Button type="button" onClick={onClickSubmit}>
            확인
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TimerOptionDialog;
