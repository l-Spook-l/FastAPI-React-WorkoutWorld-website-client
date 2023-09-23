import {MAIN_ROUTE, PROFILE_ROUTE, WORKOUTS_ROUTE } from './utils/consts'
import MainPage from './pages/MainPage/MainPage'
import WorkoutsPage from './pages/WorkoutsPage/WorkoutsPage'
import ProfilePage from './pages/Profile/Profile'


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
    path: PROFILE_ROUTE,
    Component: ProfilePage,
  }
]
