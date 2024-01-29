import { ProductCard } from '@/components/cards/ProductCard';
import { dummyFoodProducts } from '@/mocks/shopProducts';

export const FoodProductsSection = () => {
  return (
    <section>
      <div className="grid grid-cols-3 gap-2">
        {dummyFoodProducts.map((item, idx) => {
          return (
            <ProductCard
              key={idx}
              imgSrc={item.image_url}
              alt={item.egg_id}
              price={item.purchase_price}
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
