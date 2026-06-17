import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the app shell', () => {
  render(<App />);
  expect(screen.getByText(/shopping list app/i)).toBeInTheDocument();
  expect(screen.getByText(/your app root is mounted again/i)).toBeInTheDocument();
});