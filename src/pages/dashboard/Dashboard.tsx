import { Routes, Route } from 'react-router-dom';
import DashboardHome from '@/pages/dashboard/DashboardHome';
import Marketplace from '@/pages/dashboard/Marketplace';
import Cart from '@/pages/dashboard/Cart';
import MyOrders from '@/pages/dashboard/MyOrders';
import MyServices from '@/pages/dashboard/MyServices';
import Checkout from './Checkout';
import Settings from '@/pages/dashboard/Settings';
import DashboardLayout from '../../components/DashboardLayout';

export default function Dashboard() {
  return (
    <DashboardLayout>
      <Routes>
        <Route index element={<DashboardHome />} />
        <Route path="marketplace" element={<Marketplace />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />

        <Route path="orders" element={<MyOrders />} />
        <Route path="services" element={<MyServices />} />
        <Route path="settings" element={<Settings />} />
      </Routes>
    </DashboardLayout>
  );
}
