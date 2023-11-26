import { useQuery } from 'react-query';
import { useHost } from '../../../context/HostProvider';

export interface ItemTypeOption {
  id: string;
  name: string;
  itemCategoryId: string;
}

export const useListItemTypesOptions = () => {
  const { api } = useHost();

  const listItemTypesOptions = async () => {
    const resp = await api.get<ItemTypeOption[]>('/item-types/options');
    return resp.data;
  };

  return useQuery('item-types-options', listItemTypesOptions);
};
