import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import style from './ExerciseItem.module.css'
import { Card, Col, Container, Row, Spinner } from 'react-bootstrap'
import { updateSet } from '../../http/workoutAPI'
import UpdateSetModal from '../Modals/UpdateSetModal/UpdateSetModal'
import RestIntervalTimer from '../Timers/RestIntervalTimer/RestIntervalTimer'
import CustomToggleDescription from '../CustomToggles/CustomToggleDescription/CustomToggleDescription'
import { AiOutlineCheck } from "react-icons/ai";
import CustomTogglePhotos from '../CustomToggles/CustomTogglePhotos/CustomTogglePhotos'
import CustomToggleVideo from '../CustomToggles/CustomToggleVideo/CustomToggleVideo'


const ExerciseInfo = observer(({ exercise, sets, loading, completedExercises }) => {
  
  // делаем новые обькты, а не ссылки на - sets
  const [oldSets, setOldSets] = useState(JSON.parse(JSON.stringify(sets)))
  // в этом обьекте обнуляем значения нужных полей
  const [newSets, setNewSets] = useState(JSON.parse(JSON.stringify(sets.map((el) => ({ "Set": { ...el.Set, "repetition": 0, "weight": 0 } })))))

  const [modalOpen, setModalOpen] = useState(false)
  const [setId, setSetId] = useState(0)
  const [setIndex, setSetIndex] = useState(0)
  const [activeRestTimer, setActiveRestTimer] = useState(false)
  const [finishExerciseStatus, setFinishExerciseStatus] = useState([])
  
  const [setSaveList, setSetSaveList] = useState([])


  useEffect(() => {
    setOldSets(JSON.parse(JSON.stringify(sets)))
    setNewSets(JSON.parse(JSON.stringify(sets.map((el) => ({ "Set": { ...el.Set, "repetition": 0, "weight": 0 } })))))
    setActiveRestTimer(false)
  }, [sets])

  const openModal = (setId, index) => {
    setModalOpen(true)
    setSetId(setId)
    setSetIndex(index)
  }

  const closeModal = () => setModalOpen(false);

  const editSet = (newWeight, newReps) => {
    const updateSetData = [...newSets]
    updateSetData[setIndex].Set['weight'] = newWeight
    updateSetData[setIndex].Set['repetition'] = newReps
    
    setNewSets(updateSetData)
    updateSet(setId, newReps, newWeight)

    closeModal();
    setSaveList.push(setId)
    setActiveRestTimer(true)
  }

  const timerFinish = () => {
    setActiveRestTimer(false)
  }

  const finishExercise = () => {
    setFinishExerciseStatus([...finishExerciseStatus, exercise.id])
    setSetSaveList([...setSaveList, ...oldSets.map((set) => set.Set.id)])
    completedExercises((prevIds) => [...prevIds, exercise.id])
  }


  return (
    <Container>
      <p className={style.exerciseName}>{exercise.name}</p>
      <div className={style.exerciseDescription}><CustomToggleDescription body={exercise.description} color='dark'/></div>

      {loading 
      ?
      <div className={style.loadingSpinner}>
        <Spinner variant="dark"/>
      </div>
      : 
      <div>
        {exercise.photo.length !== 0 &&
        <div className={style.exercisePhotos}><CustomTogglePhotos photos={exercise.photo} color='dark'/></div>
        }
        {exercise.video &&
        <div className={style.exercisePhotos}><CustomToggleVideo video={exercise.video} color='dark'/></div>
        }
      </div>
      
      }
      <div className={style.restTimeTimer}>
        <RestIntervalTimer initialSeconds={exercise.rest_time} active={activeRestTimer} onFinish={timerFinish}/>
      </div>
      <Card className={style.exerciseSection}>
        <Card.Title className={style.exerciseTitle}>
          <Col className={style.blockInTitle}>
            <p>Sets</p>
            <p>{exercise.number_of_sets}</p>
          </Col>
          <Col  className={style.blockInTitle}>
            <p>Repetitions</p>
            <p>{exercise.maximum_repetitions}</p>
          </Col>
          <Col  className={style.blockInTitle}>
            <p>Rest (sec)</p>
            <p>{exercise.rest_time}</p>
          </Col>
        </Card.Title>
        <div>
          <Row>
            <Col className={style.textUnderTitle}><p>Previous result</p></Col>
            <Col className={style.textUnderTitle}><p>Repetitions and weight</p></Col>
            <Col className={style.textUnderTitle}><p>Save result</p></Col>
          </Row>
          {loading && 
            <div className={style.loadingSpinner}>
              <Spinner variant="light"/>
            </div>
          }
          {oldSets.map((set, index) => 
            <div key={set.Set.id} className={style.set}>
              <Col className={style.blockInSet}>
                <p>{set.Set.repetition}</p>
                /
                <p>{set.Set.weight} kg</p>
              </Col>
              <Col className={style.blockInSet}>
                <p>{newSets[index].Set.repetition}</p>
                /
                <p>{newSets[index].Set.weight} kg</p>
              </Col>
              <Col className={style.blockInSet}>
                <button 
                  disabled={setSaveList.includes(set.Set.id)}
                  className={`${style.buttonSave} ${setSaveList.includes(set.Set.id) ? style.buttonSaveActive : ""}`}
                  onClick={() => openModal(set.Set.id, index)}>
                    {setSaveList.includes(set.Set.id) && <span><AiOutlineCheck/></span>}
                </button>
              </Col>
            </div>
          )}          
        </div>
        {finishExerciseStatus.includes(exercise.id)
        ? <p className={style.exerciseCompletedText}>Exercise completed</p>
        :
        <button className={style.buttonFinish} onClick={finishExercise}>
            Finish exercise
        </button>
        }
      </Card>
      <UpdateSetModal 
        show={modalOpen}
        onHide={closeModal}
        onSubmit={editSet}
        />
    </Container>
  )
})

export default ExerciseInfo