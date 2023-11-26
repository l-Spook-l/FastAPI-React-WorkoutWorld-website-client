import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Breadcrumb, Container, Spinner } from 'react-bootstrap'
import { Context } from '../..'
import { fetchWorkouts } from '../../http/workoutAPI'
import WorkoutList from '../../components/WorkoutList/WorkoutList'
import { NavLink, useNavigate } from 'react-router-dom'
import { CREATE_WORKOUT_ROUTE, MAIN_ROUTE } from '../../utils/consts'
import style from './WorkoutsPage.module.css'
import MyPagination from '../../components/MyPagination/MyPagination'
import SearchBar from '../../components/Filters/SearchBar/SearchBar'
import DifficultyBar from '../../components/Filters/DifficultyBar/DifficultyBar'
import MyOffcanvasFilters from '../../components/Offcanvas/MyOffcanvasFilters/MyOffcanvasFilters'


const WorkoutsPage = observer(() => {
  const { user } = useContext(Context)
  const { workout } = useContext(Context)

  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [showOffcanvas, setShowOffcanvas] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    workout.setPage(1)
    workout.setSelectedDifficulty("clear")
    workout.setSelectedSearchWorkouts("")
  }, [])

  useEffect(() => {
    fetchWorkouts(
      workout.skip,
      workout.selectedDifficulty.map((el) => el.DifficultyWorkout.difficulty),
      null,
      null,
      )
      .then((data) => {
        workout.setWorkouts(data)
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
    <Container fluid className={style.container}>
      <div className={style.header}>
        <Breadcrumb className={style.myBreadcrumb}>
          <Breadcrumb.Item onClick={() => navigate(MAIN_ROUTE)}>
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Workouts</Breadcrumb.Item>
        </Breadcrumb>
        <div className={style.navBlock}>
          <div className={style.filters}>
            <SearchBar typeWorkout='All'/>
            <DifficultyBar/>
          </div>
          <button className={style.filterButton} onClick={openOffcanvas}>
            Filters
          </button>
          {user.isAuth && <NavLink to={CREATE_WORKOUT_ROUTE} className={style.createWorkoutButton}>Create workout</NavLink> }
        </div>
      </div>
      <hr />
      <div>
        <WorkoutList/>
        <MyPagination/>
      </div>
      <MyOffcanvasFilters         
        showOffcanvas={showOffcanvas}
        setShowOffcanvas={closeOffcanvas}
      />
    </Container>
  )
})


export default WorkoutsPage