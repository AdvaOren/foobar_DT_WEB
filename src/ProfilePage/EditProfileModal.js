import React, { useRef, useState, useContext } from "react";
import "./EditProfileModal.css"
import { ReactComponent as Close } from '../Images/Feed/close-circle.svg';
import { deleteUser, editUserNImage, editUserWImage } from "../serverCalls/EditProfile.js";
import { AuthContext } from "../AuthContext.js";
import { PasswordValid } from "../Validation/Validation.js";

function EditProfileModal({ setEditClicked }) {
    const { user, setUserVar, logout } = useContext(AuthContext);
    const [passwordFix, setPasswordFix] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

    const DeleteAccount = async (e) => {
        await deleteUser(user.id, user.token);
        logout();
    }
    const saveDet = async (e) => {
        e.preventDefault();
        var firstName = document.getElementById('firstName').value;
        var lastName = document.getElementById('lastName').value;
        var password = document.getElementById('password').value;

        // Nothing has changed
        if ((firstName == '' || firstName == ' ') && (lastName == '' || lastName == ' ')
            && selectedFile == null && (password == '' || password == ' ')) {
            setEditClicked(false);
            return;
        }

        firstName = (firstName == '' || firstName == ' ') ? user.firstName : firstName;
        lastName = (lastName == '' || lastName == ' ') ? user.lastName : lastName;
        password = (password == '' || password == ' ') ? user.password : password;
        const newPassFix = PasswordValid(password)
        setPasswordFix(newPassFix);
        if (newPassFix != "") {
            return;
        }
        let userDet = {
            name: firstName + " " + lastName,
            id: user.id,
            profileImage: (selectedFile == null) ? user.profileImage : selectedFile,
            token: user.token,
            password: password,
            lastName: lastName,
            firstName: firstName,
        }
        try {
            // Image has changed
            if (selectedFile != null) {
                await editUserWImage(user.id, firstName, lastName, password, user.token, selectedFile);
            }
            // Image has not changed
            else{
                await editUserNImage(user.id, firstName, lastName, password, user.token);
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
            <div className='EditProfilePattern'>
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
                    /><br></br>
                    <input id="lastName" className="inputTextEdit" type="text" placeholder="Last Name" aria-label="Last Name"
                    /><br></br>
                    <span style={{ color: 'red' }}>{passwordFix}</span><br></br>
                    <input id="password" className="inputTextEdit" type="text" placeholder="New Password" aria-label="New Password"
                    /><br></br>
                    {selectedFile != null &&
                        <img src={isValidHttpUrl(selectedFile) ? selectedFile : URL.createObjectURL(selectedFile)}
                            id="postImageFromUser" />}
                    <input type="file" onChange={(e)=>handleFileChange(e)} id="inputFilePost" /><br></br>
                </div>
                <button id="saveButton" type="submit" onClick={saveDet}>Save</button>
                <button id="DeleteButton" type="submit" onClick={DeleteAccount}>Delete Account</button>
            </div>
        </div>
    );
}

export default EditProfileModal;
