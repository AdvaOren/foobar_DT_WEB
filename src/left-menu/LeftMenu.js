import UsernameBtn from "./UsernameBtn";
import SavedPostsBtn from "./SavedPostsBtn";
import CommunitiesBtn from "./CommunitiesBtn";
import FriendBtn from "./FriendBtn";

function LeftMenu({username}) {
    return (
        <div className="col">
            <div className="container right-menu">
                <UsernameBtn username={username}></UsernameBtn>
                <SavedPostsBtn></SavedPostsBtn>
                <FriendBtn></FriendBtn>
                <CommunitiesBtn></CommunitiesBtn>
            </div>
        </div>
    )
}

export default LeftMenu