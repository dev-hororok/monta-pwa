import { useCurrentMemberQuery } from '@/queries/memberQueries';

export const Home = () => {
  const { data, isPending } = useCurrentMemberQuery();

  if (isPending) {
    console.log('Pending');
    return 'Loading...';
  }

  return <div>{data?.email}</div>;
};
