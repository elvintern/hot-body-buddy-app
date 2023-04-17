import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Profile.scss';
import LoadingPage from '../components/LoadingPage';
import { fetchUserInfoById } from '../utils/index.js';
import ValidCheck from '../components/ValidCheck';

const Profile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [selectedRoutine, setSelectedRoutine] = useState('');
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    async function getUserInfo() {
      try {
        const res = await fetchUserInfoById(userId);
        setUserInfo(res);
      } catch (err) {
        console.error(err);
      }
    }

    const timer = setTimeout(() => {
      getUserInfo();
    }, 2000);

    return () => clearTimeout(timer);
  }, [userId, userInfo]);

  const startWorkOut = () => {
    if (selectedRoutine === '') {
      setIsValid(false);
      return;
    }

    const routineId = userInfo.routines.find(
      (routine) => routine.routineName === selectedRoutine
    )._id;

    navigate(`workout/${routineId}`);
  };

  return (
    <>
      {!userInfo ? (
        <LoadingPage />
      ) : (
        <>
          <div className="profile">
            <p className="profile__welcome-msg">welcome {userInfo.firstName}</p>
            <p className="profile__report-times">
              you have been to the gym {userInfo.totalCount} time
              {userInfo.totalCount > 1 ? 's' : ''} since{' '}
              {userInfo.created_at.substring(0, 10)}
            </p>
            <p className="profile__user-goal">your goal: {userInfo.goal}</p>
          </div>

          <select
            name="routine"
            className="user-routines"
            value={selectedRoutine}
            onChange={(e) => setSelectedRoutine(e.target.value)}
          >
            <option disabled value="">
              choose your workout routine
            </option>
            {userInfo.routines.length > 0 &&
              userInfo.routines.map((routine) => {
                return <option key={routine._id}>{routine.routineName}</option>;
              })}
          </select>
          {!isValid && (
            <ValidCheck
              isValid={isValid}
              message={'You have to choose your routine!'}
            />
          )}

          <button className="btn btn--top" onClick={startWorkOut}>
            start work out
          </button>
          <button
            className="btn btn--bottom"
            onClick={() => navigate(`routine`)}
          >
            manage routines
          </button>
        </>
      )}
    </>
  );
};

export default Profile;
