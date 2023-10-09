import { observer } from 'mobx-react-lite'
import React, { useContext, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { Context } from '../..'
import { AiFillEdit} from "react-icons/ai";
import style from './ExerciseItem.module.css'

const ExerciseItem = observer(
  ({ name, description, numberOfSets, maximumRepetitions, restTime }) => {
  
  const { user } = useContext(Context)
  const { workout } = useContext(Context)

  const [editWorkout, setEditWorkout] = useState(false)
  
  return (
    <Card>
      <Card.Body>
        <div className={style.titleSection}>
          <h3>{name}</h3>
          {(user.user.id === workout.selectedWorkout.data.Workout.user_id) && 
            <button onClick={() => setEditWorkout(true)}><AiFillEdit/></button>
          }
        </div>
        <p>description: {description}</p>
        
        <Row>
          <Col md={4}>numberOfSets: {numberOfSets}</Col>
          <Col md={4}>maximumRepetitions: {maximumRepetitions}</Col>
          <Col md={4}>restTime: {restTime}</Col>
        </Row>
      </Card.Body>
    </Card>
  )
})

export default ExerciseItem