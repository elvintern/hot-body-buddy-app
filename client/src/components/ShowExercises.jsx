import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';
import './ShowExercises.scss';

export default function ShowExercises({ exercises, deleteExercise, dispatch }) {
  return (
    <ul className="exercises">
      {exercises.map((exercise, index) => {
        return (
          <li className="exercise" key={index}>
            <FontAwesomeIcon className="exercise__icon" icon={faDumbbell} />
            {exercise}
            {deleteExercise && (
              <button
                className="btn btn--exercise"
                onClick={(event) => deleteExercise(event, index, dispatch)}
              >
                Delete
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
}
