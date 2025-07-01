'use client';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import FlashOnIcon from '@mui/icons-material/FlashOn';
import { Box, Typography } from '@mui/material';
import z from 'zod';

import TextField from '@/components/Form/Textfield';
import { useLocalChageChar } from '@/hooks/allChars/localChangeChar';
import { useCharByName } from '@/hooks/allChars/useCharByName';
import { schemaCharStatus } from '@/validation/charStatus';
import { zodResolver } from '@hookform/resolvers/zod';

export default function StatusChar() {
  const t = useTranslations('Status');
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
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={(theme) => ({
        backgroundColor: theme.palette.grey[800],
        width: '100%',
        marginRight: '16px',
        padding: '8px',
        borderRadius: '12px',
        height: 'fit-content',
        position: 'sticky',
        top: '10rem',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',

        [theme.breakpoints.down('sm')]: {
          marginRight: 0,
          position: 'relative',
          top: 0,
        },
      })}
    >
      <Typography variant="h3" marginBottom={2}>
        <FlashOnIcon />
        Distribuir Atributos
      </Typography>

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
          label={t.raw('total_atk')}
          {...register('total_atk')}
          type="number"
          onChange={(e) => {
            onChange(e.target.value, e.target.name);
          }}
        />
        <TextField
          value={charSelected?.attack ? charSelected.attack : ''}
          label={t.raw('attack')}
          type="number"
          {...register('attack')}
          onChange={(e) => {
            onChange(e.target.value, e.target.name);
          }}
        />
        <TextField
          value={charSelected?.def ? charSelected.def : ''}
          label={t.raw('def')}
          type="number"
          {...register('def')}
          onChange={(e) => {
            onChange(e.target.value, e.target.name);
          }}
        />
        <TextField
          value={charSelected?.crit_chance ? charSelected.crit_chance : ''}
          label={t.raw('crit_chance')}
          type="number"
          {...register('crit_chance')}
          onChange={(e) => {
            onChange(e.target.value, e.target.name);
          }}
        />
        <TextField
          value={charSelected?.hp ? charSelected.hp : ''}
          label={t.raw('hp')}
          type="number"
          {...register('hp')}
          onChange={(e) => {
            onChange(e.target.value, e.target.name);
          }}
        />
        <TextField
          value={charSelected?.crit_damage ? charSelected.crit_damage : ''}
          label={t.raw('crit_damage')}
          type="number"
          {...register('crit_damage')}
          onChange={(e) => {
            onChange(e.target.value, e.target.name);
          }}
        />
        <TextField
          value={charSelected?.spec_attack ? charSelected.spec_attack : ''}
          label={t.raw('spec_attack')}
          type="number"
          {...register('spec_attack')}
          onChange={(e) => {
            onChange(e.target.value, e.target.name);
          }}
        />
        <TextField
          value={charSelected?.spec_def ? charSelected.spec_def : ''}
          label={t.raw('spec_def')}
          type="number"
          {...register('spec_def')}
          onChange={(e) => {
            onChange(e.target.value, e.target.name);
          }}
        />
        <TextField
          value={charSelected?.rec_mp ? charSelected.rec_mp : ''}
          label={t.raw('rec_mp')}
          type="number"
          {...register('rec_mp')}
          onChange={(e) => {
            onChange(e.target.value, e.target.name);
          }}
        />
        <TextField
          value={charSelected?.rec_hp ? charSelected.rec_hp : ''}
          label={t.raw('rec_hp')}
          type="number"
          {...register('rec_hp')}
          onChange={(e) => {
            onChange(e.target.value, e.target.name);
          }}
        />
      </div>
    </Box>
  );
}
