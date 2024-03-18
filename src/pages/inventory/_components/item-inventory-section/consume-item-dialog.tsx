import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import type { IMember } from '@/types/models/member.model';
import type { IConsumableItemInventory } from '@/types/models/item.model';
import { useConsumeItem } from '@/hooks/use-consume-item';

interface UseItemDialogProps {
  itemInventory: IConsumableItemInventory;
  member: IMember;
  children: React.ReactNode;
}

export const ConsumeItemDialog = ({
  itemInventory,
  children,
}: UseItemDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const { consume } = useConsumeItem();
  const { item } = itemInventory;

  const handleSubmit = () => {
    consume({ itemInventory: itemInventory });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent
        className={`w-full md:max-w-mobile max-h-[400px] flex flex-col justify-start items-center`}
      >
        <DialogHeader>
          <DialogTitle>{item.name}을(를) 사용하시겠습니까?</DialogTitle>
          <DialogDescription>{item.description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={handleSubmit} className="w-full">
            확인
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="ghost" className="w-full">
              취소
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
