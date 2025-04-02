import { Navigate } from 'react-router-dom';

const PrivateRouter = ({ children }) => {
  const login = localStorage.getItem('login');

  return login ? children : <Navigate to="/" replace />;
};

export default PrivateRouter;
