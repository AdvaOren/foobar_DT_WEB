import Likebtn from "./Likebtn";

function post2({userImg, username, time, text, img}) {
    return (
        <div className="card">
            <div className="card-title post-title"><img src={userImg}
                                                        className="post-user-img"></img>{username}
                <div className="post-time">{time}</div>
            </div>
            <p className="card-text"> {text}</p>
            <img src={img}></img>
            <div className="card-body">
                <div className="container text-center">
                    <div className="row">
                        <hr className="divider"></hr>
                    </div>
                    <div className="row">
                        <div className="col">100M likes
                        </div>
                        <div className="col">20 comments
                        </div>
                        <div className="col"></div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <Likebtn></Likebtn>
                        </div>
                        <div className="col">
                            <button
                                className="btn  post-btn">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16" height="16"
                                    fill="currentColor"
                                    className="bi bi-chat"
                                    viewBox="0 0 16 16">
                                    <path
                                        d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105"/>
                                </svg>
                            </button>
                        </div>
                        <div className="col">
                            <button
                                className="btn post-btn">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16" height="16"
                                    fill="currentColor"
                                    className="bi bi-share"
                                    viewBox="0 0 16 16">
                                    <path
                                        d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5m-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default post2()