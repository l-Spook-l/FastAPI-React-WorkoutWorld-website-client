import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Alert, Container, Spinner } from 'react-bootstrap'
import { Context } from "../..";
import style from './ActiveWorkoutPage.module.css'
import { useParams } from 'react-router-dom';
import { fetchOneWorkout } from '../../http/workoutAPI';
import ExerciseInfo from '../../components/ExerciseInfo/ExerciseInfo';

const ActiveWorkoutPage = observer(() => {
  const { workout } = useContext(Context)
  const { workout_id }  = useParams();

  const [activeTab, setActiveTab] = useState(0);

// =============== заменить наверно  на redis или что-то еще, т.к. иногда будет 2 загрузки =====
const [loading, setLoading] = useState(true);

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
// ======================================================================================

  const selectExercise = (exerciseId) => {

  }

  return (
    <Container>
      <div className={style.titleWorkout}></div>
      <div className={style.mainSection}>
        <div className={style.exercisesSection}>
          {workout.selectedWorkout.data.Workout.exercise.map((exercise, index) => 
            <Alert 
              className={`${style.alertMenu} ${activeTab === index ? style.alertMenuActive : ""}`}
              key={exercise.id}
              onClick={() => setActiveTab(index)}
              >
              {/* <button className={style.exerciseButton} onClick={selectExercise}>{exercise.name}</button> */}
              {exercise.name}
            </Alert>
          )}
        </div>
        <div className={style.exerciseInfo}>
          <ExerciseInfo />
        </div>
      </div>
    </Container>
  )
})

export default ActiveWorkoutPage