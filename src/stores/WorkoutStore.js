import { makeAutoObservable } from "mobx";

// _ - переменная не может быть изменена
export default class WorkoutStore {
  constructor() {
    this._workouts = []  // масив для получение тренировок
    this._selectedWorkout = []
    this._userWorkouts = []
    this._editWorkout = false

    this._page = 1
    this._totalCount = 0
    this._skip = 0
    this._limit = 0

    makeAutoObservable(this)
  }

  setWorkouts(workouts) {
    this._workouts = workouts
  }
  setSelectedWorkout(workout) {
    this._selectedWorkout = workout
  }
  setUserWorkouts(userWorkouts) {
    this._userWorkouts = userWorkouts
  }
  setEditWorkout(bool) {
    this._editWorkout = bool
  }
  setPage(page) {
    this._page = page
  }
  setTotalCount(count) {
    this._totalCount = count
  }
  setSkip(skip) {
    this._skip = skip
  }
  setLimit(limit) {
    this._limit = limit
  }

  get workouts() {
    return this._workouts
  }
  get selectedWorkout() {
    return this._selectedWorkout
  }
  get userWorkouts() {
    return this._userWorkouts
  }
  get editWorkout() {
    return this._editWorkout
  }
  get page() {
    return this._page
  }
  get totalCount() {
    return this._totalCount
  }
  get skip() {
    return this._skip
  }
  get limit() {
    return this._limit
  }

}
