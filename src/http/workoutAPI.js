import { $host } from "./index"


export const fetchWorkouts = async() => {
  const response = await $host.get('workouts/')
  console.log('fetchWorkouts response', response)
  return response.data
}

export const fetchOneWorkout = async(workout_id) => {
  const response = await $host.get(`workouts/workout/${workout_id}`)
  console.log('fetchOneWorkout response', response)
  return response.data
}