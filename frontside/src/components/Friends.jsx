/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import FriendsCard from "./FriendsCard";

const Friends = ({ userData, dispatch, profile, auth, id }) => {
  return (
    <div>
      {userData.length > 0 &&
        userData.map((user) => (
          <FriendsCard user={user.friends} key={user._id} />
        ))}
    </div>
  );
};

export default Friends;
