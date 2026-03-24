import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { DocumentsPage } from '../pages/DocumentsPage';

const mockDocuments = [
  { id: 1, title: 'Doc 1', category: 'SOP', version: '1.0', status: 'Draft', createdBy: 'Anna', createdAt: '2025-01-01' },
  { id: 2, title: 'Doc 2', category: 'WI', version: '2.0', status: 'Approved', createdBy: 'Erik', createdAt: '2025-02-01' },
];

beforeEach(() => {
  vi.spyOn(global, 'fetch').mockImplementation(() =>
    Promise.resolve({ ok: true, json: () => Promise.resolve(mockDocuments) })
  );
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('ACC-3.2: Documents table with tonal rows and glow chip badges', () => {
  it('table uses tonal-table class for alternating backgrounds', async () => {
    render(
      <MemoryRouter initialEntries={['/documents']}>
        <Routes>
          <Route path="/documents" element={<DocumentsPage />} />
        </Routes>
      </MemoryRouter>
    );
    const docs = await screen.findAllByText('Doc 1');
    expect(docs[0]).toBeInTheDocument();
    const table = document.querySelector('.data-table');
    expect(table).toHaveClass('tonal-table');
  });

  it('status badges use glow chip classes', async () => {
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
});
