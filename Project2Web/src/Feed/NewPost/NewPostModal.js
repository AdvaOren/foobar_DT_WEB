// NewPostModal.js
import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import "./NewPostModal.css";
import { ReactComponent as Close } from '../../Images/Feed/close-circle.svg';
import { ReactComponent as SendGray } from '../../Images/Feed/send-gray.svg';
import { ReactComponent as SendBlue } from '../../Images/Feed/send-blue.svg';
import { ReactComponent as DeleteB } from '../../Images/Feed/delete-black.svg';
import { ReactComponent as DeleteW } from '../../Images/Feed/delete-white.svg';

import { AuthContext } from '../../AuthContext';


function NewPostModal({ id, profileImage, name, setNewPostPressed, postText, postImage, editPost }) {
    let message = "What's on your mind, " + name + "?";
    const [inputText, setInputText] = useState(postText);
    const [selectedFile, setSelectedFile] = useState(postImage);
    const { postsList, setPostsListFun, theme, user } = useContext(AuthContext);

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const addNewPost = () => {
        if (selectedFile == null) return;
        const updatedPostList = postsList ? [...postsList] : [];

        // Create a new post object
        const newPost = {
            "id": updatedPostList.length + 1,
            "userId": user.id,
            "likes": 0,
            "postUrl": selectedFile ? URL.createObjectURL(selectedFile) : null,
            "comments": [],
            "text": inputText,
            "name": name,
            "profileImage": profileImage,
            "date": new Date().toISOString()
        };
        // Update the post list in the component's state
        setPostsListFun([newPost, ...updatedPostList]);

        // Close the modal
        setNewPostPressed(0);

        // Clear the input field
        setInputText('');
        setSelectedFile(null);
    };
    const changePost = () => {
        const updatedPostList = postsList.map(post => {
            if (post.id === id) {
                // Update the fields 
                return {
                    ...post,
                    text: inputText,
                    postUrl: isValidHttpUrl(selectedFile) ? selectedFile : URL.createObjectURL(selectedFile)
                };
            }
            return post; // For other posts, return them as they are
        });

        setPostsListFun(updatedPostList); // Update the state with the modified post list

        setNewPostPressed(0); // Close the modal

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
    function deletePost() {
        const newPosts = postsList.filter(post => post.id !== id);
        setPostsListFun(newPosts);
    }
    return (
        <div className="newPostModal">
            <div className='newPostPattern'>
                <div className="topModal">
                    <p style={{ fontWeight: 'bold', width: "100%", flexGrow: 1 }}>{editPost ? "Edit Post" : "New Post"}</p>

                    <div id="iconsContent">
                        {editPost && (theme == "theme-light" ? <DeleteB onClick={deletePost} id="deleteIcon" /> : <DeleteW onClick={deletePost} id="deleteIcon" />)}
                        <Close id="closeButton" onClick={() => setNewPostPressed(0)} />
                    </div>
                </div>
                <hr style={{ width: "90%", color: "#e3e3e3", opacity: 0.3 }}></hr>

                <div className="profileNameImg">
                    <img className='profileImg' src={profileImage} alt="post" />
                    <div className='name'>{name}</div>
                </div>
                <div id="addNewPost">
                    <input value={inputText} onChange={handleInputChange} id="inputLinePost" type="text" placeholder={message} />

                    {(inputText != null && inputText !== '') ?
                        <SendBlue id="sendIcon" onClick={editPost ? changePost : addNewPost} /> :
                        <SendGray id="sendIcon" />
                    }
                    {selectedFile != null && <img src={isValidHttpUrl(selectedFile) ? selectedFile : URL.createObjectURL(selectedFile)} id="postImageFromUser" />}
                    <input type="file" onChange={handleFileChange} id="inputFilePost" />
                </div>
            </div>
        </div>
    );
}
NewPostModal.propTypes = {
    profileImage: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    setNewPostPressed: PropTypes.func.isRequired,
    postText: PropTypes.string,
    postImage: PropTypes.URL,
    editPost: PropTypes.bool,
    id: PropTypes.int
};

export default NewPostModal;