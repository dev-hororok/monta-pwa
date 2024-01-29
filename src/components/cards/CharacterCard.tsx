import { SunIcon } from '@radix-ui/react-icons';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface Props {
  imgSrc: string;
  alt: string;
  price: number;
  name: string;
  grade: string;
}

export const CharacterItemCard = ({
  imgSrc,
  alt,
  price,
  name,
  grade,
}: Props) => {
  return (
    <Button
      type="button"
      variant={'outline'}
      className="h-auto p-2 flex flex-col items-center justify-center text-xs shadow-sm"
    >
      <Badge variant={'secondary'}>{grade} 등급</Badge>
      <img src={imgSrc} alt={alt} width={200} height={200} className="p-3" />
      <div className="w-full flex flex-col items-center justify-between gap-1.5">
        <p className="w-full font-semibold truncate">{name}</p>
        <p className="flex items-center gap-1">
          <SunIcon className="w-3 h-3" />
          {price}
        </p>
      </div>
    </Button>
  );
};
