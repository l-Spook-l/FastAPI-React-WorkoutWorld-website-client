import React, { useContext, useEffect, useState } from 'react'
import style from './UserWorkouts.module.css'
import { Container, Spinner } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import { fetchMyWorkouts } from '../../http/workoutAPI'
import { Context } from '../..'
import WorkoutItem from '../WorkoutItem/WorkoutItem'
import { NavLink } from 'react-router-dom'
import { CREATE_WORKOUT_ROUTE, WORKOUTS_ROUTE } from '../../utils/consts'

const UserWorkouts = observer(() => {
  const { user } = useContext(Context)
  const { workout } = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMyWorkouts(user.user.id).then((data) => {
      workout.setUserWorkouts(data)
    }).finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <Spinner animation='grow'/>
  }

  return (
    <Container className={style.myContainer}>
      <h2>My workouts</h2>
      {workout.userWorkouts.data.length === 0
        ?
        <span>
          You don't have any workouts yet.
          <NavLink to={CREATE_WORKOUT_ROUTE}>Create your own </NavLink>
            or 
          <NavLink to={WORKOUTS_ROUTE}> add an existing one</NavLink>.
        </span>
        :
        <div className={style.contentSection}>
        {workout.userWorkouts.data.map((el) => 
          <WorkoutItem key={el.Workout.id} workout={el.Workout}/>
        )}
        </div>
      }
      
    </Container>
  )
})

export default UserWorkouts