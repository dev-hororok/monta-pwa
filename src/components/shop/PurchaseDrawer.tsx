import { MinusIcon, PlusIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { ReactNode, useState } from 'react';
import { Item } from '@/models/item.model';
import { IMember } from '@/models/member.model';
import { usePurchaseItemMutation } from '@/apis/mutations/shopMutations';
import { useToast } from '../ui/use-toast';

interface Props {
  children: ReactNode;
  item: Item;
  member: IMember;
}

export function PurchaseDrawer({ children, item, member }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(1);
  const MaxCount = item.item_type === 'Food' ? 4 : 20;
  const { mutateAsync: purchaseItem } = usePurchaseItemMutation();
  const { toast } = useToast();

  const onClick = (adjustment: number) => {
    setCount(count + adjustment);
  };
  const onSubmitPurchase = async () => {
    setIsLoading(true);
    try {
      const result = await purchaseItem({
        item_id: item.item_id,
        count: count,
      });
      toast({
        title: result.notes,
      });
      setIsLoading(false);
      setIsOpen(false);
    } catch (e) {
      console.log('Error', e);
    }

    setIsLoading(false);
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>{item.name} 구매</DrawerTitle>
            <DrawerDescription>수량을 선택해주세요.</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => onClick(-1)}
                disabled={count <= 1}
              >
                <MinusIcon className="h-4 w-4" />
                <span className="sr-only">Decrease</span>
              </Button>
              <div className="flex-1 text-center">
                <div className="text-7xl font-bold tracking-tighter">
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
                onClick={() => onClick(1)}
                disabled={
                  count >= MaxCount || (count + 1) * item.cost > member.point
                }
              >
                <PlusIcon className="h-4 w-4" />
                <span className="sr-only">Increase</span>
              </Button>
            </div>
          </div>
          <DrawerFooter>
            <Button
              type="button"
              onClick={onSubmitPurchase}
              disabled={isLoading}
            >
              {isLoading ? '구매중 ...' : '구매하기'}
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">취소</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
