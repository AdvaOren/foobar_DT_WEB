import axios from 'axios';


export const userExists = async (email) => {
    const res = await axios.get(`http://localhost:8080/api/users/${email}`);
    if (res.statusText == "OK") {
        console.log("res: ", res);
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

export const getToken = async (userName, password, email) => {
    return await fetch('http://localhost:8080/api/tokens', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: userName, password: password, email: email }),
    });
}

export const addUserServer = async (userData) => {
    return await axios.post('http://localhost:8080/api/users', userData);
}