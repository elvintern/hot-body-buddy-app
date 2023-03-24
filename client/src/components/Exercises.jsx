import React from 'react';

export default function Exercises(props) {
  const { routineName, exercises } = props.routine;

  return (
    <>
      <div>hello</div>
      {exercises.map((exercise, index) => {
        return (
          <div key={index} className="workout-form">
            <ul className="exercises">
              <h3 className="heading-tertiary">{exercise}</h3>

              <li className="exercise">
                <p className="workout-form__set">1 set</p>
                <label htmlFor="reps" className="workout-form__label">
                  Reps
                </label>
                <input
                  type="number"
                  name="reps"
                  id="reps"
                  className="workout-form__input"
                />
                <label htmlFor="weight" className="workout-form__label">
                  Weight
                </label>
                <input
                  type="number"
                  id="weight"
                  className="workout-form__input"
                />
              </li>
            </ul>
          </div>
        );
      })}
    </>
  );
}
