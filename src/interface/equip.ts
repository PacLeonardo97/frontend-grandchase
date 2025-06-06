import type {
  ETypeEquips,
  EEquipSet,
  ERarityItem,
  ESTEquip,
} from '@/enum/equips.enum';

export interface IEquips {
  id?: number;
  type: ETypeEquips;
  equip_set?: EEquipSet;
  rarity?: ERarityItem;
  img?: string;
  st?: ESTEquip;
}
