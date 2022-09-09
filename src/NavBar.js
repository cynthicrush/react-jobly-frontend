import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import UserContext from './auth/UserContext'

function NavBar({logout}) {
    const { currentUser } = useContext(UserContext)
    console.debug('Navigation', 'currentUser=', currentUser)

    return(
        <nav className='NavBar navbar navbar-expand-md'>
            <Link className='navbar-brand' to='/'>
                Jobly
            </Link>
            {currentUser
                //  If there is a currentUser then show Companies, Jobs, Profile, and Log out.
                ? <ul className='narvbar-nav ml-auto'>
                    <li className="nav-item mr-4">
                        <NavLink className="nav-link" to="/companies">
                        Companies
                        </NavLink>
                    </li>
                    <li className="nav-item mr-4">
                        <NavLink className="nav-link" to="/jobs">
                        Jobs
                        </NavLink>
                    </li>
                    <li className="nav-item mr-4">
                        <NavLink className="nav-link" to="/profile">
                        Profile
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/" onClick={logout}>
                        Log out {currentUser.first_name || currentUser.username}
                        </Link>
                    </li>
                </ul>
                // Otherwise show Log in and Sign up. 
                : <ul className='navbar-nav ml-auto'>
                    <li className="nav-item mr-4">
                        <NavLink className="nav-link" to="/login">
                        Log in
                        </NavLink>
                    </li>
                    <li className="nav-item mr-4">
                        <NavLink className="nav-link" to="/signup">
                        Sign Up
                        </NavLink>
                    </li>
                </ul>
            }
        </nav>
    )
}

export default NavBar
