import type { IMember } from '@/models/member.model';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CalendarSection from './calendar-section';
import StreakSection from './streak-section';

interface Props {
  member: IMember;
}

const StudyRecordTabs = ({ member }: Props) => {
  return (
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
  );
};

export default StudyRecordTabs;
