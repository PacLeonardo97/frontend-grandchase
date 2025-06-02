'use client';

import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { Fragment, useMemo } from 'react';

import { Box, CircularProgress } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

import CardEquip from './components/CardEquip';
import SkillTree from './components/SkillTree';
import styled from './styled.module.scss';
import Select from '@/components/Form/Select';
import TextField from '@/components/Form/Textfield';
import { EChar, EClassChar } from '@/enum/char.enum';
import { ETypeEquips, sortEquip } from '@/enum/equips.enum';
import { createEmptyArray } from '@/helper/array';
import { capitalizeFirstLetter } from '@/helper/capitalize';
import { useAllChars } from '@/hooks/allChars/useAllChars';
import { useCharByName } from '@/hooks/allChars/useCharByName';
import useBuildPlanner from '@/hooks/gc/buildplanner';
import { useUser } from '@/hooks/login/useUser';

const levelChar = createEmptyArray(85).map((item) => ({
  label: `${item}`,
  value: `${item}`,
}));

export default function Page() {
  const tChar = useTranslations('Char');

  const {
    OptionClassChar,
    handleChangeLevel,
    handleChangeChar,
    handleChangeClass,
    isClient,
  } = useBuildPlanner();

  const { isLoading } = useAllChars();
  const { data: user } = useUser();
  const searchParams = useSearchParams();
  const charName = searchParams.get('charName') as string;
  const charByName = useCharByName();
  const charSelected = charByName(charName);

  const allEquips = useMemo(() => {
    return Object.keys(ETypeEquips) as ETypeEquips[];
  }, []);
  const allChar = useMemo(() => Object.keys(EChar), []);

  return (
    <>
      <div
        style={{
          display: 'flex',
          gap: 24,
          marginTop: 40,
          marginBottom: '16px',
        }}
      >
        <Autocomplete
          sx={{ width: 140 }}
          options={allChar}
          value={(isClient && charName) || ''}
          loading={isClient && isLoading}
          disableClearable
          onChange={(_, value) => handleChangeChar(value as string)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Personagens"
              slotProps={{
                input: {
                  ...params.InputProps,
                  endAdornment: (
                    <Fragment>
                      {isClient && isLoading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </Fragment>
                  ),
                },
              }}
            />
          )}
        />
        <Autocomplete
          sx={{ width: 216, marginLeft: '40px' }}
          value={
            isClient && charSelected?.class_char
              ? {
                  label: tChar.raw(charSelected?.class_char as string),
                  value: charSelected?.class_char as string,
                }
              : { value: '', label: '' }
          }
          onChange={(_, value) => handleChangeClass(value?.value as EClassChar)}
          disableClearable
          options={isClient ? OptionClassChar : []}
          disabled={isClient && !charSelected?.name}
          loading={isClient && isLoading}
          renderOption={(props, option) => {
            const { key, ...optionProps } = props;

            return (
              <Box
                key={key}
                component="li"
                sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                {...optionProps}
              >
                {option.label}
              </Box>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Classe"
              slotProps={{
                input: {
                  ...params.InputProps,
                  endAdornment: (
                    <Fragment>
                      {isClient && isLoading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </Fragment>
                  ),
                },
              }}
            />
          )}
        />
      </div>
      <Box sx={{ display: 'flex', gap: '16px' }}>
        <Box
          padding={1}
          maxWidth={420}
          maxHeight={536}
          borderRadius={1}
          sx={{ background: '#7B7575' }}
        >
          <div
            className={styled.containerSkills}
            style={{
              backgroundImage:
                isClient && charSelected?.name
                  ? `url(/char/${capitalizeFirstLetter(
                      charSelected?.name || '',
                    )}_${charSelected?.class_char}.webp)`
                  : 'none',
            }}
          >
            {sortEquip(allEquips).map((equip) => (
              <Fragment key={equip}>
                <CardEquip
                  equip={charSelected?.equips?.find(
                    (item) => item.type === equip,
                  )}
                  type={equip as ETypeEquips}
                />
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
                disabled={isClient && !charSelected?.name}
                list={levelChar}
                value={(isClient && charSelected?.level) || '1'}
                id="level_char"
                onChange={(e) => {
                  handleChangeLevel(Number(e.target.value));
                }}
                label="Nivel"
              />
            </Box>

            <Box width={120}>
              <TextField label="Nivel Chase" value={user?.user?.chaser_level} />
            </Box>
          </Box>
        </Box>
        {isClient ? <SkillTree /> : null}
      </Box>
    </>
  );
}
