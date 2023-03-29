import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ValidCheck from './ValidCheck';

export default function Login() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    userEmail: '',
    password: '',
  });
  const [isValid, setIsValid] = useState(true);
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    const response = await fetch('http://localhost:9000/api/v1/user', {
      method: 'POST',
      body: JSON.stringify(userInfo),
      headers: {
        'content-type': 'application/json',
      },
    });

    const data = await response.json();

    if (response.ok) {
      setIsValid(true);
      navigate(`/profile/${data}`);
    } else {
      setIsValid(false);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserInfo((prevUserInfo) => ({ ...prevUserInfo, [name]: value }));
  };

  return (
    <>
      <form className="form form-login" onSubmit={handleLogin}>
        <ValidCheck isValid={isValid} message={'Invalid email or password'} />
        <div className="form__group">
          <label htmlFor="userEmail" className="form__label">
            user email
          </label>
          <input
            ref={inputRef}
            onChange={handleInputChange}
            type="email"
            name="userEmail"
            id="userEmail"
            className="form__input"
            required
          />
        </div>
        <div className="form__group">
          <label htmlFor="password" className="form__label">
            password
          </label>
          <input
            onChange={handleInputChange}
            type="password"
            name="password"
            id="password"
            className="form__input"
            required
          />
        </div>
        <div className="form__group">
          <button type="submit" className="btn btn--top">
            login
          </button>
          <Link to="/sign-up" className="btn btn--signup">
            sign up
          </Link>
        </div>
      </form>
    </>
  );
}
