import React, { useState } from "react";
import axios from "axios";
import "./Auth.css"
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "./BackendURL";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const register = () => {
    const { name, email, password } = user;
    if (name && email && password) {
      axios
        .post(`${BACKEND_URL}/register`, {
          name: user.name,
          email: user.email,
          password: user.password
        })
        .then((res) => {
          alert(res.data.message);
          navigate("/login");
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    } else {
      alert("Invalid input");
    }
  };

  return (


    <div className="auth_container">

      <div className="container">
        <div className="row">
          <div className="col-md-6 p-0">
            <div className="form-container">

              <h1>Sign Up</h1>

              <input
                type="text"
                name="name"
                value={user.name}
                required
                placeholder="Your Name"
                onChange={handleChange}
              ></input>


              <input
                type="text"
                name="email"
                value={user.email}
                required
                placeholder="Your Email"
                onChange={handleChange}
              ></input>

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={user.password}
                required
                placeholder="Your Password"
                onChange={handleChange}
              ></input>
              <div className="login_checkbox">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={toggleShowPassword}
                />
                Show Password
              </div>

              <button className="auth_btn" onClick={register}>Sign Up</button>

            </div>

          </div>
          <div className="col-md-6 p-0">
            <div className="overlay-container">
              <div className="overlay">

                <h1>Log in</h1>
                <p>Sign in here if you already have an account </p>
                <button className="auth_btn ghost_btn" id="signIn" onClick={() => navigate("/login")} >Sign In</button>




              </div>
            </div>

          </div>


        </div>







      </div>


    </div>

  );
};

export default Register;
