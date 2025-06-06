'use client';

import _ from 'lodash';

import { IUser, IUserState } from '@/interface/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface IUserMutate {
  accessToken?: string;
  refreshToken?: string;
  user?: Partial<IUser>;
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['userChanges'],
    mutationFn: async (data: Partial<IUserMutate>): Promise<IUserState> => {
      return data as IUserState;
    },

    onSuccess: (mergeUser: IUserMutate) => {
      queryClient.setQueryData<IUserState>(['user'], (oldState) => {
        return _.merge(oldState, mergeUser);
      });
    },
  });
};
