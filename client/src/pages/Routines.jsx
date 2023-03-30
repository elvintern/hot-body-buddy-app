import React, { useEffect, useReducer } from 'react';
import { Link, useParams } from 'react-router-dom';
import ShowExercises from '../components/ShowExercises';
import ShowRoutines from '../components/ShowRoutines';
import ValidCheck from '../components/ValidCheck';
import {
  fetchUserInfoById,
  deleteUserRoutine,
  addUserRoutine,
  updateUserRoutine,
} from '../utils/index';
import useFocusInput from '../customHook/useFocusInput';
import RoutineReducer from '../reducer/RoutineReducer';

const { reducer, initialState } = RoutineReducer();

export default function Routines() {
  const { userId } = useParams();
  const [state, dispatch] = useReducer(reducer, initialState);
  const inputRef = useFocusInput();

  useEffect(() => {
    fetchUserInfoById(userId).then((res) => {
      dispatch({ type: 'setRoutines', payload: res.routines });
    });
  }, [userId, state.routines, state.exercises, state.editingRoutine]);

  function deleteExercise(event, id) {
    event.preventDefault();
    dispatch({ type: 'deleteExercise', payload: id });
  }

  function deleteRoutine(event, id) {
    event.preventDefault();
    deleteUserRoutine(userId, id);
  }

  function editRoutine(event, id) {
    event.preventDefault();
    const newRoutine = state.routines.find((routine) => routine._id === id);
    dispatch({ type: 'setEditingRoutine', payload: newRoutine });
  }

  function resetInput() {
    dispatch({ type: 'setIsDuplicated', payload: false });
    dispatch({ type: 'setRoutineName', payload: '' });
    dispatch({ type: 'setExercise', payload: '' });
    dispatch({ type: 'setExercises', payload: [] });
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
      resetInput();
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
        resetInput();
        return;
      }
      dispatch({ type: 'setIsDuplicated', payload: true });
      return;
    }

    addNewRoutine();
    resetInput();
  }

  function addExercise(event) {
    event.preventDefault();
    if (state.exercise.length < 3) {
      dispatch({ type: 'setIsValid', payload: false });
      return;
    } else {
      dispatch({ type: 'setIsValid', payload: true });
      dispatch({ type: 'addExercises', payload: state.exercise });
      dispatch({ type: 'setExercise', payload: '' });
    }
  }

  const handleKeyPress = (event) => {
    if (event.keyCode === 13) {
      addExercise(event);
    }
  };

  return (
    <>
      <form className="form form-Routine">
        <div className="form__group">
          <ValidCheck
            isValid={!state.isDuplicated}
            message={'The Same Routine Name Already Exist!'}
          />
          <label htmlFor="routineName" className="form__label">
            routine name
          </label>
          <input
            ref={inputRef}
            type="text"
            name="routineName"
            className="form__input"
            placeholder="ex) Back Day, Leg Day..."
            value={state.routineName}
            onChange={(e) =>
              dispatch({ type: 'setRoutineName', payload: e.target.value })
            }
            required
          />
        </div>
        <div className="form__group">
          <label htmlFor="userRoutine" className="form__label">
            add your exercise
          </label>
          <input
            type="text"
            name="userRoutine"
            className="form__input"
            placeholder="ex) Deadlift, Squat ..."
            value={state.exercise}
            onChange={(e) =>
              dispatch({ type: 'setExercise', payload: e.target.value })
            }
            onKeyDown={handleKeyPress}
          />
          <ValidCheck
            isValid={state.isValid}
            message={'Exercise name should be more than 2 letters'}
          />
        </div>
        <div className="form__group">
          {state.exercises.length > 0 && (
            <ShowExercises
              deleteExercise={deleteExercise}
              exercises={state.exercises}
            />
          )}
        </div>
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
