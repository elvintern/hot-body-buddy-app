import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
// import { fetchUserInfo } from '../../apis/users';
import Quote from '../components/Quote';
import './Profile.scss';

const Profile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});

  // useEffect(() => {
  //   fetchUserInfo({ userId })
  //     .then((result) => {
  //       setUserInfo(result.body[0]);
  //       console.log(JSON.parse(result.body[0].routines));
  //     })
  //     .catch((error) => {
  //       console.error(error.message);
  //     });
  // }, [userId]);

  const manageRoutines = () => {
    navigate(`routine`);
  };

  return (
    <>
      <Quote />
      {!userInfo.email ? (
        <p>loading...</p>
      ) : (
        <div className="profile">
          <p className="profile__welcome-msg">welcome {userInfo.firstName}</p>
          <p className="profile__report-times">
            you have been to the gym {userInfo.totalCount} time
            {userInfo.totalCount > 1 && `s`} since {userInfo.joiningDate}
          </p>
          <p className="profile__user-goal">your goal: {userInfo.goal}</p>
          <p>{JSON.stringify(userInfo.routines.routineName)}</p>
        </div>
      )}

      <select name="routine" className="user-routines">
        <option defaultChecked>choose your workout routine</option>
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
