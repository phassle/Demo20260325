import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { DashboardPage } from '../pages/DashboardPage';
import { DocumentsPage } from '../pages/DocumentsPage';
import { DeviationsPage } from '../pages/DeviationsPage';
import { AuditsPage } from '../pages/AuditsPage';
import { CasesPage } from '../pages/CasesPage';
import { UsersPage } from '../pages/UsersPage';
import { SettingsPage } from '../pages/SettingsPage';
import { HelpPage } from '../pages/HelpPage';

const mockDocuments = [{ id: 1, title: 'Doc 1', category: 'SOP', version: '1.0', status: 'Draft', createdBy: 'Anna', createdAt: '2025-01-01' }];
const mockDeviations = [{ id: 1, title: 'Dev 1', severity: 'High', status: 'Open', reportedBy: 'Erik', assignedTo: 'Anna', createdAt: '2025-01-01' }];
const mockAudits = [{ id: 1, title: 'Audit 1', type: 'Internal', status: 'Planned', auditorName: 'Lars', department: 'Quality', scheduledDate: '2025-06-01' }];
const mockCases = [{ id: 1, title: 'Case 1', type: 'CAPA', priority: 'High', status: 'Open', createdBy: 'Maria', createdAt: '2025-01-01' }];
const mockUsers = [{ id: 1, name: 'Anna', email: 'anna@centuri.se', role: 'Admin', department: 'Quality', isActive: true }];

function mockFetch(url) {
  if (url.includes('/documents')) return Promise.resolve({ ok: true, json: () => Promise.resolve(mockDocuments) });
  if (url.includes('/deviations')) return Promise.resolve({ ok: true, json: () => Promise.resolve(mockDeviations) });
  if (url.includes('/audits')) return Promise.resolve({ ok: true, json: () => Promise.resolve(mockAudits) });
  if (url.includes('/cases')) return Promise.resolve({ ok: true, json: () => Promise.resolve(mockCases) });
  if (url.includes('/users')) return Promise.resolve({ ok: true, json: () => Promise.resolve(mockUsers) });
  return Promise.resolve({ ok: true, json: () => Promise.resolve([]) });
}

function renderPage(route, element) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path={route} element={element} />
      </Routes>
    </MemoryRouter>
  );
}

beforeEach(() => {
  vi.spyOn(global, 'fetch').mockImplementation(mockFetch);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('ACC-1.1: All 8 routes render correct pages', () => {
  it('renders Dashboard at /', async () => {
    renderPage('/', <DashboardPage />);
    expect(await screen.findByText('Open Deviations')).toBeInTheDocument();
  });

  it('renders Documents at /documents', async () => {
    renderPage('/documents', <DocumentsPage />);
    expect(await screen.findByText('All Documents')).toBeInTheDocument();
  });

  it('renders Deviations at /deviations', async () => {
    renderPage('/deviations', <DeviationsPage />);
    expect(await screen.findByText('All Deviations')).toBeInTheDocument();
  });

  it('renders Audits at /audits', async () => {
    renderPage('/audits', <AuditsPage />);
    expect(await screen.findByText('All Audits')).toBeInTheDocument();
  });

  it('renders Cases at /cases', async () => {
    renderPage('/cases', <CasesPage />);
    expect(await screen.findByText('All Cases')).toBeInTheDocument();
  });

  it('renders Users at /users', async () => {
    renderPage('/users', <UsersPage />);
    expect(await screen.findByText('Anna')).toBeInTheDocument();
  });

  it('renders Settings at /settings', async () => {
    renderPage('/settings', <SettingsPage />);
    expect(await screen.findByText('Organization Name')).toBeInTheDocument();
  });

  it('renders Help at /help', async () => {
    renderPage('/help', <HelpPage />);
    expect(await screen.findByText('How do I create a new document?')).toBeInTheDocument();
  });
});
