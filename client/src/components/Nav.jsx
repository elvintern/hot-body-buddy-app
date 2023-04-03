import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRectangleXmark } from '@fortawesome/free-solid-svg-icons';

const Nav = ({ navRef, showNavbar }) => {
  return (
    <nav ref={navRef} className="nav">
      <Link className="nav__link" href="/#">
        Home
      </Link>
      <Link className="nav__link" href="/#">
        About us
      </Link>
      <Link className="nav__link" href="/#">
        Blog
      </Link>
      <Link className="nav__link" href="/#">
        Logout
      </Link>
      <button className="nav__btn nav__btn--close" onClick={showNavbar}>
        <FontAwesomeIcon icon={faRectangleXmark} />
      </button>
    </nav>
  );
};

export default Nav;
