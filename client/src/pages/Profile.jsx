import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Quote from '../components/Quote';
import './Profile.scss';

const Profile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const response = await fetch(
        'http://localhost:9000/api/v1/user/profile',
        {
          method: 'POST',
          body: JSON.stringify({ userId }),
          headers: {
            'content-type': 'application/json',
          },
        }
      );
      const json = await response.json();
      console.log(json);
      setUserInfo(json);
    };
    fetchUserInfo();
  }, []);

  const manageRoutines = () => {
    navigate(`routine`);
  };

  return (
    <>
      <Quote />
      {!userInfo ? (
        <p>loading...</p>
      ) : (
        <div className="profile">
          <p className="profile__welcome-msg">welcome {userInfo.firstName}</p>
          <p className="profile__report-times">
            you have been to the gym {userInfo.totalCount} time
            {userInfo.totalCount > 1 && `s`} since{' '}
            {userInfo.created_at.substring(0, 10)}
          </p>
          <p className="profile__user-goal">your goal: {userInfo.goal}</p>
        </div>
      )}

      <select name="routine" className="user-routines">
        <option defaultChecked>choose your workout routine</option>
        {userInfo.routines.map((routine) => {
          return <option>{routine.routineName}</option>;
        })}
      </select>

      <Link className="btn btn--top" to="/exercise">
        start work out
      </Link>

      <button className="btn btn--bottom" onClick={manageRoutines}>
        manage routines
      </button>
    </>
  );
};

export default Profile;
