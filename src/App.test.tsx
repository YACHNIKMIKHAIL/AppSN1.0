import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import {State} from "./Components/redux/state";

test('renders learn react link', () => {
  render(<App state={State} />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
