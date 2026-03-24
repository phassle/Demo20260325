import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { DocumentsPage } from '../pages/DocumentsPage';

const mockDocuments = [
  { id: 1, title: 'Doc 1', category: 'SOP', version: '1.0', status: 'Draft', createdBy: 'Anna', createdAt: '2025-01-01' },
  { id: 2, title: 'Doc 2', category: 'WI', version: '2.0', status: 'Approved', createdBy: 'Erik', createdAt: '2025-02-01' },
  { id: 3, title: 'Doc 3', category: 'Policy', version: '1.1', status: 'InReview', createdBy: 'Maria', createdAt: '2025-03-01' },
];

beforeEach(() => {
  vi.spyOn(global, 'fetch').mockImplementation(() =>
    Promise.resolve({ ok: true, json: () => Promise.resolve(mockDocuments) })
  );
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('ACC-2.3: Status badges use glow chip pattern', () => {
  it('Draft badge has glow-chip gray class', async () => {
    render(
      <MemoryRouter initialEntries={['/documents']}>
        <Routes>
          <Route path="/documents" element={<DocumentsPage />} />
        </Routes>
      </MemoryRouter>
    );
    const drafts = await screen.findAllByText('Draft');
    expect(drafts[0]).toHaveClass('badge-glow-gray');
  });

  it('Approved badge has glow-chip green class', async () => {
    render(
      <MemoryRouter initialEntries={['/documents']}>
        <Routes>
          <Route path="/documents" element={<DocumentsPage />} />
        </Routes>
      </MemoryRouter>
    );
    const approved = await screen.findAllByText('Approved');
    expect(approved[0]).toHaveClass('badge-glow-green');
  });

  it('InReview badge has glow-chip yellow class', async () => {
    render(
      <MemoryRouter initialEntries={['/documents']}>
        <Routes>
          <Route path="/documents" element={<DocumentsPage />} />
        </Routes>
      </MemoryRouter>
    );
    const inReview = await screen.findAllByText('InReview');
    expect(inReview[0]).toHaveClass('badge-glow-yellow');
  });
});
