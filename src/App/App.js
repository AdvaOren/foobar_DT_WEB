import './App.css';
import PostWithImg from "../post/PostWithImg";
import LeftMenu from "../left-menu/LeftMenu";
import RightMenu from "../rightMenu/RightMenu";
import NavBar from "../NavBar/NavBar";
import posts from "../posts.json"
function App() {

    return (
        <div className="App">
            <NavBar></NavBar>
            <div className="container text-center bg-body-tertiary">
                <div className="row">
                    <LeftMenu></LeftMenu>
                    <div className="col">
                        {
                            posts.map((posts) => <PostWithImg {...posts}/>)
                        }
                    </div>
                    <RightMenu></RightMenu>
                </div>
            </div>
        </div>
    );
}

export default App;
