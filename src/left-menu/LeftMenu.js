import UsernameBtn from "./UsernameBtn";
import SavedPostsBtn from "./SavedPostsBtn";
import CommunitiesBtn from "./CommunitiesBtn";
import FriendBtn from "./FriendBtn";
import Memories from "./Memories";
import Salesbtn from "./Salesbtn";

function LeftMenu({firstN,LastN,img}) {
    return (
        <div className="col-4">
            <div className="container right-menu">
                <UsernameBtn username={firstN + " "+ LastN} img={img}></UsernameBtn>
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