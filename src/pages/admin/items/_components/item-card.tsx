import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { formatDateStr } from '@/lib/date-format';
import { IAdminItem } from '@/services/admin/types/item.model';

interface AdminItemCardProps {
  item: IAdminItem;
}

export const AdminItemCard = ({ item }: AdminItemCardProps) => {
  return (
    <div
      className={cn(
        buttonVariants({ variant: 'ghost' }),
        'w-full h-auto p-2 flex flex-col items-center justify-center text-xs shadow-sm cursor-pointer'
      )}
    >
      <p className="text-base">id: {item.item_id}</p>
      <img
        onContextMenu={(e) => e.preventDefault()} // 이미지 우클릭 방지
        src={item.image_url}
        alt={item.name}
        width={200}
        height={200}
        className="p-2"
      />
      <ItemInfo
        name={item.name}
        price={item.cost}
        updated_at={item.updated_at}
        description={item.description}
      />
    </div>
  );
};

interface ItemInfoProps {
  name: string;
  price: number;
  description: string;
  updated_at: Date | string;
}

const ItemInfo = ({ name, price, description, updated_at }: ItemInfoProps) => (
  <div className="w-full gap-1.5">
    <p className="w-full font-semibold truncate text-center">{name}</p>
    <p className="text-foreground/60 text-center">{price}원</p>
    <p className="w-full truncate text-center text-foreground/60">
      {description}
    </p>
    <p className="text-foreground/60 text-center">
      수정일: {formatDateStr(updated_at)}
    </p>
  </div>
);
