import React, { useContext, useEffect, useState } from 'react'
import style from './CreatedWorkouts.module.css'
import { Container, Spinner } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import { fetchMyWorkouts } from '../../http/workoutAPI'
import { Context } from '../..'
import WorkoutItem from '../WorkoutItem/WorkoutItem'
import { NavLink } from 'react-router-dom'
import { CREATE_WORKOUT_ROUTE } from '../../utils/consts'
import MyPagination from '../MyPagination/MyPagination'
import SearchBar from '../Filters/SearchBar/SearchBar'
import DifficultyBar from '../Filters/DifficultyBar/DifficultyBar'
import IsPublicBar from '../Filters/IsPublicBar/IsPublicBar'

const UserWorkouts = observer(() => {
  const { user } = useContext(Context)
  const { workout } = useContext(Context)
  const [loading, setLoading] = useState(true)

  const [statusWorkout, setStatusWorkout] = useState()

  useEffect(() => {
    window.scrollTo(0, 0)
    workout.setPage(1)
    workout.setSelectedDifficulty("clear")
    workout.setSelectedSearchWorkouts("")
  }, [])

  useEffect(() => {
    fetchMyWorkouts(
      user.user.id,
      null,
      workout.selectedDifficulty.map((el) => el.DifficultyWorkout.difficulty),
      workout.skip,
      null,
      statusWorkout,
    ).then((data) => {
      workout.setUserWorkouts(data)
      workout.setTotalCount(data.total_count)
      workout.setSkip(data.skip)
      workout.setLimit(data.limit)      
    }).finally(() => setLoading(false))
  }, [workout.page, statusWorkout,  workout.selectedDifficulty])

  const changeStatusWorkout = (newStatus) => {
    setStatusWorkout(newStatus)
  };

  if (loading) {
    return <Spinner animation='grow'/>
  }

  return (
    <Container className={style.myContainer}>
      <div className={style.titleCreatedWorkout}>
        <h2>Created workouts</h2>
        <div className={style.navBlock}>
          <SearchBar typeWorkout='Created' statusWorkout={statusWorkout}/>
          <DifficultyBar/>
          <IsPublicBar statusWorkout={changeStatusWorkout}/>
          <NavLink className={style.createWorkoutButton} to={CREATE_WORKOUT_ROUTE}>Created a new workout</NavLink>
        </div>
      </div>
      
      {workout.userWorkouts.data.length === 0
        ?
        <span>
          You don't have any workouts yet.
          <NavLink to={CREATE_WORKOUT_ROUTE}>Create your own. </NavLink>
        </span>
        :
        <div>
          <MyPagination/>
          <div className={style.contentSection}>
          {workout.userWorkouts.data.map((el) => 
            <WorkoutItem key={el.Workout.id} selectedWorkout={el.Workout}/>
          )}
          </div>
        </div>
        
      }
    </Container>
  )
})

export default UserWorkouts