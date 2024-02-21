import React, { useContext } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogInSignUp from "./LogInSignUp/LogInSignUp";
import { PrivateRoute, AuthContext } from './AuthContext';
import Feed from './Feed/Feed';



function App() {
  const { theme } = useContext(AuthContext);

  return (
    <div className={theme}>
      <BrowserRouter>
        <Routes>
          
          <Route path='/' element={<LogInSignUp />} />
          <Route path="/feed" element={<PrivateRoute Component={Feed} />} />
        </Routes>
      </BrowserRouter>
    </div>


  );
}

export default App;
