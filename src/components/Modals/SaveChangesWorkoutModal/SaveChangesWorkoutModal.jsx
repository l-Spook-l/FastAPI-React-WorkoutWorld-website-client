import React from 'react'
import { Button, Modal } from 'react-bootstrap';

const SaveChangesWorkoutModal = ({ show, onClose, saveChanges }) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Warning</Modal.Title>
      </Modal.Header>

      <Modal.Body>
      Are you sure you want to make changes to this workout?
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          No
        </Button>
        <Button variant="success" onClick={saveChanges}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default SaveChangesWorkoutModal