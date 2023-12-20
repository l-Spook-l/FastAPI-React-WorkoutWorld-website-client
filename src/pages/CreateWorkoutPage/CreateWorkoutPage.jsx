import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Container, Form, Button, Col, Row, Card, Accordion } from 'react-bootstrap';
import { createExercise, createSet, createWorkout } from '../../http/workoutAPI';
import { Context } from "../..";
import style from './CreateWorkoutPage.module.css'
import { useNavigate } from 'react-router-dom';
import { WORKOUT_ROUTE } from '../../utils/consts';
import Loader from '../../components/Loader/Loader';

const CreateWorkoutPage = observer(() => {
  const { user } = useContext(Context)
  const { workout } = useContext(Context)

  const navigate = useNavigate()

  const [confirm, setConfirm] = useState(false)
  const [difficulty, setDifficulty] = useState('Easy')
  const [saveLoad, setSaveLoad] = useState(false)

  // Overall form validation check
  const [formValidError, setFormValidError] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0);
   },[])

  // Creating a workout object
  const [workoutData, setWorkoutData] = useState({
    title: '',
    description: '',
    isPublic: false,
    totalTime: '0',
    exercises: [],
  })

  // Adding a value to the workoutData object, altering the state
  const inputChange = (el) => {
    const { name, value, checked } = el.target;
    const newValue = el.target.type === 'checkbox' ? checked : value;
    setWorkoutData((prevData) => ({ ...prevData, [name]: newValue }))
  }

  // Adding an exercise to the object as an object
  const addExercise = () => {
    setWorkoutData((prevData) => ({
      ...prevData,
      exercises: [...prevData.exercises, { name: '', workoutID: 0,  description: '', sets: 1, maximumRepetitions: 1, restTime: 60, video: '', photo: [] }],
    }))
    setConfirm(true)
  }

  // Deals with exercise fields
  const exerciseChange = (index, property, value) => {
    const updatedExercises = [...workoutData.exercises]
    switch (property) {
      case "photo":
        console.log('photo', value.target.files)
        updatedExercises[index][property] = value.target.files
        setWorkoutData((prevData) => ({ ...prevData, exercises: updatedExercises }))
        break;
      case "name":
      case "description":
      case "video":
        updatedExercises[index][property] = value
        setWorkoutData((prevData) => ({ ...prevData, exercises: updatedExercises }))
        break;
      default:
        const number = parseInt(value, 10)
        if (!isNaN(number)) {
          if (number < 1) {
            alert('The value must be greater than 1')
          } else {
            updatedExercises[index][property] = value
            setWorkoutData((prevData) => ({ ...prevData, exercises: updatedExercises }))
          }
        }
        break;
    }
  }

  const removeExercise = (index) => {
    const updatedExercises = [...workoutData.exercises];
    updatedExercises.splice(index, 1);
    setWorkoutData((prevData) => ({ ...prevData, exercises: updatedExercises }))
    updatedExercises.length < 1 && setConfirm(false)  // если ничего нет в массив кнопка не активна
  }

  const submitCreateWorkout = () => {
    // Checking for empty fields
    const checkDataWorkout = Object.values(workoutData).slice(0, -1).every((value) => value !== '')
    const checkDataExercise = workoutData.exercises.every((el) => Object.values(el).slice(0, -2).every((value) => value !== ''))

    if (!checkDataWorkout || !checkDataExercise) {
      setFormValidError(true) 
    } else {
      setFormValidError(false)
      console.log('test check data exercise', workoutData)
      createWorkout(workoutData.title, user.user.id, workoutData.description, workoutData.isPublic, difficulty, workoutData.totalTime)
      .then((data) => 
      workoutData.exercises.map((exercise, index) => 
        createExercise( 
          exercise.name, 
          data.workout_ID, 
          exercise.description, 
          exercise.sets, 
          exercise.maximumRepetitions, 
          exercise.restTime,
          exercise.video,
          exercise.photo,
          index + 1).then((data) => createSet(exercise.sets, data.exercise_ID, user.user.id, 0, 0)),
      setSaveLoad(true),
      setTimeout(() => {
        setSaveLoad(false)
        navigate(`${WORKOUT_ROUTE}/${data.workout_ID}`)
      }, 1000)
      ))
    }
  }

  return (
    <div className={style.mainBlock}>
      <Container className={style.container}>
        <div className={style.header}>
          <h1>Create Workout</h1>
          <Button className="" disabled={!confirm} variant='success' onClick={submitCreateWorkout}>
            Create Workout
          </Button>
        </div>
        {formValidError && <p className={style.statusFields}>Fill in all fields!</p>}

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
            label="Public workout"
            name='isPublic'
            checked={workoutData.isPublic}
            onChange={inputChange}
          />
        </Form.Group>
        
        <Form.Group className="mb-3">
        <Form.Label>Difficulty</Form.Label>
        <Form.Select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="">Select difficulty</option>
          {workout.difficulties.data.map((difficulty) => (
            <option key={difficulty.DifficultyWorkout.id} value={difficulty.DifficultyWorkout.difficulty}>
              {difficulty.DifficultyWorkout.difficulty}
            </option>
          ))}
        </Form.Select>
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

        <h2>Exercises</h2>
        {workoutData.exercises.map((exercise, index) => 
          <Card key={index} className='mt-3'>
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
                  Photos
                </Form.Label>
                <Col md={5}>
                  <Form.Control
                    type="file"
                    placeholder="Enter photo URL"
                    accept="image/*" //  можно настроить нужные рашсирения файла
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
                    placeholder="Enter video link"
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
                        <p>Example link </p>
                        <textarea
                          rows="6"
                          cols="35"
                          value={`<iframe width="560" height="315" src="https://www.youtube.com/embed/jNQXAC9IVRw?si=Y93IpV0-dNdU4JMJ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`}
                          readOnly
                        />
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
      </Form>
     {saveLoad &&  <Loader/>}
    </Container>
    </div>
  )
});

export default CreateWorkoutPage;
