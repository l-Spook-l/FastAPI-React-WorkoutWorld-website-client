import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { addWorkoutToUser, createSet, deleteSets, deleteAddedWorkout, deleteCreatedWorkout, updateWorkout } from '../../../http/workoutAPI'
import { Card, Col, Container, Row, Spinner } from 'react-bootstrap'
import ExerciseInfo from '../../../components/ExerciseInfo/ExerciseInfo'
import { AiFillEdit, AiOutlineCheck, AiOutlineClose} from "react-icons/ai";
import style from './AdminGetOneWorkout.module.css'
import FormCreateExercise from '../../../components/Forms/FormCreateExercise/FormCreateExercise'
import ChangeStatusModal from '../../../components/Modals/ChangeStatusModal/ChangeStatusModal'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { RiDeleteBin2Line } from 'react-icons/ri'
import DeleteModal from '../../../components/Modals/DeleteModal/DeleteModal'
import SaveChangesWorkoutModal from '../../../components/Modals/SaveChangesWorkoutModal/SaveChangesWorkoutModal'
import CustomToggleDescription from '../../../components/CustomToggles/CustomToggleDescription/CustomToggleDescription'
import { Context } from '../../..'
import { adminFetchWorkout } from '../../../http/userAPI'

const AdminGetOneWorkout = observer((workout_id) => {
  const { user } = useContext(Context)
  const { workout } = useContext(Context)

  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  
  const [editWorkout, setEditWorkout] = useState(false)
  
  const [showFormAddExercise, setShowFormAddExercise] = useState(false)

  const [selectedWorkout, setWorkout] = useState('')
  const [workoutName, setWorkoutName] = useState('')
  const [workoutDifficulty, setWorkoutDifficulty] = useState('')
  const [workoutIsPublic, setWorkoutIsPublic] = useState('')
  const [workoutDescription, setWorkoutDescription] = useState('')

  const [showModalChangeStatus, setShowModalChangeStatus] = useState(false)
  const [showModalDeleteWorkout, setShowModalDeleteWorkout] = useState(false)
  const [showModalSaveChanges, setShowModalSaveChanges] = useState(false)

  const [workoutAlreadyAdded, setWorkoutAlreadyAdded] = useState(false)

  const [updatePage, setUpdatePage] = useState(false)

  useEffect(() => {
    adminFetchWorkout(workout_id.workoutId)
    .then((data) => {
      setWorkout(data)
      setWorkoutName(data.data.Workout.name)
      setWorkoutIsPublic(data.data.Workout.is_public)
      setWorkoutDifficulty(data.data.Workout.difficulty)
      setWorkoutDescription(data.data.Workout.description)
    }).catch((error) => {
      // if (error.response.status === 403) {
      //   navigate(PAGE_404_ROUTE)
      // }
      // if (error.response.status === 422) {
      //   navigate(PAGE_404_ROUTE)
      // }
    }).finally(() => setLoading(false))
  },[workout_id, updatePage, user.isAuth])

  const editParamWorkout = () => {
    workout.setEditWorkout(true)
    setEditWorkout(true)
  }

  const updateParamWorkout = () => {
    updateWorkout(workoutName, workout_id, workoutDescription, workoutIsPublic, workoutDifficulty)
    setEditWorkout(false)
    workout.setEditWorkout(false)
    setUpdatePage(!updatePage)
    setShowModalSaveChanges(false)
    setShowFormAddExercise(false)
  }

  const closeParamWorkout = () => {
    setEditWorkout(false)
    setShowFormAddExercise(false)
    workout.setEditWorkout(false)
  }

  const closeModal = () => {
    setShowModalChangeStatus(false)
    setShowModalDeleteWorkout(false)
    setShowModalSaveChanges(false)
  }

  const changeStatusWorkout = () => {
    setWorkoutIsPublic(!workoutIsPublic)
    setShowModalChangeStatus(false)
  }

  const addWorkout = () => {
    addWorkoutToUser(user.user.id, selectedWorkout.data.Workout.id)

    selectedWorkout.data.Workout.exercise.map((exercise) => 
      createSet(exercise.number_of_sets, exercise.id, user.user.id, 0, 0)
    )
    setUpdatePage(!updatePage)
  }

  const deleteWorkout = () => {
    if (!selectedWorkout.data.Workout.is_public) {
      deleteCreatedWorkout(selectedWorkout.data.Workout.id)
    } else {
      deleteAddedWorkout(selectedWorkout.data.Workout.id, user.user.id)
      selectedWorkout.data.Workout.exercise.map((exercise) => {
        deleteSets(exercise.id, user.user.id)
      })
    }
    setShowModalDeleteWorkout(false)
  }

  return (
    <div className={style.mainBlock}>
    <Container>
      <Row>
        <Col md={12}>
          <Card className={style.workoutCard}>
            {loading 
            ? 
              <div className={style.loadingSpinner}>
                <Spinner variant="light"/>
              </div>
            :
            <Card.Body>
              <div className={style.workoutTitle}>
                  {editWorkout
                    ? <input type="text" value={workoutName} onChange={(el) => setWorkoutName(el.target.value)} />
                    : <h3>{workoutName}</h3>
                  }
                <div className={style.blockButtons}>                  
                  <div>
                    {(user.isAuth) &&
                      (editWorkout
                        ?  
                        <div>
                          <button className={style.changeButton} onClick={() => setShowModalSaveChanges(true)}><AiOutlineCheck/></button>
                          <button className={style.changeButton} onClick={() => closeParamWorkout()}><AiOutlineClose/></button>
                        </div>
                        :  
                        <div>
                          <button disabled={true} className={style.changeButton} onClick={() => editParamWorkout()}><AiFillEdit/></button>
                        </div>
                      )
                    }
                  </div>
                  {user.isAuth &&
                    <button disabled={true} className={style.deleteWorkoutButton} onClick={() => setShowModalDeleteWorkout(true)}><RiDeleteBin2Line/></button>
                  }
                </div>
              </div>
              
              {editWorkout
                ? 
                <div>
                  <label className={style.titleDifficulty} htmlFor="difficulty">Select the difficulty:</label>
                </div>
                : <Card.Subtitle className={style.titleDifficulty}>Difficulty: {workoutDifficulty}</Card.Subtitle>
              }

              {selectedWorkout.data.Workout.user_id === user.user.id &&
                (editWorkout
                ? 
                <div>
                  <label className={style.titleStatus}>Status</label>
                  <input type="checkbox" checked={workoutIsPublic} onChange={()=> setShowModalChangeStatus(true)} />
                </div>
                : <Card.Subtitle className={style.titleStatus}>Status: {workoutIsPublic ? 'Public' : 'Non-public'}</Card.Subtitle>)
              }

              {editWorkout
                ? 
                <div className='d-flex flex-column'>
                  <label className={style.titleDescription}>Description:</label>
                  <textarea type="text" value={workoutDescription} onChange={(el) => setWorkoutDescription(el.target.value)} />
                </div>
                : 
                <span className={style.workoutDescription}><CustomToggleDescription body={workoutDescription} color='light'/></span>
              }

              <div className={style.exerciseTitle}>
                <Card.Text className={style.exerciseName}>Exercises:</Card.Text>
                {selectedWorkout.editWorkout && 
                  (showFormAddExercise 
                    ? <button className={style.changeButton} onClick={() => setShowFormAddExercise(false)}><AiOutlineClose/></button>
                    : <button className={style.changeButton} onClick={() => setShowFormAddExercise(true)}><IoIosAddCircleOutline/></button>)
                }
              </div>

              <FormCreateExercise showForm={showFormAddExercise} workoutId={workout_id} />

              <ul className={style.exerciseList}>
                {selectedWorkout.data.Workout.exercise.map((exercise) => 
                  <div key={exercise.id} className={style.exerciseListItem}>
                    <ExerciseInfo
                      key={exercise.id}
                      exerciseId={exercise.id}
                      name={exercise.name}
                      description={exercise.description}
                      numberOfSets={exercise.number_of_sets}
                      maximumRepetitions={exercise.maximum_repetitions}
                      restTime={exercise.rest_time}
                      video={exercise.video}
                      photos={exercise.photo}
                    />
                  </div>
                )}
              </ul>
            </Card.Body>
            }
          </Card>
        </Col>
      </Row>

      <ChangeStatusModal show={showModalChangeStatus} status={workoutIsPublic} onClose={closeModal} changeStatus={changeStatusWorkout} />
      <DeleteModal show={showModalDeleteWorkout} onClose={closeModal} deleteValue={deleteWorkout} value='workout'/>
      <SaveChangesWorkoutModal show={showModalSaveChanges} onClose={closeModal} saveChanges={updateParamWorkout} />
    
    </Container>
    </div>
  )
})

export default AdminGetOneWorkout