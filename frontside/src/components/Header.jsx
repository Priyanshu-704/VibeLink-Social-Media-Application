import IconButton from "@mui/material/IconButton";
import { Avatar } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import "../styles/Header.css";
import MessageIcon from "@mui/icons-material/Message";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ExploreIcon from "@mui/icons-material/Explore";
import SearchIcon from "@mui/icons-material/Search";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/authActions";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDataApi } from "../utils/fetchDataApi";
import UserCard from "./UserCard";
import LoadIcon from "../images/loading.gif"
import ProfileImg from "../images/profile.jpg"

const Header = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [load,setLoad] = useState(false)
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);

  const { pathname } = useLocation();

  useEffect(() => {
    if (search && auth.token) {
      getDataApi(`search?username=${search}`, auth.token)
        .then((res) => setUsers(res.data.users))
        .catch((err) => {
          dispatch({
            type: "ALERT",
            payload: {
              error: err.response.data.msg,
            },
          });
        });
    }else{
      setUsers([])
    }
  }, [search, auth.token, dispatch]);

  const isActive = (pn) => {
    return pathname === pn ? "active" : "";
  };

  const handleClose = () => {
    setSearch('');
    setUsers([]);
 } 
 const handleSearch = async (e) =>{
  e.preventDefault();
  if(!search) return;

  try {
     setLoad(true)
     const res = await getDataApi(`search?username=${search}`,auth.token);
     setUsers(res.data.users)
     setLoad(false)
  } catch (err) {
     dispatch({
        type:'ALERT',
        payload:{
           error: err.response.data.msg
        }
     })
  }
  
}
  return (
    <div className="header">
      <div className="header-right">
        <h3>Social Network</h3>
      </div>
      <form className="header-center" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search Profiles"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <SearchIcon style={{opacity: users.length > 0 ? '1' : '0'}} />
        <span className="header-centersearchclose" onClick={handleClose} style={{opacity: users.length > 0 ? '1' : '0'}}>&times;</span>
        <button type="submit" style={{display:'none'}}>Search</button>
        <div className="header-searchusers">
        {load && <img src={LoadIcon} alt="" style={{width:'48px', height:"48px"}}/>}
          {search &&users.length > 0 &&
            users.map((user) => (
              // <Link to={`profile/${user._id}`} key={user._id}>
                <UserCard user={user} key={user._id} handleClose={handleClose}/>
              // </Link>
            ))}
        </div>
      </form>

      <div className="header-left">
        <Link to={`/profile/${auth.user._id}`}>
          <div className="header-leftAvatar">
            <Avatar src={auth.user.avatar || ProfileImg}/>
            <h4 style={{color:'white'}}>{auth.user.fullname}</h4>
          </div>
        </Link>
        <Link to="/">
          <IconButton>
            <HomeIcon className={`${isActive("/")}`} />
          </IconButton>
        </Link>
        <Link to="/message">
          <IconButton>
            <MessageIcon className={`${isActive("/message")}`} />
          </IconButton>
        </Link>
        <Link to="/notification">
          <IconButton>
            <NotificationsIcon className={`${isActive("/notification")}`} />
          </IconButton>
        </Link>
        <Link to="/explore">
          <IconButton>
            <ExploreIcon className={`${isActive("/explore")}`} />
          </IconButton>
        </Link>

        <IconButton onClick={() => dispatch(logout())}>
          <ExitToAppIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Header;
