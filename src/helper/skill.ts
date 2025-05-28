import { type ICharSkill } from '@/mock/charsSkills.mock';

type PersonagemData = Record<string, ICharSkill[0]>;

export const canDecrementSkill = (
  skillName: string,
  etapas: PersonagemData,
  etapa: ICharSkill[0],
): boolean => {
  const current = parseInt(etapa.current);
  if (current <= 0) return false;

  const isBlocked = Object.entries(etapas).some(([, e]) => {
    return e.dependsOn?.target === skillName && parseInt(e.current) > 0;
  });

  return !isBlocked;
};

export const canIncrementSkill = (
  allSkills: PersonagemData,
  currentSkill: ICharSkill[0],
  allPoints: number,
  currentAllPoints: number,
): boolean => {
  const current = Number(currentSkill.current);
  const max = Number(currentSkill.maxValue);
  const qnttyPointsToGet = currentAllPoints + Number(currentSkill.qnttyPoints);
  const canGetSkill =
    qnttyPointsToGet > allPoints && Number(currentSkill.qnttyPoints) > 0;

  if (current >= max || canGetSkill) {
    return false;
  }

  if (!currentSkill.dependsOn?.target) {
    return true;
  }
  const target = allSkills[currentSkill.dependsOn.target];
  return target?.current === currentSkill.dependsOn.value;
};

export function getTotalCurrent(skillsData: ICharSkill[]): number {
  return Object.values(skillsData)
    .flat()
    .reduce((total, skillGroup) => {
      return (
        total +
        Object.values(skillGroup).reduce(
          (sum, skill) =>
            sum + Number(skill.current) * Number(skill.qnttyPoints),
          0,
        )
      );
    }, 0);
}
