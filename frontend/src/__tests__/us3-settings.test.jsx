import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { SettingsPage } from '../pages/SettingsPage';

describe('ACC-3.5: Settings form inputs with ghost borders', () => {
  it('form inputs have ghost-border class', () => {
    render(
      <MemoryRouter initialEntries={['/settings']}>
        <Routes>
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </MemoryRouter>
    );
    const inputs = document.querySelectorAll('.form-input');
    expect(inputs.length).toBeGreaterThanOrEqual(1);
    inputs.forEach((input) => {
      expect(input).toHaveClass('ghost-border');
    });
  });
});
