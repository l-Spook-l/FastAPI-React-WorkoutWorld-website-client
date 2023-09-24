import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Context } from '../..'

const WorkoutItem = observer(({ workout }) => {
  const { user } = useContext(Context)

  const navigate = useNavigate()

  // useEffect(() => {

  // },[])

  return (
    <div>
      WorkoutItem
      <Card>
        <p>{workout.id}</p>
        <p>{workout.name}</p>
        <p>{workout.description}</p>
        <p>{workout.difficulty}</p>
      </Card>
    </div>
  )
})

export default WorkoutItem