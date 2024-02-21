import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import users from "./data/users.json"
import posts from "./data/posts.json"


const AuthContext = React.createContext();

function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [user, setUser] = useState({
        username: '',
        name: '',
        id: 0,
        profileImage: ''
    });
    const [usersList, setUsersList] = useState(users);
    const [postsList, setPostsList] = useState(posts);
    const [theme, setTheme] = useState("theme-light")

    // function to toggle between light and dark theme
    function toggleTheme() {
        if (theme == 'theme-dark') {
            setTheme('theme-light');
        } else {
            setTheme('theme-dark');

        }
    }


    const login = (userData) => {
        setIsLoggedIn(true);
        setUser(userData);
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
        setTheme('theme-light');
    };

    const addUser = (userId, username, name, profileImage, password) => {
        const updatedUsersList = usersList ? [...usersList] : [];

        // Create a new post object
        const newUser = {
            id: userId,
            userName: username,
            name: name,
            profileImage: profileImage,
            password: password
        };

        // Update the post list in the component's state
        setUsersList([...updatedUsersList, newUser]);

    }

    const setPostsListFun = (val) => {
        setPostsList(val);
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, user, addUser, usersList, setPostsListFun, postsList, theme, toggleTheme }}>
            {children}
        </AuthContext.Provider>
    );

}

function PrivateRoute({ Component }) {
    const auth = useContext(AuthContext);

    return (auth.isLoggedIn ? <Component /> : <Navigate to="/" />);
}

// Add PropTypes validation for children prop
PrivateRoute.propTypes = {
    Component: PropTypes.any
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
};


export { AuthProvider, PrivateRoute, AuthContext };

