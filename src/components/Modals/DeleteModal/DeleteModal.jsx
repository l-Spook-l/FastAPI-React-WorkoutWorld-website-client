import React from 'react'
import { Button, Modal } from 'react-bootstrap';

const DeleteModal = ({ show, onClose, deleteValue, value }) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Warning</Modal.Title>
      </Modal.Header>

      <Modal.Body>
      Are you sure you want to delete this {value}?
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          No
        </Button>
        <Button variant="success" onClick={deleteValue}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteModal