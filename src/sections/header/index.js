import React from 'react';
import {Link, Outlet} from 'react-router-dom'

const Header = () => {
    return (
        <>
            <div className='header-app'>
            <Link to='/'>
                <h3 className='header-app__title'>
                    Podskity
                </h3>
            </Link>
            </div>
            <Outlet />
        </>
    )
}

export default Header;
