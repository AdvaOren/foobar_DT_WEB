/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react';
import "./Comments.css";
import { ReactComponent as Close } from '../../Images/Feed/close-circle.svg';
import { ReactComponent as SendGray } from '../../Images/Feed/send-gray.svg';
import { ReactComponent as SendBlue } from '../../Images/Feed/send-blue.svg';
import { ReactComponent as Edit } from '../../Images/Feed/edit.svg';
import { ReactComponent as Save } from '../../Images/Feed/done.svg';
import { ReactComponent as Delete } from '../../Images/Feed/delete-black.svg';


import { AuthContext } from '../../AuthContext.js';

import Posts from '../Posts/Posts.js';

function Comments({ userId, id, likes, postUrl, comments, text, name, profileImage, date, setCommentPressed }) {
    const [inputText, setInputText] = useState('');
    const [commentText, setCommentText] = useState('');
    const { user, usersList, postsList, setPostsListFun } = useContext(AuthContext);
    const [editComment, setEditComment] = useState(false);
    const [inputHeight, setInputHeight] = useState('auto'); // State to manage input height
    const [commentIdChanged, seCommentIdChaged] = useState();
    const handleInputChange = (event, setter) => {
        setter(event.target.value);
        adjustHeight(event.target);
    };
    const handleCommentChange = (event, setter) => {
        setter(event.target.textContent);
        adjustHeight(event.target);
    };

    const getUserInfoById = (id) => {
        const user = usersList.find(user => user.id === id);
        if (user) {
            const { profileImage, name } = user;
            return { profileImage, name };
        } else {
            return null;
        }
    };
    const addNewComment = () => {
        const postIndex = postsList.findIndex((post) => post.id === id);

        if (postIndex !== -1) {
            // Create a new array representing the updated post list
            const updatedPosts = [...postsList];

            // Get the post you want to update
            const postToUpdate = updatedPosts[postIndex];
            // Create a new array for updated comments
            const updatedComments = [
                ...postToUpdate.comments,
                {
                    id: user.id,
                    comment: inputText,
                },
            ];

            // Update the post with the new array of comments
            updatedPosts[postIndex] = {
                ...postToUpdate,
                comments: updatedComments,
            };

            // Update the state with the new post list
            setPostsListFun(updatedPosts);
            setInputText('');
        }
    };
    const deleteComment = (commentId) => {
        let newPostList = postsList.map(post => {
            // Check if this is the post to update
            if (post.id === id) {
                // Filter out the comment with the given commentId
                return {
                    ...post,
                    comments: post.comments.filter(comment => comment.id !== commentId)
                };
            }
            // If this is not the post to update, return it unchanged
            return post;
        });
        setPostsListFun(newPostList);
    }

    const editCommentFun = (commentTxt, commentId) => {
        setEditComment(true);
        setCommentText(commentTxt);
        seCommentIdChaged(commentId);
    }

    const saveCommentChanges = (commentId) => {
        // Make a copy of the postList array
        const updatedPostList = postsList.map(post => {
            // Check if the post ID matches the target ID
            if (post.id === id) {
                // Map through the comments array of the post
                const updatedComments = post.comments.map(comment => {
                    // Check if the comment ID matches the target ID
                    if (comment.id === commentId) {
                        // Update the comment string
                        return {
                            ...comment,
                            comment: commentText
                        };
                    } else {
                        // Return the original comment if the ID doesn't match
                        return comment;
                    }
                });
                // Return the post object with updated comments
                return {
                    ...post,
                    comments: updatedComments
                };
            } else {
                // Return the original post if the ID doesn't match
                return post;
            }
        });

        // Update the state with the updated postList
        setPostsListFun(updatedPostList);

        setEditComment(false);
    }

    function adjustHeight(textInput) {
        // Set the height of the input element based on its scrollHeight
        setInputHeight(textInput.scrollHeight + 'px');
    }

    return (
        <div id="CommentContent">
            <div id="commentsPattern">
                <div id="topCommentsPattern">
                    <p style={{ fontWeight: 'bold' }}>{name}{'\''}s Post</p>
                    <Close id="closeButton" onClick={() => setCommentPressed(0)} />
                </div>
                <div id="allCommentsContent">
                    <Posts fromComments={1} likes={likes} postUrl={postUrl} comments={comments} text={text} name={name} profileImage={profileImage} date={date} userId={userId} />
                    {comments.map((comment, index) => {
                        return (
                            <div key={index} id="commentAndProfile">
                                <img className="profileImageComments" src={getUserInfoById(comment.id).profileImage} alt="profile" />
                                <div id="eachComment">
                                    <p style={{ fontWeight: 'bold' }}>{getUserInfoById(comment.id).name}</p>
                                    {(user.id == comment.id && editComment && commentIdChanged == comment.id) ?
                                        <>
                                            <div
                                                contentEditable
                                                onInput={(event) => handleCommentChange(event, setCommentText)}
                                                style={{
                                                    height: inputHeight, // Set input height dynamically

                                                }} >
                                                {commentText}
                                            </div>
                                            <Save className="editOrDeleteComment" onClick={() => saveCommentChanges(comment.id)} />
                                            <Delete className="editOrDeleteComment" onClick={() => deleteComment(comment.id)} />
                                        </>
                                        :
                                        (user.id == comment.id ? <>
                                            <p>{comment.comment}</p>
                                            <Edit className="editOrDeleteComment" onClick={() => editCommentFun(comment.comment, comment.id)} />
                                            <Delete className="editOrDeleteComment" onClick={() => deleteComment(comment.id)} />
                                        </> : user.id != comment.id && <p>{comment.comment}</p>)
                                    }

                                    
                                </div>

                            </div>
                        )
                    }
                    )
                    }
                </div>
                <div id="addComm">
                    <img className="profileImageComments" src={user.profileImage} />
                    <input value={inputText} onChange={(event) => handleInputChange(event, setInputText)} id="inputLineComments" type="text" placeholder="Add a comment..." />
                    <div data-testid="sendIconCommants" className='sentIconsCon'>
                        {(inputText != null && inputText != '') ?
                            <SendBlue id="sendIconCommants" data-testid="blueIconPress" onClick={addNewComment} /> :
                            <SendGray id="sendIconCommants" />
                        }
                    </div>
                </div>
            </div>
        </div>

    )

}

export default Comments;