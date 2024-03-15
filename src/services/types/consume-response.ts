interface PointBoxAcquisition {
  result: 'Point Box Acquisition'; // 개선 필요
  item: {
    description: string;
    item_id: number;
    item_name: string;
  };
}
interface CharacterAcquisition {
  result: 'Character Acquisition';
  character: {
    name: string;
    description: string;
    grade: string;
    character_id: number;
    image_url: string;
    sell_price: number;
  };
  character_inventory_id: number;
}

interface PaletteAcquisition {
  result: 'Palette Acquisition';
  palette: {
    grade: string;
    name: string;
    palette_id: number;
    light_color: string;
    normal_color: string;
    dark_color: string;
    darker_color: string;
  };
}

interface PointAcquisition {
  result: 'Point Acquisition';
  member: {
    point: number;
    member_id: string;
    earned_point: number;
  };
}

export type ConsumeItemResponseData =
  | PointBoxAcquisition
  | CharacterAcquisition
  | PaletteAcquisition
  | PointAcquisition;
