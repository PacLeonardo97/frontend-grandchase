'use client';

import { useEffect, Fragment, useMemo } from 'react';

import { CircularProgress } from '@mui/material';
import { IconButton } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

import api from '@/api';
import TextField from '@/components/Form/Textfield';
import Layout from '@/components/Layout';
import { EChar } from '@/enum/char.enum';
import { ETypeEquips } from '@/enum/equips.enum';
import type { IChar } from '@/interface/char';
import { fetchAllChars } from '@/store/allChar';
import { fetchChar } from '@/store/char';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

export default function Page() {
  const dispatch = useAppDispatch();
  const chars = useAppSelector((state) => state.allChar);
  const charSelected = useAppSelector((state) => state.char);
  const allEquips = useMemo(() => {
    return Object.keys(ETypeEquips);
  }, []);
  const allChar = useMemo(() => Object.keys(EChar), []);

  // const charNotEnabled = useMemo(() => {
  //   const qntty = chars.data?.map((item) => item.name);
  //   return allChar.filter((char) => !qntty?.includes(char));
  // }, [chars, allChar]);

  useEffect(() => {
    (async () => {
      dispatch(fetchAllChars());
    })();
  }, [dispatch]);

  const handleChangeChar = async (name: string | null) => {
    const charClicked = chars.data?.find((item) => item.name === name);
    if (charClicked?.id) {
      await dispatch(fetchChar(charClicked?.id));
    }
  };

  return (
    <Layout>
      <IconButton onMouseOver={(e) => console.log(e)}>caralho</IconButton>
      <Autocomplete
        sx={{ width: 280, marginTop: '40px' }}
        disablePortal
        options={allChar}
        // getOptionLabel={(option) => option.name}
        loading={chars.loading}
        onChange={(_, value) => handleChangeChar(value)}
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
      {allEquips.map((equip) => (
        <div key={equip}>
          <div>
            {equip}:{' '}
            {charSelected.data?.equips?.find((item) => item.type === equip)
              ? 'tem'
              : 'não'}
          </div>
        </div>
      ))}
    </Layout>
  );
}
