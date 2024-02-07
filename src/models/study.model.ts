export interface IStudyCategory {
  study_category_id: string; // bigint라 string으로 옴
  subject: string;
}

export type StudyRecordStatusType = 'Completed' | 'Incompleted';

export interface IStudyRecord {
  study_record_id: string; // bigint라 string으로 옴
  start_time: number;
  end_time: Date;
  status: StudyRecordStatusType;
  study_category: IStudyCategory;
}
