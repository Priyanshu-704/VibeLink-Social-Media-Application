import { useState } from "react";

const GlobalFriendBtn = ({ classbtn, user }) => {
  const [friend, setFriend] = useState(false);
  return (
    <>
      {friend ? (
        <button className={classbtn} style={{backgroundColor:'crimson'}}>UnFriend</button>
      ) : (
        <button className={classbtn}>Add Friend</button>
      )}
    </>
  );
};

export default GlobalFriendBtn;
