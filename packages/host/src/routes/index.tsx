import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { QueryClient } from 'react-query';
import { api } from '../api';
import { EmptyPage } from '../components/EmptyPage';
import SidebarWithHeader from '../components/SidebarWitHeader';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import Login from '../pages/Login';
const StockApp = lazy(() => import('stockApp/Stock'));
const EmployeesApp = lazy(() => import('employeesApp/Employees'));

interface AppRoutesProps {
  queryClient: QueryClient;
}

export const AppRoutes = ({ queryClient }: AppRoutesProps) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthProvider />}>
          <Route element={<SidebarWithHeader />}>
            <Route
              path="/"
              element={<StockWrapper queryClient={queryClient} />}
            />
            <Route
              path="/employees"
              element={<EmployeesWrapper queryClient={queryClient} />}
            />
            <Route path="*" element={<EmptyPage />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

function StockWrapper({ queryClient }: { queryClient: QueryClient }) {
  const { user } = useAuth();

  return <StockApp queryClient={queryClient} api={api} user={user} />;
}

function EmployeesWrapper({ queryClient }: { queryClient: QueryClient }) {
  const { user } = useAuth();
  if (!user.role.includes('ADMIN')) {
    return <EmptyPage />;
  }

  return <EmployeesApp queryClient={queryClient} api={api} user={user} />;
}
