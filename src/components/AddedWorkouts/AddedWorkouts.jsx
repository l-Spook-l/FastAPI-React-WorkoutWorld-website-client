import React, { useContext, useEffect, useState } from 'react'
import style from './AddedWorkouts.module.css'
import { Container, Spinner } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import { fetchAddUserWorkout, fetchMyWorkouts } from '../../http/workoutAPI'
import { Context } from '../..'
import WorkoutItem from '../WorkoutItem/WorkoutItem'
import { NavLink } from 'react-router-dom'
import { CREATE_WORKOUT_ROUTE, WORKOUTS_ROUTE } from '../../utils/consts'

const AddedWorkouts = observer(() => {
  const { user } = useContext(Context)
  const { workout } = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAddUserWorkout(user.user.id).then((data) => {
      workout.setAddedWorkouts(data)      
    }).finally(() => setLoading(false))
  }, [])


  if (loading) {
    return <Spinner animation='grow'/>
  }

  return (
    <Container className={style.myContainer}>
      <div className={style.titleAddedWorkout}>
        <h2>Added workouts</h2>
        <NavLink to={WORKOUTS_ROUTE}>Add a new workout</NavLink>
      </div>
      
      {workout.addedWorkouts.workouts.length === 0
        ?
        <span>
          You don't have any workouts yet.
          <NavLink to={WORKOUTS_ROUTE}> Add an existing one</NavLink>.
        </span>
        :
        <div className={style.contentSection}>
        {workout.addedWorkouts.workouts.map((el) => 
          <WorkoutItem key={el.Workout.id} selectedWorkout={el.Workout}/>
        )}
        </div>
      }
      
    </Container>
  )
})

export default AddedWorkouts