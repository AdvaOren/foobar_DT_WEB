import React, { useState, useEffect, useContext } from 'react';
import "./Feed.css"
import "./Posts/Post.css";
import Menu from './Menu/Menu.js';
import NewPost from './NewPost/NewPost.js';
import Posts from './Posts/Posts.js';
import TopBar from './TopBar/TopBar.js';
import { AuthContext } from '../AuthContext.js';
import { getPostList } from '../serverCalls/posts.js';
import {post} from "axios";

function Feed() {
    const [newPostPressed, setNewPostPressed] = useState(0);
    const { postsList, user, setPostsListFun } = useContext(AuthContext);
    useEffect(() => {
        const fetchData = async () => {
            const postsListNew = await getPostList(user.token);
             const formattedPosts = postsListNew ? await postsListNew.map(post => ({
                id: post.first._id,
                userId: post.second._id,
                likes: post.third.likeAmount,
                postUrl: "data:image/png;base64," + post.first.img,
                text: post.first.content,
                userName: post.second.email,
                name: post.second.firstName + " " + post.second.lastName,
                profileImage: "data:image/png;base64," + post.second.img,
                date: post.first.date,
                isLiked: post.third.isLiked,
                commentsAmount: post.third.commentsAmount
            })) : [];
            console.log("set")
            setPostsListFun(formattedPosts);
        }

        fetchData();
    }, []);
    console.log("before set")
    return (
        <div className="mainContent">
            <TopBar />

            <div id="menuAndPost">
                <Menu />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh' }}>
                    <NewPost id={user.id} newPostPressed={newPostPressed} setNewPostPressed={setNewPostPressed} />
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

export default Feed;