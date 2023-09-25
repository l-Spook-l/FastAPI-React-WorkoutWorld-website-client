import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Context } from '../..'
import WorkoutItem from '../WorkoutItem/WorkoutItem'
import style from "./WorkoutList.module.css"

const WorkoutList = observer(() => {
  const { workout } = useContext(Context)
  
  return (
    <div className={style.myContainer}>
      WorkoutList
      {workout.workouts.data.map((el) => 
        <WorkoutItem key={el.Workout.id} workout={el.Workout}/>
      )}
    </div>
  )
})

export default WorkoutList