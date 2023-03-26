import React, { useState, useEffect } from 'react';

export default function Set(props) {
  const [record, setRecord] = useState({
    exercise: props.exercise,
    sets: props.sets,
    reps: 0,
    weight: 0,
  });

  useEffect(() => {
    const selectedRecord = props.records.find((el) => el.sets === record.sets);
    if (selectedRecord) {
      const newRecords = props.records.filter((el) => el !== selectedRecord);
      props.setRecords([...newRecords, record]);
    } else {
      props.setRecords((prev) => {
        return [...prev, record];
      });
    }
  }, [record]);

  const handleChange = (e) => {
    setRecord((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const addSet = () => {
    props.setCount((prev) => prev + 1);
  };

  const deleteSet = () => {
    props.setCount((prev) => prev - 1);
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
      <button onClick={addSet} className="btn btn--set">
        +
      </button>
      <button onClick={deleteSet} className="btn btn--set">
        -
      </button>
    </li>
  );
}
