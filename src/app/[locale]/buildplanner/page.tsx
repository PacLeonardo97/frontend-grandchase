'use client';

import { useTranslations } from 'next-intl';
import { useEffect, Fragment, useMemo } from 'react';

import { Box, CircularProgress } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

import CardEquip from './components/CardEquip';
import SkillTree from './components/SkillTree';
import styled from './styled.module.scss';
import Select from '@/components/Form/Select';
import TextField from '@/components/Form/Textfield';
import { EChar, EClassChar } from '@/enum/char.enum';
import { ETypeEquips, sortEquip } from '@/enum/equips.enum';
import { createEmptyArray } from '@/handler/array';
import { capitalizeFirstLetter } from '@/handler/capitalize';
import { getClassByChar } from '@/handler/char';
import { IChar } from '@/interface/char';
import { changeDataByCharSelected, fetchAllChars } from '@/store/allChar';
import {
  clearChar,
  fetchChar,
  fetchCreateChar,
  updateChar,
} from '@/store/char';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

const levelChar = createEmptyArray(85).map((item) => ({
  label: `${item}`,
  value: `${item}`,
}));

export default function Page() {
  const dispatch = useAppDispatch();

  const allChars = useAppSelector((state) => state.allChar);
  const user = useAppSelector((state) => state.user);
  const charSelected = useAppSelector((state) => state.char);

  const allEquips = useMemo(() => {
    return Object.keys(ETypeEquips) as ETypeEquips[];
  }, []);
  const allChar = useMemo(() => Object.keys(EChar), []);

  const tChar = useTranslations('Char');

  const OptionClassChar = useMemo(() => {
    const classes = getClassByChar(charSelected.data?.name as EChar);
    if (charSelected.data?.name) {
      return classes.map((item) => ({
        value: item,
        label: tChar.raw(item),
      }));
    }
    return [];
  }, [charSelected.data, tChar]);

  const handleChangeLevel = async (level: number) => {
    const oldState = charSelected.data as IChar;
    dispatch(
      updateChar({
        ...oldState,
        level,
      }),
    );
  };

  useEffect(() => {
    dispatch(fetchAllChars());
  }, [dispatch]);

  useEffect(() => {
    dispatch(clearChar());
    return () => {
      dispatch(clearChar());
    };
  }, [dispatch]);

  const handleChangeChar = async (name: string) => {
    dispatch(clearChar());
    // await wait(0);
    const charClicked = allChars.data?.find(
      (item) => item.name === name,
    ) as IChar;

    if (charClicked?.name || !user.accessToken) {
      await dispatch(fetchChar(charClicked));
      return;
    }
    await dispatch(fetchCreateChar({ name }));
  };

  useEffect(() => {
    dispatch(changeDataByCharSelected(charSelected?.data as IChar));
  }, [charSelected?.data, dispatch]);

  const handleChangeClass = (className: EClassChar) => {
    const oldState = charSelected.data as IChar;
    dispatch(
      updateChar({
        ...oldState,
        class_char: className,
      }),
    );
  };

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
          loading={allChars.loading}
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
                      {allChars.loading ? (
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
            charSelected.data?.class_char
              ? {
                  label: tChar.raw(charSelected.data?.class_char as string),
                  value: charSelected.data?.class_char as string,
                }
              : { value: '', label: '' }
          }
          onChange={(_, value) => handleChangeClass(value?.value as EClassChar)}
          disableClearable
          options={OptionClassChar}
          disabled={!charSelected.data?.name}
          loading={allChars.loading}
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
                      {allChars.loading ? (
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
          borderRadius={1}
          sx={{ background: '#7B7575' }}
        >
          <div
            className={styled.containerSkills}
            style={
              charSelected.data?.name
                ? {
                    backgroundImage: `url(/char/${capitalizeFirstLetter(
                      charSelected.data?.name || 'Elesis',
                    )}_${charSelected.data?.class_char}.png)`,
                  }
                : {}
            }
          >
            {sortEquip(allEquips).map((equip) => (
              <Fragment key={equip}>
                <CardEquip
                  equip={charSelected.data?.equips?.find(
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
                disabled={!charSelected.data?.name}
                list={
                  charSelected.data?.name
                    ? levelChar
                    : [{ label: '1', value: '1' }]
                }
                value={charSelected.data?.level || '1'}
                id="level_char"
                onChange={(e) => {
                  handleChangeLevel(Number(e.target.value));
                }}
                label="Nivel"
              />
            </Box>

            <Box width={120}>
              <TextField label="Nivel Chase" value={user.data.chaser_level} />
            </Box>
          </Box>
        </Box>
        {charSelected.data.name ? <SkillTree /> : null}
      </Box>
    </>
  );
}
