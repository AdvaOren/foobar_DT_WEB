import './Signup.css'
import Birthdate, { updateValuesBirthdate } from "./birthdate/Birthdate.js";
import Gender, { updateValuesGender } from "./gender/Gender.js";
import InputBoxes, { updateValuesInputBox } from "./input_boxes/InputBoxes.js"
import { useRef, useState, useContext } from "react";
import Image, { updateValuesImage } from "./image/Image.js";
import { AuthContext } from '../../AuthContext.js';
import { useNavigate } from 'react-router';
import { PasswordValid } from '../../Validation/Validation.js';
import { userExists } from '../../serverCalls/LogInSignUp.js';

let firstName, setFirstName;
let lastName, setLastName;
let email, setEmail;
let password, setPassword;
let passwordVerification, setPasswordVerification;
let day, setDay;
let month, setMonth;
let year, setYear;
let gender, setGender;
let img, setImg
let signupRef;

function Signup() {
    const navigate = useNavigate();
    [firstName, setFirstName] = useState('');
    [lastName, setLastName] = useState('');
    [email, setEmail] = useState('');
    [password, setPassword] = useState('');
    [passwordVerification, setPasswordVerification] = useState('');
    [day, setDay] = useState('');
    [month, setMonth] = useState('');
    [year, setYear] = useState('');
    [gender, setGender] = useState('M');
    [img, setImg] = useState('');
    const closeRef = useRef(null);
    const resetRef = useRef(null);
    const { login, addUser, user } = useContext(AuthContext);
    signupRef = useRef('');

    let newMember = {
        "firstName": "",
        "lastName": "",
        "email": "",
        "password": "",
        "date": "",
        "gender": "",
        "img": ""
    }

    const signupCLicked = async (e) => {
        e.preventDefault();
        initMemeber(newMember);
        let hasEmptyInputBox = checkForEmptyInput(newMember);
        if (hasEmptyInputBox) {
            valid()
            return;
        }
        let exists;
        exists = await userExists(newMember.email); //check for existing user by email


        if (exists) {
            handleExists(newMember);
        } else if (!isDateValid(newMember.date)) { //check that the date is valid
            handleIllegalDate(newMember);
        } else if (password !== passwordVerification) { //check the passwords identical
            handlePasswordsNotMatch(newMember);
        } else if (PasswordValid(password) != '') { //check the password stand in the criteria
            handlePasswordNotValid(newMember);
        } else { //add the new member
            await addMember(e);
            // setTimeout(() => {
            // }
            navigate('/feed');

        }
    }

    /**
     * The function add new member to the system
     * Input: the event, the new member, all the members, and ref to the close button and the reset button
     */
    async function addMember(e) {
        e.preventDefault()
        const copy = JSON.parse(JSON.stringify(newMember));
        const userData = {
            email: copy.email,
            firstName: copy.firstName,
            lastName: copy.lastName,
            password: copy.password,
            img: copy.img,
        };
        const newUser = await addUser(userData);
        updateValuesInputBox("", "", "", "", "");
        updateValuesBirthdate("", "", "");
        updateValuesImage("");
        updateValuesGender("")
        resetMember(newMember, resetRef);
        await resetRef.current.click();
        await closeRef.current.click();
        await signupRef.current.classList.remove('was-validated')
        await login(newUser);
    }

    // const userExists = async (email) => {
    //     const res = await fetch(`http://localhost:8080/api/users/${email}`); // Find user exists by email
    //     if (res.ok) {
    //         const data = await res.json(); // Parse response body as JSON
    //         if (data && Object.keys(data).length > 0) {
    //             return true; // User found
    //         } else {
    //             return false // User not found
    //         }
    //     } else {
    //         console.error('Error:', res.status);
    //         return false;
    //     }
    // }
    return (
        <div className="modal fade" id="signinModal" tabIndex="-1" aria-labelledby="modalLabel"
            aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="container-fluid">
                            <div className="row">
                                <h1 className="modal-title fs-2 col-6" id="modalLabel">Sign Up</h1>
                                <button type="button" className="btn-close float-end"
                                    data-bs-dismiss="modal" ref={closeRef}
                                    aria-label="Close"></button>
                            </div>
                            <div className="row " id="sub-title">
                                <div className="row ">It's quick and easy.</div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-body">
                        <form className="container-fluid g-3 needs-validation" noValidate id="signUpForm" ref={signupRef}>
                            <InputBoxes member={newMember} setFirstName={setFirstName} setLastName={setLastName}
                                setEmail={setEmail} setPassword={setPassword}
                                setPasswordVerification={setPasswordVerification} />
                            <Birthdate member={newMember} setDay={setDay} setMonth={setMonth} setYear={setYear} />
                            <Gender member={newMember} setGender={setGender} />
                            <Image img={img} setImg={setImg} />
                            <p className="super-mini text-secondary-emphasis">People who use our service
                                may have uploaded your contact information to Facebook. Learn more.</p>
                            <p className="super-mini text-secondary-emphasis">By clicking Sign Up, you
                                agree to our Terms, Privacy Policy and Cookies Policy. You may receive
                                SMS notifications from us and can opt out at any time.</p>
                            <div className="row">
                                <button type="submit" onClick={signupCLicked} title="submit-btn"
                                    className="col-4 fs-5 p-0 btn btn-signup fw-bold top-50 start-50 translate-middle-x">
                                    Sign Up
                                </button>
                            </div>
                            <button className="float-start d-none" type="reset" ref={resetRef}></button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );

}

