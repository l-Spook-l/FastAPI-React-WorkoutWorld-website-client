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

export const fetchSets = async(exercise, user) => {
  const response = await $host.get(`workouts/sets/${exercise}/${user}`)
  console.log('fetchSets response', response)
  return response.data
}

// изменить host - на auhost
export const createWorkout = async(name, user_id, description, difficulty) => {
  const response = await $host.post(`workouts/create_workout/`, {name, user_id, description, difficulty})
  console.log('fetchSets response', response)
  return response.data
}

export const createExercise = async(workout_id, description, number_of_sets, maximum_repetitions, rest_time, weight, timer) => {
  const response = await $host.post(`workouts/create_exercise/`, {workout_id, description, number_of_sets, maximum_repetitions, rest_time, weight, timer})
  console.log('fetchSets response', response)
  return response.data
}

export const createSet = async(exercise_id, user_id, count) => {
  const response = await $host.post(`workouts/create_set/`, {exercise_id, user_id, count})
  console.log('fetchSets response', response)
  return response.data
}