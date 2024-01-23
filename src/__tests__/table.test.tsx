import { Table } from '../excise-tax-calculator/Table/Table';
import { expect, test } from 'vitest';
import { render } from '@testing-library/react';

test('Renders the table', () => {
  render(<Table />);
  expect(true).toBeTruthy();
});
