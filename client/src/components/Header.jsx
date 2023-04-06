import React, { useRef, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import logo from '../assets/hbb-logo.png';
import Nav from './Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './Header.scss';
import { AuthContext } from './AuthContext';

const Header = () => {
  const { isLoggedIn, login, logout } = useContext(AuthContext);
  const navRef = useRef();
  const { userId } = useParams();
  const showNavbar = () => {
    navRef.current.classList.toggle('nav--responsive');
  };

  const navProps = {
    isLoggedIn,
    login,
    logout,
    navRef,
    showNavbar,
  };

  return (
    <>
      <header className="header">
        <Link to={'/'} className="logo-link">
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
