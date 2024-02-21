import React from 'react';

import { ReactComponent as Logo } from './facebook.logo.svg'
import "./StartScreenLogo.css"

function StartScreenLogo() {
  return (
    <div className="logo">
      <Logo className="facebookLogo" />
      <h1>Connect with friends and the world {<br></br>} around you on Facebook.</h1>
    </div>
  )
}

export default StartScreenLogo;