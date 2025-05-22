export enum ETypeEquips {
  helm = 'helm',
  top = 'top',
  lower_armor = 'lower_armor',
  gloves = 'gloves',
  shoes = 'shoes',
  cloak = 'cloak',
  weapon_j1 = 'weapon_j1',
  weapon_j2 = 'weapon_j2',
  circlet = 'circlet',
  mask = 'mask',
  wing = 'wing',
  stompers = 'stompers',
  shield = 'shield',
  ring = 'ring',
  necklace = 'necklace',
  anklet = 'anklet',
  earring1 = 'earring1',
  earring2 = 'earring2',
}

export function sortEquip(list: string[]) {
  return [
    'helm',
    'weapon_j1',
    'weapon_j2',
    'top',
    'circlet',
    'ring',
    'lower_armor',
    'mask',
    'necklace',
    'gloves',
    'wing',
    'anklet',
    'shoes',
    'stompers',
    'earring1',
    'cloak',
    'shield',
    'earring2',
  ].filter((item) => list.includes(item));
}

export enum ERarityItem {
  common = 'common',
  rare = 'rare',
  epic = 'epic',
  relic = 'relic',
  ancient = 'ancient',
}

export enum EEquipSet {
  pha_pho = 'pha_pho',
  true_dragon = 'true_dragon',
  dragon = 'dragon',
  void = 'void',
}
