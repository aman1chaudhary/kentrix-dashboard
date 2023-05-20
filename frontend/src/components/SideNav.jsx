import React, { useState } from 'react';
import "./SideNav.css"
// import Logo from "../assets/images/logo.jpeg"
import { FaBars, FaTimes } from 'react-icons/fa';
import { NavLink } from "react-router-dom";


const SideNav = () => {
    const [showMenu, setShowMenu] = useState(false);
    const handleToggle = () => {
        setShowMenu(!showMenu);
    };

    const handleLinkClick = () => {
        window.scrollTo(0, 0);
        setShowMenu(false);
    };
    
    return (
        <div className="navbar-container">
            <div className="navbar__logo">
                <NavLink to="/" onClick={() => window.scrollTo(0, 0)}>
                    {/* <img src={Logo} alt="" /> */}
                </NavLink>

            </div>

            <button className="navbar__toggle" onClick={handleToggle}>
                {showMenu ? <FaTimes /> : <FaBars />}
            </button>

            <div className={`phone-nav ${showMenu ? 'show' : ''}`}>
                <div className="nav__content bd-grid">
                    <div className="nav__menu">
                        <ul>
                            <li className="nav__item">
                                <NavLink to="/" className="nav__link" onClick={handleLinkClick}>
                                   Input Dataset
                                </NavLink>
                            </li>

                            <li className="nav__item">
                                <NavLink to="/score" className="nav__link" onClick={handleLinkClick}>
                                    Score
                                </NavLink>
                            </li>
                            <li className="nav__item">
                                <NavLink to="/feature-importance" className="nav__link" onClick={handleLinkClick}>
                                Feature Importance
                                </NavLink>
                            </li>
                            <li className="nav__item">
                                <NavLink to="/cohort-report" className="nav__link" onClick={handleLinkClick}>
                                Cohort Report
                                </NavLink>
                            </li>

                            
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default SideNav
