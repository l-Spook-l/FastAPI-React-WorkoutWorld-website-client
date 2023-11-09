import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../..'
import style from './ExerciseItem.module.css'
import { Accordion, Card, Col, Container, Image, Row } from 'react-bootstrap'
import { updateSet } from '../../http/workoutAPI'
import UpdateSetModal from '../Modals/UpdateSetModal/UpdateSetModal'
import RestIntervalTimer from '../Timers/RestIntervalTimer/RestIntervalTimer'
import CustomToggleDescription from '../CustomToggleDescription/CustomToggleDescription'
import ExerciseImageSlider from '../Sliders/ExerciseImageSlider/ExerciseImageSlider'
import { AiFillEdit, AiOutlineCheck, AiOutlineClose} from "react-icons/ai";


const ExerciseInfo = observer(({ exercise, sets }) => {
  const {user} = useContext(Context)

  // делаем новые обькты, а не ссылки на - sets
  const [oldSets, setOldSets] = useState(JSON.parse(JSON.stringify(sets)))
  // в этом обьекте обнуляем значения нужных полей
  const [newSets, setNewSets] = useState(JSON.parse(JSON.stringify(sets.map((el) => ({ "Set": { ...el.Set, "repetition": 0, "weight": 0 } })))))

  const [modalOpen, setModalOpen] = useState(false)
  const [setId, setSetId] = useState(0)
  const [setIndex, setSetIndex] = useState(0)
  const [activeRestTimer, setActiveRestTimer] = useState(false)
  
  const [setSaveList, setSetSaveList] = useState([])

  useEffect(() => {
    setOldSets(JSON.parse(JSON.stringify(sets)))
    setNewSets(JSON.parse(JSON.stringify(sets.map((el) => ({ "Set": { ...el.Set, "repetition": 0, "weight": 0 } })))))
    setActiveRestTimer(false)
  }, [sets]);

  //console.log('newSets', newSets)

  const openModal = (setId, index) => {
    setModalOpen(true)
    setSetId(setId)
    setSetIndex(index)
  };

  const closeModal = () => setModalOpen(false);

  const editSet = (newWeight, newReps) => {
    const updateSetData = [...newSets]
    updateSetData[setIndex].Set['weight'] = newWeight
    updateSetData[setIndex].Set['repetition'] = newReps
    
    setNewSets(updateSetData)
    updateSet(setId, newReps, newWeight)

    closeModal();
    setSaveList.push(setIndex)
    setActiveRestTimer(true)
  };

  const finishExercise = () => {
    console.log('save exercise')
  }

  // console.log('newSets', newSets)
  // console.log('activeRestTimer', activeRestTimer)
  // console.log('setSaveList3', setSaveList)

  return (
    <Container>
      <p className={style.exerciseName}>{exercise.name}</p>
      <div className={style.exerciseDescription}><CustomToggleDescription body={exercise.description} color='dark'/></div>

      {exercise.photo.length !== 0 &&
      <Accordion bsPrefix='myAccordion' className={style.myAccordion}>
        <Accordion.Item eventKey="1">
          <Accordion.Header bsPrefix='myAccordionHeader'>
            <span className={style.myAccordionHeaderText}>Photos</span>
          </Accordion.Header>
          <Accordion.Body bsPrefix='myAccordionBody' className={style.myAccordionBody}>
            <ExerciseImageSlider photos={exercise.photo}/>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      }

      <div className={style.restTimeTimer}>
        <RestIntervalTimer initialSeconds={exercise.rest_time} active={activeRestTimer}/>
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
            <p>Rest time (sec)</p>
            <p>{exercise.rest_time}</p>
          </Col>
        </Card.Title>

        <Card.Body className={style.setSection}>
          <Row>
            <Col className={style.textUnderTitle}><p>Previous result</p></Col>
            <Col className={style.textUnderTitle}><p>Repetitions and weight</p></Col>
            <Col className={style.textUnderTitle}><p>Save result</p></Col>
          </Row>
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
              {/* className={`${style.buttonSave} ${setSaveList.includes(index) && ? style.buttonSaveActive : ""}`} */}
                <button 
                  // className={style.buttonSave} 
                  disabled={setSaveList.includes(index)}
                  className={`${style.buttonSave} ${setSaveList.includes(index) ? style.buttonSaveActive : ""}`}
                  onClick={() => openModal(set.Set.id, index)}>
                    {setSaveList.includes(index) && <span><AiOutlineCheck/></span>}
                </button>
              </Col>
            </div>
          )}          
        </Card.Body>
        <button className={style.buttonFinish} onClick={finishExercise}>Finish exercise</button>
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