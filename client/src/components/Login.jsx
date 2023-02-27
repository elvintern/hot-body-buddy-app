import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(true);
  const [users, setUsers] = useState('');

  // useEffect(() => {
  //   getUsers().then((data) => setUsers(data));
  // }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    let result = users.find((user) => {
      return userEmail === user.email && userPassword === user.password;
    });

    if (!result) {
      console.log('Invalid Id or Password');
      setAuthenticated(false);
    } else {
      setAuthenticated(true);
      navigate(`/profile/${result.id}`);
    }
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
          onChange={(e) => setUserEmail(e.target.value)}
          value={userEmail}
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
          onChange={(e) => setUserPassword(e.target.value)}
          value={userPassword}
          type="password"
          name="password"
          id="password"
          className="form__input"
          required
        />
        <button onClick={handleLogin} className="btn btn--top">
          login
        </button>
        <Link to="/signup" className="btn btn--signup">
          sign up
        </Link>
      </form>
    </>
  );
}
