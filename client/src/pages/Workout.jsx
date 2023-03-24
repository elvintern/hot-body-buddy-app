import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRoutineById } from '../utils/index.js';
import Exercises from '../components/Exercises.jsx';

export default function Workout() {
  const { userId, workoutId } = useParams();
  const [routine, setRoutine] = useState(null);

  useEffect(() => {
    async function getRoutine() {
      try {
        const res = await fetchRoutineById(userId, workoutId);
        setRoutine(res);
        console.log(res);
      } catch (err) {
        console.error(err);
      }
    }
    getRoutine();
  }, [workoutId]);

  return (
    <div className="workout">
      {routine && (
        <>
          <h2 className="heading heading-secondary">{routine.routineName}</h2>
          <Exercises routine={routine} />
        </>
      )}
    </div>
  );
}
