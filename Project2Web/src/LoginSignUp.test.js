import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import LogInSignUp from './LogInSignUp/LogInSignUp';
import { AuthProvider } from "./AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";

describe('LogInSignUp component', () => {
  test('renders the LogInSignUp without errors', () => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<LogInSignUp />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    );
  });

  test('renders login form elements', () => {
    const { getByLabelText, getByText } = render(
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<LogInSignUp />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    );

    // Assert that login form elements are rendered
    expect(getByLabelText('User Name')).toBeInTheDocument();
    expect(getByLabelText('Password')).toBeInTheDocument();
    expect(getByText('Log In')).toBeInTheDocument();
    expect(getByText('Create New Account')).toBeInTheDocument();
  });

  test('renders signup form elements when "Create New Account" is clicked', () => {
    const { getByText, getByLabelText } = render(
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<LogInSignUp />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    );

    // Simulate clicking "Create New Account"
    fireEvent.click(getByText('Create New Account'));

    // Assert that signup form elements are rendered
    expect(getByLabelText('Confirm Password')).toBeInTheDocument();
    expect(getByLabelText('Name')).toBeInTheDocument();
    expect(getByText('Sign Up')).toBeInTheDocument();
    expect(getByText('I have an account')).toBeInTheDocument();
  });

  test('renders login form elements when "I have an account" is clicked', () => {
    const { getByText, getByLabelText } = render(
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<LogInSignUp />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    );

    // Simulate clicking "Create New Account"
    fireEvent.click(getByText('Create New Account'));

    // Simulate clicking "I have an account"
    fireEvent.click(getByText('I have an account'));

    // Assert that login form elements are rendered
    expect(getByLabelText('User Name')).toBeInTheDocument();
    expect(getByLabelText('Password')).toBeInTheDocument();
    expect(getByText('Log In')).toBeInTheDocument();
    expect(getByText('Create New Account')).toBeInTheDocument();
  });
});
