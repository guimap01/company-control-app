import { useQueryClient, useMutation } from 'react-query';
import { useHost } from '../../../context/HostProvider';

export const useDeleteItemMutation = (id: string) => {
  const { api } = useHost();
  const queryClient = useQueryClient();
  const deleteItem = async () => {
    await api.delete(`/items/${id}`);
  };
  return useMutation(deleteItem, {
    onSuccess: () => {
      queryClient.invalidateQueries('items');
    },
  });
};
