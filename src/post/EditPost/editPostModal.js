import {useRef} from "react";

function EditPostModal({id, postText}) {
    const newText = useRef(null)
    const handleEdit = () => {
        postText.innerHTML = newText.current.value;
        newText.current.value = ''
    }
    return (
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
                            id="exampleModalLabel1">modal title
                            section</h1>
                    </div>
                    <div className="modal-body">
                        ...
                    </div>
                    <div className="modal-footer">
                        <input className={"input-comment"} ref={newText}/>put
                        new text here!
                        <button type="button"
                                className="btn btn-primary"
                                onClick={handleEdit}>edit post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditPostModal