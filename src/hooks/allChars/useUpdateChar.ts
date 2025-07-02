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
  const user = queryClient.getQueryData<IUserState>(['user']);

  return useMutation({
    mutationKey: ['updateChar'],
    mutationFn: async (data: Partial<IChar>): Promise<IChar> => {
      const allChars = queryClient.getQueryData<IChar[]>(['allChars']);
      const localData = allChars?.find((char) => char.name === data.name);
      const mergeData = _.merge(localData, data);

      if (!user?.accessToken) return mergeData as IChar;

      if (!mergeData.id) {
        const res = await api.post<IChar>(`/chars`, data);
        const newData = _.merge(res.data, mergeData);
        return newData;
      }

      const res = await api.get<IChar>(`/chars/${mergeData.id}`);
      const remoteData = res.data;

      const localEquips =
        allChars?.find((char) => char.name === remoteData.name)?.equips ??
        localData?.equips;

      return {
        ...mergeData,
        equips: mergeEquips(
          localEquips?.length ? localEquips : [],
          remoteData.equips ?? [],
        ),
      };
    },
    onMutate: (mergedChar: IChar) => {
      queryClient.setQueryData<IChar[]>(['allChars'], (oldChars) => {
        if (!oldChars) return [mergedChar];
        const newChars = oldChars.map((char) => {
          if (char.name === mergedChar.name) {
            const hasSkillPayload = !!(
              mergedChar.skills && Object.keys(mergedChar.skills).length
            );
            const hasSkillState = !!Object.keys(char.skills).length;

            if (!hasSkillPayload && !hasSkillState) {
              const skills = getMockFromChar(char.name || mergedChar.name);

              return { ...char, ...mergedChar, skills };
            }
            return { ...char, ...mergedChar };
          }
          return char;
        });

        return newChars;
      });
    },
  });
};
