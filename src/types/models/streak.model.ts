import { IPalette } from './palette.model';

export interface IStudyStreak {
  study_streak_id: number;
  current_streak: number;
  longest_streak: number;
  created_at: Date;
  updated_at: Date;
  palette: IPalette | null;
}
