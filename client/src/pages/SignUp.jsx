import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ValidCheck from '../components/ValidCheck';
import useFocusInput from '../customHook/useFocusInput';
import { AuthContext } from '../components/AuthContext';
import './SignUp.scss';

export default function SignUp() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    goal: '',
    pronounce: '',
    email: '',
    password: '',
  });
  const [isValid, setIsValid] = useState(true);
  const inputRef = useFocusInput();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:9000/api/v1/user/sign-up', {
      method: 'POST',
      body: JSON.stringify(userInfo),
      headers: {
        'content-type': 'application/json',
      },
    });

    const data = await response.json();

    if (data) {
      setIsValid(true);
      login();
      localStorage.setItem('id', data);
      navigate(`/profile/${data}`);
    } else {
      setIsValid(false);
    }
  };

  return (
    <div className="sign-up">
      <form className="form form-signup" onSubmit={handleSubmit}>
        <div className="form__container">
          <label htmlFor="firstName" className="form__label">
            first name
          </label>
          <input
            ref={inputRef}
            type="text"
            name="firstName"
            className="form__input"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form__container">
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
        </div>
        <div className="form__container">
          <label htmlFor="goal" className="form__label">
            tell me your goal
          </label>
          <input
            type="textarea"
            maxLength={50}
            name="goal"
            className="form__input"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form__container">
          <label htmlFor="pronounce" className="form__label">
            pronouns
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
        </div>
        <ValidCheck isValid={isValid} message={'This email is already used'} />
        <div className="form__container">
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
        </div>
        <div className="form__container">
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
        </div>
        <div className="form__container form__container--btns">
          <button type="submit" className="btn btn--top">
            next
          </button>
          <Link to="/" className="btn">
            sign in
          </Link>
        </div>
      </form>
      <div className="landing-img landing-img--signUp"></div>
    </div>
  );
}
