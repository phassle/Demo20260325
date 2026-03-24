import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { DocumentsPage } from '../pages/DocumentsPage';

describe('ACC-1.3: Data pages with loading, error, and data states', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('shows loading state initially', () => {
    vi.spyOn(global, 'fetch').mockImplementation(() => new Promise(() => {}));
    render(
      <MemoryRouter>
        <DocumentsPage />
      </MemoryRouter>
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('shows error state on fetch failure', async () => {
    vi.spyOn(global, 'fetch').mockRejectedValue(new Error('Network error'));
    render(
      <MemoryRouter>
        <DocumentsPage />
      </MemoryRouter>
    );
    expect(await screen.findByText(/error/i)).toBeInTheDocument();
  });

  it('renders table rows when data loads', async () => {
    const docs = [
      { id: 1, title: 'SOP-001', category: 'SOP', version: '1.0', status: 'Draft', createdBy: 'Anna', createdAt: '2025-01-01' },
      { id: 2, title: 'WI-002', category: 'WI', version: '2.0', status: 'Approved', createdBy: 'Erik', createdAt: '2025-02-01' },
    ];
    vi.spyOn(global, 'fetch').mockResolvedValue({ ok: true, json: () => Promise.resolve(docs) });
    render(
      <MemoryRouter>
        <DocumentsPage />
      </MemoryRouter>
    );
    const sop = await screen.findAllByText('SOP-001');
    expect(sop[0]).toBeInTheDocument();
    const wi = screen.getAllByText('WI-002');
    expect(wi[0]).toBeInTheDocument();
  });
});
