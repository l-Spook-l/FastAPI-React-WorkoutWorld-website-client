import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import style from './AdminPanelPage.module.css'
import { adminPanel } from '../../http/userAPI'
import { Alert, Spinner } from 'react-bootstrap'
import Loader from '../../components/Loader/Loader'
import { PAGE_404_ROUTE } from '../../utils/consts'
import { useNavigate } from 'react-router-dom'
import AdminUserInfo from '../../components/AdminComponents/AdminUserInfo/AdminUserInfo'
import AdminWorkoutsInfo from '../../components/AdminComponents/AdminWorkoutsInfo/AdminWorkoutsInfo'
import AdminRolesInfo from '../../components/AdminComponents/AdminRolesInfo/AdminRolesInfo'
import AdminGetOneWorkout from '../../components/AdminComponents/AdminGetOneWorkout/AdminGetOneWorkout'

const AdminPanelPage = observer(() => {

  const [users, setUsers] = useState()
  const [roles, setRoles] = useState()
  const [workouts, setWorkouts] = useState()

  const [view, setView] = useState()
  const [activeTab, setActiveTab] = useState("users")
  
  const [loadingAdminPanel, setLoadingAdminPanel] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    adminPanel().then((data)=> {
      setUsers(data.data.users)
      setRoles(data.data.roles)
      setWorkouts(data.data.workouts)
      setView(<AdminUserInfo dataUsers={data.data.users}/>)
    }).catch((error) => {
      navigate(PAGE_404_ROUTE)
    }).finally(() => setLoadingAdminPanel(false))
  },[])

  const navigate = useNavigate(<AdminUserInfo dataUsers={users}/>)

  const blurHandler = (tab) => {
    setActiveTab(tab)
    switch (tab) {
      case "users":
        setView(<AdminUserInfo  dataUsers={users}/>)
        break
      case "roles":
        setView(<AdminRolesInfo dataRoles={roles}/>)
        break
      case "workouts":
        setView(<AdminWorkoutsInfo dataWorkouts={workouts}/>)
        break
    }
  }

  return (
    <div className={style.myContainer}>
      {loadingAdminPanel 
      ? 
      <div className={style.loadingSpinner}>
        <Loader/>
      </div>
      :
      <div className={style.mainBlock}>
        <div className={style.menu}>
          <div className={style.menuTitle}>
            WorldWorkout Admin
          </div>
          <Alert
            className={`${style.alertMenu} ${activeTab === "users" ? style.alertMenuActive : ""}`}
            onClick={() => blurHandler("users")}
          >
            <span>Users</span>
          </Alert>
          <Alert
            className={`${style.alertMenu} ${activeTab === "roles" ? style.alertMenuActive : ""}`}
            onClick={() => blurHandler("roles")}
          >
            <span>Roles</span>
          </Alert>
          <Alert
            className={`${style.alertMenu} ${activeTab === "workouts" ? style.alertMenuActive : ""}`}
            onClick={() => blurHandler("workouts")}
          >
            <span>Workouts</span>
          </Alert>
        </div>
        <div className={style.infoBlock}>
          <div className={style.infoBlockHeader}></div>
          <div className={style.infoBlockMainSection}>{view}</div>
        </div>
      </div>
      }
    </div>
  )
})

export default AdminPanelPage