import { MinusIcon, PlusIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import { useModalStore } from '@/stores/use-modal-store';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { usePurchaseItem } from './use-purchase-item';

const PurchaseItemDialog = () => {
  const { isOpen, data } = useModalStore((state) => state.modals.purchaseItem);
  const closeModal = useModalStore((state) => state.closeModal);

  const {
    isLoading,
    count,
    incrementCount,
    decrementCount,
    onSubmitPurchase,
    MaxCount,
  } = usePurchaseItem(data ? data.item : null);

  if (!isOpen || !data) {
    return null;
  }

  return (
    <Dialog open={isOpen}>
      <DialogContent
        className={`w-full md:max-w-[416px] max-h-[400px] flex flex-col justify-start items-center`}
      >
        <div className="mx-auto w-full max-w-sm">
          <DialogHeader>
            <DialogTitle>{data.item.name} 구매</DialogTitle>
            <DialogDescription>수량을 선택해주세요.</DialogDescription>
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
                  count >= MaxCount ||
                  (count + 1) * data.item.cost > data.member.point
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
              onClick={() => closeModal('purchaseItem')}
              className="w-full"
            >
              취소
            </Button>
            <Button
              type="button"
              onClick={onSubmitPurchase}
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

export default PurchaseItemDialog;
