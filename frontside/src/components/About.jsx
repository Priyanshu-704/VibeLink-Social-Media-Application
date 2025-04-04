/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { getProfileUsers } from "../redux/actions/profileActions";
import "../styles/ProfileAbout.css"

const About = ({userData, profile, auth, id}) => {
  
  return (
    <div className="about">
      {userData.length > 0 &&
        userData.map((user, index) => {
          return (
            <div className="about-container" key={`${user._id}-${index}`}>
              <div className="about-contenttop">
                <h4 className="about-contenttop-head">About Me:</h4>
              </div>
              <div className="about-contentcenter">
                <p className="about-contentcenter-story">{user.story}</p>
              </div>
              <div className="about-contentbottom">
                <div className="about-contentbottominfo">
                  <h6 className="about-contentbottominfo-head">Joined</h6>
                  <p className='about-contentbottominfo-body'>{user.createdAt}</p>
                </div>
                <div className="about-contentbottominfo">
                  <h6 className="about-contentbottominfo-head">Gender</h6>
                  <p className='about-contentbottominfo-body'>{user.gender}</p>
                </div>
                <div className="about-contentbottominfo">
                  <h6 className="about-contentbottominfo-head">Phone</h6>
                  <p className='about-contentbottominfo-body'>{user.phone}</p>
                </div>
                <div className="about-contentbottominfo">
                  <h6 className="about-contentbottominfo-head">Email</h6>
                  <p className='about-contentbottominfo-body'>{user.email}</p>
                </div>
                <div className="about-contentbottominfo">
                  <h6 className="about-contentbottominfo-head">Website</h6>
                  <p className='about-contentbottominfo-body'>{user.website}</p>
                </div>

              </div>
            </div>
          );
        })}
    </div>
  );
};

export default About;
