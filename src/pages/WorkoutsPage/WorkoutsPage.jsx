import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Container, Spinner } from 'react-bootstrap'
import { Context } from '../..'
import { fetchWorkouts } from '../../http/workoutAPI'
import WorkoutList from '../../components/WorkoutList/WorkoutList'
import { useParams } from 'react-router-dom'


const WorkoutsPage = observer(() => {
  const { user } = useContext(Context)
  const { workout } = useContext(Context)
  const { slug } = useParams()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    //window.scrollTo(0, 0)
    fetchWorkouts().then((data) => {
      workout.setWorkouts(data)
    }).finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <Spinner animation='grow'/>
  }

  return (
    <Container>
      {/* {console.log('ewew', workout)}
      {console.log('ewew2', workout.workouts)}
      {console.log('ewew3', workout.workouts.data)} */}
      WorkoutsPage
      <WorkoutList/>
    </Container>
  )
})


export default WorkoutsPage