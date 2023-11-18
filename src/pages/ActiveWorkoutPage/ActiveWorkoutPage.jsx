import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Alert, Container, Spinner } from 'react-bootstrap'
import { Context } from "../..";
import style from './ActiveWorkoutPage.module.css'
import { useNavigate, useParams } from 'react-router-dom';
import { fetchOneWorkout, fetchSets } from '../../http/workoutAPI';
import ExerciseItem from '../../components/ExerciseItem/ExerciseItem';
import WorkoutTimeTracker from '../../components/Timers/WorkoutTimeTracker/WorkoutTimeTracker';
import { PAGE_404_ROUTE } from '../../utils/consts';

const ActiveWorkoutPage = observer(() => {
  const { user } = useContext(Context)
  const { workout } = useContext(Context)

  const { workout_id }  = useParams()

  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState(0);
  const [exerciseData, setExerciseData] = useState({})
  const [sets, setSets] = useState([])
  const [exerciseSets, setExerciseSets] = useState([])

  // =============== заменить наверно  на redis или что-то еще, т.к. иногда будет 2 загрузки =====
  const [loadingWorkout, setLoadingWorkout] = useState(true);
  const [loadingSets, setLoadingSets] = useState(true)

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

      setExerciseData(data.data.Workout.exercise[0])

      const arrayOfIds = data.data.Workout.exercise.map((el) => el.id)  // создаем массив из id упражнений
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
    })
    .finally(() => setLoadingWorkout(false))

  },[workout_id])


  useEffect(() => {
    // console.log('sets useEffect', sets)
    const setsForSelectedExercise = sets.filter((el) => el.Set.exercise_id === exerciseData.id)
    // console.log('setsForSelectedExercise', setsForSelectedExercise)
    setExerciseSets(setsForSelectedExercise)
  }, [sets, exerciseData])

  const handleStart = () => {
    console.log('Timer started!');
    // Место для логики, которая должна выполняться при старте таймера
  };

  const handleStop = (elapsedTime) => {
    console.log(`Timer stopped! Elapsed time: ${elapsedTime} seconds`);
    // Место для логики, которая должна выполняться при остановке таймера
  };

  const handleReset = () => {
    console.log('Timer reset!');
    // Место для логики, которая должна выполняться при сбросе таймера
  };

  const handleTimeUpdate = (currentTime) => {
    console.log(`Timer updated! Current time: ${currentTime} seconds`);
    // Место для логики, которая должна выполняться при каждом обновлении времени таймера
  };

  // ======================================================================================

  const selectExercise = (index, exercise) => {
    setActiveTab(index)
    setExerciseData(exercise)
    console.log('exercise',  exercise.id)
  }

  // console.log('sets', sets)
  // console.log('exerciseSets', exerciseSets)

  return (
    <div className={style.mainBlock}>
    <Container>
      <div className={style.titleWorkout}>
        <WorkoutTimeTracker 
          onStart={handleStart}
          onStop={handleStop}
          onReset={handleReset}
          onTimeUpdate={handleTimeUpdate}
        />
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
            {exercise.name}
          </Alert>
          )
          }
        </div>
        <div className={style.exerciseItem}>
          <ExerciseItem exercise={exerciseData} sets={exerciseSets} loading={loadingSets}/>
        </div>
      </div>
    </Container>
    </div>
  )
})

export default ActiveWorkoutPage