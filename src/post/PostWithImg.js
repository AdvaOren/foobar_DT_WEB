import Likebtn from "./Likebtn";
import CommentsBtn from "./comments/CommentsBtn";
import ShareBtn from "./ShareBtn";
import DeletePostBtn from "./DeletePostBtn";
import EditPostBtn from "./EditPost/EditPostBtn";
import {useRef, useState} from "react";
import EditPostModal from "./EditPost/editPostModal";

function PostWithImg({
                         userImg,
                         username,
                         currentUsername,
                         currentUserImg,
                         time,
                         text,
                         img,
                         id,
                         initLikes = 0,
                         comments, postList, setPostList

                     }) {
    const [Rimg, setImg] = useState(img)
    const PostText = useRef(text)
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
                        <li>
                            <div className="dropdown-item">
                                <button className="dropdown-item"
                                        data-bs-toggle="modal"
                                        data-bs-target={"#editPostModal" + id}>edit
                                    post
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         width="16"
                                         height="16"
                                         fill="currentColor"
                                         className="bi bi-pencil"
                                         viewBox="0 0 16 16">
                                        <path
                                            d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                                    </svg>
                                </button>
                            </div>
                        </li>
                        <li><EditPostBtn postText={PostText}></EditPostBtn></li>
                    </ul>

                    <img src={userImg}
                         className="post-user-img" alt=""></img>{username}
                </div>
                <div className="post-time">{time}</div>
            </div>
            <p className="card-text" ref={PostText}> {text}</p>
            <EditPostModal id={id} postText={PostText} img={Rimg}
                           setImg={setImg}></EditPostModal>
            <img src={Rimg} alt={""}></img>
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
                                         username={username}
                                         currentUsername={currentUsername}
                                         currentuserImg={currentUserImg}>

                            </CommentsBtn>
                            <ShareBtn></ShareBtn>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostWithImg