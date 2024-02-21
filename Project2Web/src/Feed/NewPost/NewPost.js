/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import "./NewPost.css";
import { ReactComponent as Video } from '../../Images/Feed/video.svg';
import { ReactComponent as ImagesIcon } from '../../Images/Feed/images-icon.svg';
import { ReactComponent as Smiley } from '../../Images/Feed/smiley.svg';
import NewPostModal from './NewPostModal'; // Import the NewPostModal component
import { AuthContext } from '../../AuthContext';

function NewPost({ id, newPostPressed, setNewPostPressed }) {
    const { user } = useContext(AuthContext);

    let message = "What's on your mind, " + user.name + "?";

    function addNewPost() {
        setNewPostPressed(newPostPressed ? 0 : 1);
    }

    return (
        <div className="newPostContent">
            {newPostPressed ? (
                <NewPostModal
                    editPost={false}
                    name={user.name}
                    profileImage={user.profileImage}
                    setNewPostPressed={setNewPostPressed}
                    id={id}
                    postText=''
                    postImage={null}
                />
            ) : (
                <div></div>
            )}

            <div className="profilAndInput">
                <img id="profileImage" src={user.profileImage} />
                <input className="inputLine" type="text" placeholder={message} onClick={addNewPost} />
            </div>
            <hr style={{ width: "90%", color: "#e3e3e3", opacity: 0.3 }}></hr>
            <div className='iconsContent'>
                <div className='eachicons' onClick={addNewPost}>
                    <Video className='icon' />
                    <p className='newPostText'>Live Video</p>
                </div>
                <div className='eachicons' onClick={addNewPost}>
                    <ImagesIcon className='icon' />
                    <p className='newPostText'>Photo/Video</p>
                </div>
                <div className='eachicons' onClick={addNewPost}>
                    <Smiley className='icon' />
                    <p className='newPostText'>Feeling/Activity</p>
                </div>
            </div>
        </div>
    )
}

export default NewPost;
