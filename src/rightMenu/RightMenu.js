import AddPostBtn from "./AddPostBtn";
import DeletePostBtn from "./DeletePostBtn";
import SavePostBtn from "./SavePostBtn";
import EditPostBtn from "./EditPostBtn";

function RightMenu() {
    return (
        <div className="col">
            <div className="container left-menu">
                <div className="row left-menu">user options</div>
                <AddPostBtn></AddPostBtn>
                <DeletePostBtn></DeletePostBtn>
                <SavePostBtn></SavePostBtn>
                <EditPostBtn></EditPostBtn>
            </div>
        </div>
    )
}

export default RightMenu