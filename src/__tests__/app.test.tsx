import App from '../App';
import { expect, test } from 'vitest';
import { render } from '@testing-library/react';

test('Renders the main page', () => {
  render(<App />);
  expect(true).toBeTruthy();
});
