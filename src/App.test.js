
import { AuthProvider } from './AuthContext.js';
import App from './App.js';

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


