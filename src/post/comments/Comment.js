import {useRef, useState} from "react";

function Comment({commentText, id, commentList, setCommentList}) {
    const [text,setText] = useState(commentText)
    const ref = useRef(null)
    const newText = useRef(null)
    const deleteComment = () => {
        const newList = commentList?.filter((c) => c.id !== id)
        setCommentList(newList)
    }
    const handleEdit = () => {
        if (newText.current.value === '') {
            return
        }
        setText(text => newText.current.value)
        console.log(text)
        newText.current.value = '';
    }

    return (
        <li className={"comment"} id={id} ref={ref}>{text}
            <button
                className={"btn comment-dropdown dropdown dropdown-toggle"}
                type="button" data-bs-toggle="dropdown"
                aria-expanded="false">
            </button>
            <ul className="dropdown-menu w-50">
                <li>
                    <div className="dropdown-item">
                        <button className="dropdown-item"
                                onClick={deleteComment}>delete comment
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
                </li>

                <li>
                    <div className="dropdown-item">
                        <button className="btn dropdown-item"
                                aria-controls="collapseExample"
                                onClick={handleEdit}>edit comment
                            <svg xmlns="http://www.w3.org/2000/svg" width="16"
                                 height="16"
                                 fill="currentColor" className="bi bi-pencil"
                                 viewBox="0 0 16 16">
                                <path
                                    d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                            </svg>
                        </button>
                    </div>
                </li>
                <li>
                    <div className={"dropdown-item"}>
                        <input placeholder={"enter edit here"}
                               ref={newText}></input>
                    </div>
                </li>
            </ul>
        </li>
    )
}

export default Comment