export default function RoutineReducer() {
  const initialState = {
    routineName: '',
    exercise: '',
    exercises: [],
    routines: [],
    editingRoutine: {},
    isValid: true,
    isEditing: false,
    isDuplicated: false,
    editingRoutineId: null,
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
        return {
          ...state,
          editingRoutine: action.payload,
          exercises: action.payload.exercises,
          routineName: action.payload.routineName,
          isEditing: true,
          editingRoutineId: action.payload._id,
        };
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

  return { reducer, initialState };
}
