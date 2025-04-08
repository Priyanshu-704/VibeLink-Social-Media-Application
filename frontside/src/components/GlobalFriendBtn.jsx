/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {useSelector, useDispatch} from 'react-redux';
import { addfriends, unfriends } from "../redux/actions/profileActions";

const GlobalFriendBtn = ({ classbtn, user }) => {

  const {auth, profile} = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(()=>{
      if(auth.user.following.find(item => item.id === user._id)){
        setFriend(true)

      }
    }, [auth.user.following, user._id])

  // eslint-disable-next-line no-unused-vars
  const [friend, setFriend] = useState(false);
  const isFriend = auth.user.following.some(item => item._id === user._id);

  const addFriend = () => {
    setFriend(true)
    dispatch(addfriends({users:profile.users, user, auth}))
  }

  const removeFriend = () => {
    setFriend(false)
    dispatch(unfriends({users:profile.users, user, auth}))
  }
  // console.log(user)
  return (
    <>
      {isFriend ? (
        <button className={classbtn} onClick = {removeFriend}  style={{backgroundColor:'crimson'}}>UnFriend</button>
      ) : (
        <button className={classbtn} onClick = {addFriend}>Add Friend</button>
      )}
    </>
  );
};

export default GlobalFriendBtn;
