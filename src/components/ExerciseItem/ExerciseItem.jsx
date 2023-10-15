import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../..'
import style from './ExerciseItem.module.css'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { updateSet } from '../../http/workoutAPI'

const ExerciseInfo = observer(({ exercise, sets }) => {
  const {user} = useContext(Context)

  // делаем новые обькты, а не ссылки на - sets
  const [oldSets, setOldSets] = useState(JSON.parse(JSON.stringify(sets)))
  const [newSets, setNewSets] = useState(JSON.parse(JSON.stringify(sets.map((el) => ({ "Set": { ...el.Set, "count": 0, "weight": 0 } })))))


  useEffect(() => {
    setOldSets(JSON.parse(JSON.stringify(sets)));
    setNewSets(JSON.parse(JSON.stringify(sets.map((el) => ({ "Set": { ...el.Set, "count": 0, "weight": 0 } })))));
    console.log('---------------------------')
  }, [sets]);

  //console.log('newSets', newSets)

  const changeSet = (setId, index) => {
    console.log('click save id', setId)
    const updateSetData = [...newSets]
    updateSetData[index].Set['count'] = 10
    // console.log('updateSet', updateSetData)
    // console.log('oldSets', oldSets)
    setNewSets(updateSetData)
    updateSet(setId, 10, 0)
  }

  const saveExercise = () => {
    console.log('save exercise')
  }

  console.log('newSets', newSets)


  return (
    <Container className={style.container}>
      <p>{exercise.name}</p>
      <p>{exercise.description}</p>
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
                <p>{set.Set.count}</p>
                /
                <p>{set.Set.weight} kg</p>
              </Col>
              <Col className={style.blockInSet}>
                <p>{newSets[index].Set.count}</p>
                /
                <p>{newSets[index].Set.weight} kg</p>
              </Col>
              <Col className={style.blockInSet}>
                <button onClick={() => changeSet(set.Set.id, index)} >Save</button>
              </Col>
            </div>
          )}          
        </div>
        <button className={style.buttonSave} onClick={saveExercise}>Save exercise</button>
      </Card>
    </Container>
  )
})

export default ExerciseInfo