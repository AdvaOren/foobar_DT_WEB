import axios from 'axios';


export const userExists = async (email) => {
    const res = await axios.get(`http://localhost:8080/api/users/${email}`);
    if (res.statusText == "OK") {
        const user = await res.data; // Parse response body as JSON
        if (user && Object.keys(user).length > 0) {
            const newUrl = "data:image/png;base64," + user.img;
            user.img = newUrl;
            return user; // User found
        } else {
            return false // User not found
        }
    } else {
        console.error('Error:', res.status);
        return false;
    }
}

export const getToken = async (id) => {
    console.log("id: ", id);
    return await fetch('http://localhost:8080/api/tokens', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id:  id}),
    });
}

export const addUserServer = async (userData) => {
    return await axios.post('http://localhost:8080/api/users', userData);
}

export const getUsersList = async (userId, token) => {
    try {
        const response = await fetch(`http://localhost:8080/api/users/${userId}/friends`, {
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

