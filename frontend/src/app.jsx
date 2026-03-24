import Router from 'preact-router';
import { useState } from 'preact/hooks';
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

export function App() {
  const [title, setTitle] = useState('Dashboard');

  const handleRoute = (e) => {
    setTitle(titles[e.url] || 'Dashboard');
  };

  return (
    <Layout title={title}>
      <Router onChange={handleRoute}>
        <DashboardPage path="/" />
        <DocumentsPage path="/documents" />
        <DeviationsPage path="/deviations" />
        <AuditsPage path="/audits" />
        <CasesPage path="/cases" />
        <UsersPage path="/users" />
        <SettingsPage path="/settings" />
        <HelpPage path="/help" />
      </Router>
    </Layout>
  );
}
