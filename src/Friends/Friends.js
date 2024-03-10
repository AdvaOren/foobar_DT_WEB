// NewPostModal.js
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../AuthContext.js';
import { ReactComponent as Close } from '../Images/Feed/close-circle.svg';
import { addMember, deleteMemberDB, getFriendsList } from '../serverCalls/Friends.js';
import './Friends.css';


function Friends({ setFriendsClicked }) {
    const [friendsList, setFriendsList] = useState([]);
    const { user, usersList } = useContext(AuthContext);
    useEffect(() => {
        async function fetchData() {
            await getFriendsList(user.id, user.token).then((response) => {
                console.log("response", response);
                setFriendsList(response);
            });
        }
        fetchData();
    }, []);
    const AddMember = async (friend) => {
        await addMember(user.id, friend._id, user.token);
        const updatedFriendsList = friendsList.map((friendData) => {
            if (friendData._id === friend._id) {
                return { ...friendData, status: "approve" };
            }
            return friendData;
        });
        setFriendsList(updatedFriendsList);
    }
    const deleteMember = (friend) => {
        deleteMemberDB(user.id, friend._id, user.token);
        const updatedFriendsList = friendsList.filter((friendData) => friendData._id !== friend._id);
        setFriendsList(updatedFriendsList);
    }

    return (
        <div className="newPostModal" >
            <div className='newPostPattern' style={{ width: "40%" }}>
                <div className="topModal">
                    <p style={{
                        fontWeight: 'bold',
                        width: "100%",
                        flexGrow: 1
                    }}>Friends List</p>

                    <div id="iconsContent">
                        <Close id="closeButton" onClick={() => setFriendsClicked(false)} />
                    </div>
                </div>
                {(friendsList && friendsList.length > 0) && friendsList.map((friend, index) => {
                    return (
                        <div key={index} id="friends">
                            <img className="profileImageFriend" src={friend.img}
                                alt="profile" />
                            <div id="usersName">{`${friend.firstName} ${friend.lastName}`}</div>
                            {friend.status == "approve" ?
                                <div onClick={() => deleteMember(friend)} id="statusContent">Cancel membership</div> :
                                <div id="statusWaitContent">
                                    <div id="statusContent" onClick={() => AddMember(friend)}>Accept</div>
                                    <div id="rejectReq" onClick={() => deleteMember(friend)}>Reject</div>
                                </div>}
                        </div>
                    )
                })}
            </div>
        </div>
    );
}



export default Friends;
