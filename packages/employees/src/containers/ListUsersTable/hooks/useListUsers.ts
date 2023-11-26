import { useQuery } from 'react-query';
import { useHost } from '../../../context/HostProvider';

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface ListUsersResponse {
  data: User[];
  count: number;
}

export const useListUsers = ({
  page,
  name,
}: {
  page: number;
  name: string;
}) => {
  const { api } = useHost();
  const loadUsers = async () => {
    const response = await api.get<ListUsersResponse>(`/users`, {
      params: {
        page,
        name,
      },
    });
    return response.data;
  };

  return useQuery(['users', page, name], loadUsers, {
    keepPreviousData: true,
  });
};
