export interface IStudyCategory {
  study_category_id: string;
  subject: string;
}

export interface IStudyRecord {
  study_record_id: string;
  duration: number;
  created_at: Date;
  study_category: IStudyCategory;
}
