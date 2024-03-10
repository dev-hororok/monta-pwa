import { useShopFoodItemsQuery } from '@/apis/queries/shop-queries';
import { ProductCard } from './product-card';
import type { IMember } from '@/models/member.model';
import { PurchaseItemDialog } from './purchase-item-dialog';

interface FoodProductsSectionProps {
  member: IMember;
}

export const FoodProductsSection = ({ member }: FoodProductsSectionProps) => {
  const {
    data: items,
    isPending: itemsIsPending,
    isError: itemsIsError,
  } = useShopFoodItemsQuery();

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

  return (
    <section>
      <div className="grid grid-cols-3 gap-2">
        {items.map((item, idx) => {
          return (
            <PurchaseItemDialog key={idx} item={item} member={member}>
              <ProductCard item={item} />
            </PurchaseItemDialog>
          );
        })}
      </div>
    </section>
  );
};
