import { useShopConsumableItemsQuery } from '@/apis/queries/shop-queries';
import { ProductCard } from '@/pages/shop/components/product-card';
import { useModalStore } from '@/stores/use-modal-store';
import type { Item } from '@/models/item.model';
import type { IMember } from '@/models/member.model';

interface ToolProductsSectionProps {
  member: IMember;
}

const ToolProductsSection = ({ member }: ToolProductsSectionProps) => {
  const {
    data: items,
    isPending: itemsIsPending,
    isError: itemsIsError,
  } = useShopConsumableItemsQuery();
  const openModal = useModalStore((state) => state.openModal);

  if (itemsIsPending) {
    return (
      <div className="grid grid-cols-3 gap-2">
        <ProductCard.Skeleton />
        <ProductCard.Skeleton />
        <ProductCard.Skeleton />
        <ProductCard.Skeleton />
        <ProductCard.Skeleton />
        <ProductCard.Skeleton />
      </div>
    );
  }

  if (itemsIsError) {
    return <div>Error</div>;
  }
  const openPurchaseModal = (item: Item) => {
    openModal('purchaseItem', { member, item });
  };
  return (
    <section>
      <div className="grid grid-cols-3 gap-2">
        {items.map((item, idx) => {
          return (
            <div key={idx} onClick={() => openPurchaseModal(item)}>
              <ProductCard item={item} />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ToolProductsSection;
