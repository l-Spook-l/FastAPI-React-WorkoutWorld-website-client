import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { Context } from '../..'
import { AiFillEdit, AiOutlineCheck, AiOutlineClose} from "react-icons/ai";
import { RiDeleteBin2Line } from 'react-icons/ri'
import style from './ExerciseInfo.module.css'
import { createSet, deleteExercise, deleteSets, updateExercise } from '../../http/workoutAPI';
import CustomToggleDescription from '../CustomToggles/CustomToggleDescription/CustomToggleDescription';
import DeleteModal from '../Modals/DeleteModal/DeleteModal';
import CustomTogglePhotos from '../CustomToggles/CustomTogglePhotos/CustomTogglePhotos';
import CustomToggleVideo from '../CustomToggles/CustomToggleVideo/CustomToggleVideo';
import WarningTooltip from '../WarningTooltip/WarningTooltip';

const ExerciseItem = observer(
  ({ exerciseId, name, description, numberOfSets, maximumRepetitions, restTime, video, photos }) => {
  
  const { user } = useContext(Context)
  const { workout } = useContext(Context)

  const [editExercise, setEditExercise] = useState()
  const [showModalDeleteExercise, setShowModalDeleteExercise] = useState(false)

  useEffect(() => {
    setEditExercise(false)
  },[workout.editWorkout])
  
  const [exerciseName, setExerciseName] = useState(name)
  const [exerciseDescription, setExerciseDescription] = useState(description)
  const [exerciseNumberOfSets, setExerciseNumberOfSets] = useState(numberOfSets)
  const [exerciseMaximumRepetitions, setExerciseMaximumRepetitions] = useState(maximumRepetitions)
  const [exerciseRestTime, setExerciseRestTime] = useState(restTime)
  const [exerciseVideo, setExerciseVideo] = useState(video)

  const updateParamExercise = () => {
    if (numberOfSets !== exerciseNumberOfSets) {
      updateExercise(exerciseId, exerciseName, exerciseDescription, exerciseNumberOfSets, exerciseMaximumRepetitions, exerciseRestTime, exerciseVideo)
      deleteSets(exerciseId, workout.selectedWorkout.data.Workout.user_id)
      createSet(exerciseNumberOfSets, exerciseId, workout.selectedWorkout.data.Workout.user_id, 0, 0)
    } else {
      updateExercise(exerciseId, exerciseName, exerciseDescription, numberOfSets, exerciseMaximumRepetitions, exerciseRestTime, exerciseVideo)
    }
    setEditExercise(false)
  }

  const closeParamExercise = () => {
    setEditExercise(false)
  }

  const deleteWorkoutExercise = () => {
    deleteExercise(exerciseId)
    setShowModalDeleteExercise(false)
  }

  const closeModal = () => {
    // setShowModalChangeStatus(false)
    setShowModalDeleteExercise(false)
    // setShowModalSaveChanges(false)
  }

  // console.log('ExerciseItem', video)
  // console.log('workout.selectedWorkout.data.Workout.exercise', workout.selectedWorkout.data.Workout.exercise.length)

  return (
    <Card className={style.container}>
      <Card.Body>
        <div className={style.titleSection}>
          {editExercise
          ? <input type="text" value={exerciseName} onChange={(el) => setExerciseName(el.target.value)} />
          : <p className={style.exerciseName}>{exerciseName}</p>
          }
          {workout.editWorkout && 
            (editExercise
              ? 
                <div>
                  <button className={style.changeButton} onClick={() => updateParamExercise()}><AiOutlineCheck/></button>
                  <button className={style.changeButton} onClick={() => closeParamExercise()}><AiOutlineClose/></button>
                  {(workout.selectedWorkout.data.Workout.exercise.length > 1) &&
                  <button className={style.deleteExerciseButton} onClick={() => setShowModalDeleteExercise(true)}><RiDeleteBin2Line/></button>
                  }
                </div>
              : <button className={style.changeButton} onClick={() => setEditExercise(true)}><AiFillEdit/></button>)
          }
        </div>
        <div className={style.infoBlock}>
          {photos.length !== 0 &&
            <CustomTogglePhotos photos={photos} color='dark'/>
          }
          <div>
            {editExercise
            ? 
            <div className='d-flex flex-column'>
              <label>Video:</label>
              <textarea type="text" placeholder='' value={exerciseVideo} onChange={(el) => setExerciseVideo(el.target.value)} />
            </div>
            : video && <CustomToggleVideo video={video} color='dark'/>
            }
            
          </div>
          <div className={style.descriptionBlock}>
            {editExercise
              ? 
              <div className='d-flex flex-column'>
                <label>Description:</label>
                <textarea type="text" value={exerciseDescription} onChange={(el) => setExerciseDescription(el.target.value)} />
              </div>
              : 
              <CustomToggleDescription body={exerciseDescription} color='dark'/>
              }

            <div className={style.exerciseParam}>
              <div>Number of sets
                {editExercise
                ? 
                <div>
                  <input className={style.countInput} type="number" value={exerciseNumberOfSets} onChange={(el) => setExerciseNumberOfSets(el.target.value)} />
                  <WarningTooltip/>
                </div>
                : <p className={style.count}>{exerciseNumberOfSets}</p>
                }
              </div>
              <div>Maximum repetitions
                {editExercise
                  ? 
                  <div>
                    <input className={style.countInput} type="number" value={exerciseMaximumRepetitions} onChange={(el) => setExerciseMaximumRepetitions(el.target.value)} />
                  </div>
                  : <p className={style.count}>{exerciseMaximumRepetitions}</p>
                }
              </div>
              <div>Rest time
                {editExercise
                  ? 
                  <div>
                    <input className={style.countInput} type="number" value={exerciseRestTime} onChange={(el) => setExerciseRestTime(el.target.value)} />
                  </div>
                  : <p className={style.count}>{exerciseRestTime}</p>
                }
              </div>
            </div>
          </div>
        </div>
      </Card.Body>
      <DeleteModal show={showModalDeleteExercise} onClose={closeModal} deleteValue={deleteWorkoutExercise} value="exercise"/>
    </Card>
  )
})

export default ExerciseItem