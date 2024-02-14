import { toast } from 'sonner';

import type { IConsumableItemInventory } from '@/models/item.model';
import { buttonVariants } from '@/components/ui/button';
import { useConsumeItem } from '@/hooks/use-consume-item';
import { cn } from '@/lib/utils';

interface ConsumableItemInventoryCardProps {
  consumableItemInventory: IConsumableItemInventory;
}

export const ConsumableItemInventoryCard = ({
  consumableItemInventory,
}: ConsumableItemInventoryCardProps) => {
  const { consume } = useConsumeItem();
  const { quantity, item } = consumableItemInventory;
  const { image_url, name } = item;

  const handleClick = () => {
    if (quantity < 1) {
      toast.error('개수가 부족합니다.');
      return;
    }
    consume({ itemInventory: consumableItemInventory });
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        buttonVariants({ variant: 'ghost' }),
        'h-auto p-1 flex flex-col items-center justify-center text-xs font-semibold cursor-pointer'
      )}
    >
      <img
        src={image_url}
        alt={name}
        className="p-2"
        onContextMenu={(e) => e.preventDefault()} // 이미지 우클릭 방지
      />
      <div className="w-full flex flex-col items-center justify-between gap-1.5">
        <p className="w-full font-semibold truncate text-center">{name}</p>
        <p className="flex items-center gap-1 text-foreground/60">
          {quantity} 개
        </p>
      </div>
    </div>
  );
};
