import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Alert, Container, Spinner } from 'react-bootstrap'
import { Context } from "../..";
import style from './ActiveWorkoutPage.module.css'
import { useNavigate, useParams } from 'react-router-dom';
import { fetchActiveWorkout, fetchSets } from '../../http/workoutAPI';
import ExerciseItem from '../../components/ExerciseItem/ExerciseItem';
import WorkoutTimeTracker from '../../components/Timers/WorkoutTimeTracker/WorkoutTimeTracker';
import { PAGE_404_ROUTE } from '../../utils/consts';
import { AiOutlineCheck } from "react-icons/ai";


const ActiveWorkoutPage = observer(() => {
  const { user } = useContext(Context)
  const { workout } = useContext(Context)

  const { workout_id }  = useParams()

  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState(0);
  const [exerciseData, setExerciseData] = useState({})
  const [sets, setSets] = useState([])
  const [exerciseSets, setExerciseSets] = useState([])
  const [completedExercises, setCompletedExercises] = useState([])

  const [loadingWorkout, setLoadingWorkout] = useState(true);
  const [loadingSets, setLoadingSets] = useState(true)

  const [workoutName, setWorkoutName] = useState('')
  
  useEffect(() => {
    fetchActiveWorkout(workout_id, user.user.id)
    .then((data) => {
      workout.setSelectedWorkout(data)
      setWorkoutName(data.data.Workout.name)
      setExerciseData(data.data.Workout.exercise[0])

      // Creating an array of exercise IDs
      const arrayOfIds = data.data.Workout.exercise.map((el) => el.id)
      fetchSets(user.user.id, arrayOfIds).then((data) => setSets(data.data)).finally(() => setLoadingSets(false))
      
    }).catch((error) => {
      if (error.response.status === 404) {
        navigate(PAGE_404_ROUTE)
      }
      if (error.response.status === 403) {
        navigate(PAGE_404_ROUTE)
      }
      if (error.response.status === 422) {
        navigate(PAGE_404_ROUTE)
      }
    }).finally(() => setLoadingWorkout(false))
  },[workout_id])


  useEffect(() => {
    const setsForSelectedExercise = sets.filter((el) => el.Set.exercise_id === exerciseData.id)
    setExerciseSets(setsForSelectedExercise)
  }, [sets, exerciseData])


  const startWorkoutTimer = () => {
    console.log('Timer started!');
  }

  const stopWorkoutTimer = (elapsedTime) => {
    console.log(`Timer stopped! Elapsed time: ${elapsedTime} seconds`);
  }

  const resetWorkoutTimer = () => {
    console.log('Timer reset!');
  }

  const updateWorkoutTimer = (currentTime) => {
    console.log(`Timer updated! Current time: ${currentTime} seconds`);
  }

  const selectExercise = (index, exercise) => {
    setActiveTab(index)
    setExerciseData(exercise)
  }

  const completedExercisesCheck = (ids) => {
    setCompletedExercises(ids)
  }

  return (
    <div className={style.mainBlock}>
    <Container > 
      <div className={style.titleWorkout}>
        <div>
          <WorkoutTimeTracker 
            onStart={startWorkoutTimer}
            onStop={stopWorkoutTimer}
            onReset={resetWorkoutTimer}
            onTimeUpdate={updateWorkoutTimer}
          />
        </div>
        <div className={style.nameWorkout}>
          {workoutName}
        </div>
      </div>
      <div className={style.mainSection}>
        <div className={style.exerciseListSection}>
          {loadingWorkout 
          ? 
          <div className={style.loadingSpinner}>
            <Spinner variant="light"/>
          </div>
          :
          workout.selectedWorkout.data.Workout.exercise.map((exercise, index) => 
            <Alert 
              className={`${style.alertMenu} ${activeTab === index ? style.alertMenuActive : ""}`}
              key={exercise.id}
              onClick={() => selectExercise(index, exercise)}
              >
              Exercise {index + 1}
              {completedExercises.includes(exercise.id) && <AiOutlineCheck />}
            </Alert>
          )
          }
        </div>
        <div className={style.exerciseItem}>
          <ExerciseItem exercise={exerciseData} sets={exerciseSets} loading={loadingSets} completedExercises={completedExercisesCheck}/>
        </div>
      </div>
    </Container>
    </div>
  )
})

export default ActiveWorkoutPage