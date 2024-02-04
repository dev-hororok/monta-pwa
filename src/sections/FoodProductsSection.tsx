import { useShopFoodItemsQuery } from '@/apis/queries/shopQueries';
import { ProductCard } from '@/components/cards/ProductCard';

export const FoodProductsSection = () => {
  const { data: items, isPending, isError } = useShopFoodItemsQuery();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <section>
      <div className="grid grid-cols-3 gap-2">
        {items.map((item, idx) => {
          return (
            <ProductCard
              key={idx}
              imgSrc={item.image_url}
              alt={item.name}
              price={item.cost}
              name={item.name}
              description={item.description}
              grade={item.grade}
            />
          );
        })}
      </div>
    </section>
  );
};
