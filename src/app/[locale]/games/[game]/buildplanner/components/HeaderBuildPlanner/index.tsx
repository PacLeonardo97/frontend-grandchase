'use client';

import { useTranslations } from 'next-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Fragment, useEffect, useMemo } from 'react';

import { Autocomplete, Box, Button, CircularProgress } from '@mui/material';

import TextField from '@/components/Form/Textfield';
import Image from '@/components/Image';
import { EChar, EClassChar } from '@/enum/char.enum';
import { getClassByChar } from '@/helper/char';
import { useLocalChageChar } from '@/hooks/allChars/localChangeChar';
import { useAllChars } from '@/hooks/allChars/useAllChars';
import { useCharByName } from '@/hooks/allChars/useCharByName';
import { useUpdateChar } from '@/hooks/allChars/useUpdateChar';
import { useUser } from '@/hooks/user/useUser';
import type { IChar } from '@/interface/char';

export default function HeaderBuildPlanner() {
  const tChar = useTranslations('Char');

  const { mutate: updateLocalChar } = useLocalChageChar();
  const { mutate: updateChar } = useUpdateChar();
  const { data: user } = useUser();
  const searchParams = useSearchParams();
  const { isLoading } = useAllChars();
  const { replace } = useRouter();
  const pathname = usePathname();
  const charName = searchParams.get('charName') as string;
  const { data: charSelected } = useCharByName();

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

  const handleChangeChar = (name: string) => {
    replace(`buildplanner?charName=${name}`);
  };

  useEffect(() => {
    if (!charName) {
      const params = new URLSearchParams(searchParams);
      params.set('charName', 'Elesis');
      replace(`${pathname}?${params.toString()}`);
    }
    if (charSelected?.name) {
      updateChar({ name: charName } as IChar);
    }
  }, [
    charSelected?.name,
    charName,
    updateChar,
    replace,
    searchParams,
    pathname,
  ]);

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
        value={charName || ''}
        loading={isLoading}
        disableClearable
        onChange={(_, value) => handleChangeChar(value as string)}
        renderOption={(props, option) => {
          const { key, ...optionProps } = props;

          return (
            <Box
              key={key}
              sx={{ '& > img': { mr: 1, flexShrink: 0 } }}
              component="li"
              {...optionProps}
            >
              <Image
                width={24}
                height={24}
                alt={option}
                src={`/char/miniatura/${option}.webp`}
              />
              {option}
            </Box>
          );
        }}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              label="Personagens"
              slotProps={{
                input: {
                  ...params.InputProps,
                  endAdornment: (
                    <Fragment>
                      {isLoading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </Fragment>
                  ),
                },
              }}
            />
          );
        }}
      />
      <Autocomplete
        sx={{ width: 216, marginLeft: '40px' }}
        value={
          charSelected?.class_char
            ? {
                label: tChar.raw(charSelected?.class_char as string),
                value: charSelected?.class_char as string,
              }
            : { value: '', label: '' }
        }
        onChange={(_, value) => handleChangeClass(value?.value as EClassChar)}
        disableClearable
        options={OptionClassChar}
        disabled={!charSelected?.name}
        loading={isLoading}
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
                    {isLoading ? (
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
      {user?.accessToken ? (
        <Button
          variant="contained"
          sx={(theme) => ({
            fontWeight: 700,
            marginLeft: 'auto',
            marginRight: theme.spacing(2),
          })}
        >
          Salvar tudo
        </Button>
      ) : null}
    </div>
  );
}
