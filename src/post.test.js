import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { AuthProvider } from './AuthContext.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Posts from './Feed/Posts/Posts.js';

test('adds new comment when send button is clicked', () => {
    const { getByTestId, getByText } = render(
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Posts
                        userId={1}
                        id={1}
                        likes={10}
                        postUrl="https://www.gstatic.com/webp/gallery/1.jpg"
                        comments={[
                            { id: 1, comment: 'First comment' },
                            { id: 2, comment: 'Second comment' },
                        ]}
                        text="Sample text"
                        name="John Doe"
                        profileImage="https://randomuser.me/api/portraits/men/1.jpg"
                        date="2022-02-16"
                        setCommentPressed={() => { }}
                    />} />


                </Routes>

            </BrowserRouter>
        </AuthProvider>


    );



    const sendButton = getByTestId('addlike');

    fireEvent.click(sendButton);
    //timout to give state upload changes
    setTimeout(() => {

        expect(getByText('11')).toBeInTheDocument();
    }, 20000);

});