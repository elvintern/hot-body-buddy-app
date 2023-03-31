export function deleteExercise(event, id, dispatch) {
  event.preventDefault();
  dispatch({ type: 'deleteExercise', payload: id });
}

export function resetInput(dispatch) {
  dispatch({ type: 'setIsDuplicated', payload: false });
  dispatch({ type: 'setRoutineName', payload: '' });
  dispatch({ type: 'setExercise', payload: '' });
  dispatch({ type: 'setExercises', payload: [] });
}
