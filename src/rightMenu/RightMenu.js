import AddPostBtn from "./AddPostBtn";
import SavePostBtn from "./SavePostBtn";
import LogoutBtn from "./LogoutBtn";

function RightMenu({postList, setPostList, username, userImg}) {
    return (
        <div className="col-2">
            <div className="container left-menu">
                <LogoutBtn></LogoutBtn>
                <AddPostBtn postList={postList} setPostList={setPostList}
                            username={username} userImg={userImg}></AddPostBtn>
                <SavePostBtn></SavePostBtn>
            </div>
        </div>
    )
}

export default RightMenu