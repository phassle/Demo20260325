import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';

describe('ACC-2.7: Sidebar dark theme with teal active glow', () => {
  it('sidebar has dark surface class', () => {
    render(
      <MemoryRouter initialEntries={['/documents']}>
        <Sidebar />
      </MemoryRouter>
    );
    const sidebar = document.querySelector('.sidebar');
    expect(sidebar).toHaveClass('sidebar-dark');
  });

  it('active NavLink has teal glow indicator class', () => {
    render(
      <MemoryRouter initialEntries={['/documents']}>
        <Sidebar />
      </MemoryRouter>
    );
    const activeLink = document.querySelector('.sidebar-link.active');
    expect(activeLink).toBeTruthy();
    expect(activeLink).toHaveClass('glow-teal');
  });

  it('inactive links do not have teal glow class', () => {
    render(
      <MemoryRouter initialEntries={['/documents']}>
        <Sidebar />
      </MemoryRouter>
    );
    const inactiveLinks = document.querySelectorAll('.sidebar-link:not(.active)');
    inactiveLinks.forEach((link) => {
      expect(link).not.toHaveClass('glow-teal');
    });
  });
});
