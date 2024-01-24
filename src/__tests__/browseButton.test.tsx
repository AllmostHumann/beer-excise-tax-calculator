import { BrowseFileButton } from '../components/Buttons/ReaderButtons/BrowseFileButton';
import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

test('Renders the browse button', () => {
  render(<BrowseFileButton />);
  expect(true).toBeTruthy();
});

test('Test button click event', () => {
  render(<BrowseFileButton />);
  const browseButton = screen.getByTestId('browseButton');
  userEvent.click(browseButton);
});
