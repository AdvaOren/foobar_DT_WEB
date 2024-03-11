
export const getPostList = async (token) => {
    try {
        const response = await fetch(`http://localhost:8080/api/posts`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'authorization': 'bearer ' + token // attach the token
            }
        })
        console.log("response", response.json());
        return await response.json();
    } catch (error) {
        // Handle network or parsing errors
        console.error('Error fetching user friends:', error);
    }
}