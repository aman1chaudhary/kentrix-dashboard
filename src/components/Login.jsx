import React from "react"
import { Link } from "react-router-dom"

const Login = () => {

    return (
        <div className="main-container">
            <div className="login">
                <h1>Login</h1>
                <input type="text" name="email"  required placeholder="Enter your Email"></input>
                <input type="password" name="password" required placeholder="Enter your Password" ></input>
                <div className="button" >Login</div>
                <div>or</div>
                <Link to="/register"> <div className="button"><p>Register</p></div></Link>
            </div>
        </div>

    )
}

export default Login
