import React from 'react';
import { render } from '@testing-library/react';
import App from '../components/App';

test('renders App without crash', () => {
  const app = render(<App />);
  expect(app.getByText("InstaZZ")).toBeInTheDocument();
});
