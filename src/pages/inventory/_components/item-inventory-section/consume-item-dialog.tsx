import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import type { IMember } from '@/types/models/member.model';
import type { IConsumableItemInventory } from '@/types/models/item.model';
import { useConsumeItem } from '../../hooks/use-consume-item';
import { toast } from 'sonner';

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
  const { quantity, item } = itemInventory;

  const handleSubmit = () => {
    if (quantity < 1) {
      toast.error('개수가 부족합니다.');
      return;
    }
    consume({ itemInventory: itemInventory });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="top-[35%] md:top-[50%] gap-4">
        <DialogHeader>
          <DialogTitle>{item.name}을(를) 사용하시겠습니까?</DialogTitle>
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
