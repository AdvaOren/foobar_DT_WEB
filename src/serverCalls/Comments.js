
export const fetchComments = async (user, id) => {
    try {
        const response = await fetch(`http://localhost:8080/api/posts/${id}/comments`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'authorization': 'bearer ' + user.token // attach the token
            }
        })
        const commentList = await response.json()
        return commentList
    } catch (error) {
        // handle error
        console.log("error at fetchComments: ", error);
    }
};

export const saveComment=async(user, id, inputText)=>{
    try {
        const response = await fetch(`http://localhost:8080/api/users/${user.id}/posts/${id}/comments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'authorization': 'bearer ' + user.token // attach the token
                },
                body: JSON.stringify({text: inputText})
            })
            return await response.json();
        
    } catch (error) {
        console.log("saveComment error: ", error);
    }
}

export const deleteCommentServer=async(user, id, commentId)=>{
    try {
        const response = await fetch(`http://localhost:8080/api/users/${user.id}/posts/${id}/comments/${commentId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'authorization': 'bearer ' + user.token // attach the token
            }
        })
    } catch(err){
        console.log("deleteCommentServer error: ", err);
    }
}

export const commentChanged=async(user, id, commentId, commentText)=>{
    try{
        await fetch(`http://localhost:8080/api/users/${user.id}/posts/${id}/comments/${commentId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'authorization': 'bearer ' + user.token // attach the token
                },
                body: JSON.stringify({text: commentText})
            })
    } catch(err) {
        console.log("commentChanged error: ", err);
    }
}