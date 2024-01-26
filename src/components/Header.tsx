import useBoundStore from '@/stores/useBoundStore';

export const Header = () => {
  const member = useBoundStore().member;
  return (
    <div className="fixed top-0 left-0 right-0 md:absolute h-14 mt-safe rounded-t-md">
      {member ? member.nickname : 'Header'}
    </div>
  );
};
