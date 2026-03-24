import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { DocumentsPage } from '../pages/DocumentsPage';

const mockDocuments = [{ id: 1, title: 'Doc 1', category: 'SOP', version: '1.0', status: 'Draft', createdBy: 'Anna', createdAt: '2025-01-01' }];

beforeEach(() => {
  vi.spyOn(global, 'fetch').mockImplementation(() =>
    Promise.resolve({ ok: true, json: () => Promise.resolve(mockDocuments) })
  );
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('ACC-2.2: Primary CTA buttons use teal gradient', () => {
  it('btn-primary element has gradient class', async () => {
    render(
      <MemoryRouter initialEntries={['/documents']}>
        <Routes>
          <Route path="/documents" element={<DocumentsPage />} />
        </Routes>
      </MemoryRouter>
    );
    await screen.findByText('All Documents');
    const btn = document.querySelector('.btn-primary');
    expect(btn).toBeTruthy();
    expect(btn).toHaveClass('btn-gradient');
  });
});
