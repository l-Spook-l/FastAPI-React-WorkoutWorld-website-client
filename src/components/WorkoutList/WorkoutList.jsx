import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Context } from '../..'
import WorkoutItem from '../WorkoutItem/WorkoutItem'

const WorkoutList = observer(() => {
  const { workout } = useContext(Context)
  
  return (
    <div>
      WorkoutList
      {workout.workouts.data.map((el) => 
        // console.log('WorkoutList el', el.Workout.name )
        <WorkoutItem key={el.Workout.id} workout={el.Workout}/>
      )}
    </div>
  )
})

export default WorkoutList