import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import SidebarWithHeader from '../components/SidebarWitHeader';
import { AuthProvider } from '../contexts/AuthContext';
import Login from '../pages/Login';
import { EmptyPage } from '../components/EmptyPage';
const StockApp = lazy(() => import('stockApp/Stock'));

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthProvider />}>
          <Route element={<SidebarWithHeader />}>
            <Route path="/" element={<StockApp />} />
            <Route path="*" element={<EmptyPage />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
