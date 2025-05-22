'use client';

import { useEffect, Fragment, useMemo } from 'react';

import { CircularProgress } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

import CardEquip from './components/CardEquip';
import styled from './styled.module.scss';
import TextField from '@/components/Form/Textfield';
import Layout from '@/components/Layout';
import { EChar } from '@/enum/char.enum';
import { ETypeEquips, sortEquip } from '@/enum/equips.enum';
import { capitalizeFirstLetter } from '@/handler/capitalize';
import { fetchAllChars } from '@/store/allChar';
import {
  clearChar,
  createDefaultEquip,
  fetchChar,
  fetchCreateChar,
} from '@/store/char';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

export default function Page() {
  const dispatch = useAppDispatch();
  const chars = useAppSelector((state) => state.allChar);
  const charSelected = useAppSelector((state) => state.char);
  const allEquips = useMemo(() => {
    return Object.keys(ETypeEquips) as ETypeEquips[];
  }, []);
  const allChar = useMemo(() => Object.keys(EChar), []);

  useEffect(() => {
    (async () => {
      dispatch(fetchAllChars());
    })();
  }, [dispatch]);

  useEffect(() => {
    dispatch(clearChar());
    return () => {
      dispatch(clearChar());
    };
  }, [dispatch]);

  const handleChangeChar = async (name: string) => {
    dispatch(clearChar());
    const charClicked = chars.data?.find((item) => item.name === name);

    if (charClicked?.id) {
      await dispatch(fetchChar(charClicked?.id));
      return;
    }
    await dispatch(fetchCreateChar({ name }));
  };

  return (
    <Layout>
      <Autocomplete
        sx={{ width: 280, marginTop: '40px' }}
        disablePortal
        options={allChar}
        loading={chars.loading}
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
                    {chars.loading ? (
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

      <div
        className={styled.containerSkills}
        style={
          charSelected.data?.name
            ? {
                backgroundImage: `url(/${capitalizeFirstLetter(
                  charSelected.data?.name || 'Elesis',
                )}.png)`,
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
    </Layout>
  );
}
