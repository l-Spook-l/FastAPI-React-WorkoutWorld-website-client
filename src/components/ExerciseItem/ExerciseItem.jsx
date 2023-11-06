import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../..'
import style from './ExerciseItem.module.css'
import { Accordion, Card, Col, Container, Image } from 'react-bootstrap'
import { updateSet } from '../../http/workoutAPI'
import UpdateSetModal from '../Modals/UpdateSetModal/UpdateSetModal'
import RestIntervalTimer from '../Timers/RestIntervalTimer/RestIntervalTimer'
import CustomToggleDescription from '../CustomToggleDescription/CustomToggleDescription'
import ExerciseImageSlider from '../Sliders/ExerciseImageSlider/ExerciseImageSlider'

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

  useEffect(() => {
    setOldSets(JSON.parse(JSON.stringify(sets)))
    setNewSets(JSON.parse(JSON.stringify(sets.map((el) => ({ "Set": { ...el.Set, "repetition": 0, "weight": 0 } })))))
    setActiveRestTimer(false)
    // console.log('---------------------------')
  }, [sets]);

  //console.log('newSets', newSets)

  const openModal = (setId, index) => {
    setModalOpen(true)
    setSetId(setId)
    setSetIndex(index)
  };
  const closeModal = () => setModalOpen(false);

  const editSet = (newWeight, newReps) => {
    // Ваша логіка для збереження нових значень підходу
    const updateSetData = [...newSets]
    updateSetData[setIndex].Set['weight'] = newWeight
    updateSetData[setIndex].Set['repetition'] = newReps
    
    setNewSets(updateSetData)
    updateSet(setId, newReps, newWeight)

    closeModal();

    setActiveRestTimer(true)
  };

  const finishExercise = () => {
    console.log('save exercise')
  }

  // console.log('newSets', newSets)
  console.log('activeRestTimer', activeRestTimer)

  return (
    <Container className={style.container}>
      <p>{exercise.name}</p>
      <div className={style.exerciseDescription}><CustomToggleDescription body={exercise.description} color='dark'/></div>

      {exercise.photo.length !== 0 &&
      <Accordion bsPrefix='myAccordion' className={style.myAccordion}>
        <Accordion.Item eventKey="4">
          <Accordion.Header bsPrefix='myAccordionHeader' className={style.myAccordionHeader}>
            Photos
          </Accordion.Header>
          <Accordion.Body bsPrefix='myAccordionBody' className={style.myAccordionBody}>
            {/* {exercise.photo.map((photo) => 
              <div key={photo.id}>
                <Image className={style.exerciseImage} src={process.env.REACT_APP_API_URL + photo.photo}/>
              </div>
            )} */}
            <ExerciseImageSlider photos={exercise.photo}/>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      }

      {activeRestTimer && <RestIntervalTimer initialSeconds={exercise.rest_time}/>}
      <RestIntervalTimer initialSeconds={exercise.rest_time} active={activeRestTimer}/>
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
        <div className={style.setSection}>
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
                <button onClick={() => openModal(set.Set.id, index)} >Save</button>
              </Col>
            </div>
          )}          
        </div>
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