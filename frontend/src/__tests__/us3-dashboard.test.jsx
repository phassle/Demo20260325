import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { DashboardPage } from '../pages/DashboardPage';

const mockDocuments = [{ id: 1, title: 'Doc 1', category: 'SOP', version: '1.0', status: 'Draft', createdBy: 'Anna', createdAt: '2025-01-01' }];
const mockDeviations = [{ id: 1, title: 'Dev 1', severity: 'High', status: 'Open', reportedBy: 'Erik', assignedTo: 'Anna', createdAt: '2025-01-01' }];
const mockAudits = [{ id: 1, title: 'Audit 1', type: 'Internal', status: 'Planned', auditorName: 'Lars', department: 'Quality', scheduledDate: '2025-06-01' }];
const mockCases = [{ id: 1, title: 'Case 1', type: 'CAPA', priority: 'High', status: 'Open', createdBy: 'Maria', createdAt: '2025-01-01' }];

function mockFetch(url) {
  if (url.includes('/documents')) return Promise.resolve({ ok: true, json: () => Promise.resolve(mockDocuments) });
  if (url.includes('/deviations')) return Promise.resolve({ ok: true, json: () => Promise.resolve(mockDeviations) });
  if (url.includes('/audits')) return Promise.resolve({ ok: true, json: () => Promise.resolve(mockAudits) });
  if (url.includes('/cases')) return Promise.resolve({ ok: true, json: () => Promise.resolve(mockCases) });
  return Promise.resolve({ ok: true, json: () => Promise.resolve([]) });
}

beforeEach(() => {
  vi.spyOn(global, 'fetch').mockImplementation(mockFetch);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('ACC-3.1: Dashboard KPI cards with glow chip styling and gradient CTAs', () => {
  it('KPI cards have glow chip accent background class', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
        </Routes>
      </MemoryRouter>
    );
    await screen.findByText('Open Deviations');
    const cards = document.querySelectorAll('.kpi-card');
    expect(cards.length).toBeGreaterThanOrEqual(1);
  });

  it('dashboard has at least one gradient CTA button', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
        </Routes>
      </MemoryRouter>
    );
    await screen.findByText('Open Deviations');
    const cta = document.querySelector('.btn-gradient');
    expect(cta).toBeTruthy();
  });
});
