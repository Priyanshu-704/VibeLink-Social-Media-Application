/* eslint-disable react/prop-types */
import { Avatar } from "@mui/material";
import "react";
import { Link } from "react-router-dom";
import ProfileImg from "../images/profile.jpg";


const UserCard = ({ user, handleClose }) => {
  const handleCloseAll = () => {
    if (handleClose) handleClose();
  };

  return (
    <div
      style={{
        display: "flex",
        padding: "10px",
        alignItems: "center",
        borderBottom: "1px solid rgb(149,149,231)",
      }}
    >
      <div>
        <Link
          to={`/profile/${user._id}`}
          onClick={handleCloseAll}
          style={{
            display: "flex",
            padding: "10px",
            alignItems: "center",
          }}
        >
          <Avatar src={user.avatar || ProfileImg } />
          <div style={{ marginLeft: "6px", color: "white" }}>
            <span
              style={{
                display: "block",
              }}
            >
              {user.fullname}
            </span>
            <small>{user.username}</small>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default UserCard;
