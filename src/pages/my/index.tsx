import { useCurrentMemberQuery } from '@/apis/queries/member-queries';
import MyPageHeader from '@/components/headers/my-page-header';
import { MobileLoadingSpinner } from '@/components/mobile-loading-spinner';
import MemberProfileSection from '@/sections/myPage/member-profile-section';
import StudyRecordTabs from '@/sections/myPage/study-record-tabs';

const MyPage = () => {
  const { data, isPending, isError } = useCurrentMemberQuery();

  if (isPending) {
    return <MobileLoadingSpinner />;
  }
  if (isError) {
    return <div>Error</div>;
  }

  return (
    <>
      <div className="rounded-t-md rounded-b-3xl pt-safe-offset-14 h-full pb-safe-offset-14">
        <MyPageHeader />
        <main className="h-full overflow-y-scroll scrollbar-hide px-4">
          <MemberProfileSection member={data} />
          <StudyRecordTabs member={data} />
        </main>
      </div>
    </>
  );
};

export default MyPage;
