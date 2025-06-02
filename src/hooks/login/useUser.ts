'use client';
import type { IUserState } from '@/interface/user';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export const useUser = () => {
  const queryClient = useQueryClient();

  return useQuery<IUserState>({
    queryKey: ['user'],
    queryFn: async () => {
      return null as unknown as IUserState;
    },
    enabled: false, // evita chamada da queryFn
    initialData: () => queryClient.getQueryData<IUserState>(['user']),
    staleTime: Infinity,
  });
};
