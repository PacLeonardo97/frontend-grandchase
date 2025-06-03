import type { EClassChar } from '@/enum/char.enum';

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
  [className in EClassChar]?: { [skillName: string]: ISkill };
};
