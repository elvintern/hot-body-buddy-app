import React, { useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/hbb-logo.png';
import Nav from './Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './Header.scss';
import { AuthContext } from './AuthContext';

const Header = () => {
  const userId = localStorage.getItem('id');
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navRef = useRef();
  const showNavbar = () => {
    navRef.current.classList.toggle('nav--responsive');
  };

  const navProps = {
    isLoggedIn,
    logout,
    navRef,
    showNavbar,
  };

  return (
    <>
      <header className="header">
        <Link
          to={isLoggedIn ? `/profile/${userId}` : '/'}
          className="logo-link"
        >
          <img src={logo} alt="hbb logo" className="logo-img" />
        </Link>
        <Nav navProps={navProps} />
        <button className="header__btn" onClick={showNavbar}>
          <FontAwesomeIcon icon={faBars} />
        </button>
      </header>
    </>
  );
};

export default Header;
