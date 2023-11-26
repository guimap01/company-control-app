import { useQueryClient, useMutation } from 'react-query';
import { useHost } from '../../../context/HostProvider';
import { Item } from './useListItems';

export interface CreateItemDto {
  name: string;
  amount: number;
  itemCategoryId: string;
  itemTypeId: string;
}

export const useCreateOrEditItemMutation = (id?: string) => {
  const { api } = useHost();
  const queryClient = useQueryClient();

  const updateItem = async (item: CreateItemDto) => {
    const resp = await api.put<Item>(`/items/${id}`, item);
    return resp.data;
  };

  const createItem = async (item: CreateItemDto) => {
    const resp = await api.post<Item>('/items', item);
    return resp.data;
  };

  return useMutation(id ? updateItem : createItem, {
    onSuccess: () => {
      queryClient.invalidateQueries('items');
    },
  });
};
