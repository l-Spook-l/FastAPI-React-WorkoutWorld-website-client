import React, { useContext, useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { createExercise, createSet } from '../../../http/workoutAPI';
import { Context } from '../../..';

// const FormCreateExercise = ({ exercise, onChange, onRemove }) => {
const FormCreateExercise = ({ showForm, workoutId }) => {
  const { user } = useContext(Context)

  const [confirm, setConfirm] = useState(true)

  // Общая проверка валидации формы
  const [formValidError, setFormValidError] = useState(false);

  const [newExercises, setNewExercises] = useState([{ name: '', workoutID: 0,  description: '', sets: 1, maximumRepetitions: 1, restTime: 60, photo: '', video: '' },])

  // добавляем упражнение в обьект как обьект ))
  // ...prevData.exercises - добавляем что уже было
  const addExercise = () => {
    setNewExercises(() => ([
      ...newExercises,
      { name: '', workoutID: 0,  description: '', sets: 1, maximumRepetitions: 1, restTime: 60, photo: '', video: '' }
    ]));
    setConfirm(true)
  };

  // отвечает за поля упражнения
  const exerciseChange = (index, property, value) => {
    const updatedExercises = [...newExercises];
    updatedExercises[index][property] = value;
    setNewExercises(updatedExercises)
  };

// удалить упражнение вернуться и оптимизировать !!!!!!!!!!!!!!!!!
  const removeExercise = (index) => {
    const updatedExercises = [...newExercises]; 
    updatedExercises.splice(index, 1);
    setNewExercises(updatedExercises)
    updatedExercises.length < 1 && setConfirm(false)  // если ничего нет в массиве кнопка не активна
  };

  // сохраняем тренировку
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
          exercise.photo, 
          exercise.video).then((data) => createSet(exercise.sets, data.exercise_ID, user.user.id, 0, 0))
      )
      window.location.reload()
    }
  };

  return (
    <Form>
      {showForm &&
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
                    placeholder="Enter photo URL"
                    value={exercise.photo}
                    onChange={(e) => exerciseChange(index, 'photo', e.target.value)}
                  />
                </Col> Optional
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                  Video
                </Form.Label>
                <Col md={5}>
                  <Form.Control
                    type="file"
                    placeholder="Enter video URL"
                    value={exercise.video}
                    onChange={(e) => exerciseChange(index, 'video', e.target.value)}
                  />
                </Col> Optional
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
          <Button className="" disabled={!confirm} variant={confirm ? undefined : "success"} onClick={submitNewExercise}>
            Save
          </Button>
          {formValidError && <p>Fill in all fields!</p>}
        </div>
      }
    </Form>
  )
}

export default FormCreateExercise