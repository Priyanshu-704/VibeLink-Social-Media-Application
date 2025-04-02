// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { login } from "../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const { auth } = useSelector((state) => state);

  const initialState = { email: "", password: "" };
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState(initialState);
  const dispatch = useDispatch();
  useEffect(()=>{
    if(auth.token){
      navigate.push('/')
    }
  })
  const { email, password } = userData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(userData));
  };

  // Redirect to Home when auth.token is set
  useEffect(() => {
    if (auth.token) {
      navigate("/");
    }
  }, [auth.token, navigate]);

  return (
    <div className="login">
      <div className="login-container">
        <h3 className="login-head">Social Network</h3>
        <h6 className="login-subheader">Login</h6>

        <form className="login-dataform" onSubmit={handleSubmit}>
          <input
            className="login-dataform-mail"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Type your email"
          />
          <input
            className="login-dataform-password"
            type={showPassword ? "type" : "password"}
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Type your password"
          />

          <small
            className="login-showpassword"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "show"}
          </small>
          <button className="login-dataform-button" type="submit">
            Log in
          </button>
          <p className="login-small">
            Do not have account
            <Link to="/register">Create here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
