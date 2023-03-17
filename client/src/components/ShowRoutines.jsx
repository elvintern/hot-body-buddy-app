import React from 'react';
import ShowExercises from './ShowExercises';

export default function ShowRoutines(props) {
  return (
    <div className="routines">
      {props.routines.map((el) => {
        return (
          <div className="routine" key={el._id}>
            <h3 className="heading-tertiary" key={el.routineName}>
              {el.routineName}
            </h3>
            <button onClick={(event) => props.editRoutine(event, el._id)}>
              {props.isEditing ? 'Save' : 'Edit'}
            </button>
            <button onClick={(event) => props.deleteRoutine(event, el._id)}>
              Delete
            </button>
            <ShowExercises exercises={el.exercises} />
          </div>
        );
      })}
    </div>
  );
}
