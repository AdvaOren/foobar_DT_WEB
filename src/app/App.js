import Logo from "../login_screen/logo/Logo";
import LoginBox from "../login_screen/login_box/LoginBox";
import Signup from "../signup_screen/Signup";
import React from "react";


function App() {

    const members = []
    return (
        <>
            <Logo/>
            <LoginBox loginMembers={members}/>
            <Signup loginMembers={members}/>
        </>
    );
}

export default App;
