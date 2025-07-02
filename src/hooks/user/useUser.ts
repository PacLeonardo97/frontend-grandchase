'use client';

import type { IUserState } from '@/interface/user';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export const useUser = () => {
  const queryClient = useQueryClient();
  return useQuery<IUserState>({
    queryKey: ['user'],
    queryFn: async () => {
      const user = queryClient.getQueryData<IUserState>(['user']) as IUserState;

      return user || null;
    },
    staleTime: 0,
    notifyOnChangeProps: 'all',
  });
};
