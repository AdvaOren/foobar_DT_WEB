import React, { useState, useContext } from 'react';
import "./ProfilePage.css"
import NewPost from '../Feed/NewPost/NewPost.js';
import Posts from "../Feed/Posts/Posts.js";
import TopBar from '../Feed/TopBar/TopBar.js';
import { AuthContext } from '../AuthContext.js';
import { ReactComponent as Edit } from '../Images/Feed/edit.svg';
import { ReactComponent as EditW } from '../Images/Feed/edit-white.svg'
import { ReactComponent as AddFriend } from '../Images/add-friend.svg'
import { useLocation } from 'react-router';
import "../Feed/Posts/Post.css";

import EditProfileModal from './EditProfileModal.js';

//TODO change list of post for each user, check if friend or not, add logic of adding friend and edit profile
function ProfilePage() {
    const [newPostPressed, setNewPostPressed] = useState(0);
    const { postsList, user, theme } = useContext(AuthContext);
    const location = useLocation();
    let { userId, name, profilePic } = location.state;
    const [editClicked, setEditClicked] = useState(false);
    
    return (
        <div className="mainContent">
            {editClicked ? <EditProfileModal userId={userId} setEditClicked={setEditClicked} /> : <div></div>}
            <TopBar />
            <div id="menuAndPost">
                <div id="profileDetails">
                    <div id="nameAndImg" >
                        <img id="profileImageInPage" alt="profileImg" src={userId === user.id ? user.profileImage : profilePic} />
                        <div className='menuTextInPage' style={{ fontWeight: 'bold', fontSize: '3em', bottom: 0 }}>{userId === user.id ? user.name : name}</div>
                    </div>
                    {userId === user.id ?
                        <div
                            id="editProfile"
                            onClick={() => setEditClicked(true)}>
                            Edit Profile
                            {theme === 'theme-light' ? <Edit className="editIcon" /> : <EditW className="editIcon" />}
                        </div>
                        :
                        <div id="addFriendBtn">
                            Add Friend
                            <AddFriend className="editIcon" />
                        </div>
                    }

                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {user.id === userId && <NewPost id={user.id} newPostPressed={newPostPressed} setNewPostPressed={setNewPostPressed} />}
                    <div id="posts">
                        {
                            postsList.map((post, index) =>
                                <Posts setNewPostPressed={setNewPostPressed} fromComments={0} key={index} {...post} />
                            )
                        }
                    </div>
                </div>

            </div>


        </div>

    )

}

export default ProfilePage;