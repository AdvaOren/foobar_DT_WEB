import React from "react";

let firstNameRef;
let lastNameRef;
let emailRef;
let passwordRef;

function InputBoxes({member, setFirstName, setLastName, setEmail, setPassword}) {
    firstNameRef = React.useRef(null);
    lastNameRef = React.useRef(null);
    emailRef = React.useRef(null);
    passwordRef = React.useRef(null);


    return (
        <div className="row">
            <div className="col-6 ">
                <label htmlFor="validationSignUpFirstName" className="form-label"></label>
                <input type="text" className="form-control bg-body-secondary"
                       id="validationSignUpFirstName"
                       placeholder="First name" required ref={firstNameRef}
                       onChange={(e) => setFirstName(e.target.value)}></input>
            </div>
            <div className="col-6">
                <label htmlFor="validationSignUpLastName" className="form-label"></label>
                <input type="text" className="form-control bg-body-secondary"
                       id="validationSignUpLastName"
                       placeholder="Last name" required ref={lastNameRef}
                       onChange={(e) => setLastName(e.target.value)}></input>
            </div>
            <div className="col-12">
                <label htmlFor="validationSignUpEmail" className="form-label"></label>
                <input type="text" className="form-control bg-body-secondary"
                       id="validationSignUpEmail"
                       placeholder="Mobile number or email address" required ref={emailRef}
                       onChange={(e) => setEmail(e.target.value)}></input>
            </div>
            <div className="col-12 ">
                <label htmlFor="validationSignUpPassword" className="form-label"></label>
                <input type="password" className="form-control bg-body-secondary"
                       id="validationSignUpPassword"
                       placeholder="password" required ref={passwordRef}
                       onChange={(e) => setPassword(e.target.value)}></input>
            </div>
        </div>
    );
}


export function updateValuesInputBox(firstName,lastName,email,password) {
    firstNameRef.current.value = firstName;
    lastNameRef.current.value = lastName;
    emailRef.current.value = email;
    passwordRef.current.value = password;
}

export default InputBoxes;