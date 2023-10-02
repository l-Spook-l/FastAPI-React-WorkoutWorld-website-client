import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/AppRouter'
import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer'
import { Context } from '.'
import { check } from './http/userAPI'
import { Spinner } from 'react-bootstrap'


const App = observer(() => {
  const { user } = useContext(Context)
  const { workout } = useContext(Context)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log('начал работать useEffect check', user)

    check().then((data) => {
      console.log('qqqqqqqqqqqqqqq', data)
      user.setUser(data)
      user.setIsAuth(true)
    }).catch((error) => {
      console.log('Error login', error);
      // Обработка других ошибок, возникших при выполнении запроса
    }).finally(() => setLoading(false))

  }, [])

  if (loading) {
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