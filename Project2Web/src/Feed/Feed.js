import React, { useState, useEffect, useContext  } from 'react';
import "./Feed.css"
import "./Posts/Post.css";
import Menu from './Menu/Menu';
import NewPost from './NewPost/NewPost';
import Posts from './Posts/Posts';
import TopBar from './TopBar/TopBar';
import { AuthContext } from '../AuthContext';

function Feed() {
    const [newPostPressed, setNewPostPressed] = useState(0);
    const { postsList, setPostsListFun, user } = useContext(AuthContext);

    
    useEffect(() => {
        // Sort postList by date in descending order
        const sortedPosts = [...postsList].sort((a, b) => {
          // Convert date strings to Date objects
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          
          // Compare dates
          return dateB - dateA;
        });
    
        // Update state with sorted posts
        setPostsListFun(sortedPosts);
      }, []); // Empty dependency array ensures this effect runs only once
    
    return (
        <div className="mainContent">
            <TopBar />

            <div id="menuAndPost">
                <Menu />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <NewPost id={user.id} newPostPressed={newPostPressed} setNewPostPressed={setNewPostPressed} />
                    <div id="posts">
                        {
                            postsList.map((post) =>
                                <Posts setNewPostPressed={setNewPostPressed} fromComments={0} key={post.id} {...post} />
                            )
                        }
                    </div>
                </div>

            </div>


        </div>

    )

}

export default Feed;