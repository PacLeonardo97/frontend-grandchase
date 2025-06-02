'use client';

import _ from 'lodash';

import api from '@/api';
import { EChar, EClassChar } from '@/enum/char.enum';
import { ETypeEquips } from '@/enum/equips.enum';
import { getPointsByChar } from '@/helper/char';
import type { IChar } from '@/interface/char';
import { IUserState } from '@/interface/user';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const equipDefault = Object.keys(ETypeEquips) as ETypeEquips[];

const initializeChars = Object.keys(EChar).map((name) => ({
  name: name as EChar,
  class_char: EClassChar.class_1,
  total_points_st: getPointsByChar(name as EChar).qnty,
  skills: {},
  equips: equipDefault.map((item) => ({
    type: item,
  })),
}));

export const useAllChars = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<IUserState>(['user']);

  return useQuery<IChar[]>({
    queryKey: ['allChars'],
    queryFn: async () => {
      const allChars = queryClient.getQueryData<IChar[]>(['allChars']);

      if (!user?.accessToken) return _.merge(initializeChars, allChars);
      const response = await api.get('/chars');
      return _.merge(initializeChars, response.data); // mesma lógica do redux
    },
    staleTime: Infinity,
  });
};
