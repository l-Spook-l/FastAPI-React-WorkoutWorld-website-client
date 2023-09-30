import { makeAutoObservable } from "mobx";

// _ - переменная не может быть изменена
export default class WorkoutStore {
  constructor() {
    this._workouts = []  // масив для получение тренировок
    this._selectedWorkout = []

    this._page = 1
    this._totalCount = 300

    makeAutoObservable(this)
  }

  setWorkouts(workouts) {
    this._workouts = workouts
  }
  setSelectedWorkout(workout) {
    this._selectedWorkout = workout
  }

  setPage(page) {
    this._page = page
  }
  setTotalCount(count) {
    this._totalCount = count
  }

  get workouts() {
    return this._workouts
  }
  get selectedWorkout() {
    return this._selectedWorkout
  }

  get page() {
    return this._page
  }
  get totalCount() {
    return this._totalCount
  }

}
