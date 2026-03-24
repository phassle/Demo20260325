import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { DocumentsPage } from '../pages/DocumentsPage';

beforeEach(() => {
  vi.spyOn(global, 'fetch').mockImplementation(() =>
    Promise.resolve({ ok: true, json: () => Promise.resolve([]) })
  );
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('ACC-2.6: Empty state styled with dark theme', () => {
  it('renders empty state message with dark theme class', async () => {
    render(
      <MemoryRouter initialEntries={['/documents']}>
        <Routes>
          <Route path="/documents" element={<DocumentsPage />} />
        </Routes>
      </MemoryRouter>
    );
    await screen.findByText('All Documents');
    const emptyState = document.querySelector('.empty-state');
    expect(emptyState).toBeTruthy();
    expect(emptyState).toHaveClass('surface-container');
  });
});
