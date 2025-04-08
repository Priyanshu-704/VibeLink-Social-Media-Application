/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */


import "../styles/Info.css";
import ProfileImg from "../images/profile.jpg";
import { useState } from "react";
import EditProfile from "./EditProfile";
import GlobalFriendBtn from "./GlobalFriendBtn";


const Info = ({userData, profile, auth, id}) => {
  // const [userData, setUserData] = useState([]);
  // const { id } = useParams();
  // const { auth,profile } = useSelector((state) => state);
  //   const dispatch = useDispatch();

  // useEffect(() => {
  //   if (auth && auth.user && id === auth.user._id) {
  //     setUserData([auth.user]);
  //   }else{
  //       dispatch(getProfileUsers({users: profile.user, id, auth}))
  //       const newData = profile.users.filter(user=>user._id === id)
  //                   setUserData(newData)   
  //                }
  // }, [id, auth.user, auth]);

  const [onEdit, SetOnEdit] = useState(false)

  return (
    <div className="profileinfo">
      
      {userData.length > 0 &&
        userData.map((user, index) => {
          return (
            <div className="profileinfo-container" key={`${user._id}-${index}`}>
              <div className="profileinfo-top">
                <img src={user.avatar || ProfileImg } alt="" />
              </div>
              <div className="profileinfo-center">
                <img
                  className="profileinfo-centeravatar"
                  src={user.avatar || ProfileImg }
                  alt=""
                />
                 { user && auth && user?._id === auth.user._id ?
                <button className="profileinfo-centerbutton" onClick={()=>SetOnEdit(true)}>EDIT PROFILE</button>
              : <GlobalFriendBtn classbtn = "profileinfo-centerbutton" user={user}/>}
                </div>
              <div className="profileinfo-bottom">
                <div className="profileinfo-bottomleft">
                  <div className="profileinfo-stat">
                    <h6 className="profileinfo-statenumber">
                      {user.friends.length}
                    </h6>
                    <h6 className="profileinfo-statedesc">FRIENDS</h6>
                  </div>
                  <div className="profileinfo-stat">
                    <h6 className="profileinfo-statenumber">
                      {user.following.length}
                    </h6>
                    <h6 className="profileinfo-statedesc">FOLLOWING</h6>
                  </div>
                </div>
                <div className="profileinfo-bottomcenter">
                  <h3 className="profileinfo-fullname">{user.fullname}</h3>
                  <h5 className="profileinfo-username">{user.username}</h5>
                </div>
                <div className="profileinfo-bottomright">
                  <div className="profileinfo-stat">
                    <h6 className="profileinfo-statenumber">
                      {user.friends.length}
                    </h6>
                    <h6 className="profileinfo-statedesc">POSTS</h6>
                  </div>
                </div>
              </div>
              {
                    onEdit && <EditProfile  user={user} SetOnEdit={SetOnEdit}/>
                }
            </div>
          );
        })}
    </div>
  );
};

export default Info;
