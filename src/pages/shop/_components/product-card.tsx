import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import type { Item } from '@/types/models/item.model';
import { Skeleton } from '@/components/ui/skeleton';

interface ProductCardProps {
  item: Item;
}

export const ProductCard = ({ item }: ProductCardProps) => {
  return (
    <div
      className={cn(
        buttonVariants({ variant: 'ghost' }),
        'h-auto p-2 flex flex-col items-center justify-center text-xs shadow-sm cursor-pointer'
      )}
    >
      <img
        src={item.image_url}
        alt={item.name}
        className="mb-2 w-full max-w-[200px] object-cover" // 이미지 크기 및 비율 조정
        onContextMenu={(e) => e.preventDefault()} // 이미지 우클릭 방지
      />
      <div className="w-full flex flex-col items-center justify-between gap-1.5">
        <p className="font-semibold truncate text-center">{item.name}</p>
        <p className="text-foreground/60">{item.cost} 원</p>
      </div>
    </div>
  );
};

ProductCard.Skeleton = () => {
  return <Skeleton className="w-full aspect-[3/4]" />;
};
