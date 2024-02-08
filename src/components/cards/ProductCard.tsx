import { cn } from '@/lib/utils';
import { buttonVariants } from '../ui/button';
import { Item } from '@/models/item.model';

export interface ProductCardProps {
  item: Item;
}

export const ProductCard = ({ item }: ProductCardProps) => {
  return (
    <div
      className={cn(
        buttonVariants({ variant: 'outline' }),
        'h-auto p-2 flex flex-col items-center justify-center text-xs shadow-sm cursor-pointer'
      )}
    >
      <img
        src={item.image_url}
        alt={item.name}
        className="p-2"
        onContextMenu={(e) => e.preventDefault()}
      />
      <div className="w-full flex flex-col items-center justify-between gap-1.5">
        <p className="w-full font-semibold truncate text-center">{item.name}</p>
        <p className="flex items-center gap-1 text-foreground/60">
          {item.cost} 원
        </p>
      </div>
    </div>
  );
};
