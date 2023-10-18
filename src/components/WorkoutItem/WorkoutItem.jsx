import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import { Context } from '../..'
import style from "./WorkoutItem.module.css"
import { WORKOUT_ROUTE } from '../../utils/consts'
import { IoIosAddCircleOutline} from "react-icons/io";


const WorkoutItem = observer(({ workout }) => {
  const { user } = useContext(Context)

  const navigate = useNavigate()

  // useEffect(() => {

  // },[])

  const addWorkout = () => {

  }

  return (
    <div>
      <Card className={style.myCard}>
        <Card.Body>
          <NavLink className={style.nameWorkout} to={`${WORKOUT_ROUTE}/${workout.id}`}>
            {workout.name}
          </NavLink>
          {user.user.isAuth && 
            ((workout.user_id !== user.user.id) && <p onClick={addWorkout}><IoIosAddCircleOutline/></p>)
          }
          <div>
            Description
            <p>{workout.description}</p>
            <p>Difficulty {workout.difficulty}</p>
          </div>
          <button onClick={() => navigate(`${WORKOUT_ROUTE}/${workout.id}`)}>See more</button>
        </Card.Body>        
      </Card>
    </div>
  )
})

export default WorkoutItem