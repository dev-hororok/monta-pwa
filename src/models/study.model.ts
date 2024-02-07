export interface IStudyCategory {
  study_category_id: string; // bigint라 string으로 옴
  subject: string;
}

export type StudyRecordType = 'Completed' | 'Incompleted';

export interface IStudyRecord {
  study_record_id: string; // bigint라 string으로 옴
  start_time: number;
  end_time: Date;
  status: StudyRecordType;
  study_category: IStudyCategory;
}
