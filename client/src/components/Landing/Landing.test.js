import React from 'react';
import renderer from 'react-test-renderer';
import Landing from './index';
import { render, screen, component } from '@testing-library/react'

it('Landing Page Renders', () => {
  const tree = renderer
    .create(<Landing />)
    .toJSON();
  expect(tree).toMatchSnapshot();

});

it('should contain a sign up button', () => {
  render(<Landing />);
  const signup = screen.getByText('Sign Up');
  expect(signup);
})

it('should contain a login button', () => {
  render(<Landing />);
  const login = screen.getByText('Login');
  expect(login);

}); 
