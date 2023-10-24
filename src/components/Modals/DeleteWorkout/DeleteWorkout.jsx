import React from 'react'

const DeleteWorkout = ({ show, onClose, deleteWorkout }) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Warning</Modal.Title>
      </Modal.Header>

      <Modal.Body>
      Are you sure you want to delete this workout?
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          No
        </Button>
        <Button variant="success" onClick={deleteWorkout}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteWorkout