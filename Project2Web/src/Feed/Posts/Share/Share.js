/* eslint-disable react/prop-types */
import React from 'react';
import "./Share.css";
import { ReactComponent as Close } from '../../../Images/Feed/close-circle.svg';
import { ReactComponent as ShareFriends } from '../../../Images/Feed/share-friends.svg';
import { ReactComponent as Add } from '../../../Images/Feed/add.svg';
import { ReactComponent as Message } from '../../../Images/Feed/write-message.svg';
import { ReactComponent as Chat } from '../../../Images/Feed/chat.svg';

function Share({ setSharePressed }){
    return (
        <div className="share">
            <div className='sharePattern'>
                <div className="topShare">
                    <p style={{ fontWeight: 'bold' }}>Share</p>
                    <Close id="closeButton" onClick={() => setSharePressed(0)} />
                </div>
                <hr style={{ width: "90%", color: "#e3e3e3", opacity: 0.3 }}></hr>
                <div className='iconsShare'>
                    <div className='eachShare' onClick={null}>
                        <ShareFriends className='icon'/>
                        <p>Share Now (Friends)</p>
                    </div>
                    <div className='eachShare' onClick={null}>
                        <Add className='icon'/>
                        <p>Share in Story</p>
                    </div>
                    <div className='eachShare' onClick={null}>
                        <Message className='icon'/>
                        <p>Send in Messanger</p>
                    </div>
                    <div className='eachShare' onClick={null}>
                        <Chat className='icon'/>
                        <p>Send in WhatsApp</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Share;