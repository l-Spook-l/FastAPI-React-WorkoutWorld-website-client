import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Breadcrumb, Container, Spinner } from 'react-bootstrap'
import { Context } from '../..'
import { fetchWorkouts } from '../../http/workoutAPI'
import WorkoutList from '../../components/WorkoutList/WorkoutList'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { CREATE_WORKOUT_ROUTE, MAIN_ROUTE } from '../../utils/consts'
import style from './WorkoutsPage.module.css'
import MyPagination from '../../components/MyPagination/MyPagination'


const WorkoutsPage = observer(() => {
  const { user } = useContext(Context)
  const { workout } = useContext(Context)
  const { slug } = useParams()

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    workout.setPage(1)
  }, [])

  useEffect(() => {
    fetchWorkouts(workout.skip).then((data) => {
      workout.setWorkouts(data)
      workout.setTotalCount(data.total_count)
      workout.setSkip(data.skip)
      workout.setLimit(data.limit)
    }).finally(() => setLoading(false))
  }, [workout.page])
  
  if (loading) {
    return <Spinner animation='grow'/>
  }

  console.log('WorkoutsPage workout', workout)

  return (
    <Container fluid className={style.container}>
      <div className={style.header}>
        <Breadcrumb className={style.myBreadcrumb}>
          <Breadcrumb.Item onClick={() => navigate(MAIN_ROUTE)}>
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Workouts</Breadcrumb.Item>
        </Breadcrumb>
        {user.isAuth && <NavLink to={CREATE_WORKOUT_ROUTE} className={style.createWorkoutButton}>Create workout</NavLink> }
      </div>
      <hr />
      <div className={style.workoutSections}>
        <WorkoutList/>
        <MyPagination/>
      </div>
    </Container>
  )
})


export default WorkoutsPage