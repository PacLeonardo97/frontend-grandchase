'use client';

import _ from 'lodash';

import { useUser } from '../user/useUser';
import api from '@/api';
import { EChar, EClassChar } from '@/enum/char.enum';
import { ETypeEquips } from '@/enum/equips.enum';
import { getPointsByChar } from '@/helper/char';
import type { IChar } from '@/interface/char';
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
  const { data: user, isPending } = useUser();

  return useQuery<IChar[]>({
    queryKey: ['allChars'],
    queryFn: async () => {
      try {
        const allChars = queryClient.getQueryData<IChar[]>(['allChars']);
        const data = _.merge(initializeChars, allChars);
        if (!user?.accessToken) return data;
        const response = await api.get('/chars');
        return _.merge(response.data, data);
      } catch {
        queryClient.invalidateQueries({ queryKey: ['allChars'] });
      }
    },
    enabled: !isPending,
    staleTime: 0,
  });
};
