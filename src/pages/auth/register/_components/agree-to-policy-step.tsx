import * as React from 'react';
import { ChevronRightIcon } from '@radix-ui/react-icons';

import { Button, buttonVariants } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface AgreeToPolicyStepProps {
  onSuccess: () => void;
}

export const AgreeToPolicyStep = ({ onSuccess }: AgreeToPolicyStepProps) => {
  const [allChecked, setAllChecked] = React.useState(false);
  const [checked, setChecked] = React.useState([false, false]);

  const allCheckHandler = () => {
    if (checked.includes(false)) {
      setChecked([true, true]);
      setAllChecked(true);
    } else {
      setChecked([false, false]);
      setAllChecked(false);
    }
  };
  const handleCheckClick = (idx: number) => {
    const t = [...checked];
    t[idx] = !t[idx];
    setChecked(t);

    if (t.includes(false)) {
      setAllChecked(false);
    } else {
      setAllChecked(true);
    }
  };

  const handleConfirm = () => {
    onSuccess();
  };

  return (
    <div className="px-6 py-8 flex flex-col">
      <div className="pb-16">
        <h4 className="text-3xl text-primary">약관동의</h4>
      </div>

      <div className="flex items-center space-x-4">
        <Checkbox
          id="terms"
          className="w-6 h-6"
          checked={allChecked}
          onCheckedChange={allCheckHandler}
        />
        <label
          htmlFor="terms"
          className="w-full text-base leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          모두 동의합니다.
        </label>
      </div>
      <div className="relative py-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase"></div>
      </div>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Checkbox
            id="terms_1"
            className="w-6 h-6"
            checked={checked[0]}
            onCheckedChange={() => handleCheckClick(0)}
          />
          <label
            htmlFor="terms_1"
            className="w-full text-base leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            [필수] 이용약관 동의
          </label>
          <Link to="/terms" replace state={{ prevPage: '/auth/agree' }}>
            <ChevronRightIcon />
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Checkbox
            id="terms_2"
            className="w-6 h-6"
            checked={checked[1]}
            onCheckedChange={() => handleCheckClick(1)}
          />
          <label
            htmlFor="terms_2"
            className="w-full text-base leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            [필수] 개인정보 수집 및 이용 동의
          </label>
          <Link to="/privacy" replace state={{ prevPage: '/auth/agree' }}>
            <ChevronRightIcon />
          </Link>
        </div>
      </div>

      <Button
        disabled={!checked[0] || !checked[1]}
        onClick={handleConfirm}
        className={cn(buttonVariants(), 'w-full h-12 mt-10')}
      >
        동의하기
      </Button>
    </div>
  );
};
