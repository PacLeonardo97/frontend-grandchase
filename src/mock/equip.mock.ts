import { ETypeEquips, EEquipSet, ESTEquip } from '@/enum/equips.enum';
import { IChar } from '@/interface/char';

export const equipsOptions = (type: ETypeEquips, char?: IChar) => {
  const charName = char?.name.toLowerCase();
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
    weapon_1: [
      //   `${charName}_${ESTEquip.class_1}_${EEquipSet.dragon}`,
      //   `${charName}_${ESTEquip.class_2}_${EEquipSet.dragon}`,
      //   `${charName}_${ESTEquip.class_3}_${EEquipSet.dragon}`,
      //   `${charName}_${ESTEquip.class_4}_${EEquipSet.dragon}`,

      //   `${charName}_${ESTEquip.class_1}_${EEquipSet.pha_pho}`,
      //   `${charName}_${ESTEquip.class_2}_${EEquipSet.pha_pho}`,
      //   `${charName}_${ESTEquip.class_3}_${EEquipSet.pha_pho}`,
      //   `${charName}_${ESTEquip.class_4}_${EEquipSet.pha_pho}`,

      //   `${charName}_${ESTEquip.class_1}_${EEquipSet.true_dragon}`,
      //   `${charName}_${ESTEquip.class_2}_${EEquipSet.true_dragon}`,
      //   `${charName}_${ESTEquip.class_3}_${EEquipSet.true_dragon}`,
      //   `${charName}_${ESTEquip.class_4}_${EEquipSet.true_dragon}`,

      `${charName}_${ESTEquip.class_1}_${EEquipSet.void}`,
      `${charName}_${ESTEquip.class_2}_${EEquipSet.void}`,
      `${charName}_${ESTEquip.class_3}_${EEquipSet.void}`,
      `${charName}_${ESTEquip.class_4}_${EEquipSet.void}`,
    ],
    weapon_2: [
      //   `${charName}_${ESTEquip.class_1}_${EEquipSet.dragon}`,
      //   `${charName}_${ESTEquip.class_2}_${EEquipSet.dragon}`,
      //   `${charName}_${ESTEquip.class_3}_${EEquipSet.dragon}`,
      //   `${charName}_${ESTEquip.class_4}_${EEquipSet.dragon}`,

      //   `${charName}_${ESTEquip.class_1}_${EEquipSet.pha_pho}`,
      //   `${charName}_${ESTEquip.class_2}_${EEquipSet.pha_pho}`,
      //   `${charName}_${ESTEquip.class_3}_${EEquipSet.pha_pho}`,
      //   `${charName}_${ESTEquip.class_4}_${EEquipSet.pha_pho}`,

      //   `${charName}_${ESTEquip.class_1}_${EEquipSet.true_dragon}`,
      //   `${charName}_${ESTEquip.class_2}_${EEquipSet.true_dragon}`,
      //   `${charName}_${ESTEquip.class_3}_${EEquipSet.true_dragon}`,
      //   `${charName}_${ESTEquip.class_4}_${EEquipSet.true_dragon}`,

      `${charName}_${ESTEquip.class_1}_${EEquipSet.void}`,
      `${charName}_${ESTEquip.class_2}_${EEquipSet.void}`,
      `${charName}_${ESTEquip.class_3}_${EEquipSet.void}`,
      `${charName}_${ESTEquip.class_4}_${EEquipSet.void}`,
    ],
    circlet: [
      EEquipSet.dragon,
      EEquipSet.pha_pho,
      EEquipSet.true_dragon,
      EEquipSet.void,
    ],
    mask: [EEquipSet.dragon, EEquipSet.true_dragon, EEquipSet.void],
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
      EEquipSet.dragon,
      EEquipSet.pha_pho,
      EEquipSet.true_dragon,
      EEquipSet.void,
    ],
    earring1: [
      EEquipSet.dragon,
      EEquipSet.pha_pho,
      EEquipSet.true_dragon,
      EEquipSet.void,
    ],
    earring2: [
      EEquipSet.dragon,
      EEquipSet.pha_pho,
      EEquipSet.true_dragon,
      EEquipSet.void,
    ],
  }[type];
};
