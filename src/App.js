import React, { useContext } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogInSignUp from "./LogInSignUp/LogInSignUp.js";
import { PrivateRoute, AuthContext } from './AuthContext.js';
import Feed from './Feed/Feed.js';
import Signup from "./LogInSignUp/signup_screen/Signup.js";
import ProfilePage from './ProfilePage/ProfilePage.js';


function App() {
    const { theme } = useContext(AuthContext);

    return (
        <div className={theme}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<LogInSignUp />} />
                    <Route path="/feed" element={<PrivateRoute Component={Feed} />} />
                    <Route path='/profilePage' element={<PrivateRoute Component={ProfilePage} />} />
                </Routes>
            <Signup />
            </BrowserRouter>
        </div>


    );
}

export default App;
