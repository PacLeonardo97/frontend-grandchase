'use client';

import { useSearchParams } from 'next/navigation';

import { IChar } from '@/interface/char';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export const useCharByName = () => {
  const queryClient = useQueryClient();
  const charName = useSearchParams().get('charName') as string;

  return useQuery({
    queryKey: ['allChars'],
    queryFn: async () => {
      return queryClient.getQueryData<IChar[]>(['allChars']) as IChar[];
    },
    select: (allChars) => {
      return allChars?.find((char) => char.name === charName);
    },
    staleTime: 0,
    refetchOnMount: true,
    gcTime: 0,
    notifyOnChangeProps: 'all',
  });
};
