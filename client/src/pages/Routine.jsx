import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ShowExercises from '../components/ShowExercises';
import ValidCheck from '../components/ValidCheck';

export default function Routine() {
  const { userId } = useParams();
  const [routineName, setRoutineName] = useState('');
  const [exercise, setExercise] = useState('');
  const [exercises, setExercises] = useState([]);
  const [newRoutine, setNewRoutine] = useState([]);
  const [isValid, setIsValid] = useState(true);

  function handleSubmit(event) {
    event.preventDefault();
    const userRoutine = { routineName, exercises };
    setNewRoutine((prev) => [...prev, userRoutine]);
    setRoutineName('');
    setExercise('');
    setExercises([]);
  }

  function addExercise(event) {
    event.preventDefault();
    if (exercise.length < 3) {
      setIsValid(false);
    } else {
      setIsValid(true);
      setExercises((prev) => [...prev, exercise]);
      console.log(exercises);
      setExercise('');
    }
  }

  useEffect(() => {
    // console.log(userId);
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
        <ValidCheck
          isValid={isValid}
          message={'Exercise name should be more than 2 letters'}
        />

        {exercises.length > 0 && <ShowExercises exercises={exercises} />}
        {newRoutine.length > 0 && (
          <div className="routines">
            {newRoutine.map((el, index) => {
              return (
                <div className="routine" key={index}>
                  <h3 className="heading-tertiary" key={el.routineName}>
                    {el.routineName}
                  </h3>
                  <ShowExercises exercises={el.exercises} />
                </div>
              );
            })}
          </div>
        )}

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
