import ShowExercises from './ShowExercises';
import './Routine.scss';

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
      handleSave(event);
    } else {
      editRoutine(event, routine._id);
    }
  };

  return (
    <div className="routine" key={routine._id}>
      <h3 className="heading heading--tertiary">{routine.routineName} </h3>

      <ShowExercises exercises={routine.exercises} />
      <button className="btn btn--routine" onClick={handleEdit}>
        {editingRoutineId === routine._id ? 'Save' : 'Edit'}
      </button>
      <button
        className="btn btn--routine"
        onClick={(e) => deleteRoutine(e, routine._id)}
      >
        Delete
      </button>
    </div>
  );
}
