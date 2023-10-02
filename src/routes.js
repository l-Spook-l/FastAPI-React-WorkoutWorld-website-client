import {MAIN_ROUTE, PROFILE_ROUTE, WORKOUTS_ROUTE, WORKOUT_ROUTE } from './utils/consts'
import MainPage from './pages/MainPage/MainPage'
import WorkoutsPage from './pages/WorkoutsPage/WorkoutsPage'
import ProfilePage from './pages/Profile/Profile'
import WorkoutPage from './pages/WorkoutPage/WorkoutPage'

export const authRoutes = [
  {
    path: PROFILE_ROUTE,
    Component: ProfilePage
  }
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
  // {
  //   path: PROFILE_ROUTE,
  //   Component: ProfilePage,
  // }
]
