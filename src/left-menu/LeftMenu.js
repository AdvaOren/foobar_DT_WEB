import UsernameBtn from "./UsernameBtn";
import SavedPostsBtn from "./SavedPostsBtn";
import CommunitiesBtn from "./CommunitiesBtn";
import FriendBtn from "./FriendBtn";
import Memories from "./Memories";
import Salesbtn from "./Salesbtn";

function LeftMenu({username}) {
    return (
        <div className="col">
            <div className="container right-menu">
                <UsernameBtn username={username}></UsernameBtn>
                <SavedPostsBtn></SavedPostsBtn>
                <FriendBtn></FriendBtn>
                <CommunitiesBtn></CommunitiesBtn>
                <Memories></Memories>
                <Salesbtn></Salesbtn>
            </div>
        </div>
    )
}

export default LeftMenu