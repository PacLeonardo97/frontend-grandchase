'use client';

import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import { useCharByName } from '../allChars/useCharByName';
import { useUpdateChar } from '../allChars/useUpdateChar';
import { type EChar, type EClassChar } from '@/enum/char.enum';
import { getClassByChar } from '@/helper/char';
import type { IChar } from '@/interface/char';

export default function useBuildPlanner() {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const charName = searchParams.get('charName');
  const { mutate: updateChar } = useUpdateChar();
  const charSelect = useCharByName();

  const tChar = useTranslations('Char');

  const OptionClassChar = useMemo(() => {
    const ActualChar = charSelect(charName as string);
    const classes = getClassByChar(ActualChar?.name as EChar);
    if (ActualChar?.name) {
      return classes.map((item) => ({
        value: item,
        label: tChar.raw(item),
      }));
    }
    return [];
  }, [charName, charSelect, tChar]);

  const handleChangeLevel = async (level: number) => {
    updateChar({ name: charName, level } as IChar);
  };

  const handleChangeChar = async (name: string) => {
    router.replace(`buildplanner?charName=${name}`);
    updateChar({ name } as IChar);
  };

  const handleChangeClass = (className: EClassChar) => {
    updateChar({ name: charName, class_char: className } as IChar);
  };
  useEffect(() => setIsClient(true), []);

  return {
    OptionClassChar,
    handleChangeLevel,
    handleChangeChar,
    handleChangeClass,
    isClient,
  };
}
