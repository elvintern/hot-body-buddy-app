import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ShowExercises from '../components/ShowExercises';
import ValidCheck from '../components/ValidCheck';
import { fetchUserInfoById, deleteUserRoutine } from '../utils/index';

export default function Routine() {
  const { userId } = useParams();
  const [routineName, setRoutineName] = useState('');
  const [exercise, setExercise] = useState('');
  const [exercises, setExercises] = useState([]);
  const [routines, setRoutines] = useState([]);
  const [isValid, setIsValid] = useState(true);
  const [isDuplicated, setIsDuplicated] = useState(false);

  useEffect(() => {
    fetchUserInfoById(userId).then((res) => {
      setRoutines(res.routines);
    });
  }, [routines]);

  function deleteExercise(event, id) {
    event.preventDefault();
    setExercises(exercises.filter((el, index) => index !== id));
  }

  function deleteRoutine(event, id) {
    event.preventDefault();
    deleteUserRoutine(userId, id);
  }

  async function handleSave(event) {
    event.preventDefault();
    if (routines.some((routine) => routine.routineName === routineName)) {
      setIsDuplicated(true);
      return;
    }
    try {
      const userRoutine = { routineName, exercises, prevPerformance: [] };
      setIsDuplicated(false);
      setRoutineName('');
      setExercise('');
      setExercises([]);
      await fetch('http://localhost:9000/api/v1/user/routine', {
        method: 'POST',
        body: JSON.stringify({ userId, userRoutine }),
        headers: {
          'content-type': 'application/json',
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  function addExercise(event) {
    event.preventDefault();
    if (exercise.length < 3) {
      setIsValid(false);
      return;
    } else {
      setIsValid(true);
      setExercises((prev) => [...prev, exercise]);
      setExercise('');
    }
  }

  return (
    <>
      <form className="form form-Routine">
        <ValidCheck
          isValid={!isDuplicated}
          message={'The Same Routine Name Already Exist!'}
        />
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
          required
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

        {exercises.length > 0 && (
          <ShowExercises
            deleteExercise={deleteExercise}
            exercises={exercises}
          />
        )}
        {routines.length > 0 && (
          <div className="routines">
            {routines.map((el) => {
              return (
                <div className="routine" key={el._id}>
                  <h3 className="heading-tertiary" key={el.routineName}>
                    {el.routineName}
                  </h3>
                  <button onClick={(event) => deleteRoutine(event, el._id)}>
                    Delete
                  </button>
                  <ShowExercises exercises={el.exercises} />
                </div>
              );
            })}
          </div>
        )}

        <button onClick={addExercise} className="btn btn-add">
          Add
        </button>
        <button onClick={handleSave} className="btn btn-signup">
          save
        </button>
        <Link to={`/profile/${userId}`} className="btn btn-signup">
          Go Back to Main
        </Link>
      </form>
    </>
  );
}
