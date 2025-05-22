import type { IEquips } from './equip';

export interface IChar {
  id: number;
  documentId: string;
  name: string;
  level: number;
  total_atk: number;
  total_points: number;
  equips: IEquips[];
}
