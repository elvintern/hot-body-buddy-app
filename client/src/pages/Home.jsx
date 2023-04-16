import React, { useContext, useEffect } from 'react';
import './Home.scss';
import Login from '../components/Login';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext';

export default function Home() {
  const userId = localStorage.getItem('id');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  useEffect(() => {
    if (userId) {
      login();
      navigate(`/profile/${userId}`);
    }
  }, []);

  return (
    <div className="home">
      <div className="landing-img"></div>
      <Login />
    </div>
  );
}
