import React from 'react';

export default function WorkoutResult({ routine, performance }) {
  const SetList = ({ id, reps, weight }) => {
    return reps.map((rep, i) => (
      <li className="set" key={`${id}-${i}`}>
        {i + 1} set {rep} reps {weight[i]} kgs
      </li>
    ));
  };

  return (
    <div className="workout-result">
      {routine.prevPerformance.length > 0 && (
        <div className="result-container">
          <h2 className="heading-secondary">Previous Performance</h2>
          {routine.prevPerformance.map((el, i) => {
            return (
              <div key={`${el._id}-${i}`} className="result result--prev">
                <h3 className="heading-tertiary">{el.exercise}</h3>
                <ul className="sets">
                  <SetList id={el._id} reps={el.reps} weight={el.weight} />
                </ul>
              </div>
            );
          })}
        </div>
      )}
      <div className="result-container">
        <h2 className="heading-secondary">Today's Performance</h2>
        {performance.map((el, i) => {
          return (
            <div key={`${el._id}-${i}`} className="result result--today">
              <h3 className="heading-tertiary">{el.exercise}</h3>
              <ul className="sets">
                <SetList id={el._id} reps={el.reps} weight={el.weight} />
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
