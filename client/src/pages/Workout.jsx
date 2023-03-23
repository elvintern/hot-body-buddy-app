import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRoutineById } from '../utils/index.js';

export default function Workout() {
  const { userId, workoutId } = useParams();
  const [routine, setRoutine] = useState(null);

  useEffect(() => {
    async function getRoutine() {
      try {
        const res = await fetchRoutineById(userId, workoutId);
        console.log(res);
        setRoutine(res);
      } catch (err) {
        console.error(err);
      }
    }
    getRoutine();
  }, [workoutId]);

  return (
    <div>
      Workout {userId} {workoutId}
      name
      {routine && routine.routineName}
    </div>
  );
}
