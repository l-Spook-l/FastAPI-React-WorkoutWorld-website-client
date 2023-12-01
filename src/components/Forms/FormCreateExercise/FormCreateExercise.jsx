import React, { useContext, useEffect, useState } from 'react'
import { Accordion, Button, Card, Col, Form, Row } from 'react-bootstrap'
import { createExercise, createSet } from '../../../http/workoutAPI';
import { Context } from '../../..';
import style from './FormCreateExercise.module.css'

const FormCreateExercise = ({ showForm, workoutId }) => {
  const { user } = useContext(Context)

  const [confirm, setConfirm] = useState(true)
  const [showFormExercise, setShowFormExercise] = useState(false)

  useEffect(() => {
    setShowFormExercise(showForm)
  },[showForm])

  // Общая проверка валидации формы
  const [formValidError, setFormValidError] = useState(false)

  const [newExercises, setNewExercises] = useState([{ name: '', workoutID: 0,  description: '', sets: 1, maximumRepetitions: 1, restTime: 60, video: '', photo: [] }])

  // добавляем упражнение в обьект как обьект ))
  const addExercise = () => {
    setNewExercises(() => ([
      ...newExercises,
      { name: '', workoutID: 0,  description: '', sets: 1, maximumRepetitions: 1, restTime: 60, video: '', photo: [] }
    ]))
    setConfirm(true)
  }

  // отвечает за поля упражнения
  const exerciseChange = (index, property, value) => {
    const updatedExercises = [...newExercises]
    switch (property) {
      case "photo":
        updatedExercises[index][property] = value.target.files
        setNewExercises(updatedExercises)
        break;
      case "name":
      case "description":
      case "video":
        updatedExercises[index][property] = value
        setNewExercises(updatedExercises)
        break;
      default:
        const number = parseInt(value, 10)
        if (!isNaN(number)) {
          if (number < 1) {
            alert('The value must be greater than 1')
          } else {
            updatedExercises[index][property] = value
            setNewExercises(updatedExercises)
          }
        }
        break;
    }
  }

  const removeExercise = (index) => {
    const updatedExercises = [...newExercises]
    updatedExercises.splice(index, 1)
    setNewExercises(updatedExercises)
    updatedExercises.length < 1 && setConfirm(false)
  }

  const submitNewExercise = () => {
    const checkDataExercise = newExercises.every((el) => Object.values(el).slice(0, -2).every((value) => value !== ''))

    if (!checkDataExercise) {
      setFormValidError(true) 
    } else {
      setFormValidError(false)
      
      newExercises.map((exercise) => 
        createExercise( 
          exercise.name, 
          workoutId, 
          exercise.description, 
          exercise.sets, 
          exercise.maximumRepetitions, 
          exercise.restTime,
          exercise.video,
          exercise.photo).then((data) => createSet(exercise.sets, data.exercise_ID, user.user.id, 0, 0))
      )
      setShowFormExercise(false)
    }
  }

  return (
    <Form>
      {showFormExercise &&
        <div>
          <h2>New exercises</h2>
          {newExercises.map((exercise, index) => 
            <Card key={index}>
              <Card.Body>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="2">
                    Name
                  </Form.Label>
                  <Col md={5}>
                    <Form.Control
                      type="text"
                      placeholder="Enter exercise name"
                      value={exercise.name}
                      onChange={(e) => exerciseChange(index, 'name', e.target.value)}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="2">Description</Form.Label>
                  <Col md={5}>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Enter description"
                      name="description"
                      value={exercise.description}
                      onChange={(e) => exerciseChange(index, 'description', e.target.value)}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                  Sets
                </Form.Label>
                <Col md={5}>
                  <Form.Control
                    type="number"
                    placeholder="Enter number of sets"
                    value={exercise.sets}
                    onChange={(e) => exerciseChange(index, 'sets', e.target.value)}
                    min={1}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                  Maximum repetitions
                </Form.Label>
                <Col md={5}>
                  <Form.Control
                    type="number"
                    placeholder="Enter maximum repetitions"
                    value={exercise.maximumRepetitions}
                    onChange={(e) => exerciseChange(index, 'maximumRepetitions', e.target.value)}
                    min={1}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                  Rest time
                </Form.Label>
                <Col md={5}>
                  <Form.Control
                    type="number"
                    placeholder="Enter rest time"
                    value={exercise.restTime}
                    onChange={(e) => exerciseChange(index, 'restTime', e.target.value)}
                    min={1}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                  Photo
                </Form.Label>
                <Col md={5}>
                  <Form.Control
                    type="file"
                    placeholder="Enter video link"
                    accept="image/*"
                    multiple // для загрузки нескольких файлов
                    onChange={(e) => exerciseChange(index, 'photo', e)}
                  />
                </Col> Optional
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                  Video
                </Form.Label>
                <Col md={5}>
                  <Form.Control
                      as="textarea"
                      rows={1}
                      placeholder="Enter video URL"
                      value={exercise.video}
                      onChange={(e) => exerciseChange(index, 'video', e.target.value)}
                    />
                </Col> Optional
                <Col md={4}>
                  <Accordion bsPrefix='myAccordion' className={style.myAccordion}>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header bsPrefix='myAccordionHeader'  >
                        <span className={style.myAccordionHeaderText}>
                          Instructions on how to add a link.
                        </span>
                      </Accordion.Header>
                      <Accordion.Body bsPrefix='myAccordionBody'>
                        <a target='blank' href="https://support.google.com/youtube/answer/171780?hl=en">Instructions on how to copy a YouTube link.</a>
                        <p></p>
                        <a target='blank' href="https://support.google.com/youtube/answer/57407?hl=en&co=GENIE.Platform%3DDesktop">
                          Instructions on how to upload a video to YouTube.
                        </a>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Col>
              </Form.Group>

                <Button variant="danger" onClick={() => removeExercise(index)}>
                  Remove Exercise
                </Button>
              </Card.Body>
            </Card>
          )}
          <Button variant="primary" onClick={addExercise}>
            Add Exercise
          </Button>
          <Button className="ms-2" disabled={!confirm} variant={confirm ? undefined : "success"} onClick={submitNewExercise}>
            Save exercises
          </Button>
          {formValidError && <p className='bg-danger'>Fill in all fields!</p>}
        </div>
      }
    </Form>
  )
}

export default FormCreateExercise