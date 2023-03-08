import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const [authenticated, setAuthenticated] = useState(true);

  const handleLogin = async (event) => {
    event.preventDefault();

    const response = await fetch('http://localhost:9000/api/v1/user', {
      method: 'POST',
      body: JSON.stringify(userInfo),
      headers: {
        'content-type': 'application/json',
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setAuthenticated(false);
    } else if (response.ok) {
      setAuthenticated(true);
      navigate(`/profile/${json}`);
    }
  };

  const handleChange = (event) => {
    setUserInfo((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <>
      <form className="form form-login" onSubmit={handleLogin}>
        {!authenticated ? (
          <p className="error">Invalid email or password</p>
        ) : null}
        <label htmlFor="userEmail" className="form__label">
          user email
        </label>
        <input
          onChange={handleChange}
          type="email"
          name="userEmail"
          id="userEmail"
          className="form__input"
          required
        />

        <label htmlFor="password" className="form__label">
          password
        </label>
        <input
          onChange={handleChange}
          type="password"
          name="password"
          id="password"
          className="form__input"
          required
        />
        <button onClick={handleLogin} className="btn btn--top">
          login
        </button>
        <Link to="/sign-up" className="btn btn--signup">
          sign up
        </Link>
      </form>
    </>
  );
}
