import React, {useContext, useState} from 'react';
import "./LogInSignUp.css"
import {UserNameValid} from '../Validation/Validation.js'
import {PasswordValid} from '../Validation/Validation.js'
import StartScreenLogo from '../Logo/StartScreenLogo.js';
import {AuthContext} from '../AuthContext.js';
import {useNavigate} from 'react-router-dom';
import Signup from "./signup_screen/Signup.js";

function LogInSignUp() {
    const navigate = useNavigate();
    const {login, addUser, usersList} = useContext(AuthContext);
    const [cantFindUser, setCantFindUser] = useState("");
    const [passwordFix, setPasswordFix] = useState("");
    const [ConfirmPasswordFix, setConfirmPasswordFix] = useState("");
    const [nameFix, setNameFix] = useState("");

    const [usernameFix, setUsernameFix] = useState("");
    const [loginPage, setLoginPage] = useState(1);

    const [selectedFile, setSelectedFile] = useState(null);


    function getUserInput() {
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
            const userDetails = userExists(userName, password);
            if (!userDetails) {
                setCantFindUser("User does not exist");
                return;
            }
            login(userDetails);
            // Navigate to the desired path
            navigate('/feed');
        }
    }

    function userExists(userName, password) {
        return usersList.find(item => item.userName === userName && item.password === password);

    }

    function addNewUser() {
        if (selectedFile == null) {
            setCantFindUser("Select a picture");
            return;

        }
        var userName = document.getElementById('userName').value;
        const userInfo = usersList.find(item => item.userName === userName);
        if (userInfo != undefined) {
            setCantFindUser("User exist");
            return
        }

        var userId = usersList.length + 1;
        var name = document.getElementById('name').value;
        var profileImage = URL.createObjectURL(selectedFile);
        var password = document.getElementById('password').value;
        var confirmPassword = document.getElementById('confirmPassword').value;


        if (UserNameValid(userName) == "" && UserNameValid(name) == "" && PasswordValid(password) == "" && password == confirmPassword) {
            addUser(userId, userName, name, profileImage, password);
            login({username: userName, name: name, id: userId, profileImage: profileImage});
            navigate('/feed'); // Navigate to feed
        }
        if (password != confirmPassword) {
            setCantFindUser("Verify password and password do not match");
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

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        if (cantFindUser == "Select a picture") {
            setCantFindUser("");
        }
    };


    return (
        <div id="loginContent" style={{height: window.screen.height}}>
            <StartScreenLogo/>
            <div className="box">
                <span style={{color: 'red'}}>{usernameFix}</span>
                <input id="userName" type="userName" className="inputText" placeholder="User Name"
                       aria-label="User Name" required
                       onChange={(event) => handleUsernameChange(event, setUsernameFix)}/>
                <span style={{color: 'red'}}>{passwordFix}</span>
                <input id="password" className="inputText" type="password" placeholder="Password" aria-label="Password"
                       required onChange={(event) => handlePasswordChange(event, setPasswordFix)}></input>

                {!loginPage &&
                    <>
                        <span style={{color: 'red'}}>{ConfirmPasswordFix}</span>
                        <input id="confirmPassword" className="inputText" type="password" placeholder="Confirm Password"
                               aria-label="Confirm Password" required
                               onChange={(event) => handlePasswordChange(event, setConfirmPasswordFix)}></input>
                        <span style={{color: 'red'}}>{nameFix}</span>
                        <input id="name" className="inputText" type="userName" placeholder="Name" aria-label="Name"
                               required onChange={(event) => handleUsernameChange(event, setNameFix)}/>
                        {selectedFile != null && <img id="selectedImage" src={URL.createObjectURL(selectedFile)}/>}
                        <input type="file" onChange={handleFileChange} id="inputFilePost"/>
                    </>
                }
                <button id="logInButton" type="submit"
                        onClick={loginPage ? getUserInput : addNewUser}>{loginPage ? "Log In" : "Sign Up"}</button>
                <span style={{color: 'red'}}>{cantFindUser}</span>
                <div className="bordLine">
                    <hr className="line"></hr>
                </div>
                <div className="newAccount">
                    <button type="button" className={"SU-btn"}
                            id="newAccount" data-bs-toggle="modal"
                            data-bs-target="#signinModal">create new
                        account
                    </button>
                </div>

            </div>
        </div>

    )
}

export default LogInSignUp;