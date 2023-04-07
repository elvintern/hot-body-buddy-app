import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRectangleXmark } from '@fortawesome/free-solid-svg-icons';

const Nav = ({ navProps }) => {
  const { isLoggedIn, logout, navRef, showNavbar } = navProps;

  const handleClick = () => {
    if (isLoggedIn) {
      logout();
    }
  };

  return (
    <nav ref={navRef} className="nav">
      <Link className="nav__link" to="profile/:userId">
        Home
      </Link>
      <Link className="nav__link" to="/about">
        About us
      </Link>
      <Link className="nav__link" to="profile/:userId">
        Profile
      </Link>

      <Link className="nav__link" onClick={handleClick} to="/">
        {isLoggedIn ? 'Logout' : 'Login'}
      </Link>
      <button className="nav__btn nav__btn--close" onClick={showNavbar}>
        <FontAwesomeIcon icon={faRectangleXmark} />
      </button>
    </nav>
  );
};

export default Nav;
