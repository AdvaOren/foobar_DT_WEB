import './FeedScreen.css';
import PostWithImg from "../post/PostWithImg";
import LeftMenu from "../left-menu/LeftMenu";
import RightMenu from "../rightMenu/RightMenu";
import NavBar from "../NavBar/NavBar";
import posts from "../posts.js"
import {useState} from "react";
import {useLocation} from 'react-router-dom';


function FeedScreen() {
    const location = useLocation();
    const firstN = location.state.firstN
    const lastN = location.state.LastN;
    const userImg = location.state.userImg
    const [postList, setPostList] = useState(posts)

    return (
        <div id={"app"} className="App">
            <NavBar></NavBar>
            <div id={"body"} className="container text-center bg-body-tertiary">
                <div className="row">
                    <LeftMenu firstN={firstN} LastN={lastN}
                              img={userImg}></LeftMenu>
                    <div className="col-6">
                        {
                            postList.map((post) => <PostWithImg {...post}
                                                                currentUsername={firstN + " " + lastN}
                                                                currentUserImg={userImg}
                                                                postList={postList}
                                                                setPostList={setPostList}/>)
                        }
                    </div>
                    <RightMenu postList={postList} setPostList={setPostList}
                               username={firstN + lastN}
                               userImg={userImg}></RightMenu>
                </div>
            </div>
        </div>
    );
}

export default FeedScreen;