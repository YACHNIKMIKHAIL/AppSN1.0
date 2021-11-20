import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import {addPost, state, updateNewPost} from "./Components/redux/state";

test('renders learn react link', () => {
  render(<App  state={state} addPost={addPost} updateNewPost={updateNewPost}/>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
