import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Quote from '../components/Quote';

export default function SignUp() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({ totalCount: 0, routines: [] });
  const [authenticated, setAuthenticated] = useState(true);

  const handleChange = (event) => {
    setUserInfo((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await fetch('http://localhost:9000/api/v1/user/sign-up', {
      method: 'POST',
      body: JSON.stringify(userInfo),
      headers: {
        'content-type': 'application/json',
      },
    });

    const json = await response.json();
    console.log(json);

    if (!json) {
      setAuthenticated(false);
    } else if (json) {
      setAuthenticated(true);
      navigate(`/profile/${json}`);
    }
  }

  return (
    <>
      <form className="form form-signup" onSubmit={handleSubmit}>
        <label htmlFor="firstName" className="form__label">
          first name
        </label>
        <input
          type="text"
          name="firstName"
          className="form__input"
          onChange={handleChange}
          required
        />
        <label htmlFor="lastName" className="form__label">
          last name
        </label>
        <input
          type="text"
          name="lastName"
          className="form__input"
          onChange={handleChange}
          required
        />
        <label htmlFor="goal" className="form__label">
          tell me your goal
        </label>
        <input
          type="textarea"
          maxLength={30}
          name="goal"
          className="form__input"
          onChange={handleChange}
          required
        />
        <label htmlFor="pronounce" className="form__label">
          pronounce
        </label>
        <div className="form-pronounce">
          <div className="pronounce-container">
            <label htmlFor="pronounce" className="form__label">
              he/him
            </label>
            <input
              type="radio"
              name="pronounce"
              className="form__input form__input--radio"
              value="he/him"
              onChange={handleChange}
            />
          </div>
          <div className="pronounce-container">
            <label htmlFor="pronounce" className="form__label">
              she/her
            </label>
            <input
              type="radio"
              name="pronounce"
              className="form__input form__input--radio"
              value="she/her"
              onChange={handleChange}
            />
          </div>
          <div className="pronounce-container">
            <label htmlFor="pronounce" className="form__label">
              they/them
            </label>
            <input
              type="radio"
              name="pronounce"
              className="form__input form__input--radio"
              value="they/them"
              onChange={handleChange}
            />
          </div>
        </div>
        <label htmlFor="email" className="form__label">
          email
        </label>
        <input
          type="email"
          name="email"
          className="form__input"
          onChange={handleChange}
          required
        />
        <label htmlFor="password" className="form__label">
          password
        </label>
        <input
          type="password"
          name="password"
          className="form__input"
          autoComplete="on"
          onChange={handleChange}
          required
        />
        {!authenticated ? (
          <p className="error">This email is already used</p>
        ) : null}
        <button type="submit" className="btn btn--top">
          next
        </button>
        <Link to="/" className="btn">
          sign in
        </Link>
      </form>
    </>
  );
}
