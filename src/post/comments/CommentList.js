import Comment from "./Comment";

function CommentList({
                         id,
                         commentList,
                         input,
                         username,
                         addComment,
                         setCommentsList
                     }) {
    return (
        <div className="modal fade" id={"comments-section" + id}
             tabIndex="-1"
             aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        <h1 className="modal-title fs-5 comment-section-title"
                            id="exampleModalLabel">{username}'s comments
                            section</h1>
                    </div>
                    <div className="modal-body">
                        <ul>
                            {
                                commentList?.map((comment, key) =>

                                    <Comment
                                        className="comment" {...comment}
                                        key={key} commentList={commentList}
                                        setCommentList={setCommentsList}
                                    ></Comment>)

                            }</ul>
                    </div>
                    <div className="modal-footer">
                        <input ref={input} className={"input-comment"}
                               placeholder={"type your comment here!"}/>
                        <button type="button"
                                className="btn btn-primary"
                                onClick={addComment}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16"
                                 height="16" fill="currentColor"
                                 className="bi bi-send" viewBox="0 0 16 16">
                                <path
                                    d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default CommentList