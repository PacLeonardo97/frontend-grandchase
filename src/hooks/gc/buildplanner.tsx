import { useTranslations } from 'next-intl';
import { useEffect, useMemo } from 'react';

import { type EChar, type EClassChar } from '@/enum/char.enum';
import { getClassByChar } from '@/helper/char';
import type { IChar } from '@/interface/char';
import { changeDataByCharSelected, fetchAllChars } from '@/store/allChar';
import {
  clearChar,
  fetchChar,
  fetchCreateChar,
  updateChar,
} from '@/store/char';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

export default function useBuildPlanner() {
  const dispatch = useAppDispatch();
  const allChars = useAppSelector((state) => state.allChar);
  const charSelected = useAppSelector((state) => state.char);
  const user = useAppSelector((state) => state.user);

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

  const handleChangeChar = async (name: string) => {
    dispatch(clearChar());

    const charClicked = allChars.data?.find(
      (item) => item.name === name,
    ) as IChar;

    if (!charClicked?.id && user.accessToken) {
      await dispatch(fetchCreateChar({ name }));
      return;
    }
    if (charClicked?.name || !user.accessToken) {
      await dispatch(fetchChar(charClicked));
    }
  };

  const handleChangeClass = (className: EClassChar) => {
    const oldState = charSelected.data as IChar;
    dispatch(
      updateChar({
        ...oldState,
        class_char: className,
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

  useEffect(() => {
    dispatch(changeDataByCharSelected(charSelected?.data as IChar));
  }, [charSelected?.data, dispatch]);

  return {
    OptionClassChar,
    handleChangeLevel,
    handleChangeChar,
    handleChangeClass,
  };
}
