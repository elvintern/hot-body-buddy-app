import React, { useState, useEffect } from 'react';
import Set from './Set.jsx';

export default function Exercise(props) {
  const [workoutResult, setWorkoutResult] = useState({
    exercise: props.exercise,
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
    exercise: props.exercise,
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
      const selectedPerformance = props.performance.find(
        (el) => el.exercise === workoutResult.exercise
      );
      if (selectedPerformance) {
        const newPerformance = props.performance.filter(
          (el) => el !== selectedPerformance
        );
        props.setPerformance([...newPerformance, workoutResult]);
      } else {
        props.setPerformance((prev) => {
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
      <h3 className="heading-tertiary">{props.exercise}</h3>
      {renderComponents()}
      <button onClick={handleClick} className="btn">
        done
      </button>
    </>
  );
}
