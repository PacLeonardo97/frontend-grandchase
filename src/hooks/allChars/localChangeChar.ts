'use client';

import _ from 'lodash';

import { waitForCacheRestore } from '@/helper/chacheRestore';
import { getMockFromChar } from '@/helper/skill';
import { IChar } from '@/interface/char';
import { useCacheRestored } from '@/providers/tanstack';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useLocalChageChar = () => {
  const queryClient = useQueryClient();
  const isRestored = useCacheRestored();

  return useMutation({
    mutationKey: ['localChanges'],
    mutationFn: async (data: Partial<IChar>): Promise<IChar> => {
      await waitForCacheRestore(() => isRestored);

      const allChars = queryClient.getQueryData<IChar[]>(['allChars']);
      const localData = allChars?.find((char) => char.name === data.name);
      const mergeData = _.merge(localData, data);

      return mergeData as IChar;
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
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ['getChar'] });
    },
  });
};
