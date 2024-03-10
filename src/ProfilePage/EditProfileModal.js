import React, { useRef, useState, useContext } from "react";
import "./EditProfileModal.css"
import { ReactComponent as Close } from '../Images/Feed/close-circle.svg';
import { editUserNImage, editUserWImage } from "../serverCalls/EditProfile.js";
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
                await editUserWImage(user.id, email, firstName, lastName, password, user.token, selectedFile);
            }
            // Image has not changed
            else{
                await editUserNImage(user.id, email, firstName, lastName, password, user.token);
            }
            setUserVar(userDet);
            setEditClicked(false);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleFileChange = (event) => {

        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setSelectedFile(reader.result);
        };
        reader.readAsDataURL(file);
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
        <div className="newPostModal">
            <div className='newPostPattern'>
                <div className="topModal">
                    <p style={{
                        fontWeight: 'bold',
                        width: "100%",
                        flexGrow: 1
                    }}>Edit Profile</p>

                    <div id="iconsContent">
                        <Close id="closeButton" onClick={() => setEditClicked(false)} />
                    </div>
                </div>
                <hr style={{ width: "90%", color: "#e3e3e3", opacity: 0.3 }}></hr>

                <div id="addNewPost">
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
                            id="postImageFromUser" />}
                    <input type="file" onChange={(e)=>handleFileChange(e)} id="inputFilePost" />
                </div>
                <button id="saveButton" type="submit" onClick={saveDet}>Save</button>
            </div>
        </div>
    );
}

export default EditProfileModal;
