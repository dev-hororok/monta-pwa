import { useCurrentMemberQuery } from '@/services/queries/member-queries';
import { MyPageHeader } from '@/pages/my/_components/my-page-header';
import { MobileLoadingSpinner } from '@/components/mobile-loading-spinner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProfileSection } from './_components/profile-section';
import { CalendarSection } from './_components/calendar-section';
import { StreakSection } from './_components/streak-section';
import { SummarySection } from './_components/summary-section';

const MyPage = () => {
  const { data: member, isPending, isError } = useCurrentMemberQuery();

  if (isPending) {
    return <MobileLoadingSpinner />;
  }
  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div className="h-full pt-safe-offset-14 pb-safe-offset-14">
      <MyPageHeader />
      <main className="h-full overflow-y-scroll scrollbar-hide px-4">
        <ProfileSection member={member} />
        <SummarySection memberId={member.member_id} />
        <Tabs defaultValue="calendar" className="w-full py-2 relative">
          <div className="sticky top-0 bg-background py-2 z-40">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="calendar">캘린더</TabsTrigger>
              <TabsTrigger value="streak">스트릭</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="calendar">
            <CalendarSection memberId={member.member_id} />
          </TabsContent>
          <TabsContent value="streak">
            <StreakSection memberId={member.member_id} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default MyPage;
