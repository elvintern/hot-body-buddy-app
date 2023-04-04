import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/hbb-logo.png';
import Nav from './Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './Header.scss';

const Header = () => {
  const navRef = useRef();
  const showNavbar = () => {
    navRef.current.classList.toggle('nav--responsive');
  };

  return (
    <>
      <header className="header">
        <Link to="/" className="logo-link">
          <img src={logo} alt="hbb logo" className="logo-img" />
        </Link>
        <Nav navRef={navRef} showNavbar={showNavbar} />
        <button className="header__btn" onClick={showNavbar}>
          <FontAwesomeIcon icon={faBars} />
        </button>
      </header>
    </>
  );
};

export default Header;
