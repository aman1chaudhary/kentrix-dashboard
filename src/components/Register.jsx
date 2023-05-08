import React from "react";
import { Link } from "react-router-dom";

const Register = () => {

  return (
    <div className="main-container">
      <div className="register">
        <h1>Register</h1>
        <input
          type="text"
          name="name"
          required
          placeholder="Your Name"
        ></input>
        <input
          type="text"
          name="email"
          required
          placeholder="Your Email"
        ></input>
        <input
          type="password"
          name="password"
          required
          placeholder="Your Password"
        ></input>
        <input
          type="password"
          name="reEnterPassword"
          placeholder="Re-enter Password"
        ></input>
        <div className="button">
          Register
        </div>
        <div>or</div>
        <Link to="/login"> <div className="button">
          <p>Login</p>
        </div></Link>
      </div>
    </div>
  );
};

export default Register;
