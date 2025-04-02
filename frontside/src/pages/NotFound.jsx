// eslint-disable-next-line no-unused-vars
import React from 'react';
import "../styles/NotFound.css";
import {Link} from "react-router-dom";
const NotFound = () => {
  return (
    <div className='notfound'>
      <h2 className='notfound-text'>Not Found</h2>
      <p className='notfound-found'>Go To Home Page
        <Link className="notfound-link" to="/">Here</Link>
      </p>
    </div>
  );
}

export default NotFound;