/**
 * The function handle the case that the password don't stand on the criteria
 * Input: the new member
 */
function handlePasswordNotValid(newMember) {
    newMember.password = "";
    setPassword("");
    setPasswordVerification("");
    updateValuesInputBox(firstName, lastName, email, "", passwordVerification);
    valid();
}

/**
 * The function check if the password stand in the criteria
 * Output: if the password is legal or not
 */
export function checkPassword(passwordForTest) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return /[A-Z]/.test(passwordForTest) && /[a-z]/.test(passwordForTest)
        && specialChars.test(passwordForTest) && passwordForTest.length >= 8;
}

/**
 * The function handle the case that the password and the verification password are not identical
 * Input: the new member
 */
function handlePasswordsNotMatch(newMember) {
    newMember.password = ""
    setPassword("")
    setPasswordVerification("")
    updateValuesInputBox(firstName, lastName, email, "", "");
    valid()
}



/**
 * The function handle the case that the user enter an illegal date
 * Input: the new member
 */
function handleIllegalDate(newMember) {
    setDay("")
    setMonth("")
    setYear("")
    newMember.date = "";
    updateValuesBirthdate("", "", "");
    valid()
}

/**
 * The function handle the case that the user enter an email that already exists in the system
 * Input: the new member
 */
function handleExists(newMember) {
    newMember.email = ""
    setEmail("")
    newMember.password = ""
    setPassword("")
    setPasswordVerification("")
    updateValuesInputBox(firstName, lastName, "", "", "");
    valid();
}

/**
 * The function check if the user filled in all the fields
 * Input: the new member
 * Output: fill or not
 */
function checkForEmptyInput(member) {
    let hasEmptyInputBox = false;
    Object.keys(member).forEach(key => {
        if (member[key] === "")
            hasEmptyInputBox = true;
    });
    //check for the verification password that don't have field in the member object
    if (passwordVerification === "")
        hasEmptyInputBox = true;
    return hasEmptyInputBox;
}

/**
 * The function init the new member with the parms that the user enter.
 * Input: the new member
 */
function initMemeber(member) {
    member.firstName = firstName;
    member.lastName = lastName;
    member.email = email;
    member.password = password;
    if (day < 10)
        setDay("0" + day);
    if (month < 10)
        setMonth("0" + month);
    member.date = year + "-" + month + "-" + day;
    member.gender = gender;
    member.img = img;
}

/**The function reset the member
 * Input: the member to reset
 */
function resetMember(member, resetRef) {
    Object.keys(member).forEach(key => {
        member[key] = ""
    });
    resetRef.current.click();
}

/** the function check two thing:
 1) that the date in the past
 2) that exists such a date, for example 30/2 is not exists
 * Input:  the date to check
 * Output: if the date is fine
 */
export function isDateValid(date) {
    let today = new Date()
    let gotDate = new Date(date)
    return (today > gotDate && date.slice(-2) == gotDate.getDate());
}

/**
 * The function disabling signup form submissions if there are invalid fields
 */
function valid() {
    'use strict'
    signupRef.current.addEventListener('submit', event => {
        if (!signupRef.current.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
        }
        signupRef.current.classList.add('was-validated')
    }, false)
}



export default Signup;