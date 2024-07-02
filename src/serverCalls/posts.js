
export const getPostList = async (token) => {
    try {
        const response = await fetch(`http://localhost:8080/api/posts`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'authorization': 'bearer ' + token // attach the token
            }
        })
        return await response.json();
    } catch (error) {
        // Handle network or parsing errors
        console.error('Error fetching user friends:', error);
    }
}

export const getFriendPostsList = async (id, token) => {
    try {
        const response = await fetch(`http://localhost:8080/api/users/${id}/posts`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'authorization': 'bearer ' + token // attach the token
            }
        })
        return await response.json();
    } catch (error) {
        // Handle network or parsing errors
        console.error('Error fetching user friends:', error);
    }
}