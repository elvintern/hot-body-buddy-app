import React from 'react';
import ShowExercises from '../components/ShowExercises';
import ValidCheck from '../components/ValidCheck';
import { deleteExercise } from '../utils/routines';
import { weight_training_exercises } from '../utils/workouts.json';
import './RoutineForm.scss';

export default function RoutineForm({
  state,
  dispatch,
  inputRef,
  addExercise,
}) {
  const handleKeyPress = (event) => {
    if (event.keyCode === 13) {
      addExercise(event);
    }
  };

  return (
    <>
      <div className="form__group">
        <ValidCheck
          isValid={!state.isDuplicated}
          message={'The Same Routine Name Already Exist!'}
        />
        <label htmlFor="routineName" className="form__label">
          routine name
        </label>
        <input
          ref={inputRef}
          type="text"
          name="routineName"
          className="form__input"
          placeholder="ex) Back Day, Leg Day..."
          value={state.routineName}
          onChange={(e) =>
            dispatch({ type: 'setRoutineName', payload: e.target.value })
          }
          required
        />
      </div>
      <div className="form__group">
        <label htmlFor="userRoutine" className="form__label">
          add your exercise
        </label>
        <input
          type="text"
          name="userRoutine"
          className="form__input"
          placeholder="ex) Deadlift, Squat ..."
          value={state.exercise}
          onChange={(e) =>
            dispatch({ type: 'setExercise', payload: e.target.value })
          }
          onKeyDown={handleKeyPress}
        />
        <ul className="search-dropdown">
          {weight_training_exercises
            .filter((item) => {
              const searchTerm = state.exercise.toLowerCase();
              const name = item.toLowerCase();
              return (
                searchTerm && name.startsWith(searchTerm) && name !== searchTerm
              );
            })
            .map((el) => (
              <li
                key={el}
                onClick={() => {
                  dispatch({ type: 'setExercise', payload: el });
                }}
                className="search-row"
              >
                {el}
              </li>
            ))}
        </ul>
        <ValidCheck
          isValid={state.isValid}
          message={'Exercise name should be more than 2 letters'}
        />
      </div>

      <div className="form__group">
        {state.exercises.length > 0 && (
          <ShowExercises
            dispatch={dispatch}
            deleteExercise={deleteExercise}
            exercises={state.exercises}
          />
        )}
      </div>
    </>
  );
}
