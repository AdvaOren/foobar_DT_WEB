// NewPostModal.js
import React, {useState, useContext} from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import "./NewPostModal.css";
import {ReactComponent as Close} from '../../Images/Feed/close-circle.svg';
import {ReactComponent as SendGray} from '../../Images/Feed/send-gray.svg';
import {ReactComponent as SendBlue} from '../../Images/Feed/send-blue.svg';
import {ReactComponent as DeleteB} from '../../Images/Feed/delete-black.svg';
import {ReactComponent as DeleteW} from '../../Images/Feed/delete-white.svg';

import {AuthContext} from '../../AuthContext.js';
import {json} from "react-router";


function NewPostModal({id, profileImage, name, setNewPostPressed, postText, postImage, editPost}) {
    let message = "What's on your mind, " + name + "?";
    const [inputText, setInputText] = useState(postText);
    const [selectedFile, setSelectedFile] = useState(postImage);
    const {postsList, setPostsListFun, theme, user} = useContext(AuthContext);

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const addNewPost = async () => {
        if (selectedFile == null) return;
        const updatedPostList = postsList ? [...postsList] : [];
        const response = await fetch((`http://localhost:8080/api/users/${user.id}/posts`), {
            "method": "POST",
            headers: {
                "Content-Type": "application/json",
                'authorization': 'bearer ' + user.token // attach the token
            },
            body: JSON.stringify({
                content: inputText,
                img: selectedFile ? URL.createObjectURL(selectedFile) : null,
                date: new Date().toISOString()
            })
        })

        const newPost = await response.json();
        //newPost._doc is the post details
        const postDet = newPost._doc;
        console.log("newPost", newPost);
        const add = {
            id: postDet._id,
            userId: user.id,
            text: postDet.text,
            postUrl: selectedFile ? URL.createObjectURL(selectedFile) : null,
            date: postDet.date,
            likes: 0,
            comments: [],
            name: newPost.name,
            profileImage: newPost.profileImage
        }


        // Update the post list in the component's state
        setPostsListFun([add, ...updatedPostList]);

        // Close the modal
        setNewPostPressed(0);

        // Clear the input field
        setInputText('');
        setSelectedFile(null);


        /* if (selectedFile == null) return;
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
        setSelectedFile(null);*/
    };
    const changePost = async () => {
        const updatedPostList = await postsList.map(async post => {
                    if (post.id === id) {
                        const response = fetch((`http://localhost:8080/api/users/${user.id}/posts/${id}`), {
                                method: "PUT",
                                headers: {
                                    "Content-Type": "application/json",
                                    'authorization': 'bearer ' + user.token // attach the token
                                },
                                body: JSON.stringify({

                                    img: isValidHttpUrl(selectedFile) ? selectedFile : URL.createObjectURL(selectedFile),
                                    content: inputText
                                })
                            }
                        )
                        return await response.json();
                    }


                    /*    // Update the fields
                    return {
                        ...post,
                        text: inputText,
                        postUrl: isValidHttpUrl(selectedFile) ? selectedFile : URL.createObjectURL(selectedFile)
                    };
                }*/
                    return post; // For other posts, return them as they are
                }
            )
        ;

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

    async function deletePost() {
        const deleted = await fetch(`http://localhost:8080/api/users/${user.id}/posts/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'authorization': 'bearer ' + user.token // attach the token
            }
        })
        const newPosts = postsList.filter(post => post.id !== id);
        setPostsListFun(newPosts);
    }

    return (
        <div className="newPostModal">
            <div className='newPostPattern'>
                <div className="topModal">
                    <p style={{
                        fontWeight: 'bold',
                        width: "100%",
                        flexGrow: 1
                    }}>{editPost ? "Edit Post" : "New Post"}</p>

                    <div id="iconsContent">
                        {editPost && (theme == "theme-light" ? <DeleteB onClick={deletePost} id="deleteIcon"/> :
                            <DeleteW onClick={deletePost} id="deleteIcon"/>)}
                        <Close id="closeButton" onClick={() => setNewPostPressed(0)}/>
                    </div>
                </div>
                <hr style={{width: "90%", color: "#e3e3e3", opacity: 0.3}}></hr>

                <div className="profileNameImg">
                    <img className='profileImg' src={profileImage} alt="post"/>
                    <div className='name'>{name}</div>
                </div>
                <div id="addNewPost">
                    <input value={inputText} onChange={handleInputChange} id="inputLinePost" type="text"
                           placeholder={message}/>

                    {(inputText != null && inputText !== '') ?
                        <SendBlue id="sendIcon" onClick={editPost ? changePost : addNewPost}/> :
                        <SendGray id="sendIcon"/>
                    }
                    {selectedFile != null &&
                        <img src={isValidHttpUrl(selectedFile) ? selectedFile : URL.createObjectURL(selectedFile)}
                             id="postImageFromUser"/>}
                    <input type="file" onChange={handleFileChange} id="inputFilePost"/>
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
    postImage: URL,
    editPost: PropTypes.bool,

};

export default NewPostModal;
