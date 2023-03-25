import React, { useState } from 'react';

export default function Set(props) {
  const [record, setRecord] = useState({
    exercise: props.exercise,
    reps: null,
    weight: null,
  });

  const handleChange = (e) => {
    setRecord((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(record);
  };

  const addSet = () => {
    props.setCount((prev) => prev + 1);
  };

  return (
    <li className="exercise">
      <p className="workout-form__set">{props.sets} set</p>
      <label htmlFor="reps" className="workout-form__label">
        Reps
      </label>
      <input
        onChange={(e) => handleChange(e)}
        type="number"
        name="reps"
        id="reps"
        className="workout-form__input"
      />
      <label htmlFor="weight" className="workout-form__label">
        Weight
      </label>
      <input
        onChange={(e) => handleChange(e)}
        type="number"
        name="weight"
        id="weight"
        className="workout-form__input"
      />
      <button className="btn" onClick={addSet}>
        +
      </button>
      <button className="btn">-</button>
    </li>
  );
}
