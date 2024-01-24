import { DiscountButton } from '../components/Buttons/DiscountButton/DiscountButton';
import { expect, test } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

test('Renders the discount button', () => {
  render(<DiscountButton />);
  expect(true).toBeTruthy();
});

test('It shoudl apply discount', () => {
  render(<DiscountButton />);
  const discountInputTestButton = screen.getByTestId('discountInputTestButton');
  expect(discountInputTestButton).toHaveProperty('checked', true);
});

test('It shoudl remove discount', () => {
  render(<DiscountButton />);
  const discountInputTestButton = screen.getByTestId('discountInputTestButton');
  fireEvent.click(discountInputTestButton);
  expect(discountInputTestButton).toHaveProperty('checked', false);
});
