'use client';

import { Fragment, useMemo } from 'react';

import { Box } from '@mui/material';

import CardEquip from '../CardEquip';
import styled from './styled.module.scss';
import Select from '@/components/Form/Select';
import TextField from '@/components/Form/Textfield';
import { ETypeEquips, sortEquip } from '@/enum/equips.enum';
import { createEmptyArray } from '@/helper/array';
import { capitalizeFirstLetter } from '@/helper/capitalize';
import { useLocalChageChar } from '@/hooks/allChars/localChangeChar';
import { useAllChars } from '@/hooks/allChars/useAllChars';
import { useCharByName } from '@/hooks/allChars/useCharByName';
import { useUpdateUser } from '@/hooks/user/updateUser';
import { useUser } from '@/hooks/user/useUser';
import type { IChar } from '@/interface/char';

const levelChar = createEmptyArray(85).map((item) => ({
  label: `${item}`,
  value: `${item}`,
}));

export default function CharLeft() {
  const { isLoading } = useAllChars();
  const { mutate: updateChar } = useLocalChageChar();
  const { data: user } = useUser();

  const { data: charSelected } = useCharByName();
  const { mutate: userMutate } = useUpdateUser();

  const imageUrl = useMemo(() => {
    return charSelected?.name
      ? `url(/char/${capitalizeFirstLetter(charSelected?.name || '')}_${
          charSelected.class_char
        }.webp)`
      : 'none';
  }, [charSelected]);

  const handleChangeLevel = async (level: number) => {
    updateChar({ name: charSelected?.name, level } as IChar);
  };

  const allEquips = useMemo(() => {
    return Object.keys(ETypeEquips) as ETypeEquips[];
  }, []);

  return (
    <Box
      padding={1}
      maxWidth={420}
      sx={(theme) => ({
        background: '#7B7575',
        maxWidth: 420,
        [theme.breakpoints.down('sm')]: {
          maxWidth: '100%',
        },
      })}
      maxHeight={536}
      borderRadius={1}
    >
      <div
        className={styled.containerSkills}
        style={{
          backgroundImage: imageUrl,
        }}
      >
        {sortEquip(allEquips).map((type) => (
          <Fragment key={type}>
            <CardEquip type={type as ETypeEquips} />
          </Fragment>
        ))}
      </div>
      <Box
        justifyContent="space-between"
        marginTop={2}
        sx={{ display: 'flex' }}
      >
        <Box width={80}>
          <Select
            disabled={!charSelected?.name}
            list={levelChar?.toReversed()}
            value={charSelected?.level || '1'}
            id="level_char"
            onChange={(e) => {
              handleChangeLevel(Number(e.target.value));
            }}
            label="Nivel"
          />
        </Box>

        <Box width={120}>
          <TextField
            disabled={isLoading}
            label="Nivel Chase"
            onChange={(e) => {
              userMutate({ user: { chaser_level: Number(e.target.value) } });
            }}
            value={user?.user.chaser_level ? user?.user.chaser_level : ''}
          />
        </Box>
      </Box>
    </Box>
  );
}
