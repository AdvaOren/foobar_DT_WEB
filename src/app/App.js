import Logo from "../login_screen/logo/Logo";
import LoginBox from "../login_screen/login_box/LoginBox";
import Signup from "../signup_screen/Signup";
import React from "react";


function App() {

    const members = [{
        "firstName": "a",
        "lastName": "aa",
        "email": "zxc",
        "password": "zz",
        "day": "1",
        "month": "2",
        "year": "2024",
        "gender": "M"
    }, {
        "firstName": "q",
        "lastName": "qq",
        "email": "qwe",
        "password": "ww",
        "day": "11",
        "month": "3",
        "year": "2022",
        "gender": "F",
        "do":[]
    }]
    members.map((m) => console.log(m))
    return (
        <>
            <Logo/>
            <LoginBox loginMembers={members}/>
            <Signup loginMembers={members}/>
        </>
    );
}

export default App;
