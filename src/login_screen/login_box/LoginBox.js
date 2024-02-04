import './LoginBox.css'
import {useRef, useState} from "react";
import React from "react";


let loginBoxRef;

function LoginBox({loginMembers}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const passwordRef = useRef(null);
    loginBoxRef = useRef('')


    //check is a function that check if the email and password exists in the login members
    const check = function (e) {
        let exists = false;
        loginMembers.forEach((member) => {
            if (member.password === password && member.email === email) {
                exists = true;
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
        }
    }

    return (
        <form className="container-fluid g-3 needs-validation" noValidate id="loginForm" ref={loginBoxRef}>
            <div className="row">
                <div className="col-7"></div>
                <div className="card shadow col-4">
                    <div className="card-body">
                        <div className="row m-t-15px ">
                            <label htmlFor="validationLogin1" className="form-label"></label>
                            <input type="text" className="form-control input-lg" id="validationLogin1"
                                   placeholder="Email address or phone number" required
                                   onChange={(e) => setEmail(e.target.value)}></input>
                            <div className="valid-feedback"></div>
                        </div>
                        <div className="row  m-t-0">
                            <label htmlFor="validationLogin2" className="form-label"></label>
                            <input type="password" className="form-control input-lg" id="validationLogin2"
                                   placeholder="password" required ref={passwordRef}
                                   onChange={(e) => setPassword(e.target.value)}></input>
                            <div className="invalid-feedback">email or password incorrect</div>
                        </div>
                        <div className="row ">
                            <button className="btn btn-primary btn-login-box fw-bold" type="submit"
                                    onClick={check}>Log
                                in
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
                                    data-bs-target="#signinModal">create new account
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