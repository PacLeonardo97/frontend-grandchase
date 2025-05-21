import type { ETypeEquips, EEquipSet, ERarityItem } from '@/enum/equips.enum';

export interface IEquips {
  id: number;
  type: ETypeEquips;
  equip_set: EEquipSet;
  rarity: ERarityItem;
}
