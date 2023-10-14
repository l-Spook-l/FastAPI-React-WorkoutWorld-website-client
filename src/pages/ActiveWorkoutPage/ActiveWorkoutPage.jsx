import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Alert, Container, Spinner } from 'react-bootstrap'
import { Context } from "../..";
import style from './ActiveWorkoutPage.module.css'
import { useParams } from 'react-router-dom';
import { fetchOneWorkout, fetchSets } from '../../http/workoutAPI';
import ExerciseItem from '../../components/ExerciseItem/ExerciseItem';

const ActiveWorkoutPage = observer(() => {
  const { user } = useContext(Context)
  const { workout } = useContext(Context)

  const { workout_id }  = useParams();

  const [activeTab, setActiveTab] = useState(0);
  const [exerciseData, setExerciseData] = useState({})
  const [sets, setSets] = useState([])

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

      setExerciseData(data.data.Workout.exercise[0])
      const arrayOfIds = data.data.Workout.exercise.map((el) => el.id)  // создаем массив из id упражнений
      fetchSets(user.user.id, arrayOfIds).then((data) => setSets(data.data))

    }).finally(() => setLoading(false))
  },[workout_id])

  if (loading) {
    return <Spinner animation="grow" />;
  }
  // ======================================================================================

  const selectExercise = (index, exercise) => {
    setActiveTab(index)
    setExerciseData(exercise)
  }

  console.log('sets', sets)

  return (
    <Container>
      <div className={style.titleWorkout}></div>
      <div className={style.mainSection}>
        <div className={style.exercisesSection}>
          {workout.selectedWorkout.data.Workout.exercise.map((exercise, index) => 
            <Alert 
              className={`${style.alertMenu} ${activeTab === index ? style.alertMenuActive : ""}`}
              key={exercise.id}
              onClick={() => selectExercise(index, exercise)}
              >
              {exercise.name}
            </Alert>
          )}
        </div>
        <div className={style.exerciseInfo}>
          <ExerciseItem exercise={exerciseData}/>
        </div>
      </div>
    </Container>
  )
})

export default ActiveWorkoutPage