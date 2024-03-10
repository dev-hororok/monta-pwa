import * as React from 'react';

import {
  TimerOptionKey,
  timerOptions,
  useTimerOptionsStore,
} from '@/stores/timer-options-store';
import { TimerOptionPicker } from './timer-option-picker';

interface TimerOptionProps {
  label: string;
  optionKey: TimerOptionKey;
  postfix?: string;
}

export const TimerOption: React.FC<TimerOptionProps> = ({
  label,
  optionKey,
  postfix = '분',
}) => {
  const value = useTimerOptionsStore((state) => state[optionKey]);
  const setValue = useTimerOptionsStore((state) => state.setTimerOptions);

  return (
    <div className="flex items-center justify-between">
      <span className="antialiased font-semibold">{label}</span>
      <TimerOptionPicker
        idx={timerOptions[optionKey].indexOf(value)}
        setIdx={(index) =>
          setValue({ [optionKey]: timerOptions[optionKey][index] })
        }
        options={timerOptions[optionKey]}
        postfix={postfix}
      />
    </div>
  );
};
