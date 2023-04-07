import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { AuthContext } from './components/AuthContext';

const ProtectedRoutes = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
