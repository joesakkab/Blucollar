import React from 'react';
import { render, screen } from '@testing-library/react';
import MyProfile from './';

it('should render the profile page text', () => {
  render(<MyProfile />);
  const myProfile = screen.getByText('Welcome to your profile page!');
  expect(myProfile);
});