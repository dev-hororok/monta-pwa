export interface IStudyCategory {
  study_category_id: number;
  subject: string;
}

export interface IStudyRecord {
  study_record_id: number;
  duration: number;
  created_at: Date;
  study_category: IStudyCategory;
}
