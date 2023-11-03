import { makeAutoObservable } from "mobx";

// _ - переменная не может быть изменена
export default class WorkoutStore {
  constructor() {
    this._workouts = []  // масив для получение тренировок
    this._selectedWorkout = []
    this._userWorkouts = []
    this._addedWorkouts = []
    
    this._difficulties = []
    this._selectedDifficulty = []

    this._searchWorkouts = []  // массив для поиска тренировок по названию
    this._selectedSearchWorkouts = ''

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
  setAddedWorkouts(addedWorkouts) {
    this._addedWorkouts = addedWorkouts
  }
  
  setDifficulties(difficulties) {
    this._difficulties = difficulties
  }
  setSelectedDifficulty(difficulty) {
    this._selectedDifficulty = difficulty
  }

  setSearchWorkouts(workouts){
    this._searchWorkouts = workouts
  }
  setSelectedSearchWorkouts(workout) {
    this._selectedSearchWorkouts = workout
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
  get addedWorkouts() {
    return this._addedWorkouts
  }

  get difficulties() {
    return this._difficulties
  }
  get selectedDifficulty() {
    return this.selectedDifficulty
  }
  
  get searchWorkouts() {
    return this._searchWorkouts
  }
  get selectedSearchWorkouts() {
    return this._selectedSearchWorkouts
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
