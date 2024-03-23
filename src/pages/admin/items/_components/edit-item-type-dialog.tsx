import * as React from 'react';
import { toast } from 'sonner';

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
import { useEditItemMutation } from '@/services/admin/items.mutations';
import { IAdminItem } from '@/services/admin/types/item.model';
import { ItemType } from '@/types/models/item.model';

interface EditItemTypeDialogProps {
  item: IAdminItem;
  children: React.ReactNode;
}

export function EditItemTypeDialog({
  children,
  item,
}: EditItemTypeDialogProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [itemType, setItemType] = React.useState<ItemType>(item.item_type);

  const { mutateAsync: editItem } = useEditItemMutation();

  const handleSubmit = async () => {
    if (itemType === item.item_type) return setIsOpen(false);
    try {
      await editItem({
        itemId: item.item_id,
        body: { item_type: itemType },
      });
      toast.success('성공적으로 아이템 타입을 변경했습니다.');
      setIsOpen(false);
    } catch (e) {
      // 네트워크 에러나 기타 예외 처리
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="top-[35%] md:top-[50%]">
        <DialogHeader className="justify-center items-center">
          <DialogTitle>아이템 타입 변경</DialogTitle>
          <DialogDescription>
            변경할 아이템 타입을 입력해주세요 (판매중인 물건이면 상점 탭이
            변경됨)
          </DialogDescription>
        </DialogHeader>
        <div className={'w-full py-4 flex items-center gap-4'}>
          <Button
            variant={itemType === 'Food' ? 'default' : 'outline'}
            type="button"
            onClick={() => setItemType('Food')}
          >
            🐣
          </Button>
          <Button
            variant={itemType === 'Consumable' ? 'default' : 'outline'}
            type="button"
            onClick={() => setItemType('Consumable')}
          >
            🛠️
          </Button>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost" className="w-full">
              취소
            </Button>
          </DialogClose>
          <Button type="submit" className="w-full" onClick={handleSubmit}>
            확인
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
