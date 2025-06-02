'use client';

import _ from 'lodash';

import api from '@/api';
import { getMockFromChar } from '@/helper/skill';
import { IChar } from '@/interface/char';
import type { IEquips } from '@/interface/equip';
import { IUserState } from '@/interface/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function mergeEquips(localEquips: IEquips[] = [], apiEquips: IEquips[] = []) {
  const merged = apiEquips.map((apiEquip) => {
    const localMatch = localEquips.find(
      (localEquip) => localEquip.type === apiEquip.type,
    );
    return localMatch?.img && localMatch ? localMatch : apiEquip;
  });

  const extraLocalEquips = localEquips.filter((localEquip) => {
    return !apiEquips.some((apiEquip) => apiEquip.type === localEquip.type);
  });

  return [...merged, ...extraLocalEquips];
}

export const useUpdateChar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<IChar>): Promise<IChar> => {
      const allChars = queryClient.getQueryData<IChar[]>(['allChars']);
      const localData = allChars?.find((char) => char.name === data.name);
      const user = queryClient.getQueryData<IUserState>(['user']);

      if (!user?.accessToken) return _.merge(localData, data) as IChar;

      if (!data.id || !localData?.id) {
        const res = await api.post<IChar>(`/chars`, data);
        return res.data;
      }

      const response = await api.get<IChar>(`/chars/${data.id}`);
      const remoteData = response.data;

      const localEquips =
        allChars?.find((char) => char.name === remoteData.name)?.equips ??
        localData?.equips;

      const mergedData = _.merge(localData, remoteData);

      return {
        ...mergedData,
        equips: mergeEquips(
          localEquips?.length ? localEquips : [],
          remoteData.equips ?? [],
        ),
      };
    },

    onSuccess: (mergedChar: IChar) => {
      queryClient.setQueryData<IChar[]>(['allChars'], (oldChars) => {
        if (!oldChars) return [mergedChar];

        return oldChars.map((char) => {
          if (char.name === mergedChar.name) {
            const hasSkillPayload = !!(
              mergedChar.skills && Object.keys(mergedChar.skills).length
            );
            const hasSkillState = !!Object.keys(char.skills).length;

            if (!hasSkillPayload && !hasSkillState) {
              const skills = getMockFromChar(char.name || mergedChar.name);
              return {
                ...char,
                skills,
              };
            }
            return mergedChar;
          }
          return char;
        });
      });
    },
  });
};
