import React, { useState, useContext, useEffect, useRef } from 'react';
import "./Comments.css";
import { ReactComponent as Close } from '../../Images/Feed/close-circle.svg';
import { ReactComponent as SendGray } from '../../Images/Feed/send-gray.svg';
import { ReactComponent as SendBlue } from '../../Images/Feed/send-blue.svg';
import { ReactComponent as Edit } from '../../Images/Feed/edit.svg';
import { ReactComponent as Save } from '../../Images/Feed/done.svg';
import { ReactComponent as Delete } from '../../Images/Feed/delete-black.svg';


import { AuthContext } from '../../AuthContext.js';

import Posts from '../Posts/Posts.js';
import { commentChanged, deleteCommentServer, fetchComments, saveComment } from '../../serverCalls/Comments.js';

function Comments({ userId, id, likes, postUrl, text, name, profileImage, date, setCommentPressed, setCommentsCount }) {
    const [inputText, setInputText] = useState('');
    const [commentText, setCommentText] = useState('');
    const { user, postsList, setPostsListFun } = useContext(AuthContext);
    const [editComment, setEditComment] = useState(false);
    const [inputHeight, setInputHeight] = useState('auto'); // State to manage input height
    const [commentIdChanged, seCommentIdChaged] = useState();
    const [comments, setComments] = useState([]);
    const contentEditableRef = useRef(null);

    useEffect(() => {
        const getComments = async () => {
            try {
                const commentList = await fetchComments(user, id);
                let newComments = [];
                commentList.map((comment) => {
                    newComments.push({
                        first: { id: comment.first._id, text: comment.first.text },
                        second: {
                            userId: comment.second._id, firstName: comment.second.firstName,
                            lastName: comment.second.lastName, img: "data:image/png;base64," + comment.second.img
                        }
                    })
                })
                setComments(newComments);
            } catch (error) {
                console.log("fetchComments error: ", error);
            }
        };
        getComments();
    }, []);

    useEffect(() => {
        if (contentEditableRef.current) {
            setInputHeight(contentEditableRef.current.scrollHeight + 'px');
        }
    }, [commentText]);


    const handleInputChange = (event, setter) => {
        setter(event.target.value);
        adjustHeight(event.target);
    };

    const handleCommentChange = (event, setter) => {
        setter(event.target.textContent);
        adjustHeight(event.target);
    };


    const addNewComment = async () => {
        const postIndex = postsList.findIndex((post) => post.id === id);

        if (postIndex !== -1) {
            const updatedPosts = [...postsList];
            const postToUpdate = updatedPosts[postIndex];
            //save comment in db:
            const comment = await saveComment(user, id, inputText)
            // Create a new array for updated comments
            const names = user.name.split(' ')
            const updatedComments = [
                ...comments,
                {
                    first: { id: comment._id, text: inputText },
                    second: { userId: user.id, img: user.profileImage, firstName: names[0], lastName: names[1] }
                },
            ]
            // Update the post with the new array of comments
            updatedPosts[postIndex] = {
                ...postToUpdate,
                comments: updatedComments,
            };
            updateCommentsList(updatedPosts, updatedComments)
            setInputText('');
        }
    };
    const deleteComment = async (commentId) => {
        await deleteCommentServer(user, id, commentId);
        let deletedComments = [];
        let newPostList = postsList.map(post => {
            // Check if this is the post to update
            if (post.id === id) {
                // Filter out the comment with the given commentId
                deletedComments = comments.filter(comment => comment.first.id !== commentId)
                return {
                    ...post,
                    comments: deletedComments
                };
            }
            // If this is not the post to update, return it unchanged
            return post;
        });
        updateCommentsList(newPostList, deletedComments)
    }

    const updateCommentsList = (updatedPosts, updatedComments) => {
        setCommentsCount(updatedComments.length)
        setComments(updatedComments);
        updatedPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
        // Update the state with the new post list
        setPostsListFun(updatedPosts);
    }

    const editCommentFun = (commentTxt, commentId) => {
        setEditComment(true);
        setCommentText(commentTxt);
        seCommentIdChaged(commentId);
    }

    const saveCommentChanges = async (commentId) => {
        await commentChanged(user, id, commentId, commentText);
        const updatedPostList = postsList.map(post => {
            if (post.id === id) {
                const updatedComments = post.comments.map(comment => {
                    // Check if the comment ID matches the target ID
                    if (comment.first.id === commentId) {
                        const upC = {
                            first: { id: comment.first.id, text: commentText },
                            second: { ...comment.second }
                        }
                        return upC
                    } else {
                        // Return the original comment if the ID doesn't match
                        return comment;
                    }
                });
                setComments(updatedComments);
                return { ...post, comments: updatedComments };
            } else {
                // Return the original post if the ID doesn't match
                return post;
            }
        });

        await updatedPostList.sort((a, b) => new Date(b.date) - new Date(a.date));
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
                    <Posts fromComments={1} likes={likes} postUrl={postUrl} comments={comments} text={text} name={name}
                        profileImage={profileImage} date={date} userId={userId} isLiked={0} />
                    {comments.map((comment, index) => {
                        return (
                            <div key={index} id="commentAndProfile">
                                <img className="profileImageComments"
                                    src={comment.second.img}
                                    alt="profile" />
                                <div id="eachComment">
                                    <p style={{ fontWeight: 'bold' }}>{comment.second.firstName + " " + comment.second.lastName}</p>
                                    {(user.id == comment.second.userId && editComment && commentIdChanged == comment.first.id) ?
                                        <>
                                            <div
                                                contentEditable
                                                ref={contentEditableRef}
                                                onInput={(event) => handleCommentChange(event, setCommentText)}
                                                suppressContentEditableWarning={true}
                                                style={{
                                                    height: inputHeight, // Set input height dynamically

                                                }}>
                                                {commentText}
                                            </div>
                                            <Save className="editOrDeleteComment"
                                                onClick={() => saveCommentChanges(comment.first.id)} />
                                            <Delete className="editOrDeleteComment"
                                                onClick={() => deleteComment(comment.first.id)} />
                                        </>
                                        :
                                        (user.id == comment.second.userId ? <>
                                            <p>{comment.first.text}</p>
                                            <Edit className="editOrDeleteComment"
                                                onClick={() => editCommentFun(comment.first.text, comment.first.id)} />
                                            <Delete className="editOrDeleteComment"
                                                onClick={() => deleteComment(comment.first.id)} />
                                        </> : user.id != comment.id && <p>{comment.first.text}</p>)
                                    }
                                </div>
                            </div>
                        )
                    })
                    }
                </div>
                <div id="addComm">
                    <img className="profileImageComments" src={user.profileImage} />
                    <input value={inputText} onChange={(event) => handleInputChange(event, setInputText)}
                        id="inputLineComments" type="text" placeholder="Add a comment..." />
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