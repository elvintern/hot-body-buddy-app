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

const initialState = {
  routineName: '',
  exercise: '',
  exercises: [],
  routines: [],
  editingRoutine: {},
  isValid: true,
  isEditing: false,
  isDuplicated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'setRoutineName':
      return { ...state, routineName: action.payload };
    case 'setExercise':
      return { ...state, exercise: action.payload };
    case 'setExercises':
      return { ...state, exercises: action.payload };
    case 'addExercises':
      return { ...state, exercises: [...state.exercises, action.payload] };
    case 'setRoutines':
      return { ...state, routines: action.payload };
    case 'setEditingRoutine':
      return { ...state, editingRoutine: action.payload };
    case 'setIsValid':
      return { ...state, isValid: action.payload };
    case 'setIsEditing':
      return { ...state, isEditing: action.payload };
    case 'setIsDuplicated':
      return { ...state, isDuplicated: action.payload };
    case 'deleteExercise':
      return {
        ...state,
        exercises: state.exercises.filter(
          (el, index) => index !== action.payload
        ),
      };
    default:
      throw new Error();
  }
}

export default function Routine() {
  const { userId } = useParams();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchUserInfoById(userId).then((res) => {
      dispatch({ type: 'setRoutines', payload: res.routines });
    });
  }, [userId, addExercise]);

  function deleteExercise(event, id) {
    event.preventDefault();
    dispatch({ type: 'deleteExercise', payload: id });
  }

  function deleteRoutine(event, id) {
    event.preventDefault();
    deleteUserRoutine(userId, id);
  }

  async function editRoutine(event, id) {
    event.preventDefault();
    const newRoutine = await state.routines.find(
      (routine) => routine._id === id
    );
    dispatch({ type: 'setEditingRoutine', payload: newRoutine });
    dispatch({ type: 'setExercises', payload: newRoutine.exercises });
    dispatch({ type: 'setRoutineName', payload: newRoutine.routineName });
    dispatch({ type: 'setIsEditing', payload: true });
    dispatch({ type: 'setExercise', payload: '' });
  }

  function resetInput() {
    dispatch({ type: 'setIsDuplicated', payload: false });
    dispatch({ type: 'setRoutineName', payload: '' });
    dispatch({ type: 'setExercise', payload: '' });
    dispatch({ type: 'setExercises', payload: [] });
  }

  async function addNewRoutine() {
    try {
      const newRoutines = [
        ...state.routines,
        {
          routineName: state.routineName,
          exercises: state.exercises,
          prevPerformance: [],
        },
      ];
      resetInput();
      addUserRoutine(userId, newRoutines);
    } catch (error) {
      console.log(error.message);
    }
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

  async function handleSave(event) {
    event.preventDefault();
    console.log(state.editingRoutine);
    if (
      state.routines.some(
        (routine) => routine.routineName === state.routineName
      )
    ) {
      if (state.isEditing) {
        updateRoutine();
        return;
      }
      dispatch({ type: 'setIsDuplicated', payload: true });
      return;
    }

    addNewRoutine();
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

  return (
    <>
      <form className="form form-Routine">
        <ValidCheck
          isValid={!state.isDuplicated}
          message={'The Same Routine Name Already Exist!'}
        />
        <label htmlFor="routineName" className="form__label">
          routine name
        </label>
        <input
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
        />
        <ValidCheck
          isValid={state.isValid}
          message={'Exercise name should be more than 2 letters'}
        />

        {state.exercises.length > 0 && (
          <ShowExercises
            deleteExercise={deleteExercise}
            exercises={state.exercises}
          />
        )}
        {state.routines.length > 0 && (
          <ShowRoutines
            routines={state.routines}
            editRoutine={editRoutine}
            deleteRoutine={deleteRoutine}
            isEditing={state.isEditing}
          />
        )}

        <button onClick={(e) => addExercise(e)} className="btn btn-add">
          Add
        </button>
        <button onClick={(e) => handleSave(e)} className="btn btn-signup">
          save
        </button>
        <Link to={`/profile/${userId}`} className="btn btn-signup">
          Go Back to Main
        </Link>
      </form>
    </>
  );
}
