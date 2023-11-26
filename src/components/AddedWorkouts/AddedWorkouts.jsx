import React, { useContext, useEffect, useState } from 'react'
import style from './AddedWorkouts.module.css'
import { Container, Spinner } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import { fetchAddUserWorkout } from '../../http/workoutAPI'
import { Context } from '../..'
import WorkoutItem from '../WorkoutItem/WorkoutItem'
import { NavLink } from 'react-router-dom'
import { WORKOUTS_ROUTE } from '../../utils/consts'
import MyPagination from '../MyPagination/MyPagination'
import SearchBar from '../Filters/SearchBar/SearchBar'
import DifficultyBar from '../Filters/DifficultyBar/DifficultyBar'
import MyOffcanvasFilters from '../Offcanvas/MyOffcanvasFilters/MyOffcanvasFilters'

const AddedWorkouts = observer(() => {
  const { user } = useContext(Context)
  const { workout } = useContext(Context)
  const [loading, setLoading] = useState(true)

  const [showOffcanvas, setShowOffcanvas] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    workout.setPage(1)
    workout.setSelectedDifficulty("clear")
    workout.setSelectedSearchWorkouts("")
  }, [])

  useEffect(() => {
    fetchAddUserWorkout(
      user.user.id,
      null,
      workout.selectedDifficulty.map((el) => el.DifficultyWorkout.difficulty),
      workout.skip,
      null,
      ).then((data) => {
      workout.setAddedWorkouts(data)
      workout.setTotalCount(data.total_count)
      workout.setSkip(data.skip)
      workout.setLimit(data.limit)   
    }).finally(() => setLoading(false))
  }, [workout.page, workout.selectedDifficulty])


  if (loading) {
    return <Spinner animation='grow'/>
  }

  const closeOffcanvas = () => {
    setShowOffcanvas(false)
  }

  const openOffcanvas = () => {
    setShowOffcanvas(true)
  }

  return (
    <Container className={style.myContainer}>
      <div className={style.titleAddedWorkout}>
        <h2>Added workouts</h2>
        <div className={style.navBlock}>
          <div className={style.filters}>
            <SearchBar typeWorkout='Added'/>
            <DifficultyBar/>
          </div>
          <button className={style.filterButton} onClick={openOffcanvas}>
            Other filters
          </button>
          <NavLink className={style.addWorkoutButton} to={WORKOUTS_ROUTE}>Add workout</NavLink>
        </div>
        {/* <SearchBar typeWorkout='Added'/>
        <DifficultyBar/>
        <NavLink className={style.addWorkoutButton} to={WORKOUTS_ROUTE}>Add workout</NavLink> */}
      </div>
      
      {workout.addedWorkouts.data.length === 0
        ?
        <span>
          You don't have any workouts yet.
          <NavLink to={WORKOUTS_ROUTE}> Add an existing one</NavLink>.
        </span>
        :
        <div>
          <MyPagination/>
          <div className={style.contentSection}>
          {workout.addedWorkouts.data.map((el) => 
            <WorkoutItem key={el.Workout.id} selectedWorkout={el.Workout}/>
          )}
          </div>
        </div>
      }
      <MyOffcanvasFilters         
        showOffcanvas={showOffcanvas}
        setShowOffcanvas={closeOffcanvas}
        typeWorkout='Created'
      />
    </Container>
  )
})

export default AddedWorkouts