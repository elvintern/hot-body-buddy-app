import React from 'react';

export default function ShowExercises(props) {
  return (
    <ul className="exercises">
      {props.exercises.map((el, index) => {
        return (
          <li className="exercise" key={index}>
            {el}
            {props.deleteExercise && (
              <button onClick={(event) => props.deleteExercise(event, index)}>
                Delete
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
}
