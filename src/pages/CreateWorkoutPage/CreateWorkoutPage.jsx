import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Container, Form, Button, Col, Row, Card } from 'react-bootstrap';

const CreateWorkoutPage = observer(() => {
  const [workoutData, setWorkoutData] = useState({
    title: '',
    description: '',
    exercises: [],
  });

  // добавляем значение в обьект workoutData меняя сосояние
  // ...prevData - добавляем что уже было
  const handleInputChange = (el) => {
    const { name, value } = el.target;
    setWorkoutData((prevData) => ({ ...prevData, [name]: value }));  // [name] - ключемм будет именно значение в переменной, а без [] будет - 'name'
  };

  // добавляем упражнение в обьект как обьект ))
  // ...prevData.exercises - добавляем что уже было
  const handleAddExercise = () => {
    setWorkoutData((prevData) => ({
      ...prevData,
      exercises: [...prevData.exercises, { name: '', sets: 1, photo: '', video: '' }],
    }));
  };

  const handleExerciseChange = (index, property, value) => {
    const updatedExercises = [...workoutData.exercises];
    updatedExercises[index][property] = value;
    setWorkoutData((prevData) => ({ ...prevData, exercises: updatedExercises }));
  };

  const handleRemoveExercise = (index) => {
    const updatedExercises = [...workoutData.exercises];
    updatedExercises.splice(index, 1);
    setWorkoutData((prevData) => ({ ...prevData, exercises: updatedExercises }));
  };

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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder="Enter exercise name"
                    value={exercise.name}
                    onChange={(e) => handleExerciseChange(index, 'name', e.target.value)}
                  />
                </Col>
              </Form.Group>
              <Button variant="danger" onClick={() => handleRemoveExercise(index)}>
                Remove Exercise
              </Button>
            </Card.Body>
          </Card>
        )}

        <Button variant="primary" onClick={handleAddExercise}>
          Add Exercise
        </Button>

       

        <Button variant="primary" type="submit" className="mt-3">
          Create Workout
        </Button>

      </Form>
    </Container>
  )
  


  

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Здесь вы можете отправить workoutData на сервер или выполнить другие действия
  //   console.log('Submitted data:', workoutData);
  // };

  // return (
  //   <Container className="mt-5">
  //     <h1>Create Workout</h1>
  //     <Form onSubmit={handleSubmit}>
  
  //       {workoutData.exercises.map((exercise, index) => (
  //         <Card key={index} className="mb-3">
  //           <Card.Body>
  //             <Form.Group as={Row} className="mb-3">
  //               <Form.Label column sm="2">
  //                 Name
  //               </Form.Label>
  //               <Col sm="10">
  //                 <Form.Control
  //                   type="text"
  //                   placeholder="Enter exercise name"
  //                   value={exercise.name}
  //                   onChange={(e) => handleExerciseChange(index, 'name', e.target.value)}
  //                 />
  //               </Col>
  //             </Form.Group>

  //             <Form.Group as={Row} className="mb-3">
  //               <Form.Label column sm="2">
  //                 Sets
  //               </Form.Label>
  //               <Col sm="10">
  //                 <Form.Control
  //                   type="number"
  //                   placeholder="Enter number of sets"
  //                   value={exercise.sets}
  //                   onChange={(e) => handleExerciseChange(index, 'sets', e.target.value)}
  //                 />
  //               </Col>
  //             </Form.Group>

  //             <Form.Group as={Row} className="mb-3">
  //               <Form.Label column sm="2">
  //                 Photo
  //               </Form.Label>
  //               <Col sm="10">
  //                 <Form.Control
  //                   type="text"
  //                   placeholder="Enter photo URL"
  //                   value={exercise.photo}
  //                   onChange={(e) => handleExerciseChange(index, 'photo', e.target.value)}
  //                 />
  //               </Col>
  //             </Form.Group>

  //             <Form.Group as={Row} className="mb-3">
  //               <Form.Label column sm="2">
  //                 Video
  //               </Form.Label>
  //               <Col sm="10">
  //                 <Form.Control
  //                   type="text"
  //                   placeholder="Enter video URL"
  //                   value={exercise.video}
  //                   onChange={(e) => handleExerciseChange(index, 'video', e.target.value)}
  //                 />
  //               </Col>
  //             </Form.Group>
  //           </Card.Body>
  //         </Card>
  //       ))}

  //     </Form>
  //   </Container>
  // );
});

export default CreateWorkoutPage;
