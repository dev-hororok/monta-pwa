export enum PaletteGrade {
  RARE = 'RARE',
  EPIC = 'EPIC',
  LEGENDARY = 'LEGENDARY',
}

export interface IPalette {
  palette_id: number;
  name: string;
  grade: PaletteGrade;
  light_color: string;
  normal_color: string;
  dark_color: string;
  darker_color: string;
}
