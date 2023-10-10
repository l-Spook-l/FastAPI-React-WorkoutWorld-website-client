import { observer } from 'mobx-react-lite'
import React, { useContext, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { Context } from '../..'
import { AiFillEdit, AiOutlineCheck} from "react-icons/ai";
import style from './ExerciseItem.module.css'
import { updateExercise } from '../../http/workoutAPI';

const ExerciseItem = observer(
  ({ exerciseId, name, description, numberOfSets, maximumRepetitions, restTime }) => {
  
  const { user } = useContext(Context)
  const { workout } = useContext(Context)

  const [editExercise, setEditExercise] = useState(false)
  
  const [exerciseName, setExerciseName] = useState(name)
  const [exerciseDescription, setExerciseDescription] = useState(description)
  const [exerciseNumberOfSets, setExerciseNumberOfSets] = useState(numberOfSets)
  const [exerciseMaximumRepetitions, setExerciseMaximumRepetitions] = useState(maximumRepetitions)
  const [exerciseRestTime, setExerciseRestTime] = useState(restTime)

  const updateParamExercise = () => {
    //updateExercise(exerciseId, exerciseName, exerciseDescription, exerciseNumberOfSets, exerciseMaximumRepetitions, exerciseRestTime)
    setEditExercise(false)
  }

  return (
    <Card>
      <Card.Body>
        <div className={style.titleSection}>
          {editExercise
          ? <input type="text" value={exerciseName} onChange={(el) => setExerciseName(el.target.value)} />
          : <h3>{name}</h3>
          }
          {(user.user.id === workout.selectedWorkout.data.Workout.user_id) && 
            editExercise
            ? <button onClick={() => updateParamExercise()}><AiOutlineCheck/></button>
            : <button onClick={() => setEditExercise(true)}><AiFillEdit/></button>
          }
        </div>
        <p>description:</p>
        {editExercise
          ? <input type="text" value={exerciseDescription} onChange={(el) => setExerciseDescription(el.target.value)} />
          : <h3>{exerciseDescription}</h3>
          }
        <Row>
          <Col md={4}>numberOfSets: 
            {editExercise
            ? <input type="text" value={exerciseNumberOfSets} onChange={(el) => setExerciseNumberOfSets(el.target.value)} />
            : exerciseNumberOfSets
            }
          </Col>
          <Col md={4}>maximumRepetitions: 
            {editExercise
              ? <input type="text" value={exerciseMaximumRepetitions} onChange={(el) => setExerciseMaximumRepetitions(el.target.value)} />
              : exerciseMaximumRepetitions
            }
          </Col>
          <Col md={4}>restTime: 
            {editExercise
              ? <input type="text" value={exerciseRestTime} onChange={(el) => setExerciseRestTime(el.target.value)} />
              : exerciseRestTime
            }
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
})

export default ExerciseItem