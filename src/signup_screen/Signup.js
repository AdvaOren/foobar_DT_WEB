import './Signup.css'
import Birthdate, {updateValuesBirthdate} from "./birthdate/Birthdate";
import Gender from "./gender/Gender";
import InputBoxes, {updateValuesInputBox} from "./input_boxes/InputBoxes"
import {useRef, useState} from "react";

let firstName,setFirstName
let lastName,setLastName
let email,setEmail
let password,setPassword
let day,setDay
let month,setMonth
let year,setYear
let gender,setGender

function Signup({loginMembers}) {

    [firstName,setFirstName] = useState('');
    [lastName,setLastName] = useState('');
    [email,setEmail] = useState('');
    [password,setPassword] = useState('');
    [day,setDay] = useState('');
    [month,setMonth] = useState('');
    [year,setYear] = useState('');
    [gender,setGender] = useState('M');
    const closeRef = useRef(null);

    const newMember = {
        "firstName": "",
        "lastName": "",
        "email": "",
        "password": "",
        "date": "",
        "gender": ""
    }
    const addMember = function (e) {
//        e.preventDefault()
        initMemeber(newMember)
        let hasEmptyInputBox = false;
        Object.keys(newMember).forEach(key => {
            if (newMember[key] === "")
                hasEmptyInputBox = true;
        });
        if (hasEmptyInputBox) {
            valid()
        }
        else {
            let exists = false;
            loginMembers.forEach((member) => {
                if (member.email === newMember.email) {
                    exists = true;
                }
            });

            if (exists) {
                newMember.email = ""
                setEmail("")
                newMember.password = ""
                setPassword("")
                updateValuesInputBox(firstName,lastName,"","");
                valid();
            } else if (!isDateValid(newMember.date)) {
                setDay("")
                setMonth("")
                setYear("")
                newMember.date = "";
                updateValuesBirthdate("","","");
                valid()
            } else {
                e.preventDefault()
                loginMembers.push(newMember);
                console.log("add new member")
                closeRef.current.click();
            }
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
                                        setEmail={setEmail} setPassword={setPassword}/>
                            <Birthdate member={newMember} setDay={setDay} setMonth={setMonth} setYear={setYear}/>
                            <Gender member={newMember} setGender={setGender}/>
                            <p className="super-mini text-secondary-emphasis">People who use our service
                                may have uploaded your contact information to Facebook. Learn more.</p>
                            <p className="super-mini text-secondary-emphasis">By clicking Sign Up, you
                                agree to our Terms, Privacy Policy and Cookies Policy. You may receive
                                SMS notifications from us and can opt out at any time.</p>
                            <div className="row">
                                <button type="submit" onClick={addMember}
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

function initMemeber(member) {
    member.firstName = firstName;
    member.lastName = lastName;
    member.email = email;
    member.password = password;
    if (day < 10)
        setDay("0" + day);
    if (month < 10)
        setMonth("0" + month);
    member.date =year+"-"+month+"-"+day;
    member.gender = gender;
}

/*check two thing:
    1) that the date in the past
    2) that exists such a date, for example 30/2 is not exists
 */
function isDateValid(date) {
    let today = new Date()
    let gotDate = new Date(date)
    return (today > gotDate && date.slice(-2) == gotDate.getDate());
}

function valid() {
    // Example starter JavaScript for disabling form submissions if there are invalid fields

    'use strict'
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        if (form.id !== "loginForm" && form.id === "signUpForm") {
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