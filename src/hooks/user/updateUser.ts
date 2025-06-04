'use client';

import _ from 'lodash';

import { waitForCacheRestore } from '@/helper/chacheRestore';
import { IUser, IUserState } from '@/interface/user';
import { useCacheRestored } from '@/providers/tanstack';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface IUserMutate {
  accessToken?: string;
  refreshToken?: string;
  user?: Partial<IUser>;
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const isRestored = useCacheRestored();

  return useMutation({
    mutationKey: ['userChanges'],
    mutationFn: async (data: Partial<IUserMutate>): Promise<IUserState> => {
      await waitForCacheRestore(() => isRestored);
      return data as IUserState;
    },

    onSuccess: (mergeUser: IUserMutate) => {
      queryClient.setQueryData<IUserState>(['user'], (oldState) => {
        return _.merge(oldState, mergeUser);
      });
    },
  });
};
