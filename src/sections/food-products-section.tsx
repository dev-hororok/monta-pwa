import { useCurrentMemberQuery } from '@/apis/queries/memberQueries';
import { useShopFoodItemsQuery } from '@/apis/queries/shopQueries';
import ProductCard from '@/components/cards/product-card';
import { Item } from '@/models/item.model';
import { useModalStore } from '@/stores/use-modal-store';

const FoodProductsSection = () => {
  const {
    data: member,
    isPending: memberIdPending,
    isError: memberIsError,
  } = useCurrentMemberQuery();
  const {
    data: items,
    isPending: itemsIsPending,
    isError: itemsIsError,
  } = useShopFoodItemsQuery();
  const openModal = useModalStore((state) => state.openModal);

  if (itemsIsPending || memberIdPending) {
    return <div>Loading...</div>;
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

export default FoodProductsSection;
