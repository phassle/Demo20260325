import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Header } from '../components/layout/Header';

describe('ACC-2.4: Header uses glassmorphism', () => {
  it('header element has glassmorphic class', () => {
    render(<Header title="Test" />);
    const header = document.querySelector('.header');
    expect(header).toBeTruthy();
    expect(header).toHaveClass('header-glass');
  });
});
