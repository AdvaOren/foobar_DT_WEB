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


function NewPostModal({id, profileImage, name, setNewPostPressed, postText, postImage, editPost}) {
    let message = "What's on your mind, " + name + "?";
    const [inputText, setInputText] = useState(postText);
    const [selectedFile, setSelectedFile] = useState(postImage);
    const {postsList, setPostsListFun, theme, user} = useContext(AuthContext);
    const [invalidUrl, setInvalidUrl] = useState("");
    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    const handleFileChange = (event) => {
        setInvalidUrl("");
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setSelectedFile(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const addNewPost = async () => {
        try {
            
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
                    img: await selectedFile ,
                    date: new Date().toISOString()
                })
            })
            if (response.status == 400) {
                setInvalidUrl("Invalid url")
                return;
            }
            const newPost = await response.json();
            const add = {
                id: newPost._id,
                userId: user.id,
                text: newPost.content,
                postUrl: selectedFile,
                date: newPost.date,
                likes: 0,
                comments: [],
                name: newPost.name,
                profileImage:  "data:image/png;base64," + newPost.profileImage
            }
    
            const updatedPostList2 = [add, ...updatedPostList];
            updatedPostList2.sort((a, b) => new Date(b.date) - new Date(a.date));
            // Update the post list in the component's state
            setPostsListFun([updatedPostList2]);
    
            // Close the modal
            setNewPostPressed(0);
    
            // Clear the input field
            setInputText('');
            setSelectedFile(null);
        } catch (error) {
            console.log("in catch ", error);
            setInvalidUrl("Invalid url")
        }
    };
    const changePost = async () => {
        try {
            const response = await fetch((`http://localhost:8080/api/users/${user.id}/posts/${id}`), {
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
            if (response.status == 400) {
                setInvalidUrl("Invalid url")
                return;
            }
            const updatedPostList = await postsList.map( post => {
                        if (post.id === id) {
                            return  {
                                ...post,
                                text: inputText,
                                postUrl: isValidHttpUrl(selectedFile) ? selectedFile : URL.createObjectURL(selectedFile)
                            };
                        }
                        return post; // For other posts, return them as they are
                    }
    
                )
            ;
            await updatedPostList.sort((a, b) => new Date(b.date) - new Date(a.date));
            setPostsListFun(updatedPostList); // Update the state with the modified post list
    
            setNewPostPressed(0); // Close the modal
        } catch (error) {
            setInvalidUrl("Invalid url")
        }

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
        await newPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
        setPostsListFun(newPosts);
        setNewPostPressed(0)
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
                    <br/>
                    <span style={{color: "red"}}>{invalidUrl}</span>
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
