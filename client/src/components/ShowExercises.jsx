import React from 'react';

export default function ShowExercises(props) {
  return (
    <ul className="exercises">
      {props.exercises.map((el, index) => {
        return (
          <li className="exercise" key={index}>
            {el}
          </li>
        );
      })}
    </ul>
  );
}
