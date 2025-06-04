'use client';

import { useForm } from 'react-hook-form';

import { Typography } from '@mui/material';
import z from 'zod';

import TextField from '@/components/Form/Textfield';
import { useLocalChageChar } from '@/hooks/allChars/localChangeChar';
import { useCharByName } from '@/hooks/allChars/useCharByName';
import { schemaCharStatus } from '@/validation/charStatus';
import { zodResolver } from '@hookform/resolvers/zod';

export default function StatusChar() {
  const { data: charSelected } = useCharByName();

  const { mutate: updateLocalChar } = useLocalChageChar();

  const { register, handleSubmit } = useForm({
    resolver: zodResolver(schemaCharStatus),
  });

  const onSubmit = (data: z.infer<typeof schemaCharStatus>) => {
    console.log(data);
  };

  const onChange = (value: string, nameInput: string) => {
    updateLocalChar({ ...charSelected, [nameInput]: value });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        maxWidth: '300px',

        marginTop: 16,
      }}
    >
      <Typography variant="h3">Status</Typography>
      <Typography variant="h4">Atributos Principais</Typography>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 8,
          marginTop: 8,
        }}
      >
        <TextField
          value={charSelected?.total_atk ? charSelected.total_atk : ''}
          label="total_atk"
          {...register('total_atk')}
          onChange={(e) => {
            onChange(e.target.value, e.target.name);
          }}
        />
        <TextField
          value={charSelected?.attack ? charSelected.attack : ''}
          label="attack"
          {...register('attack')}
          onChange={(e) => {
            onChange(e.target.value, e.target.name);
          }}
        />
        <TextField
          value={charSelected?.def ? charSelected.def : ''}
          label="def"
          {...register('def')}
          onChange={(e) => {
            onChange(e.target.value, e.target.name);
          }}
        />
        <TextField
          value={charSelected?.crit_chance ? charSelected.crit_chance : ''}
          label="crit_chance"
          {...register('crit_chance')}
          onChange={(e) => {
            onChange(e.target.value, e.target.name);
          }}
        />
        <TextField
          value={charSelected?.hp ? charSelected.hp : ''}
          label="hp"
          {...register('hp')}
          onChange={(e) => {
            onChange(e.target.value, e.target.name);
          }}
        />
        <TextField
          value={charSelected?.crit_damage ? charSelected.crit_damage : ''}
          label="crit_damage"
          {...register('crit_damage')}
          onChange={(e) => {
            onChange(e.target.value, e.target.name);
          }}
        />
        <TextField
          value={charSelected?.spec_attack ? charSelected.spec_attack : ''}
          label="spec_attack"
          {...register('spec_attack')}
          onChange={(e) => {
            onChange(e.target.value, e.target.name);
          }}
        />
        <TextField
          value={charSelected?.spec_def ? charSelected.spec_def : ''}
          label="spec_def"
          {...register('spec_def')}
          onChange={(e) => {
            onChange(e.target.value, e.target.name);
          }}
        />
        <TextField
          value={charSelected?.rec_mp ? charSelected.rec_mp : ''}
          label="rec_mp"
          {...register('rec_mp')}
          onChange={(e) => {
            onChange(e.target.value, e.target.name);
          }}
        />
        <TextField
          value={charSelected?.rec_hp ? charSelected.rec_hp : ''}
          label="rec_hp"
          {...register('rec_hp')}
          onChange={(e) => {
            onChange(e.target.value, e.target.name);
          }}
        />
      </div>
    </form>
  );
}
