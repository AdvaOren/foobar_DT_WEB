export const getFriendsList = async (id, token) => {
    try {
        const response = await fetch(`http://localhost:8080/api/users/${id}/allFriendsRequest`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'authorization': 'bearer ' + token // attach the token
            }
        })
        const data = await response.json();
        await data.map((friend) => {
            friend.img = "data:image/png;base64," + friend.img;
        })

        return await data;
    } catch (error) {
        // Handle network or parsing errors
        console.error('Error fetching user friends:', error);
    }
}

export const addMember = async (id, fid, token) => {
    await fetch(`http://localhost:8080/api/users/${id}/friends/${fid}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            'authorization': 'bearer ' + token // attach the token
        }
    })
}

export const deleteMemberDB = async (id, fid, token) => {
    await fetch(`http://localhost:8080/api/users/${id}/friends/${fid}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            'authorization': 'bearer ' + token // attach the token
        }
    })
}

export const getFriendship = async (id, fid, token) => {
    const response = await fetch(`http://localhost:8080/api/users/${id}/friends/${fid}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'authorization': 'bearer ' + token // attach the token
        }
    })
    return await response.json();
}

export const sendFriendReq =async (id, token) => {
    await fetch(`http://localhost:8080/api/users/${id}/friends`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'authorization': 'bearer ' + token // attach the token
        }
    })
}