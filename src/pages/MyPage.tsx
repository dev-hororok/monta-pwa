import { useCurrentMemberQuery } from '@/apis/queries/memberQueries';
import { MemberProfileSection } from '@/sections/myPage/MemberProfileSection';

export const MyPage = () => {
  const { data, isPending } = useCurrentMemberQuery();

  if (isPending || !data) {
    return 'Loading...';
  }

  return (
    <>
      <div className="rounded-t-md rounded-b-3xl pt-safe-offset-14 h-full pb-safe-offset-14">
        <main className="h-full overflow-y-scroll scrollbar-hide">
          <MemberProfileSection member={data} />
        </main>
      </div>
    </>
  );
};
