import Likebtn from "./Likebtn";
import CommentsBtn from "./CommentsBtn";
import ShareBtn from "./ShareBtn";

function PostWithImg({userImg, username, time, text, img,id,initLikes=0}) {
    return (
        <div className="card">
            <div className="card-title post-title"><img src={userImg}
                                                        className="post-user-img"></img>{username}
                <div className="post-time">{time}</div>
            </div>
            <p className="card-text"> {text}</p>
            <img src={img}></img>
            <div className="card-body">
                <div className="container text-center">
                    <div className="row">
                        <hr className="divider"></hr>
                    </div>
                    <div className="container text-center">
                        <div className="row">
                            <Likebtn id={id + "l"} initLikes={initLikes}></Likebtn>
                            <CommentsBtn></CommentsBtn>
                            <ShareBtn></ShareBtn>
                        </div>
                    </div>
                </div>
            </div>
        </div>
                        );
                        }
                        export default PostWithImg