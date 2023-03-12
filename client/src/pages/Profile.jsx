import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './Profile.scss';
import fetchUserInfoById from '../utils/index.js';

const Profile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    fetchUserInfoById(userId).then((res) => {
      setUserInfo(res);
    });
  }, []);

  const manageRoutines = () => {
    navigate(`routine`);
  };

  return (
    <>
      {!userInfo ? (
        <p>loading...</p>
      ) : (
        <>
          <div className="profile">
            <p className="profile__welcome-msg">welcome {userInfo.firstName}</p>
            <p className="profile__report-times">
              you have been to the gym {userInfo.totalCount} time
              {userInfo.totalCount > 1 && `s`} since{' '}
              {userInfo.created_at.substring(0, 10)}
            </p>
            <p className="profile__user-goal">your goal: {userInfo.goal}</p>
          </div>

          <select name="routine" className="user-routines">
            <option defaultChecked>choose your workout routine</option>
            {userInfo.routines.length > 0 &&
              userInfo.routines.map((routine) => {
                return (
                  <option key={routine.routineName}>
                    {routine.routineName}
                  </option>
                );
              })}
          </select>
        </>
      )}

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
