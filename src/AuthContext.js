import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import users from "./data/users.json"
import posts from "./data/posts.json"
import axios from 'axios';


const AuthContext = React.createContext();

function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [user, setUser] = useState({
        username: '',
        name: '',
        id: 0,
        profileImage: '',
        token: ''
    });
    const [usersList, setUsersList] = useState(users);
    const [postsList, setPostsList] = useState(posts);
    const [theme, setTheme] = useState("theme-light");

    async function getusersList() {
        const res = await fetch('http://localhost:8080/api/')
    }

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
        //let image = userData.img;
        // let binary = Buffer.from(image.data); 
        // let imgData = new Blob(binary.buffer, { type: 'application/octet-binary' });
        // let link = URL.createObjectURL(imgData);

        // let img = new Image();
        // img.onload = () => URL.revokeObjectURL(link);
        // img.src = link;
        //const base64String = btoa(String.fromCharCode.apply(null, image.data));

        // const user = {
        //     username: userData.email,
        //     name: userData.firstName + " " + userData.lastName,
        //     id: userData.email,
        //     profileImage: `data:image/jpeg;base64,${base64String}`
        // }
        setUser(userData);
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
        setTheme('theme-light');
    };

    const addUser = async (userData) => {
        const updatedUsersList = usersList ? [...usersList] : [];
        let newUser = {
            username: userData.username,
            name: userData.firstName + " " + userData.lastName,
            id: 0,
            profileImage: userData.img,
            token: 0,
            email: userData.email,
            password: userData.password
        }
        try {
            const response = await axios.post('http://localhost:8080/api/users', userData);
            newUser.id = await response.data;
            if (!response.ok) {
                throw new Error('Network response was not ok');
            } else {
                const res = await fetch('http://localhost:8080/api/tokens', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                });

                const json = await res.json()
                newUser.token = json.token;
            }
        } catch (error) {
            console.error('Error:', error);
        }
        // Update the post list in the component's state
        setUsersList([...updatedUsersList, newUser]);
        return newUser
    }
    const userExists = async (email, password) => {
        const res = await fetch(`http://localhost:8080/api/users/exists/${email}/${password}`); // Find user exists
        if (res.ok) {
            const data = await res.json(); // Parse response body as JSON
            if (data && Object.keys(data).length > 0) {
                return data; // User found
            } else {
                return false // User not found
            }
        } else {
            console.error('Error:', res.status);
            return false;
        }
    }

    const setPostsListFun = (val) => {
        setPostsList(val);
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, user, addUser, usersList, setPostsListFun, postsList, theme, toggleTheme, userExists }}>
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

