import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';

describe('ACC-2.1: Dark navy background with surface tiers', () => {
  it('app-shell has dark theme class', () => {
    render(
      <MemoryRouter>
        <Layout title="Test">
          <div>Content</div>
        </Layout>
      </MemoryRouter>
    );
    const shell = document.querySelector('.app-shell');
    expect(shell).toHaveClass('dark');
  });

  it('content area uses surface tier class', () => {
    render(
      <MemoryRouter>
        <Layout title="Test">
          <div>Content</div>
        </Layout>
      </MemoryRouter>
    );
    const content = document.querySelector('.content');
    expect(content).toHaveClass('surface-base');
  });
});
