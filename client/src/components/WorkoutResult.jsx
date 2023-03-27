import React from 'react';

export default function WorkoutResult({ routine }) {
  const SetList = ({ id, reps, weight }) => {
    return reps.map((rep, i) => (
      <li className="set" key={`${id}-${i}`}>
        {i + 1} set {rep} reps {weight[i]} weight
      </li>
    ));
  };

  return (
    <div className="workout-result">
      <h2 className="heading-secondary">Previous Performance</h2>
      {routine.prevPerformance.map((el, i) => {
        return (
          <div key={`${el._id}-${i}`} className="prev-result">
            <h3 className="heading-tertiary">{el.exercise}</h3>
            <ul className="sets">
              <SetList id={el._id} reps={el.reps} weight={el.weight} />
            </ul>
          </div>
        );
      })}
    </div>
  );
}
