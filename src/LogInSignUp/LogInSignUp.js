import React, { useContext, useState } from 'react';
import "./LogInSignUp.css"
import { UserNameValid } from '../Validation/Validation.js'
import { PasswordValid } from '../Validation/Validation.js'
import StartScreenLogo from '../Logo/StartScreenLogo.js';
import { AuthContext } from '../AuthContext.js';
import { useNavigate } from 'react-router-dom';
import { userExists, getToken } from '../serverCalls/LogInSignUp.js';

function LogInSignUp() {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [cantFindUser, setCantFindUser] = useState("");
    const [passwordFix, setPasswordFix] = useState("");
    const [usernameFix, setUsernameFix] = useState("");

    async function getUserInput() {
        if (document.getElementById('userName') == null || document.getElementById('password') == null) {
            alert("enter UserName and Password")
        }
        var nameValid;
        var passwordValid;
        var userName = document.getElementById('userName').value;
        nameValid = UserNameValid(userName);
        var password = document.getElementById('password').value;
        passwordValid = PasswordValid(password);
        if (passwordValid == "" && nameValid == "") {
            const userDetails = await userExists(userName);
            if (!userDetails || (userDetails && userDetails.password != password)) {
                setCantFindUser("User does not exist");
                return;
            }
            let userDet = {
                username: userDetails.email,
                name: userDetails.firstName + " " + userDetails.lastName,
                id: userDetails._id,
                profileImage: userDetails.img,
                token: 0,
                email: userDetails.email,
                password: userDetails.password,
                lastName: userDetails.lastName,
                firstName: userDetails.firstName,
            }
            const res = await getToken(userDetails._id);
            const json = await res.json()
            userDet.token = json.token;
            login(userDet);
            // Navigate to the desired path
            navigate('/feed');
        }
    }

    // Event handlers for input change
    const handleUsernameChange = (event, setter) => {
        const value = event.target.value;
        const newUserFix = UserNameValid(value)
        setter(newUserFix)
    };

    const handlePasswordChange = (event, setter) => {
        const value = event.target.value;
        const newPassFix = PasswordValid(value)
        setter(newPassFix);
    };


    return (
        <div id="loginContent" style={{ height: window.screen.height }}>
            <StartScreenLogo />
            <div className="box">
                <span style={{ color: 'red' }}>{usernameFix}</span>
                <input id="userName" type="userName" className="inputText" placeholder="User Name"
                    aria-label="User Name" required
                    onChange={(event) => handleUsernameChange(event, setUsernameFix)} />
                <span style={{ color: 'red' }}>{passwordFix}</span>
                <input id="password" className="inputText" type="password" placeholder="Password" aria-label="Password"
                    required onChange={(event) => handlePasswordChange(event, setPasswordFix)} />
                <button id="logInButton" type="submit"
                    onClick={getUserInput}>Log In</button>
                <span style={{ color: 'red' }}>{cantFindUser}</span>
                <div className="bordLine">
                    <hr className="line"></hr>
                </div>
                <div className="newAccount">
                    <div type="button" className={"SU-btn"}
                        id="newAccount" data-bs-toggle="modal"
                        data-bs-target="#signinModal">create new
                        account
                    </div>
                </div>

            </div>
        </div>

    )
}



export default LogInSignUp;