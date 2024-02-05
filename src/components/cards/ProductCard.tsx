import { cn } from '@/lib/utils';
import { buttonVariants } from '../ui/button';

export interface ProductCardProps {
  imgSrc: string;
  alt: string;
  price: number;
  description: string;
  name: string;
  grade?: string;
}

export const ProductCard = ({ imgSrc, alt, price, name }: ProductCardProps) => {
  return (
    <div
      className={cn(
        buttonVariants({ variant: 'outline' }),
        'h-auto p-2 flex flex-col items-center justify-center text-xs shadow-sm cursor-pointer'
      )}
    >
      {/* {grade ? <Badge variant={'secondary'}>{grade} 등급</Badge> : null} */}
      <img
        src={imgSrc}
        alt={alt}
        className="p-2"
        onContextMenu={(e) => e.preventDefault()}
      />
      <div className="w-full flex flex-col items-center justify-between gap-1.5">
        <p className="w-full font-semibold truncate text-center">{name}</p>
        <p className="flex items-center gap-1 text-foreground/60">{price} 원</p>
      </div>
    </div>
  );
};
