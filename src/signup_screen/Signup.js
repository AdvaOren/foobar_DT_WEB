import './Signup.css'
import Birthdate, {updateValuesBirthdate} from "./birthdate/Birthdate";
import Gender from "./gender/Gender";
import InputBoxes, {updateValuesInputBox} from "./input_boxes/InputBoxes"
import {useRef, useState} from "react";

let firstName, setFirstName
let lastName, setLastName
let email, setEmail
let password, setPassword
let passwordVerification, setPasswordVerification
let day, setDay
let month, setMonth
let year, setYear
let gender, setGender


function Signup({loginMembers}) {

    [firstName, setFirstName] = useState('');
    [lastName, setLastName] = useState('');
    [email, setEmail] = useState('');
    [password, setPassword] = useState('');
    [passwordVerification, setPasswordVerification] = useState('');
    [day, setDay] = useState('');
    [month, setMonth] = useState('');
    [year, setYear] = useState('');
    [gender, setGender] = useState('M');
    const closeRef = useRef(null);

    const newMember = {
        "firstName": "",
        "lastName": "",
        "email": "",
        "password": "",
        "date": "",
        "gender": ""
    }
    const signupCLicked = function (e) {
        initMemeber(newMember);
        let hasEmptyInputBox = checkForEmptyInput(newMember);
        if (hasEmptyInputBox) {
            valid()
            return;
        }
        //check for existing user by email
        let exists = false;
        loginMembers.forEach((member) => {
            if (member.email === newMember.email) {
                exists = true;
            }
        });
        if (exists) {
            handleExists(newMember);
        } else if (!isDateValid(newMember.date)) { //check that the date is valid
            handleIllegalDate(newMember);
        } else if (password !== passwordVerification) { //check the passwords identical
            handlePasswordsNotMatch(newMember);
        } else if (!checkPassword()) { //check the password stand in the criteria
            handlePasswordNotValid(newMember);
        } else { //add the new member
            addMember(e, newMember, loginMembers, closeRef);
        }
    }


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
                        <form className="container-fluid g-3 needs-validation" noValidate id="signUpForm">
                            <InputBoxes member={newMember} setFirstName={setFirstName} setLastName={setLastName}
                                        setEmail={setEmail} setPassword={setPassword}
                                        setPasswordVerification={setPasswordVerification}/>
                            <Birthdate member={newMember} setDay={setDay} setMonth={setMonth} setYear={setYear}/>
                            <Gender member={newMember} setGender={setGender}/>
                            <p className="super-mini text-secondary-emphasis">People who use our service
                                may have uploaded your contact information to Facebook. Learn more.</p>
                            <p className="super-mini text-secondary-emphasis">By clicking Sign Up, you
                                agree to our Terms, Privacy Policy and Cookies Policy. You may receive
                                SMS notifications from us and can opt out at any time.</p>
                            <div className="row">
                                <button type="submit" onClick={signupCLicked}
                                        className="col-4 fs-5 p-0 btn btn-signup fw-bold top-50 start-50 translate-middle-x">Sign
                                    Up
                                </button>
                            </div>
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
function checkPassword() {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return /[A-Z]/.test(password) && /[a-z]/.test(password)
        && specialChars.test(password) && password.length >= 8;
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
 * The function add new member to the system
 * Input: the event, the new member, all the members, and ref to the close button
 */
function addMember(e, newMember, loginMembers, closeRef) {
    e.preventDefault()
    loginMembers.push(newMember);
    console.log("add new member")
    updateValuesInputBox("", "", "", "");
    updateValuesBirthdate("", "", "");
    initMemeber(newMember);
    closeRef.current.click();
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
}

/** the function check two thing:
 1) that the date in the past
 2) that exists such a date, for example 30/2 is not exists
 * Input:  the date to check
 * Output: if the date is fine
 */
function isDateValid(date) {
    let today = new Date()
    let gotDate = new Date(date)
    return (today > gotDate && date.slice(-2) == gotDate.getDate());
}

/**
 * The function disabling form submissions if there are invalid fields
 */
function valid() {

    'use strict'
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        if (form.id === "signUpForm") {
            form.addEventListener('submit', event => {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        }
    })
}

export default Signup;