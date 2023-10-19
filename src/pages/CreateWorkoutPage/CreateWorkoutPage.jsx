import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { Container, Form, Button, Col, Row, Card } from 'react-bootstrap';
import { createExercise, createSet, createWorkout } from '../../http/workoutAPI';
import { Context } from "../..";

const CreateWorkoutPage = observer(() => {
  const { user } = useContext(Context)

  const [confirm, setConfirm] = useState(false)

  // Общая проверка валидации формы
  const [formValidError, setFormValidError] = useState(false);

  // создаем обьект тренировки
  const [workoutData, setWorkoutData] = useState({
    title: '',
    description: '',
    isPublic: false,
    totalTime: '1',
    exercises: [],
  });

  // добавляем значение в обьект workoutData меняя сосояние
  // ...prevData - добавляем что уже было
  const inputChange = (el) => {
    const { name, value, checked } = el.target;
    // eсли это чекбокс, используем значение checked
    const newValue = el.target.type === 'checkbox' ? checked : value;
    setWorkoutData((prevData) => ({ ...prevData, [name]: newValue }));  // [name] - ключем будет именно значение в переменной, а без [] будет - 'name'
  };

  // добавляем упражнение в обьект как обьект ))
  // ...prevData.exercises - добавляем что уже было
  const addExercise = () => {
    setWorkoutData((prevData) => ({
      ...prevData,
      exercises: [...prevData.exercises, { name: '', workoutID: 0,  description: '', sets: 1, maximumRepetitions: 1, restTime: 60, photo: '', video: '' }],
    }));
    setConfirm(true)
  };

  // отвечает за поля упражнения
  const exerciseChange = (index, property, value) => {
    const updatedExercises = [...workoutData.exercises];
    updatedExercises[index][property] = value;
    setWorkoutData((prevData) => ({ ...prevData, exercises: updatedExercises }));
  };

  // удалить упражнение
  const removeExercise = (index) => {
    const updatedExercises = [...workoutData.exercises];
    updatedExercises.splice(index, 1);
    setWorkoutData((prevData) => ({ ...prevData, exercises: updatedExercises }))
    updatedExercises.length < 1 && setConfirm(false)  // если ничего нет в массив кнопка не активна
  };

  // сохраняем тренировку
  const submitCreateWorkout = () => {
    // проверяем если ли пустые поля
    const checkDataWorkout = Object.values(workoutData).slice(0, -1).every((value) => value !== '')
    const checkDataExercise = workoutData.exercises.every((el) => Object.values(el).slice(0, -2).every((value) => value !== ''))

    if (!checkDataWorkout || !checkDataExercise) {
      setFormValidError(true) 
    } else {
      setFormValidError(false)
      createWorkout(workoutData.title, user.user.id, workoutData.description, workoutData.isPublic, 'medium', workoutData.totalTime)
      .then((data) => 
      workoutData.exercises.map((exercise) => 
        createExercise( 
          exercise.name, 
          data.workout_ID, 
          exercise.description, 
          exercise.sets, 
          exercise.maximumRepetitions, 
          exercise.restTime, 
          exercise.photo, 
          exercise.video).then((data) => createSet(exercise.sets, data.exercise_ID, user.user.id, 0, 0))
      ))
    }
  };

  // console.log('workoutData', workoutData)x

  return (
    <Container>
      <h1>Create Workout</h1>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            name="title"
            value={workoutData.title}
            onChange={inputChange}
          />
        </Form.Group>
          
        <Form.Group controlId="formIsPublic">
          <Form.Check
            type="checkbox"
            label="Публичная тренировка"
            name='isPublic'
            checked={workoutData.isPublic}
            onChange={inputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter description"
              name="description"
              value={workoutData.description}
              onChange={inputChange}
            />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Total time (minutes)</Form.Label>
            <Form.Control
                type="number"
                placeholder="Enter workout total time"
                name="totalTime"
                value={workoutData.totalTime}
                onChange={inputChange}
            />
          </Form.Group>
        <h2>Exercises</h2>

        {workoutData.exercises.map((exercise, index) => 
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

        <Button className="" disabled={!confirm} variant={confirm ? undefined : "success"} onClick={submitCreateWorkout}>
          Create Workout
        </Button>
        {formValidError && <p>Fill in all fields!</p>}

      </Form>
    </Container>
  )
});

export default CreateWorkoutPage;
