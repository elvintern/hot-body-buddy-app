import React, { useContext } from 'react';
import Login from '../components/Login';
import LoadingPage from '../components/LoadingPage';
import './Home.scss';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext';

export default function Home() {
  const userId = localStorage.getItem('id');
  const navigate = useNavigate();
  const { isLoggedIn, login } = useContext(AuthContext);
  if (userId && isLoggedIn) {
    login();
    navigate(`/profile/${userId}`);
  }

  return (
    <>
      <LoadingPage />
      <Login />
    </>
  );
}
