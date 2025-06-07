import { useQueryClient } from '@tanstack/react-query';

export const useLogout = () => {
  const queryClient = useQueryClient();

  return () => {
    queryClient.clear();
  };
};
