import { observer } from 'mobx-react-lite'
import React, { useContext, useState } from 'react'
import { Card, Col, Image, Row } from 'react-bootstrap'
import { Context } from '../..'
import { AiFillEdit, AiOutlineCheck, AiOutlineClose} from "react-icons/ai";
import style from './ExerciseInfo.module.css'
import { updateExercise } from '../../http/workoutAPI';
import VideoPlayer from '../VideoPlayer/VideoPlayer';

const ExerciseItem = observer(
  ({ exerciseId, name, description, numberOfSets, maximumRepetitions, restTime, video, photos }) => {
  
  const { user } = useContext(Context)
  const { workout } = useContext(Context)

  const [editExercise, setEditExercise] = useState(false)
  
  const [exerciseName, setExerciseName] = useState(name)
  const [exerciseDescription, setExerciseDescription] = useState(description)
  const [exerciseNumberOfSets, setExerciseNumberOfSets] = useState(numberOfSets)
  const [exerciseMaximumRepetitions, setExerciseMaximumRepetitions] = useState(maximumRepetitions)
  const [exerciseRestTime, setExerciseRestTime] = useState(restTime)

  const updateParamExercise = () => {
    updateExercise(exerciseId, exerciseName, exerciseDescription, exerciseNumberOfSets, exerciseMaximumRepetitions, exerciseRestTime)
    setEditExercise(false)
  }

  const closeParamExercise = () => {
    setEditExercise(false)
  }
  // console.log('ExerciseItem', video)

  return (
    <Card>
      <Card.Body>
        <div className={style.titleSection}>
          {editExercise
          ? <input type="text" value={exerciseName} onChange={(el) => setExerciseName(el.target.value)} />
          : <p>{exerciseName}</p>
          }
          {workout.editWorkout && 
            (editExercise
              ? 
                <div>
                  <button onClick={() => updateParamExercise()}><AiOutlineCheck/></button>
                  <button className={style.changeButton} onClick={() => closeParamExercise()}><AiOutlineClose/></button>
                </div>
              : <button onClick={() => setEditExercise(true)}><AiFillEdit/></button>)
          }
        </div>
        <div className={style.infoBlock}>
          {photos.length !== 0 && 
            <Card.Img className={style.exerciseImage} src={process.env.REACT_APP_API_URL + photos[0].photo}/>
          }
          <div className={style.descriptionBlock}>
            <p>Description:</p>
            {editExercise
              ? <input type="text" value={exerciseDescription} onChange={(el) => setExerciseDescription(el.target.value)} />
              : <p>{exerciseDescription}</p>
              }

            {/* <VideoPlayer videoUrl='https://www.youtube.com/watch?v=yyXyKbdWslw&ab_channel=iFlame'/> */}
            {/* {photos.map((el) => <Image src={process.env.REACT_APP_API_URL + el.photo}/>)} */}
          
            <hr />
            <div className={style.exerciseParam}>
              <div>Number of sets
                {editExercise
                ? <input type="text" value={exerciseNumberOfSets} onChange={(el) => setExerciseNumberOfSets(el.target.value)} />
                : <p className={style.count}>{exerciseNumberOfSets}</p>
                }
              </div>
              <div>Maximum repetitions
                {editExercise
                  ? <input type="text" value={exerciseMaximumRepetitions} onChange={(el) => setExerciseMaximumRepetitions(el.target.value)} />
                  : <p className={style.count}>{exerciseMaximumRepetitions}</p>
                }
              </div>
              <div>Rest time
                {editExercise
                  ? <input type="text" value={exerciseRestTime} onChange={(el) => setExerciseRestTime(el.target.value)} />
                  : <p className={style.count}>{exerciseRestTime}</p>
                }
              </div>
            </div>
          </div>
        </div>
        
      </Card.Body>
    </Card>
  )
})

export default ExerciseItem