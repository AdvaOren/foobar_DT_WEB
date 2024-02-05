import AddPostBtn from "./AddPostBtn";
import DeletePostBtn from "../post/DeletePostBtn";
import SavePostBtn from "./SavePostBtn";
import EditPostBtn from "../post/EditPost/EditPostBtn";

function RightMenu({postList,setPostList,username}) {
    return (
        <div className="col">
            <div className="container left-menu">
                <AddPostBtn postList={postList} setPostList={setPostList} username={username}></AddPostBtn>
                <SavePostBtn></SavePostBtn>
            </div>
        </div>
    )
}

export default RightMenu