import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { UsersPage } from '../pages/UsersPage';

const mockUsers = [
  { id: 1, name: 'Anna', email: 'anna@centuri.se', role: 'Admin', department: 'Quality', isActive: true },
  { id: 2, name: 'Erik', email: 'erik@centuri.se', role: 'QualityManager', department: 'Production', isActive: false },
  { id: 3, name: 'Lars', email: 'lars@centuri.se', role: 'Auditor', department: 'Quality', isActive: true },
  { id: 4, name: 'Maria', email: 'maria@centuri.se', role: 'Viewer', department: 'HR', isActive: true },
];

beforeEach(() => {
  vi.spyOn(global, 'fetch').mockImplementation(() =>
    Promise.resolve({ ok: true, json: () => Promise.resolve(mockUsers) })
  );
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('ACC-3.4: Users page with violet role badges and activity indicators', () => {
  it('role badges use secondary violet color class', async () => {
    render(
      <MemoryRouter initialEntries={['/users']}>
        <Routes>
          <Route path="/users" element={<UsersPage />} />
        </Routes>
      </MemoryRouter>
    );
    await screen.findByText('Admin');
    const adminBadge = screen.getByText('Admin');
    expect(adminBadge).toHaveClass('badge-glow-violet');
  });

  it('active users have colored activity indicator', async () => {
    render(
      <MemoryRouter initialEntries={['/users']}>
        <Routes>
          <Route path="/users" element={<UsersPage />} />
        </Routes>
      </MemoryRouter>
    );
    await screen.findByText('Anna');
    const activeDots = document.querySelectorAll('.status-active');
    expect(activeDots.length).toBeGreaterThanOrEqual(1);
  });
});
