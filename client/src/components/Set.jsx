import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import './Set.scss';

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
    <li className="set">
      <p className="set__count">{`${props.sets}set`}</p>

      <div className="form__container form__container--set">
        <label htmlFor="reps" className="form__label form__label--set">
          Reps
        </label>
        <input
          onChange={(e) => handleChange(e)}
          type="number"
          name="reps"
          id="reps"
          className="form__input"
        />
      </div>
      <div className="form__container form__container--set">
        <label htmlFor="weight" className="form__label form__label--set">
          Weight
        </label>
        <input
          onChange={(e) => handleChange(e)}
          type="number"
          name="weight"
          id="weight"
          placeholder="kgs"
          className="form__input"
        />
      </div>
      <div className="form__container form__container--set form__container--set--btns">
        <button onClick={addSet} className="btn btn--set">
          <FontAwesomeIcon className="set__icon" icon={faPlus} />
        </button>
        <button onClick={deleteSet} className="btn btn--set">
          <FontAwesomeIcon className="set__icon" icon={faMinus} />
        </button>
      </div>
    </li>
  );
}
