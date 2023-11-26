import { useQuery } from 'react-query';
import { useHost } from '../../../context/HostProvider';

interface ListItemsParams {
  page: number;
  name?: string;
}

export interface Item {
  id: string;
  name: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  itemCategoryId: string;
  itemTypeId: string;
  ItemCategory: {
    id: string;
    name: string;
  };
  ItemType: {
    id: string;
    name: string;
  };
}

interface ListItemsResponse {
  data: Item[];
  count: number;
}

export const useListItems = ({ page, name }: ListItemsParams) => {
  const { api } = useHost();

  const listItems = async ({ page, name }: ListItemsParams) => {
    const resp = await api.get<ListItemsResponse>('/items', {
      params: {
        page,
        name,
      },
    });
    return resp.data;
  };

  return useQuery(['items', { page, name }], () => listItems({ page, name }), {
    keepPreviousData: true,
  });
};
