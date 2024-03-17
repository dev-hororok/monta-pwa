import { RequireLogin } from '@/components/require-login';

export const ItemInventorySectionExample = () => {
  return (
    <section>
      <p className="font-semibold pb-4">사용 아이템</p>
      <RequireLogin className="py-4" />
    </section>
  );
};
