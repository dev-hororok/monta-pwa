import { useCurrentMemberQuery } from '@/queries/memberQueries';

export const Inventory = () => {
  const { data } = useCurrentMemberQuery();
  return <div>{data?.role}</div>;
};
