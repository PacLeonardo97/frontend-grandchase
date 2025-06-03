'use client';

import { IChar } from '@/interface/char';
import { useQueryClient } from '@tanstack/react-query';

export const useCharByName = () => {
  const queryClient = useQueryClient();
  return (name: string) => {
    const allChars = queryClient.getQueryData<IChar[]>(['allChars']);
    return allChars?.find((char) => char.name === name);
  };
};
