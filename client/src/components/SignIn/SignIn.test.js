import React from 'react';
import { render, screen } from '@testing-library/react';
import SignIn from './';
//Kishoresanjay Rajesh Unit Test

describe('SignIn component', () => {
  it('should render a SignIn button', () => {
    render(<SignIn />);
    const signInButton = screen.getByText('SignIn');
    expect(signInButton);
  });
});