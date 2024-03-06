import React, { useRef, useState, useContext } from "react";
import "./EditProfileModal.css"
import { ReactComponent as Close } from '../Images/Feed/close-circle.svg';
import { editUserNImage } from "../serverCalls/EditProfile.js";
import { AuthContext } from "../AuthContext.js";

function EditProfileModal({ userId, setEditClicked }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const { user, setUserVar } = useContext(AuthContext);

    const [selectedFile, setSelectedFile] = useState(null);

    const saveDet = async (e) => {
        e.preventDefault();
        var firstName = document.getElementById('firstName').value;
        var lastName = document.getElementById('lastName').value;
        var password = document.getElementById('password').value;
        var email = document.getElementById('email').value;
        // Nothing has changed
        if ((firstName == '' || firstName == ' ') && (lastName == '' || lastName == ' ')
            && selectedFile == null && (password == '' || password == ' ')
            && (email == '' || email == ' ')) {
            setEditClicked(false);
            return;
        }

        firstName = (firstName == '' || firstName == ' ') ? user.firstName : firstName;
        lastName = (lastName == '' || lastName == ' ') ? user.lastName : lastName;
        password = (password == '' || password == ' ') ? user.password : password;
        email = (email == '' || email == ' ') ? user.email : email;
        let userDet = {
            username: email,
            name: firstName + " " + lastName,
            id: user.id,
            profileImage: (selectedFile == null) ? user.profileImage : selectedFile,
            token: user.token,
            email: email,
            password: password,
            lastName: lastName,
            firstName: firstName,
        }
        try {
            // Image has changed
            if (selectedFile != null) {
                return;
            }
            // Image has not changed
            await editUserNImage(user.id, email, firstName, lastName, password, user.token);
            setUserVar(userDet);
            setEditClicked(false);

        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };
    function isValidHttpUrl(string) {
        let url;

        try {
            url = new URL(string);
        } catch (_) {
            return false;
        }

        return true;
    }

    return (
        <div id="editProfileModalContent">
            <div id="editModalPattern">
                <div id="topEditPattern">
                    <p style={{ fontWeight: 'bold' }}>Edit Profile</p>
                    <Close id="closeButtonEdit" onClick={() => setEditClicked(false)} />
                </div>

                <input id="firstName" type="text" className="inputTextEdit" placeholder="First Name"
                    aria-label="First Name"
                />
                <input id="lastName" className="inputTextEdit" type="text" placeholder="Last Name" aria-label="Last Name"
                />
                <input id="password" className="inputTextEdit" type="text" placeholder="New Password" aria-label="New Password"
                />
                <input id="email" className="inputTextEdit" type="text" placeholder="New Email" aria-label="New Email"
                />
                {selectedFile != null &&
                    <img src={isValidHttpUrl(selectedFile) ? selectedFile : URL.createObjectURL(selectedFile)}
                        id="postImageEdit" />}
                <div id="inputFileEdit">

                    <input type="file" onChange={handleFileChange}  />
                </div>
                <button id="saveButton" type="submit"
                    onClick={saveDet}>Save</button>
            </div>
        </div>
    );
}

export default EditProfileModal;
