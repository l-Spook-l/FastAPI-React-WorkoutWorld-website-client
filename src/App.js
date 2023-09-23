import { observer } from 'mobx-react-lite'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/AppRouter'
import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer'


const App = observer(() => {
  return (
    <BrowserRouter>
      <NavBar/>
      <AppRouter/>
      <Footer/>
    </BrowserRouter>
  )
})

export default App