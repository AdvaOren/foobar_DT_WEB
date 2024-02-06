import Likebtn from "./Likebtn";
import CommentsBtn from "./comments/CommentsBtn";
import ShareBtn from "./ShareBtn";
import DeletePostBtn from "./DeletePostBtn";
import EditPostBtn from "./EditPost/EditPostBtn";
import {useRef} from "react";

function PostWithImg({
                         userImg,
                         username,
                         time,
                         text,
                         img,
                         id,
                         initLikes = 0,
                         comments, postList, setPostList

                     }) {
    const PostText = useRef(null)
    return (
        <div className="card">
            <div className="card-title post-title">
                <div className="dropdown post-options">
                    <button
                        className="btn post-dropdown"
                        type="button" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16"
                             height="16" fill="currentColor"
                             className="bi bi-three-dots-vertical"
                             viewBox="0 0 16 16">
                            <path
                                d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                        </svg>
                    </button>
                    <ul className="dropdown-menu w-75">
                        <li><DeletePostBtn postList={postList}
                                           setPostList={setPostList}
                                           id={id}></DeletePostBtn>
                        </li>
                        <li><EditPostBtn postText={PostText}></EditPostBtn></li>
                    </ul>
                    <img src={userImg}
                         className="post-user-img" alt=""></img>{username}
                </div>
                <div className="post-time">{time}</div>
            </div>
            <p className="card-text" ref={PostText}> {text}</p>
            <img src={img} alt={""}></img>
            <div className="card-body">
                <div className="container text-center">
                    <div className="row">
                        <hr className="divider"></hr>
                    </div>
                    <div className="container text-center">
                        <div className="row">
                            <Likebtn id={id + "l"}
                                     initLikes={initLikes}></Likebtn>
                            <CommentsBtn id={id + "c"} comments={comments}
                                         username={username}></CommentsBtn>
                            <ShareBtn></ShareBtn>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostWithImg