import React, { useState, useContext, useEffect } from 'react';
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
import { addMember, deleteMemberDB, getFriendship, sendFriendReq } from '../serverCalls/Friends.js';
import { getFriendPostsList, getPostList } from '../serverCalls/posts.js';

//TODO change list of post for each user, check if friend or not, add logic of adding friend and edit profile
function ProfilePage() {
    const [newPostPressed, setNewPostPressed] = useState(0);
    const { user, theme, setPostsListFun, postsList } = useContext(AuthContext);
    // const [postsList, setPostsList] = useState([]);
    const location = useLocation();
    let { userId, name, profilePic } = location.state;
    const [editClicked, setEditClicked] = useState(false);
    const [status, setStatus] = useState("noMember");
    useEffect(() => {
        const fetchData = async () => {
            const status = await getFriendship(user.id, userId, user.token);
            setStatus(status.status == "wait" ? "pending" : status.status == "approve" ? "approve" : "noMember");
            const postsListNew = await getFriendPostsList(userId, user.token);
            const formattedPosts = postsListNew ? await postsListNew.map(post => ({
                id: post.first._id,
                userId: userId,
                likes: post.second.likeAmount,
                postUrl: "data:image/png;base64," + post.first.img,
                text: post.first.content,
                name: name,
                profileImage: profilePic,
                date: post.first.date,
                isLiked: post.second.isLiked,
                commentsAmount: post.second.commentsAmount
            })) : [];
            await formattedPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
            setPostsListFun(formattedPosts);
        }
        fetchData();
    }, []);

    const handleBtnClicked = async () => {
        if (status === "noMember") {
            await sendFriendReq(userId, user.token);
            setStatus("pending");
        } else {
            await deleteMemberDB(user.id, userId, user.token);
            setStatus("noMember");
        }
    }
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
                        <div id={status === "pending" ? "pendingFriendBtn" : "addFriendBtn"} onClick={handleBtnClicked}>
                            {status === "pending" ? "Pending" : status === "noMember" ? "Add Friend" : "Remove Friend"}
                            {status === "noMember" && <AddFriend className="editIcon" />}
                        </div>
                    }

                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div id="posts">
                        {
                            postsList && postsList.map((post, index) =>
                                <Posts fromComments={0} key={index} {...post} />
                            )
                        }
                    </div>
                </div>

            </div>


        </div>

    )

}

export default ProfilePage;