import {useRef, useState} from "react";

let numPosts = 10;
function AddPostBtn({postList, setPostList, username,userImg}) {
    const ref = useRef(null)
    const [img, setImg] = useState('')
    const addPost = () => {
        console.log(userImg)
        const newPost = {
            "text": ref.current.value,
            "id": numPosts + 1,
            "username": username,
            "userImg" : userImg,
            "img": img,
            "time": "now",
            "comments": []
        }
        setPostList([...postList, newPost]);
        ref.current.value = '';
        numPosts = numPosts + 1;
    }

    return (
        <div className="row">
            <button className="left-menu-btn" data-bs-toggle={"modal"}
                    data-bs-target={"#addPostModal"}>add post
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


            <div className="modal fade" id={"addPostModal"} tabIndex="-1"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            <h1 className="modal-title fs-5"
                                id="exampleModalLabel1">add post</h1>
                        </div>
                        <div className="modal-body">
                            <input ref={ref}/>enter post text
                            <>
                                <label className="form-label"
                                       htmlFor="imgFile"></label>
                                <input type="file" className="form-control"
                                       id="imgFile"
                                       onChange={(e) => setImg(URL.createObjectURL(e.target.files[0]))}></input>
                                <img src={img} className="rounded add-post-img"
                                     alt=""></img>
                            </>
                        </div>
                        <div className="modal-footer">
                            <button type="button"
                                    className="btn btn-primary"
                                    onClick={addPost}>post
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddPostBtn