import './InputBoxes.css';
import React from "react";


let firstNameRef;
let lastNameRef;
let emailRef;
let passwordRef;
let passwordVerificationRef;

function InputBoxes({setFirstName, setLastName, setEmail, setPassword, setPasswordVerification}) {
    firstNameRef = React.useRef(null);
    lastNameRef = React.useRef(null);
    emailRef = React.useRef(null);
    passwordRef = React.useRef(null);
    passwordVerificationRef = React.useRef(null);


    return (
        <div className="row">
            <div className="col-6 ">
                <label htmlFor="validationSignUpFirstName" className="form-label float-start"></label>
                <input type="text" className="form-control bg-body-secondary m-t-10px"
                       id="validationSignUpFirstName"
                       placeholder="First name" required ref={firstNameRef}
                       onChange={(e) => setFirstName(e.target.value)}></input>
            </div>
            <div className="col-6">
                <label htmlFor="validationSignUpLastName" className="form-label float-start"></label>
                <input type="text" className="form-control bg-body-secondary m-t-10px"
                       id="validationSignUpLastName"
                       placeholder="Last name" required ref={lastNameRef}
                       onChange={(e) => setLastName(e.target.value)}></input>
            </div>
            <div className="col-12">
                <label htmlFor="validationSignUpEmail" className="form-label float-start"></label>
                <input type="text" className="form-control bg-body-secondary m-t-10px"
                       id="validationSignUpEmail"
                       placeholder="Mobile number or email address" required ref={emailRef}
                       onChange={(e) => setEmail(e.target.value)}
                ></input>
                <div className="invalid-feedback">Email already exists</div>
            </div>
            <div className="password-rules">
                passwords rules:
                <ul className="m-0">
                    <li>at least 8 characters.</li>
                    <li>at least one Upper case and one Lower case letter.</li>
                    <li>at least one special character.</li>
                </ul>
            </div>
            <div className="col-12 ">
                <label htmlFor="validationSignUpPassword" className="form-label float-start"></label>
                <input type="password" className="form-control bg-body-secondary m-t-10px"
                       id="validationSignUpPassword"
                       placeholder="password" required ref={passwordRef}
                       onChange={(e) => setPassword(e.target.value)}
                       data-bs-toggle="popover" data-bs-custom-class="custom-popover" data-bs-title="Custom popover"
                       data-bs-content="This popover is themed via CSS variables."></input>
                <div className="invalid-feedback">Password don't stand in the criteria</div>

            </div>
            <div className="col-12 ">
                <label htmlFor="validationSignUpPasswordVerification" className="form-label float-start"></label>
                <input type="password" className="form-control bg-body-secondary m-t-10px"
                       id="validationSignUpPasswordVerification"
                       placeholder="password verification" required ref={passwordVerificationRef}
                       onChange={(e) => setPasswordVerification(e.target.value)}></input>
                <div className="invalid-feedback">Passwords aren't identical</div>
            </div>

        </div>
    );
}


export function updateValuesInputBox(firstName, lastName, email, password, passwordVerification) {
    firstNameRef.current.value = firstName;
    lastNameRef.current.value = lastName;
    emailRef.current.value = email;
    passwordRef.current.value = password;
    passwordVerificationRef.current.value = passwordVerification;
}

export default InputBoxes;