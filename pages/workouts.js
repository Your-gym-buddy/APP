import { useSession } from 'next-auth/client';
import { useState } from 'react';
import axios from 'axios';

const Workouts = () => {
  const [session] = useSession();
  const [workouts, setWorkouts] = useState([]);
  const [exercise, setExercise] = useState({ name: '', sets: 0, reps: 0 });

  const addWorkout = async () => {
    if (session) {
      const response = await axios.post('/api/workouts', { exercises: [exercise] });
      setWorkouts([...workouts, response.data]);
    }
  };

  return (
    <div>
      <h1>Log Workout</h1>
      <input
        type="text"
        placeholder="Exercise Name"
        value={exercise.name}
        onChange={(e) => setExercise({ ...exercise, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Sets"
        value={exercise.sets}
        onChange={(e) => setExercise({ ...exercise, sets: parseInt(e.target.value) })}
      />
      <input
        type="number"
        placeholder="Reps"
        value={exercise.reps}
        onChange={(e) => setExercise({ ...exercise, reps: parseInt(e.target.value) })}
      />
      <button onClick={addWorkout}>Add Workout</button>
      <ul>
        {workouts.map((workout) => (
          <li key={workout.id}>{workout.exercises[0].name} - {workout.exercises[0].sets} sets of {workout.exercises[0].reps} reps</li>
        ))}
      </ul>
    </div>
  );
};

export default Workouts;
