import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/hbb-logo.png';
import './Nav.scss';

const Nav = () => {
  return (
    <>
      <div className="nav">
        <Link to="/" className="nav__logo-link">
          <img src={logo} alt="hbb logo" className="nav__logo-img" />
        </Link>
      </div>
    </>
  );
};

export default Nav;
