import React, { useContext } from "react";
import UserContext from "./auth/UserContext";
import { Link } from 'react-router-dom'

function Homepage() {
    const { currentUser } = useContext(UserContext)
    console.debug('Navigation', 'currentUser=', currentUser)

    return(
        <div className="Homepage">
            <div className="container text-center">
                <h1 className="mb-4 font-weight-bold">Jobly</h1>
                <p className="lead">All the jobs in one, convenient place.</p>
                {currentUser
                    ? <h2> Welcome Back, {currentUser.firstName}!</h2>
                    : (
                        <p>
                            <Link className='btn btn-primary font-weight-bold mr-3' to='/login'>Log in</Link>
                            <Link className='btn btn-primary font-weight-bold mr-3' to='/signup'>Sign up</Link>
                        </p>
                    )
                }
            </div>
        </div>
    )
    
}

export default Homepage
