import { useShopFoodItemsQuery } from '@/services/queries/shop-queries';
import { ProductCard } from './product-card';
import { PurchaseItemDialog } from './purchase-item-dialog';
import { useRequireLogin } from '@/hooks/use-require-login';
import { useCurrentMemberQuery } from '@/services/queries/member-queries';
import { NetworkError } from '@/components/network-error';

export const FoodProductsSection = () => {
  const { data: member } = useCurrentMemberQuery();
  const { openRequireLoginModal } = useRequireLogin();
  const {
    data: items,
    isLoading: itemsIsLoading,
    isError: itemsIsError,
    refetch,
  } = useShopFoodItemsQuery();

  if (itemsIsLoading) {
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
    return <NetworkError onRefresh={() => refetch()} className="py-8" />;
  }

  return (
    <section>
      {items && items.length === 0 ? <EmptyFoodProductsMessage /> : null}
      <div className="grid grid-cols-3 gap-2">
        {items &&
          items.map((item, idx) => {
            return member ? (
              <PurchaseItemDialog key={idx} item={item} member={member}>
                <ProductCard item={item} />
              </PurchaseItemDialog>
            ) : (
              <div key={idx} onClick={openRequireLoginModal}>
                <ProductCard item={item} />
              </div>
            );
          })}
      </div>
    </section>
  );
};

const EmptyFoodProductsMessage = () => {
  return (
    <div className="flex-center flex-col py-12 gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-egg-off"
        width="44"
        height="44"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="#2c3e50"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M17.927 17.934c-1.211 1.858 -3.351 2.953 -5.927 3.066c-4.2 0 -7 -2.763 -7 -6.917c0 -2.568 .753 -5.14 1.91 -7.158" />
        <path d="M8.642 4.628c1.034 -1.02 2.196 -1.63 3.358 -1.628c3.5 .007 7 5.545 7 11.083c0 .298 -.015 .587 -.045 .868" />
        <path d="M3 3l18 18" />
      </svg>
      <p className="text-sm">파는 물건이 없닭!</p>
    </div>
  );
};
