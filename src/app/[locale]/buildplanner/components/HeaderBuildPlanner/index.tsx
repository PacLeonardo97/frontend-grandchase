'use client';

import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { Fragment, useEffect, useMemo, useState } from 'react';

import { Autocomplete, Box, CircularProgress } from '@mui/material';

import TextField from '@/components/Form/Textfield';
import { EChar, EClassChar } from '@/enum/char.enum';
import { getClassByChar } from '@/helper/char';
import { useLocalChageChar } from '@/hooks/allChars/localChangeChar';
import { useAllChars } from '@/hooks/allChars/useAllChars';
import { useCharByName } from '@/hooks/allChars/useCharByName';
import { useUpdateChar } from '@/hooks/allChars/useUpdateChar';
import type { IChar } from '@/interface/char';

export default function HeaderBuildPlanner() {
  const tChar = useTranslations('Char');

  const [isClient, setIsClient] = useState(false);
  const { mutate: updateLocalChar } = useLocalChageChar();
  const { mutate: updateChar } = useUpdateChar();

  const searchParams = useSearchParams();
  const { isLoading } = useAllChars();
  const router = useRouter();
  const charName = searchParams.get('charName') as string;

  const charByName = useCharByName();
  const charSelected = charByName(charName);

  const OptionClassChar = useMemo(() => {
    const classes = getClassByChar(charSelected?.name as EChar);
    if (charSelected?.name) {
      return classes.map((item) => ({
        value: item,
        label: tChar.raw(item),
      }));
    }
    return [];
  }, [charSelected?.name, tChar]);

  const handleChangeClass = (className: EClassChar) => {
    updateLocalChar({ name: charName, class_char: className } as IChar);
  };

  const allChar = useMemo(() => Object.keys(EChar), []);

  const handleChangeChar = async (name: string) => {
    router.replace(`buildplanner?charName=${name}`);
    updateChar({ name } as IChar);
  };

  useEffect(() => setIsClient(true), []);

  return (
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
  );
}
