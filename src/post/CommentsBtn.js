import {useRef, useState} from "react";
import Comment from "./Comment";

let numComments = 0;
//let allC = document.getElementsByClassName("comment")
//let relevantC = []
function CommentsBtn({comments}) {
    const input = useRef(null)
    const visual = useRef(null)
    let [commentList, setComments] = useState(comments)
    const addComment = () => {
        const newComment = {
            "commentText": input.current.value
        }
        if (input.current.value === '') {
            return
        }
        setComments([...commentList, newComment])
        input.current.value = ''
        numComments++
        visual.current.innerHTML = numComments + " comments"
 /*       for (const allCKey in allC) {
            if (allCKey.id.startsWith(id)) {
                relevantC.add(allCKey)
            }*/
        console.log(commentList)
        }
    return (
        <div className="col">
            <div ref={visual} className="row">{numComments} comments</div>
            <div className="row">
                <button type="button"
                        className="btn  post-btn" data-bs-toggle="modal"
                        data-bs-target="#comments-section">
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


                <div className="modal fade" id="comments-section" tabIndex="-1"
                     aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5"
                                    id="exampleModalLabel">comments section</h1>
                                <button type="button" className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <ul>
                                    {
                                        commentList?.map((comment,key) => <Comment
                                            className="comment" {...comment} key={key}></Comment>)
                                    }</ul>
                            </div>
                            <div className="modal-footer">
                                <input ref={input}/>type your comment here!
                                <button type="button"
                                        className="btn btn-primary"
                                        onClick={addComment}>add
                                    comment</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommentsBtn