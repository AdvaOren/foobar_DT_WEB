import './App.css';
import PostWithImg from "../PostWithImg";
import posts from "posts.json"
import {useState} from "react";

function App() {
    const [postsList,setPostsList] = useState(posts)
    return (
        <div className="App">
            <nav className="navbar navbar-expand-lg nav-bg">
                <div className="container-fluid">
                    <button className="logo-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16"
                             height="16"
                             className="bi bi-exclude" viewBox="0 0 16 16">
                            <path
                                d="M0 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2H2a2 2 0 0 1-2-2zm12 2H5a1 1 0 0 0-1 1v7h7a1 1 0 0 0 1-1z"/>
                        </svg>
                    </button>
                    <a className="navbar-brand" href="src/App/App#">foobar_DT</a>
                    <button className="navbar-toggler" type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse"
                         id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active"
                                   aria-current="page"
                                   href="src/App/App#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="src/App/App#">Link</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="src/App/App#"
                                   role="button"
                                   data-bs-toggle="dropdown"
                                   aria-expanded="false">
                                    Dropdown
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item"
                                           href="src/App/App#">Action</a></li>
                                    <li><a className="dropdown-item" href="src/App/App#">Another
                                        action</a>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider"></hr>
                                    </li>
                                    <li><a className="dropdown-item" href="src/App/App#">Something
                                        else
                                        here</a></li>
                                </ul>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search"
                                   placeholder="Search"
                                   aria-label="Search"></input>
                            <button className="btn btn-outline-success"
                                    type="submit">Search
                            </button>
                        </form>
                    </div>
                </div>
            </nav>
            <div className="container text-center bg-body-tertiary">
                <div className="row">
                    <div className="col">
                        <div className="row">
                            <button className="menu-btn">userName</button>
                        </div>
                        <div className="row">
                            <button className="menu-btn">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     width="16"
                                     height="16" fill="currentColor"
                                     className="bi bi-bookmark-fill"
                                     viewBox="0 0 16 16">
                                    <path
                                        d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2"/>
                                </svg>
                                saved posts
                            </button>
                        </div>
                        <div className="row">
                            <button className="menu-btn">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     width="16"
                                     height="16" fill="currentColor"
                                     className="bi bi-people-fill"
                                     viewBox="0 0 16 16">
                                    <path
                                        d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
                                </svg>
                                friends
                            </button>
                        </div>
                        <div className="row">
                            <button className="menu-btn">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     width="16"
                                     height="16" fill="currentColor"
                                     className="bi bi-houses"
                                     viewBox="0 0 16 16">
                                    <path
                                        d="M5.793 1a1 1 0 0 1 1.414 0l.647.646a.5.5 0 1 1-.708.708L6.5 1.707 2 6.207V12.5a.5.5 0 0 0 .5.5.5.5 0 0 1 0 1A1.5 1.5 0 0 1 1 12.5V7.207l-.146.147a.5.5 0 0 1-.708-.708zm3 1a1 1 0 0 1 1.414 0L12 3.793V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3.293l1.854 1.853a.5.5 0 0 1-.708.708L15 8.207V13.5a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 4 13.5V8.207l-.146.147a.5.5 0 1 1-.708-.708zm.707.707L5 7.207V13.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5V7.207z"/>
                                </svg>
                                communities
                            </button>
                        </div>
                    </div>
                    <div className="col">
                        <PostWithImg></PostWithImg>
                    </div>
                    <div className="col">
                        <div className="container left-menu">
                            <div className="row left-menu">user options</div>
                            <div className="row">
                                <button className="left-menu-btn">add post
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         width="16"
                                         height="16" fill="currentColor"
                                         className="bi bi-plus-circle"
                                         viewBox="0 0 16 16">
                                        <path
                                            d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                        <path
                                            d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                                    </svg>
                                </button>
                            </div>
                            <div className="row">
                                <button className="left-menu-btn">delete post
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         width="16"
                                         height="16" fill="currentColor"
                                         className="bi bi-x-circle"
                                         viewBox="0 0 16 16">
                                        <path
                                            d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                        <path
                                            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                                    </svg>
                                </button>
                            </div>
                            <div className="row">
                                <button className="left-menu-btn">save post
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         width="16"
                                         height="16" fill="currentColor"
                                         className="bi bi-save"
                                         viewBox="0 0 16 16">
                                        <path
                                            d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1z"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
