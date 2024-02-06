import {
  useStudyRecordsQuery,
  useStudyStreakQuery,
} from '@/apis/queries/memberQueries';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { processStudyRecords } from '@/lib/study-records';
import { IMember } from '@/models/member.model';
import { CalendarSection } from '@/sections/myPage/CalendarSection';
import { StreakSection } from '@/sections/myPage/StreakSection';
import { useMemo } from 'react';

interface Props {
  member: IMember;
}

export const StudyRecordTabs = ({ member }: Props) => {
  const {
    data: records,
    isLoading: isRecordsLoading,
    isError: isRecordsError,
  } = useStudyRecordsQuery(member.member_id);
  const {
    data: streakInfo,
    isLoading: isStreakLoading,
    isError: isStreakError,
  } = useStudyStreakQuery(member.member_id);

  const heatMapData = useMemo(() => {
    return processStudyRecords(records || []);
  }, [records]);

  if (isRecordsLoading || isStreakLoading) {
    return <div>Loading...</div>;
  }
  if (isRecordsError || isStreakError) {
    return <div>Error</div>;
  }

  return (
    <Tabs defaultValue="calendar" className="w-full py-2 relative">
      <div className="sticky top-0 bg-background py-2">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="calendar">캘린더</TabsTrigger>
          <TabsTrigger value="streak">스트릭</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="calendar">
        <CalendarSection heatMapData={heatMapData} />
      </TabsContent>
      <TabsContent value="streak">
        <StreakSection
          streakInfo={streakInfo || null}
          heatMapData={heatMapData}
        />
      </TabsContent>
    </Tabs>
  );
};
