import Comment from "./comments/Comment";

function EditPostBtn({postText, id}) {

    return (
        <div className="row">
            <button className="dropdown-item" data-bs-toggle="modal"
                    data-bs-target={"#editPostModal" + id}>edit post
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                     fill="currentColor" className="bi bi-pencil"
                     viewBox="0 0 16 16">
                    <path
                        d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                </svg>
            </button>
            <div className="modal fade" id={"editPostModal" + id}
                 tabIndex="-1"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            <h1 className="modal-title fs-5 comment-section-title"
                                id="exampleModalLabel">modal title
                                section</h1>
                        </div>
                        <div className="modal-body">
                            ...
                        </div>
                        <div className="modal-footer">
                            <input className={"input-comment"}/>type
                            your comment here!
                            <button type="button"
                                    className="btn btn-primary">edit post
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditPostBtn