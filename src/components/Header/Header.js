import React from 'react';

import './Header.css';

const Header = (props) => {
  return (
    <header>
        <div className='header-wrap'>
          <h1>{props.name}</h1>
          {props.user ?
            <button onClick={props.logout}>Log Out</button>
            :
            <button onClick={props.login}>Log In</button>
          }
        </div>
    </header>
  )
}

export default Header;
