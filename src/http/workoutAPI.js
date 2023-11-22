import { $authHost, $host } from "./index"


export const fetchWorkouts = async(skip, difficulty, limit, name) => {
  console.log('fetchWorkouts difficulty', difficulty) 
  // paramsSerializer - чтобы не было [] в строке запроса
  const response = await $host.get('workouts/', {params: {skip:skip, name:name, difficulty:difficulty, limit:limit}, paramsSerializer: {indexes: null}})
  console.log('fetchWorkouts response', response)
  return response.data
}

export const fetchOneWorkout = async(workout_id, user_id) => {
  const response = await $host.get(`workouts/workout/${workout_id}`, {params: {user_id:user_id}})
  console.log('fetchOneWorkout response', response)
  return response.data
}

// изменить host - на auhost
export const fetchMyWorkouts = async(user_id, name, difficulty, skip, limit, is_public) => {
  const response = await $authHost.get('workouts/user-workouts/', 
  {params: {user_id:user_id, name:name, difficulty:difficulty, skip:skip, limit:limit, is_public:is_public}, paramsSerializer: {indexes: null}})
  console.log('fetchMyCreatedWorkouts response', response)
  return response.data
}

// изменить host - на auhost  ОШИБКА
export const fetchSets = async(user_id, exercise_ids) => {
  const response = await $host.get(`workouts/sets`, {params: {user_id:user_id, exercise_ids:exercise_ids}, paramsSerializer: {indexes: null}})
  console.log('fetchSets response', response)
  return response.data
}

export const fetchAddUserWorkout = async(user_id, name, difficulty, skip, limit) => {
  const response = await $authHost.get(`workouts/get-user-added-workouts/${user_id}`, {params : {name:name, difficulty:difficulty, skip:skip, limit:limit}, paramsSerializer: {indexes: null}})
  console.log('fetchAddUserWorkout response', response)
  return response.data
}

export const fetchDifficultiesWorkout = async() => {
  const response = await $host.get(`workouts/workout-difficulties`)
  console.log('fetchDifficultiesWorkout response', response)
  return response.data
}

// изменить host - на auhost
export const createWorkout = async(name, user_id, description, is_public, difficulty, total_time) => {
  const response = await $authHost.post('workouts/create_workout/', {name, user_id, description, is_public, difficulty, total_time})
  console.log('createWorkout response', response)
  return response.data
}

// изменить host - на auhost
export const createExercise = async(name, workout_id, description, number_of_sets, maximum_repetitions, rest_time, video, photos) => {
  
  console.log('createExercise response video', video)
  console.log('createExercise response photos', photos)
  
  const formData = new FormData()
  formData.append('name', name)
  formData.append('workout_id', workout_id)
  formData.append('description', description)
  formData.append('number_of_sets', number_of_sets)
  formData.append('maximum_repetitions', maximum_repetitions)
  formData.append('rest_time', rest_time)
  formData.append('video', video)
  photos && Object.values(photos).forEach((photo) => formData.append('photos', photo))
  const response = await $authHost.post('workouts/create_exercise/', formData, 
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
export const updateWorkout = async(name, workout_id, description, is_public, difficulty) => {
  const response = await $authHost.patch(`workouts/workout/update/${workout_id}`, {name, description, is_public, difficulty})
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

export const deleteExercise = async(exercise_id) => {
  const response = await $authHost.delete(`workouts/delete/exercise?exercise_id=${exercise_id}`)
  console.log('deleteExercise response', response)
  return response.data
}

export const deleteAddedWorkout = async(workout_id, user_id) => {
  const response = await $authHost.delete(`workouts/delete/added-workout?workout_id=${workout_id}&user_id=${user_id}`)
  console.log('deleteAddedWorkout response', response)
  return response.data
}

export const deleteSets = async(exercise_id, user_id) => {
  const response = await $authHost.delete(`workouts/delete/sets?exercise_id=${exercise_id}&user_id=${user_id}`)
  console.log('deleteAddedSets response', response)
  return response.data
}

export const deletePhotos = async(exercise_id, photo_ids) => {
  const response = await $host.delete(`workouts/delete/photo`, {params: {exercise_id:exercise_id, photo_ids:photo_ids}, paramsSerializer: {indexes: null}})
  console.log('deletePhotos response', response)
  return response.data
}
