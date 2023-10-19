import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../..'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { fetchOneWorkout, updateWorkout } from '../../http/workoutAPI'
import { Breadcrumb, Card, Col, Container, Row, Spinner } from 'react-bootstrap'
import { ACTIVE_WORKOUT_ROUTE, MAIN_ROUTE } from '../../utils/consts'
import ExerciseInfo from '../../components/ExerciseInfo/ExerciseInfo'
import { AiFillEdit, AiOutlineCheck, AiOutlineClose} from "react-icons/ai";
import style from './WorkoutPage.module.css'
import FormCreateExercise from '../../components/Forms/FormCreateExercise/FormCreateExercise'
import DeleteConfirmationModal from '../../components/Modals/DeleteConfirmationModal/DeleteConfirmationModal'

const WorkoutPage = observer(() => {
  const { user } = useContext(Context)
  const { workout } = useContext(Context)
  const { workout_id }  = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  
  const [editWorkout, setEditWorkout] = useState(false)
  
  const [showFormAddExercise, setShowFormAddExercise] = useState(false)

  const [workoutName, setWorkoutName] = useState('')
  //const [workoutDifficulty, setWorkoutDifficulty] = useState('')  // пока убрана возвожность (перевести)
  const [workoutIsPublic, setWorkoutIsPublic] = useState('')
  const [workoutDescription, setWorkoutDescription] = useState('')
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchOneWorkout(workout_id)
    .then((data) => {
      workout.setSelectedWorkout(data)
      setWorkoutName(data.data.Workout.name)
      setWorkoutIsPublic(data.data.Workout.is_public)
      //setWorkoutDifficulty(data.data.Workout.difficulty)
      setWorkoutDescription(data.data.Workout.description)
    })
    .finally(() => setLoading(false))
  },[workout_id])

  if (loading) {
    return <Spinner animation="grow" />;
  }

  const editParamWorkout = () => {
    workout.setEditWorkout(true)
    setEditWorkout(true)
  }

  const updateParamWorkout = () => {
    updateWorkout(workoutName, workout_id, workoutDescription, workoutIsPublic)
    setEditWorkout(false)
    workout.setEditWorkout(false)
  }

  const closeParamWorkout = () => {
    setEditWorkout(false)
    workout.setEditWorkout(false)
  }

  const editStatusWorkout = () => {
    setShowModal(true);
  }

  const closeModal = () => {
    setShowModal(false);
  };

  const changeStatusWorkout = () => {
    setWorkoutIsPublic(!workoutIsPublic)
    setShowModal(false);
  }

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
                <NavLink to={`${ACTIVE_WORKOUT_ROUTE}/${workout_id}`}>Start workout</NavLink>
                {user.isAuth && 
                  (user.user.id === workout.selectedWorkout.data.Workout.user_id) && 
                    (editWorkout
                      ?  
                      <div>
                        <button onClick={() => updateParamWorkout()}><AiOutlineCheck/></button>
                        <button onClick={() => closeParamWorkout()}><AiOutlineClose/></button>
                      </div>
                      :  <button onClick={() => editParamWorkout()}><AiFillEdit/></button>)
                }
              </div>

              {/* {editWorkout
                ? <input type="text" value={workoutDifficulty} onChange={(el) => setWorkoutDifficulty(el.target.value)} />
                : <Card.Subtitle className="mb-2 text-muted">difficulty: {workoutDifficulty}</Card.Subtitle>
              } */}

              {editWorkout
                ? <input type="checkbox" checked={workoutIsPublic} onChange={(el) => editStatusWorkout()} />
                : <Card.Subtitle className="mb-2">Status: {workoutIsPublic ? 'Public' : 'Non-public'}</Card.Subtitle>
              }

              <p>description: </p>
              {editWorkout
                ? <input type="text" value={workoutDescription} onChange={(el) => setWorkoutDescription(el.target.value)} />
                : <Card.Text className={style.workoutCardText}>{workoutDescription}</Card.Text>
              }

              <div className={style.exerciseTitle}>
                <Card.Text>Exercises:</Card.Text>
                {workout.editWorkout && 
                  (showFormAddExercise 
                    ? <button onClick={() => setShowFormAddExercise(false)}><AiOutlineClose/></button>
                    : <button className={style.addNewExercise} onClick={() => setShowFormAddExercise(true)}>+</button>)
                }
              </div>

              <FormCreateExercise showForm={showFormAddExercise} workoutId={workout_id} />

              <ul className={style.exerciseList}>
                {workout.selectedWorkout.data.Workout.exercise.map((exercise) => 
                  <div key={exercise.id}>
                    <ExerciseInfo
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
      <DeleteConfirmationModal show={showModal} onClose={closeModal} changeStatus={changeStatusWorkout} />
    </Container>
  )
})

export default WorkoutPage