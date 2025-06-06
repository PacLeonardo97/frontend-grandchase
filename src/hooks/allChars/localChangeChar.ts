'use client';

import _ from 'lodash';

import { getMockFromChar } from '@/helper/skill';
import { IChar } from '@/interface/char';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useLocalChageChar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['updateLocalChar'],
    mutationFn: async (data: Partial<IChar>): Promise<IChar[] | undefined> => {
      const allChars = queryClient.getQueryData<IChar[]>(['allChars']);
      const localData = allChars?.find((char) => char.name === data.name);

      const mergeData = _.merge({}, localData, data);

      return queryClient.setQueryData<IChar[]>(['allChars'], (oldChars) => {
        if (!oldChars) return [mergeData];

        return oldChars?.map((char) => {
          if (char.name === mergeData.name) {
            const hasSkillPayload = !!(
              mergeData.skills && Object.keys(mergeData.skills).length
            );
            const hasSkillState = !!Object.keys(char.skills).length;

            if (!hasSkillPayload && !hasSkillState) {
              const skills = getMockFromChar(char.name || mergeData.name);
              return {
                ...char,
                skills,
              };
            }

            return mergeData;
          }

          return char;
        });
      });
    },
  });
};
