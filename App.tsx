import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import MyStores from './pages/MyStores';
import StoreEditor from './pages/StoreEditor';
import MenuBuilder from './pages/MenuBuilder';
import QRGenerator from './pages/QRGenerator';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import LoginSecurity from './pages/LoginSecurity';
import NotificationSettings from './pages/NotificationSettings';
import HelpCenter from './pages/HelpCenter';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MyStores />} />
          
          {/* Auth Routes */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          
          {/* Store Specific Routes */}
          <Route path="store/new" element={<StoreEditor />} />
          <Route path="store/:id/edit" element={<StoreEditor />} />
          <Route path="store/:id/menu" element={<MenuBuilder />} />
          <Route path="store/:id/qr" element={<QRGenerator />} />
          
          {/* Profile Routes */}
          <Route path="profile" element={<Profile />} />
          <Route path="profile/edit" element={<EditProfile />} />
          <Route path="profile/security" element={<LoginSecurity />} />
          <Route path="profile/notifications" element={<NotificationSettings />} />
          <Route path="profile/help" element={<HelpCenter />} />
          
          {/* Default to Login if unknown route, effectively making Login the entry point for new sessions visually */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;