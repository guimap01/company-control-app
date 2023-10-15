import { Route, BrowserRouter, Routes } from 'react-router-dom';
import SidebarWithHeader from '../components/Sidebar';
import StockApp from 'stockApp/Stock';

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SidebarWithHeader />}>
          <Route path="/" element={<StockApp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
