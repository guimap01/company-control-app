import { useMutation } from 'react-query';
import { api } from '../api';

export const useAuthLogin = () => {
  return useMutation(async (data: { username: string; password: string }) => {
    const response = await api.post('/auth/login', data);
    return response.data;
  });
};
