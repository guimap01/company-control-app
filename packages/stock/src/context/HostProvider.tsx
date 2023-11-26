import { createContext, useContext } from 'react';
import { AxiosInstance } from 'axios';

interface ApiContextValue {
  api: AxiosInstance;
  user: User;
}

export interface User {
  name: string;
  role: string[];
}

const HostContext = createContext<ApiContextValue>({} as ApiContextValue);

interface ApiProviderProps {
  api: AxiosInstance;
  children: React.ReactNode;
  user: User;
}

export function HostProvider({ api, children, user }: ApiProviderProps) {
  return (
    <HostContext.Provider value={{ api, user }}>
      {children}
    </HostContext.Provider>
  );
}

export function useHost() {
  const context = useContext(HostContext);
  if (!context) {
    throw new Error('useHost must be used within an ApiProvider');
  }
  return context;
}
