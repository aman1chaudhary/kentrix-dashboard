import React from 'react';
import Logo from "../assets/images/logo.jpeg"
import { Link } from 'react-router-dom'

const Navbar = ({ user, setLoginUser }) => {
    // console.log(user)
    return (
        <div className='navbar_container'>
            <div className="navbar">
                <div className="navbar_logo">
                    <Link to="/"><img src={Logo} alt='logo' /></Link>
                </div>


                <div className="nav_menu">


                    {user && user.id ? (
                        <>
                            <div className="profile_btn">
                                <p>Hey! {user.name}</p>
                            </div>

                        </>
                    ) : (
                        <>
                            <div className="login_btn">
                                <Link to="/login" >
                                    Login
                                </Link>

                            </div>
                        </>
                    )}


                </div>

            </div>


        </div>
    )
}

export default Navbar