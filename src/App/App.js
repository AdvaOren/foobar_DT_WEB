import './App.css';
import PostWithImg from "../post/PostWithImg";
import LeftMenu from "../left-menu/LeftMenu";
import RightMenu from "../rightMenu/RightMenu";
import NavBar from "../NavBar/NavBar";
import posts from "../posts.js"
import {useState} from "react";


function App() {
    const [postList, setPostList] = useState(posts)
    const username = "username"
    return (
        <div id={"app"} className="App dark-mode-app">
            <NavBar></NavBar>
            <div id={"body"} className="container text-center bg-body-tertiary">
                <div className="row">
                    <LeftMenu username={username}></LeftMenu>
                    <div className="col-6">
                        {
                            postList.map((post) => <PostWithImg {...post}
                                                                postList={postList}
                                                                setPostList={setPostList}/>)
                        }
                    </div>
                    <RightMenu postList={postList} setPostList={setPostList}
                               username={username}></RightMenu>
                </div>
            </div>
        </div>
    );
}

export default App;
