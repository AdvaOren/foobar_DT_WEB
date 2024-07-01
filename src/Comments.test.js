import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Comments from './Feed/Comments/Comments.js';
import { AuthProvider } from './AuthContext.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";

test('renders correctly with comments', () => {
    const comments = [
        { id: 1, comment: 'First comment' },
        { id: 2, comment: 'Second comment' },
    ];

    // Render the Comments component within the AuthProvider and BrowserRouter
    const { getByText, getByPlaceholderText, getByTestId } = render(
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Comments
                        userId={2}
                        id={2}
                        likes={10}
                        postUrl="https://www.gstatic.com/webp/gallery/1.jpg"
                        comments={comments}
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

    // Assert that the name of the user who posted is rendered
    expect(getByText("John Doe's Post")).toBeInTheDocument();

    // Assert that comments are rendered
    expect(getByText('First comment')).toBeInTheDocument();
    expect(getByText('Second comment')).toBeInTheDocument();

    // Assert that input field and send button are rendered
    const inputElement = getByPlaceholderText('Add a comment...');
    expect(inputElement).toBeInTheDocument();

    const sendIconDiv = getByTestId('sendIconCommants');
    expect(sendIconDiv).toBeInTheDocument();
});

test('adds new comment when send button is clicked', () => {
    // Mock the setPostsListFun function
    const setPostsListFun = jest.fn();

    // Render the Comments component within the AuthProvider and BrowserRouter
    const { getByPlaceholderText, getByTestId, getByText } = render(
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Comments
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

    // Simulate changing the input value
    const input = getByPlaceholderText("Add a comment...")
    fireEvent.change(input, { target: { value: 'New comment' } })
    expect(input.value).toBe('New comment');
    
    // Simulate clicking the send button
    const sendButton = getByTestId('sendIconCommants');
    fireEvent.click(sendButton);

    // Delay to allow for state updates
    setTimeout(() => {
        // Expect the setPostsListFun function to have been called
        expect(setPostsListFun).toHaveBeenCalled();
        // Expect the new comment to be displayed on the page
        expect(getByText('New comment')).toBeInTheDocument();
    }, 200); // Adjust the timeout delay as needed
});
