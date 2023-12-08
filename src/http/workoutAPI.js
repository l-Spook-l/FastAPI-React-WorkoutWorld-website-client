import { $authHost, $host } from "./index"


export const fetchWorkouts = async(skip, difficulty, limit, name) => {
  const response = await $host.get('workouts/', {params: {skip:skip, name:name, difficulty:difficulty, limit:limit}, paramsSerializer: {indexes: null}})
  return response.data
}

export const fetchOneWorkout = async(workout_id, user_id) => {
  const response = await $host.get(`workouts/workout/${workout_id}`, {params: {user_id:user_id}})
  return response.data
}

export const fetchActiveWorkout = async(workout_id, user_id) => {
  const response = await $authHost.get(`workouts/active-workout`, {params: {workout_id:workout_id, user_id:user_id}})
  return response.data
}

export const fetchMyWorkouts = async(user_id, name, difficulty, skip, limit, is_public) => {
  const response = await $authHost.get('workouts/user-workouts/', 
  {params: {user_id:user_id, name:name, difficulty:difficulty, skip:skip, limit:limit, is_public:is_public}, paramsSerializer: {indexes: null}})
  return response.data
}

export const fetchSets = async(user_id, exercise_ids) => {
  const response = await $authHost.get(`workouts/sets`, {params: {user_id:user_id, exercise_ids:exercise_ids}, paramsSerializer: {indexes: null}})
  return response.data
}

export const fetchAddUserWorkout = async(user_id, name, difficulty, skip, limit) => {
  const response = await $authHost.get(`workouts/get-user-added-workouts/${user_id}`, {params : {name:name, difficulty:difficulty, skip:skip, limit:limit}, paramsSerializer: {indexes: null}})
  return response.data
}

export const fetchDifficultiesWorkout = async() => {
  const response = await $host.get(`workouts/workout-difficulties`)
  return response.data
}

export const createWorkout = async(name, user_id, description, is_public, difficulty, total_time) => {
  const response = await $authHost.post('workouts/create_workout/', {name, user_id, description, is_public, difficulty, total_time})
  return response.data
}

export const createExercise = async(name, workout_id, description, number_of_sets, maximum_repetitions, rest_time, video, photos) => {
  const formData = new FormData()
  formData.append('name', name)
  formData.append('workout_id', workout_id)
  formData.append('description', description)
  formData.append('number_of_sets', number_of_sets)
  formData.append('maximum_repetitions', maximum_repetitions)
  formData.append('rest_time', rest_time)
  formData.append('video', video)
  photos && Object.values(photos).forEach((photo) => formData.append('photos', photo))
  const response = await $authHost.post('workouts/create_exercise/', formData, )
  return response.data
}

export const createSet = async(number_sets, exercise_id, user_id, repetition, weight) => {
  const response = await $authHost.post(`workouts/create_set?number_sets=${number_sets}`, {exercise_id, user_id, repetition, weight})
  return response.data
}

export const addWorkoutToUser = async(user_id, workout_id) => {
  const response = await $authHost.post(`workouts/add-workout-to-user/${user_id}/${workout_id}`)
  return response.data
}

export const addNewPhotos = async(exercise_id, exercise_name, photos) => {
  const formData = new FormData()
  photos && Object.values(photos).forEach((photo) => formData.append('photos', photo))
  const response = await $authHost.post(`workouts/add-new-photos?exercise_id=${exercise_id}&exercise_name=${exercise_name}`, formData)
  return response.data
}

export const updateWorkout = async(name, workout_id, description, is_public, difficulty) => {
  const response = await $authHost.patch(`workouts/workout/update/${workout_id}`, {name, description, is_public, difficulty})
  return response.data
}

export const updateExercise = async(exercise_id, name, description, number_of_sets, maximum_repetitions, rest_time, video, photo) => {
  const response = await $authHost.patch(`workouts/exercise/update/${exercise_id}`, {name, description, number_of_sets, maximum_repetitions, rest_time, video, photo})
  return response.data
}

export const updateSet = async(set_id, repetition, weight) => {
  const response = await $authHost.patch(`workouts/set/update/${set_id}`, {repetition, weight})
  return response.data
}

export const deleteCreatedWorkout = async(workout_id) => {
  const response = await $authHost.delete(`workouts/delete/created-workout?workout_id=${workout_id}`)
  return response.data
}

export const deleteExercise = async(exercise_id) => {
  const response = await $authHost.delete(`workouts/delete/exercise?exercise_id=${exercise_id}`)
  return response.data
}

export const deleteAddedWorkout = async(workout_id, user_id) => {
  const response = await $authHost.delete(`workouts/delete/added-workout?workout_id=${workout_id}&user_id=${user_id}`)
  return response.data
}

export const deleteSets = async(exercise_id, user_id) => {
  const response = await $authHost.delete(`workouts/delete/sets?exercise_id=${exercise_id}&user_id=${user_id}`)
  return response.data
}

export const deletePhotos = async(exercise_id, photo_ids) => {
  const response = await $authHost.delete(`workouts/delete/photo`, {params: {exercise_id:exercise_id, photo_ids:photo_ids}, paramsSerializer: {indexes: null}})
  return response.data
}
