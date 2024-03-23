import { MobileLoadingSpinner } from '@/components/mobile-loading-spinner';
import { useParams } from 'react-router-dom';
import { PrevHeader } from '@/components/headers/prev-header';
import { Button } from '@/components/ui/button';
import { DeleteItemDialog } from '../_components/delete-item-dialog';
import { useAdminItemQuery } from '@/services/admin/items.queries';
import { EditItemDescriptionDialog } from '../_components/edit-item-description-dialog';
import { IAdminItem } from '@/services/admin/types/item.model';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { EditItemImageDialog } from '../_components/edit-item-image-dialog';
import { EditItemNameDialog } from '../_components/edit-item-name-dialog';
import { EditItemCostDialog } from '../_components/edit-item-cost-dialog';
import { EditItemRequiredTimeDialog } from '../_components/edit-item-required-time-dialog';
import { EditItemEffectCodeDialog } from '../_components/edit-item-effect-code-dialog';
import { EditItemIsHiddenDialog } from '../_components/edit-item-is-hidden-dialog';
import { EditItemTypeDialog } from '../_components/edit-item-type-dialog';

export const AdminItemPage = () => {
  const params = useParams<{ item_id: string }>();
  const {
    data: item,
    isLoading,
    isError,
  } = useAdminItemQuery(Number(params.item_id));

  if (isLoading) {
    return <MobileLoadingSpinner />;
  }
  if (isError) {
    return <div>Error</div>;
  }

  if (!item) {
    return (
      <div className="text-center text-lg">아이템을 찾을 수 없습니다.</div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center pt-safe-offset-14 pb-safe-offset-14">
      <main className="w-full h-full overflow-y-scroll scrollbar-hide pb-10 px-4">
        <PrevHeader
          to="/admin/items"
          title="캐릭터 수정/삭제"
          rightButton={
            <DeleteItemDialog item={item}>
              <Button
                variant="ghost"
                className="text-destructive hover:text-destructive"
              >
                삭제
              </Button>
            </DeleteItemDialog>
          }
        />

        <div className="w-full h-auto flex-center flex-col py-4 gap-4">
          <EditImageSection item={item} />
          <EditNameSection item={item} />
          <EditDescriptionSection item={item} />
          <EditCostSection item={item} />
          <EditEffectCodeSection item={item} />
          {item.item_type === 'Food' ? (
            <EditRequiredTimeSection item={item} />
          ) : null}
          <EditIsHiddenSection item={item} />
          <EditItemTypeSection item={item} />
        </div>
      </main>
    </div>
  );
};

interface EditComponentsProps {
  item: IAdminItem;
}
const EditImageSection = ({ item }: EditComponentsProps) => {
  return (
    <EditItemImageDialog item={item}>
      <Avatar className="w-40 h-40 hover:bg-accent cursor-pointer rounded-sm">
        <AvatarImage alt={item.name} src={item.image_url} />
      </Avatar>
    </EditItemImageDialog>
  );
};
const EditNameSection = ({ item }: EditComponentsProps) => {
  return (
    <EditItemNameDialog item={item}>
      <Button
        type="button"
        variant={'ghost'}
        className="text-xl font-bold antialiased"
      >
        {item.name}
      </Button>
    </EditItemNameDialog>
  );
};
const EditDescriptionSection = ({ item }: EditComponentsProps) => {
  return (
    <EditItemDescriptionDialog item={item}>
      <Button type="button" variant={'ghost'} className="text-lg font-normal">
        {item.description}
      </Button>
    </EditItemDescriptionDialog>
  );
};
const EditCostSection = ({ item }: EditComponentsProps) => {
  return (
    <EditItemCostDialog item={item}>
      <Button type="button" variant={'ghost'} className="text-lg font-normal">
        가격: {item.cost}
      </Button>
    </EditItemCostDialog>
  );
};
const EditRequiredTimeSection = ({ item }: EditComponentsProps) => {
  return (
    <EditItemRequiredTimeDialog item={item}>
      <Button type="button" variant={'ghost'} className="text-lg font-normal">
        먹이: {(item.required_study_time || 0) / 60}분
      </Button>
    </EditItemRequiredTimeDialog>
  );
};
const EditEffectCodeSection = ({ item }: EditComponentsProps) => {
  return (
    <EditItemEffectCodeDialog item={item}>
      <Button type="button" variant={'ghost'} className="text-lg font-normal">
        아이템 효과: {item.effect_code}
      </Button>
    </EditItemEffectCodeDialog>
  );
};
const EditIsHiddenSection = ({ item }: EditComponentsProps) => {
  return (
    <EditItemIsHiddenDialog item={item}>
      <Button type="button" variant={'ghost'} className="text-lg font-normal">
        상점 표시: {item.is_hidden ? '판매 X' : '판매중'}
      </Button>
    </EditItemIsHiddenDialog>
  );
};
const EditItemTypeSection = ({ item }: EditComponentsProps) => {
  return (
    <EditItemTypeDialog item={item}>
      <Button type="button" variant={'ghost'} className="text-lg font-normal">
        타입 {item.item_type === 'Food' ? '🐣' : '🛠️'}
      </Button>
    </EditItemTypeDialog>
  );
};
