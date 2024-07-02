import React, { useContext } from 'react';
import "./TopBar.css"
import { ReactComponent as FacebookLogo } from '../../Images/Feed/facebook-logo.svg';
import { ReactComponent as DarkMode } from '../../Images/Feed/mode-dark.svg';
import { ReactComponent as LightMode } from '../../Images/Feed/mode-light.svg';

import { AuthContext } from '../../AuthContext.js';
import { useNavigate } from 'react-router';

function TopBar() {
    const { logout, toggleTheme, theme } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <div id="content">
            <div id="logoAndSearch">
                <FacebookLogo id="logo" onClick={() => navigate("/feed")} />
                <input id="inputLine" type="text" placeholder="Search Facebook" />
            </div>
            <div onClick={toggleTheme}>
                {theme == 'theme-light' ? <LightMode className="themeMode" /> : <DarkMode className="themeMode" />}
            </div>
            <div onClick={logout} id="logOutBtn">LogOut</div>

        </div>

    )

}

export default TopBar;