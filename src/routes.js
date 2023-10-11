import {ACTIVE_WORKOUT_ROUTE, CREATE_WORKOUT_ROUTE, MAIN_ROUTE, PROFILE_ROUTE, WORKOUTS_ROUTE, WORKOUT_ROUTE } from './utils/consts'
import MainPage from './pages/MainPage/MainPage'
import WorkoutsPage from './pages/WorkoutsPage/WorkoutsPage'
import ProfilePage from './pages/Profile/Profile'
import WorkoutPage from './pages/WorkoutPage/WorkoutPage'
import CreateWorkoutPage from './pages/CreateWorkoutPage/CreateWorkoutPage'
import ActiveWorkoutPage from './pages/ActiveWorkoutPage/ActiveWorkoutPage'

export const authRoutes = [
  {
    path: PROFILE_ROUTE,
    Component: ProfilePage
  },
  {
    path: CREATE_WORKOUT_ROUTE,
    Component: CreateWorkoutPage
  },
  {
    path: ACTIVE_WORKOUT_ROUTE + "/:workout_id",
    Component: ActiveWorkoutPage,
  },
]

export const publicRoutes = [
  {
    path: MAIN_ROUTE,
    Component: MainPage,
  },
  {
    path: WORKOUTS_ROUTE,
    Component: WorkoutsPage,
  },
  {
    path: WORKOUT_ROUTE + "/:workout_id",
    Component: WorkoutPage,
  },
]
