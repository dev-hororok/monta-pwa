import { useCurrentMemberQuery } from '@/queries/memberQueries';

export const Header = () => {
  const { data } = useCurrentMemberQuery();
  return (
    <div className="fixed top-0 left-0 right-0 md:absolute h-14 mt-safe rounded-t-md">
      {data ? data.nickname : 'Header'}
    </div>
  );
};
