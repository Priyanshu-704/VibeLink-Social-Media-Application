import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "./index.css";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Post from "./pages/Post";
import NotFound from "./pages/NotFound";
import Alert from "./components/Alert";
import Messages from "./pages/Messages";
import Notifications from "./pages/Notifications";
import Explore from "./pages/Explore";
import Home from "./pages/Home";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { refreshToken } from "./redux/actions/authActions";
import Header from "./components/Header";
import Profile from "./pages/Profile";
import PrivateRouter from "./utils/PrivateRouter";

function App() {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Alert />
        {auth.token && <Header />}
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={auth.token ? <Home /> : <Login />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/message"
            element={
              <PrivateRouter>
                <Messages />
              </PrivateRouter>
            }
          />
          <Route
            path="/explore"
            element={
              <PrivateRouter>
                <Explore />
              </PrivateRouter>
            }
          />
          <Route
            path="/notification"
            element={
              <PrivateRouter>
                <Notifications />
              </PrivateRouter>
            }
          />
          <Route
            path="/post/:id"
            element={
              <PrivateRouter>
                <Post />
              </PrivateRouter>
            }
          />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
