import { observer } from 'mobx-react-lite'
import React, { useContext, useState } from 'react'
import { Context } from '../..'
import { NavLink, useNavigate } from 'react-router-dom'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { MAIN_ROUTE, PROFILE_ROUTE, WORKOUTS_ROUTE } from '../../utils/consts'
import style from "./NavBar.module.css";
import { AiOutlineProfile, AiOutlineLogin, AiOutlineLogout } from "react-icons/ai";

const NavBar = observer(() => {
  const { user } = useContext(Context)
  const { workout } = useContext(Context)

  const navigate = useNavigate()  // для перехода по страницам

  const [showLogin, setShowLogin] = useState(true);
  const [showModal, setShowModal] = useState(false);
  
  // Выход из профиля
  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
    localStorage.setItem("token", null);
  };

  const clickLogin = () => {
    //setShowModal(true);
    //setShowLogin(true);
    user.setIsAuth(true)  // для теста
  };

  return (
      <Navbar 
        collapseOnSelect
        //expand="lg"
        //bg="black"
        //variant="dark"
        className={style.myNavbar}
        >
        <NavLink className={style.logo} to={MAIN_ROUTE}>
          WorkoutWorld
        </NavLink>
        <Nav className={style.menuNavbar}>
          <NavLink className={style.workouts} to={WORKOUTS_ROUTE}>
            Workouts
          </NavLink>
          <div>
            {user.isAuth ? 
              <div>
                <NavLink
                  className={style.profile}
                  to={{ pathname: PROFILE_ROUTE }}
                  // + state="userInfo"
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
          </div>
        </Nav>
        {/* <div className={style.menuNavbar}>
          <NavLink to={WORKOUTS_ROUTE}>
            Workouts
          </NavLink>
          <Nav>wishlist</Nav>
          <Nav>Profile</Nav>
        </div> */}
        {/* <div className="d-flex justify-content-center">
          <Nav>
            {user.isAuth ? 
              <div>
                <NavLink
                  className={style.profile}
                  to={{ pathname: PROFILE_ROUTE }}+
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
        </div> */}
      </Navbar>
      
  )
})

export default NavBar