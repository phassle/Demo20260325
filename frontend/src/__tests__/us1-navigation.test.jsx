import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';

describe('ACC-1.2: Sidebar navigation with active state', () => {
  it('marks the current route link as active', () => {
    render(
      <MemoryRouter initialEntries={['/documents']}>
        <Sidebar />
      </MemoryRouter>
    );
    const docsLink = screen.getByText('Documents').closest('a');
    expect(docsLink).toHaveClass('active');
  });

  it('does not mark other links as active', () => {
    render(
      <MemoryRouter initialEntries={['/documents']}>
        <Sidebar />
      </MemoryRouter>
    );
    const dashLink = screen.getByText('Dashboard').closest('a');
    expect(dashLink).not.toHaveClass('active');
  });
});
