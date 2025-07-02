import type { EClassChar, ESkillsSection } from '@/enum/char.enum';

export interface ISkill {
  maxValue: string;
  qnttyPoints: string;
  current: string;
  img: string;
  order?: number;
  dependsOn?: {
    target: string;
    value: string;
  };
}

export type ICharSkills = {
  [className in EClassChar]?: {
    [skillSection in ESkillsSection]?: { [skillName: string]: ISkill };
  };
};
