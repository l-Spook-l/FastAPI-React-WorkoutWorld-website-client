import React, { useContext, useEffect, useState } from 'react'
import style from './UserWorkouts.module.css'
import { Container, Spinner } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import { fetchMyWorkouts } from '../../http/workoutAPI'
import { Context } from '../..'
import WorkoutItem from '../WorkoutItem/WorkoutItem'

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
      {workout.userWorkouts.data.map((el) => 
        <WorkoutItem key={el.Workout.id} workout={el.Workout}/>
      )}
    </Container>
  )
})

export default UserWorkouts