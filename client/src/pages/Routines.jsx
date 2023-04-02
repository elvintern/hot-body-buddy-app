import React, { useEffect, useReducer } from 'react';
import { Link, useParams } from 'react-router-dom';
import RoutineForm from '../components/RoutineForm';
import ShowRoutines from '../components/ShowRoutines';
import {
  fetchUserInfoById,
  deleteUserRoutine,
  addUserRoutine,
  updateUserRoutine,
} from '../utils/index';
import { resetInput } from '../utils/routines';
import useFocusInput from '../customHook/useFocusInput';
import RoutineReducer from '../reducer/RoutineReducer';

export default function Routines() {
  const { userId } = useParams();
  const [state, dispatch] = useReducer(
    RoutineReducer().reducer,
    RoutineReducer().initialState
  );
  const inputRef = useFocusInput();

  useEffect(() => {
    fetchUserInfoById(userId).then((res) => {
      dispatch({ type: 'setRoutines', payload: res.routines });
    });
  }, [userId, state.routines, state.exercises, state.editingRoutine]);

  function deleteRoutine(event, id) {
    event.preventDefault();
    deleteUserRoutine(userId, id);
  }

  function editRoutine(event, id) {
    event.preventDefault();
    const newRoutine = state.routines.find((routine) => routine._id === id);
    dispatch({ type: 'setEditingRoutine', payload: newRoutine });
  }

  function addNewRoutine() {
    const newRoutine = {
      routineName: state.routineName,
      exercises: state.exercises,
      prevPerformance: [],
    };
    addUserRoutine(userId, [...state.routines, newRoutine]);
  }

  async function updateRoutine() {
    try {
      const newRoutine = {
        routineName: state.routineName,
        exercises: state.exercises,
        prevPerformance: state.editingRoutine.prevPerformance,
      };
      await updateUserRoutine(userId, state.editingRoutine._id, newRoutine);
      resetInput(dispatch);
    } catch (error) {
      console.log(error.message);
    }
  }

  function handleSave(event) {
    event.preventDefault();
    if (
      state.routines.some(
        (routine) => routine.routineName === state.routineName
      )
    ) {
      if (state.isEditing) {
        updateRoutine();
        resetInput(dispatch);
        return;
      }
      dispatch({ type: 'setIsDuplicated', payload: true });
      return;
    }

    addNewRoutine();
    resetInput(dispatch);
  }

  return (
    <>
      <form className="form form-Routine">
        <RoutineForm state={state} dispatch={dispatch} inputRef={inputRef} />

        <div className="form__group">
          {state.routines.length > 0 && (
            <ShowRoutines
              routines={state.routines}
              editRoutine={editRoutine}
              deleteRoutine={deleteRoutine}
              editingRoutineId={state.editingRoutineId}
              handleSave={handleSave}
            />
          )}
        </div>
        <div className="form__group">
          <button onClick={(e) => addExercise(e)} className="btn btn-add">
            Add
          </button>
          <button onClick={(e) => handleSave(e)} className="btn btn-signup">
            save
          </button>
          <Link to={`/profile/${userId}`} className="btn btn-signup">
            Go Back to Main
          </Link>
        </div>
      </form>
    </>
  );
}
