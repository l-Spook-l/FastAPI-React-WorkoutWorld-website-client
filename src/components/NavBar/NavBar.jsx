import { observer } from 'mobx-react-lite'
import React, { useContext, useState } from 'react'
import { Context } from '../..'
import { NavLink } from 'react-router-dom'
import { Container, Nav, NavDropdown, Navbar, Offcanvas } from 'react-bootstrap'
import { MAIN_ROUTE, PROFILE_ROUTE, WORKOUTS_ROUTE } from '../../utils/consts'
import style from "./NavBar.module.css";
import { AiOutlineProfile, AiOutlineLogin, AiOutlineLogout } from "react-icons/ai";
import { CiDumbbell } from "react-icons/ci";
import FormLogin from "../Forms/FormLogin/FormLogin";
import FormRegister from "../Forms/FormRegister/FormRegister";

const NavBar = observer(() => {
  const { user } = useContext(Context)

  const [showLogin, setShowLogin] = useState(true)
  const [showModal, setShowModal] = useState(false)
  
  const logOut = () => {
    user.setUser({})
    user.setIsAuth(false)
    localStorage.setItem("token", null)
  }

  const clickLogin = () => {
    setShowModal(true)
    setShowLogin(true)
  }

  const switchForm = () => {
    setShowLogin(!showLogin)
  }

  return (
    <Navbar         
      collapseOnSelect
      expand="lg"
      bg="black"
      variant="dark" className={style.myNavbar}>
    <Container fluid className={style.container}>
      <NavLink className={style.logo} to={MAIN_ROUTE}>
        <span className={style.logoImg}><CiDumbbell/></span>
        WorkoutWorld
      </NavLink>
      <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
      <Navbar.Offcanvas
        id={`offcanvasNavbar-expand-lg`}
        aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
            Menu
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className={style.offcanvasBody}>
          <Nav className={style.menuNavbar}>
            <NavLink className={style.workouts} to={WORKOUTS_ROUTE}>
              Workouts
            </NavLink>
            {user.isAuth &&
              <NavDropdown
              title={
                <span className={style.dropdownMenuTitle}>My workouts</span>
              }
              id={`offcanvasNavbarDropdown-expand-lg`}
              className={style.dropdownMenuTitle}
            >
              <NavDropdown.Item className={style.dropdownItem}>
                <NavLink
                  className={style.buttonLink}
                  to={{ pathname: PROFILE_ROUTE }}
                  state="createdWorkouts"
                  >
                  Created workouts
                </NavLink>
              </NavDropdown.Item>
                <NavDropdown.Item  className={style.dropdownItem}>
                  <NavLink
                    className={style.buttonLink}
                    to={{ pathname: PROFILE_ROUTE }}
                    state="addedWorkouts"
                  >
                    Added workouts
                  </NavLink>
                </NavDropdown.Item>
            </NavDropdown>
            }
            {user.isAuth ? 
              <div>
                <NavLink
                  className={style.profile}
                  to={{ pathname: PROFILE_ROUTE }}
                  state="userInfo"
                >
                  <AiOutlineProfile />
                </NavLink>
                <NavLink className={style.login} onClick={logOut} to={MAIN_ROUTE}>
                  <AiOutlineLogout />
                </NavLink>
              </div>
            : 
              <NavLink className={style.logout} onClick={clickLogin}>
                <AiOutlineLogin />
              </NavLink>
            }
          </Nav>
        </Offcanvas.Body>
      </Navbar.Offcanvas>
      {showLogin ? 
        <FormLogin
          show={showModal}
          onHide={() => setShowModal(false)}
          onSwitchForm={switchForm}
        />
       : 
        <FormRegister
          show={showModal}
          onHide={() => setShowModal(false)}
          onSwitchForm={switchForm}
        />
      }
    </Container>
  </Navbar>
      
  )
})

export default NavBar