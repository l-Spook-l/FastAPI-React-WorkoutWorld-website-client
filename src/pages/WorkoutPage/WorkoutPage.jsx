import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../..'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { fetchOneWorkout, updateWorkout } from '../../http/workoutAPI'
import { Breadcrumb, Card, Col, Container, Row, Spinner } from 'react-bootstrap'
import { MAIN_ROUTE } from '../../utils/consts'
import ExerciseItem from '../../components/ExerciseItem/ExerciseItem'
import { AiFillEdit, AiOutlineCheck, AiOutlineClose} from "react-icons/ai";
import style from './WorkoutPage.module.css'
import FormCreateExercise from '../../components/Forms/FormCreateExercise/FormCreateExercise'

const WorkoutPage = observer(() => {
  const { user } = useContext(Context)
  const { workout } = useContext(Context)
  const { workout_id }  = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  
  const [editWorkout, setEditWorkout] = useState(false)
  
  const [showFormAddExercise, setShowFormAddExercise] = useState(false)

  const [workoutName, setWorkoutName] = useState('')
  const [workoutDifficulty, setWorkoutDifficulty] = useState('')
  const [workoutDescription, setWorkoutDescription] = useState('')

  useEffect(() => {
    fetchOneWorkout(workout_id)
    .then((data) => {
      workout.setSelectedWorkout(data)
      setWorkoutName(data.data.Workout.name)
      setWorkoutDifficulty(data.data.Workout.difficulty)
      setWorkoutDescription(data.data.Workout.description)
    })
    .finally(() => setLoading(false))
  },[workout_id])

  if (loading) {
    return <Spinner animation="grow" />;
  }

  const updateParamWorkout = () => {
    updateWorkout(workoutName, workout_id, workoutDescription, workoutDifficulty)
    setEditWorkout(false)
  }

  console.log('user', user.isAuth)

  return (
    <Container className={style.workoutContainer}>
      <h1>Workout</h1>
      <Row>
        <Col md={8}>
          <Card className={style.workoutCard}>
            <Card.Body>

              <div className={style.workoutTitle}>
                {editWorkout
                ? <input type="text" value={workoutName} onChange={(el) => setWorkoutName(el.target.value)} />
                : <Card.Title>{workoutName}</Card.Title>
                }
                <button>Start workout</button>
                {user.isAuth && 
                  (user.user.id === workout.selectedWorkout.data.Workout.user_id) && 
                    (editWorkout
                    ?  <button onClick={() => updateParamWorkout()}><AiOutlineCheck/></button>
                    :  <button onClick={() => setEditWorkout(true)}><AiFillEdit/></button>)
                }
              </div>

              {editWorkout
                ? <input type="text" value={workoutDifficulty} onChange={(el) => setWorkoutDifficulty(el.target.value)} />
                : <Card.Subtitle className="mb-2 text-muted">difficulty: {workoutDifficulty}</Card.Subtitle>
              }

              <p>description: </p>
              {editWorkout
                ? <input type="text" value={workoutDescription} onChange={(el) => setWorkoutDescription(el.target.value)} />
                : <Card.Text className={style.workoutCardText}>{workoutDescription}</Card.Text>
              }

              <div className={style.exerciseTitle}>
                <Card.Text>Exercises:</Card.Text>
                {user.isAuth && 
                  (user.user.id === workout.selectedWorkout.data.Workout.user_id) && 
                    (showFormAddExercise 
                      ? <button onClick={() => setShowFormAddExercise(false)}><AiOutlineClose/></button>
                      : <button className={style.addNewExercise} onClick={() => setShowFormAddExercise(true)}>+</button>)
                }
              </div>

              <FormCreateExercise showForm={showFormAddExercise} workoutId={workout_id} />

              <ul className={style.exerciseList}>
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