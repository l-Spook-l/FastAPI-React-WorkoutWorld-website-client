import { observer } from 'mobx-react-lite'
import React from 'react'
import { Col, Row } from 'react-bootstrap'

const ExerciseItem = observer(
  ({ exerciseId, description, numberOfSets, maximumRepetitions, restTime, weight, timer }) => {
  return (
    <Row>
      ExerciseItem
      <Col md={4}>{numberOfSets}</Col>
      <Col md={4}>{maximumRepetitions}</Col>
      <Col md={4}>{restTime}</Col>
    </Row>
  )
})

export default ExerciseItem