import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../..'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchOneWorkout } from '../../http/workoutAPI'
import { Breadcrumb, Container, Spinner } from 'react-bootstrap'
import { MAIN_ROUTE } from '../../utils/consts'
import ExerciseItem from '../../components/ExerciseItem/ExerciseItem'

const WorkoutPage = observer(() => {
  const { workout } = useContext(Context)
  const { workout_id }  = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchOneWorkout(workout_id)
    .then((data) => workout.setSelectedWorkout(data))
    .finally(() => setLoading(false))
  },[workout_id])

  if (loading) {
    return <Spinner animation="grow" />;
  }

  return (
    <Container>
      WorkoutPage
      <Breadcrumb>
        <Breadcrumb.Item onClick={() => navigate(MAIN_ROUTE)}>
            Home
          </Breadcrumb.Item>
      </Breadcrumb>
      <hr/>
      {console.log('WorkoutPage', workout.selectedWorkout.data.Workout.exercise[0].timer)}
      <p>{workout.selectedWorkout.data.Workout.id}</p>
      <p>{workout.selectedWorkout.data.Workout.name}</p>
      <p>{workout.selectedWorkout.data.Workout.description}</p>
      exercise
      <div>
        {workout.selectedWorkout.data.Workout.exercise.map((exercise) => 
          <div key={exercise.id}>
            <ExerciseItem
              key={exercise.id}
              exerciseId={exercise.id}
              description={exercise.description}
              numberOfSets={exercise.number_of_sets}
              maximumRepetitions={exercise.maximum_repetitions}
              restTime={exercise.rest_time}
              weight={exercise.weight}
              timer={exercise.timer}
            />
          </div>
        )}
      </div>
      
    </Container>
  )
})

export default WorkoutPage