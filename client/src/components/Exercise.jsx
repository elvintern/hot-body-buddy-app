import React, { useState, useEffect } from 'react';
import Set from './Set.jsx';
import ValidCheck from './ValidCheck.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell, faCheck } from '@fortawesome/free-solid-svg-icons';
import './Exercise.scss';

export default function Exercise({ exercise, performance, setPerformance }) {
  const [workoutResult, setWorkoutResult] = useState({
    exercise: exercise,
    reps: [],
    weight: [],
  });
  const [records, setRecords] = useState([]);
  const [count, setCount] = useState(1);
  const [isDone, setIsDone] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const setProps = {
    setCount,
    records,
    setRecords,
    exercise: exercise,
  };

  const handleClick = () => {
    const sortedRecords = records.sort((a, b) => a.sets - b.sets);
    const reps = sortedRecords.map((record) => record.reps);
    const weight = sortedRecords.map((record) => record.weight);
    if (reps.every((el) => el >= 1) && weight.every((el) => el >= 1)) {
      setIsDone(true);

      setWorkoutResult(() => {
        return {
          exercise: sortedRecords[0].exercise,
          reps,
          weight,
        };
      });
    } else {
      setIsValid(false);
      console.log('error');
    }
  };

  useEffect(() => {
    if (isDone) {
      const selectedPerformance = performance.find(
        (el) => el.exercise === workoutResult.exercise
      );
      if (selectedPerformance) {
        const newPerformance = performance.filter(
          (el) => el !== selectedPerformance
        );
        setPerformance([...newPerformance, workoutResult]);
      } else {
        setPerformance((prev) => {
          return [...prev, workoutResult];
        });
      }
    }
  }, [workoutResult]);

  const renderComponents = () => {
    const sets = [];
    for (let i = 0; i < count; i++) {
      sets.push(<Set key={i} sets={i + 1} {...setProps} />);
    }
    return sets;
  };

  return (
    <div className="exercise">
      <h3 className="heading heading--tertiary">
        <FontAwesomeIcon className="exercise__icon" icon={faDumbbell} />
        {exercise}{' '}
        {isDone ? (
          <FontAwesomeIcon
            className="exercise__icon exercise__icon--check"
            icon={faCheck}
          />
        ) : null}
      </h3>
      <div
        className="exercise__container"
        style={isDone ? { display: 'none' } : null}
      >
        {renderComponents()}
        <ValidCheck
          isValid={isValid}
          message={'Please type in your Reps and Weight :)'}
        />
        <button onClick={handleClick} className="btn">
          done
        </button>
      </div>
    </div>
  );
}
