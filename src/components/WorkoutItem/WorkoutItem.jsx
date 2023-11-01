import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Card, Spinner } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import { Context } from '../..'
import style from "./WorkoutItem.module.css"
import { WORKOUT_ROUTE } from '../../utils/consts'


const WorkoutItem = observer(({ selectedWorkout }) => {
  const { user } = useContext(Context)
  // const { workout } = useContext(Context)
  const navigate = useNavigate()

  return (
    <div>
      <Card className={style.myCard}>
        <Card.Body>
          <NavLink className={style.nameWorkout} to={`${WORKOUT_ROUTE}/${selectedWorkout.id}`}>
            {selectedWorkout.name}
          </NavLink>       
          {/* <div>
            {!selectedWorkout.is_public && 'Status: Private'}
            {(selectedWorkout.is_public && selectedWorkout.user_id === user.user.id ) && 'Status: Public'}
          </div> */}
          <div className={style.difficulty}>
            Difficulty:
            <p>{selectedWorkout.difficulty}</p>
          </div>
          <div className={style.description}>
            Description:
            <p>{selectedWorkout.description}</p>
          </div>
          <button className={style.buttonSeeMore} onClick={() => navigate(`${WORKOUT_ROUTE}/${selectedWorkout.id}`)}>See more</button>
        </Card.Body>        
      </Card>
    </div>
  )
})

export default WorkoutItem