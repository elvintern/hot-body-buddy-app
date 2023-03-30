import React from 'react';

export default function ShowExercises({ exercises, deleteExercise }) {
  return (
    <ul className="exercises">
      {exercises.map((exercise, index) => {
        return (
          <li className="exercise" key={index}>
            {exercise}
            {deleteExercise && (
              <button onClick={(event) => deleteExercise(event, index)}>
                Delete
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
}
