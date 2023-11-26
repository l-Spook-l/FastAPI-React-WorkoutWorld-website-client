import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Context } from '../..'
import WorkoutItem from '../WorkoutItem/WorkoutItem'
import style from "./WorkoutList.module.css"
import { Container } from 'react-bootstrap'

const WorkoutList = observer(() => {
  const { workout } = useContext(Context)
  
  return (
    <Container className={style.myContainer}>
      {workout.workouts.data.map((el) => 
        <WorkoutItem key={el.Workout.id} selectedWorkout={el.Workout}/>
      )}
    </Container>
  )
})

export default WorkoutList