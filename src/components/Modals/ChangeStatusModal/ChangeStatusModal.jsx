import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ChangeStatusModal = ({ show, onClose, changeStatus }) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Warning</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to make the workout public for everyone? After this, you won't be able to make it non-public, and editing will be unavailable
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="success" onClick={changeStatus}>
          Change
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChangeStatusModal;
