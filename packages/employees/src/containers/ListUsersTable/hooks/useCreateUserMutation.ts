import { useMutation, useQueryClient } from 'react-query';
import { useHost } from '../../../context/HostProvider';
import { User } from './useListUsers';

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  role?: string;
}

export const useCreateUserMutation = (user?: User) => {
  const { api } = useHost();
  const queryClient = useQueryClient();

  const updateUser = async (data: CreateUserData) => {
    const response = await api.put(`/users/${user?.id}`, data);
    return response.data;
  };

  const createUser = async (data: CreateUserData) => {
    const response = await api.post('/users', data);
    return response.data;
  };

  return useMutation(user?.id ? updateUser : createUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
    },
  });
};
