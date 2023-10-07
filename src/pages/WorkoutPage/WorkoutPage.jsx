import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../..'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchOneWorkout } from '../../http/workoutAPI'
import { Breadcrumb, Card, Col, Container, Row, Spinner } from 'react-bootstrap'
import { MAIN_ROUTE } from '../../utils/consts'
import ExerciseItem from '../../components/ExerciseItem/ExerciseItem'
import style from './WorkoutPage.module.css'

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
    // <Container>
    //   <Breadcrumb>
    //     <Breadcrumb.Item onClick={() => navigate(MAIN_ROUTE)}>
    //         Home
    //       </Breadcrumb.Item>
    //   </Breadcrumb>
    //   <hr/>
    //   <p>name {workout.selectedWorkout.data.Workout.name}</p>
    //   <p>description {workout.selectedWorkout.data.Workout.description}</p>
    //   <p>difficulty {workout.selectedWorkout.data.Workout.difficulty}</p>
    //   <p>total_time {workout.selectedWorkout.data.Workout.total_time}</p>
    //   exercise
    //   <div>
    //     {workout.selectedWorkout.data.Workout.exercise.map((exercise) => 
    //       <div key={exercise.id}>
    //         <ExerciseItem
    //           key={exercise.id}
    //           exerciseId={exercise.id}
    //           name={exercise.name}
    //           description={exercise.description}
    //           numberOfSets={exercise.number_of_sets}
    //           maximumRepetitions={exercise.maximum_repetitions}
    //           restTime={exercise.rest_time}
    //         />
    //       </div>
    //     )}
    //   </div>
      
    // </Container>
    <Container className={style.workoutContainer}>
    <h1>Workout</h1>
    <Row>
      <Col md={8}>
        <Card className={style.workoutCard}>
          <Card.Body>
            <div className={style.workoutTitle}>
              <Card.Title>{workout.selectedWorkout.data.Workout.name}</Card.Title>
              <button>Start workout</button>
            </div>
            <Card.Subtitle className="mb-2 text-muted">{workout.selectedWorkout.data.Workout.difficulty}</Card.Subtitle>
            <Card.Text className={style.workoutCardText}>{workout.selectedWorkout.data.Workout.description}</Card.Text>
            <Card.Text>Exercises:</Card.Text>
            <ul className={style.exerciseList}>
              {/* {workout.exercises.map(exercise => (
                <li key={exercise.id} className={style.exerciseListItem}>
                  {exercise.name} - {exercise.difficulty}
                </li>
              ))} */}
              {workout.selectedWorkout.data.Workout.exercise.map((exercise) => 
                <div key={exercise.id}>
                  <ExerciseItem
                    key={exercise.id}
                    exerciseId={exercise.id}
                    name={exercise.name}
                    description={exercise.description}
                    numberOfSets={exercise.number_of_sets}
                    maximumRepetitions={exercise.maximum_repetitions}
                    restTime={exercise.rest_time}
                  />
                </div>
              )}
            </ul>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
  )
})

export default WorkoutPage