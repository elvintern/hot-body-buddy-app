import React from 'react';
import { useParams } from 'react-router-dom';

export default function Workout() {
  const { workoutId } = useParams();

  return <div>Workout {workoutId}</div>;
}
