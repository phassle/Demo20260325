import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { DocumentsPage } from '../pages/DocumentsPage';

const mockDocuments = [
  { id: 1, title: 'Doc 1', category: 'SOP', version: '1.0', status: 'Draft', createdBy: 'Anna', createdAt: '2025-01-01' },
];

beforeEach(() => {
  vi.spyOn(global, 'fetch').mockImplementation(() =>
    Promise.resolve({ ok: true, json: () => Promise.resolve(mockDocuments) })
  );
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('ACC-3.3: Documents at 390px viewport reflows', () => {
  it('responsive card layout is available for mobile', async () => {
    render(
      <MemoryRouter initialEntries={['/documents']}>
        <Routes>
          <Route path="/documents" element={<DocumentsPage />} />
        </Routes>
      </MemoryRouter>
    );
    const docs = await screen.findAllByText('Doc 1');
    expect(docs.length).toBeGreaterThanOrEqual(1);
    const mobileCards = document.querySelector('.mobile-cards');
    expect(mobileCards).toBeTruthy();
  });
});
