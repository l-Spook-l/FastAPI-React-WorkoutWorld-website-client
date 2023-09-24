import { observer } from 'mobx-react-lite'
import React, { useContext, useState } from 'react'
import { Context } from '../..'
import { NavLink, useNavigate } from 'react-router-dom'
import { Container, Navbar } from 'react-bootstrap'
import { MAIN_ROUTE } from '../../utils/consts'
import style from "./NavBar.module.css";

const NavBar = observer(() => {
  const { user } = useContext(Context)
  const { workout } = useContext(Context)

  const navigate = useNavigate()  // для перехода по страницам

  const [showLogin, setShowLogin] = useState(true);
  const [showModal, setShowModal] = useState(false);

  return (
    <Container className={style.navbarContainer}>
      <Navbar 
        collapseOnSelect
        expand="lg"
        bg="black"
        variant="dark"
        className="fixed-top"
        style={{ height: "63px" }}>
        <NavLink className={style.logoContainer} to={MAIN_ROUTE}>
          <span className={style.logoText}>WorkoutWorld</span>
        </NavLink>
      </Navbar>
      
    </Container>
  )
})

export default NavBar