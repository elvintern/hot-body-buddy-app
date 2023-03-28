import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  fetchRoutineById,
  updateUserPerformance,
  updateTotalCount,
} from '../utils/index.js';
import Exercise from '../components/Exercise.jsx';
import WorkoutResult from '../components/WorkoutResult.jsx';

export default function Workout() {
  const { userId, workoutId } = useParams();
  const [routine, setRoutine] = useState(null);
  const [performance, setPerformance] = useState([]);
  const [isFinished, setisFinished] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function getRoutine() {
      try {
        const res = await fetchRoutineById(userId, workoutId);
        setRoutine(res);
      } catch (err) {
        console.error(err);
      }
    }
    getRoutine();
  }, [workoutId]);

  const finishWorkout = () => {
    setisFinished(true);
  };

  const finishReview = async () => {
    updateUserPerformance(userId, routine._id, performance);
    updateTotalCount(userId);
    navigate(`/profile/${userId}`);
  };

  return (
    <div className="workout">
      {isFinished ? (
        <>
          <WorkoutResult routine={routine} performance={performance} />
          <button onClick={finishReview} className="btn">
            End Review
          </button>
        </>
      ) : (
        routine && (
          <>
            <h2 className="heading heading-secondary">{routine.routineName}</h2>
            {routine.exercises.map((exercise, index) => {
              return (
                <div key={index} className="workout-form">
                  <ul className="exercises">
                    <Exercise
                      exercise={exercise}
                      performance={performance}
                      setPerformance={setPerformance}
                    />
                  </ul>
                </div>
              );
            })}

            <button onClick={finishWorkout} className="btn btn--workout">
              Finish Workout
            </button>
          </>
        )
      )}
    </div>
  );
}
