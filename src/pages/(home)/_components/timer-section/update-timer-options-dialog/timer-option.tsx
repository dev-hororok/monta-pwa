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
  disabled: boolean;
}

export const TimerOption: React.FC<TimerOptionProps> = ({
  label,
  optionKey,
  postfix = '분',
  disabled,
}) => {
  const value = useTimerOptionsStore((state) => state[optionKey]);
  const setValue = useTimerOptionsStore((state) => state.setTimerOptions);

  return (
    <div className="flex items-center justify-between">
      <span className="antialiased font-semibold w-1/2">{label}</span>
      <div className="w-1/2 flex-center">
        <TimerOptionPicker
          idx={timerOptions[optionKey].indexOf(value)}
          setIdx={(index) =>
            setValue({ [optionKey]: timerOptions[optionKey][index] })
          }
          options={timerOptions[optionKey]}
          postfix={postfix}
          disabled={disabled}
        />
      </div>
    </div>
  );
};
