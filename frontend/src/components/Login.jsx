import React, { useState } from "react"
import axios from "axios"
import "./Auth.css"
import { useNavigate } from "react-router-dom"
import { BACKEND_URL } from "./BackendURL"


const Login = ({ setLoginUser }) => {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
      };

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const login = () => {
        axios.post(`${BACKEND_URL}/login`, user)
            .then(res => {
                alert(res.data.message);
                console.log(res); 
                setLoginUser(res.data.user);
                navigate("/");
            })
            .catch(err => {
                alert(err);
            });
    };


    return (

        <div className="auth_container">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 p-0">
                        <div className="form-container">
                            <h1>Sign in</h1>
                            <input type="text" name="email" value={user.email} onChange={handleChange} required placeholder="Enter your Email"></input>

                            <input type={showPassword ? "text" : "password"} name="password" value={user.password} onChange={handleChange} required placeholder="Enter your Password" ></input>
                            <div className="login_checkbox">
                                <input
                                    type="checkbox"
                                    checked={showPassword}
                                    onChange={toggleShowPassword}
                                />
                                Show Password
                            </div>


                            <button className="auth_btn" onClick={login}>Sign In</button>

                        </div>

                    </div>
                    <div className="col-md-6 p-0">
                        <div className="overlay-container">
                            <div className="overlay">
                                <h1>Create, Account!</h1>
                                <p>Sign up if you don't have an account ... </p>
                                <button className="ghost_btn auth_btn" id="signUp" onClick={() => navigate("/register")}>Sign Up</button>


                            </div>
                        </div>

                    </div>
                </div>


            </div>

        </div>



    )
}

export default Login
