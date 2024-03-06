import axios from 'axios';


export const editUserWImage = async (email) => {
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

export const editUserNImage = async (id, email, firstName, lastName, password, token) => {
    await fetch((`http://localhost:8080/api/users/${id}`), {
        "method": "PUT",
        headers: {
            "Content-Type": "application/json",
            'authorization': 'bearer ' + token // attach the token
        },
        body: JSON.stringify({
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: password,
            userId: id
        })
    })
}