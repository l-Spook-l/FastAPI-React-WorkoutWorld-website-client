import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Context } from '../..'
import style from './ExerciseItem.module.css'
import { Card, Col, Container, Row } from 'react-bootstrap'

const ExerciseInfo = observer(({ exercise, sets }) => {
  const {user} = useContext(Context)

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
          {sets.map((set) => 
            <div key={set.Set.id} className={style.set}>
              <Col className={style.blockInSet}>
                <p>{set.Set.count}</p>
                /
                <p>{set.Set.weight} kg</p>
              </Col>
              <Col className={style.blockInSet}>
                <p>{set.Set.count}</p>
                /
                <p>{set.Set.weight} kg</p>
              </Col>
              <Col className={style.blockInSet}>
                <button >Save</button>
              </Col>
            </div>
          )}
        </div>
        <button className={style.buttonSave}>Save exercise</button>
      </Card>
    </Container>
  )
})

export default ExerciseInfo