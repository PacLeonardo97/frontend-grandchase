interface Icalculator {
  atack: string;
  defense: string;
  HP: string;
  specialAtaque: string;
  specialDefense: string;
  criticalChance: string;
  criticalDamage: string;
  recHp: string;
  recMp: string;
}

const formatNumber = (val: string) => Number(val.replace(/,/g, '.'));

const checkError = (values: number[]) =>
  values.every((v) => !isNaN(v) && v >= 0);

const calculateTotalDamage = ({
  atack,
  defense,
  HP,
  specialAtaque,
  specialDefense,
  criticalChance,
  criticalDamage,
  recHp,
  recMp,
}: Icalculator) => {
  const ATK = formatNumber(atack);
  const DEF = formatNumber(defense);
  const hp = formatNumber(HP);
  const sATK = formatNumber(specialAtaque);
  const sDEF = formatNumber(specialDefense);
  const crit_r = formatNumber(criticalChance) / 100;
  const crit_d = 1.2 + formatNumber(criticalDamage) / 100;
  const rec_HP = formatNumber(recHp);
  const rec_MP = formatNumber(recMp);

  const valores = [ATK, DEF, hp, sATK, sDEF, crit_r, crit_d, rec_HP, rec_MP];

  if (!checkError(valores)) {
    throw new Error('Reveja os valores inseridos');
  }

  // ofensivo
  const o1 = 0.8 * ATK;
  const o2 = (7407 / 125) * (ATK + sATK) * (100 + rec_MP) * 0.0001;
  const o3 = (o1 + o2) * (1 - crit_r + crit_r * crit_d);

  // defensivo
  const d1 = DEF * 0.7 + sDEF * 0.14;
  const d2 = (hp + (hp * rec_HP) / 100) * 0.7;
  const d3 = d1 + d2;

  const final_result = Math.round(o3 + d3);
  const estimateError = Math.round(0.000089 * (o3 + d3));

  return {
    final_result,
    estimateError,
  };
};

export default calculateTotalDamage;
