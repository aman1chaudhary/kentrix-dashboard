import React from 'react'
import Logo from "../assets/images/logo.jpeg"
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='navbar_container'>
            <div className="navbar">
                <div className="navbar_logo">
                    <Link to="/"><img src={Logo} alt='logo' /></Link>
                </div>


                <div className="nav_menu">
                    <div className="login_btn">
                        
                        <Link to="/login"><button>Login</button></Link>
                    </div>
                </div>

            </div>


        </div>
    )
}

export default Navbar