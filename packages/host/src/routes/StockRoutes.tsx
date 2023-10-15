import { Route } from 'react-router-dom';
import StockApp from 'stockApp/Stock';

export const StockRoutes = () => {
  return (
    <>
      <Route path="/stock" element={<StockApp />} />
    </>
  );
};
