import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function Routine() {
  const { userId } = useParams();
  const [routineName, setRoutineName] = useState('');
  const [exercise, setExercise] = useState('');
  const [exercises, setExercises] = useState([]);
  const [newRoutine, setNewRoutine] = useState([]);

  function handleSubmit(event) {
    event.preventDefault();
    const userRoutine = { routineName, exercises };
    console.log(userRoutine);
    setNewRoutine((prev) => [...prev, userRoutine]);
    setRoutineName('');
    setExercise('');
    console.log(newRoutine);
  }

  function addExercise(event) {
    event.preventDefault();
    setExercises((prev) => [...prev, exercise]);
    console.log(exercises);
    setExercise('');
  }

  useEffect(() => {
    console.log(userId);
  }, []);

  return (
    <>
      <form className="form form-Routine">
        <label htmlFor="routineName" className="form__label">
          routine name
        </label>
        <input
          type="text"
          name="routineName"
          className="form__input"
          placeholder="ex) Back Day, Leg Day..."
          value={routineName}
          onChange={(e) => setRoutineName(e.target.value)}
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
          onChange={(e) => setExercise(e.target.value)}
        />
        {exercises.map((el) => {
          return <p key={el}>{el}</p>;
        })}

        <button onClick={addExercise} className="btn btn-add">
          Add
        </button>

        <button onClick={handleSubmit} className="btn btn-signup">
          save
        </button>

        <Link to={`/profile/${userId}`} className="btn btn-signup">
          Go Back to Main
        </Link>
      </form>
    </>
  );
}
