import { Table as TableComponent } from '../excise-tax-calculator/Table/Table';
import { expect, test } from 'vitest';
import { render } from '@testing-library/react';

test('Renders the table', () => {
  render(<TableComponent />);
  expect(true).toBeTruthy();
});
