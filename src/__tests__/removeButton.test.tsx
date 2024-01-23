import { RemoveButton } from '../components/Buttons/ReaderButtons/RemoveButton';
import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

test('Renders the remove button', () => {
  render(<RemoveButton />);
  expect(true).toBeTruthy();
});

test('Test remove button click event,', () => {
  render(<RemoveButton />);
  const removeButton = screen.getByTestId('removeButton');
  userEvent.click(removeButton);
});
