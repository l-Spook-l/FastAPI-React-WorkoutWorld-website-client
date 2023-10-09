import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import { Context } from '../..'
import style from "./WorkoutItem.module.css"
import { WORKOUT_ROUTE } from '../../utils/consts'
import { AiFillEdit} from "react-icons/ai";


const WorkoutItem = observer(({ workout }) => {
  const { user } = useContext(Context)

  const navigate = useNavigate()

  // useEffect(() => {

  // },[])

  return (
    <div>
      <Card className={style.myCard}>
        <Card.Body>
          <div>
          <NavLink className={style.nameWorkout} to={`${WORKOUT_ROUTE}/${workout.id}`}>
            {workout.name}
          </NavLink>
          {(user.user.id === workout.user_id) && 
          <NavLink>
            <AiFillEdit/>
          </NavLink>
          }
          </div>
          
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