import { useMutation, useQueryClient } from 'react-query';
import { useHost } from '../../../context/HostProvider';

export const useDeleteUserMutation = (id: string) => {
  const { api } = useHost();
  const queryClient = useQueryClient();
  const deleteUser = async () => {
    await api.delete(`/users/${id}`);
  };

  return useMutation(deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
    },
  });
};
