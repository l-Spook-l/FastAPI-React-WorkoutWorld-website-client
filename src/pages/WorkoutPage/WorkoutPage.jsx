import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../..'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { addWorkoutToUser, createSet, deleteAddedSets, deleteAddedWorkout, deleteCreatedWorkout, fetchOneWorkout, updateWorkout } from '../../http/workoutAPI'
import { Breadcrumb, Card, Col, Container, Row, Spinner } from 'react-bootstrap'
import { ACTIVE_WORKOUT_ROUTE, MAIN_ROUTE, PROFILE_ROUTE, WORKOUTS_ROUTE } from '../../utils/consts'
import ExerciseInfo from '../../components/ExerciseInfo/ExerciseInfo'
import { AiFillEdit, AiOutlineCheck, AiOutlineClose} from "react-icons/ai";
import style from './WorkoutPage.module.css'
import FormCreateExercise from '../../components/Forms/FormCreateExercise/FormCreateExercise'
import ChangeStatusModal from '../../components/Modals/ChangeStatusModal/ChangeStatusModal'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { RiDeleteBin2Line } from 'react-icons/ri'
import DeleteWorkoutModal from '../../components/Modals/DeleteWorkoutModal/DeleteWorkoutModal'
import SaveChangesWorkoutModal from '../../components/Modals/SaveChangesWorkoutModal/SaveChangesWorkoutModal'
import FormLogin from '../../components/Forms/FormLogin/FormLogin'
import FormRegister from '../../components/Forms/FormRegister/FormRegister'

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
  const [workoutIsPublic, setWorkoutIsPublic] = useState('')
  const [workoutDescription, setWorkoutDescription] = useState('')

  const [showModalChangeStatus, setShowModalChangeStatus] = useState(false)
  const [showModalDeleteWorkout, setShowModalDeleteWorkout] = useState(false)
  const [showModalSaveChanges, setShowModalSaveChanges] = useState(false)
  const [showModalLogin, setShowModalLogin] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  const [workoutAlreadyAdded, setWorkoutAlreadyAdded] = useState(false)

  const [updatePage, setUpdatePage] = useState(false)

  useEffect(() => {
    fetchOneWorkout(workout_id)
    .then((data) => {
      workout.setSelectedWorkout(data)
      setWorkoutName(data.data.Workout.name)
      setWorkoutIsPublic(data.data.Workout.is_public)
      setWorkoutDifficulty(data.data.Workout.difficulty)
      setWorkoutDescription(data.data.Workout.description)

      if (workout.addedWorkouts.workouts !== undefined) {
        setWorkoutAlreadyAdded(workout.addedWorkouts.workouts.some((el) => el.Workout.id === workout.selectedWorkout.data.Workout.id))
      }
    }).finally(() => setLoading(false))
  },[workout_id, updatePage, user.isAuth])

  if (loading) {
    return <Spinner animation="grow" />;
  }

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
  }

  const closeParamWorkout = () => {
    setEditWorkout(false)
    workout.setEditWorkout(false)
  }

  const closeModal = () => {
    setShowModalChangeStatus(false)
    setShowModalDeleteWorkout(false)
    setShowModalSaveChanges(false)
  };

  const changeStatusWorkout = () => {
    setWorkoutIsPublic(!workoutIsPublic)
    setShowModalChangeStatus(false)
  }

  const addWorkout = () => {
    addWorkoutToUser(user.user.id, workout.selectedWorkout.data.Workout.id)

    workout.selectedWorkout.data.Workout.exercise.map((exercise) => 
      createSet(exercise.number_of_sets, exercise.id, user.user.id, 0, 0)
    )
    setUpdatePage(!updatePage)
    // navigate(PROFILE_ROUTE, {state: 'addedWorkouts'} );
  }

  const deleteWorkout = () => {
    if (!workout.selectedWorkout.data.Workout.is_public) {
      deleteCreatedWorkout(workout.selectedWorkout.data.Workout.id)
      // navigate(PROFILE_ROUTE, {state: 'createdWorkouts'} );
    } else {
      deleteAddedWorkout(workout.selectedWorkout.data.Workout.id, user.user.id)
      workout.selectedWorkout.data.Workout.exercise.map((exercise) => {
        deleteAddedSets(exercise.id, user.user.id)
      })
      // navigate(PROFILE_ROUTE, {state: 'addedWorkouts'} );
    }
    setShowModalDeleteWorkout(false);
  }

  // console.log('add swowow1', workout.addedWorkouts.workouts)
  // console.log('testese', ((workout.selectedWorkout.data.Workout.user_id !== user.user.id) || 
  // (workout.addedWorkouts.workouts.some((el) => el.id === workout.selectedWorkout.data.Workout.id))))
  // console.log('add swowow2', workout.selectedWorkout.data.Workout.user_id, 'SS', user.user.id)
  // workout.addedWorkouts.workouts.some((el) => console.log('eellele', el.Workout.id === workout.selectedWorkout.data.Workout.id))
  // const workoutAlreadyAdded = workout.addedWorkouts.workouts.some((el) => el.Workout.id === workout.selectedWorkout.data.Workout.id)
  // console.log('add swowow3', workoutAlreadyAdded)
  // console.log('add swowow4', workout.addedWorkouts.workouts)
  // console.log('add swowow5', workoutDifficulty)

  const clickLogin = () => {
    setShowModalLogin(true);
    setShowLogin(true);
  };

  const switchForm = () => {
    setShowModalLogin(!showLogin);
  };

  return (
    <div className={style.mainBlock}>
    <Container className={style.workoutContainer}>
      <Breadcrumb className={style.myBreadcrumb}>
        <Breadcrumb.Item  onClick={() => navigate(MAIN_ROUTE)}>
          <span className={style.myBreadcrumbItem}>Home</span>
        </Breadcrumb.Item>
        <Breadcrumb.Item onClick={() => navigate(WORKOUTS_ROUTE)}>
          Workouts
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{workoutName}</Breadcrumb.Item>
      </Breadcrumb>
      {/* <h1>Workout</h1> */}
      {!user.isAuth &&
        <p className={style.ifNotLoginTitle}> 
          <span className={style.login} onClick={clickLogin}>Log in </span>
          to view the full workout information, add it to your workouts, and start exercising!</p>
      }
      
      <Row>
        <Col md={12}>
          <Card className={style.workoutCard}>
            <Card.Body>
              <div className={style.workoutTitle}>
                  {editWorkout
                    ? <input type="text" value={workoutName} onChange={(el) => setWorkoutName(el.target.value)} />
                    : <h3>{workoutName}</h3>
                  }
                <div className={style.blockButtons}>
                  {(user.isAuth && 
                    ((workout.selectedWorkout.data.Workout.user_id !== user.user.id) && workoutAlreadyAdded)) &&
                    <NavLink className={style.buttonStartWorkout} to={`${ACTIVE_WORKOUT_ROUTE}/${workout_id}`}>Start workout</NavLink>
                  }
                  
                  <div>
                    {(user.isAuth && !workout.selectedWorkout.data.Workout.is_public) &&
                      (editWorkout
                        ?  
                        <div>
                          <button className={style.changeButton} onClick={() => setShowModalSaveChanges(true)}><AiOutlineCheck/></button>
                          <button className={style.changeButton} onClick={() => closeParamWorkout()}><AiOutlineClose/></button>
                        </div>
                        :  
                        <div>
                          <button className={style.changeButton} onClick={() => editParamWorkout()}><AiFillEdit/></button>
                        </div>
                      )
                    }
                  </div>

                  {(user.isAuth && 
                    ((workout.selectedWorkout.data.Workout.user_id !== user.user.id) && !workoutAlreadyAdded)) &&
                    <button className={style.buttonAddWorkout} onClick={addWorkout}><IoIosAddCircleOutline/></button>
                  }

                  {(user.isAuth &&
                    (((workout.selectedWorkout.data.Workout.user_id !== user.user.id) && workoutAlreadyAdded) ||
                    ((workout.selectedWorkout.data.Workout.user_id === user.user.id) && !workout.selectedWorkout.data.Workout.is_public)))  &&
                    <button className={style.deleteWorkoutButton} onClick={() => setShowModalDeleteWorkout(true)}><RiDeleteBin2Line/></button>
                  }
                </div>
              </div>
              
              {editWorkout
                ? 
                <div>
                  <label className={style.titleDifficulty} htmlFor="difficulty">Select the difficulty:</label>
                  <select name="difficulty" id="difficulty" onChange={(el) => setWorkoutDifficulty(el.target.value)}>
                  <option value="">Select difficulty</option>
                  {workout.difficulties.data.map((difficulty) => (
                    <option key={difficulty.DifficultyWorkout.id} value={difficulty.DifficultyWorkout.difficulty}>
                      {difficulty.DifficultyWorkout.difficulty}
                    </option>
                  ))}
                  </select>
                </div>
                : <Card.Subtitle className={style.titleDifficulty}>Difficulty: {workoutDifficulty}</Card.Subtitle>
              }

              {workout.selectedWorkout.data.Workout.user_id === user.user.id &&
                (editWorkout
                ? 
                <div>
                  <label className={style.titleStatus}>Status</label>
                  <input type="checkbox" checked={workoutIsPublic} onChange={()=> setShowModalChangeStatus(true)} />
                </div>
                : <Card.Subtitle className={style.titleStatus}>Status: {workoutIsPublic ? 'Public' : 'Non-public'}</Card.Subtitle>)
              }

              <p className={style.titleDescription}>Description: </p>
              {editWorkout
                ? <input type="textarea" value={workoutDescription} onChange={(el) => setWorkoutDescription(el.target.value)} />
                : <Card.Text className={style.workoutDescription}>{workoutDescription}</Card.Text>
              }

              <div className={style.exerciseTitle}>
                <Card.Text className={style.exerciseName}>Exercises:</Card.Text>
                {workout.editWorkout && 
                  (showFormAddExercise 
                    ? <button className={style.changeButton} onClick={() => setShowFormAddExercise(false)}><AiOutlineClose/></button>
                    : <button className={style.changeButton} onClick={() => setShowFormAddExercise(true)}><IoIosAddCircleOutline/></button>)
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
                      video={exercise.video}
                      photos={exercise.photo}
                    />
                  </div>
                )}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <ChangeStatusModal show={showModalChangeStatus} status={workoutIsPublic} onClose={closeModal} changeStatus={changeStatusWorkout} />
      <DeleteWorkoutModal show={showModalDeleteWorkout} onClose={closeModal} deleteWorkout={deleteWorkout} />
      <SaveChangesWorkoutModal show={showModalSaveChanges} onClose={closeModal} saveChanges={updateParamWorkout} />
      {showLogin ? 
        <FormLogin
          show={showModalLogin}
          onHide={() => setShowModalLogin(false)}
          onSwitchForm={switchForm}
        />
       : 
        <FormRegister
          show={showModalLogin}
          onHide={() => setShowModalLogin(false)}
          onSwitchForm={switchForm}
        />
      }
    </Container>
    </div>
  )
})

export default WorkoutPage