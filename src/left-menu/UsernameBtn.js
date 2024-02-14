function UsernameBtn({username, img}) {
    const notReady = () => {
        alert("sorry, this button isn't available yet")
    }
    return (
        <div className="row">
            <button className="menu-btn" onClick={notReady}>{username}<img
                src={img} className={"user-img-left-menu"}></img></button>
        </div>
    )
}

export default UsernameBtn