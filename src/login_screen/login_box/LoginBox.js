import './LoginBox.css'
import React, {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";

let loginBoxRef;

function LoginBox({loginMembers}) {
    const [theme, setTheme] = useState('light');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const passwordRef = useRef(null);
    loginBoxRef = useRef('')
    const navigate = useNavigate()

    //check is a function that check if the email and password exists in the login members
    const check = function (e) {
        let exists = false;
        let userMember;
        loginMembers.forEach((member) => {
            if (member.password === password && member.email === email) {
                exists = true;
                userMember = member;
            }
        });

        //if not exists clear the password input and print a message
        if (!exists) {
            passwordRef.current.value = ""
            setPassword("")
            valid()
        }
        // if exists move to feed screen
        else {
            e.preventDefault()
            console.log("exists")
            loginBoxRef.current.classList.remove('was-validated')
            //somehow move to feed
            navigate("/feedScreen", {
                    state: {
                        firstN: userMember.firstName,
                        LastN: userMember.lastName,
                        userImg: userMember.img,
                        didLogin: true
                    }
                }
            )
        }
    }


    const toggleTheme = (e) => {
        e.preventDefault()
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        // Update the theme of the <html> tag
        document.documentElement.setAttribute('data-bs-theme', newTheme);
    };


return (
    <form className="container-fluid g-3 needs-validation" noValidate
          id="loginForm" ref={loginBoxRef}>
        <div className="row">
            <div className="col-7"></div>
            <div className="card shadow col-4">
                <div className="card-body">
                    <div className="row m-t-15px ">
                        <label htmlFor="validationLogin1"
                               className="form-label"></label>
                        <input type="text" className="form-control input-lg"
                               id="validationLogin1"
                               placeholder="Email address or phone number"
                               required
                               onChange={(e) => setEmail(e.target.value)}></input>
                        <div className="valid-feedback"></div>
                    </div>
                    <div className="row  m-t-0">
                        <label htmlFor="validationLogin2"
                               className="form-label"></label>
                        <input type="password"
                               className="form-control input-lg"
                               id="validationLogin2"
                               placeholder="Password" required
                               ref={passwordRef}
                               onChange={(e) => setPassword(e.target.value)}></input>
                        <div className="invalid-feedback">email or password
                            incorrect
                        </div>
                    </div>
                    <div className="row ">
                        <button
                            className="btn btn-primary btn-login-box fw-bold"
                            type="submit"
                            onClick={check}>Log in
                        </button>
                    </div>
                    <div className="row text-center m-t-15px">
                        <a href="#">Forgotten password?</a>
                    </div>
                    <div className="row">
                        <hr className="divider m-t-15px p-0"></hr>
                    </div>
                    <div className="row m-b-15px ">
                        <button type="button"
                                className="btn btn-signin btn-login-box fw-bold top-50 start-50 translate-middle-x"
                                data-bs-toggle="modal"
                                data-bs-target="#signinModal">create new
                            account
                        </button>
                    </div>
                    <div className="row m-b-15px p-0">
                        <button className="color-mode-btn"
                                onClick={toggleTheme}>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 width="16" height="16" fill="currentColor"
                                 className="bi bi-palette-fill"
                                 viewBox="0 0 16 16">
                                <path
                                    d="M12.433 10.07C14.133 10.585 16 11.15 16 8a8 8 0 1 0-8 8c1.996 0 1.826-1.504 1.649-3.08-.124-1.101-.252-2.237.351-2.92.465-.527 1.42-.237 2.433.07M8 5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m4.5 3a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3M5 6.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m.5 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </form>
);
}

/**
 * The function disabling login form submissions if there are invalid fields
 */
function valid() {
    'use strict'
    loginBoxRef.current.addEventListener('submit', event => {
        if (!loginBoxRef.current.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
        }
        loginBoxRef.current.classList.add('was-validated')
    }, false)
}

export default LoginBox;