import { ProductCard } from '@/components/cards/ProductCard';
import { dummyToolProducts } from '@/mocks/shopProducts';

export const ToolProductsSection = () => {
  return (
    <section>
      <div className="grid grid-cols-3 gap-2">
        {dummyToolProducts.map((item, idx) => {
          return (
            <ProductCard
              key={idx}
              imgSrc={item.imgSrc}
              alt={item.alt}
              price={item.price}
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
