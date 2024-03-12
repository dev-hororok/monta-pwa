import type { IConsumableItemInventory } from '@/types/models/item.model';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface ConsumableItemInventoryCardProps {
  consumableItemInventory: IConsumableItemInventory;
}

export const ConsumableItemInventoryCard = ({
  consumableItemInventory,
}: ConsumableItemInventoryCardProps) => {
  const { quantity, item } = consumableItemInventory;
  const { image_url, name } = item;

  return (
    <div
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

ConsumableItemInventoryCard.Skeleton = () => {
  return <Skeleton className="w-full aspect-[3/4]"></Skeleton>;
};
