import { IStudyRecord } from '@/models/study.model';

interface Props {
  records: IStudyRecord[];
}

export const CalendarSection = ({ records }: Props) => {
  return (
    <section className="px-4">
      <p className="text-center text-sm font-bold pb-4">캘린더</p>
      <div className="grid grid-cols-4 gap-1">{records.length}</div>
    </section>
  );
};
