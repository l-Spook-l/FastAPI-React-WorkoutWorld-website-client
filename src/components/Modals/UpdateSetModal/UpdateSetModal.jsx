import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const UpdateSetModal = ({ show, onHide, onSubmit }) => {
  const [weight, setWeight] = useState(0);
  const [reps, setReps] = useState(0);

  const submitData = () => {
    // Ваша логіка для збереження нових значень
    onSubmit(weight, reps);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Set</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formReps">
            <Form.Label>Reps:</Form.Label>
            <Form.Control type="number" value={reps} onChange={(e) => setReps(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formWeight">
            <Form.Label>Weight:</Form.Label>
            <Form.Control type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={submitData}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateSetModal;
