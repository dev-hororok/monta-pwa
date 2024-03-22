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
      <p
        className={cn(
          'text-base w-full text-center',
          !item.is_hidden && 'bg-amber-100'
        )}
      >
        {item.item_type === 'Food' ? '🐣' : '🛠️'} id: {item.item_id}
      </p>
      <img
        onContextMenu={(e) => e.preventDefault()} // 이미지 우클릭 방지
        src={item.image_url}
        alt={item.name}
        width={200}
        height={200}
        className="p-2"
      />
      <ItemInfo item={item} />
    </div>
  );
};

interface ItemInfoProps {
  item: IAdminItem;
}

const ItemInfo = ({ item }: ItemInfoProps) => (
  <div className="w-full gap-1.5 ">
    <p className="w-full font-semibold truncate text-center">{item.name}</p>
    <p className="text-foreground/60 text-center">{item.cost}원</p>
    <p className="w-full truncate text-center text-foreground/60">
      {item.description}
    </p>
    <p className="text-foreground text-center">효과: {item.effect_code}</p>
    {item.required_study_time ? (
      <p className="text-foreground text-center">
        먹이: {item.required_study_time / 60}분
      </p>
    ) : null}
    <p className="text-foreground/60 text-center">
      수정일: {formatDateStr(item.updated_at)}
    </p>
  </div>
);
