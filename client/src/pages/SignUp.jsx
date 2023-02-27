import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Quote from '../components/Quote';
// import { getUsers, createUser } from '../../apis/users';

export default function SignUp() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({ totalCount: 0 });
  const [users, setUsers] = useState('');
  const [authenticated, setAuthenticated] = useState(true);

  useEffect(() => {
    getUsers().then((data) => setUsers(data));
  }, []);

  useEffect(() => {
    if (userInfo.id && userInfo.joiningDate) {
      if (users.every((el) => el.email !== userInfo.email)) {
        setAuthenticated(true);
        createUser(userInfo).then(() => {
          navigate(`/profile/${userInfo.id}`);
        });
      } else {
        setAuthenticated(false);
        console.log('This email is already used');
      }
    }
  }, [userInfo.id, userInfo.joiningDate]);

  const handleChange = (event) => {
    setUserInfo((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  function handleSubmit(event) {
    event.preventDefault();
    const id = Date.now();
    const joiningDate = createJoiningDate();
    setUserInfo((prev) => ({ ...prev, id, joiningDate, routines: [] }));
  }

  function createJoiningDate() {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  return (
    <>
      <Quote />
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
