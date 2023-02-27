import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function Routine() {
  const { userId } = useParams();
  const [userRoutine, setUserRoutine] = useState({});
  const [routine, setRoutine] = useState([]);
  const [exercise, setExercise] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const newRoutine = [...routine, exercise];
    setRoutine(newRoutine);
    setExercise('');
  }

  function handleChange(event) {
    setExercise(event.target.value);
  }

  useEffect(() => {
    console.log(userId);
  }, []);

  return (
    <>
      <form className="form form-Routine" onSubmit={handleSubmit}>
        <label htmlFor="userRoutine" className="form__label">
          routine name
        </label>
        <input
          type="text"
          name="userRoutine"
          className="form__input"
          placeholder="ex) Back Day, Leg Day..."
          value={exercise}
          onChange={handleChange}
        />
        <label htmlFor="userRoutine" className="form__label">
          add your exercise
        </label>
        <input
          type="text"
          name="userRoutine"
          className="form__input"
          placeholder="ex) Deadlift, Squat ..."
          value={exercise}
          onChange={handleChange}
        />
        {routine.map((el) => {
          return <p key={Number(Date.now)}>{el}</p>;
        })}

        <button className="btn btn-add">Add</button>

        <Link to="/profile" className="btn btn-signup">
          save
        </Link>
      </form>
    </>
  );
}
