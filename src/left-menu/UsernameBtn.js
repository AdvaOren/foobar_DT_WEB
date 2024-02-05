
function UsernameBtn({username}) {
    const notReady = () => {
        alert("sorry, this button isn't available yet")
    }
    return (
        <div className="row">
            <button className="menu-btn" onClick={notReady}>{username}</button>
        </div>
    )
}
export default UsernameBtn