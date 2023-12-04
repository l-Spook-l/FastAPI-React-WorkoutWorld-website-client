import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ChangePasswordConfirmModal = ({ show, close }) => {
  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>Password successfully reset!</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="secondary" onClick={close}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ChangePasswordConfirmModal;
