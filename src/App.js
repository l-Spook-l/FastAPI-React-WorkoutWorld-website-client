import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/AppRouter'
import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer'
import { Context } from '.'
import { check } from './http/userAPI'
import { Spinner } from 'react-bootstrap'
import { fetchAddUserWorkout, fetchDifficultiesWorkout } from './http/workoutAPI'


const App = observer(() => {
  const { user } = useContext(Context)
  const { workout } = useContext(Context)

  const [loadingCheck, setLoadingCheck] = useState(true)
  const [loadingAddedWorkout, setLoadingAddedWorkout] = useState(true)

  useEffect(() => {
    fetchDifficultiesWorkout().then((data) => workout.setDifficulties(data))

    check().then((data) => {
      user.setUser(data)
      user.setIsAuth(true)
      fetchAddUserWorkout(user.user.id).then((data) => {
        workout.setAddedWorkouts(data)      
      }).finally(() => setLoadingAddedWorkout(false))
    }).catch((error) => {
      setLoadingAddedWorkout(false)
    }).finally(() => setLoadingCheck(false))

  }, [user.isAuth])

  if (loadingCheck) {
    return <Spinner animation='grow'/>
  }

  if (loadingAddedWorkout) {
    return <Spinner animation='grow'/>
  } 

  return (
    <BrowserRouter>
      <NavBar/>
      <div style={{ marginTop: "63px" }}>
        <AppRouter />
      </div>
      <Footer/>
    </BrowserRouter>
  )
})

export default App