// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {register} from "../redux/actions/authActions"
import "../styles/Register.css";
const Register = () => {
  const navigate = useNavigate();
  const initialState = {
    username: "",
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "male",
  };

  const [userData, setuserData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [showCfPassword, setShowCfPassword] = useState(false);

  const { username, fullname, email, password, confirmPassword, gender } =
    userData;

  const { auth, alert } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setuserData({ ...userData, [name]: value });
  };

  useEffect(()=>{
    if(auth.token){
      navigate('/')
    }
  },[auth.token, navigate])

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(userData));
    
  };

  return (
    <div className="register">
      <div className="register-container">
        <h3 className="register-head">Social Network</h3>
        <h6 className="register-subheader">Register</h6>

        <form className="register-dataform" onSubmit={handleSubmit}>
          <input
            className="register-dataform-mail"
            type="text"
            value={fullname}
            name="fullname"
            onChange={handleChange}
            placeholder= {alert.fullname ? `${alert.fullname}` : 'Enter your fullname'}
            style={{background: `${alert.fullname ? '#fa8e96': ''}`}}
          />
          <input
            className="register-dataform-password"
            type="text"
            name="username"
            value={username.toLowerCase().replace(/ /g, "")}
            onChange={handleChange}
            placeholder={alert.username ? `${alert.username}` : 'Enter your username'}
            style={{background: `${alert.fullname ? '#fa8e96': ''}`}}
          />
         
          <input
            className="register-dataform-password"
            type="email"
            value={email}
            name="email"
            onChange={handleChange}
            placeholder={alert.email ? `${alert.email}` : 'Enter your email'}
            style={{background: `${alert.fullname ? '#fa8e96': ''}`}}
          />

          <input
            className="register-dataform-password"
            type={showPassword ? "text" : "password"}
            value={password}
            name="password"
            onChange={handleChange}
            placeholder={alert.password ? `${alert.password}` : 'Enter your password'}
            style={{background: `${alert.fullname ? '#fa8e96': ''}`}}
          />
        
          <small
            className="register-showpassword"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "hide" : "show"}
          </small>

          <input
            className="register-dataform-password"
            type={showCfPassword ? "text" : "password"}
            value={confirmPassword}
            name="confirmPassword"
            onChange={handleChange}
            placeholder={alert.confirmPassword ? `${alert.confirmPassword}` : 'Enter your password again'}
            style={{background: `${alert.fullname ? '#fa8e96': ''}`}}
          />
          
          <select
            className="register-gender"
            name="gender"
            value={gender}
            onChange={handleChange}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Others</option>
          </select>
          <small
            className="register-showCfpassword"
            onClick={() => setShowCfPassword(!showCfPassword)}
          >
            {showCfPassword ? "hide" : "show"}
          </small>
          <button className="register-dataform-button" type="submit">
            Register
          </button>
          <p className="register-small">
            Already have an account?
            <Link to="/login">Login here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
