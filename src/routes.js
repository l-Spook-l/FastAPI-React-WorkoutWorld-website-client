import {ACTIVE_WORKOUT_ROUTE, CREATE_WORKOUT_ROUTE, MAIN_ROUTE, PROFILE_ROUTE, SHOP_ROUTE, WORKOUTS_ROUTE, 
  WORKOUT_ROUTE, RESET_USER_PASSWORD_ROUTE, GROUP_WORKOUTS_ROUTE, PAGE_404_ROUTE, ADMIN_PANEL_ROUTE } from './utils/consts'
import MainPage from './pages/MainPage/MainPage'
import WorkoutsPage from './pages/WorkoutsPage/WorkoutsPage'
import ProfilePage from './pages/Profile/Profile'
import WorkoutPage from './pages/WorkoutPage/WorkoutPage'
import CreateWorkoutPage from './pages/CreateWorkoutPage/CreateWorkoutPage'
import ActiveWorkoutPage from './pages/ActiveWorkoutPage/ActiveWorkoutPage'
import Shop from './pages/Shop/Shop'
import ResetUserPassword from './pages/ResetUserPassword/ResetUserPassword'
import GroupWorkouts from './pages/GroupWorkouts/GroupWorkouts'
import Page404 from './pages/Page404/Page404'
import AdminPanelPage from './pages/AdminPanelPage/AdminPanelPage'

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
  {
    path: ADMIN_PANEL_ROUTE,
    Component: AdminPanelPage,
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
  {
    path: SHOP_ROUTE,
    Component: Shop,
  },
  {
    path: RESET_USER_PASSWORD_ROUTE + "/:token",
    Component: ResetUserPassword
  },
  {
    path: GROUP_WORKOUTS_ROUTE,
    Component: GroupWorkouts
  },
  {
    path: PAGE_404_ROUTE,
    Component: Page404
  }
]
