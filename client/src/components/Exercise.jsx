import React, { useState, useEffect } from 'react';
import Set from './Set.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';

export default function Exercise({ exercise, performance, setPerformance }) {
  const [workoutResult, setWorkoutResult] = useState({
    exercise: exercise,
    reps: [],
    weight: [],
  });
  const [records, setRecords] = useState([]);
  const [count, setCount] = useState(1);
  const [isDone, setIsDone] = useState(false);

  const setProps = {
    setCount,
    records,
    setRecords,
    exercise: exercise,
  };

  const handleClick = () => {
    setIsDone(true);
    const sortedRecords = records.sort((a, b) => a.sets - b.sets);
    const reps = sortedRecords.map((record) => record.reps);
    const weight = sortedRecords.map((record) => record.weight);
    setWorkoutResult(() => {
      return {
        exercise: sortedRecords[0].exercise,
        reps,
        weight,
      };
    });
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
    <>
      <h3 className="heading heading--tertiary">
        <FontAwesomeIcon className="exercise__icon" icon={faDumbbell} />
        {exercise}
      </h3>
      {renderComponents()}
      <button onClick={handleClick} className="btn">
        done
      </button>
    </>
  );
}
