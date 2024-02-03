import UsernameBtn from "./UsernameBtn";
import SavedPostsBtn from "./SavedPostsBtn";
import CommunitiesBtn from "./CommunitiesBtn";
import FriendBtn from "./FriendBtn";

function LeftMenu() {
    return (
        <div className="col">
            <UsernameBtn></UsernameBtn>
            <SavedPostsBtn></SavedPostsBtn>
            <FriendBtn></FriendBtn>
            <CommunitiesBtn></CommunitiesBtn>
        </div>
    )
}

export default LeftMenu