import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import SidebarWithHeader from '../components/SidebarWitHeader';
import { AuthProvider } from '../contexts/AuthContext';
const Login = lazy(() => import('../pages/Login'));
const StockApp = lazy(() => import('stockApp/Stock'));

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthProvider />}>
          <Route element={<SidebarWithHeader />}>
            <Route path="/" element={<StockApp />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
