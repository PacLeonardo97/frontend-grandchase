import type { IEquips } from './equip';
import { EChar, EClassChar } from '@/enum/char.enum';

export interface IChar {
  id?: number;
  name: EChar;
  total_points?: number;
  equips?: IEquips[];
  level?: number;
  total_atk?: number;
  attack?: number;
  def?: number;
  crit_chance?: number;
  hp?: number;
  crit_damage?: number;
  spec_attack?: number;
  spec_def?: number;
  rec_mp?: number;
  rec_hp?: number;
  exp?: number;
  back_attack?: number;
  class_char: EClassChar;
}
