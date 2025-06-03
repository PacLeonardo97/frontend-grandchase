'use client';

import { waitForCacheRestore } from '@/helper/chacheRestore';
import type { IUserState } from '@/interface/user';
import { useCacheRestored } from '@/providers/tanstack';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export const useUser = () => {
  const queryClient = useQueryClient();
  const isRestored = useCacheRestored();
  return useQuery<IUserState>({
    queryKey: ['user'],
    queryFn: async () => {
      await waitForCacheRestore(() => isRestored);
      const user = queryClient.getQueryData<IUserState>(['user']) as IUserState;

      return user || null;
    },
    enabled: isRestored, // só executa quando isRestored for true
    staleTime: 0,
  });
};
