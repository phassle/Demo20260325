import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { DashboardPage } from './pages/DashboardPage';
import { DocumentsPage } from './pages/DocumentsPage';
import { DeviationsPage } from './pages/DeviationsPage';
import { AuditsPage } from './pages/AuditsPage';
import { CasesPage } from './pages/CasesPage';
import { UsersPage } from './pages/UsersPage';
import { SettingsPage } from './pages/SettingsPage';
import { HelpPage } from './pages/HelpPage';

const titles = {
  '/': 'Dashboard',
  '/documents': 'Documents',
  '/deviations': 'Deviations',
  '/audits': 'Audits',
  '/cases': 'Cases',
  '/users': 'Users',
  '/settings': 'Settings',
  '/help': 'Help',
};

function AppRoutes() {
  const location = useLocation();
  const title = titles[location.pathname] || 'Dashboard';

  return (
    <Layout title={title}>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/documents" element={<DocumentsPage />} />
        <Route path="/deviations" element={<DeviationsPage />} />
        <Route path="/audits" element={<AuditsPage />} />
        <Route path="/cases" element={<CasesPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
