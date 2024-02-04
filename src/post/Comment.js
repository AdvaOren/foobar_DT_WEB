
function Comment({commentText,id}) {
    return (
        <li className={"comment"} id={id}>{commentText}</li>
    )
}
export default Comment