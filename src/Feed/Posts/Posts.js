/* eslint-disable react/prop-types */
import React, { useState, useContext, useEffect } from 'react';
import "./Post.css"
import { ReactComponent as Like } from '../../Images/Feed/facebook-like-logo.svg';
import { ReactComponent as Comment } from '../../Images/Feed/speech-bubble.svg';
import { ReactComponent as LikeBlack } from '../../Images/Feed/like-black.svg';
import { ReactComponent as LikeBlue } from '../../Images/Feed/like-blue.svg';
import { ReactComponent as Edit } from '../../Images/Feed/edit.svg';
import { ReactComponent as EditWhite } from '../../Images/Feed/edit-white.svg';

import { ReactComponent as ShareB } from '../../Images/Feed/share-svgrepo-com.svg';
import { ReactComponent as CommentB } from '../../Images/Feed/comment.svg';
import Comments from '../Comments/Comments.js';
import Share from './Share/Share.js'
import NewPostModal from '../NewPost/NewPostModal.js';
import { AuthContext } from '../../AuthContext.js';
import { useNavigate } from 'react-router';


function Posts({ id, userId, likes, postUrl, comments, text, name, profileImage, date, fromComments, isLiked }) {
    console.log("comments", comments);
    const navigate = useNavigate();
    const [likePressed, setLikePressed] = useState(isLiked);
    const { user, postsList, setPostsListFun, theme } = useContext(AuthContext);
    const [commentPressed, setCommentPressed] = useState(0);
    const [sharePressed, setSharePressed] = useState(0);
    const [editPost, setEditPost] = useState(0);
    const userDet = {
        userId: userId,
        profilePic: profileImage,
        name: name
    };
    useEffect(() => {
        setLikePressed(isLiked);
    }, [postsList]);

    async function addLike(e) {
        e.preventDefault();
        const response = await fetch(`http://localhost:8080/api/users/${user.id}/posts/${id}/like`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'authorization': 'bearer ' + user.token // attach the token
            }
        });
        //extract like count from response
        const amount = await response.json()
        const extractedNumber = amount.amount
        const likeCount = extractedNumber.likes
        const postIndex = postsList.findIndex((post) => post.id === id);
        // Check if the post with the specified id exists
        if (postIndex !== -1) {
            // Create a new array representing the updated post list
            const updatedPosts = [...postsList];

            // Update the likes for the post at the found index
            updatedPosts[postIndex] = {
                ...updatedPosts[postIndex],
                //amount.amount == like amount from server
                likes: likeCount,
                isLiked: !likePressed
            };
            setLikePressed(!likePressed);
            await updatedPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
            setPostsListFun(updatedPosts);
        }
    }

    function addComment() {
        setCommentPressed(commentPressed ? 0 : 1);

    }

    function share() {
        setSharePressed(sharePressed ? 0 : 1);
    }

    return (
        <div className="eachPost">
            {commentPressed ? <Comments likes={likes} postUrl={postUrl} comments={comments} text={text} name={name}
                profileImage={profileImage} date={date} setCommentPressed={setCommentPressed}
                id={id} userId={userId} /> : <div></div>}
            {sharePressed ? <Share setSharePressed={setSharePressed} /> : <div></div>}
            {editPost ? <NewPostModal id={id} editPost={true} profileImage={profileImage} name={name}
                setNewPostPressed={setEditPost} postText={text} postImage={postUrl} /> :
                <div></div>}
            <div className='topOfPost' >
                <img onClick={() => navigate("/profilePage", { state: userDet })} className='profileImg' src={profileImage} alt="post" />
                <div className='nameAndDate'>
                    <div className='name'>{name}</div>
                    <div className='date'>{date}</div>
                </div>
                {userId == user.id && (theme == "theme-light" ?
                    <Edit onClick={() => setEditPost(!editPost)} id="editIcon" /> :
                    <EditWhite onClick={() => setEditPost(!editPost)} id="editIcon" />)}
            </div>
            <p className='postText'>{text}</p>
            <img alt="image post" className='imagePost' src={postUrl} />
            <div className='class1'>
                <div className="likeNdComm">
                    <div className='commentsAndNum'>
                        <Comment className='comm' />
                        <p>{comments ? comments.length : 0}</p>
                    </div>

                    <div className='likesAndNum'>
                        <p>{likes}</p>
                        <Like className='like' />
                    </div>
                </div>
            </div>


            {fromComments ?
                <div></div> :
                <>
                    <hr></hr>
                    <div className='bottomPost'>
                        <div className='eachItem item1' data-testid="addlike" onClick={(e) => addLike(e)}>
                            {likePressed ? <LikeBlue className='bottomIcon' /> : <LikeBlack className='bottomIcon' />}
                            <p>Like</p>
                        </div>
                        <div className='eachItem item2' onClick={addComment}>
                            <CommentB className='bottomIcon' />
                            <p>Comment</p>
                        </div>
                        <div className='eachItem item3' onClick={share}>
                            <ShareB className='bottomIcon' />
                            <p>Share</p>
                        </div>
                    </div>
                </>
            }


        </div>

    )

}

export default Posts;