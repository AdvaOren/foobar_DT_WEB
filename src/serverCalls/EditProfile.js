

export const editUserWImage = async (id, email, firstName, lastName, password, token, profileImg) => {
    await fetch((`http://localhost:8080/api/users/updAll/${id}`), {
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
            userId: id,
            img: profileImg
        })
    })
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

export const deleteUser = async (id, token) => {
    await fetch((`http://localhost:8080/api/users/${id}`), {
        "method": "DELETE",
        headers: {
            "Content-Type": "application/json",
            'authorization': 'bearer ' + token // attach the token
        }
    })
}