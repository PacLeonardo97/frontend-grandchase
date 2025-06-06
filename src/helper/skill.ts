import { EChar } from '@/enum/char.enum';
import type { ISkill, ICharSkills } from '@/interface/skill';
import { mockElesisSkill } from '@/mock/charsSkills.mock';

type SkillSectionData = Record<string, ISkill>;

export const canDecrementSkill = (
  skillName: string,
  sectionSkills: SkillSectionData,
  skillData: ISkill,
): boolean => {
  const current = parseInt(skillData.current);
  if (current <= 0) return false;

  const isBlocked = Object.entries(sectionSkills).some(([, s]) => {
    return s.dependsOn?.target === skillName && parseInt(s.current) > 0;
  });

  return !isBlocked;
};

export const canIncrementSkill = (
  sectionSkills: SkillSectionData,
  currentSkill: ISkill,
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

  const target = sectionSkills[currentSkill.dependsOn.target];
  return target?.current === currentSkill.dependsOn.value;
};

export function getTotalCurrent(skillsData: ICharSkills): number {
  if (!skillsData) return 0;

  return Object.values(skillsData)
    .flatMap((sections) =>
      Object.values(sections || {}).flatMap((skills) =>
        Object.values(skills || {}),
      ),
    )
    .reduce((total, skill) => {
      const current = Number(skill.current);
      const points = Number(skill.qnttyPoints);
      return total + current * points;
    }, 0);
}

export function getMockFromChar(char: EChar) {
  return {
    Elesis: mockElesisSkill,
    Lire: mockElesisSkill,
    Arme: mockElesisSkill,
    Lass: mockElesisSkill,
    Ryan: mockElesisSkill,
    Ronan: mockElesisSkill,
    Amy: mockElesisSkill,
    Jin: mockElesisSkill,
    Sieghart: mockElesisSkill,
    Mari: mockElesisSkill,
    Dio: mockElesisSkill,
    Zero: mockElesisSkill,
    Rey: mockElesisSkill,
    Lupus: mockElesisSkill,
    Lin: mockElesisSkill,
    Azin: mockElesisSkill,
    Holy: mockElesisSkill,
    Edel: mockElesisSkill,
    Veigas: mockElesisSkill,
    Decane: mockElesisSkill,
    AI: mockElesisSkill,
    Kallia: mockElesisSkill,
    Uno: mockElesisSkill,
  }[char];
}
