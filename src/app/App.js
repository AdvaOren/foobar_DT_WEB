import Logo from "../login_screen/logo/Logo";
import LoginBox from "../login_screen/login_box/LoginBox";
import Signup from "../signup_screen/Signup";
import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import FeedScreen from "../feedScreen/FeedScreen";


function App() {

    const members = []
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<><Logo/> <LoginBox
                        loginMembers={members}/></>}></Route>
                    <Route path={"/feedScreen"} element={<FeedScreen/>}></Route>
                </Routes>
            </BrowserRouter>
            <Signup loginMembers={members}/>
        </>
    );
}

export default App;
