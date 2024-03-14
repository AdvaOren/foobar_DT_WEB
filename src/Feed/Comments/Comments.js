/* eslint-disable react/prop-types */
import React, {useState, useContext, useEffect} from 'react';
import "./Comments.css";
import {ReactComponent as Close} from '../../Images/Feed/close-circle.svg';
import {ReactComponent as SendGray} from '../../Images/Feed/send-gray.svg';
import {ReactComponent as SendBlue} from '../../Images/Feed/send-blue.svg';
import {ReactComponent as Edit} from '../../Images/Feed/edit.svg';
import {ReactComponent as Save} from '../../Images/Feed/done.svg';
import {ReactComponent as Delete} from '../../Images/Feed/delete-black.svg';


import {AuthContext} from '../../AuthContext.js';

import Posts from '../Posts/Posts.js';

function Comments({userId, id, likes, postUrl, text, name, profileImage, date, setCommentPressed,setCommentsCount}) {
    const [inputText, setInputText] = useState('');
    const [commentText, setCommentText] = useState('');
    const {user, usersList, postsList, setPostsListFun} = useContext(AuthContext);
    const [editComment, setEditComment] = useState(false);
    const [inputHeight, setInputHeight] = useState('auto'); // State to manage input height
    const [commentIdChanged, seCommentIdChaged] = useState();
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/posts/${id}/comments`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        'authorization': 'bearer ' + user.token // attach the token
                    }
                })
                const commentList = await response.json()
                let newComments = [];
                commentList.map((comment) => {
                    newComments.push({
                        first: {
                            id: comment.first._id,
                            text: comment.first.text
                        },
                        second: {
                            userId: comment.second._id,
                            firstName: comment.second.firstName,
                            lastName: comment.second.lastName,
                            img: "data:image/png;base64," + comment.second.img
                        }
                    })
                })
                setComments(prevComments => [...newComments]);
            } catch (error) {
// handle error
            }
        };
        fetchComments();
    }, []);



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
            const {profileImage, name} = user;
            return {profileImage, name};
        } else {
            return null;
        }
    };
    const addNewComment = async () => {
        const postIndex = postsList.findIndex((post) => post.id === id);

        if (postIndex !== -1) {
            // Create a new array representing the updated post list
            const updatedPosts = [...postsList];

            // Get the post you want to update
            const postToUpdate = updatedPosts[postIndex];

            //save comment in db:
            const response = await fetch(`http://localhost:8080/api/users/${user.id}/posts/${id}/comments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'authorization': 'bearer ' + user.token // attach the token
                },
                body: JSON.stringify({text: inputText})
            })
            const comment = await response.json();
            // Create a new array for updated comments
            const names = user.name.split(' ')
            const updatedComments = [
                ...comments,
                {
                    first: {
                        id: comment._id,
                        text: inputText
                    },
                    second: {
                        userId: user.id,
                        img: user.profileImage,
                        firstName: names[0],
                        lastName: names[1]
                    }
                },
            ]

            // Update the post with the new array of comments
            updatedPosts[postIndex] = {
                ...postToUpdate,
                comments: updatedComments,
            };
            console.log("in comments: ", updatedComments.length)
            setCommentsCount(updatedComments.length)
            setComments(updatedComments);
            await updatedPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
            // Update the state with the new post list
            setPostsListFun(updatedPosts);
            setInputText('');
        }
    };
    const deleteComment = async (commentId) => {
        const response = await fetch(`http://localhost:8080/api/users/${user.id}/posts/${id}/comments/${commentId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'authorization': 'bearer ' + user.token // attach the token
            }
        })
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
        console.log("in comments: ", deletedComments.length)
        setCommentsCount(deletedComments.length)
        setComments(deletedComments)
        await newPostList.sort((a, b) => new Date(b.date) - new Date(a.date));

        setPostsListFun(newPostList);
    }

    const editCommentFun = (commentTxt, commentId) => {
        setEditComment(true);
        setCommentText(commentTxt);
        seCommentIdChaged(commentId);
    }

    const saveCommentChanges = async (commentId) => {
        const response = await fetch(`http://localhost:8080/api/users/${user.id}/posts/${id}/comments/${commentId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'authorization': 'bearer ' + user.token // attach the token
            },
            body: JSON.stringify({text: commentText})
        })
        // Make a copy of the postList array
        const updatedPostList = postsList.map(post => {
            // Check if the post ID matches the target ID
            if (post.id === id) {
                // Map through the comments array of the post
                const updatedComments = post.comments.map(comment => {
                    // Check if the comment ID matches the target ID
                    if (comment.first.id === commentId) {
                        // Update the comment string
                        const upC = {
                            first: {id: comment.first.id, text: commentText},
                            second: {...comment.second}
                        }
                        return upC
                    } else {
                        // Return the original comment if the ID doesn't match
                        return comment;
                    }

                });
                //update localy in react
                setComments(updatedComments);
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
                    <p style={{fontWeight: 'bold'}}>{name}{'\''}s Post</p>
                    <Close id="closeButton" onClick={() => setCommentPressed(0)}/>
                </div>
                <div id="allCommentsContent">
                    <Posts fromComments={1} likes={likes} postUrl={postUrl} comments={comments} text={text} name={name}
                           profileImage={profileImage} date={date} userId={userId} isLiked={0}/>
                    {comments.map((comment, index) => {
                            return (
                                <div key={index} id="commentAndProfile">
                                    <img className="profileImageComments"
                                         src={comment.second.img}
                                         alt="profile"/>
                                    <div id="eachComment">
                                        <p style={{fontWeight: 'bold'}}>{comment.second.firstName + " " + comment.second.lastName}</p>
                                        {(user.id == comment.second.userId && editComment && commentIdChanged == comment.first.id) ?
                                            <>
                                                <div
                                                    contentEditable
                                                    onInput={(event) => handleCommentChange(event, setCommentText)}
                                                    style={{
                                                        height: inputHeight, // Set input height dynamically

                                                    }}>
                                                    {commentText}
                                                </div>
                                                <Save className="editOrDeleteComment"
                                                      onClick={() => saveCommentChanges(comment.first.id)}/>
                                                <Delete className="editOrDeleteComment"
                                                        onClick={() => deleteComment(comment.first.id)}/>
                                            </>
                                            :
                                            (user.id == comment.second.userId ? <>
                                                <p>{comment.first.text}</p>
                                                <Edit className="editOrDeleteComment"
                                                      onClick={() => editCommentFun(comment.first.text, comment.first.id)}/>
                                                <Delete className="editOrDeleteComment"
                                                        onClick={() => deleteComment(comment.first.id)}/>
                                            </> : user.id != comment.id && <p>{comment.first.text}</p>)
                                        }


                                    </div>

                                </div>
                            )
                        }
                    )
                    }
                </div>
                <div id="addComm">
                    <img className="profileImageComments" src={user.profileImage}/>
                    <input value={inputText} onChange={(event) => handleInputChange(event, setInputText)}
                           id="inputLineComments" type="text" placeholder="Add a comment..."/>
                    <div data-testid="sendIconCommants" className='sentIconsCon'>
                        {(inputText != null && inputText != '') ?
                            <SendBlue id="sendIconCommants" data-testid="blueIconPress" onClick={addNewComment}/> :
                            <SendGray id="sendIconCommants"/>
                        }
                    </div>
                </div>
            </div>
        </div>

    )

}

export default Comments;