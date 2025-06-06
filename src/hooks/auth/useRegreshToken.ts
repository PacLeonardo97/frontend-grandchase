import { toast } from 'react-toastify';

import { isAxiosError } from 'axios';

import api from '@/api';
import type { IUserState } from '@/interface/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useRefreshToken = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const res = await api.post<IUserState>('/auth/local', {
        identifier: email,
        password,
      });

      return res.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data);

      toast.success('Login realizado com sucesso!');
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toast.error(
          error.response?.data.error.message || 'Erro ao fazer login',
        );
      } else {
        toast.error('Erro desconhecido ao fazer login');
      }
    },
  });
};
