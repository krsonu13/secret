import React, { useState, useEffect } from 'react';
import { HomePage } from './pages/HomePage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { api } from './services/api';

export const App: React.FC = () => {
  const [route, setRoute] = useState<'home' | 'admin-login' | 'admin'>(() => {
    const path = window.location.pathname;
    if (path.startsWith('/admin/login')) return 'admin-login';
    if (path.startsWith('/admin')) {
      return localStorage.getItem('birthday_admin_token') ? 'admin' : 'admin-login';
    }
    return 'home';
  });

  const navigateTo = (newRoute: 'home' | 'admin-login' | 'admin') => {
    setRoute(newRoute);
    if (newRoute === 'home') window.history.pushState({}, '', '/');
    else if (newRoute === 'admin-login') window.history.pushState({}, '', '/admin/login');
    else if (newRoute === 'admin') window.history.pushState({}, '', '/admin');
  };

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path.startsWith('/admin/login')) setRoute('admin-login');
      else if (path.startsWith('/admin')) {
        setRoute(localStorage.getItem('birthday_admin_token') ? 'admin' : 'admin-login');
      } else {
        setRoute('home');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleLogout = async () => {
    try {
      await api.logout();
    } catch {}
    localStorage.removeItem('birthday_admin_token');
    navigateTo('home');
  };

  if (route === 'admin-login') {
    return (
      <AdminLoginPage
        onLoginSuccess={() => navigateTo('admin')}
        onBackToHome={() => navigateTo('home')}
      />
    );
  }

  if (route === 'admin') {
    return (
      <AdminDashboard
        onLogout={handleLogout}
        onViewLive={() => navigateTo('home')}
      />
    );
  }

  return <HomePage />;
};

export default App;
