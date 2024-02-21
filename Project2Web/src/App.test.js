
import { AuthProvider } from './AuthContext';
import App from './App';

import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import LogInSignUp from './LogInSignUp/LogInSignUp';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Import BrowserRouter


test('renders the App without errors', () => {
  render(
    <AuthProvider>
      <App />
    </AuthProvider>
  );
});


