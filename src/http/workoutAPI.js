import { $authHost, $host } from "./index"


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
  const response = await $authHost.get('workouts/user-workouts/', {params: {user_id:user_id}})
  console.log('fetchMyCreatedWorkouts response', response)
  return response.data
}

// изменить host - на auhost  ОШИБКА
export const fetchSets = async(user_id, exercise_ids) => {
  const response = await $host.get(`workouts/sets?user_id=${user_id}&exercise_ids=${exercise_ids.join('&exercise_ids=')}`)
  console.log('fetchSets response', response)
  return response.data
}

export const fetchAddUserWorkout = async(user_id) => {
  const response = await $authHost.get(`workouts/get-user-added-workouts/${user_id}`)
  console.log('fetchAddUserWorkout response', response)
  return response.data
}

// изменить host - на auhost
export const createWorkout = async(name, user_id, description, is_public, difficulty, total_time) => {
  const response = await $authHost.post('workouts/create_workout/', {name, user_id, description, is_public, difficulty, total_time})
  console.log('createWorkout response', response)
  return response.data
}

// изменить host - на auhost
export const createExercise = async(name, workout_id, description, number_of_sets, maximum_repetitions, rest_time, video) => {
  const formData = new FormData()
  formData.append('name', name)
  formData.append('workout_id', workout_id)
  formData.append('description', description)
  formData.append('number_of_sets', number_of_sets)
  formData.append('maximum_repetitions', maximum_repetitions)
  formData.append('rest_time', rest_time)
  formData.append('video', video)
  const response = await $authHost.post('workouts/add_video_exercise/', formData, 
  )
  console.log('createExercise response', response)
  return response.data
}

// изменить host - на auhost
export const createSet = async(number_sets, exercise_id, user_id, repetition, weight) => {
  const response = await $authHost.post(`workouts/create_set?number_sets=${number_sets}`, {exercise_id, user_id, repetition, weight})
  console.log('createSet response', response)
  return response.data
}

export const addWorkoutToUser = async(user_id, workout_id) => {
  const response = await $authHost.post(`workouts/add-workout-to-user/${user_id}/${workout_id}`)
  console.log('addWorkoutToUser response', response)
  return response.data
}

// изменить host - на auhost
export const updateWorkout = async(name, workout_id, description, is_public) => {
  const response = await $authHost.patch(`workouts/workout/update/${workout_id}`, {name, description, is_public})
  console.log('updateWorkout response', response)
  return response.data
}

// изменить host - на auhost
export const updateExercise = async(exercise_id, name, description, number_of_sets, maximum_repetitions, rest_time, video, photo) => {
  const response = await $authHost.patch(`workouts/exercise/update/${exercise_id}`, {name, description, number_of_sets, maximum_repetitions, rest_time, video, photo})
  console.log('updateExercise response', response)
  return response.data
}

// изменить host - на auhost
export const updateSet = async(set_id, repetition, weight) => {
  const response = await $authHost.patch(`workouts/set/update/${set_id}`, {repetition, weight})
  console.log('updateSet response', response)
  return response.data
}

export const deleteCreatedWorkout = async(workout_id) => {
  const response = await $authHost.delete(`workouts/delete/created-workout?workout_id=${workout_id}`)
  console.log('deleteCreatedWorkout response', response)
  return response.data
}

export const deleteAddedWorkout = async(workout_id, user_id) => {
  const response = await $authHost.delete(`workouts/delete/added-workout?workout_id=${workout_id}&user_id=${user_id}`)
  console.log('deleteAddedWorkout response', response)
  return response.data
}

export const deleteAddedSets = async(exercise_id, user_id) => {
  const response = await $authHost.delete(`workouts/delete/added-sets?exercise_id=${exercise_id}&user_id=${user_id}`)
  console.log('deleteAddedSets response', response)
  return response.data
}
