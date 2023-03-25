import React, { useState } from 'react';
import Set from './Set.jsx';

export default function Exercise(props) {
  const [workoutResult, setWorkoutResult] = useState({
    exercise: props.exercise,
    reps: [],
    weight: [],
  });
  const [count, setCount] = useState(1);
  const renderComponents = () => {
    const sets = [];
    for (let i = 0; i < count; i++) {
      sets.push(
        <Set key={i} setCount={setCount} exercise={props.exercise} sets={i} />
      );
    }
    return sets;
  };

  return (
    <>
      <h3 className="heading-tertiary">{props.exercise}</h3>
      {renderComponents()}
    </>
  );
}
