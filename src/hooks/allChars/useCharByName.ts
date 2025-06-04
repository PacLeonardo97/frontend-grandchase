'use client';

import { useSearchParams } from 'next/navigation';

import { waitForCacheRestore } from '@/helper/chacheRestore';
import { IChar } from '@/interface/char';
import { useCacheRestored } from '@/providers/tanstack';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export const useCharByName = () => {
  const queryClient = useQueryClient();
  const isRestored = useCacheRestored();
  const charName = useSearchParams().get('charName') as string;

  return useQuery({
    queryKey: ['allChars'],
    queryFn: async () => {
      await waitForCacheRestore(() => isRestored);
      return queryClient.getQueryData<IChar[]>(['allChars']) as IChar[];
    },
    select: (allChars) => {
      return allChars?.find((char) => char.name === charName);
    },
    enabled: isRestored, // só executa quando isRestored for true
    staleTime: 0,
    refetchOnMount: true,
    gcTime: 0,
    notifyOnChangeProps: 'all',
  });
};
