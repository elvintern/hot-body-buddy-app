const fetchUserInfoById = async (userId) => {
  const response = await fetch('http://localhost:9000/api/v1/user/profile', {
    method: 'POST',
    body: JSON.stringify({ userId }),
    headers: {
      'content-type': 'application/json',
    },
  });
  const json = await response.json();
  return json;
};

const updateTotalCount = (userId) => {
  fetch('http://localhost:9000/api/v1/user/profile/update', {
    method: 'POST',
    body: JSON.stringify({ userId }),
    headers: {
      'content-type': 'application/json',
    },
  });
};

const fetchRoutineById = async (userId, routineId) => {
  const response = await fetch('http://localhost:9000/api/v1/user/workout', {
    method: 'POST',
    body: JSON.stringify({ userId, routineId }),
    headers: {
      'content-type': 'application/json',
    },
  });

  const json = await response.json();
  return json;
};

const deleteUserRoutine = async (userId, routineId) => {
  const response = await fetch(
    'http://localhost:9000/api/v1/user/routine/delete',
    {
      method: 'POST',
      body: JSON.stringify({ userId, routineId }),
      headers: {
        'content-type': 'application/json',
      },
    }
  );
  const json = await response.json();
  return json;
};

const addUserRoutine = (userId, newRoutines) => {
  fetch('http://localhost:9000/api/v1/user/routine', {
    method: 'POST',
    body: JSON.stringify({ userId, newRoutines }),
    headers: {
      'content-type': 'application/json',
    },
  });
};

const updateUserRoutine = (userId, editingRoutineId, newRoutine) => {
  fetch('http://localhost:9000/api/v1/user/routine/update', {
    method: 'POST',
    body: JSON.stringify({
      userId,
      routineId: editingRoutineId,
      newRoutine,
    }),
    headers: {
      'content-type': 'application/json',
    },
  });
};

const updateUserPerformance = (userId, routineId, newPerformance) => {
  fetch('http://localhost:9000/api/v1/user/routine/result', {
    method: 'POST',
    body: JSON.stringify({
      userId,
      routineId,
      newPerformance,
    }),
    headers: {
      'content-type': 'application/json',
    },
  });
};

// export default fetchUserInfoById;
export {
  fetchUserInfoById,
  fetchRoutineById,
  deleteUserRoutine,
  addUserRoutine,
  updateUserRoutine,
  updateUserPerformance,
  updateTotalCount,
};
