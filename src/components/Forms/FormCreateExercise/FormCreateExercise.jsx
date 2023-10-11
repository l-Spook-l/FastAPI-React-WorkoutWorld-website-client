import React, { useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'

// const FormCreateExercise = ({ exercise, onChange, onRemove }) => {
const FormCreateExercise = ({ showForm }) => {
  //const { user } = useContext(Context)

  const [confirm, setConfirm] = useState(false)

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
    setNewExercises((prevData) => ({ ...prevData, exercises: updatedExercises }));
  };

  // создаем обьект тренировки
  // const [workoutData, setWorkoutData] = useState({
  //   title: '',
  //   description: '',
  //   totalTime: '1',
  //   exercises: [],
  // });

  // // добавляем значение в обьект workoutData меняя сосояние
  // // ...prevData - добавляем что уже было
  // const inputChange = (el) => {
  //   const { name, value } = el.target;
  //   setWorkoutData((prevData) => ({ ...prevData, [name]: value }));  // [name] - ключем будет именно значение в переменной, а без [] будет - 'name'
  // };

  // удалить упражнение
  const removeExercise = (index) => {
    const updatedExercises = [...newExercises]; 
    console.log('index ', index)
    console.log('exercises 1', updatedExercises)
    updatedExercises.splice(index, 1);
    console.log('exercises 2', updatedExercises)
    setNewExercises(updatedExercises)
    updatedExercises.length < 1 && setConfirm(false)  // если ничего нет в массив кнопка не активна
  };

  // // сохраняем тренировку
  // const submitCreateWorkout = () => {
  //   const checkDataWorkout = Object.values(workoutData).slice(0, -1).every((value) => value !== '')
  //   const checkDataExercise = workoutData.exercises.every((el) => Object.values(el).slice(0, -2).every((value) => value !== ''))

  //   if (!checkDataWorkout || !checkDataExercise) {
  //     setFormValidError(true) 
  //   } else {
  //     setFormValidError(false)
  //     createWorkout(workoutData.title, user.user.id, workoutData.description, 'medium', workoutData.totalTime)
  //     .then((data) => 
  //     workoutData.exercises.map((exercise) => 
  //       createExercise( exercise.name, data.workout_ID, exercise.description, exercise.sets, exercise.maximumRepetitions, exercise.restTime, exercise.photo, exercise.video)
  //     ))
  //   }
  // };

  console.log('FormCreateExercise newExercises', newExercises)

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
                <Button variant="danger" onClick={() => removeExercise(index)}>
                  Remove Exercise
                </Button>
              </Card.Body>
            </Card>
          )}
          <Button variant="primary" onClick={addExercise}>
            Add Exercise
          </Button>
          {formValidError && <p>Fill in all fields!</p>}
        </div>
      }
      {/* <Form>
        <h2>Exercises</h2>
        {workoutData.exercises.map((exercise, index) => 
          <Card key={index}>
            <Card.Body>
              

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

              
            </Card.Body>
          </Card>
        )}

        

        <Button className="" disabled={!confirm} variant={confirm ? undefined : "success"} onClick={submitCreateWorkout}>
          Create Workout
        </Button>
        

      </Form> */}
    </Form>
  )
}

export default FormCreateExercise