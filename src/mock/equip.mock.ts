import {
  ETypeEquips,
  EEquipSet,
  ESTEquip,
  EEquipWeapon,
} from '@/enum/equips.enum';
import { getWeaponsByChar } from '@/helper/char';
import { IChar } from '@/interface/char';

export const equipsOptions = (type: ETypeEquips, char?: IChar) => {
  const qnttWeaponClasses = char?.name ? getWeaponsByChar(char.name) : null;
  const charName = char?.name.toLowerCase();

  const weapons = qnttWeaponClasses?.reduce<string[]>((acc, classChar) => {
    const equips = Object.values(ESTEquip).filter(
      (equip) => equip === classChar,
    );

    if (equips.length) {
      const entries = Object.values(EEquipWeapon).map(
        (equipSet) => `${charName}_${equips}_${equipSet}`,
      );
      acc.push(...entries);
    }

    return acc;
  }, []) as string[];

  return {
    helm: [
      EEquipSet.dragon,
      EEquipSet.pha_pho,
      EEquipSet.true_dragon,
      EEquipSet.void,
    ],
    top: [
      EEquipSet.dragon,
      EEquipSet.pha_pho,
      EEquipSet.true_dragon,
      EEquipSet.void,
    ],
    lower_armor: [
      EEquipSet.dragon,
      EEquipSet.pha_pho,
      EEquipSet.true_dragon,
      EEquipSet.void,
    ],
    gloves: [
      EEquipSet.dragon,
      EEquipSet.pha_pho,
      EEquipSet.true_dragon,
      EEquipSet.void,
    ],
    shoes: [
      EEquipSet.dragon,
      EEquipSet.pha_pho,
      EEquipSet.true_dragon,
      EEquipSet.void,
    ],
    cloak: [
      EEquipSet.dragon,
      EEquipSet.pha_pho,
      EEquipSet.true_dragon,
      EEquipSet.void,
    ],
    weapon_1: weapons,
    weapon_2: weapons,
    circlet: [
      EEquipSet.dragon,
      EEquipSet.pha_pho,
      EEquipSet.true_dragon,
      EEquipSet.void,
    ],
    mask: [EEquipSet.dragon, EEquipSet.true_dragon],
    wing: [
      EEquipSet.dragon,
      EEquipSet.pha_pho,
      EEquipSet.true_dragon,
      EEquipSet.void,
    ],
    stompers: [
      EEquipSet.dragon,
      EEquipSet.pha_pho,
      EEquipSet.true_dragon,
      EEquipSet.void,
    ],
    shield: [
      EEquipSet.dragon,
      EEquipSet.pha_pho,
      EEquipSet.true_dragon,
      EEquipSet.void,
    ],
    ring: [
      EEquipSet.dragon,
      EEquipSet.pha_pho,
      EEquipSet.true_dragon,
      EEquipSet.void,
    ],
    necklace: [
      EEquipSet.dragon,
      EEquipSet.pha_pho,
      EEquipSet.true_dragon,
      EEquipSet.void,
    ],
    anklet: [
      EEquipSet.tornozeleira_zoro,
      EEquipSet.tornozeleira_real,
      EEquipSet.tornozeleira_magica,
    ],
    earring1: [EEquipSet.pha_pho],
    earring2: [EEquipSet.pha_pho],
  }[type];
};
