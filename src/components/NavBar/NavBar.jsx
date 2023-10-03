import { observer } from 'mobx-react-lite'
import React, { useContext, useState } from 'react'
import { Context } from '../..'
import { NavLink, useNavigate } from 'react-router-dom'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { MAIN_ROUTE, PROFILE_ROUTE, WORKOUTS_ROUTE } from '../../utils/consts'
import style from "./NavBar.module.css";
import { AiOutlineProfile, AiOutlineLogin, AiOutlineLogout } from "react-icons/ai";
import FormLogin from "../Forms/FormLogin/FormLogin";
import FormRegister from "../Forms/FormRegister/FormRegister";

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
    //localStorage.setItem("token", null);
  };

  const clickLogin = () => {
    setShowModal(true);
    setShowLogin(true);
  };

  const handleSwitchForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <Container fluid className={style.container}>
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
        
      </Navbar>
      {showLogin ? 
        <FormLogin
          show={showModal}
          onHide={() => setShowModal(false)}
          onSwitchForm={handleSwitchForm}
        />
       : 
        <FormRegister
          show={showModal}
          onHide={() => setShowModal(false)}
          onSwitchForm={handleSwitchForm}
        />
      }
    </Container>
      
      
  )
})

export default NavBar