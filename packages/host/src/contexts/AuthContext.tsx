import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { api } from '../api';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { Outlet, useNavigate } from 'react-router';
import { UserType } from '../types/UserType';

interface LoginPayload {
  username: string;
  password: string;
}

type AuthContextType = {
  isAuthenticated: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => void;
  user: {
    name: string;
    role: string[];
  };
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

interface AuthLoginData {
  access_token: string;
}

const useAuthLogin = () => {
  return useMutation(async (payload: LoginPayload) => {
    const response = await api.post<AuthLoginData>('/auth/login', payload);
    return response.data;
  });
};

export function AuthProvider() {
  const [user, setUser] = useState<UserType>();
  const { mutateAsync } = useAuthLogin();
  const navigate = useNavigate();
  async function login({ username, password }: LoginPayload) {
    await mutateAsync(
      { username, password },
      {
        onError: () => {
          toast.error('Usuário ou senha inválidos');
        },
        onSuccess: (data) => {
          localStorage.setItem('access_token', data.access_token);
          api.defaults.headers['Authorization'] = `Bearer ${data.access_token}`;
          navigate('/');
        },
      }
    );
  }

  const checkIsAuthenticated = useCallback(async () => {
    const token = localStorage.getItem('access_token');
    if (token && !user) {
      try {
        const response = await api.get<UserType>('/auth/profile');
        setUser(response.data);
        api.defaults.headers['Authorization'] = `Bearer ${token}`;
      } catch (error) {
        setUser(undefined);
        localStorage.removeItem('access_token');
        navigate('/login');
      }
    }
    // if token doesn't exist and user is not on login page, redirect to login page
    if (!token && window.location.pathname !== '/login') {
      navigate('/login');
    }
  }, [window.location.pathname]);

  function logout() {
    setUser(undefined);
    localStorage.removeItem('access_token');
    navigate('/login');
  }

  useEffect(() => {
    checkIsAuthenticated();
  }, [checkIsAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        login,
        logout,
        user: {
          name: user?.username || '',
          role: user?.roles || [],
        },
      }}
    >
      <Outlet />
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
