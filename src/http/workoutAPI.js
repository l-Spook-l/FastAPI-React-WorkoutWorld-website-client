import { $host } from "./index"


export const fetchWorkouts = async(skip) => {
  const response = await $host.get('workouts/', {params: {skip:skip}})
  console.log('fetchWorkouts response', response)
  return response.data
}

export const fetchOneWorkout = async(workout_id) => {
  const response = await $host.get(`workouts/workout/${workout_id}`)
  console.log('fetchOneWorkout response', response)
  return response.data
}

// изменить host - на auhost
export const fetchMyWorkouts = async(user_id) => {
  const response = await $host.get('workouts/user-workouts/', {params: {user_id:user_id}})
  console.log('fetchMyCreatedWorkouts response', response)
  return response.data
}

// изменить host - на auhost  ОШИБКА
export const fetchSets = async(user_id, exercise_ids) => {
  const response = await $host.get(`workouts/sets?user_id=${user_id}&exercise_ids=${exercise_ids.join('&exercise_ids=')}`)
  console.log('fetchSets response', response)
  return response.data
}

// export const fetchAddUserWorkout = async(user_id) => {
//   const response = await $host.get(`workouts/get-added-user-workouts/${user_id}`)
//   console.log('fetchAddUserWorkout response', response)
//   return response.data
// }

// изменить host - на auhost
export const createWorkout = async(name, user_id, description, is_public, difficulty, total_time) => {
  const response = await $host.post('workouts/create_workout/', {name, user_id, description, is_public, difficulty, total_time})
  console.log('createWorkout response', response)
  return response.data
}

// изменить host - на auhost
export const createExercise = async(name, workout_id, description, number_of_sets, maximum_repetitions, rest_time, video, photo) => {
  const response = await $host.post('workouts/create_exercise/', {name, workout_id, description, number_of_sets, maximum_repetitions, rest_time, video, photo})
  console.log('createExercise response', response)
  return response.data
}

// изменить host - на auhost
export const createSet = async(number_sets, exercise_id, user_id, repetition, weight) => {
  const response = await $host.post(`workouts/create_set?number_sets=${number_sets}`, {exercise_id, user_id, repetition, weight})
  console.log('createSet response', response)
  return response.data
}

export const addWorkoutToUser = async(user_id, workout_id) => {
  const response = await $host.post(`workouts/add-workout-to-user/${user_id}/${workout_id}`)
  console.log('addWorkoutToUser response', response)
  return response.data
}

// изменить host - на auhost
export const updateWorkout = async(name, workout_id, description, difficulty) => {
  const response = await $host.patch(`workouts/workout/update/${workout_id}`, {name, description, difficulty})
  console.log('updateWorkout response', response)
  return response.data
}

// изменить host - на auhost
export const updateExercise = async(exercise_id, name, description, number_of_sets, maximum_repetitions, rest_time, video, photo) => {
  const response = await $host.patch(`workouts/exercise/update/${exercise_id}`, {name, description, number_of_sets, maximum_repetitions, rest_time, video, photo})
  console.log('updateExercise response', response)
  return response.data
}

// изменить host - на auhost
export const updateSet = async(set_id, count, weight) => {
  const response = await $host.patch(`workouts/set/update/${set_id}`, {count, weight})
  console.log('updateSet response', response)
  return response.data
}

