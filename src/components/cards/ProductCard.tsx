import { Button } from '../ui/button';

export interface ProductCardProps {
  imgSrc: string;
  alt: string;
  price: number;
  description: string;
  name: string;
  grade?: string;
}

export const ProductCard = ({
  imgSrc,
  alt,
  price,
  name,
}: // description,
// grade,
ProductCardProps) => {
  return (
    <Button
      type="button"
      variant={'outline'}
      className="h-auto p-2 flex flex-col items-center justify-center text-xs shadow-sm"
    >
      {/* {grade ? <Badge variant={'secondary'}>{grade} 등급</Badge> : null} */}
      <img src={imgSrc} alt={alt} className="p-2" />
      <div className="w-full flex flex-col items-center justify-between gap-1.5">
        <p className="w-full font-semibold truncate">{name}</p>
        <p className="flex items-center gap-1 text-foreground/60">{price} 원</p>
      </div>
    </Button>
  );
};
