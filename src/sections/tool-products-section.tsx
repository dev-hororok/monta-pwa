import { useCurrentMemberQuery } from '@/apis/queries/member-queries';
import { useShopConsumableItemsQuery } from '@/apis/queries/shop-queries';
import { ProductCard } from '@/components/cards/product-card';
import type { Item } from '@/models/item.model';
import { useModalStore } from '@/stores/use-modal-store';

const ToolProductsSection = () => {
  const {
    data: member,
    isPending: memberIdPending,
    isError: memberIsError,
  } = useCurrentMemberQuery();
  const {
    data: items,
    isPending: itemsIsPending,
    isError: itemsIsError,
  } = useShopConsumableItemsQuery();
  const openModal = useModalStore((state) => state.openModal);

  if (itemsIsPending || memberIdPending) {
    return (
      <div className="grid grid-cols-3 gap-2">
        <ProductCard.Skeleton />
        <ProductCard.Skeleton />
        <ProductCard.Skeleton />
      </div>
    );
  }

  if (itemsIsError || memberIsError) {
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
