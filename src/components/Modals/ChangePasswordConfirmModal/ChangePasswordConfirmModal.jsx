import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ChangePasswordConfirmModal = ({ show, close }) => {
  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>Пароль успешно сброшен!</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="secondary" onClick={close}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ChangePasswordConfirmModal;
