import ShowExercises from './ShowExercises';

export default function Routine({
  routine,
  editingRoutineId,
  editRoutine,
  deleteRoutine,
  handleSave,
}) {
  const handleEdit = (event) => {
    if (editingRoutineId === routine._id) {
      editRoutine(event, routine._id);
      handleSave();
    } else {
      editRoutine(event, routine._id);
    }
  };

  return (
    <div className="routine" key={routine._id}>
      <h3 className="heading-tertiary">{routine.routineName}</h3>
      <button onClick={handleEdit}>
        {editingRoutineId === routine._id ? 'Save' : 'Edit'}
      </button>
      <button onClick={(e) => deleteRoutine(e, routine._id)}>Delete</button>
      <ShowExercises exercises={routine.exercises} />
    </div>
  );
}
