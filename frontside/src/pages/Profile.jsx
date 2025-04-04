import "react";
import Info from "../components/Info";
import Posts from "../components/Posts";
import About from "../components/About";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProfileUsers } from "../redux/actions/profileActions";
import "../styles/Profile.css"

const Profile = () => {

  const [userData, setUserData] = useState([]);
  const { id } = useParams();
  const { auth, profile } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth && auth.user && id === auth.user._id) {
      setUserData([auth.user]);
    } else {
      dispatch(getProfileUsers({ users: profile.users ? profile.users : [], id, auth }));
      const newData = profile.users.filter((user) => user._id === id);
      setUserData(newData);
    }
    console.log()
  }, [id,auth,profile.users,dispatch]);


  return (
    <div className="profile">
      <Info userData={userData} auth={auth} id={id} profile={profile}/>
      <div className="profilebody">
        <div className="profilebody-left">
          <About  userData={userData} auth={auth} id={id} profile={profile}/>
        </div>
        <div className="profilebody-center">
          <Posts />
        </div>
        <div className="profilebody-right">
          <Posts />
        </div>
        
      </div>
    </div>
  );
};

export default Profile;
