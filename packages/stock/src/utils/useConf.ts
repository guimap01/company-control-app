import { useHost } from '../context/HostProvider';

export const useConf = () => {
  const { user } = useHost();

  return {
    isAdmin: user.role.includes('ADMIN'),
  };
};
