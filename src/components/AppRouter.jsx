import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import { authRoutes, publicRoutes } from '../routes'
import { Context } from '..'
import Page404 from "../pages/Page404/Page404"

const AppRouter = () => {
  const {user} = useContext(Context)

  return (
    <Routes>
      {user.isAuth &&
        authRoutes.map(({ path, Component }) => 
          <Route key={path} path={path} element={<Component />} />
        )}
      {publicRoutes.map(({ path, Component }) => 
        <Route key={path} path={path} element={<Component />}/>
      )}
      <Route path='/*' element={<Page404/>}/>
    </Routes>
  )
}

export default AppRouter
