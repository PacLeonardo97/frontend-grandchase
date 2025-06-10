import {
  ETypeEquips,
  EEquipSet,
  ESTEquip,
  EEquipWeapon,
  ERarityItem,
} from '@/enum/equips.enum';
import { getWeaponsByChar } from '@/helper/char';
import { IChar } from '@/interface/char';

interface IEquipLocal {
  name: string;
  rarity: string;
}

const earring = [{ name: EEquipSet.pha_pho, rarity: ERarityItem.relic }];

const defaultEquip = [
  { name: EEquipSet.dragon, rarity: ERarityItem.epic },
  { name: EEquipSet.pha_pho, rarity: ERarityItem.epic },
  { name: EEquipSet.true_dragon, rarity: ERarityItem.relic },
  { name: EEquipSet.void, rarity: ERarityItem.ancient },
];

const defaultAcessories = [
  { name: EEquipSet.dragon, rarity: ERarityItem.epic },
  { name: EEquipSet.pha_pho, rarity: ERarityItem.epic },
  { name: EEquipSet.true_dragon, rarity: ERarityItem.relic },
];

export const equipsOptions = (type: ETypeEquips, char?: IChar) => {
  const qnttWeaponClasses = char?.name ? getWeaponsByChar(char.name) : null;
  const charName = char?.name.toLowerCase();

  const weapons = qnttWeaponClasses?.reduce<IEquipLocal[]>((acc, classChar) => {
    const equips = Object.values(ESTEquip).filter(
      (equip) => equip === classChar,
    );

    if (equips.length) {
      const entries = Object.values(EEquipWeapon).map((equipSet) => {
        const rarity = {
          [EEquipSet.dragon]: ERarityItem.epic,
          [EEquipSet.pha_pho]: ERarityItem.epic,
          [EEquipSet.true_dragon]: ERarityItem.relic,
          [EEquipSet.void]: ERarityItem.ancient,
        }[equipSet];

        return {
          name: `${charName}_${equips}_${equipSet}`,
          rarity,
        };
      });
      acc.push(...entries);
    }

    return acc;
  }, []) as IEquipLocal[];

  return {
    helm: defaultEquip,
    top: defaultEquip,
    lower_armor: defaultEquip,
    gloves: defaultEquip,
    shoes: defaultEquip,
    cloak: defaultEquip,
    weapon_1: weapons,
    weapon_2: weapons,
    circlet: defaultAcessories,
    mask: [EEquipSet.dragon, EEquipSet.true_dragon],
    wing: defaultAcessories,
    stompers: defaultAcessories,
    shield: defaultAcessories,
    ring: defaultAcessories,
    necklace: [
      { name: EEquipSet.black_dragon_blue, rarity: ERarityItem.relic },
      { name: EEquipSet.black_dragon_red, rarity: ERarityItem.relic },
      { name: EEquipSet.death, rarity: ERarityItem.epic },
      { name: EEquipSet.destiny, rarity: ERarityItem.epic },
      { name: EEquipSet.fire, rarity: ERarityItem.epic },
      { name: EEquipSet.grand_chase, rarity: ERarityItem.epic },
      { name: EEquipSet.halloween, rarity: ERarityItem.epic },
      { name: EEquipSet.heart, rarity: ERarityItem.epic },
      { name: EEquipSet.ice, rarity: ERarityItem.epic },
      { name: EEquipSet.lifeblood, rarity: ERarityItem.epic },
      { name: EEquipSet.light, rarity: ERarityItem.epic },
      { name: EEquipSet.lightning, rarity: ERarityItem.epic },
      { name: EEquipSet.rose, rarity: ERarityItem.epic },
      { name: EEquipSet.shadow, rarity: ERarityItem.epic },
      { name: EEquipSet.unicorn, rarity: ERarityItem.epic },
      { name: EEquipSet.wind, rarity: ERarityItem.common },
    ],
    anklet: defaultAcessories,
    earring1: earring,
    earring2: earring,
  }[type] as unknown as IEquipLocal[];
};
