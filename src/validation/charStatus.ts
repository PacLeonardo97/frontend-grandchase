import z from 'zod';

export const schemaCharStatus = z.object({
  total_atk: z.string(),
  total_points_st: z.string(),
  attack: z.string(),
  def: z.string(),
  crit_chance: z.string(),
  hp: z.string(),
  crit_damage: z.string(),
  spec_attack: z.string(),
  spec_def: z.string(),
  rec_mp: z.string(),
  rec_hp: z.string(),
});
