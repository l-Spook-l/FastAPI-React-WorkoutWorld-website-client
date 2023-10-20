import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Card, Spinner } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import { Context } from '../..'
import style from "./WorkoutItem.module.css"
import { WORKOUT_ROUTE } from '../../utils/consts'
import { IoIosAddCircleOutline} from "react-icons/io";
import { addWorkoutToUser, createSet, fetchOneWorkout } from '../../http/workoutAPI'


const WorkoutItem = observer(({ selectedWorkout }) => {
  const { user } = useContext(Context)
  const { workout } = useContext(Context)
  const navigate = useNavigate()

  // useEffect(() => {

  // },[])

  const addWorkout = () => {
    addWorkoutToUser(user.user.id, selectedWorkout.id)

    fetchOneWorkout(selectedWorkout.id)
    .then((data) => {
      workout.setSelectedWorkout(data)
      data.data.Workout.exercise.map((exercise) => 
        createSet(exercise.number_of_sets, exercise.id, user.user.id, 0, 0)
      )
    })
  }

  return (
    <div>
      <Card className={style.myCard}>
        <Card.Body>
          <NavLink className={style.nameWorkout} to={`${WORKOUT_ROUTE}/${selectedWorkout.id}`}>
            {selectedWorkout.name}
          </NavLink>
          {user.isAuth && 
            ((selectedWorkout.user_id !== user.user.id) && 
              <button className={style.buttonAddWorkout} onClick={addWorkout}><IoIosAddCircleOutline/></button>
            )
          }
          <div>
            Status: {selectedWorkout.is_public ? 'Public' : 'Non-public'}
          </div>
          <div>
            Description
            <p>{selectedWorkout.description}</p>
            {/* <p>Difficulty {workout.difficulty}</p> */}
          </div>
          <button onClick={() => navigate(`${WORKOUT_ROUTE}/${selectedWorkout.id}`)}>See more</button>
        </Card.Body>        
      </Card>
    </div>
  )
})

export default WorkoutItem