import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { SettingsPage } from '../pages/SettingsPage';

describe('ACC-2.5: Interactive elements have min 12px corner radius', () => {
  it('buttons have radius token class', () => {
    render(
      <MemoryRouter initialEntries={['/settings']}>
        <Routes>
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </MemoryRouter>
    );
    const btn = document.querySelector('.btn');
    expect(btn).toBeTruthy();
    expect(btn).toHaveClass('radius-lg');
  });

  it('form inputs have radius token class', () => {
    render(
      <MemoryRouter initialEntries={['/settings']}>
        <Routes>
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </MemoryRouter>
    );
    const input = document.querySelector('.form-input');
    expect(input).toBeTruthy();
    expect(input).toHaveClass('radius-md');
  });
});
