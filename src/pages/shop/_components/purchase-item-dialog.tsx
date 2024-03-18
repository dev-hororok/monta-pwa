import { MinusIcon, PlusIcon } from '@radix-ui/react-icons';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Item } from '@/types/models/item.model';
import { IMember } from '@/types/models/member.model';
import { usePurchaseItem } from '../hooks/use-purchase-item';

interface PurchaseItemDialogProps {
  item: Item;
  member: IMember;
  children: React.ReactNode;
}

export const PurchaseItemDialog = ({
  item,
  member,
  children,
}: PurchaseItemDialogProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const {
    isLoading,
    count,
    incrementCount,
    decrementCount,
    onSubmitPurchase,
    MaxCount,
  } = usePurchaseItem(item);

  const handleConfirmClick = async () => {
    await onSubmitPurchase();
    setIsOpen(false);
  };

  const handleCancelClick = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent
        className={`w-full md:max-w-[416px] max-h-[400px] flex flex-col justify-start items-center`}
      >
        <div className="mx-auto w-full max-w-sm">
          <DialogHeader>
            <DialogTitle>{item.name} 구매</DialogTitle>
            <DialogDescription>{item.description}</DialogDescription>
            <DialogDescription>구매할 수량을 선택해주세요.</DialogDescription>
          </DialogHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={decrementCount}
                disabled={count <= 1}
              >
                <MinusIcon className="h-4 w-4" />
                <span className="sr-only">Decrease</span>
              </Button>
              <div className="flex-1 text-center">
                <div className="text-4xl font-bold tracking-tighter">
                  {count}
                </div>
                <div className="text-[0.70rem] uppercase text-muted-foreground">
                  개
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={incrementCount}
                disabled={
                  count >= MaxCount || (count + 1) * item.cost > member.point
                }
              >
                <PlusIcon className="h-4 w-4" />
                <span className="sr-only">Increase</span>
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancelClick}
              className="w-full"
            >
              취소
            </Button>
            <Button
              type="button"
              onClick={handleConfirmClick}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? '구매중 ...' : '구매하기'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
