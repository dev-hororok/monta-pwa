import { RequireLogin } from '@/components/require-login';

export const CharacterInventorySectionExample = () => {
  return (
    <section>
      <p className="font-semibold pb-4">캐릭터</p>
      <RequireLogin className="py-4" />
    </section>
  );
};
