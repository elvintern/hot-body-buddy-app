import React from 'react';
import Routine from '../components/Routine';

export default function ShowRoutines({
  routines,
  editingRoutineId,
  editRoutine,
  deleteRoutine,
  handleSave,
}) {
  return (
    <div className="routines">
      {routines.map((routine) => (
        <Routine
          key={routine._id}
          routine={routine}
          editingRoutineId={editingRoutineId}
          editRoutine={editRoutine}
          deleteRoutine={deleteRoutine}
          handleSave={handleSave}
        />
      ))}
    </div>
  );
}
