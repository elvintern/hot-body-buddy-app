import React, { useContext } from 'react';
import Login from '../components/Login';
import './Home.scss';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext';

export default function Home() {
  const userId = localStorage.getItem('id');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  if (userId) {
    login();
    navigate(`/profile/${userId}`);
  }

  return (
    <>
      <Login />
    </>
  );
}
