import { render, screen } from '@testing-library/react';
import App from '../src/App';

test('renders learn components link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
