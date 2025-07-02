import { ERarityColor, ERarityItem, ETypeEquips } from '@/enum/equips.enum';
import type { IChar } from '@/interface/char';
import type { IEquips } from '@/interface/equip';

function getOnlyWeapon(type: string) {
  const partes = type.split('_');
  return partes.slice(1).join('_');
}

function getOnlyType(str: string) {
  const idx = str.indexOf('weapon');
  if (idx !== -1) {
    return str.slice(idx, idx + 'weapon'.length);
  }
  return str;
}

export function getNameImage(equip: IEquips, char: IChar) {
  if (isWeapon(equip.type)) {
    return `${char.name}_${getOnlyType(equip.type)}_${getOnlyWeapon(
      equip.equip_set as string,
    )}`.toLowerCase();
  }
  if (equip.equip_set?.includes('dragon')) {
    return `${equip.type}_${equip.equip_set
      .replace(/_?true_?/g, '_')
      .replace(/^_+|_+$/g, '')}`;
  }
  return `${equip.type}_${equip.equip_set}`.toLowerCase();
}

export const getImageOptions = (img: string, type: ETypeEquips) => {
  if (isWeapon(type)) {
    const index = img.indexOf('_');

    return img.slice(0, index) + '_weapon' + img.slice(index);
  }
  if (img.includes('dragon')) {
    return `${type}_${img.replace(/_?true_?/g, '_').replace(/^_+|_+$/g, '')}`;
  }
  return `${type}_${img}`;
};

export const isWeapon = (type: ETypeEquips) => {
  return getOnlyType(type) === getOnlyType(ETypeEquips.weapon_1) ? true : false;
};

export function colorEquip(equip: IEquips) {
  if (equip.rarity) {
    return {
      [ERarityItem.ancient]: ERarityColor.ancient,
      [ERarityItem.common]: ERarityColor.common,
      [ERarityItem.epic]: ERarityColor.epic,
      [ERarityItem.rare]: ERarityColor.rare,
      [ERarityItem.relic]: ERarityColor.relic,
    }[equip.rarity];
  }
  return '';
}
